using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.split_js
{
    public  static class Elements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            UIBuilder.Register("SplitPanel", UIBuilder.Create<SplitPanel>);
        }
        #endregion
    }
}