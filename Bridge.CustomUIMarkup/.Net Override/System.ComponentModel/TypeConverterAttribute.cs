using System.Globalization;

namespace System.ComponentModel
{
    [AttributeUsage(AttributeTargets.All)]
    public sealed class TypeConverterAttribute : Attribute
    {
        #region Fields
        internal readonly Type _type;
        #endregion

        #region Constructors
        public TypeConverterAttribute()
        {
            ConverterTypeName = string.Empty;
        }

        public TypeConverterAttribute(Type type)
        {
            _type             = type;
            ConverterTypeName = type.AssemblyQualifiedName;
        }

        public TypeConverterAttribute(string typeName)
        {
            typeName.ToUpper(CultureInfo.InvariantCulture);
            ConverterTypeName = typeName;
        }
        #endregion

        #region Public Properties
        public string ConverterTypeName { get; }
        #endregion
    }
}