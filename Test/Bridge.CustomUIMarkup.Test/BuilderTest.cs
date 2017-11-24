using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Test
{
    class BuilderTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new BuilderTest().img_src_test();
            new BuilderTest().img_src_test_with_binding();
            new BuilderTest().innerHTML_Bindings_Mustbe_Support(); 
        }

        public void img_src_test()
        {
            var builder = new Builder {XmlString = "<img src='" + SampleImageUrl_350_150 + "' />"};

            var ui = builder.Build();

            MustEqual("IMG", ui._root.Get(0).TagName);

            MustEqual(SampleImageUrl_350_150, ui._root.Attr("src"));
        }

        public void img_src_test_with_binding()
        {
            var simpleClass1 = new SimpleClass1();

            var builder = new Builder
            {
                XmlString = "<img src='{LastName}' />",
                DataContext = simpleClass1
            };

            simpleClass1.LastName = SampleImageUrl_350_150;

            var ui = builder.Build();

            MustEqual(SampleImageUrl_350_150, ui._root.Attr("src"));
        }

        public void innerHTML_Bindings_Mustbe_Support()
        {
            var simpleClass1 = new SimpleClass1();

            var builder = new Builder
            {
                XmlString = "<div> {LastName} </div>",
                DataContext = simpleClass1
            };

            simpleClass1.LastName = "Şaziye";

            var ui = builder.Build();

            MustEqual("Şaziye", ui.InnerHTML);
            MustEqual("Şaziye", ui.Root.Html());
        }
        #endregion
    }
}