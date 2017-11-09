using System.Windows;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Header : ElementBase
    {
        #region Properties
        protected override string HtmlClassName => "header";
        #endregion

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register(nameof(Text), typeof(string), typeof(Header), new PropertyMetadata(OnInnerHTMLChanged));

        public string Text
        {
            get { return InnerHTML; }
            set { InnerHTML = value; }
        }
        #endregion
    }

    public class Header1 : Header
    {
        #region Properties
        protected override string HtmlClassName => "ui header";
        protected override string HtmlTag => "h1";
        #endregion
    }

    public class Header2 : Header
    {
        #region Properties
        protected override string HtmlClassName => "ui header";
        protected override string HtmlTag => "h2";
        #endregion
    }

    public class Header3 : Header
    {
        #region Properties
        protected override string HtmlClassName => "ui header";
        protected override string HtmlTag => "h3";
        #endregion
    }
}