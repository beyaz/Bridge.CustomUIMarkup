using System;
using System.Globalization;

namespace Bridge.CustomUIMarkup.Common
{
    /// <summary>
    ///     Utility methods for casting operations
    /// </summary>
    public static class ConvertHelper
    {
        #region Properties
        static IFormatProvider FormatProvider => CultureInfo.CurrentCulture;
        #endregion 

        #region Public Methods
        public static object ChangeType(this object value, Type targetType)
        {
            return ChangeType(value, targetType, FormatProvider);
        }

        public static object ChangeType(this object value, Type targetType, IFormatProvider provider)
        {
            if (targetType == null)
            {
                throw new ArgumentNullException(nameof(targetType));
            }

            if (value == null)
            {
                if (targetType.IsClass || Nullable.GetUnderlyingType(targetType) != null)
                {
                    return null;
                }

                throw new InvalidOperationException("@value:null can not converted to @targetType:" + targetType);
            }

            if (value.GetType() == targetType || targetType.IsInstanceOfType(value))
            {
                return value;
            }

            var underlyingType = Nullable.GetUnderlyingType(targetType);
            if (underlyingType != null)
            {
                targetType = underlyingType;
            }

            if (targetType == typeof(bool))
                return Convert.ToBoolean(value, provider);
            if (targetType == typeof(char))
                return Convert.ToChar(value, provider);
            if (targetType == typeof(sbyte))
                return Convert.ToSByte(value, provider);
            if (targetType == typeof(byte))
                return Convert.ToByte(value, provider);
            if (targetType == typeof(short))
                return Convert.ToInt16(value, provider);
            if (targetType == typeof(ushort))
                return Convert.ToUInt16(value, provider);
            if (targetType == typeof(int))
                return Convert.ToInt32(value, provider);
            if (targetType == typeof(uint))
                return Convert.ToUInt32(value, provider);
            if (targetType == typeof(long))
                return Convert.ToInt64(value, provider);
            if (targetType == typeof(ulong))
                return Convert.ToUInt64(value, provider);
            if (targetType == typeof(float))
                return Convert.ToSingle(value, provider);
            if (targetType == typeof(double))
                return Convert.ToDouble(value, provider);
            if (targetType == typeof(decimal))
                return Convert.ToDecimal(value, provider);
            if (targetType == typeof(DateTime))
                return Convert.ToDateTime(value, provider);
            if (targetType == typeof(string))
                return Convert.ToString(value, provider);
            if (targetType == typeof(object))
                return value;

            throw new InvalidOperationException("@value:" + value + " can not converted to @targetType:" + targetType);
        }

        public static TTargetType To<TTargetType>(this object value)
        {
            return (TTargetType) value.ChangeType(typeof(TTargetType));
        }
        #endregion
    }
}