using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class FieldDecimal : Field
    {
        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get
            {
                return
                    "<div class='field' on.click = 'ClearErrorMessage' >" +
                    "   <label Visibility = '{LabelVisibility}'>{Label}</label>" +
                    "   <ContentPresenter>" +
                    "       <textBox Text = '{Value}' AllowOnlyDecimalInputs = 'True' />" +
                    "   </ContentPresenter>" +
                    "   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div>" +
                    "</div>";
            }
        }
        #endregion

        #region decimal? Value
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register(
                                                                                              "Value", typeof(decimal?), typeof(FieldDecimal), new PropertyMetadata(default(decimal?)));

        public decimal? Value
        {
            get { return (decimal?)GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }
        #endregion
    }
}