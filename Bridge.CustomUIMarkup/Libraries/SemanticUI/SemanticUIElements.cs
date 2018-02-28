﻿using System.Windows;
using System.Windows.Controls;

namespace Bridge.CustomUIMarkup.Libraries.SemanticUI
{
    public static class SemanticUIElements
    {

        static HtmlElement CreateElement(string tag = null, string className = null)
        {
            return new HtmlElement(tag,className);
        }
        #region Public Methods
        public static void RegisterToBuilder()
        {
            // row
            UIBuilder.Register("row", () => CreateElement("div", "row"));

            for (var i = 2; i <= 16; i++)
            {
                var className = i.ToWord() + " column row";

                UIBuilder.Register(className.Replace(" ", "_"), () => CreateElement("div", className));
            }


            // column
            UIBuilder.Register("column", () => CreateElement("div", "column"));

            for (var i = 2; i <= 16; i++)
            {
                var className = i.ToWord() + " wide column";

                UIBuilder.Register(className.Replace(" ", "_"), () => CreateElement("div", className));
            }

            

            // TextBlock
            UIBuilder.Register("TextBlock", UIBuilder.Create<TextBlock>);

            UIBuilder.Register("Field",  UIBuilder.Create<Field>);

            UIBuilder.Register("textInput", UIBuilder.Create<InputText>);
            UIBuilder.Register("textBox", UIBuilder.Create<InputText>);
            UIBuilder.Register("ui-input-textarea", UIBuilder.Create<TextArea>);
            UIBuilder.Register("FieldString", UIBuilder.Create<FieldString>);
            UIBuilder.Register("FieldStringTextArea", UIBuilder.Create<FieldTextArea>);
            UIBuilder.Register("FieldTextArea", UIBuilder.Create<FieldTextArea>);
            UIBuilder.Register("FieldInt32", UIBuilder.Create<FieldInt32>);
            UIBuilder.Register("FieldDecimal", UIBuilder.Create<FieldDecimal>);
            UIBuilder.Register("FieldDate", UIBuilder.Create<FieldDate>); 
            UIBuilder.Register("ContentPresenter", () => new ContentPresenter());
            UIBuilder.Register("ui_rating", UIBuilder.Create<ui_rating>);
            UIBuilder.Register("ui-rating", UIBuilder.Create<ui_rating>);
            UIBuilder.Register("ui-range", UIBuilder.Create<Range>);

            UIBuilder.Register("comment", UIBuilder.Create<comment>);
            UIBuilder.Register("ui_comments", () => new HtmlElement("div", "ui comments"));
            UIBuilder.Register("ui-comments", () => new HtmlElement("div", "ui comments"));


            UIBuilder.Register("comment", UIBuilder.Create<comment>);

            UIBuilder.Register("ui_top_attached_tabular_menu", UIBuilder.Create<ui_top_attached_tabular_menu>);
            UIBuilder.Register("Tab", UIBuilder.Create<TabItem>);
            UIBuilder.Register("TabItem", UIBuilder.Create<TabItem>);


            UIBuilder.Register("combo", UIBuilder.Create<Combo>);
            UIBuilder.Register("comboBox", UIBuilder.Create<Combo>);
            UIBuilder.Register("ui.selection.dropdown", UIBuilder.Create<Combo>);

            UIBuilder.Register("DatePicker", UIBuilder.Create<DatePicker>);
            


            var classNames = new[]
            {
                "ui segment",
                "ui form",
                "ui grid",
                "ui page grid",
                "ui text menu navbar",
                "left menu",
                "ui stacked",
                "computer tablet only row",
                "ui navbar menu",
                "mobile only row",
                "right menu",
                "ui hidden clearing divider",
                "card",
                "ui card",
                "ui cards",
                "extra content",
                "content",
                "ui divider",
                "item",
                "ui menu",
                "ui vertical menu",
                "ui equal width grid",
                "ui container",
                "ui button",
                "ui active button",
                "ui basic button",
                "ui basic active button",
                "ui pagination menu",
                "active item"

            };

            foreach (var className in classNames)
            {
                UIBuilder.Register(className.Replace(" ", "_"), () => CreateElement("div", className));
                UIBuilder.Register(className.Replace(" ", "."), () => CreateElement("div", className));
                UIBuilder.Register(className.Replace(" ", "-"), () => CreateElement("div", className));
            }

            UIBuilder.Register("ui-image", () => CreateElement("img", "ui image"));
            UIBuilder.Register("ui.image", () => CreateElement("img", "ui image"));


            UIBuilder.Register("header", () => CreateElement("div", "header"));
            UIBuilder.Register("ui.header.1", () => CreateElement("h1", "ui header"));
            UIBuilder.Register("ui.header.2", () => CreateElement("h2", "ui header"));
            UIBuilder.Register("ui.header.3", () => CreateElement("h3", "ui header"));


            UIBuilder.Register("ui.header.3", () => CreateElement("i", "ui header"));

            foreach (var iconType in IconTypes)
            {
                UIBuilder.Register("icon-"+ iconType, () => CreateElement("i", iconType + " icon"));
            }

            UIBuilder.Register("ui-celled-table", () => CreateElement("table", "ui celled table"));
            UIBuilder.Register("thead", () => CreateElement("thead"));
            UIBuilder.Register("tr", () => CreateElement("tr"));
            UIBuilder.Register("th", () => CreateElement("th"));
            UIBuilder.Register("tbody", () => CreateElement("tbody"));
            UIBuilder.Register("td", () => CreateElement("td"));


            UIBuilder.Register("ItemsControl", UIBuilder.Create<ItemsControl>);
            UIBuilder.Register("DataGrid", UIBuilder.Create <DataGrid>);
            UIBuilder.Register("DataGridColumn", UIBuilder.Create<DataGridColumn>); 
            UIBuilder.Register("ListBox", UIBuilder.Create <ListBox>);

            
            

        }
        #endregion

        static readonly string[] IconTypes = new string[]
        {

"content",
"edit",
"bug",
"alternate github",
"music",
"world",
"search",
"green check",
"large red delete link",
"disabled warning sign",
"add to calendar",
"address book",
"address book outline",
"address card",
"address card outline",
"alarm",
"alarm mute",
"alarm mute outline",
"alarm outline",
"at",
"browser",
"calendar",
"calendar outline",
"checked calendar",
"cloud",
"code",
"comment",
"comment outline",
"comments",
"comments outline",
"copyright",
"creative commons",
"dashboard",
"delete calendar",
"external",
"external square",
"eyedropper",
"feed",
"find",
"hand pointer",
"handshake",
"hashtag",
"heartbeat",
"history",
"home",
"hourglass empty",
"hourglass end",
"hourglass full",
"hourglass half",
"hourglass start",
"id badge",
"id card",
"id card outline",
"idea",
"image",
"inbox",
"industry",
"lab",
"mail",
"mail outline",
"mail square",
"mouse pointer",
"open envelope",
"open envelope outline",
"options",
"paint brush",
"payment",
"percent",
"podcast",
"privacy",
"protect",
"registered",
"remove from calendar",
"setting",
"settings",
"shop",
"shopping bag",
"shopping basket",
"sidebar",
"signal",
"sitemap",
"tag",
"tags",
"tasks",
"terminal",
"text telephone",
"ticket",
"trademark",
"trophy",
"window close",
"window close outline",
"window maximize",
"window minimize",
"window restore",
"add to cart",
"add user",
"adjust",
"archive",
"ban",
"bookmark",
"call",
"call square",
"clone",
"cloud download",
"cloud upload",
"talk",
"talk outline",
"compress",
"configure",
"download",
"erase",
"exchange",
"expand",
"external share",
"filter",
"hide",
"in cart",
"Lock",
"mail forward",
"group object",
"ungroup object",
"pin",
"print",
"random",
"recycle",
"refresh",
"remove bookmark",
"remove user",
"repeat",
"reply all",
"reply",
"retweet",
"send",
"send outline",
"share alternate",
"share alternate square",
"share",
"share square",
"sign in",
"sign out",
"theme",
"translate",
"undo",
"unhide",
"unlock alternate",
"unlock",
"upload",
"wait",
"wizard",
"write",
"write square",
"object group",
"object ungroup",
"announcement",
"birthday",
"help circle",
"help circle outline",
"help",
"info circle",
"info",
"warning circle",
"warning",
"warning sign",
"child",
"doctor",
"handicap",
"spy",
"student",
"user",
"user circle",
"user circle outline",
"user outline",
"users",
"female",
"gay",
"genderless",
"heterosexual",
"intergender",
"lesbian",
"male",
"man",
"neuter",
"non binary transgender",
"other gender horizontal",
"other gender",
"other gender vertical",
"transgender",
"woman",
"block layout",
"crop",
"grid layout",
"list layout",
"maximize",
"resize horizontal",
"resize vertical",
"zoom",
"zoom out",
"anchor",
"bar",
"bathtub",
"bomb",
"book",
"bullseye",
"calculator",
"cocktail",
"diamond",
"fax",
"fire extinguisher",
"fire",
"flag checkered",
"flag",
"flag outline",
"gift",
"hand lizard",
"hand peace",
"hand paper",
"hand rock",
"hand scissors",
"hand spock",
"law",
"leaf",
"legal",
"lemon",
"life ring",
"lightning",
"magnet",
"money",
"moon",
"plane",
"puzzle",
"road",
"rocket",
"shipping",
"shower",
"snowflake",
"soccer",
"sticky note",
"sticky note outline",
"suitcase",
"sun",
"thermometer empty",
"thermometer quarter",
"thermometer half",
"thermometer three quarters",
"thermometer full",
"travel",
"treatment",
"tv",
"umbrella",
"asterisk",
"certificate",
"circle",
"circle notched",
"circle thin",
"crosshairs",
"cube",
"cubes",
"ellipsis horizontal",
"ellipsis vertical",
"quote left",
"quote right",
"spinner",
"square",
"square outline",
"add circle",
"add square",
"check circle",
"check circle outline",
"check square",
"checkmark box",
"checkmark",
"minus circle",
"minus",
"minus square",
"minus square outline",
"move",
"plus",
"plus square outline",
"radio",
"remove circle",
"remove circle outline",
"remove",
"selected radio",
"toggle off",
"toggle on",
"area chart",
"bar chart",
"camera retro",
"newspaper",
"film",
"line chart",
"photo",
"pie chart",
"sound",
"angle double down",
"angle double left",
"angle double right",
"angle double up",
"angle down",
"angle left",
"angle right",
"angle up",
"arrow circle down",
"arrow circle left",
"arrow circle outline down",
"arrow circle outline left",
"arrow circle outline right",
"arrow circle outline up",
"arrow circle right",
"arrow circle up",
"arrow down",
"arrow left",
"arrow right",
"arrow up",
"caret down",
"caret left",
"caret right",
"caret up",
"chevron circle down",
"chevron circle left",
"chevron circle right",
"chevron circle up",
"chevron down",
"chevron left",
"chevron right",
"chevron up",
"long arrow down",
"long arrow left",
"long arrow right",
"long arrow up",
"pointing down",
"pointing left",
"pointing right",
"pointing up",
"toggle down",
"toggle left",
"toggle right",
"toggle up",
"mobile",
"tablet",
"battery empty",
"battery low",
"battery medium",
"battery high",
"battery full",
"desktop",
"disk outline",
"game",
"keyboard",
"laptop",
"plug",
"power",
"file archive outline",
"file audio outline",
"file code outline",
"file excel outline",
"file",
"file image outline",
"file outline",
"file pdf outline",
"file powerpoint outline",
"file text",
"file text outline",
"file video outline",
"file word outline",
"folder",
"folder open",
"folder open outline",
"folder outline",
"level down",
"level up",
"trash",
"trash outline",
"barcode",
"bluetooth alternative",
"bluetooth",
"css3",
"database",
"fork",
"html5",
"microchip",
"openid",
"qrcode",
"rss",
"rss square",
"server",
"usb",
"empty heart",
"empty star",
"frown",
"heart",
"meh",
"smile",
"star half empty",
"star half",
"star",
"thumbs down",
"thumbs outline down",
"thumbs outline up",
"thumbs up",
"backward",
"closed captioning",
"eject",
"fast backward",
"fast forward",
"forward",
"mute",
"pause circle",
"pause circle outline",
"pause",
"play",
"record",
"step backward",
"step forward",
"stop circle",
"stop circle outline",
"stop",
"unmute",
"video play",
"video play outline",
"volume down",
"volume off",
"volume up",
"bicycle",
"building",
"building outline",
"bus",
"car",
"coffee",
"compass",
"emergency",
"first aid",
"food",
"h",
"hospital",
"hotel",
"location arrow",
"map",
"map outline",
"map pin",
"map signs",
"marker",
"military",
"motorcycle",
"paw",
"ship",
"space shuttle",
"spoon",
"street view",
"subway",
"taxi",
"train",
"tree",
"university",
"television",
"columns",
"sort alphabet ascending",
"sort alphabet descending",
"sort ascending",
"sort content ascending",
"sort content descending",
"sort descending",
"sort",
"sort numeric ascending",
"sort numeric descending",
"table",
"align center",
"align justify",
"align left",
"align right",
"attach",
"bold",
"copy",
"cut",
"font",
"header",
"indent",
"italic",
"linkify",
"list",
"ordered list",
"outdent",
"paragraph",
"paste",
"save",
"strikethrough",
"subscript",
"superscript",
"text cursor",
"text height",
"text width",
"underline",
"unlinkify",
"unordered list",
"bitcoin",
"dollar",
"euro",
"lira",
"pound",
"ruble",
"rupee",
"shekel",
"won",
"yen",
"american express",
"credit card alternative",
"diners club",
"discover",
"google wallet",
"japan credit bureau",
"mastercard",
"paypal card",
"paypal",
"stripe",
"visa",
"wheelchair",
"asl interpreting",
"assistive listening systems",
"audio description",
"blind",
"braille",
"deafness",
"low vision",
"sign language",
"universal access",
"volume control phone",
"adn",
"amazon",
"android",
"angellist",
"apple",
"bandcamp",
"behance",
"behance square",
"bitbucket",
"bitbucket square",
"black tie",
"buysellads",
"chrome",
"codepen",
"codiepie",
"connectdevelop",
"contao",
"dashcube",
"delicious",
"deviantart",
"digg",
"dribble",
"dropbox",
"drupal",
"eercast",
"empire",
"envira gallery",
"etsy",
"expeditedssl",
"facebook f",
"facebook",
"facebook square",
"firefox",
"first order",
"flickr",
"font awesome",
"fonticons",
"fort awesome",
"forumbee",
"foursquare",
"free code camp",
"gg circle",
"gg",
"git",
"git square",
"github alternate",
"github",
"github square",
"gitlab",
"gittip",
"glide g",
"glide",
"google",
"google plus circle",
"google plus",
"google plus square",
"grav",
"hacker news",
"houzz",
"imdb",
"instagram",
"internet explorer",
"ioxhost",
"joomla",
"jsfiddle",
"lastfm",
"lastfm square",
"leanpub",
"linkedin",
"linkedin square",
"linode",
"linux",
"maxcdn",
"meanpath",
"medium",
"meetup",
"microsoft edge",
"mixcloud",
"modx",
"odnoklassniki",
"odnoklassniki square",
"opencart",
"opera",
"optinmonster",
"pagelines",
"pied piper alternate",
"pied piper hat",
"pied piper",
"pinterest",
"pinterest square",
"pocket",
"product hunt",
"qq",
"quora",
"ravelry",
"rebel",
"reddit alien",
"reddit",
"reddit square",
"renren",
"safari",
"scribd",
"sellsy",
"shirtsinbulk",
"simplybuilt",
"skyatlas",
"skype",
"slack",
"slideshare",
"snapchat ghost",
"snapchat",
"snapchat square",
"soundcloud",
"spotify",
"stack exchange",
"stack overflow",
"steam",
"steam square",
"stumbleupon circle",
"stumbleupon",
"superpowers",
"telegram",
"tencent weibo",
"themeisle",
"trello",
"tripadvisor",
"tumblr",
"tumblr square",
"twitch",
"twitter",
"twitter square",
"viacoin",
"viadeo",
"viadeo square",
"vimeo",
"vimeo square",
"vine",
"vk",
"wechat",
"weibo",
"whatsapp",
"wikipedia",
"windows",
"wordpress",
"wpbeginner",
"wpexplorer",
"wpforms",
"xing",
"xing square",
"y combinator",
"yahoo",
"yelp",
"yoast",
"youtube",
"youtube play",
"youtube square",
"dribbble",
"disabled users",
"spinner loading",
"notched circle loading",
"asterisk loading",
"fitted help",
"mini home",
"tiny home",
"small home",
"large home",
"big home",
"huge home",
"massive home",
"close link",
"help link",
"horizontally flipped cloud",
"vertically flipped cloud",
"clockwise rotated cloud",
"counterclockwise rotated cloud",
"circular users",
"circular teal users",
"circular inverted users",
"circular inverted teal users",
"bordered users",
"bordered teal users",
"bordered inverted black users",
"bordered inverted teal users",
"red users",
"orange users",
"yellow users",
"olive users",
"green users",
"teal users",
"blue users",
"violet users",
"purple users",
"pink users",
"brown users",
"grey users",
"black users",
"inverted users",
"inverted red users",
"inverted orange users",
"inverted yellow users",
"inverted olive users",
"inverted green users",
"inverted teal users",
"inverted blue users",
"inverted violet users",
"inverted purple users",
"inverted pink users",
"inverted brown users",
"inverted grey users",
"big thin circle",
"big red dont",
"black user",
"big loading sun",
"corner add",
"top left corner add",
"top right corner add",
"bottom left corner add",
"bottom right corner add",
"inverted corner add",
"close",
"question"


        };
    }
}