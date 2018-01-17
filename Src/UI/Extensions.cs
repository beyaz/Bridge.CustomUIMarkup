using System;
using System.Windows;
using System.Windows.Controls;
using Bridge.Html5;

namespace Bridge.CustomUIMarkup.UI
{
    static class Extensions
    {
        #region Public Methods
        public static string GetInnerText(this Element node)
        {
            if (node.NodeType == NodeType.Text)
            {
                return node["textContent"].As<string>();
            }

            return node["innerHTML"].As<string>();
        }

        public static T LoadComponent<T>(this T element, string xml) where T : FrameworkElement
        {
            UIBuilder.LoadComponent(element, xml);

            return element;
        }
        #endregion
    }
}