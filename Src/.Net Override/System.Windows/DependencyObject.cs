using System.ComponentModel;

namespace System.Windows
{
    public class DependencyObject : Bag
    {
        public void SetValue(DependencyProperty dp, object value)
        {
            this[dp.Name] = value;
        }

        public object GetValue(DependencyProperty dp)
        {
            var value = this[dp.Name];
            if (value == null)
            {
                if (dp.PropertyMetadata?.DefaultValue != null)
                {
                    return dp.PropertyMetadata.DefaultValue;
                }

                if (dp.PropertyType.IsEnum)
                {
                    return Enum.Parse(dp.PropertyType, "0");
                }
            }
            return value;
        }
    }
}