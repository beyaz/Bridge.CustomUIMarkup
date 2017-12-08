using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Xml;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.Tokenizers;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.UI
{
    public class Builder
    {
        #region Static Fields
        static readonly Dictionary<string, Func<FrameworkElement>> _elementCreators = new Dictionary<string, Func<FrameworkElement>>
        {
            {"DIV", () => new HtmlElement("div")}
        };

        static readonly Tokenizer InvocationExpressionTokenizer = new Tokenizer
        {
            TokenDefinitions = InvocationExpressionTokenDefinitions.Value
        };
        #endregion

        #region Fields
        public string XmlString;

        bool _isBuildingTemplate;

        Dictionary<int, object> _lineNumberToControlMap;

        FrameworkElement _root;

        internal XmlNode  _rootNode;
        #endregion

        #region Public Properties
        public object Caller { get; set; }
        public object DataContext { get; set; }

        public bool IsDesignMode { get; set; }

        public TypeFinder TypeFinder { get; set; } = new TypeFinder();
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
        public static FrameworkElement Build(string xmlTemplate, object dataContext, object caller)
        {
            var builder = new Builder
            {
                XmlString = xmlTemplate,
                DataContext = dataContext,
                Caller = caller
            };
            return builder.Build();
        }

        public static FrameworkElement Build(string xmlTemplate, object dataContext)
        {
            var builder = new Builder
            {
                XmlString = xmlTemplate,
                DataContext = dataContext
            };
            return builder.Build();
        }

        public static void Build(Template xmlTemplate, object dataContext, object caller = null)
        {
            var builder = new Builder
            {
                _rootNode = xmlTemplate.Root,
                DataContext = dataContext,
                Caller = caller ?? dataContext,
                _isBuildingTemplate = true
            };

            builder.BuildNode(builder._rootNode);
        }

        public static T Create<T>() where T : Control, new()
        {
            var control = new T();

            return ApplyTemplate(control);
        }

        public static void Register(string tag, Func<FrameworkElement> func)
        {
            _elementCreators[tag.ToUpper()] = func;
        }

        public FrameworkElement Build()
        {
            var rootNode = _rootNode;
            if (rootNode == null)
            {
                rootNode = _rootNode = XmlHelper.GetRootNode(XmlString);
            }

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
        internal static T ApplyTemplate<T>(T control) where T : Control
        {
            control?.ApplyTemplate();

            return control;
        }

        static bool IsUserDefinedTag(string tag)
        {
            return tag.Contains('.') || tag.Contains('-') || tag.Contains(':');
        }

        object _currentInstance;
        FrameworkElement BuildNode(XmlNode xmlNode)
        {
            var rootIsNull = _root == null;

            FrameworkElement instance = null;
            var rootInstanceIsCaller = false;
            FrameworkElement callerAsFrameworkElement = null;

            if (rootIsNull)
            {
                if (_isBuildingTemplate)
                {
                    rootInstanceIsCaller = true;
                }

                callerAsFrameworkElement = Caller as FrameworkElement;
                if (callerAsFrameworkElement != null)
                {
                    rootInstanceIsCaller = true;
                }
            }

            if (rootInstanceIsCaller)
            {
                if (callerAsFrameworkElement == null)
                {
                    throw new InvalidOperationException("Caller class mustbe inherit from FrameworkElement.");
                }

                instance = callerAsFrameworkElement;

                var copy = CreateInstance(xmlNode);
                if (copy._root == null)
                {
                    copy.InitDOM();
                }
                instance._root = copy._root;
                // TODO: copy create etmeden yapılabilmeli
            }
            else
            {
                var parentNodeName = xmlNode.ParentNode.Name;
                // <ItemsControl.ItemTemplate>
                if (xmlNode.Name.StartsWith(parentNodeName + "."))
                {
                    var propertyName = xmlNode.Name.RemoveFromStart(parentNodeName + ".");
                    if (propertyName != null)
                    {
                        var propertyInfo = _currentInstance.GetType().GetProperty(propertyName);
                        if (propertyInfo != null)
                        {
                            var propertyValue =  Template.CreateFrom(xmlNode.ChildNodes[1]);
                            ReflectionHelper.SetPropertyValue(_currentInstance,propertyName,propertyValue);
                            return null;
                        }
                    }
                }

                instance = CreateInstance(xmlNode);
            }

            _currentInstance = instance;

            if (rootIsNull)
            {
                _root = instance;
            }

            if (IsDesignMode)
            {
                var lineNumber = xmlNode.GetOriginalLineNumber(_rootNode, XmlString);

                LineNumberToControlMap[lineNumber] = instance;
            }

            //if (instance.DataContext == null)
            {
                instance.DataContext = DataContext;
            }

            if (instance._root == null)
            {
                instance.InitDOM();

                //var template = instance.Template ?? Template.GetDefaultTemplate(instance.GetType());

                //if (  !rootIsNull && template != null)
                //{
                //    Build(template, instance);

                //    if (instance._root == null)
                //    {
                //        throw new InvalidOperationException("Template must have root node.");
                //    }
                //}
                //else
                //{
                //    instance.InitDOM();
                //}
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

                    var instanceAsContentControl = instance as ContentControl;
                    if (instanceAsContentControl!=null)
                    {
                        instanceAsContentControl.Content = html;
                        continue;
                    }

                    instance.InnerHTML = html;
                    continue;
                }

                var subControl = BuildNode(childNode);

                var subNodeAlreadyProcessed = subControl == null;
                if (subNodeAlreadyProcessed)
                {
                    continue;
                }

                if (!_isBuildingTemplate)
                {
                    var subControlDataContextAttribute = childNode.Attributes["DataContext"];
                    if (subControlDataContextAttribute == null)
                    {
                        var bindingInfo = new BindingInfo
                        {
                            BindingMode = BindingMode.OneWay,
                            Source = instance,
                            SourcePath = "DataContext",
                            Target = subControl,
                            TargetPath = "DataContext"
                        };
                        bindingInfo.Connect();
                    }
                    else
                    {
                        var bi = BindingInfo.TryParseExpression(subControlDataContextAttribute.Value);
                        if (bi == null)
                        {
                            throw new InvalidOperationException("InvalidBindingExpression:" + subControlDataContextAttribute.Value);
                        }
                        bi.BindingMode = BindingMode.OneWay;
                        bi.Source = instance;
                        bi.SourcePath = "DataContext." + bi.SourcePath.Path;
                        bi.Target = subControl;
                        bi.TargetPath = "DataContext";
                        bi.Connect();
                    }
                }

                // instance.AddVisualChild(subControl);

                //if (!_isBuildingTemplate)
                //{
                //    instance.AddLogicalChild(subControl);
                //}

                if (_isBuildingTemplate && rootIsNull) // complex işlerde karışıyor incele TODO:WhiteSone
                {
                    instance.AddVisualChild(subControl);
                }
                else
                {
                    instance.AddLogicalChild(subControl);
                }
            }

            return instance;
        }

        FrameworkElement CreateInstance(XmlNode xmlNode)
        {
            var tag = xmlNode.Name.ToUpper();

            Func<FrameworkElement> creatorFunc = null;
            _elementCreators.TryGetValue(tag.ToUpper(), out creatorFunc);
            if (creatorFunc != null)
            {
                return creatorFunc();
            }

            var controlType = TypeFinder?.FindType(tag);

            if (controlType == null)
            {
                if (IsUserDefinedTag(xmlNode.Name) == false)
                {
                    return new HtmlElement(xmlNode.Name);
                }

                throw new ArgumentException("NotRecognizedTag:" + tag);
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
                            Source = instance,
                            SourcePath = new PropertyPath("DataContext." + bi.SourcePath.Path),
                            Target = instance._root,
                            TargetPath = name,
                            BindingMode = BindingMode.OneWay
                        }.Connect();

                        return;
                    }
                }

                bi.SourcePath = new PropertyPath("DataContext." + bi.SourcePath.Path);
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
                    i++; // skip this
                    i++; // skip .
                    var methodName = tokens[i].Value;
                    i++; // skip methodName
                    i++; // skip (
                    var firstParameter = tokens[i].Value;

                    var mi = Caller.GetType().GetMethod(methodName);

                    instance.On(eventName, () => { mi.Invoke(Caller, firstParameter); });
                    return;
                }

                var methodInfo = Caller.GetType().GetMethod(value,ReflectionHelper.AllBindings);

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
                ReflectionHelper.SetNonStaticField(Caller, value, instance);
                
                return;
            }

            instance._root.Attr(name, value);
        }
        #endregion
    }
}