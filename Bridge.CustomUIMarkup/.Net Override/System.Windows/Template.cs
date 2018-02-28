using System.Xml;
using Bridge.Html5;

namespace System.Windows
{
    public class Template
    {
        #region Constructors
        Template()
        {
        }
        #endregion

        #region Public Properties
        public Element Root { get; private set; }
        #endregion

        #region Public Methods
        public static Template CreateFrom(Element xmlNode)
        {
            return new Template
            {
                Root = xmlNode
            };
        }

        public static Template CreateFromXml(string xmlTemplate)
        {
            var rootNode = XmlHelper.GetRootNode(xmlTemplate);

            var template = new Template
            {
                Root = rootNode
            };

            return template;
        }
        #endregion
    }
}