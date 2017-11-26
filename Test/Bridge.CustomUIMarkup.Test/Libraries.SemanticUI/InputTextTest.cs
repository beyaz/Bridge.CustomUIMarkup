using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class InputTextTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new InputTextTest().OnDataContext_Changed();
            new InputTextTest().SimpleBind_OnDataContext_Changed();
            new InputTextTest().On_Parent_DataContext_Changed();
            new InputTextTest().On_Parent_DataContext_Changed_with_DataContext_Binded();
            new InputTextTest().OnDataContext_Changed_InnerHTML();
            
        }
        #endregion

        #region Methods
        void On_Parent_DataContext_Changed()
        {
            var model = new SimpleClass1();

            var div = new Builder
            {
                XmlString = "<div><textBox Text='{LastName}' /></div>",
                DataContext = model
            }.Build();

            var el = (InputText) div.Childeren[0];

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

            var el = (InputText) div.Childeren[0];

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
        #endregion
    }
}