using System;
using System.Diagnostics.CodeAnalysis;
using System.Windows;
using System.Windows.Controls;




namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    [SuppressMessage("ReSharper", "UnusedVariable")]
    [SuppressMessage("ReSharper", "NotAccessedVariable")]
    public class DatePicker : Control
    {

        #region IsDisabled
        public static readonly DependencyProperty IsDisabledProperty = DependencyProperty.Register(nameof(IsDisabled), typeof(bool), typeof(DatePicker), new PropertyMetadata(false, OnIsDisabledChanged));

        public bool IsDisabled
        {
            get { return (bool)GetValue(IsDisabledProperty); }
            set { SetValue(IsDisabledProperty, value); }
        }
        static void OnIsDisabledChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var me = (DatePicker)d;

            me._ui_input.Class = e.NewValue.ToBoolean() ? "ui disabled input left icon" : "ui input left icon";
        }
        #endregion



        #region Fields
        #pragma warning disable 169
        FrameworkElement _inputText;
        #pragma warning restore 169

        #pragma warning disable 649
        FrameworkElement  _ui_input;
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
                                                       "    <div x.Name='_ui_input'  class='ui input left icon'>" +
                                                       "        <i class='calendar icon'/>" +
                                                       "        <input type = 'text' x.Name='_inputText'/>" +
                                                       "    </div>" +
                                                       "</div>";
        #endregion

        #region DateTime? Value
        public static readonly DependencyProperty ValueProperty =
            DependencyProperty.Register("Value", typeof(DateTime?), typeof(DatePicker), new PropertyMetadata(default(DateTime?), OnValueChanged));

        public DateTime? Value
        {
            get { return (DateTime?) GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }

        static void OnValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var datePicker = (DatePicker) d;

            var root  = datePicker._root;
            var value = e.NewValue as DateTime?;

            Script.Write("root.calendar('set date',value);");
        }
        #endregion
    }
}