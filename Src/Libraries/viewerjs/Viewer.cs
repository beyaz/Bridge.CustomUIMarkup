using System.Windows;

namespace Bridge.CustomUIMarkup.Libraries.viewerjs
{
    public class Viewer : FrameworkElement
    {
        #region Fields
        // ReSharper disable once UnassignedField.Global
        public dynamic _wrapper;
        #endregion

        #region Constructors
        public Viewer()
        {
            BeforeConnectToParent += InitWrapper;
            AfterAddChild += CreateImage;
        }
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = DOM.ul();
        }
        #endregion

        #region Methods
        void CreateImage(FrameworkElement element)
        {
            DOM.li().AppendTo(_root).Append(element._root);
        }

        void InitWrapper()
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