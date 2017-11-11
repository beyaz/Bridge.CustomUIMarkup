using System;
using System.Windows;
using System.Windows.Controls;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class ElementBase : FrameworkElement
    {
        #region SizeProperty
        public static readonly DependencyProperty SizeProperty = DependencyProperty.Register(nameof(Size), typeof(Size), typeof(ElementBase), new PropertyMetadata(OnSizeChanged));

        public Size Size
        {
            get { return (Size)this[nameof(Size)]; }
            set { this[nameof(Size)] = value; }
        }

        static void OnSizeChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (ElementBase)d;

            var newValue = (Size)e.NewValue;

            me._root.AddClass(newValue.ToString().ToLower());
        }
        #endregion

        #region Methods
        protected void AddCssClassOnTrueElseRemove(object value, string cssClass)
        {
            if (value.ToBooleanNullable() == true)
            {
                _root.AddClass(cssClass);
                return;
            }

            _root.RemoveClass(cssClass);
        }
        #endregion

        #region IsCenterAlignedProperty
        public static readonly DependencyProperty IsCenterAlignedProperty = DependencyProperty.Register("IsCenterAligned", typeof(bool), typeof(ElementBase), new PropertyMetadata(IsCenterAlignedChanged));

        static void IsCenterAlignedChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            ((ElementBase) d).AddCssClassOnTrueElseRemove(e.NewValue, "center aligned");
        }
        #endregion

        #region IsRightAlignedProperty
        public static readonly DependencyProperty IsRightAlignedProperty = DependencyProperty.Register("IsRightAligned", typeof(bool), typeof(ElementBase), new PropertyMetadata(IsRightAlignedChanged));

        static void IsRightAlignedChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            ((ElementBase) d).AddCssClassOnTrueElseRemove(e.NewValue, "right aligned");
        }
        #endregion

        #region AlignProperty
        public static readonly DependencyProperty AlignProperty = DependencyProperty.Register(nameof(Align), typeof(Align), typeof(ElementBase), new PropertyMetadata(OnAlignChanged));

        public Align Align
        {
            get { return (Align)this[nameof(Align)]; }
            set { this[nameof(Align)] = value; }
        }

        static void OnAlignChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (ElementBase)d;

            var value = (Align)e.NewValue;
            var className = value.ToString().ToLower() + " aligned";

            me.AddCssClassOnTrueElseRemove(e.NewValue, className);
        }
        #endregion


        protected virtual string HtmlTag => "div";
        protected virtual string HtmlClassName => GetType().Name;

        public override void InitDOM()
        {
            _root =  new jQuery(Document.CreateElement(HtmlTag)).AddClass(HtmlClassName);

            AfterInitDOM();
        }

        protected virtual void AfterInitDOM()
        {
            
        }
    }

    public class card: ElementContainer
    {
        protected override string HtmlClassName => "ui card";

    }
    public class content : ElementContainer
    {

    }
    public class ExtraContent : ElementContainer
    {
        protected override string HtmlClassName => "extra content";
    }
    

    public class description : ElementBase
    {
        
    }



}