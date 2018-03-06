using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class FieldString : Field
    {
        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get
            {
                return
                    "<div class='field' on.click = 'ClearErrorMessage' data-tooltip = '{ToolTip, Mode = OneWay}' >" +
                    "   <label Visibility = '{LabelVisibility}'>{Label}</label>" +
                    "   <ContentPresenter>" +
                    "       <textBox Text = '{Value}' IsDisabled='{IsDisabled}'  />" +
                    "   </ContentPresenter>" +
                    "   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div>" +
                    "</div>";
            }
        }
        #endregion

        #region string Value
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register(
            "Value", typeof(string), typeof(FieldString), new PropertyMetadata(default(string)));

        public string Value
        {
            get { return (string) GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }
        #endregion



        #region PlaceHolder
        public static readonly DependencyProperty PlaceHolderProperty = DependencyProperty.Register(nameof(PlaceHolder), typeof(string), typeof(FieldString), new PropertyMetadata(null));

        public string PlaceHolder
        {
            get { return (string)GetValue(PlaceHolderProperty); }
            set { SetValue(PlaceHolderProperty, value); }
        }
        #endregion
    }
}