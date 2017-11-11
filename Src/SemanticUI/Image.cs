using System.Windows;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Image : ElementBase
    {
        #region Properties
        protected override string HtmlClassName => "ui image";
        protected override string HtmlTag => "img";
        #endregion

        #region SrcProperty
        public static readonly DependencyProperty SrcProperty = DependencyProperty.Register(nameof(Src), typeof(string), typeof(Image), new PropertyMetadata(OnSrcChanged));

        public string Src
        {
            get { return (string) GetValue(SrcProperty); }
            set { SetValue(SrcProperty, value); }
        }

        static void OnSrcChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (Image) d;

            var newValue = (string) e.NewValue;

            me._root.Attr("Src", newValue);
        }
        #endregion
    }
}