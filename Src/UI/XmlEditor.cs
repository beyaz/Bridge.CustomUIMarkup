namespace Bridge.CustomUIMarkup.UI
{
    class XmlEditor : Libraries.CodeMirror.XmlEditor
    {
        #region Public Properties
        public override object SchemaInfo
        {
            get
            {
                var xmlIntellisenseInfos =  Builder.Tags;
                return Libraries.CodeMirror.SchemaInfo.CreateFrom(xmlIntellisenseInfos).ToJson();
            }
        }
        #endregion
    }
}