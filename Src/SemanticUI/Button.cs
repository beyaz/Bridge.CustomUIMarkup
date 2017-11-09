using System.Windows;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Button : ElementBase
    {
        protected override string HtmlTag => "button";
        protected override string HtmlClassName => "ui button";

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register("Text", typeof(string), typeof(Button), new PropertyMetadata(TextChanged));

        static void TextChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            ((FrameworkElement)d)._root.Html(e.NewValue as string);
        }
        #endregion

        #region IsCenterAlignedProperty
        public static readonly DependencyProperty IsActiveProperty = DependencyProperty.Register("IsActive", typeof(bool), typeof(Button), new PropertyMetadata(IsActiveChanged));

        static void IsActiveChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            ((Button)d).AddCssClassOnTrueElseRemove(e.NewValue, "active");
        }
        #endregion
       
    }
}