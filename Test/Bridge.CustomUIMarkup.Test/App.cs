using System;
using System.Text.Tokenizers;
using System.Windows;
using BOA.Common.Helpers.Test;
using Bridge.CustomUIMarkup.Libraries.CodeMirror;
using Bridge.CustomUIMarkup.Libraries.split_js;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.Libraries.Swiper;
using Bridge.CustomUIMarkup.Libraries.viewerjs;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            SemanticUIElements.RegisterToBuilder();
            SplitJsElements.RegisterToBuilder();
            CodeMirrorElements.RegisterToBuilder();
            ViewerJsElements.RegisterToBuilder();
            SwiperElements.RegisterToBuilder();

            Z_Builder2Test.RunAll();

            ContentControlTest.RunAll();

            TokenizerTest.Run();
            BindingInfoTest.RunAll();

            HTMLBindingInfoTest.RunAll();
            InputTextTest.RunAll();

            TabItemTest.RunAll();
            DataGridTest.RunAll();

            ItemsControlTests.RunAll();

            CastTest.RunAll();

            DatePickerTest.RunAll();

            RandomValueTest.RunAll();

            JsonSerializerTest.RunAll();

            Console.WriteLine("Success");
        }
        #endregion
    }
}