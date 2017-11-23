using System.ComponentModel;

namespace System.Windows
{
    public class PropertyMetadata
    {
        public object DefaultValue { get; }
        public PropertyChangedCallback PropertyChangedCallback { get; }
        public PropertyMetadata(PropertyChangedCallback propertyChangedCallback)
        {
            PropertyChangedCallback = propertyChangedCallback;
        }
        public PropertyMetadata(object defaultValue ,PropertyChangedCallback propertyChangedCallback)
        {
            DefaultValue = defaultValue;
            PropertyChangedCallback = propertyChangedCallback;
        }
        public PropertyMetadata(object defaultValue)
        {
            DefaultValue = defaultValue;
        }
    }

    public delegate bool ValidateValueCallback(object value);

    public delegate void PropertyChangedCallback(DependencyObject d, DependencyPropertyChangedEventArgs e);
    public class DependencyPropertyChangedEventArgs : BagChangedEventArgs
    {
        public DependencyPropertyChangedEventArgs(string propertyName) : base(propertyName)
        {
        }
        public DependencyPropertyChangedEventArgs(string propertyName, object newValue) : base(propertyName, newValue)
        {
        }
        public DependencyPropertyChangedEventArgs(string propertyName, object newValue, object oldValue) : base(propertyName, newValue, oldValue)
        {
        }
    }
}