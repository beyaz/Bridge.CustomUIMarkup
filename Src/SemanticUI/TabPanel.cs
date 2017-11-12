using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Markup;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI.Design;
using Bridge.jQuery2;
using Retyped;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class TabPanel : FrameworkElement, IAddChild
    {
        #region Constants
        const string active = "active";
        #endregion

        #region Fields
        readonly List<TabItem> _tabs = new List<TabItem>();
        jQuery _menuElement;
        #endregion

        #region Public Methods
        public new void Add(FrameworkElement element)
        {
            var tabItem = element as TabItem;
            if (tabItem == null)
            {
                throw new ArgumentException();
            }

            _menuElement.Append(tabItem._headerElement);

            _root.Append(tabItem._contentElement);

            tabItem._headerElement.Click(() =>
            {
                RemoveClassActive();

                tabItem._headerElement.AddClass(active);
                tabItem._contentElement.AddClass(active);
            });

            _tabs.Add(tabItem);
        }

        public override void InitDOM()
        {
            _root = DOM.div();

            _menuElement = DOM.div("ui top attached tabular menu").AppendTo(_root);

            _root.As<semantic_ui.JQuery>().tab();
        }
        #endregion

        #region Methods
        void RemoveClassActive()
        {
            foreach (var tabItem in _tabs)
            {
                tabItem._contentElement.RemoveClass(active);
                tabItem._headerElement.RemoveClass(active);
            }
        }
        #endregion
    }
}