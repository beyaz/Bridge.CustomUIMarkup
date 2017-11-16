using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
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
            if (tagName == null)
            {
                throw new ArgumentNullException(nameof(tagName));
            }
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

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
            var instance = CreateInstance(xmlNode);

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
                frameworkElement.GetType().GetMethod("AfterInitDOM", BindingFlags.NonPublic | BindingFlags.Instance).Invoke(frameworkElement);
            }

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
                    var html = new jQuery(childNode).Text();
                    if (string.IsNullOrWhiteSpace(html))
                    {
                        continue;
                    }

                    ((FrameworkElement) instance).InnerHTML = html;
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

        object CreateInstance(XmlNode xmlNode)
        {
            var tag = xmlNode.Name.ToUpper();

            var controlType = CreateType(tag);

            if (controlType == null)
            {
                if (xmlNode.Name.Length <= 3)
                {
                    return new FrameworkElement();
                }

                throw new ArgumentException($"NotRecognizedTag:" + tag);
            }

            return Activator.CreateInstance(controlType);
        }

        void ProcessAttribute(object instance, string name, string value)
        {
            if (name == "class")
            {
                name = "Class";
            }

            var fe = instance as FrameworkElement;


            var bi = BindingInfo.TryParseExpression(value);
            if (bi != null)
            {
                var eventInfo = ReflectionHelper.FindEvent(instance,name );
                if (eventInfo!= null)
                {
                    var methodInfo = ReflectionHelper.GetMethodInfo(DataContext, bi.SourcePath.Path);

                    var handler = Delegate.CreateDelegate(eventInfo.AddMethod.ParameterTypes.First(), DataContext, methodInfo);

                    eventInfo.AddEventHandler(instance, handler);

                    return;
                }

                bi.Source = DataContext;
                bi.Target = instance;
                bi.TargetPath = name;

                bi.Connect();

                return;
            }

            var targetProperty = ReflectionHelper.FindProperty(instance, name);
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

                fe?.On(eventName, () => { methodInfo.Invoke(Caller); });
                return;
            }

            if (name == "x.Name")
            {
                var fi = Caller.GetType().GetField(value);

                fi.SetValue(Caller, instance);
                return;
            }

            var instanceAsBag = instance as Bag;
            if (instanceAsBag != null)
            {
                instanceAsBag.SetValue(name, value);
                return;
            }

            throw new MissingMemberException(name);
        }
        #endregion
    }
}