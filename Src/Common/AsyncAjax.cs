using System;
using System.Threading.Tasks;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Common
{
    public class AsyncAjax : IPromise
    {
        #region Fields
        string ResponseText;
        #endregion

        #region Properties
        string Data { get; set; }
        string Url { get; set; }
        #endregion

        #region Public Methods
        public static async Task<string> Post(string url, string data)
        {
            var promise = new AsyncAjax
            {
                Url = url,
                Data = data
            };
            var resultHandler = (Func<AsyncAjax, string>) (request => request.ResponseText);

            var task = Task.FromPromise<string>(promise, resultHandler);

            await task;

            return task.Result;
        }

        public void Then(Delegate fulfilledHandler, Delegate errorHandler, Delegate progressHandler = null)
        {
            jQuery.Ajax(new AjaxOptions
            {
                Type = "POST",
                Url = Url,
                Data = Data,
                Async = true,
                Success = (o, s, arg3) =>
                {
                    ResponseText = arg3.ResponseText;
                    fulfilledHandler.Call(null, this);
                },
                Error = (o, s, arg3) =>
                {
                    Trace.OperationWasCanceled("@POST:" + Url, "Ajax Error Occured.");

                    Trace.Log(o);
                    Trace.Log(s);
                    Trace.Log(arg3);
                }
            });
        }
        #endregion
    }
}