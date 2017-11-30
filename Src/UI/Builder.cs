using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Windows;
using System.Windows.Data;
using System.Xml;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.Tokenizers;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.UI
{
    public class Template
    {
        string _key;
        string _xmlTemplate;
        XmlNode _rootNode;

        public XmlNode Root => _rootNode;

        private Template()
        {
            
        }

        static readonly Dictionary<string, Template> Cache = new Dictionary<string, Template>();

        public static void RegisterAsXml(string key, string xmlTemplate)
        {
            var rootNode = XmlHelper.GetRootNode(xmlTemplate);

            var template = new Template
            {
                _key = key,
                _xmlTemplate = xmlTemplate,
                _rootNode = rootNode
            };

            Cache[key] = template;
        }


        public static void Register(Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            var resourceKey = type.FullName + ".Template.xml";

            var templateXml =  type.Assembly.GetResource(resourceKey, true);

            RegisterAsXml(type.FullName, templateXml);
        }

        public static void RegisterAsXml(Type key, string xmlTemplate)
        {
             RegisterAsXml(key.FullName,xmlTemplate);
        }
        public static Template Get(Type key)
        {
            return Get(key.FullName);
        }
        public static Template Get(string key)
        {
            Template template = null;
            Cache.TryGetValue(key, out template);
            if (template == null)
            {
                throw new InvalidOperationException("TemplateNotFound. Key: "+key);
            }
            return template;
        }
    }

   
    public class Builder
    {
        public static FrameworkElement Build(string xmlTemplate,object dataContext,object caller)
        {
            var builder = new Builder
            {
                XmlString = xmlTemplate,
                DataContext = dataContext,
                Caller = caller
            };
            return builder.Build();
        }

        public static FrameworkElement Build(Template xmlTemplate, object dataContext, object caller)
        {
            var builder = new Builder
            {
                _rootNode= xmlTemplate.Root,
                DataContext = dataContext,
                Caller = caller
            };

            return builder.BuildNode(builder._rootNode);
        }

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

        public TypeFinder TypeFinder { get; set; } = new TypeFinder();
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
            var rootNode = _rootNode = XmlHelper.GetRootNode(XmlString);

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
        

        static bool IsUserDefinedTag(string tag)
        {
            return tag.Contains('.') || tag.Contains('-') || tag.Contains(':');
        }

        FrameworkElement BuildNode(XmlNode xmlNode)
        {
            var instance = CreateInstance(xmlNode);

            if (IsDesignMode)
            {
                var lineNumber = xmlNode.GetOriginalLineNumber(_rootNode, XmlString);

                LineNumberToControlMap[lineNumber] = instance;
            }

            if (instance.DataContext == null)
            {
                instance.DataContext = DataContext;
            }

            if (instance._root == null)
            {
                instance.InitDOM();
            }

            instance.InvokeAfterInitDOM();

            var attributes = xmlNode.Attributes;

            var len = attributes.Count;
            for (var i = 0; i < len; i++)
            {
                var nodeAttribute = attributes[i];

                if (nodeAttribute.Name == "DataContext")
                {
                    continue;
                }

                ProcessAttribute(instance, nodeAttribute.Name, nodeAttribute.Value);
            }


            var childNodes = xmlNode.ChildNodes;

            len = childNodes.Count;
            for (var i = 0; i < len; i++)
            {
                var childNode = childNodes[i];

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
                        bindingInfo.BindingMode = BindingMode.OneWay;

                        bindingInfo.Source = instance;
                        bindingInfo.SourcePath = "DataContext." + bindingInfo.SourcePath.Path;

                        bindingInfo.Target = instance;
                        bindingInfo.TargetPath = nameof(instance.InnerHTML);

                        bindingInfo.Connect();
                        continue;
                    }

                    instance.InnerHTML = html;
                    continue;
                }

                var subControl = BuildNode(childNode);

                var subControlDataContextAttribute = childNode.Attributes["DataContext"];
                if (subControlDataContextAttribute == null)
                {
                    new BindingInfo
                    {
                        BindingMode = BindingMode.OneWay,
                        Source = instance,
                        SourcePath = "DataContext",
                        Target = subControl,
                        TargetPath = "DataContext"
                    }.Connect();
                }
                else
                {
                    var bi = BindingInfo.TryParseExpression(subControlDataContextAttribute.Value);
                    if (bi == null)
                    {
                        throw new InvalidOperationException("InvalidBindingExpression:"+ subControlDataContextAttribute.Value);
                    }
                    bi.BindingMode = BindingMode.OneWay;
                    bi.Source = instance;
                    bi.SourcePath = "DataContext."+ bi.SourcePath.Path;
                    bi.Target = subControl;
                    bi.TargetPath = "DataContext";
                    bi.Connect();
                }

                instance.Add(subControl);
            }

            return instance;
        }

        FrameworkElement CreateInstance(XmlNode xmlNode)
        {
            var tag = xmlNode.Name.ToUpper();

            var controlType = TypeFinder?.FindType(tag);

            if (controlType == null)
            {
                if (IsUserDefinedTag(xmlNode.Name) == false)
                {
                    return new FrameworkElement
                    {
                        _root = DOM.CreateElement(xmlNode.Name)
                    };
                }

                throw new ArgumentException("NotRecognizedTag:" + tag);
            }

            return (FrameworkElement) Activator.CreateInstance(controlType);
        }

        static readonly Tokenizer InvocationExpressionTokenizer = new Tokenizer
        {
            TokenDefinitions = InvocationExpressionTokenDefinitions.Value
        };

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
                            Source = instance,
                            SourcePath = new PropertyPath("DataContext." + bi.SourcePath.Path),
                            Target = instance._root,
                            TargetPath = name,
                            BindingMode = BindingMode.OneWay
                        }.Connect();

                        return;
                    }
                }


                bi.SourcePath = new PropertyPath("DataContext."+bi.SourcePath.Path);
                bi.Source = instance;

                // bi.Source = DataContext;
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

                // support this format: this.Notify(OnContactClicked)
                if (value.StartsWith("this."))
                {
                    var tokens = InvocationExpressionTokenizer.Tokenize(value);
                    
                    var i = 0;
                    i++;// skip this
                    i++;// skip .
                    var methodName = tokens[i].Value;
                    i++;// skip methodName
                    i++;// skip (
                    var firstParameter = tokens[i].Value;
                    

                    var mi = Caller.GetType().GetMethod(methodName);

                    instance.On(eventName, () => { mi.Invoke(Caller, firstParameter); });
                    return;
                }

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
                throw new ArgumentException();
                // var pseudoAttributeName = name.Substring(11);
                // DOM.head.Append("<style>#" + instance.Id + "::" + pseudoAttributeName + "{ content:'bar' }</style>");
                // return;
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