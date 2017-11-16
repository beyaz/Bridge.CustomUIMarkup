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
            new BindingInfoTest().BindingInBag();
            new BindingInfoTest().SimpleBindWithSameValues();
            new BindingInfoTest().TwoWayCircularBindingMustbeSupport();
            new BindingInfoTest().TwoWayCircularBindingBetweenThreeItemsMustbeSupport(); 

            Console.WriteLine("Success");
        }
        #endregion
    }
}