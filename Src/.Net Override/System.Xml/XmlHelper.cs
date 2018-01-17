using Bridge.jQuery2;

namespace System.Xml
{
    static class XmlHelper
    {
        #region Public Methods
        public static XmlNode GetRootNode(string xmlString)
        {
            if (xmlString == null)
            {
                throw new ArgumentNullException(nameof(xmlString));
            }

            try
            {
                xmlString = xmlString.Replace("x:Name=", "x.Name = ").Replace("x:Name =", "x.Name = ");


                // return jQuery.ParseHTML(xmlString.Trim())[0].As<XmlNode>();

                var document = jQuery.ParseXML(xmlString).As<XmlDocument>();

                return document.FirstChild;
            }
            catch (Exception e)
            {
                throw new XmlException("XmlParseErrorOccured.", e);
            }
        }
        #endregion
    }
}