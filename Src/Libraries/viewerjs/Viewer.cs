using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.viewerjs
{
    public class Viewer : Control
    {
        #region Fields
        // ReSharper disable once UnassignedField.Global
        public dynamic _wrapper;
        #endregion

        #region Constructors
        public Viewer()
        {
            BeforeConnectToLogicalParent += InitWrapper;
            AfterLogicalChildAdd         += CreateImage;
        }
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = DOM.ul("pictures");
        }
        #endregion

        #region Methods
        void CreateImage(FrameworkElement element)
        {
            var li = new HtmlElement("li");
            li.AddVisualChild(element);
            AddVisualChild(li);
        }

        void InitWrapper(FrameworkElement parent)
        {
            // ReSharper disable once UnusedVariable
            var root = _root.Get(0);
            // ReSharper disable once UnusedVariable
            var me = this;

            Script.Write(@"

setTimeout(function(){

    var options = {};
    me._wrapper = new Viewer(root, options);

},0);

");
        }
        #endregion
    }
}