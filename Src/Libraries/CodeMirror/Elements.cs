using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.CodeMirror
{
    static class Elements
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