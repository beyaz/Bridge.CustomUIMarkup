using System;
using System.ComponentModel;
using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace Bridge.CustomUIMarkup.Test
{
    public class SimpleClass1 : Bag
    {
        #region DateTime? BeginDate
        DateTime? _beginDate;
        public DateTime? BeginDate
        {
            get { return _beginDate; }
            set
            {
                if (_beginDate != value)
                {
                    _beginDate = value;
                    OnPropertyChanged("BeginDate");
                }
            }
        }
        #endregion



        public SimpleClass1 SimplePropertyChild { get; set; }
        public string SimpleStringProperty { get; set; }

        #region bool BoolenProperty0
        bool _boolenProperty0;
        public bool BoolenProperty0
        {
            get { return _boolenProperty0; }
            set
            {
                if (_boolenProperty0 != value)
                {
                    _boolenProperty0 = value;
                    OnPropertyChanged("BoolenProperty0");
                }
            }
        }
        #endregion



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
        #region Constants
        const string LastName = nameof(LastName);
        const string Year = nameof(Year);
        #endregion

        #region Public Methods
        public static void RunAll()
        {
            new BindingInfoTest().SimpleBind_with_Different_primitive_types();
            new BindingInfoTest().ParsePath();
            new BindingInfoTest().SimpleBind();
            new BindingInfoTest().SimpleBind_with_Converter();
            new BindingInfoTest().LongPropertyPathForSource();
            new BindingInfoTest().SimpleTwoWayBind();
            new BindingInfoTest().BindingInBag();
            new BindingInfoTest().SimpleBindWithSameValues();
            new BindingInfoTest().TwoWayCircularBindingMustbeSupport();
            new BindingInfoTest().TwoWayCircularBindingBetweenThreeItemsMustbeSupport();
            new BindingInfoTest().InvalidPathBindingOperationTest();
            new BindingInfoTest().InvalidPathBindingOperationTest2();

            new BindingInfoTest().CheckInvalidPropertyPath();
            new BindingInfoTest().CheckSimpleProperties();
            new BindingInfoTest().CheckSimplePropertiesWithLongPath();
        }

        void CheckSimplePropertiesWithLongPath()
        {
            var source = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    SimplePropertyChild = new SimpleClass1
                    {
                        SimplePropertyChild = new SimpleClass1
                        {
                            SimpleStringProperty = "A"
                        }
                    }
                }
            };

            var target = new SimpleClass1();

            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                Source = source,
                SourcePath = "Child.SimplePropertyChild.SimplePropertyChild.SimpleStringProperty",

                Target = target,
                TargetPath = "Child.LastName"
            }.Connect();


            MustEqualByReference(null, target.Child);


            target.Child = new SimpleClass1
            {
            };

            source.Child = new SimpleClass1
            {
                SimplePropertyChild = new SimpleClass1
                {
                    SimplePropertyChild = new SimpleClass1
                    {
                        SimpleStringProperty = "X"
                    }
                }
            };

            MustEqual("X", target.Child.LastName);


            target.Child = new SimpleClass1
            {
                LastName = "C"
            };


            MustEqual("C", source.Child.SimplePropertyChild.SimplePropertyChild.SimpleStringProperty);

        }
        void CheckSimpleProperties()
        {
            var source = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        SimpleStringProperty = "A"
                    }
                }
            };

            var target = new SimpleClass1();

            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                Source = source,
                SourcePath = "Child.Child.SimpleStringProperty",

                Target = target,
                TargetPath = "Child.LastName"
            }.Connect();


            MustEqualByReference(null, target.Child);

            source.Child.Child = new SimpleClass1
            {
                SimpleStringProperty = "B"
            };

            MustEqualByReference(null, target.Child);

            target.Child = new SimpleClass1
            {
                LastName = "C"
            };


            MustEqual("C", source.Child.Child.SimpleStringProperty);


            source.Child.Child = new SimpleClass1
            {
                SimpleStringProperty = "X"
            };

            MustEqual("X", target.Child.LastName);

        }

        void CheckInvalidPropertyPath()
        {
            var source = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        LastName = "A"
                    }
                }
            };

            var path = "Child.Child.LastName";

            var propertyPath = new PropertyPath(path);

            propertyPath.ParsePath(source, path);

            Assert.False(propertyPath.IsNotReadyToUpdate);


            path = "Child.LastName";

             propertyPath = new PropertyPath(path);

            propertyPath.ParsePath(source, path);

            Assert.False(propertyPath.IsNotReadyToUpdate);


            // 
            path = "Child.XXX.LastName";

            propertyPath = new PropertyPath(path);

            propertyPath.ParsePath(source, path);

            Assert.True(propertyPath.IsNotReadyToUpdate);


            path = "Child.Child.LastName";

            propertyPath = new PropertyPath(path);

            propertyPath.Listen(source,()=>{});
            
            Assert.False(propertyPath.IsNotReadyToUpdate);

            source.Child = null;

            Assert.True(propertyPath.IsNotReadyToUpdate);

        }

        void InvalidPathBindingOperationTest()
        {
            var source = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        LastName = "A"
                    }
                }
            };

            var target = new SimpleClass1();
            
            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                Source = source,
                SourcePath = "Child.Child.LastName",
                
                Target = target,
                TargetPath = "Child.LastName"
            }.Connect();


            MustEqualByReference(null,target.Child);

            source.Child.Child.LastName = "B";

            MustEqualByReference(null, target.Child);

            target.Child = new SimpleClass1
            {
                LastName = "C"
            };


            MustEqual("C", source.Child.Child.LastName);
            
        }

        void InvalidPathBindingOperationTest2()
        {
            var source = new SimpleClass1();

            var target = new SimpleClass1
            {
                Child = new SimpleClass1
                {
                    Child = new SimpleClass1
                    {
                        LastName = "A"
                    }
                }
            };

            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                Source = source,
                SourcePath = "Child.Child.LastName",

                Target = target,
                TargetPath = "Child.Child.LastName"
            }.Connect();


            MustEqualByReference(null, source.Child);

            target.Child.Child.LastName = "B";

            MustEqualByReference(null, source.Child);

            source.Child = new SimpleClass1
            {
                Child = new  SimpleClass1
                {
                    LastName = "C"
                }
            };


            MustEqual("C", target.Child.Child.LastName);

        }

        class ATo56Converter:IValueConverter
        {
            public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
            {
                var valueAsString = value as string;
                if (valueAsString == null)
                {
                    return -1;
                }

                if (valueAsString =="A")
                {
                    return 56;
                }

                return 78;
            }

            public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
            {
                var valueAsInt32 = (int) value;
                if (valueAsInt32 == 78)
                {
                    return "None";
                }

                if (valueAsInt32 == 56)
                {
                    return "A";
                }
                if (valueAsInt32 == -1)
                {
                    return null;
                }
                throw new InvalidOperationException();
            }
        }


        void SimpleBind_with_Different_primitive_types()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.OneWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = Year
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "56";

            MustEqual(56, simpleClass2.Year);
        }

        void SimpleBind_with_Converter()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.OneWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = Year,
                Converter = new ATo56Converter()
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "A";

            MustEqual(56, simpleClass2.Year);
        }


        public void BindingInBag()
        {
            var simpleClass1 = new SimpleClass1();
            var bag = new Bag();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = bag,
                TargetPath = LastName
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "Alex1";

            MustEqual("Alex1", (string) bag[LastName]);

            bag[LastName] = "Alex3";

            MustEqual("Alex3", simpleClass1.LastName);
        }

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
                SourcePath = nameof(simpleClass1.Child) + "." + LastName,
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = LastName
            };

            bindingInfo.Connect();

            simpleClass1.Child.LastName = "Alex0";

            MustEqual("Alex0", simpleClass2.LastName);
        }

        public void ParsePath()
        {
            var simpleClass1 = new SimpleClass1
            {
                Child = new SimpleClass1()
            };

            var propertyPath = new PropertyPath("Child.LastName");

            propertyPath.ParsePath(simpleClass1, propertyPath.Path);

            MustEqualByReference(propertyPath.Triggers[0].Instance, simpleClass1);

            MustEqualByReference(propertyPath.Triggers[0].PropertyName, "Child");

            MustEqualByReference(propertyPath.Triggers[1].Instance, simpleClass1.Child);

            MustEqualByReference(propertyPath.Triggers[1].PropertyName, "LastName");
        }

        public void SimpleBind()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.OneWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = LastName
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "Alex1";

            MustEqual("Alex1", simpleClass2.LastName);
        }

        public void SimpleBindWithSameValues()
        {
            var simpleClass1 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = simpleClass1,
                TargetPath = LastName
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "Alex1";
        }

        public void SimpleTwoWayBind()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = LastName
            };

            bindingInfo.Connect();

            simpleClass1.LastName = "Alex1";

            MustEqual("Alex1", simpleClass2.LastName);

            simpleClass2.LastName = "Alex3";

            MustEqual("Alex3", simpleClass1.LastName);
        }

        public void TwoWayCircularBindingBetweenThreeItemsMustbeSupport()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();
            var simpleClass3 = new SimpleClass1();

            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = LastName
            }.Connect();

            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = LastName,
                Source = simpleClass2,
                Target = simpleClass3,
                TargetPath = LastName
            }.Connect();

            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = LastName,
                Source = simpleClass3,
                Target = simpleClass1,
                TargetPath = LastName
            }.Connect();

            simpleClass1.LastName = "Alex1";
            MustEqual("Alex1", simpleClass2.LastName);
            MustEqual("Alex1", simpleClass3.LastName);

            simpleClass2.LastName = "Alex3";

            MustEqual("Alex3", simpleClass1.LastName);
            MustEqual("Alex3", simpleClass3.LastName);
        }

        public void TwoWayCircularBindingMustbeSupport()
        {
            var simpleClass1 = new SimpleClass1();
            var simpleClass2 = new SimpleClass1();

            new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath = LastName,
                Source = simpleClass1,
                Target = simpleClass2,
                TargetPath = LastName
            }.Connect();

            simpleClass1.LastName = "Alex1";

            MustEqual("Alex1", simpleClass2.LastName);

            simpleClass2.LastName = "Alex3";

            MustEqual("Alex3", simpleClass1.LastName);
        }
        #endregion
    }
}