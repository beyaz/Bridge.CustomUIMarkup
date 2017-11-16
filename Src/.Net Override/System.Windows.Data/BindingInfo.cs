using System.ComponentModel;
using System.Linq.Expressions;

namespace System.Windows.Data
{
    public class BindingInfo
    {
        #region Public Properties
        public BindingMode BindingMode { get; set; }

        public object Source { get; set; }

        public string SourcePath
        {
            get { return Path?.Path; }
            set
            {
                Path = new PropertyPath(value);
            }
        }

        public PropertyPath Path
        {
            get;
            set;
        }

        public object Target { get; set; }

        public string TargetPropertyName { get; set; }
        #endregion

        #region Properties
        object TargetValue => Target.GetType().GetProperty(TargetPropertyName).GetValue(Target);
        #endregion

        #region Public Methods
        public static BindingInfo TryParseExpression(string value)
        {
            if (value == null)
            {
                return null;
            }

            value = value.Trim();

            if (value.StartsWith("{") == false)
            {
                return null;
            }

            if (value.EndsWith("}") == false)
            {
                return null;
            }

            var text = value.Substring(1, value.Length - 2);

            text = text.RemoveFromStart("Binding ");

            return new BindingInfo { SourcePath = text };
        }

        public void Connect()
        {
            if (TargetPropertyName != null)
            {
                var eventInfo = ReflectionHelper.FindEvent(Target, TargetPropertyName);
                if (eventInfo != null)
                {
                    var methodInfo = Source.GetType().GetMethod(SourcePath);

                    var handler = Delegate.CreateDelegate(typeof(Action), Source, methodInfo);
                    if (handler == null)
                    {
                        handler = Delegate.CreateDelegate(typeof(Action<int>), Source, methodInfo);
                    }
                    if (handler == null)
                    {
                        throw new ArgumentException(SourcePath);
                    }

                    eventInfo.AddEventHandler(Target, handler);

                    return;
                }
            }
            ConnectSourceToTarget();

            UpdateTarget();

            if (BindingMode == BindingMode.TwoWay)
            {
                ConnectTargetToSource();
            }
        }

        public virtual void UpdateSource(object newValue)
        {
            ReflectionHelper.SetPropertyValue(Source, SourcePath, newValue);
        }

        public virtual void UpdateTarget()
        {
            var newValue = ReflectionHelper.GetPropertyValue(Source, SourcePath);

            ReflectionHelper.SetPropertyValue(Target, TargetPropertyName, newValue);
        }
        #endregion

        #region Methods
        protected virtual void ConnectSourceToTarget()
        {
            var source = Source as INotifyPropertyChanged;
            if (source == null)
            {
                return;
            }

            source.PropertyChanged += (sender, e) =>
            {
                
                if (e.PropertyName == SourcePath)
                {
                    UpdateTarget();
                }
            };
        }

        protected virtual void ConnectTargetToSource()
        {
            var target = Target as INotifyPropertyChanged;
            if (target == null)
            {
                return;
            }

            target.PropertyChanged += (sender, e) =>
            {
                if (e.PropertyName == TargetPropertyName)
                {
                    UpdateSource(TargetValue);
                }
            };
        }
        #endregion
    }
}