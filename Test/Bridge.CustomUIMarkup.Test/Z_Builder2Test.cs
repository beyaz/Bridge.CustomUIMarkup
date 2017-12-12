using System.Windows;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Test
{
    class Z_Builder2Test : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new Z_Builder2Test().CheckTemplateIsSuccess();
            new Z_Builder2Test().LogicalTreeTest();
        }
        #endregion


        public void LogicalTreeTest()
        {
            var model = new SimpleClass1
            {
                LastName = "A",
                Child = new SimpleClass1
                {
                    LastName = "B",

                    Child = new SimpleClass1
                    {
                        LastName = "C"
                    }
                }
            };

            var fe = new HtmlElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe,"<div class='{LastName}'> " +
                                   "    <div class='{Child.LastName}'> " +
                                   "        <div class='{Child.Child.LastName}' />" +
                                   "    </div>" +
                                   "</div>");

            var ui = fe.GetLogicalChildAt(0);

            MustEqual(1, ui.LogicalChilderen.Count);

            MustEqual("A", ui.Attr("class"));

            MustEqual("B", ui.GetLogicalChildAt(0).Attr("class"));

            MustEqual(1, ui.GetLogicalChildAt(0).LogicalChilderen.Count);

            MustEqual("C", ui.GetLogicalChildAt(0).GetLogicalChildAt(0).Attr("class"));


        }

        #region Methods
        void CheckTemplateIsSuccess()
        {
            var control = Builder.Create<UserControl2>();

            MustEqual(1, control.VisualChilderenCount);
            MustEqual(3, control.GetVisualChildAt(0).VisualChilderenCount);
            MustEqual(3, control.GetVisualChildAt(0).LogicalChilderenCount);
            MustEqual("0", control.GetVisualChildAt(0).Attr("id"));
            MustEqual("1", control.GetVisualChildAt(0, 0).Attr("id"));
            MustEqual("2", control.GetVisualChildAt(0, 1).Attr("id"));
            MustEqual("3", control.GetVisualChildAt(0, 2).Attr("id"));

            AssertNotNull(control._contentPresenter);

            Builder.LoadComponent(control, "<div id='x'>" +
                                           "     <div id='y'/>" +
                                           "     <div id='z' >qqq</div>" +
                                           "</div>");

            MustEqual(1, control.VisualChilderenCount);
            MustEqual(3, control.GetVisualChildAt(0).VisualChilderenCount);
            MustEqual(3, control.GetVisualChildAt(0).LogicalChilderenCount);
            MustEqual("0", control.GetVisualChildAt(0).Attr("id"));
            MustEqual("1", control.GetVisualChildAt(0, 0).Attr("id"));
            MustEqual("2", control.GetVisualChildAt(0, 1).Attr("id"));
            MustEqual("3", control.GetVisualChildAt(0, 2).Attr("id"));

            var contentPresenter = (ContentPresenter) control.GetVisualChildAt(0, 1);
            MustEqual("x", contentPresenter.GetVisualChildAt(0).Attr("id"));
            MustEqual("y", contentPresenter.GetVisualChildAt(0, 0).Attr("id"));
            MustEqual("z", contentPresenter.GetVisualChildAt(0, 1).Attr("id"));

            MustEqual(2, contentPresenter.GetVisualChildAt(0).LogicalChilderenCount);
            MustEqual(2, contentPresenter.GetVisualChildAt(0).VisualChilderenCount);
        }
        #endregion

        public class UserControl2 : ContentControl
        {
            #region Public Properties
            public override string DefaultTemplateAsXml =>
                "<div id='0'>" +
                "   <div id='1' /> " +
                "   <ContentPresenter id='2' />" +
                "   <div id='3' /> " +
                "</div>";
            #endregion
        }
    }
}