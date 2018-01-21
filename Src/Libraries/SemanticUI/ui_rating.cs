using System;
using System.Windows;
using System.Windows.Controls;
using Retyped;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class ui_rating : Control
    {
        #region Static Fields
        public static readonly DependencyProperty IconIsStarProperty =
            DependencyProperty.Register(nameof(IconIsStar), typeof(bool), typeof(ui_rating), new PropertyMetadata(true));
        #endregion

        #region Constructors
        public ui_rating()
        {
            BeforeConnectToLogicalParent += parent => { _root.rating(); };
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class='ui star rating'  data-max-rating = '{MaxRate}' data-rating ='{Rate}'  />";

        public bool? IconIsStar
        {
            get { return (bool?) GetValue(IconIsStarProperty); }
            set { SetValue(IconIsStarProperty, value); }
        }
        #endregion

        #region MaxRate
        public static readonly DependencyProperty MaxRateProperty =
            DependencyProperty.Register(nameof(MaxRate), typeof(int?), typeof(ui_rating), CreateHtmlAttributeUpdater("data-max-rating"));

        public int? MaxRate
        {
            get { return (int?) GetValue(MaxRateProperty); }
            set { SetValue(MaxRateProperty, value); }
        }
        #endregion

        #region Rate
        public static readonly DependencyProperty RateProperty =
            DependencyProperty.Register(nameof(Rate), typeof(int?), typeof(ui_rating), CreateHtmlAttributeUpdater("data-rating"));

        public int? Rate
        {
            get { return (int?) GetValue(RateProperty); }
            set { SetValue(RateProperty, value); }
        }
        #endregion
    }
}