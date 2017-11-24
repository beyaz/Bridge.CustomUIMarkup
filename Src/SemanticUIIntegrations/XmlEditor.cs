using Bridge.CustomUIMarkup.SemanticUI;

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