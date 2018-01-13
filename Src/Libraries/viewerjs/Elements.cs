using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.viewerjs
{
    static class Elements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            UIBuilder.Register("ImageGalery", UIBuilder.Create<Viewer>);
        }
        #endregion
    }
}