using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;
using Extensions = Bridge.Html5.Extensions;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TestElement : FrameworkElement
    {
        #region Visibility LabelVisbility
        public static readonly DependencyProperty LabelVisbilityProperty = DependencyProperty.Register(nameof(LabelVisbility), typeof(Visibility), typeof(TestElement), new PropertyMetadata(Visibility.Collapsed));

        public Visibility LabelVisbility
        {
            get { return (Visibility) GetValue(LabelVisbilityProperty); }
            set { SetValue(LabelVisbilityProperty, value); }
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
    }

    class InputTextTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new InputTextTest().Template_creation();

            new InputTextTest().ClassBindingTest2();
            new InputTextTest().FieldLogicalChildTest();
            new InputTextTest().FieldBindingTest();
            new InputTextTest().OnDataContext_Changed();
            new InputTextTest().SimpleBind_OnDataContext_Changed();
            new InputTextTest().On_Parent_DataContext_Changed();
            new InputTextTest().On_Parent_DataContext_Changed_with_DataContext_Binded();
            new InputTextTest().OnDataContext_Changed_InnerHTML();
            new InputTextTest().Binding_Custom_Attribute();
            new InputTextTest().Binding_Custom_Attribute_Parend_DataContext_Changed();
            new InputTextTest().FieldStringDataContext();
            new InputTextTest().FieldTextArea_Label_Binding(); 
        }
        #endregion

        #region Methods
        void Binding_Custom_Attribute()
        {
            var model = new SimpleClass1();

            var div = new FrameworkElement
            {
                DataContext = model
            }.LoadComponent("<div><div yx = '{LastName}' /></div>").GetLogicalChildAt(0);



            var el = div.GetLogicalChildAt(0);

            model.LastName = "abc";

            MustEqual("abc", el._root.Attr("yx"));

            div.DataContext = new SimpleClass1
            {
                LastName = "yyy"
            };

            MustEqual("yyy", el._root.Attr("yx"));
        }


        
        void Binding_Custom_Attribute_Parend_DataContext_Changed()
        {
            var model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        Child = new SimpleClass1
                        {
                            LastName = "a"
                        }
                    }
                }
            };

            var el = BuildAndGetFirstLogicalChild("<div> <div DataContext = '{Child}' yx='{Child.Child.LastName}' /> </div>", model
            );

            var childElement = el.GetLogicalChildAt(0);

            MustEqual("a", childElement._root.Attr("yx"));

            model.Child.Child.Child.LastName = "b";

            MustEqual("b", childElement._root.Attr("yx"));

            model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        Child = new SimpleClass1
                        {
                            LastName = "x"
                        }
                    }
                }
            };

            el.DataContext = model;

            MustEqual("x", childElement._root.Attr("yx"));
        }

       

        void ClassBindingTest2()
        {
            var fe = new FrameworkElement();

            var template = Template.CreateFromXml(@"<div class='{Class}' />");

            UIBuilder.BuildControlTemplate(template, fe);

            MustEqual(null, fe.Attr("class"));

            fe.Class = "b";

            MustEqual("b", fe.Attr("class"));
        }

        void FieldBindingTest()
        {
            var model = new SimpleClass1
            {
                LastName = "a"
            };

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            var template = "<div>" +
                           "    <TextBox  Text='{LastName}' />" +
                           "    <field>" +
                           "        <textBox  Text='{LastName}' />" +
                           "	</field>" +
                           "</div>";

            UIBuilder.LoadComponent(fe,template);

            var ui = fe.GetLogicalChildAt(0);

            var first = (InputText) ui.GetLogicalChildAt(0);
            var field = (Field) ui.GetLogicalChildAt(1);
            var second = (InputText) field.GetLogicalChildAt(0);

            MustEqual("a", first.Text);
            MustEqual("a", second.Text);

            model.LastName = "b";

            MustEqual("b", first.Text);
            MustEqual("b", second.Text);

            first.Text = "c";

            MustEqual("c", first.Text);
            MustEqual("c", second.Text);

            second.Text = "d";
            MustEqual("d", first.Text);
            MustEqual("d", second.Text);
        }

        void FieldLogicalChildTest()
        {
            var fe = new FrameworkElement();


            var template = "<field>" +
                           "<textBox  />" +
                           "</field>";

            UIBuilder.LoadComponent(fe,template);

            var ui = fe.GetLogicalChildAt(0);

            MustTrue(ui is Field);
            MustEqual(1, ui.LogicalChilderenCount);

            MustTrue(ui.GetLogicalChildAt(0) is InputText);
        }

        void On_Parent_DataContext_Changed()
        {

            
            var model = new SimpleClass1();


            var fe = new FrameworkElement
            {
                DataContext = model
            };

            UIBuilder.LoadComponent(fe,"<div><textBox Text='{LastName}' /></div>");

            var div = fe.GetLogicalChildAt(0);

            var el = (InputText) div.GetLogicalChildAt(0);

            model.LastName = "abc";

            MustEqual("abc", el.Text);

            el.Text = "qwe";

            MustEqual("qwe", model.LastName);

            div.DataContext = new SimpleClass1
            {
                LastName = "yyy"
            };

            MustEqual("yyy", el.Text);
        }

        void On_Parent_DataContext_Changed_with_DataContext_Binded()
        {
            var model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    LastName = "a"
                }
            };

            var div = BuildAndGetFirstLogicalChild("<div id='q0' ><textBox id='q1' DataContext = '{Binding Child}'  Text='{LastName}' /></div>", model);

            MustEqual("q0", div.Attr("id"));

            MustEqualByReference(model,div.DataContext);


            var el = (InputText) div.GetLogicalChildAt(0);

            MustEqual("q1",el.Attr("id"));

            MustEqualByReference(model.Child, el.DataContext);



            MustEqual("a", el.Text);

            model.Child = new SimpleClass1
            {
                LastName = "b"
            };

            MustEqualByReference(model.Child, el.DataContext);

            MustEqual("b", el.Text);

            model.Child.LastName = "c";

            MustEqual("c", el.Text);

            el.Text = "d";

            MustEqual("d", model.Child.LastName);
        }

        void OnDataContext_Changed()
        {
            var model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        Child = new SimpleClass1
                        {
                            LastName = "a"
                        }
                    }
                }
            };

            var el = (InputText)BuildAndGetFirstLogicalChild("<textBox Text='{Child.Child.Child.LastName}' />", model);



            MustEqual("a", el.Text);

            model.Child.Child.Child.LastName = "b";

            MustEqual("b", el.Text);

            model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        Child = new SimpleClass1
                        {
                            LastName = "x"
                        }
                    }
                }
            };

            el.DataContext = model;

            MustEqual("x", el.Text);
        }

        void OnDataContext_Changed_InnerHTML()
        {
            var model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        Child = new SimpleClass1
                        {
                            LastName = "a"
                        }
                    }
                }
            };

            var el = BuildAndGetFirstLogicalChild("<div>{Child.Child.Child.LastName}</div>", model);



            MustEqual("<div>a</div>", Extensions.AsHtmlString(el._el));

            model.Child.Child.Child.LastName = "b";

            MustEqual("<div>b</div>", Extensions.AsHtmlString(el._el));

            model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        Child = new SimpleClass1
                        {
                            LastName = "x"
                        }
                    }
                }
            };

            el.DataContext = model;

            MustEqual("<div>x</div>", Extensions.AsHtmlString(el._el));
        }

        void SimpleBind_OnDataContext_Changed()
        {
            var simpleClass1 = new SimpleClass1();

            var el = (InputText) BuildAndGetFirstLogicalChild("<textBox Text='{LastName}' />", simpleClass1);

            simpleClass1.LastName = "abc";

            MustEqual("abc", el.Text);

            el.Text = "qwe";

            MustEqual("qwe", simpleClass1.LastName);

            el.DataContext = new SimpleClass1
            {
                LastName = "yyy"
            };

            MustEqual("yyy", el.Text);
        }

        void FieldTextArea_Label_Binding()
        {
            var model = new SimpleClass1
            {

                Child = new SimpleClass1
                {
                    SimpleStringProperty = "k",

                    Child = new SimpleClass1
                    {
                        LastName = "A"
                    }


                }
            };

            
            var xmlString = "<div>" +
                            "      <FieldTextArea Value='{Child.Child.LastName}' Label='{Child.SimpleStringProperty}'  />" +
                            "</div>";

            var div = BuildAndGetFirstLogicalChild(xmlString,model);

            var fieldTextArea = (FieldString)div.GetLogicalChildAt(0);

            MustEqual("A", fieldTextArea.Value);

            Assert.AreEqual("k", fieldTextArea.Label);


            div.DataContext = new SimpleClass1
            {

                Child = new SimpleClass1
                {
                    SimpleStringProperty = "k2",

                    Child = new SimpleClass1
                    {
                        LastName = "A2"
                    }


                }
            };

            MustEqual("A2", fieldTextArea.Value);

            Assert.AreEqual("k2", fieldTextArea.Label);


        }
        void FieldStringDataContext()
        {
            var model = new SimpleClass1
            {
                
                Child = new SimpleClass1
                {
                    SimpleStringProperty = "k",

                    Child = new SimpleClass1
                    {
                        LastName = "A"
                    }


                }
            };

            var xmlString = "<div>" +
                            "      <FieldString Value='{Child.Child.LastName}' Label='{Child.SimpleStringProperty}' />" +
                            "</div>";

            var fe = new FrameworkElement
            {
                DataContext = model
            };

            var el = fe.LoadComponent(xmlString).GetLogicalChildAt(0);
            

            var fieldString = (FieldString)el.GetLogicalChildAt(0);

            MustEqual("A", fieldString.Value);

            Assert.AreEqual("k",fieldString.Label);

            model.Child = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    LastName = "B"
                }
            };

            MustEqual("B", fieldString.Value);


            fe.DataContext = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        LastName = "C"
                    }
                }
            };

            MustEqual("C", fieldString.Value);

            fieldString.Value = "P";

            Assert.AreEqual("P",((SimpleClass1)fe.DataContext).Child.Child.LastName);


            // test with empty data context 


            model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        LastName = "E"
                    }
                }
            };

            fe = new FrameworkElement();
            // fe.DataContext = model;


            el = fe.LoadComponent(xmlString).GetLogicalChildAt(0);
            fieldString = (FieldString)el.GetLogicalChildAt(0);

            MustEqual(null, fieldString.Value);

            Assert.True(fieldString.DataContext == null);

            fe.DataContext = model;

            Assert.True(fieldString.DataContext == model);

            MustEqual("E", fieldString.Value);

            fieldString.Value = "X";

            MustEqual("X", model.Child.Child.LastName);



        }

        void Template_creation()
        {
            var fe = new TestElement
            {
                StringProperty0 = "A",
                StringProperty1 = "B"
            };

            var template = Template.CreateFromXml("<div class='{StringProperty0}'>   " +
                                                  "     <div Visibility='{LabelVisbility}'> " +
                                                  "         <div x='{StringProperty1}' /> " +
                                                  "     </div> " +
                                                  "</div>");

            UIBuilder.BuildControlTemplate(template, fe);

            AssertNotNull(fe._root);

            MustEqual("A", fe.Attr("class"));

            MustEqual("B", fe.GetVisualChildAt(0,0,0).Attr("x"));

            MustTrue(fe.GetVisualChildAt(0,0).Visibility == Visibility.Collapsed);
        }
        #endregion
    }
}