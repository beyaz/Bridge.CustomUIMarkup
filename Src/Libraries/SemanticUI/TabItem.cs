using System;
using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TabItem : ContentControl
    {
#pragma warning disable 649
        internal FrameworkElement _headerElement;

        internal FrameworkElement _bodyElement;
#pragma warning restore 649

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div>" +
                                                       "    <a x:Name = '_headerElement' class = 'item' data-tab='{Id}' >{Header}</a>" +
                                                       "    <div x:Name = '_BodyElement' class = 'ui bottom attached tab segment' data-tab = '{Id}' >" +
                                                       "        <ContentPresenter />" +
                                                       "    </div>" +
                                                       "</div>";
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
                tabItem._headerElement.Class = "item active";
                tabItem._bodyElement.Class = "ui bottom attached tab segment active";
            }
            else
            {
                tabItem._headerElement.Class = "item";
                tabItem._bodyElement.Class = "ui bottom attached tab segment";
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