using System;
using System.Windows.Data;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            QUnit.QUnit.Test(nameof(BindingInfoTest.SimpleBind), BindingInfoTest.SimpleBind);

            Console.WriteLine("Success");
        }
        #endregion
    }
}