using System.Windows;
using System.Windows.Markup;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI.Design;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class GroupBox : FrameworkElement, IAddChild
    {
        #region Fields
        jQuery _h3, _container;
        #endregion

        #region Public Methods
        public void Add(FrameworkElement element)
        {
            element.Root.AppendTo(_container);
        }

        public override void InitDOM()
        {
            _root = DOM.div("ui segment");

            _h3 = DOM.h3("ui header").AppendTo(_root);

            _container = DOM.div("container").AppendTo(_root);

            BindPropertyToInnerHTML(nameof(Header), _h3);
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