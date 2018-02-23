using System;
using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class FieldDate : Field
    {
        #region Static Fields
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register(nameof(Value), typeof(DateTime?), typeof(FieldDate), new PropertyMetadata(default(DateTime?)));
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get
            {
                return
                    "<div class='field' on.click = 'ClearErrorMessage' >" +
                    "   <label Visibility = '{LabelVisibility}'>{Label}</label>" +
                    "   <ContentPresenter>" +
                    "       <DatePicker Value = '{Value}' IsDisabled='{IsDisabled}' />" +
                    "   </ContentPresenter>" +
                    "   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div>" +
                    "</div>";
            }
        }

        public DateTime? Value
        {
            get { return (DateTime?) GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }
        #endregion
    }
}