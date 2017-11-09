using System.Windows;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class TextArea : InputText
    {
        #region Methods
        protected override void AfterInitDOM()
        {
            _inputElement = DOM.textarea().AppendTo(_root);
        }
        #endregion

        #region RowsProperty
        public static readonly DependencyProperty RowsProperty =DependencyProperty.Register(nameof(Rows), typeof(int?),typeof(TextArea), new PropertyMetadata(OnRowsChanged));

        public int? Rows
        {
            get { return (int?)this[nameof(Rows)]; }
            set { this[nameof(Rows)] = value; }
        }

        static void OnRowsChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (TextArea)d;
            var value = e.NewValue as int?;
            if (value.HasValue)
            {
                me._inputElement.Attr("rows", value.Value);
            }
        }
        #endregion
    }
}