using System.Collections;
using System.ComponentModel;
using System.Windows.Controls.Primitives;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI;

namespace System.Windows.Controls.Primitives
{
    public class Selector : ItemsControl
    {

        public Selector()
        {
            base.ItemClicked += OnItemClicked;
        }

        void OnItemClicked(object itemDataContext)
        {
            if (SelectedValuePath == null)
            {
                SelectedItem = itemDataContext;
                return;
            }

            SelectedItem = ReflectionHelper.GetPropertyValue(itemDataContext, SelectedValuePath);

        }
        #region object SelectedItem
        public static readonly DependencyProperty SelectedItemProperty = DependencyProperty.Register(
            "SelectedItem", typeof(object), typeof(Selector), new PropertyMetadata(default(object)));

        public object SelectedItem
        {
            get { return GetValue(SelectedItemProperty); }
            set { SetValue(SelectedItemProperty, value); }
        }
        #endregion


        #region  object SelectedValue
        public static readonly DependencyProperty SelectedValueProperty = DependencyProperty.Register(
          "SelectedValue", typeof(object), typeof(Selector), new PropertyMetadata(default(object)));

        public object SelectedValue
        {
            get { return GetValue(SelectedValueProperty); }
            set { SetValue(SelectedValueProperty, value); }
        } 
        #endregion


        #region string SelectedValuePath
        public static readonly DependencyProperty SelectedValuePathProperty = DependencyProperty.Register(
         "SelectedValuePath", typeof(string), typeof(Selector), new PropertyMetadata(default(string)));

        public string SelectedValuePath
        {
            get { return (string)GetValue(SelectedValuePathProperty); }
            set { SetValue(SelectedValuePathProperty, value); }
        } 
        #endregion
    }
}

namespace System.Windows.Controls
{
    public class ItemsControl : HtmlElement
    {
        #region Constructors
        public ItemsControl(string tag = null, string className = null) : base(tag, className)
        {
            BeforeConnectToLogicalParent += OnBeforeConnectToLogicalParent;

            this.OnPropertyChanged(nameof(ItemsSource), ReRender);
        }
        #endregion

        #region Methods
        void OnBeforeConnectToLogicalParent(FrameworkElement arg)
        {
            ReRender();
        }


        public event Action<object> ItemClicked;

        

        void ReRender()
        {
            ClearVisualChilds();
            ClearLogicalChilds();

            if (ItemsSource == null)
            {
#if IsTraceEnabled
                Trace.OperationWasCanceled(nameof(ReRender), nameof(ItemsSource) + "is null");

#endif
                return;
            }

            var list = ItemsSource as IList;
            if (list == null)
            {
                throw new ArgumentException("MustbeList:" + nameof(ItemsSource));
            }

            if (ItemTemplate == null)
            {
                throw new ArgumentNullException(nameof(ItemTemplate));
            }

            var len = list.Count;
            for (var i = 0; i < len; i++)
            {
                var itemData = list[i];

                var builder = new Builder
                {
                    _rootNode = ItemTemplate.Root,
                    DataContext = itemData
                    // Caller = this
                };
                var item = builder.Build();

                item.On("click", () =>
                {
                    ItemClicked?.Invoke(itemData);
                });

                AddLogicalChild(item);
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

        public Template ItemTemplate { get; set; }
        #endregion
    }

    public class ListBox : Selector
    {
    }
}