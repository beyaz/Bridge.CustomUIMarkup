namespace System.ComponentModel
{
    /// <summary>
    ///     The bag changed event arguments
    /// </summary>
    /// <seealso cref="System.ComponentModel.PropertyChangedEventArgs" />
    public class BagChangedEventArgs : PropertyChangedEventArgs
    {
        #region Constructors
        /// <summary>
        ///     Initializes a new instance of the <see cref="BagChangedEventArgs" /> class.
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        public BagChangedEventArgs(string propertyName) : base(propertyName)
        {
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="BagChangedEventArgs" /> class.
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        /// <param name="newValue">The new value.</param>
        public BagChangedEventArgs(string propertyName, object newValue) : base(propertyName)
        {
            NewValue = newValue;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="BagChangedEventArgs" /> class.
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        /// <param name="newValue">The new value.</param>
        /// <param name="oldValue">The old value.</param>
        public BagChangedEventArgs(string propertyName, object newValue, object oldValue) : base(propertyName)
        {
            NewValue = newValue;
            OldValue = oldValue;
        }
        #endregion

        #region Public Properties
        /// <summary>
        ///     Gets the new value.
        /// </summary>
        public new object NewValue { get; }

        /// <summary>
        ///     Gets the old value.
        /// </summary>
        public new object OldValue { get; }
        #endregion
    }
}