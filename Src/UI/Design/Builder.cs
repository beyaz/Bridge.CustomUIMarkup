﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Windows;
using System.Windows.Data;
using System.Windows.Markup;
using System.Xml;
using Bridge.CustomUIMarkup.Common;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.UI.Design
{
    public class XmlIntellisenseInfo
    {
        #region Constructors
        public XmlIntellisenseInfo(string tagName, Type type)
        {
            if (tagName == null) throw new ArgumentNullException(nameof(tagName));
            if (type == null) throw new ArgumentNullException(nameof(type));

            TagName = tagName;
            Type = type;
        }
        #endregion

        #region Public Properties
        public string[] ChildrenTags { get; set; }

        public string TagName { get; }

        public Type Type { get; }
        #endregion
    }

    public abstract class Builder
    {
        #region Fields
        public string XmlString;

        Dictionary<int, object> _lineNumberToControlMap;

        XmlNode _rootNode;
        #endregion

        #region Public Properties
        public object Caller { get; set; }
        public object DataContext { get; set; }

        public bool IsDesignMode { get; set; }

        public jQuery Result { get; private set; }
        public XmlDocument XmlDocument { get; set; }
        #endregion

        #region Properties
        Dictionary<int, object> LineNumberToControlMap
        {
            get
            {
                if (_lineNumberToControlMap == null)
                {
                    _lineNumberToControlMap = new Dictionary<int, object>();
                }

                return _lineNumberToControlMap;
            }
        }
        #endregion

        #region Public Methods
        public object Build()
        {
            object instance = null;

            var rootNode = _rootNode = GetRootNode(XmlString);

            instance = BuildNode(rootNode);

            return instance;
        }

        public virtual void FocusToLine(int lineNumber)
        {
            lineNumber = lineNumber + 1;
            object component = null;
            _lineNumberToControlMap?.TryGetValue(lineNumber, out component);
            if (component == null)
            {
                return;
            }

            var query = ((FrameworkElement) component)._root;

            query.highlight();
        }

        public virtual IReadOnlyList<XmlIntellisenseInfo> GetIntellisenseInfos()
        {
            return new List<XmlIntellisenseInfo>();
        }
        #endregion

        #region Methods
        protected abstract Type CreateType(string tag);

        static XmlNode GetRootNode(string xmlString)
        {
            try
            {
                return jQuery.ParseXML(xmlString).As<XmlDocument>()?.FirstChild;
            }
            catch (Exception e)
            {
                throw new XmlException("XmlParseErrorOccured.", e);
            }
        }

        object BuildNode(XmlNode xmlNode)
        {
            var tag = xmlNode.Name.ToUpper();

            var controlType = CreateType(tag);

            if (controlType == null)
            {
                throw new ArgumentException($"NotRecognizedTag:" + tag);
            }

            var instance = Activator.CreateInstance(controlType);

            if (IsDesignMode)
            {
                var lineNumber = xmlNode.GetOriginalLineNumber(_rootNode, XmlString);

                LineNumberToControlMap[lineNumber] = instance;
            }

            var frameworkElement = instance as FrameworkElement;
            if (frameworkElement != null)
            {
                frameworkElement.DataContext = DataContext;
                frameworkElement.InitDOM();
            }

            foreach (var nodeAttribute in xmlNode.Attributes)
            {
                var name = nodeAttribute.Name;
                var value = nodeAttribute.Value;

                var bi = BindingInfo.TryParseExpression(value);
                if (bi != null)
                {
                    bi.Source = DataContext;
                    bi.Target = instance;
                    bi.TargetPropertyName = name;

                    bi.Connect();

                    continue;
                }

                var targetProperty = ReflectionHelper.FindProperty(instance, name);
                if (targetProperty != null)
                {
                    if (targetProperty.PropertyType.IsEnum)
                    {
                        ReflectionHelper.SetPropertyValue(instance, name, Enum.Parse(targetProperty.PropertyType, value, true));
                        continue;
                    }

                    var converterAttributes = targetProperty.GetCustomAttributes(typeof(TypeConverterAttribute));
                    var firstConverterAtribute = converterAttributes?.FirstOrDefault();
                    if (firstConverterAtribute != null)
                    {
                        var converter = (TypeConverterAttribute) firstConverterAtribute;
                        var valueConverter = (IValueConverter) Activator.CreateInstance(converter._type);
                        var convertedValue = valueConverter.Convert(value, instance.GetType().GetProperty(name).PropertyType, null, CultureInfo.CurrentCulture);

                        ReflectionHelper.SetPropertyValue(instance, name, convertedValue);
                        continue;
                    }

                    ReflectionHelper.SetPropertyValue(instance, name, value.ChangeType(targetProperty.PropertyType));
                    continue;
                }
                var instanceAsBag = instance as Bag;
                if (instanceAsBag != null)
                {
                    instanceAsBag.SetValue(name, value);
                    continue;
                }

                throw new MissingMemberException(name);
            }

            foreach (var childNode in xmlNode.ChildNodes)
            {
                if (childNode.NodeType == NodeType.Text ||
                    childNode.NodeType == NodeType.Comment)
                {
                    continue;
                }

                var subControl = BuildNode(childNode);

                var el = (FrameworkElement) subControl;

                var iaddChild = instance as IAddChild;

                if (iaddChild != null)
                {
                    iaddChild.Add(el);
                    continue;
                }

                throw new ArgumentException(subControl.GetType().FullName);
            }

            return instance;
        }
        #endregion
    }
}