using System.Collections.Generic;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.UI
{
    class XmlEditor : Libraries.CodeMirror.XmlEditor
    {
        static object _schemaInfo;

        #region Public Properties
        public override object SchemaInfo
        {
            get
            {
                if (_schemaInfo != null)
                {

                    return _schemaInfo;
                }

                var xmlIntellisenseInfos = new List<XmlIntellisenseInfo>();
                foreach (var keyValuePair in UIBuilder._elementCreators)
                {
                    var tagName = keyValuePair.Key.ToLower();

                    if (tagName == nameof(XmlEditor).ToUpper())
                    {
                        continue;
                    }
                    var type = keyValuePair.Value().GetType();


                    xmlIntellisenseInfos.Add(new XmlIntellisenseInfo(tagName, type));
                }

                _schemaInfo =  Libraries.CodeMirror.SchemaInfo.CreateFrom(xmlIntellisenseInfos).ToJson();

                return _schemaInfo;
            }
        }
        #endregion
    }
}