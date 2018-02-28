using System;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    public static class FileUtil
    {
        #region Public Methods
        public static void ReadAsync(string url, Action<string> success)
        {
            jQuery.Ajax(new AjaxOptions
            {
                Async = false,
                Url = url,
                Success = (o, s, arg3) => { success(arg3.ResponseText); }
            });
        }
        #endregion
    }
}