using System;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            new BindingInfoTest().ParsePath(); 
            new BindingInfoTest().SimpleBind();
            new BindingInfoTest().LongPropertyPathForSource();
            new BindingInfoTest().SimpleTwoWayBind(); 

            Console.WriteLine("Success");
        }
        #endregion
    }
}