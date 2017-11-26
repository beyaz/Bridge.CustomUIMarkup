using System;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            TokenizerTest.Run();
            BindingInfoTest.RunAll();
            BuilderTest.RunAll();
            HTMLBindingInfoTest.RunAll();
            InputTextTest.RunAll();

            Console.WriteLine("Success");
        }
        #endregion
    }
}