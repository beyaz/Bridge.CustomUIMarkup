using System;
using Newtonsoft.Json;

namespace Bridge.CustomUIMarkup.Common
{
    public class JsonIgnoreSerializationOnPostAttribute : Attribute { }
    public  class JsonSerializer
    {
        #region Public Methods
        public  T Deserialize<T>(string value)
        {
            return (T)JsonConvert.DeserializeObject(value, typeof(T));
        }

        public  object Deserialize(string value, Type type)
        {
            return JsonConvert.DeserializeObject(value, type);
        }


        void VisitProperties(object instance)
        {

        }
        public  string Serialize(object instance)
        {


            

            var settings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            };

            return JsonConvert.SerializeObject(instance, settings);
        }
        #endregion
    }
}