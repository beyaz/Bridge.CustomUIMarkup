using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI.Design;

namespace Bridge.CustomUIMarkup.Test
{
    class BuilderTest:TestBase
    {
        static string SampleUrl = "http://via.placeholder.com/350x150";

        public static void RunAll()
        {
            new BuilderTest().img_src_test();
            new BuilderTest().img_src_test_with_binding();
            new BuilderTest().simpleBinding(); 
        }

        public void img_src_test()
        {
            var builder = new Builder {XmlString = "<img src='"+SampleUrl+"' />" };


            var ui =(FrameworkElement) builder.Build();

            MustEqual("IMG", ui._root.Get(0).TagName);

            MustEqual(SampleUrl, ui._root.Attr("src"));

        }


        public void simpleBinding()
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

            simpleClass1.LastName = SampleUrl;

            MustEqual(SampleUrl, img.Attr("src"));

            
        }

        public void img_src_test_with_binding()
        {
            var simpleClass1 = new SimpleClass1();
            
            var builder = new Builder
            {
                XmlString = "<img src='{LastName}' />",
                DataContext = simpleClass1
            };

            simpleClass1.LastName = SampleUrl;


            var ui = (FrameworkElement)builder.Build();

            MustEqual(SampleUrl, ui._root.Attr("src"));

        }
    }
}
