using System.Windows;
using Bridge.CustomUIMarkup.Test;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    class TabItemTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new TabItemTest().TabItem_Content();
        }
        #endregion

        #region Methods
        static FrameworkElement GetContentFromDOM(TabItem tabItem)
        {
            return tabItem._contentPresenter.GetVisualChildAt(0);
        }

        static string GetHeaderTextFromDOM(TabItem tabItem)
        {
            return tabItem._headerElement.html();
        }

        void TabItem_Content()
        {
            var tabItem = Builder.Create<TabItem>();
            tabItem.Header = "my";
            var fe = tabItem.Content = new FrameworkElement("y");

            MustEqual("my", GetHeaderTextFromDOM(tabItem));
            MustEqualByReference(fe, GetContentFromDOM(tabItem));

            tabItem.Header = "B";
            tabItem.Content = fe = new FrameworkElement("y2");

            MustEqual("B", GetHeaderTextFromDOM(tabItem));
            MustEqualByReference(fe, GetContentFromDOM(tabItem));

            var tabControl = Builder.Create<ui_top_attached_tabular_menu>();

            tabControl.AddTab(tabItem);


            tabItem.Header = "C";
            tabItem.Content = fe = new FrameworkElement("y3");

            MustEqual("C", GetHeaderTextFromDOM(tabItem));
            MustEqualByReference(fe, GetContentFromDOM(tabItem));
        }
        #endregion
    }
}