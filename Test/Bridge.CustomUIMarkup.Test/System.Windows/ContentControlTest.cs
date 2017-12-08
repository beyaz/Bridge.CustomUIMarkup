using Bridge.CustomUIMarkup.Test;

namespace System.Windows
{
    class ContentControlTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new ContentControlTest().AssingStringValueToContent();
        }
        #endregion

        #region Methods
        void AssingStringValueToContent()
        {
            var contentControl = new ContentControl
            {
                _contentPresenter = new ContentPresenter(),
                Content = "A"
            };

            MustEqual(1, contentControl.LogicalChilderenCount);

            var fe = new FrameworkElement("T");
            contentControl.Content = fe;

            MustEqual(1, contentControl.LogicalChilderenCount);

            MustEqualByReference(fe, contentControl.GetLogicalChildAt(0));

            fe = new FrameworkElement("X");
            contentControl.Content = fe;

            MustEqual(1, contentControl.LogicalChilderenCount);

            MustEqualByReference(fe, contentControl.GetLogicalChildAt(0));
        }
        #endregion
    }
}