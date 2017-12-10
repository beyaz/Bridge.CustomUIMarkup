using System;
using System.Collections.Generic;

namespace Bridge.CustomUIMarkup.Common
{
    class Trace
    {
        #region Static Fields
        internal static readonly Dictionary<Type, bool> DisabledTypesForTrace = new Dictionary<Type, bool>();
        #endregion

        #region Public Methods
        public static void Log(object caller, object Value)
        {
            if (caller != null)
            {
                var isDisabled = DisabledTypesForTrace.TryGetValue(caller.GetType(), false);
                if (isDisabled)
                {
                    return;
                }
            }

            Script.Call("console.log", Value);
        }

        public static void OperationWasCanceled(string operationName, string reason)
        {
            Script.Call("console.log", reason + "For this reason operation was canceled.@operationName:" + operationName);
        }
        #endregion
    }
}