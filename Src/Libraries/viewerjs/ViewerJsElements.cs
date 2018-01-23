using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.viewerjs
{
    public static class ViewerJsElements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            UIBuilder.Register("ImageGalery", UIBuilder.Create<Viewer>);
        }
        #endregion
    }
}