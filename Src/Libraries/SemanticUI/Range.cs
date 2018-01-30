using System;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Windows;
using System.Windows.Controls;
using Bridge.Html5;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class Range : Control
    {
        #region Static Fields
        public static readonly DependencyProperty MaxProperty = DependencyProperty.Register("Max", typeof(int), typeof(Range), new PropertyMetadata(100));

        public static readonly DependencyProperty MinProperty = DependencyProperty.Register("Min", typeof(int), typeof(Range), new PropertyMetadata(default(int)));

        public static readonly DependencyProperty StepProperty = DependencyProperty.Register("Step", typeof(int), typeof(Range), new PropertyMetadata(1));

        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register("Value", typeof(int), typeof(Range), new PropertyMetadata(default(int)));
        #endregion

        #region Fields
        bool _isInMethod_OnUIValueChanged;

        dynamic _wrapper;
        #endregion

        #region Constructors
        public Range()
        {
            BeforeConnectToLogicalParent += parent => { InitRange(); };

            this.OnPropertyChanged(nameof(Min), InitRange);
            this.OnPropertyChanged(nameof(Max), InitRange);
            this.OnPropertyChanged(nameof(Step), InitRange);
            this.OnPropertyChanged(nameof(Value), UpdateUIValue);
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get { return "<div class = 'ui range' />"; }
        }

        public int Max
        {
            get { return (int) GetValue(MaxProperty); }
            set { SetValue(MaxProperty, value); }
        }

        public int Min
        {
            get { return (int) GetValue(MinProperty); }
            set { SetValue(MinProperty, value); }
        }

        public int Step
        {
            get { return (int) GetValue(StepProperty); }
            set { SetValue(StepProperty, value); }
        }

        public int Value
        {
            get { return (int) GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }
        #endregion

        #region Methods
        void InitRange()
        {
            if (_isInMethod_OnUIValueChanged)
            {
                return;
            }

            dynamic options = ObjectLiteral.Create<object>();

            // ReSharper disable once UnusedVariable
            dynamic me = this;

            options.min      = Min;
            options.max      = Max;
            options.step     = Step;
            options.start    = Value;
            options.onChange = Script.Write<Function>("function(value){  me.OnUIValueChanged(value);   };");

            dynamic root = _root;

            Window.SetTimeout(() => { _wrapper = root.range(options); }, 1);
        }

        [SuppressMessage("ReSharper", "UnusedMember.Local")]
        void OnUIValueChanged(int value)
        {
            if (_isInMethod_OnUIValueChanged)
            {
                return;
            }

            _isInMethod_OnUIValueChanged = true;
            Value                        = value;
            _isInMethod_OnUIValueChanged = false;
        }


        internal event Action OnUIValueUpdatedByCode;
        void UpdateUIValue()
        {

            _isInMethod_OnUIValueChanged = true;

            if (_wrapper == null)
            {
                return;
            }

            if (Value < Min)
            {
                throw new ArgumentException(nameof(Value) + $" is invalid. @Value:{Value} < {Min}");
            }

            if (Value > Max)
            {
                throw new ArgumentException(nameof(Value) + $" is invalid. @Value:{Value} > {Max}");
            }

            _wrapper?.range("set value", Value, true);

            OnUIValueUpdatedByCode?.Invoke();

            _isInMethod_OnUIValueChanged = false;
        }
        #endregion
    }
}