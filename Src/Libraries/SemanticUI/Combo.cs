﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using Retyped;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{

    public class DatePicker : Control
    {
        #region DateTime? Value
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register(
           "Value", typeof(DateTime?), typeof(DatePicker), new PropertyMetadata(default(DateTime?), OnValueChanged));

        public DateTime? Value
        {
            get { return (DateTime?)GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }

        static void OnValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var datePicker = (DatePicker)d;

            var root = datePicker._root;
            var value = e.NewValue as DateTime?;
            var valueAsString = "";
            if (value.HasValue)
            {
                valueAsString = value.ToString();
            }

            Script.Write("root.calendar('set date',valueAsString);");
        }
        #endregion


        public DatePicker()
        {
            object _wrapper;

            BeforeConnectToLogicalParent += parent =>
            {
                var root = _root;
                Script.Write("root.calendar({type: 'date'});");
            };

        }
        #region string DefaultText
        public static readonly DependencyProperty DefaultTextProperty = DependencyProperty.Register(
            "DefaultText", typeof(string), typeof(DatePicker), new PropertyMetadata(default(string)));

        public string DefaultText
        {
            get { return (string)GetValue(DefaultTextProperty); }
            set { SetValue(DefaultTextProperty, value); }
        }
        #endregion

        public override string DefaultTemplateAsXml => "<div class='ui calendar'>" +
                                                       "    <div class='ui input left icon'>" +
                                                       "        <i class='calendar icon'/>" +
                                                       "        <input type='text' placeholder='{DefaultText}'/>" +
                                                       "    </div>" +
                                                       "</div>";

    }
    public class Combo : Control
    {
        #region Fields
#pragma warning disable 649
        FrameworkElement _menu, _hidden;
        object _wrapper;
#pragma warning restore 649
        #endregion

        #region Constructors
        public Combo()
        {
            BeforeConnectToLogicalParent += parent =>
            {
                _wrapper = _root.As<semantic_ui.JQuery>().dropdown();

                PropertyChanged += (e, args) =>
                {
                    if (Options is string)
                    {
                        SetOptionsFrom((Options + "").Split(','));
                    }

                    if (args.PropertyName == nameof(SelectedValue))
                    {
                        _hidden._root.Val(args.NewValue + "");
                    }
                };
            };

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

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class = 'ui selection dropdown'>" +
                                                       "    <input type = 'hidden' value='{SelectedValue}'  x.Name = '_hidden' />" +
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