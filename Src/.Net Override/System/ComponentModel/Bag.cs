using System.Collections.Generic;

namespace System.ComponentModel
{
    /// <summary>
    ///     The bag
    /// </summary>
    /// <seealso cref="System.ComponentModel.INotifyPropertyChanged" />
    [Serializable]
    public class Bag : INotifyPropertyChanged
    {
        #region Fields
        /// <summary>
        ///     The entries
        /// </summary>
        readonly Dictionary<string, object> _entries = new Dictionary<string, object>();
        #endregion

        #region Public Indexers
        /// <summary>
        ///     Gets or sets the <see cref="System.Object" /> with the specified property name.
        /// </summary>
        /// <value>
        ///     The <see cref="System.Object" />.
        /// </value>
        /// <param name="propertyName">Name of the property.</param>
        /// <returns></returns>
        public new object this[string propertyName]
        {
            get { return GetValue(propertyName); }
            set { SetValue(propertyName, value); }
        }
        #endregion

        #region Public Methods
        /// <summary>
        ///     Determines whether the specified property name contains key.
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        /// <returns>
        ///     <c>true</c> if the specified property name contains key; otherwise, <c>false</c>.
        /// </returns>
        public bool ContainsKey(string propertyName)
        {
            return _entries.ContainsKey(propertyName);
        }

        /// <summary>
        ///     Determines whether the specified property name contains key.
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        /// <returns>
        ///     <c>true</c> if the specified property name contains key; otherwise, <c>false</c>.
        /// </returns>
        public bool ContainsKey(Enum propertyName)
        {
            return ContainsKey(propertyName.ToString());
        }

        /// <summary>
        ///     Gets the value.
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        /// <returns></returns>
        public object GetValue(string propertyName)
        {
            object value = null;
            _entries.TryGetValue(propertyName, out value);
            return value;
        }

        /// <summary>
        ///     Sets the value.
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        /// <param name="value">The value.</param>
        public void SetValue(string propertyName, object value)
        {
            var oldValue = GetValue(propertyName);

            if (!ReferenceEquals(oldValue, null))
            {
                if (oldValue.Equals(value))
                {
                    return;
                }
            }

            if (ReferenceEquals(oldValue,null ) && ReferenceEquals(value,null) )
            {
                return;
            }

            _entries[propertyName] = value;

            OnPropertyChanged(propertyName, value, oldValue);
        }
        #endregion

        #region INotifyPropertyChanged Members
        /// <summary>
        ///     Notifies clients that a property value has changed.
        /// </summary>
        [field: NonSerialized]
        public event PropertyChangedEventHandler PropertyChanged;

        /// <summary>
        ///     Called when [property changed].
        /// </summary>
        /// <param name="prop">The property.</param>
        /// <param name="newValue">The new value.</param>
        /// <param name="oldValue">The old value.</param>
        void OnPropertyChanged(string prop, object newValue, object oldValue)
        {
            PropertyChanged?.Invoke(this, new BagChangedEventArgs(prop, newValue, oldValue));
        }

        /// <summary>
        ///     Called when [property changed].
        /// </summary>
        /// <param name="prop">The property.</param>
        public virtual void OnPropertyChanged(string prop)
        {
            PropertyChanged?.Invoke(this, new BagChangedEventArgs(prop));
        }
        #endregion
    }
}