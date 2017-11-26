using System;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class InputText : ElementBase
    {
        #region Fields
        protected jQuery _inputElement;
        #endregion

        #region Constructors
        public InputText()
        {
            AfterInitDOM += CreateInputElement;
            AfterInitDOM += AttachEvents;
        }
        #endregion

        #region Public Properties
        public bool AllowOnlyNumericInputs { get; set; }
        #endregion

        #region Properties
        protected override string HtmlClassName => "ui input";
        #endregion

        #region Methods
        protected internal virtual void CreateInputElement()
        {
            _inputElement = DOM.input("text").AppendTo(_root);
        }

        void AttachEvents()
        {
            _inputElement.FocusOut(OnFocusOut);
            _inputElement.KeyPress(OnKeyPress);
        }

        void DisableNonNumericValues(jQueryKeyboardEvent e)
        {
            if (e.Which != 8 && e.Which != 0 && (e.Which < 48 || e.Which >  57))
            {
                e.PreventDefault();
            }
        }

        void OnFocusOut(jQueryFocusEvent e)
        {
            Text = _inputElement.Val();
        }

        void OnKeyPress(jQueryKeyboardEvent e)
        {
            if (AllowOnlyNumericInputs)
            {
                DisableNonNumericValues(e);
                if (e.IsDefaultPrevented())
                {
                }
            }
        }
        #endregion

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register(nameof(Text), typeof(string), typeof(InputText), new PropertyMetadata(OnTextChanged));

        public string Text
        {
            get { return (string) GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        static void OnTextChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (InputText) d;

            me._inputElement.Val((string) e.NewValue);
        }
        #endregion

        #region PlaceHolderProperty
        public static readonly DependencyProperty PlaceHolderProperty = DependencyProperty.Register(nameof(PlaceHolder), typeof(string), typeof(InputText), new PropertyMetadata(OnPlaceHolderChanged));

        public string PlaceHolder
        {
            get { return (string) GetValue(PlaceHolderProperty); }
            set { SetValue(PlaceHolderProperty, value); }
        }

        static void OnPlaceHolderChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (InputText) d;

            me._inputElement.Attr("placeholder", (string) e.NewValue);
        }
        #endregion

        #region _cornerLabelDiv
        jQuery _cornerLabelDiv;

        void InitializeCornerLabelDiv()
        {
            if (_cornerLabelDiv == null)
            {
                _cornerLabelDiv = DOM.div("ui corner label").AppendTo(_root);
                DOM.i("asterisk icon").AppendTo(_cornerLabelDiv);
                _root.AddClass("labeled");
            }
        }

        void RemoveCornerLabelDiv()
        {
            if (_cornerLabelDiv == null)
            {
                return;
            }

            _cornerLabelDiv.RemoveFromParent();
            _cornerLabelDiv = null;

            _root.RemoveClass("labeled");
        }
        #endregion

        #region IsMandatoryProperty
        public static readonly DependencyProperty IsMandatoryProperty = DependencyProperty.Register(nameof(IsMandatory), typeof(bool), typeof(InputText), new PropertyMetadata(OnIsMandatoryChanged));

        public bool IsMandatory
        {
            get { return GetValue(IsMandatoryProperty).ToBoolean(); }
            set { SetValue(IsMandatoryProperty, value); }
        }

        static void OnIsMandatoryChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (InputText) d;

            if ((bool) e.NewValue)
            {
                me.InitializeCornerLabelDiv();
            }
            else
            {
                me.RemoveCornerLabelDiv();
            }
        }
        #endregion
    }
}