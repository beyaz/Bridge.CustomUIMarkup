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

        internal XmlNode _rootNode;

        object _currentInstance;

        bool _isBuildingTemplate;
        #endregion

        #region Events
        event Action<int, FrameworkElement> ElementCreatedAtLine;
        #endregion

        #region Public Properties
        public object Caller { get; set; }
        public object DataContext { get; set; }

        public bool IsDesignMode { get; set; }

        public TypeFinder TypeFinder { get; set; } = new TypeFinder();
        #endregion

        #region Public Methods
        public static T Create<T>() where T : Control, new()
        {
            var control = new T();

            return ApplyTemplate(control);
        }

        public static void Register(string tag, Func<FrameworkElement> func)
        {
            _elementCreators[tag.ToUpper()] = func;
        }
        #endregion

        #region Methods
        public static T ApplyTemplate<T>(T control) where T : Control
        {
            control?.ApplyTemplate();

            return control;
        }

        internal static void BuildControlTemplate(Template xmlTemplate, FrameworkElement control)
        {
            var builder = new Builder
            {
                _rootNode = xmlTemplate.Root,
                DataContext = control,
                Caller = control,
                _isBuildingTemplate = true
            };

            var subControl = builder.BuildNode(builder._rootNode, control);

            var subControlAsFrameworkElement = subControl as FrameworkElement;
            if (subControlAsFrameworkElement == null)
            {
                throw new InvalidOperationException("TemplateControlFirstItemMustBeHTMLElement");
            }

            control._root = subControlAsFrameworkElement._root;
            control.AddVisualChild(subControlAsFrameworkElement);
        }

        public static void LoadComponent(FrameworkElement control, string xml)
        {
            LoadComponent(control, XmlHelper.GetRootNode(xml));
        }

        internal static void LoadComponent(FrameworkElement control, XmlNode node, bool IsDesignMode = false, Action<int, FrameworkElement> ElementCreatedAtLine = null, string xml = null)
        {
            var builder = new Builder
            {
                _rootNode = node,
                DataContext = control,
                Caller = control,
                IsDesignMode = IsDesignMode,
                XmlString = xml
            };

            if (ElementCreatedAtLine != null)
            {
                builder.ElementCreatedAtLine += ElementCreatedAtLine;
            }

            var subControl = builder.BuildNode(builder._rootNode, control);

            var subControlAsFrameworkElement = subControl as FrameworkElement;
            if (subControlAsFrameworkElement == null)
            {
                throw new InvalidOperationException("ControlFirstItemMustBeHTMLElement");
            }

            InitDOM(control);
            control.AddLogicalChild(subControlAsFrameworkElement);
        }

        static XmlNode GetFirstNodeSkipCommentAndText(XmlNodeList xmlNodeList)
        {
            var len = xmlNodeList.Count;

            for (var i = 0; i < len; i++)
            {
                var node = xmlNodeList[i];
                var nodeType = node.NodeType;

                if (nodeType == NodeType.Comment ||
                    nodeType == NodeType.Text)
                {
                    continue;
                }

                return node;
            }

            throw new InvalidOperationException("NodeCannotBeEmpty.");
        }

        static void InitDOM(FrameworkElement instance)
        {
            if (instance._root == null)
            {
                instance.InitDOM();
            }
        }

        static bool IsUserDefinedTag(string tag)
        {
            return tag.Contains('.') || tag.Contains('-') || tag.Contains(':');
        }

        object BuildNode(XmlNode xmlNode, FrameworkElement parentInstance)
        {
            if (xmlNode.NodeType == NodeType.Comment)
            {
                return null;
            }

            if (xmlNode.NodeType == NodeType.Text)
            {
                return BuildTextNode(xmlNode, parentInstance);
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

                ElementCreatedAtLine?.Invoke(lineNumber, instance);
            }

            InitializeDataContext(xmlNode, instance, parentInstance);

            

            ProcessAttributes(xmlNode, instance);

            var childNodes = xmlNode.ChildNodes;

            var len = childNodes.Count;

            for (var i = 0; i < len; i++)
            {
                var childNode = childNodes[i];

                var subItem = BuildNode(childNode, instance);

                Connect(instance, subItem);
            }

            return instance;
        }

        void ProcessAttributes(XmlNode xmlNode, FrameworkElement instance)
        {
            var attributes = xmlNode.Attributes;

            var len = attributes.Count;
            for (var i = 0; i < len; i++)
            {
                var nodeAttribute = attributes[i];

                ProcessAttribute(instance, nodeAttribute.Name, nodeAttribute.Value);
            }
        }

        object BuildTextNode(XmlNode xmlNode, FrameworkElement parentInstance)
        {
            // skip empty spaces
            var html = xmlNode.GetInnerText();
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
            
            parentInstance._root.Append(html);
            
            return null;
        }

        void Connect(object parent, object subItem)
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

            parent.As<FrameworkElement>().AddLogicalChild(subItemAsFrameworkElement);
        }

        FrameworkElement CreateInstanceInternal(XmlNode xmlNode)
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

            return (FrameworkElement)Activator.CreateInstance(controlType);
        }

        FrameworkElement CreateInstance(XmlNode xmlNode)
        {
            var instance = CreateInstanceInternal(xmlNode);
            InitDOM(instance);

            return instance;
        }

        void InitializeDataContext(XmlNode xmlNode, FrameworkElement instance, FrameworkElement parentInstance)
        {
            if (_isBuildingTemplate)
            {
                instance.DataContext = DataContext;
            }
            else
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
        }

        

        void ProcessAttribute(object instance, string name, string value)
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
                            Target = instance.As<FrameworkElement>()._root,
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

                    instance.As<FrameworkElement>().On(eventName, () => { mi.Invoke(Caller, firstParameter); });
                    return;
                }

                var methodInfo = Caller.GetType().GetMethod(value, ReflectionHelper.AllBindings);

                instance.As<FrameworkElement>().On(eventName, () => { methodInfo.Invoke(Caller); });
                return;
            }

            if (nameUpperCase.StartsWith("CSS."))
            {
                var styleAttributeName = name.Substring(4);
                instance.As<FrameworkElement>()._root.Css(styleAttributeName, value);
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

            instance.As<FrameworkElement>()._root.Attr(name, value);
        }

        bool TryToInitParentProperty(XmlNode xmlNode)
        {
            var parentNodeName = xmlNode.ParentNode.Name;
            var nodeName = xmlNode.Name;


            // <ItemsControl.ItemTemplate>

            if (!nodeName.StartsWith(parentNodeName + "."))
            {
                return false;
            }

            var propertyName = nodeName.RemoveFromStart(parentNodeName + ".");
            if (propertyName == null)
            {
                return false;
            }

            var propertyInfo = _currentInstance.GetType().GetProperty(propertyName);
            if (propertyInfo == null)
            {
                return false;
            }


            var propertyType = propertyInfo.PropertyType;
            if (propertyType == typeof(Template))
            {
                var propertyValue = Template.CreateFrom(GetFirstNodeSkipCommentAndText(xmlNode.ChildNodes));
                ReflectionHelper.SetPropertyValue(_currentInstance, propertyName, propertyValue);
                return true;
            }

            if (propertyType.IsNumeric() || propertyType == typeof(string))
            {
                var innerHTML = (xmlNode.GetInnerText() + "").Trim();

                ProcessAttribute( _currentInstance, propertyName, innerHTML);
                return true;
            }

            /*
                                <DataGrid.Columns>
                                    <DataGridColumn Name='FullName' Label='Adı SoyAdı' />
                                </DataGrid.Columns>
                            */
            if (propertyInfo.SetMethod == null)
            {
                var collection = propertyInfo.GetValue(_currentInstance);

                var addMethod = collection.GetType().GetMethod("Add");


                var childNodes = xmlNode.ChildNodes;

                var len = childNodes.Count;

                for (var i = 0; i < len; i++)
                {
                    var childNode = childNodes[i];

                    if (childNode.NodeType != NodeType.Element)
                    {
                        continue;
                    }

                    var subItem = CreateInstance(childNode);
                    
                    ProcessAttributes(childNode,subItem);

                    addMethod.Invoke(collection, subItem);
                }

                return true;

            }

            throw new NotImplementedException(nodeName);

        }
        #endregion
    }
}