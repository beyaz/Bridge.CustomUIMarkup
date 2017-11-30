using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using Bridge.jQuery2;
using Retyped;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class ui_top_attached_tabular_menu : ElementBase
    {
        #region Constants
        const string active = "active";
        #endregion

        #region Fields
        jQuery _menuElement;
        #endregion

        #region Constructors
        public ui_top_attached_tabular_menu()
        {
            AfterInitDOM += OnAfterInitDOM;
            AfterAddChild += OnAfterAddChild;
            BeforeConnectToParent += OnBeforeConnectToParent;
        }
        #endregion

        #region Properties
        IEnumerable<TabItem> Tabs => from tab in Childeren select tab as TabItem;
        #endregion

        #region Methods
        void ActivateTab(TabItem tabItem)
        {
            RemoveClassActive();

            tabItem._headerElement.AddClass(active);
            tabItem._contentElement.AddClass(active);
        }

        void OnAfterAddChild(FrameworkElement element)
        {
            var tabItem = element as TabItem;
            if (tabItem == null)
            {
                throw new ArgumentException();
            }

            _menuElement.Append(tabItem._headerElement);

            _root.Append(tabItem._contentElement);

            tabItem._headerElement.Click(() => { ActivateTab(tabItem); });
        }

        void OnAfterInitDOM()
        {
            _menuElement = DOM.div("ui top attached tabular menu").AppendTo(_root);
        }

        void OnBeforeConnectToParent()
        {
            _root.As<semantic_ui.JQuery>().tab();
            if (Tabs.Any())
            {
                ActivateTab(Tabs.FirstOrDefault());
            }
        }

        void RemoveClassActive()
        {
            foreach (var tabItem in Tabs)
            {
                tabItem._contentElement.RemoveClass(active);
                tabItem._headerElement.RemoveClass(active);
            }
        }
        #endregion
    }
}