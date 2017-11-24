using Bridge.CustomUIMarkup.SemanticUI;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.SemanticUIIntegrations
{
    class XmlEditor : CodeMirror.XmlEditor
    {
        #region Public Properties
        public override object SchemaInfo
        {
            get
            {
                var xmlIntellisenseInfos =  Builder.Tags;
                return CodeMirror.SchemaInfo.CreateFrom(xmlIntellisenseInfos).ToJson();
            }
        }
        #endregion
    }
}