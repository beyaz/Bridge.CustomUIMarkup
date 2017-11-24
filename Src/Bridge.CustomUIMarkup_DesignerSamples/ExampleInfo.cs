using System.Windows;

namespace Bridge.CustomUIMarkup_DesignerSamples
{
    public class ExampleInfo : FrameworkElement
    {
        #region string Name
        string _name;

        public string Name
        {
            get { return _name; }
            set
            {
                if (_name != value)
                {
                    _name = value;
                    OnPropertyChanged("Name");
                }
            }
        }
        #endregion

        #region string XmlTemplate
        string _xmlTemplate;

        public string XmlTemplate
        {
            get { return _xmlTemplate; }
            set
            {
                if (_xmlTemplate != value)
                {
                    _xmlTemplate = value;
                    OnPropertyChanged("XmlTemplate");
                }
            }
        }
        #endregion
    }
}