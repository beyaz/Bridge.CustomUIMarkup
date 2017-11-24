using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class Icon : ElementBase
    {
        #region Properties
        protected override string HtmlTag => "i";
        #endregion

        #region TypeProperty
        public static readonly DependencyProperty TypeProperty = DependencyProperty.Register(nameof(Type), typeof(IconType), typeof(Icon), new PropertyMetadata(OnTypeChanged));

        public IconType Type
        {
            get { return (IconType) GetValue(TypeProperty); }
            set { SetValue(TypeProperty, value); }
        }

        static void OnTypeChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (Icon) d;
            var iconType = (IconType) e.NewValue;

            var className = iconType.ToString().Replace("_", " ").ToLower() + " icon";

            me._root.AddClass(className);
        }
        #endregion
    }

    class ui_divider : ElementBase
    {
        protected override string HtmlClassName => "ui divider";
    }
    class item : ElementBase
    {
        protected override string HtmlClassName => "item";
    }
    class ui_menu : ElementBase
    {
        protected override string HtmlClassName => "ui menu";
    }

    class ui_vertical_menu : ElementBase
    {
        protected override string HtmlClassName => "ui vertical menu";
    }
}