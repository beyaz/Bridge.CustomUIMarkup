using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public enum DataGridCellEditorType
    {
        Text
    }

    public class DataGridColumn : Control
    {
        #region Public Properties
        public override string DefaultTemplateAsXml => "<th>{Label}</th>";
        #endregion

        #region DataGridCellEditorType EditorType
        public static readonly DependencyProperty EditorTypeProperty = DependencyProperty.Register(
            "EditorType", typeof(DataGridCellEditorType), typeof(DataGridColumn), new PropertyMetadata(default(DataGridCellEditorType)));

        public DataGridCellEditorType EditorType
        {
            get { return (DataGridCellEditorType) GetValue(EditorTypeProperty); }
            set { SetValue(EditorTypeProperty, value); }
        }
        #endregion

        #region string Label
        public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(
            "Label", typeof(string), typeof(DataGridColumn), new PropertyMetadata(default(string)));

        public string Label
        {
            get { return (string) GetValue(LabelProperty); }
            set { SetValue(LabelProperty, value); }
        }
        #endregion

        #region string Name
        public static readonly DependencyProperty NameProperty = DependencyProperty.Register(
            "Name", typeof(string), typeof(DataGridColumn), new PropertyMetadata(default(string)));

        public string Name
        {
            get { return (string) GetValue(NameProperty); }
            set { SetValue(NameProperty, value); }
        }
        #endregion
    }

    class DataGrid : MultiSelector
    {
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
            

        }
        #endregion

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

        void MarkSelectedRow(FrameworkElement element)
        {
            _selectedRow?._root.Css("background", "");

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

            var table = new HtmlElement("table","ui celled table");

            AddLogicalChild(table);

            table.AddVisualChild(_thead = new HtmlElement("thead"));

            _thead.AddVisualChild(_thead_first_tr = new HtmlElement("tr"));

            foreach (var columnInfo in Columns)
            {
                _thead_first_tr.AddVisualChild(columnInfo);
            }

            table.AddVisualChild(_tbody = new HtmlElement("tbody"));

            var len = list.Count;
            for (var i = 0; i < len; i++)
            {
                var itemData = list[i];

                var tr = new HtmlElement("tr");

                foreach (var columnInfo in Columns)
                {
                    var td = new HtmlElement("td");

                    var cellValue = ReflectionHelper.GetPropertyValue(itemData, columnInfo.Name);

                    if (columnInfo.EditorType == DataGridCellEditorType.Text)
                    {
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

                tr.On("click", () => { RaiseEvent_ItemClicked(itemData); });

                
            }


            var me = this;

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