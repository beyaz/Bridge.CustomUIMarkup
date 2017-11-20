namespace System.Windows
{
    class FrameworkElement_img : FrameworkElement
    {
        #region Constructors
        public FrameworkElement_img() : base("img")
        {
        }
        #endregion

        #region SrcProperty
        public static readonly DependencyProperty SrcProperty = DependencyProperty.Register(nameof(Src), typeof(string), typeof(FrameworkElement_img), CreateHtmlAttributeUpdater("src"));

        public string Src
        {
            get { return (string) GetValue(SrcProperty); }
            set { SetValue(SrcProperty, value); }
        }
        #endregion
    }
}