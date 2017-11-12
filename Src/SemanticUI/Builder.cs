using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI.Design;

namespace Bridge.CustomUIMarkup.SemanticUI
{
    public class Builder : UI.Design.Builder
    {
        #region Static Fields
        static Dictionary<string, Type> Types;
        #endregion

        #region Public Methods
        public override IReadOnlyList<XmlIntellisenseInfo> GetIntellisenseInfos()
        {
            return new List<XmlIntellisenseInfo>
            {
                new XmlIntellisenseInfo("div", typeof(html_div)),
                new XmlIntellisenseInfo("a", typeof(html_a)),

                new XmlIntellisenseInfo("computer.tablet.only.row", typeof(computer_tablet_only_row)),
                new XmlIntellisenseInfo("ui.navbar.menu", typeof(ui_navbar_menu)),
                new XmlIntellisenseInfo("mobile.only.row", typeof(mobile_only_row)),
                new XmlIntellisenseInfo("right.menu", typeof(right_menu)),
                new XmlIntellisenseInfo("ui.page.grid", typeof(ui_page_grid)),
                new XmlIntellisenseInfo("left.menu", typeof(left_menu)),
                new XmlIntellisenseInfo("ui.text.menu.navbar", typeof(ui_text_menu_navbar)),
                


                new XmlIntellisenseInfo("ui.button", typeof(ui_button)),
                new XmlIntellisenseInfo("TabPanel", typeof(TabPanel)),
                new XmlIntellisenseInfo("Tab", typeof(TabItem)),
                new XmlIntellisenseInfo("card", typeof(card)),
                new XmlIntellisenseInfo("ui.card", typeof(ui_card)),
                new XmlIntellisenseInfo("ui.cards", typeof(ui_cards)),
                new XmlIntellisenseInfo("description", typeof(description)),
                new XmlIntellisenseInfo("content", typeof(content)),
                new XmlIntellisenseInfo("extra-content", typeof(ExtraContent)),
                new XmlIntellisenseInfo("ui.basic.button", typeof(ui_basic_button)),
                new XmlIntellisenseInfo("carousel", typeof(Bridge.CustomUIMarkup.jssor.Carousel)),
                new XmlIntellisenseInfo("ui.divider", typeof(ui_divider)),
                new XmlIntellisenseInfo("ui.menu", typeof(ui_menu)),
                new XmlIntellisenseInfo("item", typeof(item)),
                new XmlIntellisenseInfo("ui.vertical.menu", typeof(ui_vertical_menu)),
                





                new XmlIntellisenseInfo("textInput", typeof(InputText)),
                new XmlIntellisenseInfo("textBox", typeof(InputText)),
                new XmlIntellisenseInfo("combo", typeof(Combo)),
                new XmlIntellisenseInfo("comboBox", typeof(Combo)),
                new XmlIntellisenseInfo("ui.equal.width.grid", typeof(ui_equal_width_grid)),
                new XmlIntellisenseInfo("textArea", typeof(TextArea)),
                new XmlIntellisenseInfo("ui.container", typeof(ui_container)),
                new XmlIntellisenseInfo("ui.stacked", typeof(ui_stacked)),
                new XmlIntellisenseInfo("ui.grid", typeof(ui_grid)) {ChildrenTags = new[] {"Row"}},
                new XmlIntellisenseInfo("ui page grid", typeof(ui_page_grid)) ,
                new XmlIntellisenseInfo("field", typeof(Field)),
                new XmlIntellisenseInfo("ui.form", typeof(ui_form)),

                new XmlIntellisenseInfo("row", typeof(Row)) {ChildrenTags = new[] {"column"}},
                new XmlIntellisenseInfo("column", typeof(column)),
                new XmlIntellisenseInfo("ui.header.1", typeof(ui_header_1)),
                new XmlIntellisenseInfo("ui.header.2", typeof(ui_header_2)),
                new XmlIntellisenseInfo("ui.header.3", typeof(ui_header_3)),
                new XmlIntellisenseInfo("header", typeof(header)),
                new XmlIntellisenseInfo("ui.image", typeof(ui_image)),
                new XmlIntellisenseInfo("icon", typeof(Icon)),
                new XmlIntellisenseInfo("ui.segment", typeof(ui_segment)),
                new XmlIntellisenseInfo("textBlock", typeof(TextBlock)),
                new XmlIntellisenseInfo("xmlEditor", typeof(Bridge.CustomUIMarkup.SemanticUI.XmlEditor)),
                new XmlIntellisenseInfo("uiEditor", typeof(UIEditor)),

                
            };
        }
        #endregion

        #region Methods
        protected override Type CreateType(string tag)
        {
            if (Types == null)
            {
                Types = new Dictionary<string, Type>();
                foreach (var intellisenseInfo in GetIntellisenseInfos())
                {
                    Types[intellisenseInfo.TagName.ToUpper()] = intellisenseInfo.Type;
                }
            }
            if (Types.ContainsKey(tag))
            {
                return Types[tag];
            }

            return null;
        }
        #endregion
    }
}