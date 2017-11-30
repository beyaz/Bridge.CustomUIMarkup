using System;
using System.Xml;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    static class XmlHelper
    {
        #region Public Methods
        public static XmlNode GetRootNode(string xmlString)
        {
            return Parse(xmlString)?.FirstChild;
        }

         static XmlDocument Parse(string xmlString)
        {
            try
            {
                return jQuery.ParseXML(xmlString).As<XmlDocument>();
            }
            catch (Exception e)
            {
                throw new XmlException("XmlParseErrorOccured.", e);
            }
        }
        #endregion
    }
}