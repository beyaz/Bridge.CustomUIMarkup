using System.Xml;
using Bridge.Html5;

namespace System.Windows
{
    public class Template
    {
        #region Fields
        Element _rootNode;
        #endregion

        #region Constructors
        Template()
        {
        }
        #endregion

        #region Public Properties
        public Element Root => _rootNode;
        #endregion

        #region Public Methods
        public static Template CreateFrom(Element xmlNode)
        {
            return new Template
            {
                _rootNode = xmlNode
            };
        }

        public static Template CreateFromXml(string xmlTemplate)
        {
            var rootNode = XmlHelper.GetRootNode(xmlTemplate);

            var template = new Template
            {
                _rootNode = rootNode
            };

            return template;
        }
        #endregion
    }
}