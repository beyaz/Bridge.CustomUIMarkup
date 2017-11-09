using System.Windows;
using System.Windows.Markup;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class ElementContainer: ElementBase, IAddChild
    {
        protected virtual void BeforeAddChild(FrameworkElement element)
        {

        }
        protected virtual void AfterAddChild(FrameworkElement element)
        {

        }
        public void Add(FrameworkElement element)
        {
            element._root.AppendTo(_root);

            AddChild(element);
        }
        protected override void AddChild(FrameworkElement element)
        {
            BeforeAddChild(element);
            base.AddChild(element);
            AfterAddChild(element);
        }
    }
}