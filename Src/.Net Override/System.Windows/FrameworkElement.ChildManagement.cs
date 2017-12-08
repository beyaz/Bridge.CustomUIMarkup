using System.Collections.Generic;
using Bridge.CustomUIMarkup.Common;
using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Windows
{
    public class HtmlBodyElement
    {
        static FrameworkElement _value;

        public static FrameworkElement Value
        {
            get
            {
                if (_value == null)
                {
                    _value = new HtmlElement
                    {
                        _root = DOM.body
                    };
                }

                return _value;
            }
        }
    }

    public static class FrameworkElementExtensions
    {
        public static T Attr<T>(this T element,string attributeName, string value) where T:FrameworkElement
        {
            element._root.Attr(attributeName, value);
            return element;
        }

        public static string html<T>(this T element) where T : FrameworkElement
        {
            return element._root.Html();
        }

        public static string Val<T>(this T element) where T : FrameworkElement
        {
            return element._root.Val();
        }
        
    }

    partial class FrameworkElement
    {
        internal Element _el => _root.Get(0);

        public void RenderInBody()
        {
            HtmlBodyElement.Value.AddLogicalChild(this);
        }

        #region Fields
        protected internal jQuery _root;
        protected FrameworkElement _logicalParent;
        protected FrameworkElement _visaulParent;
        #endregion

        #region Events
        protected event Action AfterConnectToLogicalParent;
        protected event Action AfterConnectToVisualParent;
        protected event Action<FrameworkElement> AfterLogicalChildAdd;
        protected event Action<FrameworkElement> BeforeLogicalChildAdd;
        protected event Action<FrameworkElement> AfterVisualChildAdd;
        protected event Action<FrameworkElement> BeforeConnectToLogicalParent;
        protected event Action<FrameworkElement> BeforeConnectToVisualParent;
        #endregion

        #region Public Properties
        public FrameworkElement LogicalParent => _logicalParent;
        public FrameworkElement VisaulParent => _visaulParent;
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

        public void RemoveLogicalChild(FrameworkElement child)
        {
             _logicalChilderen?.Remove(child);
        }

        public void RemoveVisualChild(FrameworkElement child)
        {
            _visualChilderen?.Remove(child);

            child._root.RemoveFromParent();
        }

        public void AddVisualChild(FrameworkElement child)
        {
            child.BeforeConnectToVisualParent?.Invoke(this);

            child._root.AppendTo(_root);

            child._visaulParent = this;

            AfterVisualChildAdd?.Invoke(child);

            child.AfterConnectToVisualParent?.Invoke();

            GetVisualChilderen().Add(child);
        }
        #endregion


        public void ClearVisualChilds()
        {
            _root.Empty();
            _visualChilderen?.Clear();
        }

        

        #region IReadOnlyList<FrameworkElement> VisualChilderen
        List<FrameworkElement> _visualChilderen;

        public FrameworkElement GetVisualChildAt(int index)
        {
            return VisualChilderen[index];
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