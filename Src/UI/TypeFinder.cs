using System;
using System.Collections.Generic;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.Libraries.CodeMirror;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.Libraries.Swiper;
using Bridge.CustomUIMarkup.Libraries.viewerjs;

namespace Bridge.CustomUIMarkup.UI
{
    public class TypeFinder
    {
        #region Static Fields
        static readonly List<XmlIntellisenseInfo> _tags = new List<XmlIntellisenseInfo>
        {
            // new XmlIntellisenseInfo("ui_rating", typeof(ui_rating)),
            // new XmlIntellisenseInfo("Rating", typeof(ui_rating)),
            // new XmlIntellisenseInfo("comment", typeof(comment)),
            // new XmlIntellisenseInfo("ui_comments", typeof(ui_comments)),
            // new XmlIntellisenseInfo("ContentPresenter", typeof(ContentPresenter)),
            




            // new XmlIntellisenseInfo("ImageGalery", typeof(Viewer)),
            // new XmlIntellisenseInfo("swiper.slider", typeof(Slider)),
            // new XmlIntellisenseInfo("div", typeof(FrameworkElement_div)),
            // new XmlIntellisenseInfo("a", typeof(FrameworkElement_a)),
            // new XmlIntellisenseInfo("img", typeof(FrameworkElement_img)),
//            new XmlIntellisenseInfo("SplitPanel", typeof(SplitPanel)),
            // new XmlIntellisenseInfo("SplitPanel", typeof(Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel)),
            

            //new XmlIntellisenseInfo("ui.page.grid", typeof(ui_page_grid)),
            //new XmlIntellisenseInfo("left.menu", typeof(left_menu)),
            //new XmlIntellisenseInfo("ui.text.menu.navbar", typeof(ui_text_menu_navbar)),

            //new XmlIntellisenseInfo("ui_top_attached_tabular_menu", typeof(ui_top_attached_tabular_menu)),
            //new XmlIntellisenseInfo("Tab", typeof(TabItem)),

            //new XmlIntellisenseInfo("textInput", typeof(InputText)),
            //new XmlIntellisenseInfo("textBox", typeof(InputText)),
            // new XmlIntellisenseInfo("combo", typeof(Combo)),
            //new XmlIntellisenseInfo("comboBox", typeof(Combo)),
            //new XmlIntellisenseInfo("ui.selection.dropdown", typeof(Combo)),
            // new XmlIntellisenseInfo("textArea", typeof(TextArea)),
            //new XmlIntellisenseInfo("field", typeof(Field)),
            //new XmlIntellisenseInfo("ui.form", typeof(ui_form)),

            //new XmlIntellisenseInfo("ui.header.1", typeof(ui_header_1)),
            //new XmlIntellisenseInfo("ui.header.2", typeof(ui_header_2)),
            //new XmlIntellisenseInfo("ui.header.3", typeof(ui_header_3)),
            //new XmlIntellisenseInfo("header", typeof(header)),
            // new XmlIntellisenseInfo("ui.image", typeof(ui_image)),
            // new XmlIntellisenseInfo("icon", typeof(Icon)),
            // new XmlIntellisenseInfo("ui.segment", typeof(ui_segment)),
            // new XmlIntellisenseInfo("textBlock", typeof(TextBlock)),
            // new XmlIntellisenseInfo("xmlEditor", typeof(XmlEditor)),
            // new XmlIntellisenseInfo("uiEditor", typeof(UIEditor))
        };

        static Dictionary<string, Type> _tagTypeMap;
        #endregion

        #region Properties
        internal static IReadOnlyCollection<XmlIntellisenseInfo> Tags => _tags;

        public static Dictionary<string, Type> TagTypeMap
        {
            get
            {
                if (_tagTypeMap == null)
                {
                    _tagTypeMap = new Dictionary<string, Type>();
                    foreach (var intellisenseInfo in _tags)
                    {
                        _tagTypeMap[intellisenseInfo.TagName.ToUpper()] = intellisenseInfo.Type;
                    }
                }

                return _tagTypeMap;
            }
        }
        #endregion

        
        #region Public Methods
        public virtual Type FindType(string tag)
        {
            if (TagTypeMap.ContainsKey(tag))
            {
                return TagTypeMap[tag];
            }

            return null;
        }
        #endregion

        #region Methods
        protected static void RegisterTag(string tagName, Type type)
        {
            _tags.Add(new XmlIntellisenseInfo(tagName, type));
        }
        #endregion
    }
}