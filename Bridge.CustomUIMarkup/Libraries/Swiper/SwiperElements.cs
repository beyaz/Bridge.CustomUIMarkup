using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.Swiper
{
    static class SwiperElements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            UIBuilder.Register("swiper.slider", UIBuilder.Create<Slider>);
        }
        #endregion
    }
}