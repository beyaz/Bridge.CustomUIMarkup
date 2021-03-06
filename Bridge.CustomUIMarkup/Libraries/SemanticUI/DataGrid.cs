﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Windows;
using System.Windows.Controls.Primitives;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class DataGrid : MultiSelector
    {
        public override string DefaultTemplateAsXml => "<div  />";
        #region Fields
        FrameworkElement _selectedRow;

        HtmlElement _thead, _thead_first_tr, _tbody;

#pragma warning disable 169
        object _wrapper;
#pragma warning restore 169

        string SelectedRowBackground = "#27ae60";
        #endregion

        #region Constructors
        public DataGrid()
        {
            BeforeConnectToLogicalParent += OnBeforeConnectToLogicalParent;

            this.OnPropertyChanged(nameof(ColumnNames), ParseColumnNames);

            AfterConnectToLogicalParent += () => { this.OnPropertyChanged(nameof(ItemsSource), ReRender); };

            Loaded += (s, e) => { this.OnPropertyChanged(nameof(SelectedItem), OnSelectedItemChanged); };


        }
        #endregion

        void OnSelectedItemChanged()
        {
            if (SelectedItem == null)
            {
                ClearSelectedRow();
                _selectedRow = null;
                return;
            }

            var records = ItemsSource as IEnumerable;
            if (records == null)
            {
                return;
            }

            var rowIndex = 0;
            foreach (var record in records)
            {
                if (SelectedItem.Equals(record))
                {
                    SelectedItem = record;
                    break;
                }

                rowIndex++;
            }

            var childs = _tbody.GetLogicalChilderen();

            if (childs.Count<=rowIndex)
            {
                return;
            }

            var tr = childs[rowIndex];

            MarkSelectedRow(tr);
        }

        #region Public Properties
        public IList<DataGridColumn> Columns { get; } = new List<DataGridColumn>();
        #endregion

        #region Methods
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        static void Wrap(object me, object root)
        {
            Script.Write(@"

setTimeout(function()
{
    var options = 
    {
        destroy:true,
        language:dataTables_language   
    };

    me._wrapper = root.DataTable(options); 

},0) ");
        }

        void ClearSelectedRow()
        {
            _selectedRow?._root.Css("background", "");
        }

        void MarkSelectedRow(FrameworkElement element)
        {
            if (_selectedRow == element )
            {
                return;
            }
            ClearSelectedRow();

            element.Root.Css("background", SelectedRowBackground);

            _selectedRow = element;
        }

        void OnBeforeConnectToLogicalParent(FrameworkElement arg)
        {
            ReRender();
        }

        void ParseColumnNames()
        {
            Columns.Clear();

            foreach (var value1 in ColumnNames.Split(',').Where(x => !string.IsNullOrWhiteSpace(x)))
            {
                var arr = value1.Split(':').Where(x => !string.IsNullOrWhiteSpace(x)).ToArray();
                Columns.Add(new DataGridColumn
                {
                    Name = (arr[0] + "").Trim(),
                    Label = (arr[1] + "").Trim()
                });
            }
        }

        void ReRender()
        {
           

            if (ItemsSource == null)
            {
                return;
            }

            

            var records = ItemsSource as IEnumerable;
            if (records == null)
            {
                throw new ArgumentException("Mustbe implement 'IEnumerable':" + nameof(ItemsSource) + "@ItemsSource.Type:" + ItemsSource?.GetType().FullName);
            }

            ClearVisualChilds();
            ClearLogicalChilds();

            var table = new HtmlElement("table","ui celled table");

            AddLogicalChild(table);

            table.AddVisualChild(_thead = new HtmlElement("thead"));

            _thead.AddVisualChild(_thead_first_tr = new HtmlElement("tr"));

            foreach (var columnInfo in Columns)
            {
                _thead_first_tr.AddVisualChild(columnInfo);
            }

            table.AddVisualChild(_tbody = new HtmlElement("tbody"));

            foreach (var itemData in records)
            {
                var tr = new HtmlElement("tr");

                foreach (var columnInfo in Columns)
                {
                    var td = new HtmlElement("td");

                    

                    if (columnInfo.EditorType == DataGridCellEditorType.Text)
                    {
                        var propertyPath = new PropertyPath(columnInfo.Name);
                        propertyPath.Walk(itemData);
                        var cellValue = propertyPath.GetPropertyValue();

                        td.InnerHTML = cellValue?.ToString();
                    }
                    else
                    {
                        throw new NotImplementedException(columnInfo.EditorType.ToString());
                    }

                    //var bindingInfo = new BindingInfo
                    //{
                    //    Source = itemData,
                    //    SourcePath = columnInfo.Name,
                    //    BindingMode = BindingMode.OneWay,
                    //    Target = td,
                    //    TargetPath = nameof(td.InnerHTML)
                    //};
                    //bindingInfo.Connect();

                    tr.AddLogicalChild(td);
                }

                _tbody.AddLogicalChild(tr);

                tr.On("click", () => { MarkSelectedRow(tr); });

                var data = itemData;
                tr.On("click", () => { RaiseEvent_ItemClicked(data); });
            }


            var me = this;

            OnSelectedItemChanged();

            Wrap(me, table._root);
        }
        #endregion

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

        
    }
}