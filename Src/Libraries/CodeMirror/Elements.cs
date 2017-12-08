using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.CodeMirror
{
    static class Elements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            Builder.Register("UIEditor", Builder.Create<UIEditor>);

            Builder.Register("XmlEditor", Builder.Create<XmlEditor>);
        }
        #endregion
    }
}