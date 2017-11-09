using System.Windows;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Row : ElementContainer
    {
        #region Properties
        protected override string HtmlClassName => "row";
        string rowClass => Childeren.Count.ToWord() + " column row";
        #endregion

        #region Methods
        protected override void AfterAddChild(FrameworkElement element)
        {
            _root.Attr("class", rowClass);
        }
        #endregion
    }
}