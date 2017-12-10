using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
   public enum DataGridCellEditorType
    {
        Text
    }

   public class DataGridColumn:DependencyObject
   {

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
        public IList<DataGridColumn> Columns { get; } = new List<DataGridColumn>();


        #region Constructors
        public DataGrid(string className = null) : base("table", className)
        {
            BeforeConnectToLogicalParent += OnBeforeConnectToLogicalParent;
        }
        #endregion

        #region Methods
        void OnBeforeConnectToLogicalParent(FrameworkElement arg)
        {
            ReRender();
        }

        Template _headerTemplate =Template.CreateFromXml("<th>{Label}</th>");

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
            if (ItemsSource == null)
            {
                throw new ArgumentNullException(nameof(ItemsSource));
            }

            var list = ItemsSource as IList;
            if (list == null)
            {
                throw new ArgumentException("MustbeList:" + nameof(ItemsSource));
            }

           


            AddVisualChild(_thead= new HtmlElement("thead"));

            _thead.AddVisualChild(_thead_first_tr = new HtmlElement("tr"));

            
            

            foreach (var columnInfo in Columns)
            {
                _thead_first_tr.AddVisualChild(Builder.Build("<th>{Label}</th>", columnInfo));
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