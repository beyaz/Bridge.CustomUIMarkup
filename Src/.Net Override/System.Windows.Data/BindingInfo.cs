namespace System.Windows.Data
{
    public class BindingInfo
    {
        #region Public Properties
        public BindingMode BindingMode { get; set; }

        public PropertyPath Path { get; set; }

        public object Source { get; set; }

        public string SourcePath
        {
            get { return Path?.Path; }
            set { Path = new PropertyPath(value); }
        }

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

            return new BindingInfo {Path = text};
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
            Path.SetPropertyValue(TargetPath.GetPropertyValue());
        }

        public virtual void UpdateTarget()
        {
            TargetPath.SetPropertyValue(Path.GetPropertyValue());
        }
        #endregion

        #region Methods
        protected virtual void ConnectSourceToTarget()
        {
            Path.Listen(Source, UpdateTarget);
        }

        protected virtual void ConnectTargetToSource()
        {
            TargetPath.Listen(Target, UpdateSource);
        }
        #endregion
    }
}