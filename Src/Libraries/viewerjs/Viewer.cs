using System.Windows;
using Bridge.CustomUIMarkup.Common;

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
            _root = DOM.ul("pictures");
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
            var id = base.Id;


            var css = @"
.pictures {
      margin: 0;
      padding: 0;
      list-style: none;
      max-width: 30rem;
    }

    .pictures > li {
      float: left;
      width: 33.3%;
      height: 33.3%;
      margin: 0 -1px -1px 0;
      border: 1px solid transparent;
      overflow: hidden;
    }

    .pictures > li > img {
      width: 100%;
      cursor: -webkit-zoom-in;
      cursor: zoom-in;
    }
";

            Script.Write(@"

setTimeout(function(){

    var options = {};
    me._wrapper = new Viewer(root, options);





$( '<style> '+css+'</style>' ).appendTo( 'head' );

},0);



");

            

           
        }
        #endregion
    }
}