using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Image : ElementBase
    {
        #region Fields
        jQuery _elementImage;
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = DOM.button("ui image");
            _elementImage = DOM.img().AppendTo(_root);
        }
        #endregion

        #region SrcProperty
        public static readonly DependencyProperty SrcProperty = DependencyProperty.Register(nameof(Src), typeof(string), typeof(Image), new PropertyMetadata(OnSrcChanged));

        public string Src
        {
            get { return (string) GetValue(SrcProperty); }
            set { SetValue(SrcProperty,value); }
        }

        static void OnSrcChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (Image) d;

            var newValue = (string) e.NewValue;

            me._elementImage.Attr("Src", newValue);
        }
        #endregion

        
    }
}