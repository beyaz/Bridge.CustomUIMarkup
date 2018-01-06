using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.Tokenizers;
using Bridge.CustomUIMarkup.UI;
using Bridge.Html5;

namespace Bridge.CustomUIMarkup.Test
{
    public class Component123 : HtmlElement
    {
        #region Fields
        // ReSharper disable once UnassignedField.Global
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

                Builder.BuildControlTemplate(template, fe);

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

    class Z_Builder2Test : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new Z_Builder2Test().CheckTemplateIsSuccess();
            new Z_Builder2Test().LogicalTreeTest();
            new Z_Builder2Test().VisualTreeTest();
            new Z_Builder2Test().innerHTML_Bindings_Mustbe_Support();

            new Z_Builder2Test().img_src_test();
            new Z_Builder2Test().img_src_test_with_binding();
            new Z_Builder2Test().class_attribute_must_support_binding();
            new Z_Builder2Test().ComponentCreationTest();
            new Z_Builder2Test().ComponentCreationTestWithChilds();
            new Z_Builder2Test().ComponentCreationTestWithOtherElements();
            new Z_Builder2Test().VisualTreeTest_multiple_child();
            new Z_Builder2Test().VisualTreeTest_TemplateControl();
            new Z_Builder2Test().LogicalTreeTest2();
            new Z_Builder2Test().SubElementAsAttribute();
            new Z_Builder2Test().TextNode();
            new Z_Builder2Test().InputTypeHidden();
            new Z_Builder2Test().Input_Type_text(); 

            new Z_Builder2Test().combo_SelectedValueTest();
            new Z_Builder2Test().combo_SelectedValueTest_with_converter();
            new Z_Builder2Test().Parse_ViewInvocationExpressionInfo();


        }
        #endregion


        void Parse_ViewInvocationExpressionInfo()
        {

            var info = ViewInvocationExpressionInfo.Parse("this.AAA(5,'uy kğş',7)");
            Assert.AreEqual("AAA", info.MethodName);
            Assert.True(info.IsStartsWithThis);
            Assert.AreEqual(3M, info.Parameters.Count);
            Assert.AreEqual(5M, info.Parameters[0].ToInt32());
            Assert.AreEqual("uy kğş", info.Parameters[1] as string);
            Assert.AreEqual(7M, info.Parameters[2].ToInt32());


             info = ViewInvocationExpressionInfo.Parse("AAA");
            Assert.AreEqual("AAA",info.MethodName);

            info = ViewInvocationExpressionInfo.Parse("this.AAA()");
            Assert.AreEqual("AAA", info.MethodName);
            Assert.True(info.IsStartsWithThis);

            info = ViewInvocationExpressionInfo.Parse("this.AAA(5)");
            Assert.AreEqual("AAA", info.MethodName);
            Assert.True(info.IsStartsWithThis);
            Assert.AreEqual(1M, info.Parameters.Count);
            Assert.AreEqual(5M, info.Parameters[0].ToInt32());


            


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

        

        void class_attribute_must_support_binding()
        {
            var model = new SimpleClass1
            {
                LastName = "B"
            };

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe, "<div class = '{LastName}' />");

            var ui = fe.GetLogicalChildAt(0);

            MustEqual("B", ui.Attr("class"));

            model.LastName = "A";

            MustEqual("A", ui.Attr("class"));
        }

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

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe, "<Component123  StringProperty0 = '{LastName}' StringProperty1 = '{Child.LastName}' StringProperty2 = '{Child.Child.LastName}' />");

            var ui = (Component123) fe.GetLogicalChildAt(0);

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

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe, "<Component123  StringProperty0 = '{LastName}' StringProperty1 = '{Child.LastName}' StringProperty2 = '{Child.Child.LastName}'>" +
                                      " <div>" +
                                      "     <div class = '{Child.Child.LastName}' />" +
                                      " </div>" +
                                      "</Component123> ");

            var ui = (Component123) fe.GetLogicalChildAt(0);

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

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe, stringXml);

            var root = fe.GetLogicalChildAt(0);

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

            MustEqual("3", ui.GetLogicalChildAt(0).GetLogicalChildAt(0).Attr("class"));

            MustEqual(model.Child.LastName, root.GetLogicalChildAt(0).Attr("class"));
        }

        void img_src_test()
        {
            var fe = new FrameworkElement();

            Builder.LoadComponent(fe, "<img src='" + SampleImageUrl_350_150 + "' />");

            var ui = fe.GetLogicalChildAt(0);

            MustEqual("IMG", ui._root.Get(0).TagName);

            MustEqual(SampleImageUrl_350_150, ui.Attr("src"));
        }

        void SubElementAsAttribute()
        {

            var ui = BuildAndGetFirstLogicalChild("<div>" +
                                                  "     <div.Height> 56 </div.Height>" +
                                                  "</div>", null);

            MustEqual("56px", ui._root.Css("height"));

            
        }

        void TextNode()
        {
            var htmlString = "<div id='A'><i id='B'></i>klm</div>";
            var ui = BuildAndGetFirstLogicalChild(htmlString, null);

            MustEqual(htmlString, ui._el.AsHtmlString());
        }

        void InputTypeHidden()
        {
            var model = new SimpleClass1
            {
                LastName = "Neşet Ertaş"
            };

            var htmlString = "<input id='A' type='hidden' value='{LastName,Mode=TwoWay}' />";

            var ui = BuildAndGetFirstLogicalChild(htmlString, model);

            MustEqual( "<input id='A' type='hidden' value='Neşet Ertaş'>",ui._el.AsHtmlString());

            model.LastName = "Qwr";

            MustEqual("<input id='A' type='hidden' value='Qwr'>", ui._el.AsHtmlString());

            ui._root.Val("xyZ").Change();

            MustEqual("xyZ", model.LastName);
        }


        void Input_Type_text()
        {
            var model = new SimpleClass1
            {
                LastName = "Neşet Ertaş"
            };

            var htmlString = "<input id='A' type='text' value='{LastName,Mode=TwoWay}' />";

            var ui = BuildAndGetFirstLogicalChild(htmlString, model);

            MustEqual("<input id='A' type='text'>", ui._el.AsHtmlString());

            Assert.AreEqual("Neşet Ertaş", ui._el["value"].As<string>());

            model.LastName = "Qwr";

            MustEqual("<input id='A' type='text'>", ui._el.AsHtmlString());

            Assert.AreEqual("Qwr", ui._el["value"].As<string>());

            //ui._root.Val("xyZ").Change();

            //MustEqual("xyZ", model.LastName);
        }


        class ComboModel : Bag
        {
            #region List<SimpleClass1> Items
            List<SimpleClass1>        _items;
            public List<SimpleClass1> Items
            {
                get { return _items; }
                set
                {
                    if (_items != value)
                    {
                        _items = value;
                        OnPropertyChanged("Items");
                    }
                }
            }
            #endregion



            #region int SelectedYear
            int? _selectedYear;
            public int? SelectedYear
            {
                get { return _selectedYear; }
                set
                {
                    if (_selectedYear != value)
                    {
                        _selectedYear = value;
                        OnPropertyChanged("SelectedYear");
                    }
                }
            }
            #endregion

            #region string SelectedYearAsString
            string        _selectedYearAsString;
            public string SelectedYearAsString
            {
                get { return _selectedYearAsString; }
                set
                {
                    if (_selectedYearAsString != value)
                    {
                        _selectedYearAsString = value;
                        OnPropertyChanged("SelectedYearAsString");
                    }
                }
            }
            #endregion

            #region ComboModel Child
            ComboModel        _child;
            public ComboModel Child
            {
                get { return _child; }
                set
                {
                    if (_child != value)
                    {
                        _child = value;
                        OnPropertyChanged("Child");
                    }
                }
            }
            #endregion



        }

        void combo_SelectedValueTest()
        {
            var model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName = "Neşet Ertaş",
                        YearNullable = 5
                    },
                    new SimpleClass1
                    {
                        LastName = "Neşet Ertaş2",
                        YearNullable = 7
                    },
                    new SimpleClass1
                    {
                        LastName = "Neşet Ertaş -1",
                        YearNullable = -1
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş null",
                        YearNullable = null
                    }
                },
                SelectedYear = 5
            };
           

            var htmlString = @"

 <combo ItemsSource ='{Items}' 
                         DisplayMemberPath='LastName' 
                         SelectedValuePath='YearNullable'
                         SelectedValue='{SelectedYear}' />

";

            var ui = (Combo)BuildAndGetFirstLogicalChild(htmlString, model);

           MustEqual(5, Cast.To<int>(ui.SelectedValue));

            MustEqualByReference(model.Items[0], ui.SelectedItem);

            ui.SelectedValue = 7;

            Assert.AreEqual(7,model.SelectedYear);

            MustEqualByReference(model.Items[1], ui.SelectedItem);


            ui.SelectedValue = -1;

            Assert.AreEqual(-1, model.SelectedYear);

            MustEqualByReference(model.Items[2], ui.SelectedItem);


            ui.SelectedValue = null;

            Assert.AreEqual(null, model.SelectedYear);

            MustEqualByReference(model.Items[3], ui.SelectedItem);



            model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş",
                        YearNullable = 5
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş2",
                        YearNullable = 7
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş -1",
                        YearNullable = -1
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş null",
                        YearNullable = null
                    }
                },
                SelectedYear = 7
            };

            ui.DataContext = model;

            Assert.True(7 == ui.SelectedValue.ToInt32());

            MustEqualByReference(model.Items[1], ui.SelectedItem);



            model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş",
                        YearNullable = 5
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş2",
                        YearNullable = 7
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş -1",
                        YearNullable = -1
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş null",
                        YearNullable = null
                    }
                },
                SelectedYear = null
            };

            ui.DataContext = model;

            Assert.True(null == ui.SelectedValue);

            MustEqualByReference(model.Items[3], ui.SelectedItem);



            model.Items = new List<SimpleClass1>
            {
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş",
                    YearNullable = 5
                },
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş null",
                    YearNullable = null
                },
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş2",
                    YearNullable = 7
                },
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş -1",
                    YearNullable = -1
                },
                
            };

            Assert.True(null == ui.SelectedValue);
            MustEqualByReference(model.Items[1], ui.SelectedItem);
        }

        void combo_SelectedValueTest_with_converter()
        {
            var model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName = "Neşet Ertaş",
                        Year     = 5
                    },
                    new SimpleClass1
                    {
                        LastName = "Neşet Ertaş2",
                        Year     = 7
                    }
                },
                Child = new ComboModel
                {
                    SelectedYearAsString = "5"
                }
            };


            var htmlString = @"

<Field>

 <combo ItemsSource ='{Items}' 
                         DisplayMemberPath='LastName' 
                         SelectedValuePath='Year'
                         SelectedValue='{Child.SelectedYearAsString}' />
</Field>

";

            var fe = new FrameworkElement
            {
            };

            fe.LoadComponent(htmlString);

            var field = fe.GetLogicalChildAt(0);


            Assert.True(field.DataContext == null);

            fe.DataContext = model;

            Assert.True(field.DataContext == model);
            

            

            var ui = (Combo) field.GetLogicalChildAt(0);

            MustEqual("5", Cast.To<string>(ui.SelectedValue));

            ui.SelectedValue = 7;

            MustEqual("7", model.Child.SelectedYearAsString);
        }


        void img_src_test_with_binding()
        {
            var model = new SimpleClass1
            {
                LastName = SampleImageUrl_350_150
            };

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe, "<img src='{LastName}' />");

            var ui = fe.GetLogicalChildAt(0);

            MustEqual(SampleImageUrl_350_150, ui.Attr("src"));

            model.LastName = SampleImageUrl_350_151;

            MustEqual(SampleImageUrl_350_151, ui.Attr("src"));
        }

        void innerHTML_Bindings_Mustbe_Support()
        {
            var model = new SimpleClass1
            {
                LastName = "Şaziye"
            };

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe, "<div> {LastName} </div>");

            var ui = fe.GetLogicalChildAt(0);

            MustEqual("Şaziye", ui.InnerHTML);
            MustEqual("Şaziye", ui.html());
        }

        void LogicalTreeTest()
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

            Builder.LoadComponent(fe, "<div class='{LastName}'> " +
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

        void LogicalTreeTest2()
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
            userControl.DataContext = model;

            Builder.LoadComponent(userControl,
                                  "<div id='0' class='{LastName}'> " +
                                  "    <div id='1' class='{Child.LastName}'> " +
                                  "        <div id='2' class='{Child.Child.LastName}' />" +
                                  "    </div>" +
                                  "</div>");



            var ui = userControl.GetLogicalChildAt(0);

            MustEqual(1, ui.LogicalChilderen.Count);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("B", ui.GetLogicalChildAt(0)._root.Attr("class"));

            MustEqual(1, ui.GetLogicalChildAt(0).LogicalChilderen.Count);

            MustEqual("C", ui.GetLogicalChildAt(0).GetLogicalChildAt(0)._root.Attr("class"));
        }

        void VisualTreeTest()
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

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            Builder.LoadComponent(fe, @"<div class='{LastName}' > <div class='{Child.LastName}'> <div class='{Child.Child.LastName}'></div> </div> </div>");

            MustEqualByReference(null, fe.VisaulParent);

            var ui = fe.GetLogicalChildAt(0);

            MustEqual("A", ui._root.Attr("class"));

            MustEqual("B", ui.GetVisualChildAt(0)._root.Attr("class"));

            MustEqual(1, ui.GetVisualChildAt(0).VisualChilderenCount);

            MustEqual("C", ui.GetVisualChildAt(0).GetVisualChildAt(0)._root.Attr("class"));
        }

        void VisualTreeTest_multiple_child()
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

            var template =
                @"<div class='{LastName}' > 
    <div class='{LastName}' />
    <div class='{Child.LastName}' />
    <div class='{Child.Child.LastName}' />
</div>";

            var fe = new FrameworkElement
            {
                DataContext = model
            };
            Builder.LoadComponent(fe, template);

            var ui = fe.GetLogicalChildAt(0);

            MustEqual(3, ui.VisualChilderenCount);

            MustEqual("A", ui.Attr("class"));

            MustEqual("A", ui.GetVisualChildAt(0).Attr("class"));
            MustEqual("B", ui.GetVisualChildAt(1).Attr("class"));
            MustEqual("C", ui.GetVisualChildAt(2).Attr("class"));

            MustEqualByReference(ui, ui.GetVisualChildAt(0).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(1).VisaulParent);
            MustEqualByReference(ui, ui.GetVisualChildAt(2).VisaulParent);

            MustEqual(0, ui.GetVisualChildAt(0).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(1).VisualChilderenCount);
            MustEqual(0, ui.GetVisualChildAt(2).VisualChilderenCount);
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

                Builder.BuildControlTemplate(template, fe);

                MustEqual(1, fe.VisualChilderenCount);
                MustEqual(3, fe.GetVisualChildAt(0).VisualChilderenCount);

                MustEqual("B", fe.GetVisualChildAt(0, 0).Attr("class"));
                MustEqual("C", fe.GetVisualChildAt(0, 1).Attr("class"));
                MustEqual("D", fe.GetVisualChildAt(0, 2).Attr("class"));

                return fe;
            });

            var containerElement = new HtmlElement
            {
                DataContext = model
            };
            Builder.LoadComponent(containerElement, "<x_r_t_t_6> " +
                                                    "   <s class='sf'/>" +
                                                    "</x_r_t_t_6>");

            var containerElementAsHtmlString = containerElement._el.AsHtmlString();

            MustEqual(
                "<div>" +
                "<div class='A'>" +
                "<div class='B'></div>" +
                "<div class='C'></div>" +
                "<div class='D'></div>" +
                "<s class='sf'></s>" +
                "</div>" +
                "</div>"
                , containerElementAsHtmlString);

            containerElement = new HtmlElement
            {
                DataContext = model
            };

            Builder.LoadComponent(containerElement, "<div>" +
                                                    "   <div> " +
                                                    "       <x_r_t_t_6>  " +
                                                    "           <s class='sf'/>  " +
                                                    "       </x_r_t_t_6>  " +
                                                    "   </div>" +
                                                    "</div>");

            containerElementAsHtmlString = containerElement._el.AsHtmlString();

            MustEqual(
                "<div>" +
                "<div>" +
                "<div>" +
                "<div class='A'>" +
                "<div class='B'></div>" +
                "<div class='C'></div>" +
                "<div class='D'></div>" +
                "<s class='sf'></s>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
                , containerElementAsHtmlString);
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