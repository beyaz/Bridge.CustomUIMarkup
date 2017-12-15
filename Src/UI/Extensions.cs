using System;
using System.Windows;
using System.Xml;
using Bridge.Html5;

namespace Bridge.CustomUIMarkup.UI
{
    static class Extensions
    {
        #region Public Methods
        public static string GetInnerText(this XmlNode xmlNode)
        {
            if (xmlNode.NodeType == NodeType.Text)
            {
                return xmlNode["textContent"].As<string>();
            }

            return xmlNode["innerHTML"].As<string>();
        }

        public static T LoadComponent<T>(this T element, string xml) where T : FrameworkElement
        {
            Builder.LoadComponent(element, xml);

            return element;
        }
        #endregion
    }
}