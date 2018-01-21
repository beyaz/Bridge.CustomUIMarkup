using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.Swiper
{
    public class Slider : Control
    {

        static string style => @"

<style>
    
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
  </style>

";
        readonly HtmlElement _swiper_wrapper = null;
        readonly HtmlElement _swiper_pagination = null; 

        #region Constructors
        public Slider()
        {
            BeforeConnectToLogicalParent += InitWrapper;
            AfterLogicalChildAdd += CreateSlide;
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class='swiper-container'>" +
                                                       style+
                                                       "    <div x:Name='_swiper_wrapper'    class='swiper-wrapper' />" +
                                                       "    <div x:Name='_swiper_pagination' class='swiper-pagination' />" +
                                                       "</div>";
        #endregion

        #region Methods
        void CreateSlide(FrameworkElement element)
        {
            var item = UIBuilder.Create<SwiperItemControl>();
            item.Content = element;

            _swiper_wrapper.AddLogicalChild(item);
        }

        void InitWrapper(FrameworkElement parent)
        {
            // ReSharper disable once UnusedVariable
            var delay = Delay;
            // ReSharper disable once UnusedVariable
            var root = _root;

            // ReSharper disable once UnusedVariable
            var swiper_pagination = _swiper_pagination;


            Script.Write(@"

setTimeout(function(){

    new Swiper(root, 
    {
        pagination: 
        {
            el: swiper_pagination,
        },
        autoplay: 
        {
            delay: delay
        },
        loop: true,
        effect:'coverflow'   
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
        public static readonly DependencyProperty DelayProperty = DependencyProperty.Register(nameof(Delay), typeof(string), typeof(Slider), new PropertyMetadata(3000));

        public int Delay
        {
            get { return (int) GetValue(DelayProperty); }
            set { SetValue(DelayProperty, value); }
        }
        #endregion
    }
}