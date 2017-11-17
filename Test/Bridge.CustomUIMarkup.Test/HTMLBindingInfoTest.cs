using System.Windows.Data;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.Test
{
    class HTMLBindingInfoTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new HTMLBindingInfoTest().simpleBindingfor_src();
            new HTMLBindingInfoTest().simpleBindingfor_innerHtml();
        }

        public void simpleBindingfor_innerHtml()
        {
            var simpleClass1 = new SimpleClass1();

            var img = DOM.CreateElement("div");
            var htmlBindingInfo = new HTMLBindingInfo
            {
                Source = simpleClass1,
                SourcePath = "LastName",
                Target = img,
                TargetPath = "innerHTML",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            simpleClass1.LastName = SampleImageUrl_350_150;

            MustEqual(SampleImageUrl_350_150, img.Attr("innerHTML"));
        }

        public void simpleBindingfor_src()
        {
            var simpleClass1 = new SimpleClass1();

            var img = DOM.CreateElement("img");
            var htmlBindingInfo = new HTMLBindingInfo
            {
                Source = simpleClass1,
                SourcePath = "LastName",
                Target = img,
                TargetPath = "src",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            simpleClass1.LastName = SampleImageUrl_350_150;

            MustEqual(SampleImageUrl_350_150, img.Attr("src"));
        }
        #endregion
    }
}