using System;

namespace Bridge.CustomUIMarkup.Test
{
    class CastTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new CastTest().Int32ToNullableInt32();
        }
        #endregion

        #region Methods
        void Int32ToNullableInt32()
        {
            int i = 6;
            var result = Cast.To<int?>(i);

            MustTrue(result != null);
            MustEqual(i, result.GetValueOrDefault());
        }
        #endregion
    }
}