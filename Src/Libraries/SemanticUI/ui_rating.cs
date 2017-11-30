using System;
using System.Windows;
using Bridge.CustomUIMarkup.UI;
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

    class comment : ElementBase
    {
        protected override string HtmlClassName => "comment";

        public comment()
        {
            var builder = new Builder
            {
                XmlString = Template,
                DataContext = this,
                Caller = this
            };
            _root = builder.Build()._root;
        }

        static string Template =>
            @"
<div class='comment'>
	<a class='avatar'>
		<img src='{AvatarImageUrl}' />
		</a>
		<div class='content'>
			<a class='author'>{Author}</a>	

            <div class='metadata'>
				<span>{MetadataTimeInfo}</span>
			</div>
			<div class='text' >{Text}</div>
		</div>
	</div>
";


        #region AvatarImageUrlProperty
        public static readonly DependencyProperty AvatarImageUrlProperty = DependencyProperty.Register(nameof(AvatarImageUrl), typeof(string), typeof(comment));

        public string AvatarImageUrl
        {
            get { return (string)GetValue(AvatarImageUrlProperty); }
            set { SetValue(AvatarImageUrlProperty, value); }
        }
        #endregion

        #region AuthorProperty
        public static readonly DependencyProperty AuthorProperty = DependencyProperty.Register(nameof(Author), typeof(string), typeof(comment));

        public string Author
        {
            get { return (string)GetValue(AuthorProperty); }
            set { SetValue(AuthorProperty, value); }
        }
        #endregion

        #region MetadataTimeInfoProperty
        public static readonly DependencyProperty MetadataTimeInfoProperty = DependencyProperty.Register(nameof(MetadataTimeInfo), typeof(string), typeof(comment));

        public string MetadataTimeInfo
        {
            get { return (string)GetValue(MetadataTimeInfoProperty); }
            set { SetValue(MetadataTimeInfoProperty, value); }
        }
        #endregion

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register(nameof(Text), typeof(string), typeof(comment));

        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }
        #endregion
    }
}