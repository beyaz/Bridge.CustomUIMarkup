﻿using System;
using System.Diagnostics.CodeAnalysis;
using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    [SuppressMessage("ReSharper", "UnusedVariable")]
    [SuppressMessage("ReSharper", "NotAccessedVariable")]
    public class DatePicker : Control
    {
        #region Fields
        #pragma warning disable 169
        FrameworkElement _inputText;
        #pragma warning restore 169

        #pragma warning disable 649
        FrameworkElement _ui_input;
        #pragma warning restore 649
        #endregion

        #region Constructors
        public DatePicker()
        {
            BeforeConnectToLogicalParent += parent =>
            {
                var root = _root;
                var me   = this;
                Script.Write(
                             @"

var settings = 
{
    type    : 'date',
    onChange:function (date, text, mode)
	{
		me.Value = date||null;
	},
    text:semantic_ui_calendar_text
};
root.calendar(settings);



");
            };
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class='ui calendar'>" +
                                                       "    <div x:Name = '_ui_input'  class='ui input left icon'>" +
                                                       "        <i class='calendar icon'/>" +
                                                       "        <input type = 'text' x.Name='_inputText'  placeHolder='{PlaceHolder,Mode=OneWay}'   />" +
                                                       "    </div>" +
                                                       "</div>";
        #endregion

        #region PlaceHolder
        public static readonly DependencyProperty PlaceHolderProperty = DependencyProperty.Register(nameof(PlaceHolder), typeof(string), typeof(DatePicker), new PropertyMetadata(null));

        public string PlaceHolder
        {
            get { return (string) GetValue(PlaceHolderProperty); }
            set { SetValue(PlaceHolderProperty, value); }
        }
        #endregion

        #region IsDisabled
        public static readonly DependencyProperty IsDisabledProperty = DependencyProperty.Register(nameof(IsDisabled), typeof(bool), typeof(DatePicker), new PropertyMetadata(false, OnIsDisabledChanged));

        public bool IsDisabled
        {
            get { return (bool) GetValue(IsDisabledProperty); }
            set { SetValue(IsDisabledProperty, value); }
        }

        static void OnIsDisabledChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (DatePicker) d;

            me._ui_input.Class = e.NewValue.ToBoolean() ? "ui disabled input left icon" : "ui input left icon";
        }
        #endregion

        #region DateTime? Value
        public static readonly DependencyProperty ValueProperty =
            DependencyProperty.Register("Value", typeof(DateTime?), typeof(DatePicker), new PropertyMetadata(default(DateTime?), OnValueChanged));

        public DateTime? Value
        {
            get { return (DateTime?) GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }

        bool _isUpdatingUI;

        // ReSharper disable once UnusedParameter.Local
        void UpdateUI(DateTime? newValue)
        {
            if (_isUpdatingUI)
            {
                return;
            }

            _isUpdatingUI = !_isUpdatingUI;

            var root = _root;

            Script.Write("root.calendar('set date', newValue);");

            _isUpdatingUI = false;
        }

        static void OnValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            ((DatePicker) d).UpdateUI((DateTime?) e.NewValue);
        }
        #endregion
    }
}