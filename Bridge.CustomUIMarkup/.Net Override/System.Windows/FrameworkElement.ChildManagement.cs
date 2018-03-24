using System.Collections.Generic;
using Bridge.CustomUIMarkup.Common;
using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Windows
{
    public class RoutedEventArgs : EventArgs
    {

    }
    public delegate void RoutedEventHandler(object sender, RoutedEventArgs e);
    partial class FrameworkElement
    {
        public bool IsLoaded { get; set; }

        public event RoutedEventHandler Loaded;

        internal void InvokeEvent_Loaded(object sender, RoutedEventArgs e)
        {
            if (IsLoaded)
            {
                return;
            }

            IsLoaded = true;

            Loaded?.Invoke(this,e);
        }

        static void Connect_Loaded_events(FrameworkElement parent, FrameworkElement child)
        {
            if (parent.IsLoaded)
            {
                child.InvokeEvent_Loaded(child, new RoutedEventArgs());

                return;
            }

            parent.Loaded += child.InvokeEvent_Loaded;
        }


        #region Fields
        protected internal jQuery           _root;
        protected          FrameworkElement _logicalParent;
        protected          FrameworkElement _visaulParent;
        #endregion

        #region Events
        protected event Action                   AfterConnectToLogicalParent;
        protected event Action                   AfterConnectToVisualParent;
        protected event Action<FrameworkElement> AfterLogicalChildAdd;
        protected event Action<FrameworkElement> AfterLogicalChildRemove;
        protected event Action<FrameworkElement> AfterVisualChildAdd;
        protected event Action<FrameworkElement> BeforeConnectToLogicalParent;
        protected event Action<FrameworkElement> BeforeConnectToVisualParent;
        protected event Action<FrameworkElement> BeforeLogicalChildAdd;
        #endregion

        #region Public Properties
        public FrameworkElement LogicalParent => _logicalParent;
        public FrameworkElement VisaulParent  => _visaulParent;
        #endregion

        #region Properties
        internal Element _el => _root.Get(0);
        #endregion

        #region Public Methods
        public void AddLogicalChild(FrameworkElement child)
        {
            BeforeLogicalChildAdd?.Invoke(child);

            child.BeforeConnectToLogicalParent?.Invoke(this);

            GetLogicalChilderen().Add(child);

            child._logicalParent = this;

            AfterLogicalChildAdd?.Invoke(child);

            child.AfterConnectToLogicalParent?.Invoke();
        }

        public void AddVisualChild(FrameworkElement child)
        {
            child.BeforeConnectToVisualParent?.Invoke(this);

            child._root.AppendTo(_root);

            child._visaulParent = this;

            AfterVisualChildAdd?.Invoke(child);

            child.AfterConnectToVisualParent?.Invoke();

            GetVisualChilderen().Add(child);


            Connect_Loaded_events(this,child);
        }




        protected event Action AfterLogicalChildsCleared;
        public void ClearLogicalChilds()
        {
            _logicalChilderen?.Clear();

            AfterLogicalChildsCleared?.Invoke();
        }

        public void ClearVisualChilds()
        {
            _root.Empty();
            _visualChilderen?.Clear();
        }

        public void RemoveLogicalChild(FrameworkElement child)
        {
            _logicalChilderen?.Remove(child);

            AfterLogicalChildRemove?.Invoke(child);
        }

        public void RemoveVisualChild(FrameworkElement child)
        {
            _visualChilderen?.Remove(child);

            child._root.RemoveFromParent();

            Loaded -= child.Loaded;
        }

        public void RenderInBody()
        {
            HtmlBodyElement.Value.AddLogicalChild(this);
        }
        #endregion

        #region IReadOnlyList<FrameworkElement> VisualChilderen
        List<FrameworkElement> _visualChilderen;

        public FrameworkElement GetVisualChildAt(int index)
        {
            return VisualChilderen[index];
        }

        internal FrameworkElement GetVisualChildAt(params int[] indexes)
        {
            var currentElement = this;
            var len            = indexes.Length;
            for (var i = 0; i < len; i++)
            {
                var index = indexes[i];

                currentElement = currentElement.GetVisualChildAt(index);
            }

            return currentElement;
        }

        protected internal List<FrameworkElement> GetVisualChilderen()
        {
            if (_visualChilderen == null)
            {
                _visualChilderen = new List<FrameworkElement>();
            }

            return _visualChilderen;
        }

        internal IReadOnlyList<FrameworkElement> VisualChilderen => GetVisualChilderen();

        public int VisualChilderenCount => _visualChilderen?.Count ?? 0;
        #endregion

        #region IReadOnlyList<FrameworkElement> LogicalChilderen
        List<FrameworkElement> _logicalChilderen;

        protected internal List<FrameworkElement> GetLogicalChilderen()
        {
            if (_logicalChilderen == null)
            {
                _logicalChilderen = new List<FrameworkElement>();
            }

            return _logicalChilderen;
        }

        internal IReadOnlyList<FrameworkElement> LogicalChilderen => GetLogicalChilderen();

        public FrameworkElement GetLogicalChildAt(int index)
        {
            return LogicalChilderen[index];
        }

        public int LogicalChilderenCount => _logicalChilderen?.Count ?? 0;
        #endregion
    }
}