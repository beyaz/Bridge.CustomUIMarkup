using System.Globalization;

namespace System.ComponentModel
{
    [AttributeUsage(AttributeTargets.All)]
    public sealed class TypeConverterAttribute : Attribute
    {
        internal Type _type;
        #region Static Fields
        public static readonly TypeConverterAttribute Default;
        #endregion

        #region Fields
        readonly string typeName;
        #endregion

        #region Constructors
        static TypeConverterAttribute()
        {
            Default = new TypeConverterAttribute();
        }

        public TypeConverterAttribute()
        {
            typeName = string.Empty;
        }

        public TypeConverterAttribute(Type type)
        {
            _type = type;
            typeName = type.AssemblyQualifiedName;
        }

        public TypeConverterAttribute(string typeName)
        {
            typeName.ToUpper(CultureInfo.InvariantCulture);
            this.typeName = typeName;
        }
        #endregion

        #region Public Properties
        public string ConverterTypeName => typeName;
        #endregion

        #region Public Methods
        public override bool Equals(object obj)
        {
            var typeConverterAttribute = obj as TypeConverterAttribute;
            if (typeConverterAttribute == null)
            {
                return false;
            }
            return typeConverterAttribute.ConverterTypeName == typeName;
        }

        public override int GetHashCode()
        {
            return typeName.GetHashCode();
        }
        #endregion
    }
}