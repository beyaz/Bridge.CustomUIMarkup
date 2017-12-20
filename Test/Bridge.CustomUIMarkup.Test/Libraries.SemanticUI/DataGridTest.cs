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
            new DataGridTest().XmlParse();
        }

        void Simple()
        {
            var dataGridColumn = Builder.Create<DataGridColumn>();
            dataGridColumn.Label = "Label_A";
            dataGridColumn.Name = "LastName";


            var dataGridColumn2 = Builder.Create<DataGridColumn>();
            dataGridColumn2.Label = "Label_Year";
            dataGridColumn2.Name = "Year";

            var itemsSource = new List<SimpleClass1>
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
            };

            var dataGrid = Builder.Create<DataGrid>();
            dataGrid.Columns.Add(dataGridColumn);
            dataGrid.Columns.Add(dataGridColumn2);

           

            var div = new HtmlElement("div", "ttt");

            div.AddLogicalChild(dataGrid);

            dataGrid.ItemsSource = itemsSource;





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

            public Labels Label { get; set; }=new Labels();

        }

        public class Labels
        {
            public string XXX { get; set; } = Label_XXX;
        }

        const string Label_XXX= "A3fq136hqw_5";

        void XmlParse()
        {
            var model = new MyClass
            {
                Items = new List<SimpleClass1>
                {
                    new SimpleClass1
                    {

                        Year = 5,
                        LastName = "A"

                    },
                    new SimpleClass1
                    {
                        Year = 6,
                        LastName = "B"
                    }
                }
            };

            var xmlString = "<DataGrid ItemsSource='{Items}'>" +
                            "     <DataGrid.Columns>" +
                            "         <DataGridColumn Label='{Label.XXX}'    Name = 'LastName' />" +
                            "         <DataGridColumn Label='Label_Year' Name = 'Year' />" +
                            "     </DataGrid.Columns>" +
                            "</DataGrid>";

            var dataGrid = (DataGrid)BuildAndGetFirstLogicalChild(xmlString, model);

            var asHtmlString = dataGrid._root.Get(0).AsHtmlString();

            Assert.True(asHtmlString.Contains(Label_XXX));

            





        }
    }
}