using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using Bridge.Html5;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class ui_rating : Control
    {
        #region Constructors
        public ui_rating()
        {
            BeforeConnectToLogicalParent += parent => { UpdateUIValue(); };

            this.OnPropertyChanged(nameof(Rate), UpdateUIValue);

            this.OnPropertyChanged(nameof(MaxRate), UpdateUIValue);
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class='ui star rating' />";
        #endregion

        #region Methods
        void UpdateUIValue()
        {
            if (_root == null)
            {
                return;
            }

            dynamic root = _root;

            dynamic options       = ObjectLiteral.Create<object>();
            options.maxRating     = MaxRate;
            options.initialRating = Rate;

            Window.SetTimeout(() => { root.rating(options); }, 5);
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
}