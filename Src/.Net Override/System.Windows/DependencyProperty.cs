using System.Collections.Generic;


namespace System.Windows
{
    public class DependencyProperty
    {

        public static IList<DependencyProperty> GetAllProperties(Type ownerType,bool addBase = true)
        {
            
            if (ownerType == null || ownerType == typeof(object))
            {
                return null;
            }

            var items = new List<DependencyProperty>();

            var key = CreateKey(ownerType, null);
            foreach (var cacheKey in Cache.Keys)
            {
                if (cacheKey.StartsWith(key))
                {
                    items.Add(Cache[cacheKey]);
                }
            }

            if (addBase)
            {
                var baseValues = GetAllProperties(ownerType.BaseType);
                if (baseValues != null)
                {
                    items.AddRange(baseValues);
                }
            }

            return items;
        }


        internal string Key => CreateKey(OwnerType.FullName, Name);

        static string CreateKey(string ownerTypeFullName, string propertyName)
        {
            return ownerTypeFullName + "->" + propertyName;
        }
        static string CreateKey(Type ownerType, string propertyName)
        {
            if (ownerType == null)
            {
                throw new ArgumentNullException(nameof(ownerType));
            }
            

            return CreateKey(ownerType.FullName, propertyName);
        }
        static DependencyProperty TryFind(Type ownerType, string propertyName)
        {

            var key = CreateKey(ownerType, propertyName);
            DependencyProperty property = null;
            Cache.TryGetValue(key, out property);

            return property;
        }

        static DependencyProperty Search(Type ownerType, string propertyName)
        {
            while (true)
            {
                if (ownerType == null || ownerType == typeof(object))
                {
                    return null;
                }

                var dependencyProperty = TryFind(ownerType, propertyName);
                if (dependencyProperty != null)
                {
                    return dependencyProperty;
                }

                ownerType = ownerType.BaseType;
            }
        }

        public string Name { get; set; }

        public Type OwnerType { get; private set; }

        public Type PropertyType { get; private set; }

        public PropertyMetadata PropertyMetadata { get; private set; }

        internal static void TryInvokeOnPropertyChange(DependencyObject instance, string name, object newValue, object oldValue)
        {
            var dependencyProperty = Search(instance.GetType(), name);
            if (dependencyProperty == null)
            {
                return;
            }
            if (dependencyProperty.PropertyMetadata?.PropertyChangedCallback == null)
            {
                return;
            }
            
            dependencyProperty.PropertyMetadata?.PropertyChangedCallback.Invoke(instance, new DependencyPropertyChangedEventArgs(name, newValue, oldValue));
        }


        static readonly Dictionary<string, DependencyProperty> Cache = new Dictionary<string, DependencyProperty>();

        static void Register(DependencyProperty description)
        {
            if (Cache.ContainsKey(description.Key))
            {
                throw new ArgumentException(description.Key);
            }

            Cache[description.Key] = description;

        }

        public static DependencyProperty Register(string name, Type propertyType, Type ownerType)
        {
            var dependencyProperty = new DependencyProperty
            {
                Name = name,
                PropertyType = propertyType,
                OwnerType = ownerType,
            };
            Register(dependencyProperty);

            return dependencyProperty;
        }

        public static DependencyProperty Register(string name, Type propertyType, Type ownerType, PropertyMetadata propertyMetadata)
        {
            var dependencyProperty = new DependencyProperty
            {
                Name = name,
                PropertyType = propertyType,
                OwnerType = ownerType,
                PropertyMetadata = propertyMetadata
            };
            Register(dependencyProperty);

            return dependencyProperty;
        }

    }
}