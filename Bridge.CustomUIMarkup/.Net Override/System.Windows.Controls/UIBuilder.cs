﻿using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text.Tokenizers;
using System.Windows.Data;
using System.Xml;
using Bridge.CustomUIMarkup.UI;
using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Windows.Controls
{
    public class UIBuilder
    {
        #region Constants
        internal const string AttributeName_d_designerdataContext = "D:DESIGNERDATACONTEXT";
        #endregion

        #region Static Fields
        internal static readonly Dictionary<string, Func<FrameworkElement>> _elementCreators = new Dictionary<string, Func<FrameworkElement>>
        {
            {"DIV", () => new HtmlElement("div")}
        };

        static readonly BindingFlags FindPropertyFlag = BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase;
        #endregion

        #region Fields
        internal Element _rootNode;
        internal string  XmlString;
        readonly bool    _isMobile;
        object           _currentInstance;
        bool             _isBuildingTemplate;
        bool             _isDesignMode;
        #endregion

        #region Constructors
        public UIBuilder()
        {
            _isMobile = Window.Navigator.IsMobile();
        }
        #endregion

        #region Events
        event Action<int, FrameworkElement> ElementCreatedAtLine;
        #endregion

        #region Public Properties
        public object Caller { get; set; }

        public object DataContext { get; set; }
        #endregion

        #region Public Methods
      

        public static T Create<T>() where T : Control, new()
        {
            return new T();
        }

        public static void LoadComponent(FrameworkElement control, string xml)
        {
            LoadComponent(control, XmlHelper.GetRootNode(xml));
        }

        public static void Register(string tag, Func<FrameworkElement> func)
        {
            _elementCreators[tag.ToUpper()] = func;
        }
        #endregion

        #region Methods
        internal static void BuildControlTemplate(Template xmlTemplate, FrameworkElement control)
        {
            var builder = new UIBuilder
            {
                _rootNode           = xmlTemplate.Root,
                DataContext         = control,
                Caller              = control,
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

        internal static void LoadComponent(FrameworkElement control, Element node, bool isDesignMode = false, Action<int, FrameworkElement> ElementCreatedAtLine = null, string xml = null)
        {
            var builder = new UIBuilder
            {
                _rootNode     = node,
                DataContext   = control,
                Caller        = control,
                _isDesignMode = isDesignMode,
                XmlString     = xml
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

        static void Connect(object parent, object subItem)
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

        static Element GetFirstNodeSkipCommentAndText(ElementList nodes)
        {
            var len = nodes.Length;

            for (var i = 0; i < len; i++)
            {
                var node     = nodes[i];
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

        void BuildChildNodes(FrameworkElement instance, NodeList childNodes)
        {
            var len = childNodes.Length;

            for (var i = 0; i < len; i++)
            {
                var childNode = childNodes[i];

                var childNodeTag = childNode.NodeName.ToUpperCase();
                if (childNodeTag == "IF-MOBILE")
                {
                    if (!_isMobile)
                    {
                        continue;
                    }

                    BuildChildNodes(instance, childNode.ChildNodes);
                    continue;
                }

                if (childNodeTag == "IF-NOT-MOBILE")
                {
                    if (_isMobile)
                    {
                        continue;
                    }

                    BuildChildNodes(instance, childNode.ChildNodes);
                    continue;
                }

                var subItem = BuildNode(childNode.As<Element>(), instance);

                Connect(instance, subItem);
            }
        }

        object BuildNode(Element xmlNode, FrameworkElement parentInstance)
        {
            if (xmlNode.NodeType == NodeType.Comment)
            {
                return null;
            }

            if (xmlNode.NodeType == NodeType.Text)
            {
                return BuildTextNode(xmlNode, parentInstance);
            }

            if (TryToInitParentProperty(xmlNode))
            {
                return null;
            }

            var instance = CreateInstance(xmlNode);

            _currentInstance = instance;

            if (_isDesignMode)
            {
                var lineNumber = xmlNode.GetOriginalLineNumber(_rootNode, XmlString);

                ElementCreatedAtLine?.Invoke(lineNumber, instance);
            }

            InitializeDataContext(xmlNode, instance, parentInstance);

            ProcessAttributes(xmlNode, instance);

            BuildChildNodes(instance, xmlNode.ChildNodes);

            return instance;
        }

        object BuildTextNode(Element xmlNode, FrameworkElement parentInstance)
        {
            // skip empty spaces
            var html = xmlNode.GetInnerText();
            if (string.IsNullOrWhiteSpace(html))
            {
                return null;
            }

            // maybe <div> {LastName} </div>
            var bindingInfo = HTMLBindingInfo.TryParseExpression(html);
            if (bindingInfo != null)
            {
                var textNode = new jQuery(Document.CreateTextNode(""));
                parentInstance._root.Append(textNode);

                bindingInfo.BindingMode = BindingMode.OneWay;

                bindingInfo.Source     = parentInstance;
                bindingInfo.SourcePath = "DataContext." + bindingInfo.SourcePath.Path;

                bindingInfo.Target     = textNode;
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

        FrameworkElement CreateInstance(Element xmlNode)
        {
            var instance = CreateInstanceInternal(xmlNode);
            InitDOM(instance);

            return instance;
        }

        FrameworkElement CreateInstanceInternal(Element xmlNode)
        {
            var tag = xmlNode.NodeName.ToUpper();

            Func<FrameworkElement> creatorFunc = null;
            _elementCreators.TryGetValue(tag.ToUpper(), out creatorFunc);
            if (creatorFunc != null)
            {
                return creatorFunc();
            }

            if (IsUserDefinedTag(xmlNode.NodeName) == false)
            {
                return new HtmlElement(xmlNode.NodeName);
            }

            throw new ArgumentException("NotRecognizedTag:" + tag);
        }

        void InitializeDataContext(Element xmlNode, FrameworkElement instance, FrameworkElement parentInstance)
        {
            if (_isBuildingTemplate)
            {
                instance.DataContext = DataContext;
                return;
            }

            var subControlDataContextAttribute = xmlNode.Attributes["DataContext"];
            if (subControlDataContextAttribute == null)
            {
                var bindingInfo = new BindingInfo
                {
                    BindingMode = BindingMode.OneWay,
                    Source      = parentInstance,
                    SourcePath  = "DataContext",
                    Target      = instance,
                    TargetPath  = "DataContext"
                };
                bindingInfo.Connect();
                return;
            }

            var bi = BindingInfo.TryParseExpression(subControlDataContextAttribute.NodeValue);
            if (bi == null)
            {
                throw new InvalidOperationException("InvalidBindingExpression:" + subControlDataContextAttribute.NodeValue);
            }

            bi.BindingMode = BindingMode.OneWay;
            bi.Source      = parentInstance;
            bi.SourcePath  = "DataContext." + bi.SourcePath.Path;
            bi.Target      = instance;
            bi.TargetPath  = "DataContext";
            bi.Connect();
        }

        void ProcessAttribute(object instance, string name, string value)
        {
            var nameUpperCase = name.ToUpperCase();

            if (nameUpperCase == "DATACONTEXT" || name == AttributeName_d_designerdataContext)
            {
                return;
            }

            if (name == "class")
            {
                name = "Class";
            }

            var targetProperty = ReflectionHelper.FindProperty(instance, name, FindPropertyFlag);

            if (targetProperty != null && name != targetProperty.Name)
            {
                name = targetProperty.Name;
            }

            var bi = BindingInfo.TryParseExpression(value);
            if (bi != null)
            {
                var eventInfo = ReflectionHelper.FindEvent(instance, name, FindPropertyFlag);
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
                        var htmlBindingInfo = new HTMLBindingInfo
                        {
                            Source      = instance,
                            SourcePath  = new PropertyPath("DataContext." + bi.SourcePath.Path),
                            Target      = instance.As<FrameworkElement>()._root,
                            TargetPath  = name,
                            BindingMode = BindingMode.OneWay
                        };

                        if ( bi.BindingMode == BindingMode.TwoWay &&  HTMLBindingInfo.TargetCanUpdateSource(htmlBindingInfo.Target))
                        {
                            htmlBindingInfo.BindingMode = BindingMode.TwoWay;
                        }

                        htmlBindingInfo.Connect();

                        return;
                    }
                }

                bi.SourcePath = new PropertyPath("DataContext." + bi.SourcePath.Path);
                bi.Source     = instance;

                bi.Target     = instance;
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

                var converterAttributes    = targetProperty.GetCustomAttributes(typeof(TypeConverterAttribute));
                var firstConverterAtribute = converterAttributes?.FirstOrDefault();
                if (firstConverterAtribute != null)
                {
                    var converter      = (TypeConverterAttribute) firstConverterAtribute;
                    var valueConverter = (IValueConverter) Activator.CreateInstance(converter._type);
                    var convertedValue = valueConverter.Convert(value, targetProperty.PropertyType, null, CultureInfo.CurrentCulture);

                    ReflectionHelper.SetPropertyValue(instance, targetProperty.Name, convertedValue);
                    return;
                }

                var propertyValue = Cast.To(value, targetProperty.PropertyType, CultureInfo.CurrentCulture);
                ReflectionHelper.SetPropertyValue(instance, targetProperty.Name, propertyValue);
                return;
            }

            if (name.StartsWith("on."))
            {
                var eventName = name.RemoveFromStart("on.");

                // support this format: this.Notify(OnContactClicked)
                if (value.StartsWith("this."))
                {
                    var viewInvocationExpressionInfo = ViewInvocationExpressionInfo.Parse(value);

                    var methodName = viewInvocationExpressionInfo.MethodName;

                    var mi = Caller.GetType().GetMethod(methodName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);

                    instance.As<FrameworkElement>().On(eventName, () =>
                    {
                        if (mi == null)
                        {
                            throw new MissingMemberException(Caller.GetType().FullName + "->" + methodName);
                        }

                        mi.Invoke(Caller, viewInvocationExpressionInfo.Parameters.ToArray());
                    });
                    return;
                }

                var methodInfo = Caller.GetType().GetMethod(value, ReflectionHelper.AllBindings);

                instance.As<FrameworkElement>().On(eventName, () =>
                {
                    if (methodInfo == null)
                    {
                        throw new MissingMemberException(Caller.GetType().FullName + "::" + value);
                    }

                    methodInfo.Invoke(Caller);
                });
                return;
            }

            if (nameUpperCase.StartsWith("CSS."))
            {
                var styleAttributeName = name.Substring(4);
                instance.As<FrameworkElement>()._root.Css(styleAttributeName, value);
                return;
            }

            if (nameUpperCase == "X.NAME" || nameUpperCase == "X:NAME")
            {
                ReflectionHelper.SetNonStaticField(Caller, value, instance);

                return;
            }

            instance.As<FrameworkElement>()._root.Attr(name, value);
        }

        void ProcessAttributes(Element xmlNode, FrameworkElement instance)
        {
            var attributes = xmlNode.Attributes;

            var len = attributes.Length;
            for (var i = 0; i < len; i++)
            {
                var nodeAttribute = attributes[i];

                ProcessAttribute(instance, nodeAttribute.NodeName, nodeAttribute.NodeValue);
            }
        }

        bool TryToInitParentProperty(Element xmlNode)
        {
            var parentNodeName = xmlNode.ParentNode?.NodeName;
            var nodeName       = xmlNode.NodeName;

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

            var propertyInfo = ReflectionHelper.FindProperty(_currentInstance, propertyName, FindPropertyFlag);
            if (propertyInfo == null)
            {
                return false;
            }

            var propertyType = propertyInfo.PropertyType;
            if (propertyType == typeof(Template))
            {
                var propertyValue = Template.CreateFrom(GetFirstNodeSkipCommentAndText(xmlNode.ChildNodes.As<ElementList>()));
                ReflectionHelper.SetPropertyValue(_currentInstance, propertyInfo.Name, propertyValue);
                return true;
            }

            var processAsAttribute = propertyType.IsNumeric() || propertyType == typeof(string);
            if (!processAsAttribute)
            {
                processAsAttribute = Nullable.GetUnderlyingType(propertyType)?.IsNumeric() == true;
            }

            if (processAsAttribute)
            {
                var innerHTML = (xmlNode.GetInnerText() + "").Trim();

                ProcessAttribute(_currentInstance, propertyInfo.Name, innerHTML);
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

                var len = childNodes.Length;

                for (var i = 0; i < len; i++)
                {
                    var childNode = childNodes[i];

                    if (childNode.NodeType != NodeType.Element)
                    {
                        continue;
                    }

                    var subItem = CreateInstance(childNode.As<Element>());

                    InitializeDataContext(childNode.As<Element>(), subItem, _currentInstance.As<FrameworkElement>());

                    ProcessAttributes(childNode.As<Element>(), subItem);

                    addMethod.Invoke(collection, subItem);
                }

                return true;
            }

            throw new NotImplementedException(nodeName);
        }
        #endregion
    }
}