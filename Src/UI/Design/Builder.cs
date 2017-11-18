using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Windows;
using System.Windows.Data;
using System.Xml;
using Bridge.CustomUIMarkup.Common;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.UI.Design
{
    public class Builder
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
        public FrameworkElement Build()
        {
            var rootNode = _rootNode = GetRootNode(XmlString);

            return BuildNode(rootNode);
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
        #endregion

        #region Methods
        protected virtual Type CreateType(string tag)
        {
            return null;
        }

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

        FrameworkElement BuildNode(XmlNode xmlNode)
        {
            var instance = CreateInstance(xmlNode);

            if (IsDesignMode)
            {
                var lineNumber = xmlNode.GetOriginalLineNumber(_rootNode, XmlString);

                LineNumberToControlMap[lineNumber] = instance;
            }

            instance.DataContext = DataContext;
            if (instance._root == null)
            {
                instance.InitDOM();
            }

            instance.AfterInitDOM();

            foreach (var nodeAttribute in xmlNode.Attributes)
            {
                ProcessAttribute(instance, nodeAttribute.Name, nodeAttribute.Value);
            }

            foreach (var childNode in xmlNode.ChildNodes)
            {
                if (childNode.NodeType == NodeType.Comment)
                {
                    continue;
                }

                if (childNode.NodeType == NodeType.Text)
                {
                    // skip empty spaces
                    var html = new jQuery(childNode).Text();
                    if (string.IsNullOrWhiteSpace(html))
                    {
                        continue;
                    }

                    // maybe <div> {LastName} </div>
                    var bindingInfo = BindingInfo.TryParseExpression(html);
                    if (bindingInfo != null)
                    {
                        bindingInfo.Source = DataContext;
                        bindingInfo.Target = instance;
                        bindingInfo.TargetPath = nameof(instance.InnerHTML);

                        bindingInfo.Connect();
                        continue;
                    }

                    instance.InnerHTML = html;
                    continue;
                }

                var subControl = BuildNode(childNode);

                instance.Add(subControl);
            }

            return instance;
        }

        static bool IsUserDefinedTag( string tag)
        {
            return tag.Contains('.') || tag.Contains('-') || tag.Contains(':');
        }
        FrameworkElement CreateInstance(XmlNode xmlNode)
        {
            var tag = xmlNode.Name.ToUpper();

            var controlType = CreateType(tag);

            if (controlType == null)
            {
                if (IsUserDefinedTag(xmlNode.Name) == false)
                {
                    return new FrameworkElement {_root = DOM.CreateElement(xmlNode.Name)};
                }

                throw new ArgumentException($"NotRecognizedTag:" + tag);
            }

            return (FrameworkElement) Activator.CreateInstance(controlType);
        }

        void ProcessAttribute(FrameworkElement instance, string name, string value)
        {
            var nameUpperCase = name.ToUpperCase();

            if (name == "class")
            {
                name = "Class";
            }

            var targetProperty = ReflectionHelper.FindProperty(instance, name);

            var bi = BindingInfo.TryParseExpression(value);
            if (bi != null)
            {
                var eventInfo = ReflectionHelper.FindEvent(instance, name);
                if (eventInfo != null)
                {
                    var methodInfo = ReflectionHelper.GetMethodInfo(DataContext, bi.SourcePath.Path);

                    var handler = Delegate.CreateDelegate(eventInfo.AddMethod.ParameterTypes.First(), DataContext, methodInfo);

                    eventInfo.AddEventHandler(instance, handler);

                    return;
                }

                if (name.Contains(".") == false)
                {
                    if (targetProperty == null)
                    {
                        new HTMLBindingInfo
                        {
                            Source = DataContext,
                            SourcePath = bi.SourcePath.Path,
                            Target = instance._root,
                            TargetPath = name,
                            BindingMode = BindingMode.OneWay
                        }.Connect();

                        return;
                    }
                }

                bi.Source = DataContext;
                bi.Target = instance;
                bi.TargetPath = name;

                bi.Connect();

                return;
            }

            if (targetProperty != null)
            {
                if (targetProperty.PropertyType.IsEnum)
                {
                    ReflectionHelper.SetPropertyValue(instance, name, Enum.Parse(targetProperty.PropertyType, value, true));
                    return;
                }

                var converterAttributes = targetProperty.GetCustomAttributes(typeof(TypeConverterAttribute));
                var firstConverterAtribute = converterAttributes?.FirstOrDefault();
                if (firstConverterAtribute != null)
                {
                    var converter = (TypeConverterAttribute) firstConverterAtribute;
                    var valueConverter = (IValueConverter) Activator.CreateInstance(converter._type);
                    var convertedValue = valueConverter.Convert(value, instance.GetType().GetProperty(name).PropertyType, null, CultureInfo.CurrentCulture);

                    ReflectionHelper.SetPropertyValue(instance, name, convertedValue);
                    return;
                }

                ReflectionHelper.SetPropertyValue(instance, name, value.ChangeType(targetProperty.PropertyType));
                return;
            }

            if (name.StartsWith("on."))
            {
                var eventName = name.RemoveFromStart("on.");

                var methodInfo = Caller.GetType().GetMethod(value);

                instance.On(eventName, () => { methodInfo.Invoke(Caller); });
                return;
            }

            if (nameUpperCase.StartsWith("CSS."))
            {
                var styleAttributeName = name.Substring(4);
                instance._root.Css(styleAttributeName, value);
                return;
            }

            // css.Pseudo.backgroundImage
            if (nameUpperCase.StartsWith("CSS.PSEUDO."))
            {
                var pseudoAttributeName = name.Substring(11);
                DOM.head.Append("<style>#"+instance.Id+"::"+ pseudoAttributeName + "{ content:'bar' }</style>");
                return;
            }
            

            if (name == "x.Name")
            {
                var fi = Caller.GetType().GetField(value);

                fi.SetValue(Caller, instance);
                return;
            }

            instance._root.Attr(name, value);
        }
        #endregion
    }
}