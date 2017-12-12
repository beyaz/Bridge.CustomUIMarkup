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

        public static void Build2(string xmlTemplate, object dataContext, FrameworkElement caller)
        {
            var builder = new Builder
            {
                XmlString = xmlTemplate,
                DataContext = dataContext,
                Caller = caller
            };

            

            builder.Build();

            // InitDOM(caller);

            // caller.AddLogicalChild(content);
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

        internal static void BuildControlTemplate(Template xmlTemplate, FrameworkElement control)
        {
            var builder = new Builder
            {
                _rootNode = xmlTemplate.Root,
                DataContext = control,
                Caller = control,
                _isBuildingTemplate = true,
            };

            var subControl =  builder.BuildNode(builder._rootNode,control);

            var subControlAsFrameworkElement = subControl as FrameworkElement;
            if (subControlAsFrameworkElement == null)
            {
                throw new InvalidOperationException("TemplateControlFirstItemMustBeHTMLElement");
            }

            control._root = subControlAsFrameworkElement._root;
            control.AddVisualChild(subControlAsFrameworkElement);
        }

        internal static void LoadComponent(FrameworkElement control,string xml)
        {
           
            var builder = new Builder
            {
                _rootNode = XmlHelper.GetRootNode(xml),
                DataContext = control,
                Caller = control
            };

            var subControl = builder.BuildNode(builder._rootNode, control);

            var subControlAsFrameworkElement = subControl as FrameworkElement;
            if (subControlAsFrameworkElement == null)
            {
                throw new InvalidOperationException("ControlFirstItemMustBeHTMLElement");
            }

            InitDOM(control);
            control.AddLogicalChild(subControlAsFrameworkElement);
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
            if (TryToInitParentProperty(xmlNode))
            {
                return null;
            }


            var instance = CreateInstance(xmlNode);


            _currentInstance = instance;

            

            if (IsDesignMode)
            {
                var lineNumber = xmlNode.GetOriginalLineNumber(_rootNode, XmlString);

                LineNumberToControlMap[lineNumber] = instance;
            }

            instance.DataContext = DataContext;

            InitDOM(instance);

            var attributes = xmlNode.Attributes;

            var len = attributes.Count;
            for (var i = 0; i < len; i++)
            {
                var nodeAttribute = attributes[i];

                ProcessAttribute(instance, nodeAttribute.Name, nodeAttribute.Value);
            }


            var childNodes = xmlNode.ChildNodes;

            len = childNodes.Count;

            for (var i = 0; i < len; i++)
            {
                var childNode = childNodes[i];

                var subItem = BuildNode(childNode, instance);

                Connect(instance, subItem);
            }

            return instance;
        }


        void Connect(FrameworkElement parent, object subItem)
        {

            if (subItem == null)
            {
               return;
            }
            var subItemAsFrameworkElement = subItem as FrameworkElement;
            if (subItemAsFrameworkElement == null)
            {
                return;
            }

           

            parent.AddLogicalChild(subItemAsFrameworkElement);
        }

        static void InitDOM(FrameworkElement instance)
        {
            if (instance._root == null)
            {
                instance.InitDOM();
            }
        }

        bool TryToInitParentProperty(XmlNode xmlNode)
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
                        if (propertyInfo.PropertyType == typeof(Template))
                        {
                            var propertyValue = Template.CreateFrom(GetFirstNodeSkipCommentAndText(xmlNode.ChildNodes));
                            ReflectionHelper.SetPropertyValue(_currentInstance, propertyName, propertyValue);
                            return true;
                        }

                        /*
                                <DataGrid.Columns>
                                    <DataGridColumn Name='FullName' Label='Adı SoyAdı' />
                                </DataGrid.Columns>
                            */
                        if (propertyInfo.SetMethod == null)
                        {
                            
                        }

                        throw new NotImplementedException(xmlNode.Name);
                    }
                }
            }
            return false;
        }

        static XmlNode GetFirstNodeSkipCommentAndText(XmlNodeList xmlNodeList)
        {
            var len = xmlNodeList.Count;

            for (var i = 0; i < len; i++)
            {
                var node = xmlNodeList[i];
                var nodeType = node.NodeType;

                if (nodeType == NodeType.Comment||
                    nodeType == NodeType.Text)
                {
                    continue;
                }

                return node;
            }

            throw new InvalidOperationException("NodeCannotBeEmpty.");
        }
        object BuildNode(XmlNode xmlNode, FrameworkElement parentInstance)
        {
            if (xmlNode.NodeType == NodeType.Comment)
            {
                return null;
            }

            if (xmlNode.NodeType == NodeType.Text)
            {
                // skip empty spaces
                var html = new jQuery(xmlNode).Text();
                if (string.IsNullOrWhiteSpace(html))
                {
                    return null;
                }

                // maybe <div> {LastName} </div>
                var bindingInfo = BindingInfo.TryParseExpression(html);
                if (bindingInfo != null)
                {
                    bindingInfo.BindingMode = BindingMode.OneWay;

                    bindingInfo.Source = parentInstance;
                    bindingInfo.SourcePath = "DataContext." + bindingInfo.SourcePath.Path;

                    bindingInfo.Target = parentInstance;
                    bindingInfo.TargetPath = nameof(parentInstance.InnerHTML);

                    bindingInfo.Connect();
                    return null;
                }

                var instanceAsContentControl = parentInstance as ContentControl;
                if (instanceAsContentControl != null)
                {
                    instanceAsContentControl.Content = html;
                    return null;
                }

                parentInstance.InnerHTML = html;
                return null;
            }



            //
            if (TryToInitParentProperty(xmlNode))
            {
                return null;
            }


            var instance = CreateInstance(xmlNode);


            _currentInstance = instance;



            if (IsDesignMode)
            {
                var lineNumber = xmlNode.GetOriginalLineNumber(_rootNode, XmlString);

                LineNumberToControlMap[lineNumber] = instance;
            }

            instance.DataContext = DataContext;

            InitDOM(instance);

            var attributes = xmlNode.Attributes;

            var len = attributes.Count;
            for (var i = 0; i < len; i++)
            {
                var nodeAttribute = attributes[i];

                ProcessAttribute(instance, nodeAttribute.Name, nodeAttribute.Value);
            }


            var childNodes = xmlNode.ChildNodes;

            len = childNodes.Count;

            for (var i = 0; i < len; i++)
            {
                var childNode = childNodes[i];

                var subItem = BuildNode(childNode, instance);

                Connect(instance, subItem);
            }
            //


            

            if (!_isBuildingTemplate)
            {
                var subControlDataContextAttribute = xmlNode.Attributes["DataContext"];
                if (subControlDataContextAttribute == null)
                {
                    var bindingInfo = new BindingInfo
                    {
                        BindingMode = BindingMode.OneWay,
                        Source = parentInstance,
                        SourcePath = "DataContext",
                        Target = instance,
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
                    bi.Source = parentInstance;
                    bi.SourcePath = "DataContext." + bi.SourcePath.Path;
                    bi.Target = instance;
                    bi.TargetPath = "DataContext";
                    bi.Connect();
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


            if (name == "DataContext")
            {
                return;
            }


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