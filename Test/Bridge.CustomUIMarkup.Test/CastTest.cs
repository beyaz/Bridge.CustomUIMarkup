using System;

namespace Bridge.CustomUIMarkup.Test
{
    class CastTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new CastTest().Int32ToNullableInt32();
            new CastTest().Nullabe_Types_Default_Values_Mustbe_Null();
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


        void Nullabe_Types_Default_Values_Mustbe_Null()
        {
            Assert.IsNull(typeof(int?).GetDefaultValue());
        }
        #endregion
    }
}