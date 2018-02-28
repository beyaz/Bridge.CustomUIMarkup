using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.split_js
{
    public static class SplitJsElements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            UIBuilder.Register("SplitPanel", UIBuilder.Create<SplitPanel>);
        }
        #endregion
    }
}