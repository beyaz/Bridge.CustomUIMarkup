using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Data;
using System.Windows.Markup;
using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Windows
{
    public enum TextWrapping
    {
        WrapWithOverflow,
        NoWrap,
        Wrap
    }

    public class FrameworkElement : DependencyObject, IAddChild
    {
        #region Fields
        protected internal jQuery _root;

        protected List<FrameworkElement> _childeren;
        #endregion

        #region Constructors
        public FrameworkElement()
        {
            PropertyChanged += (s, e) =>
            {
                var propertyChangeEventArgs = e as BagChangedEventArgs;
                if (propertyChangeEventArgs != null)
                {
                    DependencyProperty.TryInvokeOnPropertyChange(this, propertyChangeEventArgs.PropertyName, propertyChangeEventArgs.NewValue, propertyChangeEventArgs.OldValue);
                }
            };
        }
        #endregion

        #region Public Properties
        public IReadOnlyList<FrameworkElement> Childeren
        {
            get
            {
                if (_childeren == null)
                {
                    _childeren = new List<FrameworkElement>();
                }

                return _childeren;
            }
        }

        public jQuery Root => _root;
        #endregion

        #region Properties
        protected int ChildrenCount => (_childeren?.Count).GetValueOrDefault();
        #endregion

        #region Public Methods
        public virtual void Add(FrameworkElement element)
        {
            element._root.AppendTo(_root);

            AddChild(element);
        }

        public object GetValue(DependencyProperty dp)
        {
            var value = this[dp.Name];
            if (value == null)
            {
                if (dp.PropertyMetadata.DefaultValue != null)
                {
                    return dp.PropertyMetadata.DefaultValue;
                }
                if (dp.PropertyType.IsEnum)
                {
                    return Enum.Parse(dp.PropertyType, "0");
                }
            }
            return value;
        }

        public virtual void InitDOM()
        {
            _root = new jQuery(Document.CreateElement("div"));
        }

        public void SetValue(DependencyProperty dp, object value)
        {
            this[dp.Name] = value;
        }
        #endregion

        #region Methods
        protected static PropertyMetadata CreateHtmlAttributeUpdater(string htmlAttribute)
        {
            return new PropertyMetadata((d, e) =>
            {
                var me = (FrameworkElement) d;

                me._root.Attr(htmlAttribute, (string) e.NewValue);
            });
        }

        protected static PropertyMetadata CreateJQueryCssUpdater(string jqueryCssAttribute)
        {
            return new PropertyMetadata((d, e) =>
            {
                var me = (FrameworkElement) d;

                me._root.Css(jqueryCssAttribute, e.NewValue);
            });
        }

        protected virtual void AddChild(FrameworkElement element)
        {
            BeforeAddChild(element);

            if (_childeren == null)
            {
                _childeren = new List<FrameworkElement>();
            }
            _childeren.Add(element);

            AfterAddChild(element);
        }

        protected virtual void AfterAddChild(FrameworkElement element)
        {
        }

        protected virtual void AfterInitDOM()
        {
        }

        protected virtual void BeforeAddChild(FrameworkElement element)
        {
        }

        protected virtual void BindPropertyToInnerHTML(string propertyName, jQuery targetElement)
        {
            // TODO: remove
            PropertyChanged += (s, a) =>
            {
                var bi = new HTMLBindingInfo
                {
                    BindingMode = BindingMode.OneWay,
                    Source = this,
                    SourcePath = propertyName,
                    Target = targetElement,
                    UpdateOnlyInnerHTML = true
                };
                bi.UpdateTarget();
            };
        }
        #endregion

        #region BorderProperty
        public static readonly DependencyProperty BorderProperty = DependencyProperty.Register(nameof(Border), typeof(string), typeof(FrameworkElement), CreateJQueryCssUpdater("border"));

        public string Border
        {
            get { return (string) GetValue(BorderProperty); }
            set { SetValue(BorderProperty, value); }
        }
        #endregion

        #region ClassProperty
        public static readonly DependencyProperty ClassProperty = DependencyProperty.Register(nameof(Class), typeof(string), typeof(FrameworkElement), CreateHtmlAttributeUpdater("class"));

        public string Class
        {
            get { return (string) GetValue(ClassProperty); }
            set { SetValue(ClassProperty, value); }
        }
        #endregion

        #region AddClassProperty
        public static readonly DependencyProperty AddClassProperty = DependencyProperty.Register(nameof(AddClass), typeof(string), typeof(FrameworkElement), new PropertyMetadata(OnAddClassChanged));

        public string AddClass
        {
            get { return (string) GetValue(AddClassProperty); }
            set { SetValue(AddClassProperty, value); }
        }

        protected static void OnAddClassChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            me._root?.AddClass((string) e.NewValue);
        }
        #endregion

        #region Margin
        #region MarginProperty
        public static readonly DependencyProperty MarginProperty = DependencyProperty.Register(nameof(Margin),
                                                                                                   typeof(double?),
                                                                                                   typeof(FrameworkElement),
                                                                                                   CreateJQueryCssUpdater("margin"));


        public double? Margin
        {
            get { return (double?)GetValue(MarginProperty); }
            set { SetValue(MarginProperty, value); }
        }
        #endregion

        #region MarginLeftProperty
        public static readonly DependencyProperty MarginLeftProperty = DependencyProperty.Register(nameof(MarginLeft),
                                                                                                   typeof(double?),
                                                                                                   typeof(FrameworkElement),
                                                                                                   CreateJQueryCssUpdater("marginLeft"));

       
        public double? MarginLeft
        {
            get { return (double?)GetValue(MarginLeftProperty); }
            set { SetValue(MarginLeftProperty, value); }
        }
        #endregion

        #region MarginRightProperty
        public static readonly DependencyProperty MarginRightProperty = DependencyProperty.Register(nameof(MarginRight),
                                                                                                    typeof(double?),
                                                                                                    typeof(FrameworkElement),
                                                                                                    CreateJQueryCssUpdater("marginRight"));

       

        public double? MarginRight
        {
            get { return (double?)GetValue(MarginRightProperty); }
            set { SetValue(MarginRightProperty, value); }
        }

        #endregion

        #region MarginBottomProperty
        public static readonly DependencyProperty MarginBottomProperty = DependencyProperty.Register(nameof(MarginBottom),
                                                                                                     typeof(double?),
                                                                                                     typeof(FrameworkElement),
                                                                                                     CreateJQueryCssUpdater("marginBottom"));

      
        public double? MarginBottom
        {
            get { return (double?)GetValue(MarginBottomProperty); }
            set { SetValue(MarginBottomProperty, value); }
        }
        #endregion

        #region MarginTopProperty
        public static readonly DependencyProperty MarginTopProperty = DependencyProperty.Register(nameof(MarginTop),
                                                                                                  typeof(double?),
                                                                                                  typeof(FrameworkElement),
                                                                                                  CreateJQueryCssUpdater("marginTop"));

        public double? MarginTop
        {
            get { return (double?)GetValue(MarginTopProperty); }
            set { SetValue(MarginTopProperty, value); }
        }
        

        #endregion
        #endregion

        #region Padding
        #region PaddingLeftProperty
        public static readonly DependencyProperty PaddingLeftProperty = DependencyProperty.Register(nameof(PaddingLeft), typeof(double?),
                                                                                                    typeof(FrameworkElement),
                                                                                                    CreateJQueryCssUpdater("paddingLeft"));

       
        public double? PaddingLeft
        {
            get { return (double?)GetValue(PaddingLeftProperty); }
            set { SetValue(PaddingLeftProperty, value); }
        }
        #endregion

        #region PaddingRightProperty
        public static readonly DependencyProperty PaddingRightProperty = DependencyProperty.Register(nameof(PaddingRight),
                                                                                                     typeof(double?), typeof(FrameworkElement),
                                                                                                     CreateJQueryCssUpdater("paddingRight"));

        
        public double? PaddingRight
        {
            get { return (double?)GetValue(PaddingRightProperty); }
            set { SetValue(PaddingRightProperty, value); }
        }
        #endregion

        #region PaddingBottomProperty
        public static readonly DependencyProperty PaddingBottomProperty = DependencyProperty.Register(nameof(PaddingBottom),
                                                                                                      typeof(double?),
                                                                                                      typeof(FrameworkElement),
                                                                                                      CreateJQueryCssUpdater("paddingBottom"));

        
        public double? PaddingBottom
        {
            get { return (double?)GetValue(PaddingBottomProperty); }
            set { SetValue(PaddingBottomProperty, value); }
        }
        #endregion

        #region PaddingTopProperty
        public static readonly DependencyProperty PaddingTopProperty = DependencyProperty.Register(nameof(PaddingTop),
                                                                                                   typeof(double?), typeof(FrameworkElement),
                                                                                                   CreateJQueryCssUpdater("paddingTop"));

       
        public double? PaddingTop
        {
            get { return (double?)GetValue(PaddingTopProperty); }
            set { SetValue(PaddingTopProperty, value); }
        }
        #endregion

        #region PaddingBottomProperty
        public static readonly DependencyProperty PaddingProperty = DependencyProperty.Register(nameof(Padding),
                                                                                                      typeof(double?),
                                                                                                      typeof(FrameworkElement),
                                                                                                      CreateJQueryCssUpdater("padding"));

        public double? Padding
        {
            get { return (double?)GetValue(PaddingProperty); }
            set { SetValue(PaddingProperty,value); }
        }
        #endregion
        #endregion

        #region TextWrappingProperty
        public static readonly DependencyProperty TextWrappingProperty = DependencyProperty.Register(nameof(TextWrapping), typeof(TextWrapping), typeof(FrameworkElement), new PropertyMetadata(OnTextWrappingChanged));

        public TextWrapping TextWrapping
        {
            get { return (TextWrapping) this[nameof(TextWrapping)]; }
            set { this[nameof(TextWrapping)] = value; }
        }

        static void OnTextWrappingChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (TextWrapping) e.NewValue;
            if (value == TextWrapping.NoWrap)
            {
                me._root.Css("white-space", "nowrap");
                return;
            }
            if (value == TextWrapping.Wrap)
            {
                me._root.Css("white-space", "normal");
                return;
            }

            throw new ArgumentException(value.ToString());
        }
        #endregion

        #region FontWeightProperty
        public static readonly DependencyProperty FontWeightProperty = DependencyProperty.Register(nameof(FontWeight),
                                                                                                   typeof(double),
                                                                                                   typeof(FrameworkElement),
                                                                                                   CreateJQueryCssUpdater("fontWeight"));

        public object FontWeight
        {
            get { return this[nameof(FontWeight)]; }
            set { this[nameof(FontWeight)] = value; }
        }
        #endregion

        #region FontSizeProperty
        public static readonly DependencyProperty FontSizeProperty = DependencyProperty.Register(nameof(FontSize),
                                                                                                 typeof(double),
                                                                                                 typeof(FrameworkElement),
                                                                                                 CreateJQueryCssUpdater("fontSize"));

        public double FontSize
        {
            get { return (double) GetValue(FontSizeProperty); }
            set { SetValue(FontSizeProperty, value); }
        }
        #endregion

        #region WidthProperty
        public static readonly DependencyProperty WidthProperty = DependencyProperty.Register(nameof(Width),
                                                                                              typeof(double),
                                                                                              typeof(FrameworkElement),
                                                                                              CreateJQueryCssUpdater("width"));

        public double Width
        {
            get { return (double) this[nameof(Width)]; }
            set { this[nameof(Width)] = value; }
        }
        #endregion

        #region ColorProperty
        public static readonly DependencyProperty ColorProperty = DependencyProperty.Register(nameof(Color),
                                                                                              typeof(string), typeof(FrameworkElement),
                                                                                              CreateJQueryCssUpdater("color"));

        public string Color
        {
            get { return (string) this[nameof(Color)]; }
            set { this[nameof(Color)] = value; }
        }
        #endregion

        #region InnerHTMLProperty
        public static readonly DependencyProperty InnerHTMLProperty = DependencyProperty.Register(nameof(InnerHTML), typeof(string), typeof(FrameworkElement), new PropertyMetadata(OnInnerHTMLChanged));

        public string InnerHTML
        {
            get { return (string) GetValue(InnerHTMLProperty); }
            set { SetValue(InnerHTMLProperty, value); }
        }

        protected static void OnInnerHTMLChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            me._root?.Html((string) e.NewValue);
        }
        #endregion

        #region VisibilityProperty
        public static readonly DependencyProperty VisibilityProperty = DependencyProperty.Register(nameof(Visibility), typeof(Visibility), typeof(FrameworkElement), new PropertyMetadata(OnVisibilityChanged));

        public Visibility Visibility
        {
            get { return (Visibility) this[nameof(Visibility)]; }
            set { this[nameof(Visibility)] = value; }
        }

        static void OnVisibilityChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;
            var value = (Visibility) e.NewValue;

            if (value == Visibility.Visible)
            {
                me._root.Css("visibility", "visible");
            }
            else
            {
                me._root.Css("visibility", "hidden");
            }
        }
        #endregion

        #region HeightProperty
        public static readonly DependencyProperty HeightProperty = DependencyProperty.Register(nameof(Height),
                                                                                               typeof(double), typeof(FrameworkElement),
                                                                                               CreateJQueryCssUpdater("height"));

        public double Height
        {
            get { return (double) GetValue(HeightProperty); }
            set { SetValue(HeightProperty, value); }
        }
        #endregion

        #region BackgroundProperty
        public static readonly DependencyProperty BackgroundProperty = DependencyProperty.Register("Background", typeof(string), typeof(FrameworkElement), new PropertyMetadata(OnBackgroundChanged));

        static void OnBackgroundChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var fe = (FrameworkElement) d;
            var newValue = e.NewValue;

            if (newValue.IsNull())
            {
                fe._root.Css("background", "");
                return;
            }
            if (newValue is string)
            {
                fe._root.Css("background", newValue as string);
                return;
            }

            throw new ArgumentException(newValue.ToString());
        }
        #endregion

        #region string Id
        static int ID;
        string _id;

        public string Id
        {
            get
            {
                if (_id == null)
                {
                    _id = "WS-" + ID++;
                }
                return _id;
            }
        }
        #endregion

        #region object DataContext
        object _dataContext;

        public object DataContext
        {
            get { return _dataContext; }
            set
            {
                if (_dataContext != value)
                {
                    _dataContext = value;
                    OnPropertyChanged("DataContext");
                }
            }
        }
        #endregion
    }

    class html_div : FrameworkElement
    {
        #region Public Methods
        public override void InitDOM()
        {
            _root = new jQuery(Document.CreateElement("div"));
        }
        #endregion
    }

    class html_a : FrameworkElement
    {
        #region Public Methods
        public override void InitDOM()
        {
            _root = new jQuery(Document.CreateElement("a"));
        }
        #endregion

        #region HrefProperty
        public static readonly DependencyProperty HrefProperty = DependencyProperty.Register(nameof(Href), typeof(string), typeof(html_a), CreateHtmlAttributeUpdater("href"));

        public string Href
        {
            get { return (string) GetValue(HrefProperty); }
            set { SetValue(HrefProperty, value); }
        }
        #endregion
    }
}