using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{

    class ItemsControl : HtmlElement
    {
        public ItemsControl(string tag = null, string className = null) : base(tag, className)
        {
            BeforeConnectToLogicalParent += OnBeforeConnectToLogicalParent;
        }

        void OnBeforeConnectToLogicalParent(FrameworkElement arg)
        {
            ReRender();
        }

        void ReRender()
        {
            if (ItemsSource == null)
            {
                throw new ArgumentNullException(nameof(ItemsSource));
            }


            var list = ItemsSource as IList;
            if (list == null)
            {
                throw new ArgumentException("MustbeList:"+nameof(ItemsSource));
            }

            if (ItemTemplate == null)
            {
                throw new ArgumentNullException(nameof(ItemTemplate));
            }


            var len = list.Count;
            for (int i = 0; i < len; i++)
            {
                var itemData = list[i];


                var builder = new Builder
                {
                    _rootNode = ItemTemplate.Root,
                    DataContext = itemData,
                    // Caller = this
                };
                var item =  builder.Build();


               AddLogicalChild(item);
            }
        }
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

        public Template ItemTemplate{ get; set; }
        #endregion



        void RenderItem(object model, Type renderer)
        {
            var control = new Control();

        }


    }

    public class DataGrid:HtmlElement
    {
        
        // ObservableCollection<object> _observableCollection;

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
