using System;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            new BindingInfoTest().SimpleBind();
            new BindingInfoTest().LongPropertyPathForSource();

            Console.WriteLine("Success");
        }
        #endregion
    }
}