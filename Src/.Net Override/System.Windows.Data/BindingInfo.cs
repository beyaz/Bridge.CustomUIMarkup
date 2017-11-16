namespace System.Windows.Data
{
    public class BindingInfo
    {
        #region Public Properties
        public BindingMode BindingMode { get; set; }

        

        public object Source { get; set; }

        public PropertyPath SourcePath { get; set; }

        public object Target { get; set; }

        public PropertyPath TargetPath { get; set; }

        public string TargetPropertyName { get; set; }
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

            return new BindingInfo {SourcePath = text};
        }

        public void Connect()
        {
            ConnectSourceToTarget();

            if (BindingMode == BindingMode.TwoWay)
            {
                ConnectTargetToSource();
            }
            else
            {
                TargetPath.Walk(Target);
            }

            UpdateTarget();
        }

        public virtual void UpdateSource()
        {
            SourcePath.SetPropertyValue(TargetPath.GetPropertyValue());
        }

        public virtual void UpdateTarget()
        {
            TargetPath.SetPropertyValue(SourcePath.GetPropertyValue());
        }
        #endregion

        #region Methods
        protected virtual void ConnectSourceToTarget()
        {
            SourcePath.Listen(Source, UpdateTarget);
        }

        protected virtual void ConnectTargetToSource()
        {
            TargetPath.Listen(Target, UpdateSource);
        }
        #endregion
    }
}