using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.CodeMirror
{
    static class CodeMirrorElements
    {
        #region Public Methods
        public static void RegisterToBuilder()
        {
            UIBuilder.Register("UIEditor", UIBuilder.Create<UIEditor>);

            UIBuilder.Register("XmlEditor", UIBuilder.Create<XmlEditor>);
        }
        #endregion
    }
}