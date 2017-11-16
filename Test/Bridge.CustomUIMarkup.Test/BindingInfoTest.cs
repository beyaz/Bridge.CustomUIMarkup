using System.ComponentModel;
using System.Windows;
using System.Windows.Data;
using Bridge.Html5;

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
        public void ParsePath()
        {
            var simpleClass1 = new SimpleClass1
            {
                Child = new SimpleClass1()
            };

            var propertyPath = new PropertyPath("Child.LastName");

            propertyPath.ParsePath(simpleClass1, propertyPath.Path);

            MustEqualByReference(propertyPath.Triggers[0].Instance , simpleClass1);

            MustEqualByReference(propertyPath.Triggers[0].PropertyName, "Child");

            MustEqualByReference(propertyPath.Triggers[1].Instance, simpleClass1.Child);

            MustEqualByReference(propertyPath.Triggers[1].PropertyName, "LastName");

        }

        
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
                SourcePath = nameof(simpleClass1.Child) + "." + nameof(simpleClass1.LastName),
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = nameof(simpleClass1.LastName)
            };

            bindingInfo.Connect();

            simpleClass1.Child.LastName = "Alex0";

            MustEqual("Alex0",simpleClass2.LastName);
        }

        public void SimpleBind()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.OneWay,
                SourcePath = nameof(simpleClass1.LastName),
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = nameof(simpleClass1.LastName)
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "Alex1";

            MustEqual("Alex1", simpleClass2.LastName);
        }

        public void SimpleTwoWayBind()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = nameof(simpleClass1.LastName),
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = nameof(simpleClass2.LastName)
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "Alex1";

            MustEqual("Alex1", simpleClass2.LastName);

            simpleClass2.LastName = "Alex3";

            MustEqual("Alex3", simpleClass1.LastName);
        }
        #endregion
    }
}