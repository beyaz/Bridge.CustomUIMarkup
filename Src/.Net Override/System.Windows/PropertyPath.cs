using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;

namespace System.Windows
{
    public class PropertyPath
    {
        #region Fields
        internal readonly List<Trigger> Triggers = new List<Trigger>();
        #endregion

        #region Constructors
        public PropertyPath(string path)
        {
            Path = path;
        }
        #endregion

        #region Public Properties
        public string Path { get; }
        #endregion

        #region Properties
        Trigger LastTrigger => Triggers[Triggers.Count - 1];
        #endregion

        #region Public Methods
        public static implicit operator PropertyPath(string path)
        {
            return new PropertyPath(path);
        }

        public void Clear()
        {
            Triggers.ForEach(t => t.StopListen());
            Triggers.Clear();
        }

        public object GetPropertyValue()
        {
            if (Triggers.Count == 0)
            {
                throw new InvalidOperationException("PropertyPathProblem:" + Path);
            }

            var lastTrigger = LastTrigger;
            var instance = lastTrigger.Instance;
            var propertyName = lastTrigger.PropertyName;

            var value = ReflectionHelper.GetPropertyValue(instance, propertyName);

            return value;
        }

        public void Listen(object instance, Action onPropertyValueChanged)
        {
            Walk(instance);

            var len = Triggers.Count;
            var last = len - 1;

            for (var i = 0; i < len; i++)
            {
                var trigger = Triggers[i];
                //if (i == last)
                //{
                //    trigger.OnPropertyValueChanged = onPropertyValueChanged;
                //    trigger.Listen();
                //    continue;
                //}

                trigger.OnPropertyValueChanged = () =>
                {
                    Listen(instance, onPropertyValueChanged);
                    onPropertyValueChanged();
                };
                trigger.Listen();
            }
        }

        public void SetPropertyValue(object value)
        {
            var lastTrigger = LastTrigger;
            var instance = lastTrigger.Instance;
            var propertyName = lastTrigger.PropertyName;

            var propertyType = ReflectionHelper.FindProperty(instance, propertyName)?.PropertyType;
            if (propertyType != null)
            {
                value =  Cast.To(value, propertyType, CultureInfo.CurrentCulture);
            }

            ReflectionHelper.SetPropertyValue(instance, propertyName, value);
        }

        

        public void Walk(object instance)
        {
            Clear();

            ParsePath(instance, Path);
        }
        #endregion

        internal bool IsNotReadyToUpdate => !_pathLastNodeIsReachable;

        bool _pathLastNodeIsReachable = true;
        #region Methods
        internal void ParsePath(object instance, string path)
        {
            while (true)
            {
                if (instance == null)
                {
                    _pathLastNodeIsReachable = false;
                    return;
                }

                var firstDat = path.IndexOf('.');

                if (firstDat < 0)
                {
                    Triggers.Add(new Trigger
                    {
                        Instance = instance,
                        PropertyName = path
                    });
                    return;
                }

                var propertyName = path.Substring(0, firstDat);

                Triggers.Add(new Trigger
                {
                    Instance = instance,
                    PropertyName = propertyName
                });

                instance = ReflectionHelper.GetPropertyValue(instance, propertyName);

                path = path.Substring(firstDat + 1);
            }
        }
        #endregion

        internal class Trigger
        {
            #region Fields
            public object Instance;

            public Action OnPropertyValueChanged;
            public string PropertyName;
            #endregion

            #region Properties
            INotifyPropertyChanged InstanceAsNotifyPropertyChanged => Instance as INotifyPropertyChanged;
            #endregion

            #region Public Methods
            public void Listen()
            {
                if (InstanceAsNotifyPropertyChanged == null)
                {
                    return;
                }
                InstanceAsNotifyPropertyChanged.PropertyChanged += OnChange;
            }

            public void StopListen()
            {
                if (InstanceAsNotifyPropertyChanged == null)
                {
                    return;
                }
                InstanceAsNotifyPropertyChanged.PropertyChanged -= OnChange;
            }

            public override string ToString()
            {
                return Instance + "->" + PropertyName;
            }
            #endregion

            #region Methods
            void OnChange(object sender, PropertyChangedEventArgs e)
            {
                if (e.PropertyName == PropertyName)
                {
                    OnPropertyValueChanged();
                }
            }
            #endregion
        }
    }
}