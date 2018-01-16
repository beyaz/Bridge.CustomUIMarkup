namespace System.Windows
{
    public class HtmlElement : FrameworkElement
    {
        #region Constructors
        public HtmlElement(string tag = null, string className = null) : base(tag, className)
        {
            AfterLogicalChildAdd    += AddVisualChild;
            AfterLogicalChildRemove += RemoveVisualChild;
        }
        #endregion
    }

    public class ContentPresenter : HtmlElement
    {
    }
}