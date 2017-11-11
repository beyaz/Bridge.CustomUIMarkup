using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.jssor
{
    public class Carousel : FrameworkElement
    {
        #region Public Properties
        public static IReadOnlyCollection<string> CssFiles => new List<string> {ScriptLoader.CssDirectory + "Carousel.css"};

        public static IReadOnlyCollection<string> JsFiles => new List<string>
        {
            ScriptLoader.JsDirectory + "jssor.slider-26.5.0.min.js",
            ScriptLoader.JsDirectory + "jssor.Carousel.js"
        };

        #endregion

        #region Properties
        static string Template =>
            @"<div id='jssor_1' style='position:relative;margin:0 auto;top:0px;left:0px;width:980px;height:380px;overflow:hidden;visibility:hidden;'>
    <!-- Loading Screen 
    <div data-u='loading' class='jssorl-009-spin' style='position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-color:rgba(0,0,0,0.7);'>
        <img style='margin-top:-19px;position:relative;top:50%;width:38px;height:38px;' src='img/spin.svg' />
    </div> -->
    <div data-u='slides' id='imagesContainer' style='cursor:default;position:relative;top:0px;left:0px;width:980px;height:380px;overflow:hidden;'>
        <!-- template
        <div>
            <img data-u='image' src='img/001.jpg' />
        </div>
        -->
    </div>
    <!-- Bullet Navigator -->
    <div data-u='navigator' class='jssorb051' style='position:absolute;bottom:12px;right:12px;' data-autocenter='1' data-scale='0.5' data-scale-bottom='0.75'>
        <div data-u='prototype' class='i' style='width:16px;height:16px;'>
            <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>
                <circle class='b' cx='8000' cy='8000' r='5800'></circle>
            </svg>
        </div>
    </div>
    <!-- Arrow Navigator -->
    <div data-u='arrowleft' class='jssora051' style='width:55px;height:55px;top:0px;left:25px;' data-autocenter='2' data-scale='0.75' data-scale-left='0.75'>
        <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>
            <polyline class='a' points='11040,1920 4960,8000 11040,14080 '></polyline>
        </svg>
    </div>
    <div data-u='arrowright' class='jssora051' style='width:55px;height:55px;top:0px;right:25px;' data-autocenter='2' data-scale='0.75' data-scale-right='0.75'>
        <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>
            <polyline class='a' points='4960,1920 11040,8000 4960,14080 '></polyline>
        </svg>
    </div>
</div>";

        jQuery imagesContainer => _root.Find("#imagesContainer");
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = new jQuery(jQuery.ParseHtml(Template.Replace(Environment.NewLine, ""), null).First());
            _root.Attr("id", Id);
        }
        #endregion

        #region DataSourceProperty
        public static readonly DependencyProperty DataSourceProperty = DependencyProperty.Register(nameof(DataSource), typeof(string), typeof(Carousel), new PropertyMetadata(OnDataSourceChanged));

        public string DataSource
        {
            get { return (string) GetValue(DataSourceProperty); }
            set { SetValue(DataSourceProperty, value); }
        }

        static void OnDataSourceChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (Carousel) d;

            me.imagesContainer.Empty();

            var images = (string) e.NewValue;
            foreach (var src in images.Split(',').Where(x=>string.IsNullOrWhiteSpace(x) == false))
            {
                DOM.div().AppendTo(me.imagesContainer).Append(DOM.img().Attr("data-u", "img").Attr("src", src));
            }

            jQuery.Ready(() =>
            {
                var id = me.Id;
                Script.Write("jssor_1_slider_init(id)");
            });
        }
        #endregion
    }
}