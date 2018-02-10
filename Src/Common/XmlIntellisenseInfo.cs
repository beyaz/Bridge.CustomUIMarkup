using System;

namespace Bridge.CustomUIMarkup.Common
{
    public class XmlIntellisenseInfo
    {
        #region Constructors
        public XmlIntellisenseInfo(string tagName, Type type)
        {
            if (tagName == null)
            {
                throw new ArgumentNullException(nameof(tagName));
            }

            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            TagName = tagName;
            Type    = type;
        }
        #endregion

        #region Public Properties
        public string[] ChildrenTags { get; set; }

        public string TagName { get; }

        public Type Type { get; }
        #endregion
    }
}