using System;

namespace Bridge.CustomUIMarkup.Test
{
    public class TestBase
    {
        #region Fields
        protected string SampleImageUrl_350_150 = "http://via.placeholder.com/350x150";
        #endregion

       

        protected void MustTrue(bool condition)
        {
            if (condition)
            {
                return;
            }
            
            
                throw new InvalidCastException("Test Failed.Expects True");
            
        }

        #region Methods
        protected void MustEqual(string expected, string actual)
        {
            if (expected != actual)
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }
        protected void MustEqual(int expected, int actual)
        {
            if (expected != actual)
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }
        protected void MustEqualByReference(object expected, object actual)
        {
            if (!ReferenceEquals(expected, actual))
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }
        #endregion
    }
}