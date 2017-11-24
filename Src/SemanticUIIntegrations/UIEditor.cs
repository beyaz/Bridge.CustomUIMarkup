using Bridge.CustomUIMarkup.SemanticUI;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.SemanticUIIntegrations
{
    class UIEditor : Design.UIEditor
    {
        #region Constructors
        public UIEditor()
        {
            CreateBuilder = () => new Builder();
        }
        #endregion
    }
}