using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.UI;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Test
{
    class ComboTest
    {
        #region Public Methods
        public static void RegisterAll()
        {
            QUnit.QUnit.Test(nameof(combo_SelectedValueTest), combo_SelectedValueTest);
        }
        #endregion

        #region Methods
        static void combo_SelectedValueTest(Assert Assert)
        {
            var model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş",
                        YearNullable = 5
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş2",
                        YearNullable = 7
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş -1",
                        YearNullable = -1
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş null",
                        YearNullable = null
                    }
                },
                SelectedYear = 5
            };

            var htmlString = @" 
<combo  ItemsSource ='{Items}' 
        DisplayMemberPath = 'LastName' 
        SelectedValuePath = 'YearNullable'
        SelectedValue     = '{SelectedYear}' />
";

            var ui = (Combo) TestHelper.BuildAndGetFirstLogicalChild(htmlString, model);

            Assert.IsTrue(null != ui.SelectedValue);

            Assert.IsTrue(ui.SelectedValue is int);

            Assert.AreEqual(5, (int?)(ui.SelectedValue));

            Assert.True(model.Items[0] == ui.SelectedItem);

            ui.SelectedValue = 7;

            Assert.AreEqual(7, model.SelectedYear);

            Assert.True(model.Items[1] == ui.SelectedItem);

            ui.SelectedValue = -1;

            Assert.AreEqual(-1, model.SelectedYear);

            Assert.True(model.Items[2] == ui.SelectedItem);

            ui.SelectedValue = null;

            Assert.AreEqual(null, model.SelectedYear);

            Assert.True(model.Items[3] == ui.SelectedItem);

            model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş",
                        YearNullable = 5
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş2",
                        YearNullable = 7
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş -1",
                        YearNullable = -1
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş null",
                        YearNullable = null
                    }
                },
                SelectedYear = 7
            };

            ui.DataContext = model;

            Assert.True(7 == ui.SelectedValue.ToInt32());

            Assert.True(model.Items[1] == ui.SelectedItem);

            model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş",
                        YearNullable = 5
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş2",
                        YearNullable = 7
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş -1",
                        YearNullable = -1
                    },
                    new SimpleClass1
                    {
                        LastName     = "Neşet Ertaş null",
                        YearNullable = null
                    }
                },
                SelectedYear = null
            };

            ui.DataContext = model;

            Assert.True(null == ui.SelectedValue);

            Assert.True(model.Items[3] == ui.SelectedItem);

            model.Items = new List<SimpleClass1>
            {
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş",
                    YearNullable = 5
                },
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş null",
                    YearNullable = null
                },
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş2",
                    YearNullable = 7
                },
                new SimpleClass1
                {
                    LastName     = "Neşet Ertaş -1",
                    YearNullable = -1
                }
            };

            Assert.True(null == ui.SelectedValue);
            Assert.True(model.Items[1] == ui.SelectedItem);
        }

        void combo_SelectedValueTest_with_converter(Assert Assert)
        {
            var model = new ComboModel
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {
                        LastName = "Neşet Ertaş",
                        Year     = 5
                    },
                    new SimpleClass1
                    {
                        LastName = "Neşet Ertaş2",
                        Year     = 7
                    }
                },
                Child = new ComboModel
                {
                    SelectedYearAsString = "5"
                }
            };

            var htmlString = @"

<Field>

 <combo ItemsSource ='{Items}' 
                         DisplayMemberPath='LastName' 
                         SelectedValuePath='Year'
                         SelectedValue='{Child.SelectedYearAsString}' />
</Field>

";

            var fe = new FrameworkElement();

            fe.LoadComponent(htmlString);

            var field = fe.GetLogicalChildAt(0);

            Assert.True(field.DataContext == null);

            fe.DataContext = model;

            Assert.True(field.DataContext == model);

            var ui = (Combo) field.GetLogicalChildAt(0);

            Assert.AreEqual("5", Cast.To<string>(ui.SelectedValue));

            ui.SelectedValue = 7;

            Assert.AreEqual("7", model.Child.SelectedYearAsString);
        }
        #endregion

        class ComboModel : Bag
        {
            #region List<SimpleClass1> Items
            List<SimpleClass1> _items;

            public List<SimpleClass1> Items
            {
                get { return _items; }
                set
                {
                    if (_items != value)
                    {
                        _items = value;
                        OnPropertyChanged("Items");
                    }
                }
            }
            #endregion

            #region int SelectedYear
            int? _selectedYear;

            public int? SelectedYear
            {
                get { return _selectedYear; }
                set
                {
                    if (_selectedYear != value)
                    {
                        _selectedYear = value;
                        OnPropertyChanged("SelectedYear");
                    }
                }
            }
            #endregion

            #region string SelectedYearAsString
            string _selectedYearAsString;

            public string SelectedYearAsString
            {
                get { return _selectedYearAsString; }
                set
                {
                    if (_selectedYearAsString != value)
                    {
                        _selectedYearAsString = value;
                        OnPropertyChanged("SelectedYearAsString");
                    }
                }
            }
            #endregion

            #region ComboModel Child
            ComboModel _child;

            public ComboModel Child
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
    }
}