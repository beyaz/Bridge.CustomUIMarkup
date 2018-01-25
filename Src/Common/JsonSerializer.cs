using System;
using System.Collections;
using System.Linq;
using Newtonsoft.Json;

namespace Bridge.CustomUIMarkup.Common
{
    public class JsonIgnoreSerializationOnPostOperationAttribute : Attribute
    {
    }

    public class JsonSerializer
    {
        #region Properties
        static JsonSerializerSettings JsonSerializerSettings => new JsonSerializerSettings
        {
            NullValueHandling    = NullValueHandling.Ignore,
            DefaultValueHandling = DefaultValueHandling.Ignore
        };
        #endregion

        #region Public Methods
        public virtual T Deserialize<T>(string value)
        {
            return (T) JsonConvert.DeserializeObject(value, typeof(T));
        }

        public virtual object Deserialize(string value, Type type)
        {
            return JsonConvert.DeserializeObject(value, type);
        }

        public virtual string Serialize(object instance)
        {
            if (instance == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(instance, JsonSerializerSettings);
        }

        public virtual string SerializeForPostOperation(object instance)
        {
            if (instance == null)
            {
                return null;
            }

            instance = Clone(instance);

            VisitProperties(instance);

            return JsonConvert.SerializeObject(instance, JsonSerializerSettings);
        }
        #endregion

        #region Methods
        static void VisitProperties(object instance)
        {
            if (instance == null)
            {
                return;
            }

            var enumerable = instance as IEnumerable;
            if (enumerable != null)
            {
                foreach (var item in enumerable)
                {
                    VisitProperties(item);
                }

                return;
            }

            var type = instance.GetType();
            if (!type.IsClass)
            {
                return;
            }

            foreach (var propertyInfo in type.GetProperties().Where(p => p.CanWrite && p.CanRead))
            {
                var customAttributes = propertyInfo.GetCustomAttributes(typeof(JsonIgnoreSerializationOnPostOperationAttribute), false);

                if (customAttributes.Any())
                {
                    propertyInfo.SetValue(instance, propertyInfo.PropertyType.GetDefaultValue());
                }

                VisitProperties(propertyInfo.GetValue(instance));
            }
        }

        object Clone(object instance)
        {
            return Deserialize(Serialize(instance), instance.GetType());
        }
        #endregion
    }
}