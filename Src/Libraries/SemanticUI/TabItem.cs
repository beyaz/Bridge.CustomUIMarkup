using System.Windows;
using System.Windows.Markup;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TabItem : FrameworkElement, IAddChild
    {
        #region Fields
        internal jQuery _headerElement, _contentElement;
        #endregion

        #region Public Methods
        public new void Add(FrameworkElement element)
        {
            element.Root.AppendTo(_contentElement);
        }

        public override void InitDOM()
        {
            _headerElement = DOM.a("item").Attr("data-tab", Id);

            // BindPropertyToInnerHTML(nameof(Header), _headerElement);

            _contentElement = DOM.div("ui bottom attached tab segment").Attr("data-tab", Id);
        }
        #endregion

        #region string Header
        string _header;

        public string Header
        {
            get { return _header; }
            set
            {
                if (_header != value)
                {
                    _header = value;
                    OnPropertyChanged("Header");
                }
            }
        }
        #endregion
    }
}