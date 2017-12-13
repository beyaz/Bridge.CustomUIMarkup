namespace Bridge.Html5
{
    /// <summary>
    ///     The extensions
    /// </summary>
    public static class Extensions
    {
        #region Public Methods
        /// <summary>
        ///     Ases the HTML string.
        /// </summary>
        public static string AsHtmlString(this Element element)
        {
            var div = Document.CreateElement("div");

            div.AppendChild(element.CloneNode(true));

            return div.InnerHTML.Replace("\"","'");
        }
        #endregion
    }
}