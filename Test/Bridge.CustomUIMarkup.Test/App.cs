using System;
using System.Windows;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using System.Text.Tokenizers;
using BOA.Common.Helpers.Test;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            Bridge.CustomUIMarkup.Libraries.SemanticUI.SemanticUIElements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.split_js.SplitJsElements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.CodeMirror.CodeMirrorElements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.viewerjs.ViewerJsElements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.Swiper.SwiperElements.RegisterToBuilder();



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

            Console.WriteLine("Success");
        }
        #endregion
    }
}