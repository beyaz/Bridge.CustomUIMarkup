using System.Collections.Generic;
using System.Windows;
using System.Windows.Markup;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI.Design;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.SemanticUI
{

    public class UniformGrid : FrameworkElement, IAddChild
    {
        public UniformGrid()
        {
            _childeren = new List<FrameworkElement>();
        }
        #region Fields

        jQuery row;
        #endregion

        #region Properties
        int ColumnCount => _childeren.Count;

        string gridClass => "ui " + ColumnCount.ToWord() + " column grid";
        #endregion

        #region Public Indexers
        public FrameworkElement this[int columnIndex] => _childeren[columnIndex];
        #endregion

        #region Public Methods
        public void Add(FrameworkElement element)
        {
            var columnDiv = DOM.div("column").AppendTo(row);

            element.Root.AppendTo(columnDiv);

            _childeren.Add(element);
        }

        public override void InitDOM()
        {
            _root = DOM.div("ui equal width grid");

            row = DOM.div("row").AppendTo(_root);
        }
        #endregion
    }
}