using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace System.Windows.Data
{
    public interface IValueConverter
    {
        #region Public Methods
        object Convert(object     value, Type targetType, object parameter, CultureInfo culture);
        object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture);
        #endregion
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

        public sealed class BooleanToCssClassConverter : IValueConverter
        {
            #region Public Methods
            public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
            {
                var valueAsBoolean = Cast.To<bool>(value);
                var strings        = ParseParameter(parameter);

                if (valueAsBoolean)
                {
                    return strings[0];
                }

                return strings[1];
            }

            public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
            {
                var strings = ParseParameter(parameter);

                if (value + "" == strings[0])
                {
                    return true;
                }

                return false;
            }
            #endregion

            #region Methods
            static List<string> ParseParameter(object parameter)
            {
                var parameterAsString = parameter as string;

                if (parameterAsString == null)
                {
                    throw new ArgumentNullException("@InvalidConverterParameter:" + parameter);
                }

                var strings = parameterAsString.Split(':').Where(p => string.IsNullOrWhiteSpace(p) == false).Select(p => p.Trim()).ToList();

                if (strings.Count != 2)
                {
                    throw new ArgumentNullException("@InvalidConverterParameter:" + parameter + " (must be seperate bey css)");
                }

                return strings;
            }
            #endregion
        }
    }
}