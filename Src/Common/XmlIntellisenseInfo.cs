using System;
using System.Diagnostics;

namespace Bridge.CustomUIMarkup.Common
{
    public class XmlIntellisenseInfo
    {
        #region Constructors
        public XmlIntellisenseInfo(string tagName, Type type)
        {
            Debug.Assert(tagName != null);
            Debug.Assert(type != null);
            

            TagName = tagName;
            Type = type;
        }
        #endregion

        #region Public Properties
        public string[] ChildrenTags { get; set; }

        public string TagName { get; }

        public Type Type { get; }
        #endregion
    }
}