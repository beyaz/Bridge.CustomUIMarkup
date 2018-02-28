using System.Diagnostics.CodeAnalysis;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    [SuppressMessage("ReSharper", "UnusedParameter.Global")]
    static class Extensions
    {
        #region Methods
        internal static object dropdown(this jQuery query)
        {
            return Script.Write<object>("query.dropdown();");
        }

        internal static object tab(this jQuery query)
        {
            return Script.Write<object>("query.tab();");
        }
        #endregion
    }
}