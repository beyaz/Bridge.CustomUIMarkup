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
                    "<div>" +
                    "   <textarea rows='{Rows}' x:Name = '_inputElement' />" +
                    "</div>";
            }
        }
        #endregion

        #region RowsProperty
        public static readonly DependencyProperty RowsProperty = DependencyProperty.Register(nameof(Rows), typeof(int), typeof(TextArea), new PropertyMetadata(2));

        public int Rows
        {
            get { return (int) GetValue(RowsProperty); }
            set { SetValue(RowsProperty, value); }
        }
        #endregion
    }
}