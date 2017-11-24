using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TextArea : InputText
    {
        #region Methods
        protected internal override void CreateInputElement()
        {
            _inputElement = DOM.textarea().AppendTo(_root);
        }
        #endregion

        #region RowsProperty
        public static readonly DependencyProperty RowsProperty =DependencyProperty.Register(nameof(Rows), typeof(int?),typeof(TextArea), new PropertyMetadata(OnRowsChanged));

        public int? Rows
        {
            get { return (int?)GetValue(RowsProperty); }
            set { SetValue(RowsProperty,value); }
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