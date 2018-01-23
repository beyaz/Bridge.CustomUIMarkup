using System.Collections;
using System.ComponentModel;

namespace System.Windows.Controls
{
    public class ItemsControl : Control
    {
        #region Constructors
        public ItemsControl()
        {
            AfterLogicalChildAdd += AddVisualChild;

            BeforeConnectToLogicalParent += OnBeforeConnectToLogicalParent;

            this.OnPropertyChanged(nameof(ItemsSource), Render);
        }
        #endregion

        #region Public Events
        public event Action<object> ItemClicked;
        #endregion

        #region Public Properties
        public override string   DefaultTemplateAsXml => "<div />";
        public          Template ItemTemplate         { get; set; }
        #endregion

        #region Methods
        internal virtual void ConnectItem(FrameworkElement item)
        {
            AddLogicalChild(item);
        }

        protected virtual void ClearItems()
        {
            ClearVisualChilds();
            ClearLogicalChilds();
        }

        protected ArgumentException ItemSourceMustbe_Enumerable()
        {
            return new ArgumentException("Mustbe implement 'IEnumerable':" + nameof(ItemsSource) + "@ItemsSource.Type:" + ItemsSource.GetType().FullName);
        }

        protected void RaiseEvent_ItemClicked(object itemDataContext)
        {
            ItemClicked?.Invoke(itemDataContext);
        }

        protected virtual void Render()
        {
            if (ItemsSource == null)
            {
                return;
            }

            var records = ItemsSource as IEnumerable;
            if (records == null)
            {
                throw ItemSourceMustbe_Enumerable();
            }

            ClearItems();

            var itemTemplate = ItemTemplate;

            foreach (var itemData in records)
            {
                FrameworkElement item = null;
                if (itemTemplate != null)
                {
                    var fe = new FrameworkElement
                    {
                        DataContext = itemData
                    };

                    UIBuilder.LoadComponent(fe, ItemTemplate.Root);

                    item = fe.GetLogicalChildAt(0);
                }
                else
                {
                    item = CreateItemRendererControlForStringContent(itemData?.ToString());
                }

                var data = itemData;
                item.On("click", () => { ItemClicked?.Invoke(data); });

                ConnectItem(item);
            }

            AfterRenderCompleted?.Invoke();
        }

        public event Action AfterRenderCompleted;

        protected virtual FrameworkElement CreateItemRendererControlForStringContent(string content)
        {
            var textBlock       = UIBuilder.Create<TextBlock>();

            textBlock.InnerHTML = content;

            return textBlock;
        }

        void OnBeforeConnectToLogicalParent(FrameworkElement arg)
        {
            Render();
        }
        #endregion

        #region DisplayMemberPath
        public static readonly DependencyProperty DisplayMemberPathProperty = DependencyProperty.Register(nameof(DisplayMemberPath), typeof(string), typeof(ItemsControl), new PropertyMetadata(default(string)));

        public string DisplayMemberPath
        {
            get { return (string) GetValue(DisplayMemberPathProperty); }
            set { SetValue(DisplayMemberPathProperty, value); }
        }
        #endregion

        #region object ItemsSource
        public static readonly DependencyProperty ItemsSourceProperty = DependencyProperty.Register(nameof(ItemsSource), typeof(object), typeof(ItemsControl), new PropertyMetadata(default(object)));

        public object ItemsSource
        {
            get { return GetValue(ItemsSourceProperty); }
            set { SetValue(ItemsSourceProperty, value); }
        }
        #endregion
    }
}