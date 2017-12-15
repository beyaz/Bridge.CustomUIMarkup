using Bridge.jQuery2;

namespace System.Xml
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
                xmlString = xmlString.Replace("x:Name=", "x.Name = ").Replace("x:Name =", "x.Name = ");
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