using Bridge.CustomUIMarkup.SemanticUI;

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