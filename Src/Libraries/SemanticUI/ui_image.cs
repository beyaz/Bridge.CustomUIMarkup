using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class ui_image : ElementBase
    {
        #region Properties
        protected override string HtmlClassName => "ui image";
        protected override string HtmlTag => "img";
        #endregion

        #region SrcProperty
        public static readonly DependencyProperty SrcProperty = DependencyProperty.Register(nameof(Src), typeof(string), typeof(ui_image), CreateHtmlAttributeUpdater("src"));

        public string Src
        {
            get { return (string) GetValue(SrcProperty); }
            set { SetValue(SrcProperty, value); }
        }
        #endregion
    }
}