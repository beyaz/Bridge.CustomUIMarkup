using System;
using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TabItem : ContentControl
    {
        #region Constructors
        public TabItem()
        {
            AfterTemplateApplied += OnAfterTemplateApplied;
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div>" +
                                                       "    <a class = 'item' data-tab='{Id}' >{Header}</a>" +
                                                       "    <div class = 'ui bottom attached tab segment' data-tab = '{Id}' >" +
                                                       "        <ContentPresenter />" +
                                                       "    </div>" +
                                                       "</div>";
        #endregion

        #region Methods
        void OnAfterTemplateApplied()
        {
            _contentPresenter = (ContentPresenter) GetVisualChildAt(1).GetVisualChildAt(0);
        }
        #endregion

        #region HeaderProperty
        public static readonly DependencyProperty HeaderProperty = DependencyProperty.Register(nameof(Header), typeof(string), typeof(TabItem));

        public string Header
        {
            get { return (string) GetValue(HeaderProperty); }
            set { SetValue(HeaderProperty, value); }
        }
        #endregion

        #region bool IsActive
        public static readonly DependencyProperty IsActiveProperty = DependencyProperty.Register(
            "IsActive", typeof(bool), typeof(TabItem), new PropertyMetadata(default(bool), OnIsActiveChanged));

        static void OnIsActiveChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var tabItem = (TabItem) d;

            if (e.NewValue.ToBoolean())
            {
                tabItem.GetVisualChildAt(0).Class = "item active";
                tabItem.GetVisualChildAt(1).Class = "ui bottom attached tab segment active";
            }
            else
            {
                tabItem.GetVisualChildAt(0).Class = "item";
                tabItem.GetVisualChildAt(1).Class = "ui bottom attached tab segment";
            }
        }

        public bool IsActive
        {
            get { return (bool) GetValue(IsActiveProperty); }
            set { SetValue(IsActiveProperty, value); }
        }
        #endregion
    }
}