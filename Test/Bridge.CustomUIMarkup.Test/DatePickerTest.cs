using System;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;

namespace Bridge.CustomUIMarkup.Test
{
    class DatePickerTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new DatePickerTest().FieldBindingTest();
        }
        #endregion

        #region Methods
        void FieldBindingTest()
        {
            var model = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    BeginDate = DateTime.Today
                }
            };

            var template = "<div>" +
                           "    <field>" +
                           "        <DatePicker  Value='{Child.BeginDate}' />" +
                           "	</field>" +
                           "</div>";

            var ui = BuildAndGetFirstLogicalChild(template, model);

            var field = (Field) ui.GetLogicalChildAt(0);
            var datePicker = (DatePicker) field.GetLogicalChildAt(0);

            Assert.True(datePicker.Value.HasValue);

            Assert.True(datePicker.Value == DateTime.Today);


            model.Child.BeginDate = DateTime.Today.AddDays(-1);

            Assert.True(datePicker.Value == DateTime.Today.AddDays(-1));


            datePicker.Value = DateTime.Today.AddDays(2);


            Assert.True(model.Child.BeginDate == DateTime.Today.AddDays(2));
        }
        #endregion
    }
}