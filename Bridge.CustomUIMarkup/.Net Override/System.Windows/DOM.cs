using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Windows
{
    public static class DOM
    {
        #region Public Properties
        public static jQuery body => new jQuery("body");
        public static jQuery head => new jQuery("head");
        #endregion

        #region Public Methods
        public static jQuery a(string className)
        {
            return CreateElement("a", className);
        }

        public static jQuery button(string className)
        {
            return CreateElement("button", className);
        }

        public static jQuery ById(string id)
        {
            return new jQuery(Document.GetElementById(id));
        }

        public static jQuery CreateElement(string tagName)
        {
            return new jQuery(Document.CreateElement(tagName));
        }

        public static jQuery CreateElement(string tagName, string className)
        {
            return new jQuery(Document.CreateElement(tagName)).AddClass(className);
        }

        public static jQuery div(string className = null)
        {
            return CreateElement("div", className);
        }

        public static jQuery h1(string className = null)
        {
            return CreateElement("h1", className);
        }

        public static jQuery h2(string className = null)
        {
            return CreateElement("h2", className);
        }

        public static jQuery h3(string className = null)
        {
            return CreateElement("h3", className);
        }

        public static jQuery i(string className = null)
        {
            return CreateElement("i", className);
        }

        public static jQuery img(string className = null)
        {
            return CreateElement("img", className);
        }

        public static jQuery input(string type, string className = null)
        {
            return CreateElement("input", className).Attr("type", type);
        }

        public static jQuery label(string className = null)
        {
            return CreateElement("label", className);
        }

        public static jQuery li(string className = null)
        {
            return CreateElement("li", className);
        }

        public static jQuery textarea(string className = null)
        {
            return CreateElement("textarea", className);
        }

        public static jQuery ul(string className = null)
        {
            return CreateElement("ul", className);
        }
        #endregion
    }
}