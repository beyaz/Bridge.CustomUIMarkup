using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.Swiper
{
    static class Elements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            Builder.Register("swiper.slider", Builder.Create<Slider>);
        }
        #endregion
    }
}