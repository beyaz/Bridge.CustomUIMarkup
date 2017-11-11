using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Data;
using Bridge.jQuery2;

namespace System.Windows
{
    public enum TextWrapping
    {
        WrapWithOverflow,
        NoWrap,
        Wrap
    }

    public class FrameworkElement : DependencyObject
    {
        #region ClassProperty
        public static readonly DependencyProperty ClassProperty = DependencyProperty.Register(nameof(Class), typeof(string), typeof(FrameworkElement), new PropertyMetadata(OnClassChanged));

        public string Class
        {
            get { return (string)GetValue(ClassProperty); }
            set { SetValue(ClassProperty, value); }
        }

        protected static void OnClassChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement)d;

            me._root?.Attr("class", (string)e.NewValue);
        }
        #endregion

        #region AddClassProperty
        public static readonly DependencyProperty AddClassProperty = DependencyProperty.Register(nameof(AddClass), typeof(string), typeof(FrameworkElement), new PropertyMetadata(OnAddClassChanged));

        public string AddClass
        {
            get { return (string)GetValue(AddClassProperty); }
            set { SetValue(AddClassProperty, value); }
        }

        protected static void OnAddClassChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement)d;

            me._root?.AddClass((string)e.NewValue);
        }
        #endregion


        public object GetValue(DependencyProperty dp)
        {
            var value =  this[dp.Name];
            if (value == null )
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
        public void SetValue(DependencyProperty dp,object value)
        {
            this[dp.Name] = value;
        }

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
        public virtual void InitDOM()
        {
        }
        #endregion

        #region Methods
        protected virtual void AddChild(FrameworkElement element)
        {
            if (_childeren == null)
            {
                _childeren = new List<FrameworkElement>();
            }
            _childeren.Add(element);
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

        #region Margin
        #region MarginLeftProperty
        public static readonly DependencyProperty MarginLeftProperty = DependencyProperty.Register(nameof(MarginLeft), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnMarginLeftChanged));

        public double? MarginLeft
        {
            get { return (double?) this[nameof(MarginLeft)]; }
            set { this[nameof(MarginLeft)] = value; }
        }

        static void OnMarginLeftChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("marginLeft", string.Empty);
                return;
            }

            me._root.Css("marginLeft", value + "px");
        }
        #endregion

        #region MarginRightProperty
        public static readonly DependencyProperty MarginRightProperty = DependencyProperty.Register(nameof(MarginRight), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnMarginRightChanged));

        public double? MarginRight
        {
            get { return (double?) this[nameof(MarginRight)]; }
            set { this[nameof(MarginRight)] = value; }
        }

        static void OnMarginRightChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("marginRight", string.Empty);
                return;
            }

            me._root.Css("marginRight", value + "px");
        }
        #endregion

        #region MarginBottomProperty
        public static readonly DependencyProperty MarginBottomProperty = DependencyProperty.Register(nameof(MarginBottom), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnMarginBottomChanged));

        public double? MarginBottom
        {
            get { return (double?) this[nameof(MarginBottom)]; }
            set { this[nameof(MarginBottom)] = value; }
        }

        static void OnMarginBottomChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("marginBottom", string.Empty);
                return;
            }

            me._root.Css("marginBottom", value + "px");
        }
        #endregion

        #region MarginTopProperty
        public static readonly DependencyProperty MarginTopProperty = DependencyProperty.Register(nameof(MarginTop), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnMarginTopChanged));

        public double? MarginTop
        {
            get { return (double?) this[nameof(MarginTop)]; }
            set { this[nameof(MarginTop)] = value; }
        }

        static void OnMarginTopChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("marginTop", string.Empty);
                return;
            }

            me._root.Css("marginTop", value + "px");
        }
        #endregion
        #endregion

        #region Padding
        #region PaddingLeftProperty
        public static readonly DependencyProperty PaddingLeftProperty = DependencyProperty.Register(nameof(PaddingLeft), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnPaddingLeftChanged));

        public double? PaddingLeft
        {
            get { return (double?) this[nameof(PaddingLeft)]; }
            set { this[nameof(PaddingLeft)] = value; }
        }

        static void OnPaddingLeftChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("PaddingLeft", string.Empty);
                return;
            }

            me._root.Css("paddingLeft", value + "px");
        }
        #endregion

        #region PaddingRightProperty
        public static readonly DependencyProperty PaddingRightProperty = DependencyProperty.Register(nameof(PaddingRight), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnPaddingRightChanged));

        public double? PaddingRight
        {
            get { return (double?) this[nameof(PaddingRight)]; }
            set { this[nameof(PaddingRight)] = value; }
        }

        static void OnPaddingRightChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("PaddingRight", string.Empty);
                return;
            }

            me._root.Css("paddingRight", value + "px");
        }
        #endregion

        #region PaddingBottomProperty
        public static readonly DependencyProperty PaddingBottomProperty = DependencyProperty.Register(nameof(PaddingBottom), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnPaddingBottomChanged));

        public double? PaddingBottom
        {
            get { return (double?) this[nameof(PaddingBottom)]; }
            set { this[nameof(PaddingBottom)] = value; }
        }

        static void OnPaddingBottomChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("PaddingBottom", string.Empty);
                return;
            }

            me._root.Css("paddingBottom", value + "px");
        }
        #endregion

        #region PaddingTopProperty
        public static readonly DependencyProperty PaddingTopProperty = DependencyProperty.Register(nameof(PaddingTop), typeof(double?), typeof(FrameworkElement), new PropertyMetadata(OnPaddingTopChanged));

        public double? PaddingTop
        {
            get { return (double?) this[nameof(PaddingTop)]; }
            set { this[nameof(PaddingTop)] = value; }
        }

        static void OnPaddingTopChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            var value = (double?) e.NewValue;

            if (value == null)
            {
                me._root.Css("PaddingTop", string.Empty);
                return;
            }

            me._root.Css("paddingTop", value + "px");
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
        public static readonly DependencyProperty FontWeightProperty = DependencyProperty.Register(nameof(FontWeight), typeof(double), typeof(FrameworkElement), new PropertyMetadata(OnFontWeightChanged));

        public object FontWeight
        {
            get { return this[nameof(FontWeight)]; }
            set { this[nameof(FontWeight)] = value; }
        }

        static void OnFontWeightChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            me._root.Css("fontWeight", e.NewValue);
        }
        #endregion

        #region FontSizeProperty
        public static readonly DependencyProperty FontSizeProperty = DependencyProperty.Register(nameof(FontSize), typeof(double), typeof(FrameworkElement), new PropertyMetadata(OnFontSizeChanged));

        public double FontSize
        {
            get { return (double) this[nameof(FontSize)]; }
            set { this[nameof(FontSize)] = value; }
        }

        static void OnFontSizeChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            me._root.Css("fontSize", (double) e.NewValue);
        }
        #endregion

        #region WidthProperty
        public static readonly DependencyProperty WidthProperty = DependencyProperty.Register(nameof(Width), typeof(double), typeof(FrameworkElement), new PropertyMetadata(OnWidthChanged));

        public double Width
        {
            get { return (double) this[nameof(Width)]; }
            set { this[nameof(Width)] = value; }
        }

        static void OnWidthChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            me._root.Css("width", e.NewValue);
        }
        #endregion

        #region ColorProperty
        public static readonly DependencyProperty ColorProperty = DependencyProperty.Register(nameof(Color), typeof(string), typeof(FrameworkElement), new PropertyMetadata(OnColorChanged));

        public string Color
        {
            get { return (string) this[nameof(Color)]; }
            set { this[nameof(Color)] = value; }
        }

        static void OnColorChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (FrameworkElement) d;

            me._root.Css("color", e.NewValue);
        }
        #endregion

        #region InnerHTMLProperty
        public static readonly DependencyProperty InnerHTMLProperty = DependencyProperty.Register(nameof(InnerHTML), typeof(string), typeof(FrameworkElement), new PropertyMetadata(OnInnerHTMLChanged));

        public string InnerHTML
        {
            get { return (string)GetValue(InnerHTMLProperty); }
            set { SetValue(InnerHTMLProperty,value); }
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
        public static readonly DependencyProperty HeightProperty = DependencyProperty.Register("Height", typeof(double), typeof(FrameworkElement), new PropertyMetadata(OnHeightChanged));

        static void OnHeightChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var fe = (FrameworkElement) d;

            if (e.NewValue == null)
            {
                fe._root.Css("height", "");
                return;
            }

            fe._root.Css("height", e.NewValue);
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
}