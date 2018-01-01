using System;
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
                    "<div class='field' on.click = 'ClearErrorMessage' >" +
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
    }

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


    public class FieldInt32 : Field
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
                    "       <textBox Text = '{Value}' AllowOnlyNumericInputs = 'True' />" +
                    "   </ContentPresenter>" +
                    "   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div>" +
                    "</div>";
            }
        }
        #endregion

        #region string Value
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register(
            "Value", typeof(int?), typeof(FieldInt32), new PropertyMetadata(default(int?)));

        public int? Value
        {
            get { return (int?)GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }
        #endregion
    }


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





    public class FieldDate : Field
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
                    "       <DatePicker Value = '{Value}' />" +
                    "   </ContentPresenter>" +
                    "   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div>" +
                    "</div>";
            }
        }
        #endregion


        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register(
                                                        "Value", typeof(DateTime?), typeof(FieldDate), new PropertyMetadata(default(DateTime?)));

        public DateTime? Value
        {
            get { return (DateTime?) GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }
    }


}