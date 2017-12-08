using System.Collections.Generic;
using System.Xml;
using Bridge.CustomUIMarkup;

namespace System.Windows
{
    public class Template
    {
        string _key;
        string _xmlTemplate;
        XmlNode _rootNode;

        public XmlNode Root => _rootNode;

        private Template()
        {
            
        }

        internal static readonly Dictionary<string, Template> Cache = new Dictionary<string, Template>();


        public static Template CreateFromXml(string xmlTemplate)
        {
            var rootNode = XmlHelper.GetRootNode(xmlTemplate);

            var template = new Template
            {
                _xmlTemplate = xmlTemplate,
                _rootNode = rootNode
            };

            return template;
        }

        public static Template CreateFrom(XmlNode  xmlNode)
        {
            
            return new Template
            {
                _rootNode = xmlNode
            };
        }

        public static void RegisterAsXml(string key, string xmlTemplate)
        {
            var rootNode = XmlHelper.GetRootNode(xmlTemplate);

            var template = new Template
            {
                _key = key,
                _xmlTemplate = xmlTemplate,
                _rootNode = rootNode
            };

            Cache[key] = template;
        }

        internal static Template GetDefaultTemplate(Type type )
        {
            var cacheKey = type.FullName;

            Template template = null;

            if (Cache.TryGetValue(cacheKey, out template))
            {
                return template;
            }
            
            var templateAsXmlString = Resources.GetXmlFileContent(GetResourceKey(type));

            if (templateAsXmlString == null)
            {
                Cache[cacheKey] = null;
                return null;
            }

            template = CreateFromXml(templateAsXmlString);


            Cache[cacheKey] = template;

            return template;
        }

        static string GetResourceKey(Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            return type.FullName.RemoveFromStart("Bridge.CustomUIMarkup.").Replace(".", "/") + ".Template.xml";
        }
        public static void Register(Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            var resourceKey = GetResourceKey(type);

            var templateXml =  Resources.GetXmlFileContent(resourceKey);

            RegisterAsXml(type.FullName, templateXml);
        }

        public static void RegisterAsXml(Type key, string xmlTemplate)
        {
            RegisterAsXml(key.FullName,xmlTemplate);
        }
        public static Template Get(Type key)
        {
            return Get(key.FullName);
        }

        public static Template Find(Type key)
        {
            return Find(key.FullName);
        }

        public static Template Find(string key)
        {
            Template template = null;
            Cache.TryGetValue(key, out template);
            return template;
        }

        public static Template Get(string key)
        {

            Template template = Find(key);
            if (template == null)
            {
                throw new InvalidOperationException("TemplateNotFound. Key: "+key);
            }
            return template;
        }
    }
}