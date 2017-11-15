namespace Bridge.CustomUIMarkup.SemanticUI
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