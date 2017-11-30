using System;
using System.Text;
using System.Windows;
using Bridge.Html5;
using Bridge.jQuery2;
using Retyped;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class ui_rating : ElementBase
    {
        protected override string HtmlClassName => "ui rating";


        public ui_rating()
        {
            BeforeConnectToParent += OnBeforeConnectToParent;
        }

        void OnBeforeConnectToParent()
        {
            _root.As<semantic_ui.JQuery>().rating();
        }


        #region Public Properties
        public static readonly DependencyProperty IconIsStarProperty = DependencyProperty.Register(nameof(IconIsStar), typeof(bool), typeof(ui_rating), AddCssClassOnTrueElseRemove("star"));

        public bool? IconIsStar
        {
            get { return (bool?) GetValue(IconIsStarProperty); }
            set { SetValue(IconIsStarProperty, value); }
        }
        #endregion

        #region MaxRate
        public static readonly DependencyProperty MaxRateProperty = DependencyProperty.Register(nameof(MaxRate), typeof(int?), typeof(ui_rating), CreateHtmlAttributeUpdater("data-max-rating"));

        public int? MaxRate
        {
            get { return (int?) GetValue(MaxRateProperty); }
            set { SetValue(MaxRateProperty, value); }
        }
        #endregion

        #region Rate
        public static readonly DependencyProperty RateProperty = DependencyProperty.Register(nameof(Rate), typeof(int?), typeof(ui_rating), CreateHtmlAttributeUpdater("data-rating"));

        public int? Rate
        {
            get { return (int?) GetValue(RateProperty); }
            set { SetValue(RateProperty, value); }
        }
        #endregion
    }



    class ui_comments : ElementBase
    {
        protected override string HtmlClassName => "ui comments";
    }
}