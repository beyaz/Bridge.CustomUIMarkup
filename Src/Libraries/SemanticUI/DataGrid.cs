using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
   public enum DataGridCellEditorType
    {
        Text
    }
    

    public class DataGridColumn: Control
    {
        public override string DefaultTemplateAsXml => "<th>{Label}</th>";

        #region DataGridCellEditorType EditorType
        public static readonly DependencyProperty EditorTypeProperty = DependencyProperty.Register(
          "EditorType", typeof(DataGridCellEditorType), typeof(DataGridColumn), new PropertyMetadata(default(DataGridCellEditorType)));

        public DataGridCellEditorType EditorType
        {
            get { return (DataGridCellEditorType)GetValue(EditorTypeProperty); }
            set { SetValue(EditorTypeProperty, value); }
        } 
        #endregion

        #region string Label
        public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(
         "Label", typeof(string), typeof(DataGridColumn), new PropertyMetadata(default(string)));

        public string Label
        {
            get { return (string)GetValue(LabelProperty); }
            set { SetValue(LabelProperty, value); }
        } 
        #endregion

        #region string Name
        public static readonly DependencyProperty NameProperty = DependencyProperty.Register(
            "Name", typeof(string), typeof(DataGridColumn), new PropertyMetadata(default(string)));

        public string Name
        {
            get { return (string)GetValue(NameProperty); }
            set { SetValue(NameProperty, value); }
        } 
        #endregion

       

    }


   

    class DataGrid : HtmlElement
    {



        #region string ColumnNames
        string _columnNames;
        public string ColumnNames
        {
            get { return _columnNames; }
            set
            {
                if (_columnNames != value)
                {
                    _columnNames = value;
                    OnPropertyChanged("ColumnNames");
                }
            }
        }
        #endregion




        void ParseColumnNames()
        {
            Columns.Clear();

            foreach (var value1 in ColumnNames.Split(',').Where(x => !string.IsNullOrWhiteSpace(x)))
            {
                var arr = value1.Split(':').Where(x=>!string.IsNullOrWhiteSpace(x)).ToArray();
                Columns.Add(new DataGridColumn
                {
                    Name = (arr[0]+"").Trim(),
                    Label = (arr[1] + "").Trim(),
                });
            }
        }

        public IList<DataGridColumn> Columns { get; } = new List<DataGridColumn>();


        #region Constructors
        public DataGrid(string className = null) : base("table", className)
        {
            BeforeConnectToLogicalParent += OnBeforeConnectToLogicalParent;

            this.OnPropertyChanged(nameof(ColumnNames), ParseColumnNames);

            this.OnPropertyChanged(nameof(ItemsSource), ReRender);
        }
        #endregion

        #region Methods
        void OnBeforeConnectToLogicalParent(FrameworkElement arg)
        {
            ReRender();
        }


        string SelectedRowBackground = "#27ae60";



        FrameworkElement _selectedRow;

        void MarkSelectedRow(FrameworkElement element)
        {
            _selectedRow?._root.Css("background","");

            element.Root.Css("background", SelectedRowBackground);

            _selectedRow = element;
        }

        HtmlElement _thead, _thead_first_tr, _tbody;


       

        void ReRender()
        {

            ClearVisualChilds();
            ClearLogicalChilds();

            if (ItemsSource == null)
            {
#if IsTraceEnabled
                Trace.OperationWasCanceled(nameof(ReRender), nameof(ItemsSource) + "is null.");

#endif

                return;
            }

            var list = ItemsSource as IList;
            if (list == null)
            {
                throw new ArgumentException("MustbeList:" + nameof(ItemsSource) + "@ItemsSource.Type:" + ItemsSource?.GetType().FullName);
            }

           


            AddVisualChild(_thead= new HtmlElement("thead"));

            _thead.AddVisualChild(_thead_first_tr = new HtmlElement("tr"));

            
            

            foreach (var columnInfo in Columns)
            {
                _thead_first_tr.AddVisualChild(columnInfo);
            }

            AddVisualChild(_tbody = new HtmlElement("tbody"));





            var len = list.Count;
            for (var i = 0; i < len; i++)
            {
                var itemData = list[i];

                var tr = new HtmlElement("tr");

                foreach (var columnInfo in Columns)
                {
                    var td = new HtmlElement("td");

                    var cellValue = ReflectionHelper.GetPropertyValue(itemData,columnInfo.Name);

                    

                    if (columnInfo.EditorType == DataGridCellEditorType.Text)
                    {
                        td.InnerHTML = cellValue?.ToString();
                    }
                    else
                    {
                        throw new NotImplementedException(columnInfo.EditorType.ToString());
                    }

                    tr.AddLogicalChild(td);

                }

                _tbody.AddLogicalChild(tr);

                tr.On("click", () => { MarkSelectedRow(tr); });
            }



        }
        #endregion

        #region object ItemsSource
        object _itemsSource;

        public object ItemsSource
        {
            get { return _itemsSource; }
            set
            {
                if (_itemsSource != value)
                {
                    _itemsSource = value;
                    OnPropertyChanged("ItemsSource");
                }
            }
        }

        #endregion
    }
}