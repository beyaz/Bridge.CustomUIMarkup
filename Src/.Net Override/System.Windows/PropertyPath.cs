using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace System.Windows
{
    public class PropertyPath
    {
        public static implicit operator PropertyPath(string path)
        {
            return new PropertyPath(path);
        }

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

        #region Public Methods
        public void Clear()
        {
            Triggers.ForEach(t => t.StopListen());
            Triggers.Clear();
        }

        public void Walk(object instance)
        {
            Clear();

            ParsePath(instance, Path);
        }

        public void Listen(object instance, Action onPropertyValueChanged)
        {
           Walk(instance);

            foreach (var trigger in Triggers)
            {
                trigger.OnPropertyValueChanged = onPropertyValueChanged;
                trigger.Listen();
            }
        }
        #endregion

        #region Methods
        internal void ParsePath(object instance, string path)
        {
            while (true)
            {
                if (instance == null)
                {
                    return;
                }

                var firstDat = path.IndexOf('.');

                if (firstDat < 0)
                {
                    Triggers.Add(new Trigger {Instance = instance, PropertyName = path});
                    return;
                }

                var propertyName = path.Substring(0, firstDat);

                Triggers.Add(new Trigger {Instance = instance, PropertyName = propertyName});

                instance = ReflectionHelper.GetPropertyValue(instance, propertyName);

                path = path.Substring(firstDat + 1);
            }
        }
        #endregion


        public object GetPropertyValue()
        {
            var lastTrigger = Triggers.Last();

            return ReflectionHelper.GetPropertyValue(lastTrigger.Instance, lastTrigger.PropertyName);
        }
        public void SetPropertyValue(object value)
        {
            var lastTrigger = Triggers.Last();

            ReflectionHelper.SetPropertyValue(lastTrigger.Instance, lastTrigger.PropertyName,value);
        }

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