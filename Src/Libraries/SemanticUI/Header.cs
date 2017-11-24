using System.Windows;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class header : ElementBase
    {
        #region Properties
        protected override string HtmlClassName => "header";
        #endregion

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register(nameof(Text), typeof(string), typeof(header), new PropertyMetadata(OnInnerHTMLChanged));

        public string Text
        {
            get { return InnerHTML; }
            set { InnerHTML = value; }
        }
        #endregion
    }

    public class ui_header_1 : header
    {
        #region Properties
        protected override string HtmlClassName => "ui header";
        protected override string HtmlTag => "h1";
        #endregion
    }

    public class ui_header_2 : header
    {
        #region Properties
        protected override string HtmlClassName => "ui header";
        protected override string HtmlTag => "h2";
        #endregion
    }

    public class ui_header_3 : header
    {
        #region Properties
        protected override string HtmlClassName => "ui header";
        protected override string HtmlTag => "h3";
        #endregion
    }
}