namespace Bridge.jQuery2
{
    static class Extensions
    {
        #region Public Methods
        public static jQuery Css_display_Inline_Block(this jQuery query)
        {
            query.Css("display", "inline-block");

            return query;
        }

        public static jQuery Css_float_Left(this jQuery query)
        {
            query.Css("float", "left");

            return query;
        }

        public static jQuery Css_width(this jQuery query,string value)
        {
            query.Css("width", value);

            return query;
        }
        #endregion
    }
}