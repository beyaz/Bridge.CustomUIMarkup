using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.viewerjs
{
    static class Elements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            Builder.Register("ImageGalery", Builder.Create<Viewer>);
        }
        #endregion
    }
}