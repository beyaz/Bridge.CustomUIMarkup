﻿using System;
using System.Windows.Data;
using Bridge.CustomUIMarkup.UI;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkupOnReact
{
    public class RaactUIBuilder
    {
        #region Constants
        const string Comma = ",";
        #endregion

        #region Public Properties
        public Func<string, object>   ComponentClassFinder { get; set; }
        public Action<object, object> OnPropsEvaluated     { get; set; }
        #endregion

        #region Public Methods
        public ReactElement Build(string xmlUi, object prop)
        {
            var rootNode = GetRootNode(xmlUi);
            return BuildNodes(rootNode, prop, "0");
        }
        #endregion

        #region Methods
        /// <summary>
        ///     var nodeModuleCache  = __webpack_require__.c;
        /// </summary>
        internal object FindInNodeModuleCache(object nodeModuleCache, string nodeTagName)
        {
            var i = -1;

            while (true)
            {
                i++;
                dynamic module = nodeModuleCache[i.ToString()];

                if (module == null)
                {
                    return null;
                }

                var exports = module.exports;
                if (exports == null)
                {
                    continue;
                }

                var defaultt = exports["default"];
                if (defaultt == null)
                {
                    continue;
                }

                string name = defaultt["name"].As<string>();

                if (nodeTagName.ToUpper() == name.ToUpper())
                {
                    return defaultt;
                }
            }
        }

        static Element GetRootNode(string xmlString)
        {
            if (xmlString == null)
            {
                throw new ArgumentNullException(nameof(xmlString));
            }

            try
            {
                return jQuery.ParseHTML(xmlString.Trim())[0].As<Element>();
            }
            catch (Exception e)
            {
                throw new SystemException("XmlParseErrorOccured.", e);
            }
        }

        object BuildChildNodes(Element node, object prop, string nodeLocation)
        {
            var childNodes = node.ChildNodes;
            var len        = childNodes.Length;

            var childElements = new object[0];

            for (var i = 0; i < len; i++)
            {
                var childElement = BuildNodes(childNodes[i].As<Element>(), prop, nodeLocation + Comma + i);
                childElements.Push(childElement);
            }

            return childElements;
        }

        ReactElement BuildNodes(Element node, object prop, string nodeLocation)
        {
            if (node.NodeType == NodeType.Text)
            {
                var innerText   = node.GetInnerText();
                var bindingInfo = BindingInfo.TryParseExpression(innerText);

                if (bindingInfo == null)
                {
                    return innerText.As<ReactElement>();
                }

                var propertyPath = bindingInfo.SourcePath;

                propertyPath.Walk(prop);
                return propertyPath.GetPropertyValue().As<ReactElement>();
            }

            var componentConstructor = GetComponentClassByTagName(node.TagName);

            if (node.HasChildNodes() == false)
            {
                return ReactElement.Create(componentConstructor, EvaluateProps(componentConstructor, node, prop, nodeLocation));
            }

            return ReactElement.Create(componentConstructor, EvaluateProps(componentConstructor, node, prop, nodeLocation), BuildChildNodes(node, prop, nodeLocation));
        }

        object EvaluateProps(object componentConstructor, Element node, object prop, string nodeLocation)
        {
            var attributes = node.Attributes;
            var len        = attributes.Length;

            var elementProps = ObjectLiteral.Create<object>();

            for (var i = 0; i < len; i++)
            {
                var attribute = attributes[i];

                var    name          = attribute.NodeName;
                var    value         = attribute.NodeValue;
                object valueAsObject = value;

                var bindingInfo = BindingInfo.TryParseExpression(value);

                if (bindingInfo != null)
                {
                    var propertyPath = bindingInfo.SourcePath;

                    propertyPath.Walk(prop);

                    valueAsObject = propertyPath.GetPropertyValue();
                }

                elementProps[name] = valueAsObject;
            }

            elementProps["key"] = nodeLocation;

            OnPropsEvaluated?.Invoke(componentConstructor, elementProps);

            return elementProps;
        }

        object GetComponentClassByTagName(string nodeTagName)
        {
            if (nodeTagName == "DIV")
            {
                return nodeTagName.ToLower();
            }

            if (ComponentClassFinder != null)
            {
                var componentClass = ComponentClassFinder(nodeTagName);

                if (componentClass == null)
                {
                    throw new ArgumentNullException("ComponentClassFinder returned null value.");
                }

                return componentClass;
            }

            throw new NotImplementedException(nodeTagName);
        }
        #endregion
    }
}