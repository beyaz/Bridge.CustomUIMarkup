using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.viewerjs
{
    public class Viewer : ListBox
    {
        #region Static Fields
        public static readonly DependencyProperty ItemHeightProperty = DependencyProperty.Register("ItemHeight", typeof(double), typeof(Viewer), new PropertyMetadata(100));

        public static readonly DependencyProperty ItemWidthProperty = DependencyProperty.Register("ItemWidth", typeof(double), typeof(Viewer), new PropertyMetadata(100));
        #endregion

        #region Constructors
        public Viewer()
        {
            this.OnPropertyChanged(nameof(ItemHeight), Render);
            this.OnPropertyChanged(nameof(ItemWidth), Render);

            AfterRenderCompleted += InitWrapper;
        }
        #endregion

        #region Public Properties
        public double ItemHeight
        {
            get { return (double) GetValue(ItemHeightProperty); }
            set { SetValue(ItemHeightProperty, value); }
        }

        public double ItemWidth
        {
            get { return (double) GetValue(ItemWidthProperty); }
            set { SetValue(ItemWidthProperty, value); }
        }
        #endregion

        #region Methods
        protected override FrameworkElement CreateItemRendererControlForStringContent(string content)
        {
            var fe = new HtmlElement("div", "ui card")
            {
                Width  = ItemWidth,
                Height = ItemHeight
            };

            UIBuilder.LoadComponent(fe, "<div class = 'ui fluid image'>" +
                                        "   <img src = '" + content + @"' />" +
                                        "</div>");

            return fe;
        }

        void InitWrapper()
        {
            // ReSharper disable once UnusedVariable
            var root = _root.Get(0);

            Script.Write(@"

setTimeout(function(){

    var options = {};
    new Viewer(root, options);

},0);

");
        }
        #endregion
    }
}