namespace System.Windows
{
    class FrameworkElement_a : FrameworkElement
    {
        #region Constructors
        public FrameworkElement_a() : base("a")
        {
        }
        #endregion

        #region HrefProperty
        public static readonly DependencyProperty HrefProperty = DependencyProperty.Register(nameof(Href), typeof(string), typeof(FrameworkElement_a), CreateHtmlAttributeUpdater("href"));

        public string Href
        {
            get { return (string) GetValue(HrefProperty); }
            set { SetValue(HrefProperty, value); }
        }
        #endregion
    }
}