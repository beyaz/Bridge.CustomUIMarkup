namespace System.Windows
{
    public class PropertyPath
    {
        #region Constructors
        public PropertyPath(string path)
        {
            Path = path;
        }
        #endregion

        #region Public Properties
        public string Path { get;  }
        #endregion
    }
}