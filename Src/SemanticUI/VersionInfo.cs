using System.Collections.Generic;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class VersionInfo
    {
        #region Public Properties
        public static string CssFile => "https://cdn.jsdelivr.net/npm/semantic-ui@2.2.13/dist/semantic.css";
        public static IReadOnlyCollection<string> Scripts => new[] {"https://cdn.jsdelivr.net/npm/semantic-ui@2.2.13/dist/semantic.js"};
        #endregion
    }
}