using System.Diagnostics.CodeAnalysis;
using Bridge;
using Bridge.Html5;

namespace System.Xml
{
    static class WhiteStoneExtensions
    {
        #region Methods
        [SuppressMessage("ReSharper", "UnusedParameter.Global")]
        internal static int GetOriginalLineNumber(this Node element, Node xmlRootNode, string sContent)
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
        #endregion
    }
}