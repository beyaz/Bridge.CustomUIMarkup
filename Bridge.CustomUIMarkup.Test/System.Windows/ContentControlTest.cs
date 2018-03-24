using System.Windows.Controls;
using Bridge.CustomUIMarkup.Test;

namespace System.Windows
{
    class ContentControlTest : TestBase
    {
    

        const string Rule_Content_Control_can_have_only_one_Logical_child = nameof(Rule_Content_Control_can_have_only_one_Logical_child);
        #region Methods
        internal static void AssingStringValueToContent(Bridge.QUnit.Assert assert)
        {
            var contentControl = new ContentControl
            {
                _contentPresenter = new ContentPresenter(),
                Content = "A"
            };

            assert.AreEqual(1, contentControl.LogicalChilderenCount, Rule_Content_Control_can_have_only_one_Logical_child);

            var fe = new FrameworkElement("T");
            contentControl.Content = fe;

            assert.AreEqual(1, contentControl.LogicalChilderenCount);

            assert.Equal(fe, contentControl.GetLogicalChildAt(0));

            fe = new FrameworkElement("X");
            contentControl.Content = fe;

            assert.AreEqual(1, contentControl.LogicalChilderenCount);

            assert.MustEqualByReference(fe, contentControl.GetLogicalChildAt(0));
        }
        #endregion
    }
}