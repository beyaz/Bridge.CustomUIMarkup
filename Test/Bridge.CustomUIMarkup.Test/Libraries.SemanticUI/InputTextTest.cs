using System.Windows;
using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;

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

            new InputTextTest().ClassBindingTest();
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
        }
        #endregion

        #region Methods
        void Binding_Custom_Attribute()
        {
            var model = new SimpleClass1();

            var div = new Builder
            {
                XmlString = "<div><div yx = '{LastName}' /></div>",
                DataContext = model
            }.Build();

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

            var el = new Builder
            {
                XmlString = "<div> <div DataContext = '{Child}' yx='{Child.Child.LastName}' /> </div>",
                DataContext = model
            }.Build();

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

        void ClassBindingTest()
        {
            var model = new SimpleClass1
            {
                LastName = "A"
            };

            var template = @"<div class='{LastName}' />";

            var ui = Builder.Build(template, model, null);

            MustEqual("A", ui._root.Attr("class"));

            model.LastName = "b";

            MustEqual("b", ui._root.Attr("class"));
        }

        void ClassBindingTest2()
        {
            var fe = new FrameworkElement();

            var template = Template.CreateFromXml(@"<div class='{Class}' />");

            Builder.Build(template, fe);

            MustEqual(null, fe._root.Attr("class"));

            fe.Class = "b";

            MustEqual("b", fe._root.Attr("class"));
        }

        void FieldBindingTest()
        {
            var model = new SimpleClass1
            {
                LastName = "a"
            };

            var template = "<div>" +
                           "    <TextBox  Text='{LastName}' />" +
                           "    <field>" +
                           "        <textBox  Text='{LastName}' />" +
                           "	</field>" +
                           "</div>";

            var ui = Builder.Build(template, model);

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
            var template = "<field>" +
                           "<textBox  />" +
                           "</field>";

            var ui = Builder.Build(template, null);
            MustTrue(ui is Field);
            MustEqual(1, ui.LogicalChilderenCount);

            MustTrue(ui.GetLogicalChildAt(0) is InputText);
        }

        void On_Parent_DataContext_Changed()
        {
            var model = new SimpleClass1();

            var div = Builder.Build("<div><textBox Text='{LastName}' /></div>", model);

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

            var div = new Builder
            {
                XmlString = "<div><textBox DataContext = '{Binding Child}'  Text='{LastName}' /></div>",
                DataContext = model
            }.Build();

            var el = (InputText) div.GetLogicalChildAt(0);

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

            var el = (InputText) new Builder
            {
                XmlString = "<textBox Text='{Child.Child.Child.LastName}' />",
                DataContext = model
            }.Build();

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

            var el = new Builder
            {
                XmlString = "<div>{Child.Child.Child.LastName}</div>",
                DataContext = model
            }.Build();

            MustEqual("a", el.InnerHTML);

            model.Child.Child.Child.LastName = "b";

            MustEqual("b", el.InnerHTML);

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

            MustEqual("x", el.InnerHTML);
        }

        void SimpleBind_OnDataContext_Changed()
        {
            var simpleClass1 = new SimpleClass1();

            var el = (InputText) new Builder
            {
                XmlString = "<textBox Text='{LastName}' />",
                DataContext = simpleClass1
            }.Build();

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

        void Template_creation()
        {
            var fe = new TestElement
            {
                StringProperty0 = "A",
                StringProperty1 = "B"
            };

            var template = Template.CreateFromXml(@"<div class='{StringProperty0}'>   <div Visibility='{LabelVisbility}'> <div x='{StringProperty1}' /> </div> </div>");

            Builder.Build(template, fe);

            MustEqual("A", fe._root.Attr("class"));

            MustEqual("B", fe.GetVisualChildAt(0).GetVisualChildAt(0)._root.Attr("x"));

            MustTrue(fe.GetVisualChildAt(0).Visibility == Visibility.Collapsed);
        }
        #endregion
    }
}