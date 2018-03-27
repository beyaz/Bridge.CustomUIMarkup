using System.ComponentModel;

namespace System.Windows.Controls.Primitives
{
    public class Selector : ItemsControl
    {
        #region Constructors
        public Selector()
        {
            ItemClicked += OnItemClicked;

        }
        #endregion

        
        #region Methods
        void OnItemClicked(object itemDataContext)
        {
            SelectedItem = itemDataContext;
        }
        #endregion

        #region object SelectedItem
        public static readonly DependencyProperty SelectedItemProperty = DependencyProperty.Register("SelectedItem", typeof(object), typeof(Selector), new PropertyMetadata(default(object)));

        public object SelectedItem
        {
            get { return GetValue(SelectedItemProperty); }
            set { SetValue(SelectedItemProperty, value); }
        }
        #endregion

        #region  object SelectedValue
        public static readonly DependencyProperty SelectedValueProperty = DependencyProperty.Register("SelectedValue", typeof(object), typeof(Selector), new PropertyMetadata(default(object)));

        public object SelectedValue
        {
            get { return GetValue(SelectedValueProperty); }
            set { SetValue(SelectedValueProperty, value); }
        }
        #endregion

        #region string SelectedValuePath
        public static readonly DependencyProperty SelectedValuePathProperty = DependencyProperty.Register("SelectedValuePath", typeof(string), typeof(Selector), new PropertyMetadata(default(string)));

        public string SelectedValuePath
        {
            get { return (string) GetValue(SelectedValuePathProperty); }
            set { SetValue(SelectedValuePathProperty, value); }
        }
        #endregion
    }
}