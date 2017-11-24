using System.Windows;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Swiper
{
    public class Slider : FrameworkElement
    {
        #region Fields
        // ReSharper disable once UnassignedField.Global
        public dynamic _wrapper;

        jQuery swiper_wrapper;
        #endregion

        #region Constructors
        public Slider()
        {
            BeforeConnectToParent += InitWrapper;
            AfterAddChild += CreateSlide;
        }
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = DOM.div("swiper-container");
            Id.ToString();

            swiper_wrapper = DOM.div("swiper-wrapper").AppendTo(_root);

            //DOM.div("swiper-pagination").AppendTo(_root);

            //DOM.div("swiper-button-next").AppendTo(_root);
            //DOM.div("swiper-button-prev").AppendTo(_root);
        }
        #endregion

        #region Methods
        void CreateSlide(FrameworkElement element)
        {
            DOM.div("swiper-slide").AppendTo(swiper_wrapper).Append(element._root);
        }

        void InitWrapper()
        {
            // ReSharper disable once UnusedVariable
            var delay = Delay;
            // ReSharper disable once UnusedVariable
            var me = this;

            Script.Write(@"

setTimeout(function(){

    me._wrapper = new Swiper(me._root, {
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