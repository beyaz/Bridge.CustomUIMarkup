using System.Collections.Generic;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.Test;

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
                    new DataGridColumn
                    {
                       Label = "Label_A",
                        Name = "LastName",
                    },

                    new DataGridColumn
                    {
                        Label = "Label_Year",
                        Name = "Year",
                    }
                }
            };

            var div = new HtmlElement("div", "ttt");

            div.AddLogicalChild(dataGrid);


            Trace.Log(this, div._el);



        }
    }
}