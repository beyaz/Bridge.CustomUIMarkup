using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public class ui_top_attached_tabular_menu : Control
    {
        #region Fields
#pragma warning disable 649
        FrameworkElement _headerContainer;
#pragma warning restore 649
        #endregion

        #region Constructors
        public ui_top_attached_tabular_menu()
        {
            AfterLogicalChildAdd += OnAfterAddChild;
            BeforeConnectToLogicalParent += OnBeforeConnectToParent;
        }
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml => "<div>" +
                                                       "    <div x:Name ='_headerContainer'  class = 'ui top attached tabular menu' />" +
                                                       "</div>";
        #endregion

        #region Properties
        IEnumerable<TabItem> Tabs => from tab in LogicalChilderen select tab as TabItem;
        #endregion

        #region Public Methods
        public void AddTab(TabItem tabItem)
        {
            _headerContainer.AddVisualChild(tabItem._headerElement);

            AddVisualChild(tabItem._bodyElement);

            tabItem._headerElement._root.Click(() => { ActivateTab(tabItem); });
        }
        #endregion

        #region Methods
        void ActivateTab(TabItem tabItem)
        {
            foreach (var tab in Tabs)
            {
                tab.IsActive = false;
            }

            tabItem.IsActive = true;
        }

        void OnAfterAddChild(FrameworkElement element)
        {
            var tabItem = element as TabItem;
            if (tabItem == null)
            {
                throw new ArgumentException();
            }

            AddTab(tabItem);
        }

        void OnBeforeConnectToParent(FrameworkElement parent)
        {
            _root.tab();
            if (Tabs.Any())
            {
                ActivateTab(Tabs.FirstOrDefault());
            }
        }
        #endregion
    }
}