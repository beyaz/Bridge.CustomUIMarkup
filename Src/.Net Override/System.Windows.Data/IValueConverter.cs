using System;
using System.Globalization;

namespace System.Windows.Data
{
    public interface IValueConverter
    {
        object Convert(object value, Type targetType, object parameter, CultureInfo culture);

      
        object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture);
    }


    namespace Converters
    {
        public sealed class BooleanToVisibilityConverter : IValueConverter
        {
            #region Public Methods
            public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
            {
                if (value is bool)
                {
                    return (bool)value ? Visibility.Visible : Visibility.Collapsed;
                }

                return Visibility.Collapsed;
            }

            public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
            {
                if (!(value is Visibility))
                {
                    return false;
                }
                return (Visibility)value == Visibility.Visible;
            }
            #endregion
        }



        




    }
}