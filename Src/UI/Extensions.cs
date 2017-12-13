using System.Windows;

namespace Bridge.CustomUIMarkup.UI
{
    static class Extensions
    {
        public static T LoadComponent<T>(this T element, string xml) where T : FrameworkElement
        {
            Builder.LoadComponent(element, xml);

            return element;
        }
    }
}