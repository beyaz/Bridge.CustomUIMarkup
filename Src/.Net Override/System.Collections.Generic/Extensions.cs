namespace System.Collections.Generic
{
    public static class Extensions
    {
        #region Public Methods
        public static TValue TryGetValue<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue)
        {
            var value = default(TValue);
            if (dictionary.TryGetValue(key, out value))
            {
                return value;
            }

            return defaultValue;
        }
        #endregion
    }
}