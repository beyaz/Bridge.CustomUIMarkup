using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TextArea : InputText
    {
        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get
            {
                return
                    "<div class='ui input'>" +
                    "   <textarea />" +
                    "</div>";
            }
        }
        #endregion

        #region RowsProperty
        public static readonly DependencyProperty RowsProperty = DependencyProperty.Register(nameof(Rows), typeof(int?), typeof(TextArea), new PropertyMetadata(OnRowsChanged));

        public int? Rows
        {
            get { return (int?) GetValue(RowsProperty); }
            set { SetValue(RowsProperty, value); }
        }

        static void OnRowsChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (TextArea) d;
            var value = e.NewValue as int?;
            if (value.HasValue)
            {
                me._inputElement._root.Attr("rows", value.Value);
            }
        }
        #endregion
    }
}