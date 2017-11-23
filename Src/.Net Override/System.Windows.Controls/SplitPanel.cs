using Bridge;
using Bridge.CustomUIMarkup.Common;
using Bridge.jQuery2;

namespace System.Windows.Controls
{
    class SplitPanel : FrameworkElement
    {
        public SplitPanel()
        {
            AfterAddChild += AfterAddChildElement;
        }
        #region Constants
        const string horizontal = nameof(horizontal);
        const string vertical = nameof(vertical);
        #endregion

        #region Fields
        // ReSharper disable once NotAccessedField.Local
        string _direction = "horizontal";

        jQuery _left, _right;
        dynamic _wrapper;
        #endregion

        #region Properties
        string ClassName => "split split-" + _direction;
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = DOM.div();

            _left = DOM.div().AppendTo(_root);

            _right = DOM.div().AppendTo(_root);

            ReInitializeWrapper();
        }
        #endregion

        #region Methods
        void AfterAddChildElement(FrameworkElement element)
        {
            if (Childeren.Count == 1)
            {
                _left.SetFirstChild(_root.Children().Last().RemoveFromParent());
            }
            else
            {
                _right.SetFirstChild(_root.Children().Last().RemoveFromParent());
            }

            ReInitializeWrapper();
        }

        void ReInitializeWrapper()
        {
            _wrapper?.destroy();

            _wrapper = Split();
        }

        void SetOrientation(Orientation orientation)
        {
            _direction = orientation == Orientation.Horizontal ? horizontal : vertical;

            _root.SetClass(ClassName).Children().Foreach(c => c.SetClass(ClassName));
            _left.SetClass(ClassName);
            _right.SetClass(ClassName);

            ReInitializeWrapper();
        }

        object Split()
        {
            return Script.Write<object>(@"Split([this._left[0], this._right[0]], { sizes:[50,50],  direction:this._direction });");
        }
        #endregion

        #region OrientationProperty
        public static readonly DependencyProperty OrientationProperty = DependencyProperty.Register(nameof(Orientation), typeof(Orientation), typeof(SplitPanel), new PropertyMetadata(OnOrientationChanged));

        public Orientation Orientation
        {
            get { return (Orientation) GetValue(OrientationProperty); }
            set { SetValue(OrientationProperty, value); }
        }

        static void OnOrientationChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (SplitPanel) d;
            me.SetOrientation((Orientation) e.NewValue);
        }
        #endregion
    }
}