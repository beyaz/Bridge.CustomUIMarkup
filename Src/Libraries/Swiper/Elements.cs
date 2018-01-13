using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.Swiper
{
    static class Elements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            UIBuilder.Register("swiper.slider", UIBuilder.Create<Slider>);
        }
        #endregion
    }
}