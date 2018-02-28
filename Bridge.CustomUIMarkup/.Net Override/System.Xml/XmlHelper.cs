using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Xml
{
    static class XmlHelper
    {
        #region Public Methods
        public static Element GetRootNode(string xmlString)
        {
            if (xmlString == null)
            {
                throw new ArgumentNullException(nameof(xmlString));
            }

            try
            {
                return jQuery.ParseHTML(xmlString.Trim())[0].As<Element>();
            }
            catch (Exception e)
            {
                throw new SystemException("XmlParseErrorOccured.", e);
            }
        }
        #endregion
    }
}