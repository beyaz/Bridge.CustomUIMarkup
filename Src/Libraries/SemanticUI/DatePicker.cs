using System;
using System.Diagnostics.CodeAnalysis;
using System.Windows;
using System.Windows.Controls;

#pragma warning disable 169

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    [SuppressMessage("ReSharper", "UnusedVariable")]
    [SuppressMessage("ReSharper", "NotAccessedVariable")]
    public class DatePicker : Control
    {
        #region Fields
        FrameworkElement _inputText;
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
	}
};
root.calendar(settings);



");
            };
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div class='ui calendar'>" +
                                                       "    <div class='ui input left icon'>" +
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