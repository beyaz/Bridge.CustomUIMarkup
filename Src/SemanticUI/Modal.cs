using System;
using System.Windows;
using System.Windows.Markup;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI.Design;
using Bridge.jQuery2;
using Retyped;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Modal : FrameworkElement, IAddChild
    {
        #region Fields
        jQuery content;

        jQuery header;
        #endregion

        #region Public Methods
        public void Add(FrameworkElement element)
        {
            content.Append(element.Root);
        }

        public override void InitDOM()
        {
            _root = DOM.div("ui modal");

            header = DOM.div("header").AppendTo(_root);

            content = DOM.div("content").AppendTo(_root);

            _root.As<semantic_ui.JQuery>().modal(semantic_ui.Literals.show);

            BindPropertyToInnerHTML(nameof(Title), header);
        }
        #endregion

        #region string Title
        string _title;

        public string Title
        {
            get { return _title; }
            set
            {
                if (_title != value)
                {
                    _title = value;
                    OnPropertyChanged(nameof(Title));
                }
            }
        }
        #endregion
    }
}