using System;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    public static class Extensions
    {
        #region Public Methods
        public static jQuery Foreach(this jQuery query, Action<jQuery> action)
        {
            query?.Children().Each((e, i) => action(new jQuery(e)));

            return query;
        }

        // ReSharper disable once UnusedParameter.Global
        public static bool GetElementsByTagNameIsNotSupporting(this Element element)
        {
            return Script.Write<bool>("element.getElementsByTagName === undefined");
        }

        public static jQuery highlight(this jQuery el)
        {
            var oldColor = el.Css("background-color");
            var opacity  = el.Css("opacity");

            el.Css("background-color", "#ffff99");
            el.Css("opacity", 0.9);

            Window.SetTimeout(() =>
            {
                el.Css("background-color", oldColor);
                el.Css("opacity", opacity);
            }, 600);

            return el;
        }

        public static bool IsNullOrWhiteSpace(this string value)
        {
            return string.IsNullOrWhiteSpace(value);
        }
        public static bool IsValueType(this Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            if (type.IsClass || type.IsInterface)
            {
                return false;
            }

            return true;
        }
        public static Type MakeGenericType(this Type type, Type genericArgumentType)
        {
            return type.MakeGenericType(new[] {genericArgumentType});
        }
        public static Type MakeGenericType(this Type type, Type genericArgumentType0, Type genericArgumentType1)
        {
            return type.MakeGenericType(new[] { genericArgumentType0, genericArgumentType1 });
        }

        public static jQuery RemoveFromParent(this jQuery query)
        {
            query?.Remove();

            return query;
        }

        public static jQuery SetClass(this jQuery query, string newClassName)
        {
            query.Attr("class", newClassName);

            return query;
        }

        public static jQuery SetFirstChild(this jQuery query, jQuery childElement)
        {
            var children = query?.Children();
            if (children == null || children.Length == 0)
            {
                childElement.AppendTo(query);
                return query;
            }

            childElement.InsertBefore(children.First());

            return query;
        }

        public static jQuery SetLastChild(this jQuery query, jQuery childElement)
        {
            var children = query?.Children();
            if (children == null || children.Length == 0)
            {
                childElement.AppendTo(query);
                return query;
            }

            childElement.InsertAfter(children.Last());

            return query;
        }
        #endregion
    }
}