using System;
using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Common;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class InputText : Control
    {
        #region IsDisabled
        public static readonly DependencyProperty IsDisabledProperty = DependencyProperty.Register(nameof(IsDisabled), typeof(bool), typeof(InputText),new PropertyMetadata(false, OnIsDisabledChanged));
        
        public bool IsDisabled
        {
            get { return (bool) GetValue(IsDisabledProperty); }
            set { SetValue(IsDisabledProperty, value); }
        }
        static void OnIsDisabledChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (InputText)d;

            if (e.NewValue.ToBoolean())
            {
                me.Class = "ui disabled input";
            }
            else
            {
                me.Class = "ui input";
            }

        }
        #endregion


        #region Fields
        #pragma warning disable 649
        FrameworkElement _inputElement;
        #pragma warning restore 649
        #endregion

        #region Constructors
        public InputText()
        {
            BeforeConnectToLogicalParent += parent => { AttachEvents(); };

            AfterTemplateApplied += () => { Class = "ui input"; };
        }
        #endregion

        #region Public Events
        public event Action<jQueryKeyboardEvent> KeyPress;
        #endregion

        #region Public Properties
        public bool AllowOnlyDecimalInputs { get; set; }
        public bool AllowOnlyNumericInputs { get; set; }

        public override string DefaultTemplateAsXml
        {
            get
            {
                // System.Windows.Data.Converters.BooleanToCssClassConverter
                return
                    "<div>" +
                    "   <input type='text'  x:Name = '_inputElement' />" +
                    "</div>";
            }
        }
        #endregion

        #region Properties
        string _value => _inputElement._root.Val();
        #endregion

        #region Methods
        void AttachEvents()
        {
            _inputElement._root.FocusOut(OnFocusOut);
            _inputElement._root.KeyPress(OnKeyPress);
        }

        void DisableNonDecimalInputs(jQueryKeyboardEvent e)
        {
            var isDot = e.Which == 46;

            if (isDot)
            {
                var alreadyContainsDot = (_value + "").IndexOf('.') >= 0;
                if (alreadyContainsDot)
                {
                    e.PreventDefault();
                }

                return;
            }

            DisableNonNumericValues(e);
        }

        void DisableNonNumericValues(jQueryKeyboardEvent e)
        {
            if (e.Which != 8 && e.Which != 0 && (e.Which < 48 || e.Which > 57))
            {
                e.PreventDefault();
            }
        }

        void OnFocusOut(jQueryFocusEvent e)
        {
            var val = _inputElement.Val();
            if ((AllowOnlyDecimalInputs || AllowOnlyNumericInputs ) && string.IsNullOrEmpty(val))
            {
                return;
            }


            if (AllowOnlyDecimalInputs)
            {
                if (val?.Trim() == ".")
                {
                    _inputElement.Val("");
                    return;
                }
                
            }

            
            Text = val;
        }

        void OnKeyPress(jQueryKeyboardEvent e)
        {
            KeyPress?.Invoke(e);

            if (AllowOnlyDecimalInputs)
            {
                DisableNonDecimalInputs(e);
                return;
            }

            if (AllowOnlyNumericInputs)
            {
                DisableNonNumericValues(e);
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

            me._inputElement._root.Val((string) e.NewValue);
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