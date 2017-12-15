using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;
using Bridge.Html5;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class DataGridTest : TestBase
    {
        public static void RunAll()
        {
            new DataGridTest().Simple();
             // new DataGridTest().XmlParse();
        }

        void Simple()
        {
            var dataGridColumn = Builder.Create<DataGridColumn>();
            dataGridColumn.Label = "Label_A";
            dataGridColumn.Name = "LastName";


            var dataGridColumn2 = Builder.Create<DataGridColumn>();
            dataGridColumn2.Label = "Label_Year";
            dataGridColumn2.Name = "Year";

            var dataGrid = new DataGrid("ui celled padded table")
            {
                ItemsSource = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {

                        Year = 5,
                        LastName = "A",

                    },
                    new SimpleClass1
                    {
                        Year = 6,
                        LastName = "B"
                    }
                },

                Columns =
                {
                    dataGridColumn,dataGridColumn2
                }
            };

            var div = new HtmlElement("div", "ttt");

            div.AddLogicalChild(dataGrid);





        }

        public class MyClass:Bag
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


        }
        void XmlParse()
        {
            var model = new MyClass
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {

                        Year = 5,
                        LastName = "A",

                    },
                    new SimpleClass1
                    {
                        Year = 6,
                        LastName = "B"
                    }
                }
            };

            var dataGrid = (DataGrid)BuildAndGetFirstLogicalChild("<DataGrid ItemsSource='{Items}'>" +
                                                                  "     <DataGrid.Columns>" +
                                                                  "         <DataGridColumn Label='Label_A'    Name = 'LastName' />" +
                                                                  "         <DataGridColumn Label='Label_Year' Name = 'Year' />" +
                                                                  "     </DataGrid.Columns>" +
                                                                  "</DataGrid>", model);

          


           Trace.Log(this,dataGrid._root.Get(0).AsHtmlString());

            





        }
    }
}