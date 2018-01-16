namespace System.Windows
{
    public class HtmlBodyElement
    {
        static FrameworkElement _value;

        public static FrameworkElement Value
        {
            get
            {
                if (_value == null)
                {
                    _value = new HtmlElement
                    {
                        _root = DOM.body
                    };
                }

                return _value;
            }
        }
    }
}