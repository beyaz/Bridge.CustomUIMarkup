using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using Bridge.jQuery2;
using Retyped;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class Combo : FrameworkElement
    {
        #region Fields
        jQuery _iconElement, _defaultTextElement, _menuElement, _hidden;
        #endregion

        #region Constructors
        public Combo()
        {
            PropertyChanged += (s, e) =>
            {
                if (e.PropertyName == nameof(ItemsSource) ||
                    e.PropertyName == nameof(DisplayMemberPath) ||
                    e.PropertyName == nameof(SelectedValuePath))
                {
                    TryToBind();
                }
            };
        }
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = DOM.div("ui selection dropdown");

            _hidden = DOM.input("hidden").AppendTo(_root).On("change", ValueChanged);

            _iconElement = DOM.i("dropdown icon").AppendTo(_root);
            _defaultTextElement = DOM.div("default text").AppendTo(_root);
            _menuElement = DOM.div("menu").AppendTo(_root);

            PropertyChanged += (e, args) =>
            {
                if (Options is string)
                {
                    SetOptionsFrom((Options + "").Split(','));
                }
            };

            _root.As<semantic_ui.JQuery>().dropdown();
        }

        public void SetOptionsFrom(IEnumerable<string> options)
        {
            _menuElement.Empty();

            foreach (var option in options)
            {
                var optionElement = DOM.div("item");

                optionElement.Html(option);
                optionElement.Attr("data-value", option);

                _menuElement.Append(optionElement);
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

            _menuElement.Empty();

            foreach (var record in enumerableItemSource)
            {
                var optionElement = DOM.div("item");

                var text = ReflectionHelper.GetPropertyValue(record, DisplayMemberPath) + "";
                var value = ReflectionHelper.GetPropertyValue(record, SelectedValuePath) + "";

                optionElement.Html(text);
                optionElement.Attr("data-value", value);

                _menuElement.Append(optionElement);
            }
        }

        void ValueChanged()
        {
            SelectedValue = _hidden.Val();
        }
        #endregion

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