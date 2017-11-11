using System;
using System.Collections.Generic;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    public class ScriptLoader
    {
        public static string JsDirectory => "Scripts/";
        public static string CssDirectory => "css/";

        #region Fields
        int index;
        #endregion

        #region Public Properties
        public Action OnLoacCompleted { get; set; }
        public IReadOnlyList<string> Scripts { get; set; }
        #endregion

        #region Public Methods
        public void Load()
        {
            if (Scripts == null)
            {
                return;
            }

            if (index >= Scripts.Count)
            {
                OnLoacCompleted();
                return;
            }

            jQuery.GetScript(Scripts[index], (a, b, c) =>
            {
                index++;
                Load();
            });
        }
        #endregion

        public static void LoadCssFile(string url)
        {
            new jQuery("head").Append("<link rel='stylesheet' href='"+ url + "' type='text/css' />");
        }
        public static void LoadCssFiles(IEnumerable<string> css)
        {
            foreach (var url in css)
            {
                LoadCssFile(url);
            }
        }
    }
}