using System;

namespace Bridge.CustomUIMarkup.Test
{
    public class TestBase
    {
        #region Methods
        protected void MustEqual(string expected, string actual)
        {
            if (expected != actual)
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }
        protected void MustEqualByReference(object expected, object actual)
        {
            if ( !ReferenceEquals(expected , actual))
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }
        #endregion
    }
}