using System;
using System.Linq;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Field : ElementBase
    {
        public Field()
        {
            AfterAddChild += (el) => { ReOrderElements(); };
        }
        #region Fields
        jQuery _labelElement, _errorElement;
        #endregion

        #region Public Methods
        

        public override void InitDOM()
        {
            _root = DOM.div("field");
        }
        #endregion

        void ReOrderElements()
        {
            _root.Remove();

            if (_labelElement.IsNotNull())
            {
                _root.SetFirstChild(_labelElement);
            }
            if (Childeren.Count == 1)
            {
                _root.SetLastChild(Childeren.First()._root);
            }

            if (_errorElement.IsNotNull())
            {
                _root.SetLastChild(_errorElement);
            }
        }

        #region ErrorMessageProperty
        public static readonly DependencyProperty ErrorMessageProperty = DependencyProperty.Register(nameof(ErrorMessage), typeof(string), typeof(Field), new PropertyMetadata(OnErrorMessageChanged));

        public string ErrorMessage
        {
            get { return (string) this[nameof(ErrorMessage)]; }
            set { this[nameof(ErrorMessage)] = value; }
        }

        static void OnErrorMessageChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (Field) d;
            var value = (string) e.NewValue;
            if (value.IsNullOrWhiteSpace())
            {
                me.RemoveError();
            }
            else
            {
                me.InitError((string) e.NewValue);
            }
        }

        void InitError(string errorMessage)
        {
            _errorElement = DOM.div("ui red pointing label transition visible").Html(errorMessage);
            _root.AddClass("error");

            ReOrderElements();
        }

        void RemoveError()
        {
            _errorElement.RemoveFromParent();
            _errorElement = null;
            _root.RemoveClass("error");
        }
        #endregion

        #region LabelProperty
        public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(nameof(Label), typeof(string), typeof(Field), new PropertyMetadata(OnLabelChanged));

        public string Label
        {
            get { return (string) this[nameof(Label)]; }
            set { this[nameof(Label)] = value; }
        }

        static void OnLabelChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (Field) d;
            var value = (string) e.NewValue;
            if (value.IsNullOrWhiteSpace())
            {
                me.RemoveLabel();
            }
            else
            {
                me.InitLabel(value);
            }
        }

        void InitLabel(string label)
        {
            if (_labelElement.IsNull())
            {
                _labelElement = DOM.label();
                ReOrderElements();
            }

            _labelElement.Html(label);
        }

        void RemoveLabel()
        {
            _labelElement?.RemoveFromParent();
            _labelElement = null;
        }
        #endregion
    }
}