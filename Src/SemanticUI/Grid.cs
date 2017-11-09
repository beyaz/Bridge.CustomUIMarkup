using System.Windows;
using System.Windows.Markup;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Grid : ElementBase, IAddChild
    {
        #region Properties
        bool AllChildrenAreColumn
        {
            get
            {
                foreach (var child in Childeren)
                {
                    if (!(child is Column))
                    {
                        return false;
                    }
                }

                return true;
            }
        }

        string ClassName
        {
            get
            {
                if (ChildrenCount == 0)
                {
                    return "ui grid";
                }

                if (AllChildrenAreColumn)
                {
                    return "ui " + Childeren.Count.ToWord() + " column grid";
                }

                return "ui grid";
            }
        }
        #endregion

        #region Public Methods
        public void Add(FrameworkElement element)
        {
            element.Root.AppendTo(_root);

            AddChild(element);

            UpdateClassName();
        }

        public override void InitDOM()
        {
            _root = DOM.div();
            UpdateClassName();
        }
        #endregion

        #region Methods
        void UpdateClassName()
        {
            _root.Attr("class", ClassName);
        }
        #endregion
    }
}