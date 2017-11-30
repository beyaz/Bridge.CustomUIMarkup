using System.Windows;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class comment : ElementBase
    {
        static comment()
        {
            Template.Register(typeof(comment));
        }

        protected override string HtmlClassName => "comment";

        public comment()
        {
            _root = Builder.Build(Template.Get(typeof(comment)), this, this)._root;
        }


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