using System;
using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class column : ElementBase
    {
        #region Properties
        protected override string HtmlClassName => "column";
        #endregion

        #region WideProperty
        public static readonly DependencyProperty WideProperty =
            DependencyProperty.Register(nameof(Wide),
                                        typeof(int),
                                        typeof(column),
                                        new PropertyMetadata(WideChanged));

        public int Wide
        {
            get { return (int) GetValue(WideProperty); }
            set { SetValue(WideProperty, value); }
        }

        static void WideChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var oldValue = e.OldValue;
            var newValue = e.NewValue.ToInt32Nullable();

            var fe = (FrameworkElement) d;

            if (oldValue.IsNotNull())
            {
                fe._root.RemoveClass(oldValue.ToInt32().ToWord() + " wide");
            }

            if (newValue.HasValue)
            {
                if (newValue.Value < 0 || newValue.Value > 16)
                {
                    throw new ArgumentException("Max wide is 16. @value:" + newValue.Value);
                }

                fe._root.AddClass(newValue.Value.ToWord() + " wide");
            }
        }
        #endregion
    }
}