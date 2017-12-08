using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bridge.CustomUIMarkup
{
    static class Resources
    {
        // ReSharper disable once UnusedParameter.Global
        public static string GetXmlFileContent(string key)
        {
            return Script.Write<string>("Bridge.CustomUIMarkup.Resources.$XmlFileContents[key]");
        }
    }
}
