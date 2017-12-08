using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using Retyped;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class Combo : Control
    {
        #region Fields
#pragma warning disable 649
        FrameworkElement _menu, _hidden;
#pragma warning restore 649
        #endregion

        #region Constructors
        public Combo()
        {
            BeforeConnectToLogicalParent += parent => { _root.As<semantic_ui.JQuery>().dropdown(); };

            PropertyChanged += (s, e) =>
            {
                if (e.PropertyName == nameof(ItemsSource) ||
                    e.PropertyName == nameof(DisplayMemberPath) ||
                    e.PropertyName == nameof(SelectedValuePath))
                {
                    TryToBind();
                }
            };

            PropertyChanged += (e, args) =>
            {
                if (Options is string)
                {
                    SetOptionsFrom((Options + "").Split(','));
                }
            };
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class = 'ui selection dropdown'>" +
                                                       "    <input type = 'hidden' on.change ='ValueChanged' x.Name='_hidden' />" +
                                                       "    <i class = 'dropdown icon' />" +
                                                       "    <div class = 'default text' >{DefaultText}</div>" +
                                                       "    <div class = 'menu' x.Name='_menu' />" +
                                                       "</div>";
        #endregion

        #region Public Methods
        public void SetOptionsFrom(IEnumerable<string> options)
        {
            _menu.ClearVisualChilds();

            foreach (var option in options)
            {
                var optionElement = new HtmlElement("div", "item")
                {
                    InnerHTML = option
                };

                optionElement.Attr("data-value", option);

                _menu.AddLogicalChild(optionElement);
            }
        }
        #endregion

        #region Methods
        void TryToBind()
        {
            if (ItemsSource == null ||
                DisplayMemberPath == null ||
                SelectedValuePath == null)
            {
                return;
            }

            var enumerableItemSource = ItemsSource as IEnumerable;
            if (enumerableItemSource == null)
            {
                return;
            }

            _menu.ClearVisualChilds();

            foreach (var record in enumerableItemSource)
            {
                var optionElement = new HtmlElement("div", "item");

                var text = ReflectionHelper.GetPropertyValue(record, DisplayMemberPath) + "";
                var value = ReflectionHelper.GetPropertyValue(record, SelectedValuePath) + "";

                optionElement.InnerHTML = text;
                optionElement.Attr("data-value", value);

                _menu.AddLogicalChild(optionElement);
            }
        }

        // ReSharper disable once UnusedMember.Local
        void ValueChanged()
        {
            SelectedValue = _hidden.Val();
        }
        #endregion

        #region string DefaultText
        public static readonly DependencyProperty DefaultTextProperty = DependencyProperty.Register(
            "DefaultText", typeof(string), typeof(Combo), new PropertyMetadata(default(string)));

        public string DefaultText
        {
            get { return (string) GetValue(DefaultTextProperty); }
            set { SetValue(DefaultTextProperty, value); }
        }
        #endregion

        // jQuery _iconElement, _defaultTextElement, _menuElement, _hidden;

        #region object Options
        object _options;

        public object Options
        {
            get { return _options; }
            set
            {
                if (_options != value)
                {
                    _options = value;
                    OnPropertyChanged("Options");
                }
            }
        }
        #endregion

        #region combo
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

        #region string DisplayMemberPath
        string _displayMemberPath;

        public string DisplayMemberPath
        {
            get { return _displayMemberPath; }
            set
            {
                if (_displayMemberPath != value)
                {
                    _displayMemberPath = value;
                    OnPropertyChanged("DisplayMemberPath");
                }
            }
        }
        #endregion

        #region string SelectedValuePath
        string _selectedValuePath;

        public string SelectedValuePath
        {
            get { return _selectedValuePath; }
            set
            {
                if (_selectedValuePath != value)
                {
                    _selectedValuePath = value;
                    OnPropertyChanged("SelectedValuePath");
                }
            }
        }
        #endregion

        #region object SelectedValue
        object _selectedValue;

        public object SelectedValue
        {
            get { return _selectedValue; }
            set
            {
                if (_selectedValue != value)
                {
                    _selectedValue = value;
                    OnPropertyChanged("SelectedValue");
                }
            }
        }
        #endregion
        #endregion
    }
}