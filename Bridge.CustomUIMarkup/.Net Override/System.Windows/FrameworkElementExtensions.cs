namespace System.Windows
{
    public static class FrameworkElementExtensions
    {
        public static T Attr<T>(this T element,string attributeName, string value) where T:FrameworkElement
        {
            element._root.Attr(attributeName, value);
            return element;
        }
        public static string Attr<T>(this T element, string attributeName) where T : FrameworkElement
        {
            return element._root.Attr(attributeName);
        }
        public static string html<T>(this T element) where T : FrameworkElement
        {
            return element._root.Html();
        }

        public static string Val<T>(this T element) where T : FrameworkElement
        {
            return element._root.Val();
        }

        public static T Val<T>(this T element,string value) where T : FrameworkElement
        {
            element._root.Val(value);

            return element;
        }

        public static T Css<T>(this T element, string propertyName, object value) where T : FrameworkElement
        {
            element._root.Css(propertyName,value);

            return element;
        }
    }
}