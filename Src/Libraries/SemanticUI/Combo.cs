using System;
using System.Collections;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls.Primitives;
using Retyped;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class Combo : Selector
    {
        #region Constructors
        public Combo()
        {
            BeforeConnectToLogicalParent += parent => { _wrapper = _root.As<semantic_ui.JQuery>().dropdown(); };

            this.OnPropertyChanged(nameof(DisplayMemberPath), InitializeItemTemplate);
            this.OnPropertyChanged(nameof(SelectedValuePath), InitializeItemTemplate);

            this.OnPropertyChanged(nameof(DisplayMemberPath), Render);
            this.OnPropertyChanged(nameof(SelectedValuePath), Render);
            this.OnPropertyChanged(nameof(ItemsSource), Render);

            this.OnPropertyChanged(nameof(ItemsSource), ()=>OnPropertyChanged(nameof(SelectedValue)));

            this.OnPropertyChanged(nameof(SelectedValue), InitSelectedItemByUsingSelectedValue);
            this.OnPropertyChanged(nameof(SelectedValue), () =>
            {
                var el = _root;
                var selectedValue = SelectedValue;

                Script.Write("el.dropdown('set selected',selectedValue);");
                Script.Write("el.dropdown('refresh');");


            });

        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class = 'ui selection dropdown' WidthPercent = '100' >" +
                                                       "    <input type = 'hidden' value='{SelectedValue}'  x.Name = '_hidden' />" +
                                                       "    <i class = 'dropdown icon' />" +
                                                       "    <div class = 'default text' >{DefaultText}</div>" +
                                                       "    <div class = 'menu' x.Name='_menu' />" +
                                                       "</div>";
        #endregion


        void InitSelectedItemByUsingSelectedValue()
        {
            var enumerable = ItemsSource as IEnumerable;
            if (enumerable == null)
            {
                return;
            }

            var selectedValuePath = SelectedValuePath;
            if (selectedValuePath == null)
            {
                return;
            }

            var selectedValue = SelectedValue;


            foreach (var data in enumerable)
            {
                if (data == null)
                {
                    continue;
                }

                var propertyPath = new PropertyPath(selectedValuePath);

                propertyPath.Walk(data);

                var propertyValue = propertyPath.GetPropertyValue();

                if ((selectedValue == null && propertyValue == null) ||   selectedValue?.Equals(propertyValue) == true)
                {
                    SelectedItem = data;
                    return;
                }
            }
        }
        #region Methods
        internal override void ConnectItem(FrameworkElement item)
        {
            _menu.AddLogicalChild(item);
        }

        protected override void ClearItems()
        {
            _menu.ClearVisualChilds();
        }

        protected override void Render()
        {
            if (DisplayMemberPath == null ||
                SelectedValuePath == null)
            {
                return;
            }

            base.Render();
        }

        void InitializeItemTemplate()
        {
            ItemTemplate = Template.CreateFromXml("<div class='item' data-value='{" + SelectedValuePath + "}' InnerHTML='{" + DisplayMemberPath + "}' />");
        }
        #endregion

        #pragma warning disable 649
        #pragma warning disable 169
        FrameworkElement _menu;
        FrameworkElement _hidden;

        // ReSharper disable once NotAccessedField.Local
        object _wrapper;

        #pragma warning restore 169
        #pragma warning restore 649

        #region string DefaultText
        public static readonly DependencyProperty DefaultTextProperty = DependencyProperty.Register("DefaultText", typeof(string), typeof(Combo), new PropertyMetadata(default(string)));

        public string DefaultText
        {
            get { return (string) GetValue(DefaultTextProperty); }
            set { SetValue(DefaultTextProperty, value); }
        }
        #endregion
    }
}