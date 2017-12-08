using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.Libraries.split_js
{
    class SplitPanel : Control
    {
        #region Fields
        dynamic _wrapper;
        #endregion

        #region Constructors
        public SplitPanel()
        {
            AfterLogicalChildAdd += AfterAddChildElement;
            BeforeConnectToLogicalParent += ReInitializeWrapper;
            BeforeConnectToVisualParent += ReInitializeWrapper;
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div>" +
                                                       "   <div class='{Class}' />" +
                                                       "   <div class='{Class}' />" +
                                                       "</div>";
        #endregion

        #region Methods
        void AfterAddChildElement(FrameworkElement element)
        {
            if (LogicalChilderenCount == 1)
            {
                GetVisualChildAt(0).AddVisualChild(element);
            }
            else
            {
                GetVisualChildAt(1).AddVisualChild(element);
            }
        }

        void ReInitializeWrapper(FrameworkElement parent = null)
        {
            _wrapper?.destroy();

            _wrapper = Split();
        }

        void SetOrientation(Orientation orientation)
        {
            var direction = orientation == Orientation.Horizontal ? "horizontal" : "vertical";

            Class = "split split-" + direction;

            _root.Children().Foreach(c => c.SetClass(Class));

            if (LogicalParent != null)
            {
                ReInitializeWrapper();
            }
        }

        object Split()
        {
            // ReSharper disable once UnusedVariable
            var left = GetVisualChildAt(0)._root.Get(0);
            // ReSharper disable once UnusedVariable
            var right = GetVisualChildAt(1)._root.Get(0);

            return Script.Write<object>(@"Split([ left, right], { sizes:[50,50],  direction:this._direction });");
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