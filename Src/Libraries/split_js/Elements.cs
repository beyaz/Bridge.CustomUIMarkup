using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.split_js
{
    public  static class Elements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            Builder.Register("SplitPanel", Builder.Create<SplitPanel>);
        }
        #endregion
    }
}