﻿using System;
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
        #region Enums
        enum VisitMode
        {
            Clean,
            Restore
        }
        #endregion

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

        public void RestoreAfterPostOperation(object newObject, object firstVersion)
        {
            VisitProperties(newObject, VisitMode.Restore, firstVersion);
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

            VisitProperties(instance, VisitMode.Clean, null);

            return JsonConvert.SerializeObject(instance, JsonSerializerSettings);
        }
        #endregion

        #region Methods
        static void VisitProperties(object instance, VisitMode mode, object firstVersion)
        {
            if (instance == null)
            {
                return;
            }

            var enumerable = instance as IEnumerable;
            if (enumerable != null)
            {
                return;
            }

            var type = instance.GetType();
            if (!type.IsClass)
            {
                return;
            }

            foreach (var propertyInfo in type.GetProperties())
            {
                if (!(propertyInfo.CanWrite && propertyInfo.CanRead))
                {
                    continue;
                }

                var customAttributes = propertyInfo.GetCustomAttributes(typeof(JsonIgnoreSerializationOnPostOperationAttribute), false);

                if (customAttributes.Any())
                {
                    propertyInfo.SetValue(instance, propertyInfo.PropertyType.GetDefaultValue());
                    continue;
                }

                var propertyType = propertyInfo.PropertyType;
                if (propertyType.IsNumeric() || propertyType == typeof(string))
                {
                    continue;
                }

                var propertyValueOfInstance = propertyInfo.GetValue(instance);

                VisitProperties(propertyValueOfInstance, mode, null);
            }
        }

        object Clone(object instance)
        {
            return Deserialize(Serialize(instance), instance.GetType());
        }
        #endregion
    }
}