using System.Collections.Generic;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class DataGridTest : TestBase
    {
        public static void RunAll()
        {
            new DataGridTest().Simple();
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
    }
}