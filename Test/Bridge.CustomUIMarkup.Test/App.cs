using System.Text.Tokenizers;
using System.Windows;
using BOA.Common.Helpers.Test;
using Bridge.CustomUIMarkup.Libraries.CodeMirror;
using Bridge.CustomUIMarkup.Libraries.split_js;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.Libraries.Swiper;
using Bridge.CustomUIMarkup.Libraries.viewerjs;
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
            SemanticUIElements.RegisterToBuilder();
            SplitJsElements.RegisterToBuilder();
            CodeMirrorElements.RegisterToBuilder();
            ViewerJsElements.RegisterToBuilder();
            SwiperElements.RegisterToBuilder();

            CastTest.Register();
            RandomValueTest.Register();
            JsonSerializerTest.Register();
            RangeTest.Register();


            QUnit.QUnit.Test(nameof(RunOldTests), RunOldTests);
        }
        #endregion

        #region Methods
        static void RunOldTests(Assert assert)
        {

            TokenizerTest.Run();

            BindingInfoTest.RunAll();

            HTMLBindingInfoTest.RunAll();


            Z_Builder2Test.RunAll();

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