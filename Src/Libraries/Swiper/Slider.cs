using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.Swiper
{
    public class Slider : Control
    {
        #region Constructors
        public Slider()
        {
            BeforeConnectToLogicalParent += InitWrapper;
            AfterLogicalChildAdd += CreateSlide;
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class='swiper-container'>" +
                                                       "    <div class='swiper-wrapper' />" +
                                                       "</div>";
        #endregion

        #region Methods
        void CreateSlide(FrameworkElement element)
        {
            var item = UIBuilder.Create<SwiperItemControl>();
            item.Content = element;

            GetVisualChildAt(0).AddVisualChild(item);
        }

        void InitWrapper(FrameworkElement parent)
        {
            // ReSharper disable once UnusedVariable
            var delay = Delay;
            // ReSharper disable once UnusedVariable
            var me = this;

            Script.Write(@"

setTimeout(function(){

    new Swiper(me._root, {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: delay,
        disableOnInteraction: false,
      }
    });


},0);


");
        }
        #endregion

        internal class SwiperItemControl : ContentControl
        {
            #region Public Properties
            public override string DefaultTemplateAsXml => "<div class='swiper-slide'>" +
                                                           "    <ContentPresenter />" +
                                                           "</div>";
            #endregion
        }

        #region int Delay
        public static readonly DependencyProperty DelayProperty = DependencyProperty.Register(nameof(Delay), typeof(string), typeof(Slider), new PropertyMetadata(2000));

        public int Delay
        {
            get { return (int) GetValue(DelayProperty); }
            set { SetValue(DelayProperty, value); }
        }
        #endregion
    }
}