namespace Bridge.CustomUIMarkup.SemanticUI
{
    static class NumberToWord
    {
        #region Static Fields
        static readonly string[] unitsMap = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};
        #endregion

        #region Public Methods
        public static string ToWord(this int value)
        {
            return unitsMap[value];
        }
        #endregion
    }
}