using System.Linq;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.UI
{
    class XmlEditor : Libraries.CodeMirror.XmlEditor
    {
        #region Public Properties
        public override object SchemaInfo
        {
            get
            {
                var xmlIntellisenseInfos =  Builder._elementCreators.Keys.ToList().ConvertAll(x=>new XmlIntellisenseInfo(x,null));
                return Libraries.CodeMirror.SchemaInfo.CreateFrom(xmlIntellisenseInfos).ToJson();
            }
        }
        #endregion
    }
}