using System.Collections.Generic;

namespace Bridge.CustomUIMarkup.UI.Design
{
    public class BinderEventAttributeResolver
    {
        #region Static Fields
        static readonly Dictionary<string, string> EventMap = new Dictionary<string, string>
        {
            {"CLICK", "click"}
        };
        #endregion

        #region Public Methods
        public virtual string GetjQueryEventName(string attributeName)
        {
            return EventMap[attributeName.ToUpper()];
        }

        public virtual bool IsEventAttribute(string attributeName)
        {
            return EventMap.ContainsKey(attributeName.ToUpper());
        }
        #endregion
    }
}