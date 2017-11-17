using System;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            BindingInfoTest.RunAll();
            BuilderTest.RunAll();
            HTMLBindingInfoTest.RunAll();

            Console.WriteLine("Success");
        }
        #endregion
    }
}