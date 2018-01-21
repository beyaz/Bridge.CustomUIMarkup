using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    [SuppressMessage("ReSharper", "UnusedParameter.Global")]
    static class Extensions
    {
        internal static object dropdown(this jQuery query)
        {
            return Script.Write<object>("query.dropdown();");
        }
        internal static object rating(this jQuery query)
        {
            return Script.Write<object>("query.rating();");
        }
        internal static object tab(this jQuery query)
        {
            return Script.Write<object>("query.tab();");
        }

    }
}
