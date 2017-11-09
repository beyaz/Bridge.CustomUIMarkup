using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Windows.Controls
{
    public class TextBlock : FrameworkElement
    {
        #region Public Methods
        public override void InitDOM()
        {
            _root = new jQuery(Document.CreateElement("TextBlock")).Css_display_Inline_Block();
        }
        #endregion

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register(nameof(Text), typeof(string), typeof(TextBlock), new PropertyMetadata(OnInnerHTMLChanged));

        public string Text
        {
            get { return InnerHTML; }
            set { InnerHTML = value; }
        }
        #endregion
    }
}