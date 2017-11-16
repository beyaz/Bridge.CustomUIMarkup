using System;
using System.ComponentModel;
using System.Windows;
using System.Windows.Data;
using Bridge.QUnit;

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
    }

    class BindingInfoTest
    {
        #region Public Methods
        public static void SimpleBind(Assert assert)
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

            assert.Equal(simpleClass1.LastName, simpleClass2.LastName);
        }
        #endregion
    }

    public class App
    {
        #region Public Methods
        public static void Main()
        {
            QUnit.QUnit.Test(nameof(BindingInfoTest.SimpleBind), BindingInfoTest.SimpleBind);

            Console.WriteLine("Success");
        }
        #endregion
    }
}