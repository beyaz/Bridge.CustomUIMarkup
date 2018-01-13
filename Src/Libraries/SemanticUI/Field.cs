using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class Field : ContentControl
    {
        #region Constructors
        public Field()
        {
            this.OnPropertyChanged(nameof(ErrorMessage), () =>
            {
                if (ErrorMessage == null)
                {
                    Class                  = "field";
                    ErrorMessageVisibility = Visibility.Collapsed;
                    return;
                }

                Class                  = "field error";
                ErrorMessageVisibility = Visibility.Visible;
            });

            this.OnPropertyChanged(nameof(Label), () =>
            {
                if (Label == null)
                {
                    LabelVisibility = Visibility.Collapsed;
                    return;
                }

                LabelVisibility = Visibility.Visible;
            });
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get
            {
                return
                    "<div class = 'field' on.click = 'ClearErrorMessage' >" +
                    "   <label Visibility = '{LabelVisibility}'>{Label}</label>" +
                    "   <ContentPresenter />" +
                    "   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div>" +
                    "</div>";
            }
        }
        #endregion

        #region Methods
        protected void ClearErrorMessage()
        {
            if (ErrorMessage != null)
            {
                ErrorMessage = null;
            }
        }
        #endregion

        #region IsDisabled
        public static readonly DependencyProperty IsDisabledProperty = DependencyProperty.Register(nameof(IsDisabled), typeof(bool), typeof(Field), new PropertyMetadata(default(bool)));

        public bool IsDisabled
        {
            get { return (bool) GetValue(IsDisabledProperty); }
            set { SetValue(IsDisabledProperty, value); }
        }
        #endregion

        #region Visibility LabelVisbility
        public static readonly DependencyProperty LabelVisibilityProperty = DependencyProperty.Register(nameof(LabelVisibility), typeof(Visibility), typeof(Field), new PropertyMetadata(Visibility.Collapsed));

        public Visibility LabelVisibility
        {
            get { return (Visibility) GetValue(LabelVisibilityProperty); }
            set { SetValue(LabelVisibilityProperty, value); }
        }
        #endregion

        #region Visibility ErrorMessageVisbility
        public static readonly DependencyProperty ErrorMessageVisibilityProperty = DependencyProperty.Register(nameof(ErrorMessageVisibility), typeof(Visibility), typeof(Field), new PropertyMetadata(Visibility.Collapsed));

        public Visibility ErrorMessageVisibility
        {
            get { return (Visibility) GetValue(ErrorMessageVisibilityProperty); }
            set { SetValue(ErrorMessageVisibilityProperty, value); }
        }
        #endregion

        #region ErrorMessageProperty
        public static readonly DependencyProperty ErrorMessageProperty = DependencyProperty.Register(nameof(ErrorMessage), typeof(string), typeof(Field));

        public string ErrorMessage
        {
            get { return (string) GetValue(ErrorMessageProperty); }
            set { SetValue(ErrorMessageProperty, value); }
        }
        #endregion

        #region LabelProperty
        public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(nameof(Label), typeof(string), typeof(Field));

        public string Label
        {
            get { return (string) GetValue(LabelProperty); }
            set { SetValue(LabelProperty, value); }
        }
        #endregion
    }
}