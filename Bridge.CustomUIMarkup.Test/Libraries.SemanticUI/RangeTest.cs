﻿using System.Windows;
using Bridge.CustomUIMarkup.UI;
using Bridge.Html5;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class RangeTest
    {
        #region Public Methods
        public static void Register()
        {
            QUnit.QUnit.Test(nameof(RangeTest) + "->" + nameof(Avoid_Circular_Call_When_Value_Updated), Avoid_Circular_Call_When_Value_Updated);
        }
        #endregion

        #region Methods
        static void Avoid_Circular_Call_When_Value_Updated(Assert assert)
        {
            var model = new MyClass
            {
                RangeValue = 5
            };

            var xmlString = "<ui-range Max='10'  Step = '1'  Value='{RangeValue}' />";

            var ui = new FrameworkElement
            {
                DataContext = model
            };

            ui.LoadComponent(xmlString);

            var range = (Range) ui.GetLogicalChildAt(0);
            assert.Equal(range.Value, 5);

            var uiUpdateCount            = 0;
            range.OnUIValueUpdatedByCode += () => { uiUpdateCount++; };

            var done = assert.Async();

            Window.SetTimeout(() =>
            {
                ui.DataContext = new MyClass
                {
                    RangeValue = 6
                };

                done();

                assert.Ok(range.Value == 6);

                assert.Ok(uiUpdateCount == 1);
            }, 5);
        }
        #endregion

        class MyClass
        {
            #region Public Properties
            public int RangeValue { get; set; }
            #endregion
        }
    }
}