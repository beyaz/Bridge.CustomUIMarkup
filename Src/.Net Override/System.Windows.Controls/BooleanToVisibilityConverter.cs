﻿using System.Globalization;
using System.Windows.Data;

namespace System.Windows.Controls
{
    public sealed class BooleanToVisibilityConverter : IValueConverter
    {
        #region Public Methods
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is bool)
            {
                return (bool) value ? Visibility.Visible : Visibility.Collapsed;
            }

            return Visibility.Collapsed;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (!(value is Visibility))
            {
                return false;
            }
            return (Visibility) value == Visibility.Visible;
        }
        #endregion
    }
}