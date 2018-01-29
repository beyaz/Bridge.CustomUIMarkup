using System;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Test
{
    class CastTest
    {
        #region Public Methods
        public static void RunAll()
        {
            QUnit.QUnit.Test(nameof(CastTest) + "->" + nameof(Int32ToNullableInt32), Int32ToNullableInt32);
        }
        #endregion

        #region Methods
        static void Int32ToNullableInt32(Assert assert)
        {
            var i = 6;

            var result = Cast.To<int?>(i);

            assert.Ok(result != null);

            assert.Equal(i, result.GetValueOrDefault());
        }
        #endregion
    }
}