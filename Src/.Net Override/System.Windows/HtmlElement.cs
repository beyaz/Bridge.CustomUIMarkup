using Bridge.jQuery2;

namespace System.Windows
{
    public class HtmlElement : FrameworkElement
    {
        #region Constructors
        public HtmlElement(string tag = null, string className = null) : base(tag, className)
        {
            InitEvents(this);
        }

        public HtmlElement(jQuery root) : base(root)
        {
            InitEvents(this);
        }
        #endregion

        #region Methods
        static void InitEvents(HtmlElement element)
        {
            element.AfterLogicalChildAdd    += element.AddVisualChild;
            element.AfterLogicalChildRemove += element.RemoveVisualChild;
            element.AfterLogicalChildsCleared += element.ClearVisualChilds;
        }
        #endregion
    }
}