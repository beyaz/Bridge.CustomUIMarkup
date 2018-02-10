using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using Bridge;
using Bridge.Html5;

namespace System
{
    [External]
    [Namespace(false)]
    class isMobile
    {
    }

    /// <summary>
    ///     The extensions
    /// </summary>
    public static class Extensions
    {
        #region Static Fields
        static object _isMobile;
        #endregion

        #region Properties
        /// <summary>
        ///     Gets the default format provider.
        /// </summary>
        static IFormatProvider DefaultFormatProvider => CultureInfo.CurrentCulture;
        #endregion

        #region Public Methods
        /// <summary>
        ///     Gets default value of <paramref name="type" />
        /// </summary>
        public static object GetDefaultValue(this Type type)
        {
            if (type.IsClass)
            {
                return null;
            }

            if (type.IsNumeric())
            {
                return Script.Write<object>("Bridge.box(0,type)");
            }

            return Activator.CreateInstance(type);
        }

        [SuppressMessage("ReSharper", "UnusedParameter.Global")]
        public static bool IsMobile(this Navigator navigator)
        {
            if (_isMobile == null)
            {
                _isMobile = Script.Write<object>(@"
{
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


");
            }

            dynamic isMobile = _isMobile;
            if (isMobile.any())
            {
                return true;
            }

            if (Window.InnerWidth <= 800 && Window.InnerHeight <= 600)
            {
                return true;
            }

            return false;
        }

        /// <summary>
        ///     Determines whether [is not null].
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>
        ///     <c>true</c> if [is not null] [the specified value]; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsNotNull(this object value)
        {
            return !ReferenceEquals(value, null);
        }

        /// <summary>
        ///     Determines whether this instance is null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>
        ///     <c>true</c> if the specified value is null; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsNull(this object value)
        {
            return ReferenceEquals(value, null);
        }

        /// <summary>
        ///     Determines whether this instance is numeric.
        /// </summary>
        public static bool IsNumeric(this object value)
        {
            if (ReferenceEquals(value, null))
            {
                return false;
            }

            if (value is byte ||
                value is sbyte ||
                value is ushort ||
                value is uint ||
                value is ulong ||
                value is short ||
                value is int ||
                value is long ||
                value is decimal ||
                value is double ||
                value is float)
            {
                return true;
            }

            return false;
        }

        /// <summary>
        ///     Determines whether this instance is numeric.
        /// </summary>
        public static bool IsNumeric(this Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            if (type == typeof(byte) ||
                type == typeof(sbyte) ||
                type == typeof(ushort) ||
                type == typeof(uint) ||
                type == typeof(ulong) ||
                type == typeof(short) ||
                type == typeof(int) ||
                type == typeof(long) ||
                type == typeof(decimal) ||
                type == typeof(double) ||
                type == typeof(float))
            {
                return true;
            }

            return false;
        }

        /// <summary>
        ///     Determines whether this instance is string.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static bool? IsString(this object value)
        {
            return value is string;
        }

        /// <summary>
        ///     Removes value from end of str
        /// </summary>
        public static string RemoveFromEnd(this string data, string value)
        {
            if (data.EndsWith(value))
            {
                return data.Substring(0, data.Length - value.Length);
            }

            return data;
        }

        /// <summary>
        ///     Removes value from start of str
        /// </summary>
        public static string RemoveFromStart(this string data, string value)
        {
            if (data == null)
            {
                return null;
            }

            if (data.StartsWith(value))
            {
                return data.Substring(value.Length, data.Length - value.Length);
            }

            return data;
        }

        /// <summary>
        ///     To the boolean.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static bool ToBoolean(this object value)
        {
            return ToBoolean(value, DefaultFormatProvider);
        }

        /// <summary>
        ///     To the boolean.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="formatProvider">The format provider.</param>
        /// <returns></returns>
        /// <exception cref="System.ArgumentNullException">value</exception>
        public static bool ToBoolean(this object value, IFormatProvider formatProvider)
        {
            if (value.IsNull())
            {
                throw new ArgumentNullException(nameof(value));
            }

            return Convert.ToBoolean(value, formatProvider);
        }

        /// <summary>
        ///     To the boolean nullable.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static bool? ToBooleanNullable(this object value)
        {
            return ToBooleanNullable(value, DefaultFormatProvider);
        }

        /// <summary>
        ///     To the boolean nullable.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="formatProvider">The format provider.</param>
        /// <returns></returns>
        public static bool? ToBooleanNullable(this object value, IFormatProvider formatProvider)
        {
            if (value.IsNull())
            {
                return null;
            }

            return Convert.ToBoolean(value, formatProvider);
        }

        /// <summary>
        ///     To the decimal.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="formatProvider">The format provider.</param>
        /// <returns></returns>
        /// <exception cref="System.ArgumentNullException">value</exception>
        public static decimal ToDecimal(this object value, IFormatProvider formatProvider)
        {
            if (value.IsNull())
            {
                throw new ArgumentNullException(nameof(value));
            }

            return Convert.ToDecimal(value, formatProvider);
        }

        /// <summary>
        ///     To the decimal.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        /// <exception cref="System.ArgumentNullException">value</exception>
        public static decimal ToDecimal(this object value)
        {
            if (value.IsNull())
            {
                throw new ArgumentNullException(nameof(value));
            }

            return ToDecimal(value, DefaultFormatProvider);
        }

        /// <summary>
        ///     To the decimal nullable.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="formatProvider">The format provider.</param>
        /// <returns></returns>
        public static decimal? ToDecimalNullable(this object value, IFormatProvider formatProvider)
        {
            if (value.IsNull())
            {
                return null;
            }

            return Convert.ToDecimal(value, formatProvider);
        }

        /// <summary>
        ///     To the decimal nullable.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static decimal? ToDecimalNullable(this object value)
        {
            return ToDecimalNullable(value, DefaultFormatProvider);
        }

        /// <summary>
        ///     To the int32.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        /// <exception cref="System.ArgumentNullException">value</exception>
        public static int ToInt32(this object value)
        {
            if (value.IsNull())
            {
                throw new ArgumentNullException(nameof(value));
            }

            return Convert.ToInt32(value, DefaultFormatProvider);
        }

        /// <summary>
        ///     To the int32 nullable.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="formatProvider">The format provider.</param>
        /// <returns></returns>
        public static int? ToInt32Nullable(this object value, IFormatProvider formatProvider)
        {
            if (value.IsNull())
            {
                return null;
            }

            return Convert.ToInt32(value, formatProvider);
        }

        /// <summary>
        ///     To the int32 nullable.
        /// </summary>
        public static int? ToInt32Nullable(this object value)
        {
            return ToInt32Nullable(value, CultureInfo.CurrentCulture);
        }
        #endregion

        #region Methods
        /// <summary>
        ///     Values the mustbe numeric.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        static ArgumentException ValueMustbeNumeric(object value)
        {
            return new ArgumentException(value.ToString());
        }
        #endregion
    }
}