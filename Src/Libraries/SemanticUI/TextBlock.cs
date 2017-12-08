using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class TextBlock : Control
    {
        

        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get { return "<div InnerHTML = '{" + nameof(Text) + "}' css.display = 'inline-block' />"; }
        }
        #endregion

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register("Text", typeof(string), typeof(TextBlock), new PropertyMetadata(default(string)));

        public string Text
        {
            get { return (string) GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }
        #endregion
    }
}