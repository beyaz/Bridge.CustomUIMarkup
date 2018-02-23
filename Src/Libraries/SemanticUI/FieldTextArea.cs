using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class FieldTextArea : FieldString
    {

        #region Rows
        public static readonly DependencyProperty RowsProperty = DependencyProperty.Register(nameof(Rows), typeof(int?), typeof(FieldTextArea), new PropertyMetadata(default(int?)));

        public int? Rows
        {
            get { return (int?) GetValue(RowsProperty); }
            set { SetValue(RowsProperty, value); }
        }
        #endregion

        public override string DefaultTemplateAsXml
        {
            get
            {
                return
                    "<div class='field' on.click = 'ClearErrorMessage' >" +
                    "   <label Visibility = '{LabelVisibility}'>{Label}</label>" +
                    "   <ContentPresenter>" +
                    "       <ui-input-textarea  Text = '{Value}' IsDisabled='{IsDisabled}' Rows='{Rows}' />" +
                    "   </ContentPresenter>" +
                    "   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div>" +
                    "</div>";
            }
        }
    }
}