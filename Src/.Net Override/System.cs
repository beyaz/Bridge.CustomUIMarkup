using System.Globalization;

namespace System
{

    public static class Extensions2
    {
        public static string ToUpper(this string value, CultureInfo culture)
        {
               // TODO: eng and turkish
            return value.ToUpper();
        }
    }
    public class MissingMemberException : Exception
    {
        #region Constructors
        public MissingMemberException(string message, Exception innerException = null) : base(message, innerException)
        {
        }
        #endregion
    }

    [Serializable]
    sealed class Empty
    {
        #region Static Fields
        public static readonly Empty Value = new Empty();
        #endregion

        #region Constructors
        Empty()
        {
        }
        #endregion

        #region Public Methods
        public override string ToString()
        {
            return string.Empty;
        }
        #endregion
    }

    [Serializable]
    public sealed class DBNull
    {
        #region Static Fields
        public static readonly DBNull Value = new DBNull();
        #endregion

        #region Constructors
        DBNull()
        {
        }
        #endregion

        #region Public Methods
        public TypeCode GetTypeCode()
        {
            return TypeCode.DBNull;
        }

        public override string ToString()
        {
            return string.Empty;
        }

        public string ToString(IFormatProvider provider)
        {
            return string.Empty;
        }
        #endregion
    }
}

namespace System
{
    public static class Convert2
    {
        #region Static Fields
        static readonly Type[] ConvertTypes = {typeof(Empty), typeof(object), typeof(DBNull), typeof(bool), typeof(char), typeof(sbyte), typeof(byte), typeof(short), typeof(ushort), typeof(int), typeof(uint), typeof(long), typeof(ulong), typeof(float), typeof(double), typeof(decimal), typeof(DateTime), typeof(object), typeof(string)};
        #endregion

        #region Properties
        static CultureInfo Thread_CurrentThread_CurrentCulture => CultureInfo.CurrentCulture;
        #endregion

        #region Public Methods
        public static object ChangeType(object value, TypeCode typeCode)
        {
            return ChangeType(value, typeCode, Thread_CurrentThread_CurrentCulture);
        }

        public static object ChangeType(object value, TypeCode typeCode, IFormatProvider provider)
        {
            if (value == null && (typeCode == TypeCode.Empty || typeCode == TypeCode.String || typeCode == TypeCode.Object))
            {
                return null;
            }

            switch (typeCode)
            {
                case TypeCode.Boolean:
                    return Convert.ToBoolean(value, provider);
                case TypeCode.Char:
                    return Convert.ToChar(value, provider);
                case TypeCode.SByte:
                    return Convert.ToSByte(value, provider);
                case TypeCode.Byte:
                    return Convert.ToByte(value, provider);
                case TypeCode.Int16:
                    return Convert.ToInt16(value, provider);
                case TypeCode.UInt16:
                    return Convert.ToUInt16(value, provider);
                case TypeCode.Int32:
                    return Convert.ToInt32(value, provider);
                case TypeCode.UInt32:
                    return Convert.ToUInt32(value, provider);
                case TypeCode.Int64:
                    return Convert.ToInt64(value, provider);
                case TypeCode.UInt64:
                    return Convert.ToUInt64(value, provider);
                case TypeCode.Single:
                    return Convert.ToSingle(value, provider);
                case TypeCode.Double:
                    return Convert.ToDouble(value, provider);
                case TypeCode.Decimal:
                    return Convert.ToDecimal(value, provider);
                case TypeCode.DateTime:
                    return Convert.ToDateTime(value, provider);
                case TypeCode.String:
                    return Convert.ToString(value, provider);
                case TypeCode.Object:
                    return value;
                case TypeCode.DBNull:
                    throw new InvalidCastException(Environment_GetResourceString("InvalidCast_DBNull"));
                case TypeCode.Empty:
                    throw new InvalidCastException(Environment_GetResourceString("InvalidCast_Empty"));
                default:
                    throw new ArgumentException(Environment_GetResourceString("Arg_UnknownTypeCode"));
            }
        }

        public static object ChangeType(object value, Type conversionType)
        {
            return ChangeType(value, conversionType, Thread_CurrentThread_CurrentCulture);
        }

        public static object ChangeType(object value, Type conversionType, IFormatProvider provider)
        {
            if (conversionType == null)
            {
                throw new ArgumentNullException("conversionType");
            }

            if (value == null)
            {
                //if (conversionType.IsValueType)
                //{
                //    throw new InvalidCastException(Environment_GetResourceString("InvalidCast_CannotCastNullToValueType"));
                //}
                return null;
            }

            if (value.GetType() == conversionType)
            {
                return value;
            }

            var rtConversionType = conversionType;

            if (rtConversionType == typeof(bool))
                return Convert.ToBoolean(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Char])
                return Convert.ToChar(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.SByte])
                return Convert.ToSByte(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Byte])
                return Convert.ToByte(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Int16])
                return Convert.ToInt16(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.UInt16])
                return Convert.ToUInt16(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Int32])
                return Convert.ToInt32(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.UInt32])
                return Convert.ToUInt32(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Int64])
                return Convert.ToInt64(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.UInt64])
                return Convert.ToUInt64(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Single])
                return Convert.ToSingle(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Double])
                return Convert.ToDouble(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Decimal])
                return Convert.ToDecimal(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.DateTime])
                return Convert.ToDateTime(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.String])
                return Convert.ToString(value, provider);
            if (rtConversionType == ConvertTypes[(int) TypeCode.Object])
                return value;

            throw new NotImplementedException();
        }
        #endregion

        #region Methods
        static string Environment_GetResourceString(string key)
        {
            return key;
        }
        #endregion
    }
}