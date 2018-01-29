using System;

namespace Bridge.CustomUIMarkup.Test
{
    class CastTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            QUnit.QUnit.Test(nameof(Int32ToNullableInt32), Int32ToNullableInt32);
        }
        #endregion

        #region Methods
        static void Int32ToNullableInt32(QUnit.Assert assert)
        {
            var i = 6;

            var result = Cast.To<int?>(i);

            assert.Ok(result != null);

            assert.Equal(i, result.GetValueOrDefault());
        }
        #endregion
    }
}