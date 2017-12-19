using System.Globalization;
using Bridge;

namespace System
{
    /// <summary>
    ///     Utility methods for casting operations
    /// </summary>
    public static class Cast
    {
        #region Public Methods
        /// <summary>
        ///     To the specified value.
        /// </summary>
        // ReSharper disable once UnusedParameter.Global
        public static object To(object value, Type targetType, IFormatProvider provider)
        {
            if (targetType == null)
            {
                throw new ArgumentNullException(nameof(targetType));
            }

            if (value == null)
            {
                return targetType.GetDefaultValue();
            }

            
            if ( targetType.IsGenericType &&  targetType.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                return To(value,targetType.GetGenericArguments()[0],provider);
            }


            var valueType = value.GetType();

            if (valueType == targetType)
            {
                return value;
            }

            if (targetType == typeof(object))
            {
                return value;
            }


            // ReSharper disable once UnusedVariable
            var targetTypeName = targetType.Name;

            // try to convert from predefined convert functions
            Script.Write(
                @"var fn = System.Convert['to'+targetTypeName]; 
if(fn)
{
    return fn(value,provider);    
}
");

           

            
            if (valueType.IsAssignableFrom(targetType))
            {
                return value;
            }

            throw new InvalidCastException("@value:" + value + "not convertible to " + targetType.FullName);
        }

        /// <summary>
        ///     Casts value to 'TTargetType'
        /// </summary>
        public static TTargetType To<TTargetType>(object value, IFormatProvider provider)
        {
            return (TTargetType) To(value, typeof(TTargetType), provider);
        }

        /// <summary>
        ///     Casts value to 'TTargetType'
        /// </summary>
        public static TTargetType To<TTargetType>(object value)
        {
            return To<TTargetType>(value, CultureInfo.InvariantCulture);
        }
        #endregion
    }
}