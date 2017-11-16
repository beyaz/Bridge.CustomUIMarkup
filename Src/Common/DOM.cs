using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    public static class DOM
    {
        public static jQuery CreateElement(string tagName)
        {
            return new jQuery(Document.CreateElement(tagName));
        }

        #region Public Methods
        public static jQuery a(string className)
        {
            return new jQuery(Document.CreateElement("a")).AddClass(className);
        }

        public static jQuery button(string className)
        {
            return new jQuery(Document.CreateElement("button")).AddClass(className);
        }

        public static jQuery div(string className = null)
        {
            return new jQuery(Document.CreateElement("div")).AddClass(className);
        }

        public static jQuery h1(string className = null)
        {
            return new jQuery(Document.CreateElement("h1")).AddClass(className);
        }
        public static jQuery h2(string className = null)
        {
            return new jQuery(Document.CreateElement("h2")).AddClass(className);
        }
        public static jQuery h3(string className = null)
        {
            return new jQuery(Document.CreateElement("h3")).AddClass(className);
        }

        public static jQuery i(string className = null)
        {
            var el = new jQuery(Document.CreateElement("i"));
            if (className != null)
            {
                el.AddClass(className);
            }

            return el;
        }

        public static jQuery input(string type, string className = null)
        {
            return new jQuery(Document.CreateElement("input")).Attr("type", type).AddClass(className);
        }
        public static jQuery label(string className = null)
        {
            return new jQuery(Document.CreateElement("label")).AddClass(className);
        }
        public static jQuery textarea(string className = null)
        {
            return new jQuery(Document.CreateElement("textarea")).AddClass(className);
        }
        #endregion

        public static jQuery img()
        {
            return new jQuery(Document.CreateElement("img"));
        }
    }
}