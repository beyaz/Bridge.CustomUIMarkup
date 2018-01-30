using System;
using Bridge.Html5;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class RangeTest
    {
        public static void Register()
        {
            QUnit.QUnit.Test(nameof(RangeTest) + "->" + nameof(Avoid_Circular_Call_When_Value_Updated), Avoid_Circular_Call_When_Value_Updated);
        }

        static void Avoid_Circular_Call_When_Value_Updated(Assert assert)
        {
            var i = 6;

            var result = Cast.To<int?>(i);

            assert.Ok(result != null);

            assert.Equal(i, result.GetValueOrDefault());
        }
    }
}