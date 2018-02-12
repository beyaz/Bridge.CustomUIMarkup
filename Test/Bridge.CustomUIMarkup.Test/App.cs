using System.Text.Tokenizers;
using System.Windows;
using BOA.Common.Helpers.Test;
using Bridge.CustomUIMarkup.Libraries.CodeMirror;
using Bridge.CustomUIMarkup.Libraries.split_js;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.Libraries.Swiper;
using Bridge.CustomUIMarkup.Libraries.viewerjs;
using Bridge.CustomUIMarkupOnReact;
using Bridge.Html5;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        [Ready]
        public static void RunAll()
        {
            AllTest.Register();
            SemanticUIElements.RegisterToBuilder();
            SplitJsElements.RegisterToBuilder();
            CodeMirrorElements.RegisterToBuilder();
            ViewerJsElements.RegisterToBuilder();
            SwiperElements.RegisterToBuilder();

            CastTest.Register();
            RandomValueTest.Register();
            JsonSerializerTest.Register();
            RangeTest.Register();

            QUnit.QUnit.Test(nameof(BindingTests), BindingTests);

            QUnit.QUnit.Test(nameof(BindingInfoTest2), BindingInfoTest2.RunAll);
            
            QUnit.QUnit.Test(nameof(BuilderTest), BuilderTest);
            QUnit.QUnit.Test(nameof(RunOldTests), RunOldTests);

            ComboTest.RegisterAll();
        }
        #endregion

        #region Methods
        static void BindingTests(Assert assert)
        {
            TokenizerTest.Run();

            BindingInfoTest.RunAll();

            HTMLBindingInfoTest.RunAll();

            assert.Equal(1, 1);
        }


        static void BuilderTest(Assert assert)
        {
            Z_Builder2Test.RunAll();

            assert.Equal(1, 1);
        }


        static void RunOldTests(Assert assert)
        {

            ContentControlTest.RunAll();

            InputTextTest.RunAll();

            TabItemTest.RunAll();
            DataGridTest.RunAll();

            ItemsControlTests.RunAll();

            DatePickerTest.RunAll();

            assert.Equal(1, 1);
        }
        #endregion
    }
}