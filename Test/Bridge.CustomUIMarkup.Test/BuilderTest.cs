using System;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Test
{
    

    class BuilderTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            
            
            new BuilderTest().ComponentCreationTestWithOtherElements();
            new BuilderTest().VisualTreeTest_TemplateControl();
            
            new BuilderTest().LogicalTreeTest2();
            
            new BuilderTest().VisualTreeTest_multiple_child();

            
         
            
        }

        

     
        

        

        public void LogicalTreeTest2()
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

            var userControl = Builder.Create<UserControl2>();

            Trace.Log("userControl.GetVisualChildAt(0)", userControl.GetVisualChildAt(0));


            Builder.Build2("<div id='0' class='{LastName}'> " +
                                   "    <div id='1' class='{Child.LastName}'> " +
                                   "        <div id='2' class='{Child.Child.LastName}' />" +
                                   "    </div>" +
                                   "</div>", model, userControl);

            Trace.Log("userControl.GetVisualChildAt(0)" , userControl.GetVisualChildAt(0));


            var ui = userControl.GetLogicalChildAt(0);

            MustEqual(1, ui.LogicalChilderen.Count);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("B", ui.GetLogicalChildAt(0)._root.Attr("class"));

            MustEqual(1, ui.GetLogicalChildAt(0).LogicalChilderen.Count);

            MustEqual("C", ui.GetLogicalChildAt(0).GetLogicalChildAt(0)._root.Attr("class"));
        }

        

        public void VisualTreeTest_multiple_child()
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

            var template = Template.CreateFromXml(
                @"<div class='{LastName}' > 
    <div class='{LastName}' />
    <div class='{Child.LastName}' />
    <div class='{Child.Child.LastName}' />
</div>");

            var ui = new FrameworkElement();

            Builder.Build(template, model, ui);

            MustEqual(3, ui.VisualChilderenCount);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("A", ui.GetVisualChildAt(0)._root.Attr("class"));
            MustEqual("B", ui.GetVisualChildAt(1)._root.Attr("class"));
            MustEqual("C", ui.GetVisualChildAt(2)._root.Attr("class"));

            MustEqualByReference(ui, ui.GetVisualChildAt(0).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(1).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(2).VisaulParent);

            MustEqual(0, ui.GetVisualChildAt(0).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(1).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(2).VisualChilderenCount);
        }
        #endregion

        #region Methods

        void ComponentCreationTestWithOtherElements()
        {
            Component123.DefineForBuilder();

            var model = new SimpleClass1
            {
                LastName = "X",
                Child = new SimpleClass1
                {
                    LastName = "Y",

                    Child = new SimpleClass1
                    {
                        LastName = "Z"
                    }
                }
            };

            var stringXml = "<div>" +
                            "   <div class = '{Child.LastName}' >" +
                            "      <Component123  StringProperty0 = '{LastName}' StringProperty1 = '{Child.LastName}' StringProperty2 = '{Child.Child.LastName}'>" +
                            "          <div>" +
                            "              <div class = '{Child.Child.LastName}' />" +
                            "          </div>" +
                            "      </Component123> " +
                            "   </div>" +
                            "</div>"
                ;

            var root = Builder.Build(stringXml, model);

            var ui = (Component123) root.GetLogicalChildAt(0).GetLogicalChildAt(0);
            MustEqualByReference(model, ui.DataContext);

            MustEqual(model.LastName, ui.StringProperty0);
            MustEqual(model.Child.LastName, ui.StringProperty1);
            MustEqual(model.Child.Child.LastName, ui.StringProperty2);

            model.LastName = "1";
            model.Child.LastName = "2";
            model.Child.Child.LastName = "3";

            MustEqual(model.LastName, ui.StringProperty0);
            MustEqual(model.Child.LastName, ui.StringProperty1);
            MustEqual(model.Child.Child.LastName, ui.StringProperty2);

            MustEqual(1, ui.LogicalChilderenCount);

            MustEqual("3", ui.GetLogicalChildAt(0).GetLogicalChildAt(0).Root.Attr("class"));

            MustEqual(model.Child.LastName, root.GetLogicalChildAt(0).Root.Attr("class"));
        }

        void VisualTreeTest_TemplateControl()
        {
            var model = new SimpleClass1
            {
                LastName = "X",
                Child = new SimpleClass1
                {
                    LastName = "Y",

                    Child = new SimpleClass1
                    {
                        LastName = "Z"
                    }
                }
            };

            var xml = "<div class='A' >" +
                      "     <div class='B' />" +
                      "     <div class='C' />" +
                      "     <div class='D' />" +
                      "</div>";
            var template = Template.CreateFromXml(xml);

            Builder.Register("x_r_t_t_6", () =>
            {
                var fe = new HtmlElement();

                Builder.Build(template, fe);

                return fe;
            });

            var ui = Builder.Build("<x_r_t_t_6> <s class='sf'/></x_r_t_t_6>", model);

            MustEqual(4, ui.VisualChilderenCount);
            MustEqual(1, ui.LogicalChilderenCount);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("B", ui.GetVisualChildAt(0)._root.Attr("class"));
            MustEqual("C", ui.GetVisualChildAt(1)._root.Attr("class"));
            MustEqual("D", ui.GetVisualChildAt(2)._root.Attr("class"));
            MustEqual("sf", ui.GetVisualChildAt(3)._root.Attr("class"));

            MustEqualByReference(ui, ui.GetVisualChildAt(0).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(1).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(2).VisaulParent);

            MustEqual(0, ui.GetVisualChildAt(0).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(1).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(2).VisualChilderenCount);

            MustEqual("sf", ui.GetLogicalChildAt(0)._root.Attr("class"));

            MustEqualByReference(ui.GetLogicalChildAt(0)._root.Get(0), ui.GetVisualChildAt(2)._root.Next().Get(0));

            MustEqualByReference(model, ui.DataContext);
            MustEqualByReference(model, ui.GetLogicalChildAt(0).DataContext);
            MustEqualByReference(ui, ui.GetVisualChildAt(0).DataContext);
            MustEqualByReference(ui, ui.GetVisualChildAt(1).DataContext);
            MustEqualByReference(ui, ui.GetVisualChildAt(2).DataContext);

            var root = ui = Builder.Build("<div><div> <x_r_t_t_6>  <s class='sf'/>  </x_r_t_t_6>  </div></div>", model);

            MustEqual(1, ui.VisualChilderenCount);
            MustEqual(1, ui.LogicalChilderenCount);

            MustEqualByReference(model, root.DataContext);
            MustEqualByReference(model, root.GetLogicalChildAt(0).DataContext);

            ui = ui.GetLogicalChildAt(0);

            MustEqual(1, ui.VisualChilderenCount);
            MustEqual(1, ui.LogicalChilderenCount);

            MustEqualByReference(model, ui.GetLogicalChildAt(0).DataContext);

            ui = ui.GetLogicalChildAt(0);

            MustEqual(4, ui.VisualChilderenCount);
            MustEqual(1, ui.LogicalChilderenCount);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("B", ui.GetVisualChildAt(0)._root.Attr("class"));
            MustEqual("C", ui.GetVisualChildAt(1)._root.Attr("class"));
            MustEqual("D", ui.GetVisualChildAt(2)._root.Attr("class"));

            MustEqualByReference(ui, ui.GetVisualChildAt(0).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(1).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(2).VisaulParent);

            MustEqual(0, ui.GetVisualChildAt(0).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(1).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(2).VisualChilderenCount);

            MustEqual("sf", ui.GetLogicalChildAt(0)._root.Attr("class"));

            MustEqualByReference(ui.GetLogicalChildAt(0)._root.Get(0), ui.GetVisualChildAt(2)._root.Next().Get(0));

            MustEqualByReference(model, ui.GetLogicalChildAt(0).DataContext);
            MustEqualByReference(ui, ui.GetVisualChildAt(0).DataContext);
            MustEqualByReference(ui, ui.GetVisualChildAt(1).DataContext);
            MustEqualByReference(ui, ui.GetVisualChildAt(2).DataContext);
        }
        #endregion
    }
}