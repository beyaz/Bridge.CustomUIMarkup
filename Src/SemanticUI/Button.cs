using System.Windows;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Button : ElementBase
    {
        #region Static Fields
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register("Text", typeof(string), typeof(Button), new PropertyMetadata(OnInnerHTMLChanged));
        public static readonly DependencyProperty IsActiveProperty = DependencyProperty.Register("IsActive", typeof(bool), typeof(Button), new PropertyMetadata(IsActiveChanged));
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
            ((Button) d).AddCssClassOnTrueElseRemove(e.NewValue, "active");
        }
        #endregion
    }

    class ui_basic_button : Button
    {
        protected override string HtmlClassName => "ui basic button";
    }
}