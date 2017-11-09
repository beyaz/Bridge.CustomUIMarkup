using System;
using System.Collections.Generic;
using System.Windows;
using Bridge.CustomUIMarkup.UI.Design;

namespace Bridge.CustomUIMarkup.CodeMirror
{
    class TagInfo
    {
        #region Public Properties
        public ICollection<AttributeInfo> Attributes { get; set; }
        public ICollection<string> ChildrenTags { get; set; }
        public string Name { get; set; }
        #endregion
    }

    class AttributeInfo
    {
        #region Public Properties
        public string Name { get; set; }
        public ICollection<string> Values { get; set; }
        #endregion
    }

    class SchemaInfo
    {
        #region Public Properties
        public ICollection<TagInfo> Tags { get; set; }
        #endregion

        #region Public Methods

        static void ForceToLoadDependencyProperties(Type type)
        {
            Activator.CreateInstance(type);
        }
        public static SchemaInfo CreateFrom(IEnumerable<XmlIntellisenseInfo> intellisenseInfos)
        {
            var schemaInfo = new SchemaInfo
            {
                Tags = new List<TagInfo>()
            };

            foreach (var pair in intellisenseInfos)
            {
                var name = pair.TagName;
                var type = pair.Type;

                ForceToLoadDependencyProperties(type);

                var tag = new TagInfo
                {
                    Name = name,
                    Attributes = new List<AttributeInfo>()
                };
                var dependencyProperties = DependencyProperty.GetAllProperties(type);
                foreach (var dp in dependencyProperties)
                {
                    var attributeInfo = new AttributeInfo {Name = dp.Name};
                    if (dp.PropertyType == typeof(bool))
                    {
                        attributeInfo.Values = new[] {"true", "false"};
                    }

                    if (dp.PropertyType.IsEnum)
                    {
                        attributeInfo.Values = Enum.GetNames(dp.PropertyType);
                    }

                    tag.Attributes.Add(attributeInfo);
                }
                if (pair.ChildrenTags != null)
                {
                    tag.ChildrenTags = pair.ChildrenTags;
                }
                schemaInfo.Tags.Add(tag);
            }

            return schemaInfo;
        }

        public object ToJson()
        {
            var instance = ObjectLiteral.Create<object>();

            foreach (var tag in Tags)
            {
                var attributes = ObjectLiteral.Create<object>();

                foreach (var attributeInfo in tag.Attributes)
                {
                    attributes[attributeInfo.Name] = attributeInfo.Values;
                }

                var tagObj = ObjectLiteral.Create<object>();
                tagObj["attrs"] = attributes;
                tagObj["children"] = tag.ChildrenTags;

                instance[tag.Name] = tagObj;
            }

            return instance;
        }
        #endregion
    }
}