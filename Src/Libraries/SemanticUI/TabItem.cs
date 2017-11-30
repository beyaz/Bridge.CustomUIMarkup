using System.Windows;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TabItem : ElementBase
    {
        #region Fields
        internal jQuery _headerElement, _contentElement;
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _headerElement = DOM.a("item").Attr("data-tab", Id);

            _root = _contentElement = DOM.div("ui bottom attached tab segment").Attr("data-tab", Id);
        }
        #endregion

        #region HeaderProperty
        public static readonly DependencyProperty HeaderProperty = DependencyProperty.Register(nameof(Header), typeof(string), typeof(TabItem), new PropertyMetadata(OnHeaderChanged));

        public string Header
        {
            get { return (string) GetValue(HeaderProperty); }
            set { SetValue(HeaderProperty, value); }
        }

        static void OnHeaderChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (TabItem) d;

            me._headerElement.Html((string) e.NewValue);
        }
        #endregion
    }
}