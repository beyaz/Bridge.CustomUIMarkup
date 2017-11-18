using System;
using System.Xml;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    public static class Extensions
    {
       


        internal static int GetOriginalLineNumber(this XmlNode element, XmlNode xmlRootNode, string sContent)
        {
            // https://jsfiddle.net/g113c350/3/

            Script.Write<int>(
                @"

    var sTagName = element.tagName;
    var aNodeListByTag = xmlRootNode.getElementsByTagName(sTagName);
    var iMaxIndex = 0;
    for (var j = 0; j < aNodeListByTag.length; j++) {
        if (aNodeListByTag.item(j) === element) {
            iMaxIndex = j;
            break;
        }
    }
    var regex = new RegExp('<' + sTagName, 'g');
    var offset = 0;
    for (var i = 0; i <= iMaxIndex; i++) {
        offset = regex.exec(sContent).index;
    }
    var line = 0;
    for (var i = 0; i < sContent.substring(0, offset).length; i++) {
        if (sContent[i] === '\n') {
            line++;
        }
    }
    return line + 1;

");

            return 0;
        }
        #region Public Methods
        // ReSharper disable once UnusedParameter.Global
        public static bool GetElementsByTagNameIsNotSupporting(this Element element)
        {
            return Script.Write<bool>("element.getElementsByTagName === undefined");
        }

        public static bool IsNullOrWhiteSpace(this string value)
        {
            return string.IsNullOrWhiteSpace(value);
        }

        public static jQuery RemoveFromParent(this jQuery query)
        {
            query?.Remove();

            return query;
        }

        public static jQuery highlight(this jQuery el)
        {
            var oldColor = el.Css("background-color");
            var opacity = el.Css("opacity");


            el.Css("background-color", "#ffff99");
            el.Css("opacity", 0.9);

            Window.SetTimeout(() =>
            {
                el.Css("background-color", oldColor);
                el.Css("opacity", opacity);
            },600);

            

           

            return el;
        }

        public static jQuery SetFirstChild(this jQuery query, jQuery childElement)
        {
            var children = query?.Children();
            if (children == null || children.Length== 0)
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

        public static jQuery Foreach(this jQuery query, Action<jQuery> action)
        {
            query?.Children().Each((e,i) => action(new jQuery(e)));

            return query;
        }
        public static jQuery SetClass(this jQuery query, string newClassName)
        {
            query.Attr("class", newClassName);

            return query;
        }
        #endregion
    }
}