using System.Collections;
using System.ComponentModel;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.UI;

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
            return new ArgumentException("MustbeList:" + nameof(ItemsSource) + "@ItemsSource.Type:" + ItemsSource.GetType().FullName);
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

            var list = ItemsSource as IList;
            if (list == null)
            {
                throw ItemSourceMustbe_Enumerable();
            }

            ClearItems();

            var itemTemplate = ItemTemplate;

            var len = list.Count;
            for (var i = 0; i < len; i++)
            {
                var itemData = list[i];

                FrameworkElement item = null;
                if (itemTemplate != null)
                {
                    var fe = new FrameworkElement
                    {
                        DataContext = itemData
                    };

                    Builder.LoadComponent(fe, ItemTemplate.Root);

                    item = fe.GetLogicalChildAt(0);
                }
                else
                {
                    var textBlock       = Builder.Create<TextBlock>();
                    textBlock.InnerHTML = itemData?.ToString();

                    item = textBlock;
                }

                item.On("click", () => { ItemClicked?.Invoke(itemData); });

                ConnectItem(item);
            }
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