namespace Bridge.CustomUIMarkup.SemanticUI
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