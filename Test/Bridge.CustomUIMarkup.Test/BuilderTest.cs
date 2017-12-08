using System;
using System.Windows;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Test
{
    public class Component123 : HtmlElement
    {
        #region Fields
        public FrameworkElement _propValue2;
        #endregion

        #region Methods
        internal static void DefineForBuilder()
        {
            var template = Template.CreateFromXml("<div class='{StringProperty0}' >" +
                                                  "    <div class='{StringProperty1}' />" +
                                                  "    <div class='{StringProperty2}' x.Name = '_propValue2' />" +
                                                  "    <div class='{StringProperty1}' />" +
                                                  "</div>");

            Builder.Register("Component123", () =>
            {
                var fe = new Component123();

                Builder.Build(template, fe);

                if (fe._propValue2 == null)
                {
                    throw new InvalidOperationException();
                }

                return fe;
            });
        }
        #endregion

        #region string StringProperty0
        string _stringProperty0;

        public string StringProperty0
        {
            get { return _stringProperty0; }
            set
            {
                if (_stringProperty0 != value)
                {
                    _stringProperty0 = value;
                    OnPropertyChanged("StringProperty0");
                }
            }
        }
        #endregion

        #region string StringProperty1
        string _stringProperty1;

        public string StringProperty1
        {
            get { return _stringProperty1; }
            set
            {
                if (_stringProperty1 != value)
                {
                    _stringProperty1 = value;
                    OnPropertyChanged("StringProperty1");
                }
            }
        }
        #endregion

        #region string StringProperty2
        string _stringProperty2;

        public string StringProperty2
        {
            get { return _stringProperty2; }
            set
            {
                if (_stringProperty2 != value)
                {
                    _stringProperty2 = value;
                    OnPropertyChanged("StringProperty2");
                }
            }
        }
        #endregion
    }

    class BuilderTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new BuilderTest().ComponentCreationTest();
            new BuilderTest().ComponentCreationTestWithChilds();
            new BuilderTest().ComponentCreationTestWithOtherElements();
            new BuilderTest().VisualTreeTest_TemplateControl();
            new BuilderTest().LogicalTreeTest();
            new BuilderTest().VisualTreeTest();
            new BuilderTest().VisualTreeTest_multiple_child();

            new BuilderTest().class_attribute_must_support_binding();
            new BuilderTest().img_src_test();
            new BuilderTest().img_src_test_with_binding();
            new BuilderTest().innerHTML_Bindings_Mustbe_Support();
        }

        public void class_attribute_must_support_binding()
        {
            var model = new SimpleClass1();

            var ui = Builder.Build("<div class = '{LastName}' />", model, null);

            model.LastName = "A";

            MustEqual("A", ui._root.Attr("class"));
        }

        public void img_src_test()
        {
            var builder = new Builder
            {
                XmlString = "<img src='" + SampleImageUrl_350_150 + "' />"
            };

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

            var ui = Builder.Build(@"<div class='{LastName}' > <div class='{Child.LastName}'> <div class='{Child.Child.LastName}'></div> </div> </div>", model, null);

            MustEqual(1, ui.LogicalChilderen.Count);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("B", ui.GetLogicalChildAt(0)._root.Attr("class"));

            MustEqual(1, ui.GetLogicalChildAt(0).LogicalChilderen.Count);

            MustEqual("C", ui.GetLogicalChildAt(0).GetLogicalChildAt(0)._root.Attr("class"));
        }

        public void VisualTreeTest()
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

            var template = Template.CreateFromXml(@"<div class='{LastName}' > <div class='{Child.LastName}'> <div class='{Child.Child.LastName}'></div> </div> </div>");

            var ui = new FrameworkElement();

            Builder.Build(template, model, ui);

            MustEqualByReference(null, ui.VisaulParent);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("B", ui.GetVisualChildAt(0)._root.Attr("class"));

            MustEqual(1, ui.GetVisualChildAt(0).VisualChilderenCount);

            MustEqual("C", ui.GetVisualChildAt(0).GetVisualChildAt(0)._root.Attr("class"));
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
        void ComponentCreationTest()
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

            var ui = (Component123) Builder.Build("<Component123  StringProperty0 = '{LastName}' StringProperty1 = '{Child.LastName}' StringProperty2 = '{Child.Child.LastName}' />", model);
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
        }

        void ComponentCreationTestWithChilds()
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

            var ui = (Component123) Builder.Build("<Component123  StringProperty0 = '{LastName}' StringProperty1 = '{Child.LastName}' StringProperty2 = '{Child.Child.LastName}'>" +
                                                  " <div>" +
                                                  "     <div class = '{Child.Child.LastName}' />" +
                                                  " </div>" +
                                                  "</Component123> ", model);
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
        }

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