using System;
using System.IO;
using System.Threading.Tasks;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    public class AsyncAjax : IPromise
    {
        #region Fields
        string _error;
        string ResponseText;
        #endregion

        #region Properties
        string Data { get; set; }
        string Url  { get; set; }
        #endregion

        #region Public Methods
        public static async Task<string> PostJson(string url, string json, Action<string> onError = null)
        {
            var promise = new AsyncAjax
            {
                Url  = url,
                Data = json
            };
            var resultHandler = (Func<AsyncAjax, string>) (request => request.ResponseText);

            var errorHandler = (Func<AsyncAjax, Exception>) (me =>
            {
                onError?.Invoke(me._error);

                return new IOException(me._error);
            });

            var task = Task.FromPromise<string>(promise, resultHandler, errorHandler);

            await task;

            return task.Result;
        }

        public void Then(Delegate fulfilledHandler, Delegate errorHandler, Delegate progressHandler = null)
        {
            jQuery.Ajax(new AjaxOptions
            {
                Type        = "POST",
                Url         = Url,
                Data        = Data,
                Async       = true,
                ContentType = "JSON",
                Success     = (o, s, arg3) =>
                {
                    ResponseText = arg3.ResponseText;
                    fulfilledHandler.Call(null, this);
                },

                Error = (jqXhr, status, errror) =>
                {
                    Trace.OperationWasCanceled("@POST:" + Url, "Ajax Error Occured.");

                    Trace.Log(jqXhr);

                    _error = " Ajax Error Occured." + Environment.NewLine +
                             " @status   :" + status + Environment.NewLine +
                             " @errror   :" + errror + Environment.NewLine +
                             " @POST Data:" + Data + Environment.NewLine +
                             " @Url      :" + Url;

                    Trace.Log(_error);

                    errorHandler.Call(null, this);
                }
            });
        }
        #endregion
    }
}