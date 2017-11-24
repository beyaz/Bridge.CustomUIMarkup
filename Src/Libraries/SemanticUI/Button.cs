using System.Windows;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class ui_button : ElementBase
    {
        #region Static Fields
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register("Text", typeof(string), typeof(ui_button), new PropertyMetadata(OnInnerHTMLChanged));
        public static readonly DependencyProperty IsActiveProperty = DependencyProperty.Register("IsActive", typeof(bool), typeof(ui_button), new PropertyMetadata(IsActiveChanged));
        #endregion

        #region Public Properties
        public bool? IsActive
        {
            get { return (bool?) GetValue(IsActiveProperty); }
            set { SetValue(IsActiveProperty, value); }
        }
        #endregion

        #region Properties
        protected override string HtmlClassName => "ui button";
        protected override string HtmlTag => "button";
        #endregion

        #region Methods
        static void IsActiveChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            ((ui_button) d).AddCssClassOnTrueElseRemove(e.NewValue, "active");
        }
        #endregion
    }

    class ui_basic_button : ui_button
    {
        protected override string HtmlClassName => "ui basic button";
    }
}