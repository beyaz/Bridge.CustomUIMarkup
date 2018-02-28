namespace System.ComponentModel
{
    public static class Extensions
    {
        #region Public Methods
        /// <summary>
        ///     invoke action when propertyName raised
        /// </summary>
        public static void OnPropertyChanged(this INotifyPropertyChanged notifyPropertyChanged, string propertyName, Action action)
        {
            if (notifyPropertyChanged == null)
            {
                throw new ArgumentNullException(nameof(notifyPropertyChanged));
            }
            notifyPropertyChanged.PropertyChanged += (s, e) =>
            {
                if (e.PropertyName == propertyName)
                {
                    action();
                }
            };
        }
        #endregion
    }
}