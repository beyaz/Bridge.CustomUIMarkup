using System;
using System.Globalization;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Test
{
    class CastTest
    {
        #region Public Methods
        public static void Register()
        {
            QUnit.QUnit.Test(nameof(CastTest) + "->" + nameof(Int32ToNullableInt32), Int32ToNullableInt32);
            QUnit.QUnit.Test(nameof(CastTest) + "->" + nameof(DateParseTest), DateParseTest);
        }
        #endregion

        #region Methods
        static void DateParseTest(Assert assert)
        {
            var result = Cast.To<DateTime?>("2015/03/13");

            assert.Ok(result != null);

            assert.Equal(2015, result.GetValueOrDefault().Year);
            assert.Equal(3, result.GetValueOrDefault().Month);
            assert.Equal(13, result.GetValueOrDefault().Day);
        }

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