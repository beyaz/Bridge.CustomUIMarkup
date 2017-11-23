namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Row : ElementBase
    {
        #region Constructors
        public Row()
        {
            AfterAddChild += el => { UpdateClass(); };
        }
        #endregion

        #region Properties
        protected override string HtmlClassName => "row";
        string rowClass => Childeren.Count.ToWord() + " column row";
        #endregion

        #region Methods
        void UpdateClass()
        {
            _root.Attr("class", rowClass);
        }
        #endregion
    }
}