using System.ComponentModel;
using System.Windows;
using System.Windows.Data;

namespace Bridge.CustomUIMarkup.Test
{
    public class SimpleClass1 : Bag
    {
        #region string LastName
        string _lastName;

        public string LastName
        {
            get { return _lastName; }
            set
            {
                if (_lastName != value)
                {
                    _lastName = value;
                    OnPropertyChanged("LastName");
                }
            }
        }
        #endregion

        #region int Year
        int _year;

        public int Year
        {
            get { return _year; }
            set
            {
                if (_year != value)
                {
                    _year = value;
                    OnPropertyChanged("Year");
                }
            }
        }
        #endregion

        #region SimpleClass1 Child
        SimpleClass1 _child;

        public SimpleClass1 Child
        {
            get { return _child; }
            set
            {
                if (_child != value)
                {
                    _child = value;
                    OnPropertyChanged("Child");
                }
            }
        }
        #endregion
    }

    class BindingInfoTest : TestBase
    {
        #region Public Methods
        public void LongPropertyPathForSource()
        {
            var simpleClass1 = new SimpleClass1
            {
                Child = new SimpleClass1()
            };
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.OneWay,
                Path = new PropertyPath(nameof(simpleClass1.Child) + "." + nameof(simpleClass1.LastName)),
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPropertyName = nameof(simpleClass1.LastName)
            };

            bindingInfo.Connect();

            simpleClass1.Child.LastName = "Alex";

            MustEqual(simpleClass2.LastName, simpleClass1.Child.LastName);
        }

        public void SimpleBind()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.OneWay,
                Path = new PropertyPath(nameof(simpleClass1.LastName)),
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPropertyName = nameof(simpleClass1.LastName)
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "Alex";

            MustEqual(simpleClass1.LastName, simpleClass2.LastName);
        }
        #endregion
    }
}