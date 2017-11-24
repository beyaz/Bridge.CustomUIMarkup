using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class InputTextTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new InputTextTest().SimpleBind();
        }
        #endregion

        #region Methods
         void SimpleBind()
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
        }
        #endregion
    }
}