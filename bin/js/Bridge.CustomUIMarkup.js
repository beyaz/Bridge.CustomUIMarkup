/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.5.0
 */
Bridge.assembly("Bridge.CustomUIMarkup", function ($asm, globals) {
    "use strict";

    /** @namespace Bridge.CustomUIMarkup.Common */

    /**
     * Utility methods for casting operations
     *
     * @static
     * @abstract
     * @public
     * @class Bridge.CustomUIMarkup.Common.ConvertHelper
     */
    Bridge.define("Bridge.CustomUIMarkup.Common.ConvertHelper", {
        statics: {
            props: {
                FormatProvider: {
                    get: function () {
                        return System.Globalization.CultureInfo.getCurrentCulture();
                    }
                }
            },
            methods: {
                ChangeType: function (value, targetType) {
                    return Bridge.CustomUIMarkup.Common.ConvertHelper.ChangeType$1(value, targetType, Bridge.CustomUIMarkup.Common.ConvertHelper.FormatProvider);
                },
                ChangeType$1: function (value, targetType, provider) {
                    if (targetType == null) {
                        throw new System.ArgumentNullException("targetType");
                    }

                    if (value == null) {
                        if (Bridge.Reflection.isClass(targetType) || System.Nullable.getUnderlyingType(targetType) != null) {
                            return null;
                        }

                        throw new System.InvalidOperationException(System.String.concat("@value:null can not converted to @targetType:", Bridge.getTypeName(targetType)));
                    }

                    if (Bridge.referenceEquals(Bridge.getType(value), targetType) || Bridge.Reflection.isInstanceOfType(value, targetType)) {
                        return value;
                    }

                    var underlyingType = System.Nullable.getUnderlyingType(targetType);
                    if (underlyingType != null) {
                        targetType = underlyingType;
                    }

                    if (Bridge.referenceEquals(targetType, System.Boolean)) {
                        return Bridge.box(System.Convert.toBoolean(value, provider), System.Boolean, System.Boolean.toString);
                    }
                    if (Bridge.referenceEquals(targetType, System.Char)) {
                        return Bridge.box(System.Convert.toChar(value, provider, 1), System.Char, String.fromCharCode, System.Char.getHashCode);
                    }
                    if (Bridge.referenceEquals(targetType, System.SByte)) {
                        return Bridge.box(System.Convert.toSByte(value, provider), System.SByte);
                    }
                    if (Bridge.referenceEquals(targetType, System.Byte)) {
                        return Bridge.box(System.Convert.toByte(value, provider), System.Byte);
                    }
                    if (Bridge.referenceEquals(targetType, System.Int16)) {
                        return Bridge.box(System.Convert.toInt16(value, provider), System.Int16);
                    }
                    if (Bridge.referenceEquals(targetType, System.UInt16)) {
                        return Bridge.box(System.Convert.toUInt16(value, provider), System.UInt16);
                    }
                    if (Bridge.referenceEquals(targetType, System.Int32)) {
                        return Bridge.box(System.Convert.toInt32(value, provider), System.Int32);
                    }
                    if (Bridge.referenceEquals(targetType, System.UInt32)) {
                        return Bridge.box(System.Convert.toUInt32(value, provider), System.UInt32);
                    }
                    if (Bridge.referenceEquals(targetType, System.Int64)) {
                        return System.Convert.toInt64(value, provider);
                    }
                    if (Bridge.referenceEquals(targetType, System.UInt64)) {
                        return System.Convert.toUInt64(value, provider);
                    }
                    if (Bridge.referenceEquals(targetType, System.Single)) {
                        return Bridge.box(System.Convert.toSingle(value, provider), System.Single, System.Single.format, System.Single.getHashCode);
                    }
                    if (Bridge.referenceEquals(targetType, System.Double)) {
                        return Bridge.box(System.Convert.toDouble(value, provider), System.Double, System.Double.format, System.Double.getHashCode);
                    }
                    if (Bridge.referenceEquals(targetType, System.Decimal)) {
                        return System.Convert.toDecimal(value, provider);
                    }
                    if (Bridge.referenceEquals(targetType, System.DateTime)) {
                        return Bridge.box(System.Convert.toDateTime(value, provider), System.DateTime, System.DateTime.format);
                    }
                    if (Bridge.referenceEquals(targetType, System.String)) {
                        return System.Convert.toString(value, provider);
                    }
                    if (Bridge.referenceEquals(targetType, System.Object)) {
                        return value;
                    }

                    throw new System.InvalidOperationException(System.String.concat(System.String.concat("@value:", value) + " can not converted to @targetType:", Bridge.getTypeName(targetType)));
                },
                To: function (TTargetType, value) {
                    return Bridge.cast(Bridge.unbox(Bridge.CustomUIMarkup.Common.ConvertHelper.ChangeType(value, TTargetType)), TTargetType);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Common.Extensions", {
        statics: {
            methods: {
                GetOriginalLineNumber: function (element, xmlRootNode, sContent) {
                    // https://jsfiddle.net/g113c350/3/

                    

    var sTagName = element.tagName;
    var aNodeListByTag = xmlRootNode.getElementsByTagName(sTagName);
    var iMaxIndex = 0;
    for (var j = 0; j < aNodeListByTag.length; j++) {
        if (aNodeListByTag.item(j) === element) {
            iMaxIndex = j;
            break;
        }
    }
    var regex = new RegExp('<' + sTagName, 'g');
    var offset = 0;
    for (var i = 0; i <= iMaxIndex; i++) {
        offset = regex.exec(sContent).index;
    }
    var line = 0;
    for (var i = 0; i < sContent.substring(0, offset).length; i++) {
        if (sContent[i] === '\n') {
            line++;
        }
    }
    return line + 1;



                    return 0;
                },
                GetElementsByTagNameIsNotSupporting: function (element) {
                    return element.getElementsByTagName === undefined;
                },
                IsNullOrWhiteSpace: function (value) {
                    return System.String.isNullOrWhiteSpace(value);
                },
                RemoveFromParent: function (query) {
                    query != null ? query.remove() : null;

                    return query;
                },
                highlight: function (el) {
                    var oldColor = el.css("background-color");
                    var opacity = el.css("opacity");


                    el.css("background-color", "#ffff99");
                    el.css("opacity", 0.9);

                    window.setTimeout(function () {
                        el.css("background-color", oldColor);
                        el.css("opacity", opacity);
                    }, 600);





                    return el;
                },
                SetFirstChild: function (query, childElement) {
                    var children = query != null ? query.children() : null;
                    if (children == null || children.length === 0) {
                        childElement.appendTo(query);
                        return query;
                    }

                    childElement.insertBefore(children.first());

                    return query;
                },
                SetLastChild: function (query, childElement) {
                    var children = query != null ? query.children() : null;
                    if (children == null || children.length === 0) {
                        childElement.appendTo(query);
                        return query;
                    }

                    childElement.insertAfter(children.last());

                    return query;
                },
                Foreach: function (query, action) {
                    query != null ? query.children().each(function (e, i) {
                        action($(Bridge.box(e, System.Int32)));
                    }) : null;

                    return query;
                },
                SetClass: function (query, newClassName) {
                    query.attr("class", newClassName);

                    return query;
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Common.FileUtil", {
        statics: {
            methods: {
                ReadAsync: function (url, success) {
                    $.ajax({ async: false, url: url, success: function (o, s, arg3) {
                        success(arg3.responseText);
                    } });
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Common.ScriptLoader", {
        statics: {
            methods: {
                LoadCssFile: function (url) {
                    $("head").append("<link rel='stylesheet' href='" + (url || "") + "' type='text/css' />");
                },
                LoadCssFiles: function (css) {
                    var $t;
                    $t = Bridge.getEnumerator(css, System.String);
                    try {
                        while ($t.moveNext()) {
                            var url = $t.Current;
                            Bridge.CustomUIMarkup.Common.ScriptLoader.LoadCssFile(url);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}
            }
        },
        fields: {
            index: 0,
            OnLoacCompleted: null,
            Scripts: null
        },
        methods: {
            Load: function () {
                if (this.Scripts == null) {
                    return;
                }

                if (this.index >= System.Array.getCount(this.Scripts, System.String)) {
                    this.OnLoacCompleted();
                    return;
                }

                $.getScript(System.Array.getItem(this.Scripts, this.index, System.String), Bridge.fn.bind(this, function (a, b, c) {
                    this.index = (this.index + 1) | 0;
                    this.Load();
                }));
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo", {
        fields: {
            ChildrenTags: null,
            TagName: null,
            Type: null
        },
        ctors: {
            ctor: function (tagName, type) {
                this.$initialize();
                System.Diagnostics.Debug.assert(tagName != null);
                System.Diagnostics.Debug.assert(type != null);


                this.TagName = tagName;
                this.Type = type;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.CodeMirror.AttributeInfo", {
        fields: {
            Name: null,
            Values: null
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.CodeMirror.SchemaInfo", {
        statics: {
            methods: {
                ForceToLoadDependencyProperties: function (type) {
                    Bridge.createInstance(type);
                },
                CreateFrom: function (intellisenseInfos) {
                    var $t, $t1, $t2;
                    var schemaInfo = ($t = new Bridge.CustomUIMarkup.Libraries.CodeMirror.SchemaInfo(), $t.Tags = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Libraries.CodeMirror.TagInfo)).ctor(), $t);

                    $t = Bridge.getEnumerator(intellisenseInfos, Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo);
                    try {
                        while ($t.moveNext()) {
                            var pair = $t.Current;
                            var name = pair.TagName;
                            var type = pair.Type;

                            Bridge.CustomUIMarkup.Libraries.CodeMirror.SchemaInfo.ForceToLoadDependencyProperties(type);

                            var tag = ($t1 = new Bridge.CustomUIMarkup.Libraries.CodeMirror.TagInfo(), $t1.Name = name, $t1.Attributes = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Libraries.CodeMirror.AttributeInfo)).ctor(), $t1);
                            var dependencyProperties = System.Windows.DependencyProperty.GetAllProperties(type);
                            $t1 = Bridge.getEnumerator(dependencyProperties, System.Windows.DependencyProperty);
                            try {
                                while ($t1.moveNext()) {
                                    var dp = $t1.Current;
                                    var attributeInfo = ($t2 = new Bridge.CustomUIMarkup.Libraries.CodeMirror.AttributeInfo(), $t2.Name = dp.Name, $t2);
                                    if (Bridge.referenceEquals(dp.PropertyType, System.Boolean)) {
                                        attributeInfo.Values = System.Array.init(["true", "false"], System.String);
                                    }

                                    if (Bridge.Reflection.isEnum(dp.PropertyType)) {
                                        attributeInfo.Values = System.Enum.getNames(dp.PropertyType);
                                    }

                                    System.Array.add(tag.Attributes, attributeInfo, Bridge.CustomUIMarkup.Libraries.CodeMirror.AttributeInfo);
                                }
                            } finally {
                                if (Bridge.is($t1, System.IDisposable)) {
                                    $t1.System$IDisposable$dispose();
                                }
                            }if (pair.ChildrenTags != null) {
                                tag.ChildrenTags = pair.ChildrenTags;
                            }
                            System.Array.add(schemaInfo.Tags, tag, Bridge.CustomUIMarkup.Libraries.CodeMirror.TagInfo);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    return schemaInfo;
                }
            }
        },
        fields: {
            Tags: null
        },
        methods: {
            ToJson: function () {
                var $t, $t1;
                var instance = { };

                $t = Bridge.getEnumerator(this.Tags, Bridge.CustomUIMarkup.Libraries.CodeMirror.TagInfo);
                try {
                    while ($t.moveNext()) {
                        var tag = $t.Current;
                        var attributes = { };

                        $t1 = Bridge.getEnumerator(tag.Attributes, Bridge.CustomUIMarkup.Libraries.CodeMirror.AttributeInfo);
                        try {
                            while ($t1.moveNext()) {
                                var attributeInfo = $t1.Current;
                                attributes[attributeInfo.Name] = attributeInfo.Values;
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$dispose();
                            }
                        }
                        var tagObj = { };
                        tagObj.attrs = attributes;
                        tagObj.children = tag.ChildrenTags;

                        instance[tag.Name] = tagObj;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                return instance;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.CodeMirror.TagInfo", {
        fields: {
            Attributes: null,
            ChildrenTags: null,
            Name: null
        }
    });

    Bridge.define("System.Windows.Markup.IAddChild", {
        $kind: "interface"
    });

    /**
     * @memberof System.ComponentModel
     * @callback System.ComponentModel.PropertyChangedEventHandler
     * @param   {System.Object}                                     sender    
     * @param   {System.ComponentModel.PropertyChangedEventArgs}    e
     * @return  {void}
     */

    /** @namespace System.ComponentModel */

    /**
     * The bag
     *
     * @public
     * @class System.ComponentModel.Bag
     * @implements  System.ComponentModel.INotifyPropertyChanged
     * @see {@link System.ComponentModel.INotifyPropertyChanged}
     */
    Bridge.define("System.ComponentModel.Bag", {
        inherits: [System.ComponentModel.INotifyPropertyChanged],
        fields: {
            /**
             * The entries
             *
             * @instance
             * @private
             * @readonly
             * @memberof System.ComponentModel.Bag
             * @type System.Collections.Generic.Dictionary$2
             */
            _entries: null
        },
        events: {
            /**
             * Notifies clients that a property value has changed.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @function addPropertyChanged
             * @param   {System.ComponentModel.PropertyChangedEventHandler}    value
             * @return  {void}
             */
            /**
             * Notifies clients that a property value has changed.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @function removePropertyChanged
             * @param   {System.ComponentModel.PropertyChangedEventHandler}    value
             * @return  {void}
             */
            PropertyChanged: null
        },
        alias: ["addPropertyChanged", "System$ComponentModel$INotifyPropertyChanged$addPropertyChanged",
        "removePropertyChanged", "System$ComponentModel$INotifyPropertyChanged$removePropertyChanged"],
        ctors: {
            init: function () {
                this._entries = new (System.Collections.Generic.Dictionary$2(System.String,System.Object))();
            }
        },
        methods: {
            /**
             * Gets or sets the {@link } with the specified property name.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {string}           propertyName    Name of the property.
             * @return  {System.Object}
             */
            getItem: function (propertyName) {
                return this.GetValue(propertyName);
            },
            /**
             * Gets or sets the {@link } with the specified property name.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {string}           propertyName    Name of the property.
             * @param   {System.Object}    value           The {@link }.
             * @return  {void}
             */
            setItem: function (propertyName, value) {
                this.SetValue(propertyName, value);
            },
            /**
             * Determines whether the specified property name contains key.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {string}     propertyName    Name of the property.
             * @return  {boolean}                    <pre><code>true</code></pre> if the specified property name contains key; otherwise, <pre><code>false</code></pre>.
             */
            ContainsKey$1: function (propertyName) {
                return this._entries.containsKey(propertyName);
            },
            /**
             * Determines whether the specified property name contains key.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {System.Enum}    propertyName    Name of the property.
             * @return  {boolean}                        <pre><code>true</code></pre> if the specified property name contains key; otherwise, <pre><code>false</code></pre>.
             */
            ContainsKey: function (propertyName) {
                return this.ContainsKey$1(System.Enum.toString(Bridge.getType(propertyName), propertyName));
            },
            /**
             * Gets the value.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {string}           propertyName    Name of the property.
             * @return  {System.Object}
             */
            GetValue: function (propertyName) {
                var value = { v : null };
                this._entries.tryGetValue(propertyName, value);
                return value.v;
            },
            /**
             * Sets the value.
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {string}           propertyName    Name of the property.
             * @param   {System.Object}    value           The value.
             * @return  {void}
             */
            SetValue: function (propertyName, value) {
                var oldValue = this.GetValue(propertyName);

                if (!Bridge.referenceEquals(oldValue, null)) {
                    if (Bridge.equals(oldValue, value)) {
                        return;
                    }
                }

                this._entries.set(propertyName, value);

                this.OnPropertyChanged$1(propertyName, value, oldValue);
            },
            /**
             * Called when [property changed].
             *
             * @instance
             * @private
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {string}           prop        The property.
             * @param   {System.Object}    newValue    The new value.
             * @param   {System.Object}    oldValue    The old value.
             * @return  {void}
             */
            OnPropertyChanged$1: function (prop, newValue, oldValue) {
                !Bridge.staticEquals(this.PropertyChanged, null) ? this.PropertyChanged(this, new System.ComponentModel.BagChangedEventArgs.$ctor2(prop, newValue, oldValue)) : null;
            },
            /**
             * Called when [property changed].
             *
             * @instance
             * @public
             * @this System.ComponentModel.Bag
             * @memberof System.ComponentModel.Bag
             * @param   {string}    prop    The property.
             * @return  {void}
             */
            OnPropertyChanged: function (prop) {
                !Bridge.staticEquals(this.PropertyChanged, null) ? this.PropertyChanged(this, new System.ComponentModel.BagChangedEventArgs.ctor(prop)) : null;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Align", {
        $kind: "enum",
        statics: {
            fields: {
                Top: 0,
                Bottom: 1,
                Right: 2,
                Left: 3,
                Center: 4
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.IconType", {
        $kind: "enum",
        statics: {
            fields: {
                content: 0,
                edit: 1,
                bug: 2,
                alternate_github: 3,
                music: 4,
                world: 5,
                search: 6,
                green_check: 7,
                large_red_delete_link: 8,
                disabled_warning_sign: 9,
                add_to_calendar: 10,
                address_book: 11,
                address_book_outline: 12,
                address_card: 13,
                address_card_outline: 14,
                alarm: 15,
                alarm_mute: 16,
                alarm_mute_outline: 17,
                alarm_outline: 18,
                at: 19,
                browser: 20,
                calendar: 21,
                calendar_outline: 22,
                checked_calendar: 23,
                cloud: 24,
                code: 25,
                comment: 26,
                comment_outline: 27,
                comments: 28,
                comments_outline: 29,
                copyright: 30,
                creative_commons: 31,
                dashboard: 32,
                delete_calendar: 33,
                external: 34,
                external_square: 35,
                eyedropper: 36,
                feed: 37,
                find: 38,
                hand_pointer: 39,
                handshake: 40,
                hashtag: 41,
                heartbeat: 42,
                history: 43,
                home: 44,
                hourglass_empty: 45,
                hourglass_end: 46,
                hourglass_full: 47,
                hourglass_half: 48,
                hourglass_start: 49,
                id_badge: 50,
                id_card: 51,
                id_card_outline: 52,
                idea: 53,
                image: 54,
                inbox: 55,
                industry: 56,
                lab: 57,
                mail: 58,
                mail_outline: 59,
                mail_square: 60,
                mouse_pointer: 61,
                open_envelope: 62,
                open_envelope_outline: 63,
                options: 64,
                paint_brush: 65,
                payment: 66,
                percent: 67,
                podcast: 68,
                privacy: 69,
                protect: 70,
                registered: 71,
                remove_from_calendar: 72,
                setting: 73,
                settings: 74,
                shop: 75,
                shopping_bag: 76,
                shopping_basket: 77,
                sidebar: 78,
                signal: 79,
                sitemap: 80,
                tag: 81,
                tags: 82,
                tasks: 83,
                terminal: 84,
                text_telephone: 85,
                ticket: 86,
                trademark: 87,
                trophy: 88,
                window_close: 89,
                window_close_outline: 90,
                window_maximize: 91,
                window_minimize: 92,
                window_restore: 93,
                add_to_cart: 94,
                add_user: 95,
                adjust: 96,
                archive: 97,
                ban: 98,
                bookmark: 99,
                call: 100,
                call_square: 101,
                clone: 102,
                cloud_download: 103,
                cloud_upload: 104,
                talk: 105,
                talk_outline: 106,
                compress: 107,
                configure: 108,
                download: 109,
                erase: 110,
                exchange: 111,
                expand: 112,
                external_share: 113,
                filter: 114,
                hide: 115,
                in_cart: 116,
                Lock: 117,
                mail_forward: 118,
                group_object: 119,
                ungroup_object: 120,
                pin: 121,
                print: 122,
                random: 123,
                recycle: 124,
                refresh: 125,
                remove_bookmark: 126,
                remove_user: 127,
                repeat: 128,
                reply_all: 129,
                reply: 130,
                retweet: 131,
                send: 132,
                send_outline: 133,
                share_alternate: 134,
                share_alternate_square: 135,
                share: 136,
                share_square: 137,
                sign_in: 138,
                sign_out: 139,
                theme: 140,
                translate: 141,
                undo: 142,
                unhide: 143,
                unlock_alternate: 144,
                unlock: 145,
                upload: 146,
                wait: 147,
                wizard: 148,
                write: 149,
                write_square: 150,
                object_group: 151,
                object_ungroup: 152,
                announcement: 153,
                birthday: 154,
                help_circle: 155,
                help_circle_outline: 156,
                help: 157,
                info_circle: 158,
                info: 159,
                warning_circle: 160,
                warning: 161,
                warning_sign: 162,
                child: 163,
                doctor: 164,
                handicap: 165,
                spy: 166,
                student: 167,
                user: 168,
                user_circle: 169,
                user_circle_outline: 170,
                user_outline: 171,
                users: 172,
                female: 173,
                gay: 174,
                genderless: 175,
                heterosexual: 176,
                intergender: 177,
                lesbian: 178,
                male: 179,
                man: 180,
                neuter: 181,
                non_binary_transgender: 182,
                other_gender_horizontal: 183,
                other_gender: 184,
                other_gender_vertical: 185,
                transgender: 186,
                woman: 187,
                block_layout: 188,
                crop: 189,
                grid_layout: 190,
                list_layout: 191,
                maximize: 192,
                resize_horizontal: 193,
                resize_vertical: 194,
                zoom: 195,
                zoom_out: 196,
                anchor: 197,
                bar: 198,
                bathtub: 199,
                bomb: 200,
                book: 201,
                bullseye: 202,
                calculator: 203,
                cocktail: 204,
                diamond: 205,
                fax: 206,
                fire_extinguisher: 207,
                fire: 208,
                flag_checkered: 209,
                flag: 210,
                flag_outline: 211,
                gift: 212,
                hand_lizard: 213,
                hand_peace: 214,
                hand_paper: 215,
                hand_rock: 216,
                hand_scissors: 217,
                hand_spock: 218,
                law: 219,
                leaf: 220,
                legal: 221,
                lemon: 222,
                life_ring: 223,
                lightning: 224,
                magnet: 225,
                money: 226,
                moon: 227,
                plane: 228,
                puzzle: 229,
                road: 230,
                rocket: 231,
                shipping: 232,
                shower: 233,
                snowflake: 234,
                soccer: 235,
                sticky_note: 236,
                sticky_note_outline: 237,
                suitcase: 238,
                sun: 239,
                thermometer_empty: 240,
                thermometer_quarter: 241,
                thermometer_half: 242,
                thermometer_three_quarters: 243,
                thermometer_full: 244,
                travel: 245,
                treatment: 246,
                tv: 247,
                umbrella: 248,
                asterisk: 249,
                certificate: 250,
                circle: 251,
                circle_notched: 252,
                circle_thin: 253,
                crosshairs: 254,
                cube: 255,
                cubes: 256,
                ellipsis_horizontal: 257,
                ellipsis_vertical: 258,
                quote_left: 259,
                quote_right: 260,
                spinner: 261,
                square: 262,
                square_outline: 263,
                add_circle: 264,
                add_square: 265,
                check_circle: 266,
                check_circle_outline: 267,
                check_square: 268,
                checkmark_box: 269,
                checkmark: 270,
                minus_circle: 271,
                minus: 272,
                minus_square: 273,
                minus_square_outline: 274,
                move: 275,
                plus: 276,
                plus_square_outline: 277,
                radio: 278,
                remove_circle: 279,
                remove_circle_outline: 280,
                remove: 281,
                selected_radio: 282,
                toggle_off: 283,
                toggle_on: 284,
                area_chart: 285,
                bar_chart: 286,
                camera_retro: 287,
                newspaper: 288,
                film: 289,
                line_chart: 290,
                photo: 291,
                pie_chart: 292,
                sound: 293,
                angle_double_down: 294,
                angle_double_left: 295,
                angle_double_right: 296,
                angle_double_up: 297,
                angle_down: 298,
                angle_left: 299,
                angle_right: 300,
                angle_up: 301,
                arrow_circle_down: 302,
                arrow_circle_left: 303,
                arrow_circle_outline_down: 304,
                arrow_circle_outline_left: 305,
                arrow_circle_outline_right: 306,
                arrow_circle_outline_up: 307,
                arrow_circle_right: 308,
                arrow_circle_up: 309,
                arrow_down: 310,
                arrow_left: 311,
                arrow_right: 312,
                arrow_up: 313,
                caret_down: 314,
                caret_left: 315,
                caret_right: 316,
                caret_up: 317,
                chevron_circle_down: 318,
                chevron_circle_left: 319,
                chevron_circle_right: 320,
                chevron_circle_up: 321,
                chevron_down: 322,
                chevron_left: 323,
                chevron_right: 324,
                chevron_up: 325,
                long_arrow_down: 326,
                long_arrow_left: 327,
                long_arrow_right: 328,
                long_arrow_up: 329,
                pointing_down: 330,
                pointing_left: 331,
                pointing_right: 332,
                pointing_up: 333,
                toggle_down: 334,
                toggle_left: 335,
                toggle_right: 336,
                toggle_up: 337,
                mobile: 338,
                tablet: 339,
                battery_empty: 340,
                battery_low: 341,
                battery_medium: 342,
                battery_high: 343,
                battery_full: 344,
                desktop: 345,
                disk_outline: 346,
                game: 347,
                keyboard: 348,
                laptop: 349,
                plug: 350,
                power: 351,
                file_archive_outline: 352,
                file_audio_outline: 353,
                file_code_outline: 354,
                file_excel_outline: 355,
                file: 356,
                file_image_outline: 357,
                file_outline: 358,
                file_pdf_outline: 359,
                file_powerpoint_outline: 360,
                file_text: 361,
                file_text_outline: 362,
                file_video_outline: 363,
                file_word_outline: 364,
                folder: 365,
                folder_open: 366,
                folder_open_outline: 367,
                folder_outline: 368,
                level_down: 369,
                level_up: 370,
                trash: 371,
                trash_outline: 372,
                barcode: 373,
                bluetooth_alternative: 374,
                bluetooth: 375,
                css3: 376,
                database: 377,
                fork: 378,
                html5: 379,
                microchip: 380,
                openid: 381,
                qrcode: 382,
                rss: 383,
                rss_square: 384,
                server: 385,
                usb: 386,
                empty_heart: 387,
                empty_star: 388,
                frown: 389,
                heart: 390,
                meh: 391,
                smile: 392,
                star_half_empty: 393,
                star_half: 394,
                star: 395,
                thumbs_down: 396,
                thumbs_outline_down: 397,
                thumbs_outline_up: 398,
                thumbs_up: 399,
                backward: 400,
                closed_captioning: 401,
                eject: 402,
                fast_backward: 403,
                fast_forward: 404,
                forward: 405,
                mute: 406,
                pause_circle: 407,
                pause_circle_outline: 408,
                pause: 409,
                play: 410,
                record: 411,
                step_backward: 412,
                step_forward: 413,
                stop_circle: 414,
                stop_circle_outline: 415,
                stop: 416,
                unmute: 417,
                video_play: 418,
                video_play_outline: 419,
                volume_down: 420,
                volume_off: 421,
                volume_up: 422,
                bicycle: 423,
                building: 424,
                building_outline: 425,
                bus: 426,
                car: 427,
                coffee: 428,
                compass: 429,
                emergency: 430,
                first_aid: 431,
                food: 432,
                h: 433,
                hospital: 434,
                hotel: 435,
                location_arrow: 436,
                map: 437,
                map_outline: 438,
                map_pin: 439,
                map_signs: 440,
                marker: 441,
                military: 442,
                motorcycle: 443,
                paw: 444,
                ship: 445,
                space_shuttle: 446,
                spoon: 447,
                street_view: 448,
                subway: 449,
                taxi: 450,
                train: 451,
                tree: 452,
                university: 453,
                television: 454,
                columns: 455,
                sort_alphabet_ascending: 456,
                sort_alphabet_descending: 457,
                sort_ascending: 458,
                sort_content_ascending: 459,
                sort_content_descending: 460,
                sort_descending: 461,
                sort: 462,
                sort_numeric_ascending: 463,
                sort_numeric_descending: 464,
                table: 465,
                align_center: 466,
                align_justify: 467,
                align_left: 468,
                align_right: 469,
                attach: 470,
                bold: 471,
                copy: 472,
                cut: 473,
                font: 474,
                header: 475,
                indent: 476,
                italic: 477,
                linkify: 478,
                list: 479,
                ordered_list: 480,
                outdent: 481,
                paragraph: 482,
                paste: 483,
                save: 484,
                strikethrough: 485,
                subscript: 486,
                superscript: 487,
                text_cursor: 488,
                text_height: 489,
                text_width: 490,
                underline: 491,
                unlinkify: 492,
                unordered_list: 493,
                bitcoin: 494,
                dollar: 495,
                euro: 496,
                lira: 497,
                pound: 498,
                ruble: 499,
                rupee: 500,
                shekel: 501,
                won: 502,
                yen: 503,
                american_express: 504,
                credit_card_alternative: 505,
                diners_club: 506,
                discover: 507,
                google_wallet: 508,
                japan_credit_bureau: 509,
                mastercard: 510,
                paypal_card: 511,
                paypal: 512,
                stripe: 513,
                visa: 514,
                wheelchair: 515,
                asl_interpreting: 516,
                assistive_listening_systems: 517,
                audio_description: 518,
                blind: 519,
                braille: 520,
                deafness: 521,
                low_vision: 522,
                sign_language: 523,
                universal_access: 524,
                volume_control_phone: 525,
                adn: 526,
                amazon: 527,
                android: 528,
                angellist: 529,
                apple: 530,
                bandcamp: 531,
                behance: 532,
                behance_square: 533,
                bitbucket: 534,
                bitbucket_square: 535,
                black_tie: 536,
                buysellads: 537,
                chrome: 538,
                codepen: 539,
                codiepie: 540,
                connectdevelop: 541,
                contao: 542,
                dashcube: 543,
                delicious: 544,
                deviantart: 545,
                digg: 546,
                dribble: 547,
                dropbox: 548,
                drupal: 549,
                eercast: 550,
                empire: 551,
                envira_gallery: 552,
                etsy: 553,
                expeditedssl: 554,
                facebook_f: 555,
                facebook: 556,
                facebook_square: 557,
                firefox: 558,
                first_order: 559,
                flickr: 560,
                font_awesome: 561,
                fonticons: 562,
                fort_awesome: 563,
                forumbee: 564,
                foursquare: 565,
                free_code_camp: 566,
                gg_circle: 567,
                gg: 568,
                git: 569,
                git_square: 570,
                github_alternate: 571,
                github: 572,
                github_square: 573,
                gitlab: 574,
                gittip: 575,
                glide_g: 576,
                glide: 577,
                google: 578,
                google_plus_circle: 579,
                google_plus: 580,
                google_plus_square: 581,
                grav: 582,
                hacker_news: 583,
                houzz: 584,
                imdb: 585,
                instagram: 586,
                internet_explorer: 587,
                ioxhost: 588,
                joomla: 589,
                jsfiddle: 590,
                lastfm: 591,
                lastfm_square: 592,
                leanpub: 593,
                linkedin: 594,
                linkedin_square: 595,
                linode: 596,
                linux: 597,
                maxcdn: 598,
                meanpath: 599,
                medium: 600,
                meetup: 601,
                microsoft_edge: 602,
                mixcloud: 603,
                modx: 604,
                odnoklassniki: 605,
                odnoklassniki_square: 606,
                opencart: 607,
                opera: 608,
                optinmonster: 609,
                pagelines: 610,
                pied_piper_alternate: 611,
                pied_piper_hat: 612,
                pied_piper: 613,
                pinterest: 614,
                pinterest_square: 615,
                pocket: 616,
                product_hunt: 617,
                qq: 618,
                quora: 619,
                ravelry: 620,
                rebel: 621,
                reddit_alien: 622,
                reddit: 623,
                reddit_square: 624,
                renren: 625,
                safari: 626,
                scribd: 627,
                sellsy: 628,
                shirtsinbulk: 629,
                simplybuilt: 630,
                skyatlas: 631,
                skype: 632,
                slack: 633,
                slideshare: 634,
                snapchat_ghost: 635,
                snapchat: 636,
                snapchat_square: 637,
                soundcloud: 638,
                spotify: 639,
                stack_exchange: 640,
                stack_overflow: 641,
                steam: 642,
                steam_square: 643,
                stumbleupon_circle: 644,
                stumbleupon: 645,
                superpowers: 646,
                telegram: 647,
                tencent_weibo: 648,
                themeisle: 649,
                trello: 650,
                tripadvisor: 651,
                tumblr: 652,
                tumblr_square: 653,
                twitch: 654,
                twitter: 655,
                twitter_square: 656,
                viacoin: 657,
                viadeo: 658,
                viadeo_square: 659,
                vimeo: 660,
                vimeo_square: 661,
                vine: 662,
                vk: 663,
                wechat: 664,
                weibo: 665,
                whatsapp: 666,
                wikipedia: 667,
                windows: 668,
                wordpress: 669,
                wpbeginner: 670,
                wpexplorer: 671,
                wpforms: 672,
                xing: 673,
                xing_square: 674,
                y_combinator: 675,
                yahoo: 676,
                yelp: 677,
                yoast: 678,
                youtube: 679,
                youtube_play: 680,
                youtube_square: 681,
                dribbble: 682,
                disabled_users: 683,
                spinner_loading: 684,
                notched_circle_loading: 685,
                asterisk_loading: 686,
                fitted_help: 687,
                mini_home: 688,
                tiny_home: 689,
                small_home: 690,
                large_home: 691,
                big_home: 692,
                huge_home: 693,
                massive_home: 694,
                close_link: 695,
                help_link: 696,
                horizontally_flipped_cloud: 697,
                vertically_flipped_cloud: 698,
                clockwise_rotated_cloud: 699,
                counterclockwise_rotated_cloud: 700,
                circular_users: 701,
                circular_teal_users: 702,
                circular_inverted_users: 703,
                circular_inverted_teal_users: 704,
                bordered_users: 705,
                bordered_teal_users: 706,
                bordered_inverted_black_users: 707,
                bordered_inverted_teal_users: 708,
                red_users: 709,
                orange_users: 710,
                yellow_users: 711,
                olive_users: 712,
                green_users: 713,
                teal_users: 714,
                blue_users: 715,
                violet_users: 716,
                purple_users: 717,
                pink_users: 718,
                brown_users: 719,
                grey_users: 720,
                black_users: 721,
                inverted_users: 722,
                inverted_red_users: 723,
                inverted_orange_users: 724,
                inverted_yellow_users: 725,
                inverted_olive_users: 726,
                inverted_green_users: 727,
                inverted_teal_users: 728,
                inverted_blue_users: 729,
                inverted_violet_users: 730,
                inverted_purple_users: 731,
                inverted_pink_users: 732,
                inverted_brown_users: 733,
                inverted_grey_users: 734,
                big_thin_circle: 735,
                big_red_dont: 736,
                black_user: 737,
                big_loading_sun: 738,
                corner_add: 739,
                top_left_corner_add: 740,
                top_right_corner_add: 741,
                bottom_left_corner_add: 742,
                bottom_right_corner_add: 743,
                inverted_corner_add: 744,
                close: 745,
                question: 746
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord", {
        statics: {
            fields: {
                unitsMap: null
            },
            ctors: {
                init: function () {
                    this.unitsMap = System.Array.init([
                        "zero", 
                        "one", 
                        "two", 
                        "three", 
                        "four", 
                        "five", 
                        "six", 
                        "seven", 
                        "eight", 
                        "nine", 
                        "ten", 
                        "eleven", 
                        "twelve", 
                        "thirteen", 
                        "fourteen", 
                        "fifteen", 
                        "sixteen", 
                        "seventeen", 
                        "eighteen", 
                        "nineteen"
                    ], System.String);
                }
            },
            methods: {
                ToWord: function (value) {
                    return Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord.unitsMap[System.Array.index(value, Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord.unitsMap)];
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Size", {
        $kind: "enum",
        statics: {
            fields: {
                Mini: 0,
                Tiny: 1,
                Small: 2,
                Medium: 3,
                Large: 4,
                Big: 5,
                Huge: 6,
                Massive: 7
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Tokenizers.BindingExpressionTokenDefinitions", {
        statics: {
            props: {
                Value: {
                    get: function () {
                        return function (_o1) {
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.Binding, "binding", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.Mode, "mode", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.TwoWay, "twoway", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.LeftBracket, "\\{", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.RightBracket, "\\}", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.OpenParenthesis, "\\(", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.CloseParenthesis, "\\)", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.Equals, "=", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.This, "this", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.NotEquals, "!=", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType["Identifier"], "[a-zA-Z_$][a-zA-Z0-9_$]*", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.StringValue, "'([^']*)'", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.NumberValue, "\\d+", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.Comma, ",", 1));
                                _o1.add(new Bridge.CustomUIMarkup.Tokenizers.TokenDefinition(Bridge.CustomUIMarkup.Tokenizers.TokenType.Dot, ".", 1));
                                return _o1;
                            }(new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Tokenizers.TokenDefinition)).ctor());
                    }
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Tokenizers.Token", {
        fields: {
            TokenType: 0,
            Value: null
        },
        ctors: {
            ctor: function (tokenType) {
                this.$initialize();
                this.TokenType = tokenType;
                this.Value = "";
            },
            $ctor1: function (tokenType, value) {
                this.$initialize();
                this.TokenType = tokenType;
                this.Value = value;
            }
        },
        methods: {
            Clone: function () {
                return new Bridge.CustomUIMarkup.Tokenizers.Token.$ctor1(this.TokenType, this.Value);
            },
            toString: function () {
                return "{" + System.Enum.toString(Bridge.CustomUIMarkup.Tokenizers.TokenType, this.TokenType) + ":" + (this.Value || "") + "}";
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Tokenizers.TokenDefinition", {
        fields: {
            _precedence: 0,
            _regex: null,
            _tokenType: 0
        },
        ctors: {
            ctor: function (tokenType, regexPattern, precedence) {
                this.$initialize();
                this._regex = new System.Text.RegularExpressions.Regex.ctor(regexPattern, 1);
                this._tokenType = tokenType;
                this._precedence = precedence;
            }
        },
        methods: {
            FindMatches: function (inputString) {
                return new (Bridge.GeneratorEnumerable$1(Bridge.CustomUIMarkup.Tokenizers.TokenMatch))(Bridge.fn.bind(this, function (inputString) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        matches,
                        len,
                        i,
                        match,
                        $t,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(Bridge.CustomUIMarkup.Tokenizers.TokenMatch))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        matches = this._regex.matches(inputString);
                                            len = matches.getCount();
                                            i = 0;
                                            $step = 1;
                                            continue;
                                    }
                                    case 1: {
                                        if ( i < len ) {
                                                $step = 2;
                                                continue;
                                            }
                                        $step = 5;
                                        continue;
                                    }
                                    case 2: {
                                        match = matches.get(i);

                                            $enumerator.current = ($t = new Bridge.CustomUIMarkup.Tokenizers.TokenMatch(), $t["StartIndex"] = match.getIndex(), $t["EndIndex"] = ((match.getIndex() + match.getLength()) | 0), $t.TokenType = this._tokenType, $t.Value = match.getValue(), $t.Precedence = this._precedence, $t);
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        i = (i + 1) | 0;
                                        $step = 1;
                                        continue;
                                    }
                                    case 5: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }, arguments));
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Tokenizers.Tokenizer", {
        fields: {
            TokenDefinitions: null
        },
        methods: {
            Tokenize: function (data) {
                var $t;
                var tokenDefinitions = this.TokenDefinitions;

                if (tokenDefinitions == null) {
                    throw new System.ArgumentException("TokenDefinitions");
                }

                var tokenMatches = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Tokenizers.TokenMatch)).ctor();

                $t = Bridge.getEnumerator(tokenDefinitions, Bridge.CustomUIMarkup.Tokenizers.TokenDefinition);
                try {
                    while ($t.moveNext()) {
                        var tokenDefinition = $t.Current;
                        tokenMatches.addRange(System.Linq.Enumerable.from(tokenDefinition.FindMatches(data)).toList(Bridge.CustomUIMarkup.Tokenizers.TokenMatch));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                var items = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Tokenizers.Token)).ctor();

                var groupedByIndex = System.Linq.Enumerable.from(tokenMatches).groupBy(function (x) {
                        return x["StartIndex"];
                    }).orderBy(function (x) {
                    return x.key();
                }).toList(System.Linq.Grouping$2);

                var lastMatch = null;

                var len = groupedByIndex.Count;
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var bestMatch = groupedByIndex.getItem(i).orderBy(function (x) {
                        return x.Precedence;
                    }).first();
                    if (lastMatch != null && bestMatch["StartIndex"] < lastMatch["EndIndex"]) {
                        continue;
                    }

                    items.add(new Bridge.CustomUIMarkup.Tokenizers.Token.$ctor1(bestMatch.TokenType, bestMatch.Value));

                    lastMatch = bestMatch;
                }

                return items;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Tokenizers.TokenMatch", {
        fields: {
            "EndIndex": 0,
            Precedence: 0,
            "StartIndex": 0,
            TokenType: 0,
            Value: null
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Tokenizers.TokenType", {
        $kind: "enum",
        statics: {
            fields: {
                Binding: 0,
                Mode: 1,
                TwoWay: 2,
                LeftBracket: 3,
                RightBracket: 4,
                OpenParenthesis: 5,
                CloseParenthesis: 6,
                "Identifier": 7,
                Comma: 8,
                Dot: 9,
                Equals: 10,
                This: 11,
                NotEquals: 12,
                StringValue: 13,
                SequenceTerminator: 14,
                NumberValue: 15
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.Builder", {
        statics: {
            methods: {
                GetRootNode: function (xmlString) {
                    var $t;
                    try {
                        return ($t = $.parseXML(xmlString)) != null ? $t.firstChild : null;
                    }
                    catch (e) {
                        e = System.Exception.create(e);
                        throw new System.Xml.XmlException("XmlParseErrorOccured.", e);
                    }
                },
                IsUserDefinedTag: function (tag) {
                    return System.Linq.Enumerable.from(tag).contains(46) || System.Linq.Enumerable.from(tag).contains(45) || System.Linq.Enumerable.from(tag).contains(58);
                }
            }
        },
        fields: {
            XmlString: null,
            _lineNumberToControlMap: null,
            _rootNode: null,
            Caller: null,
            DataContext: null,
            "IsDesignMode": false,
            Result: null,
            TypeFinder: null,
            XmlDocument: null
        },
        props: {
            LineNumberToControlMap: {
                get: function () {
                    if (this._lineNumberToControlMap == null) {
                        this._lineNumberToControlMap = new (System.Collections.Generic.Dictionary$2(System.Int32,System.Object))();
                    }

                    return this._lineNumberToControlMap;
                }
            }
        },
        ctors: {
            init: function () {
                this.TypeFinder = new Bridge.CustomUIMarkup.UI.TypeFinder();
            }
        },
        methods: {
            Build: function () {
                var rootNode = (this._rootNode = Bridge.CustomUIMarkup.UI.Builder.GetRootNode(this.XmlString));

                return this.BuildNode(rootNode);
            },
            FocusToLine: function (lineNumber) {
                lineNumber = (lineNumber + 1) | 0;
                var component = { v : null };
                this._lineNumberToControlMap != null ? this._lineNumberToControlMap.tryGetValue(lineNumber, component) : null;
                if (component.v == null) {
                    return;
                }

                var query = Bridge.cast(component.v, System.Windows.FrameworkElement)._root;

                Bridge.CustomUIMarkup.Common.Extensions.highlight(query);
            },
            BuildNode: function (xmlNode) {
                var $t, $t1;
                var instance = this.CreateInstance(xmlNode);

                if (this["IsDesignMode"]) {
                    var lineNumber = Bridge.CustomUIMarkup.Common.Extensions.GetOriginalLineNumber(xmlNode, this._rootNode, this.XmlString);

                    this.LineNumberToControlMap.set(lineNumber, instance);
                }

                if (instance.DataContext == null) {
                    instance.DataContext = this.DataContext;
                }

                if (instance._root == null) {
                    instance.InitDOM();
                }

                instance.InvokeAfterInitDOM();

                var attributes = xmlNode.attributes;

                var len = attributes.length;
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var nodeAttribute = attributes[i];

                    if (Bridge.referenceEquals(nodeAttribute.nodeName, "DataContext")) {
                        continue;
                    }

                    this.ProcessAttribute(instance, nodeAttribute.nodeName, nodeAttribute.nodeValue);
                }

                $t = Bridge.getEnumerator(xmlNode.childNodes);
                try {
                    while ($t.moveNext()) {
                        var childNode = $t.Current;
                        if (childNode.nodeType === 8) {
                            continue;
                        }

                        if (childNode.nodeType === 3) {
                            // skip empty spaces
                            var html = $(childNode).text();
                            if (System.String.isNullOrWhiteSpace(html)) {
                                continue;
                            }

                            // maybe <div> {LastName} </div>
                            var bindingInfo = System.Windows.Data.BindingInfo.TryParseExpression(html);
                            if (bindingInfo != null) {
                                bindingInfo.Source = this.DataContext;
                                bindingInfo.Target = instance;
                                bindingInfo.TargetPath = System.Windows.PropertyPath.op_Implicit("InnerHTML");

                                bindingInfo.Connect();
                                continue;
                            }

                            instance["InnerHTML"] = html;
                            continue;
                        }

                        var subControl = this.BuildNode(childNode);

                        var subControlDataContextAttribute = childNode.attributes.DataContext;
                        if (subControlDataContextAttribute == null) {
                            ($t1 = new System.Windows.Data.BindingInfo(), $t1.BindingMode = System.Windows.Data.BindingMode.OneWay, $t1.Source = instance, $t1.SourcePath = System.Windows.PropertyPath.op_Implicit("DataContext"), $t1.Target = subControl, $t1.TargetPath = System.Windows.PropertyPath.op_Implicit("DataContext"), $t1).Connect();
                        } else {
                            var bi = System.Windows.Data.BindingInfo.TryParseExpression(subControlDataContextAttribute.nodeValue);
                            if (bi == null) {
                                throw new System.InvalidOperationException("InvalidBindingExpression:" + (subControlDataContextAttribute.nodeValue || ""));
                            }
                            bi.BindingMode = System.Windows.Data.BindingMode.OneWay;
                            bi.Source = instance;
                            bi.SourcePath = System.Windows.PropertyPath.op_Implicit("DataContext." + (bi.SourcePath.Path || ""));
                            bi.Target = subControl;
                            bi.TargetPath = System.Windows.PropertyPath.op_Implicit("DataContext");
                            bi.Connect();
                        }


                        instance.Add(subControl);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                return instance;
            },
            CreateInstance: function (xmlNode) {
                var $t, $t1;
                var tag = xmlNode.nodeName.toUpperCase();

                var controlType = ($t = this.TypeFinder) != null ? $t.FindType(tag) : null;

                if (controlType == null) {
                    if (Bridge.CustomUIMarkup.UI.Builder.IsUserDefinedTag(xmlNode.nodeName) === false) {
                        return ($t1 = new System.Windows.FrameworkElement(), $t1._root = System.Windows.DOM.CreateElement(xmlNode.nodeName), $t1);
                    }

                    throw new System.ArgumentException("NotRecognizedTag:" + (tag || ""));
                }

                return Bridge.cast(Bridge.createInstance(controlType), System.Windows.FrameworkElement);
            },
            ProcessAttribute: function (instance, name, value) {
                var $t;
                var nameUpperCase = name.toUpperCase();

                if (Bridge.referenceEquals(name, "class")) {
                    name = "Class";
                }

                var targetProperty = System.ComponentModel.ReflectionHelper.FindProperty(instance, name);

                var bi = System.Windows.Data.BindingInfo.TryParseExpression(value);
                if (bi != null) {
                    var eventInfo = System.ComponentModel.ReflectionHelper.FindEvent(instance, name);
                    if (eventInfo != null) {
                        var methodInfo = System.ComponentModel.ReflectionHelper.GetMethodInfo(this.DataContext, bi.SourcePath.Path);

                        var handler = Bridge.Reflection.createDelegate(methodInfo, this.DataContext);

                        Bridge.Reflection.midel(eventInfo.ad, instance)(handler);

                        return;
                    }

                    if (System.String.contains(name,".") === false) {
                        if (targetProperty == null) {
                            ($t = new System.Windows.Data.HTMLBindingInfo(), $t.Source = this.DataContext, $t.SourcePath = System.Windows.PropertyPath.op_Implicit(bi.SourcePath.Path), $t.Target$1 = instance._root, $t.TargetPath = System.Windows.PropertyPath.op_Implicit(name), $t.BindingMode = System.Windows.Data.BindingMode.OneWay, $t).Connect();

                            return;
                        }
                    }


                    bi.SourcePath = new System.Windows.PropertyPath("DataContext." + (bi.SourcePath.Path || ""));
                    bi.Source = instance;

                    // bi.Source = DataContext;
                    bi.Target = instance;
                    bi.TargetPath = System.Windows.PropertyPath.op_Implicit(name);

                    bi.Connect();

                    return;
                }

                if (targetProperty != null) {
                    if (Bridge.Reflection.isEnum(targetProperty.rt)) {
                        System.ComponentModel.ReflectionHelper.SetPropertyValue(instance, name, System.Enum.parse(targetProperty.rt, value, true));
                        return;
                    }

                    var converterAttributes = System.Attribute.getCustomAttributes(targetProperty, System.ComponentModel.TypeConverterAttribute);
                    var firstConverterAtribute = converterAttributes != null ? System.Linq.Enumerable.from(converterAttributes).firstOrDefault(null, null) : null;
                    if (firstConverterAtribute != null) {
                        var converter = Bridge.cast(firstConverterAtribute, System.ComponentModel.TypeConverterAttribute);
                        var valueConverter = Bridge.cast(Bridge.createInstance(converter._type), System.Windows.Data.IValueConverter);
                        var convertedValue = valueConverter.System$Windows$Data$IValueConverter$Convert(value, Bridge.Reflection.getMembers(Bridge.getType(instance), 16, 284, name).rt, null, System.Globalization.CultureInfo.getCurrentCulture());

                        System.ComponentModel.ReflectionHelper.SetPropertyValue(instance, name, convertedValue);
                        return;
                    }

                    System.ComponentModel.ReflectionHelper.SetPropertyValue(instance, name, Bridge.CustomUIMarkup.Common.ConvertHelper.ChangeType(value, targetProperty.rt));
                    return;
                }

                if (System.String.startsWith(name, "on.")) {
                    var eventName = System.Extensions.RemoveFromStart(name, "on.");

                    // support this format: this.Notify(OnContactClicked)
                    if (System.String.startsWith(value, "this.")) {
                        var invocationInfo = Bridge.CustomUIMarkup.UI.Builder.InvocationInfo.ParseFromString(value);

                        if (System.Nullable.gt((invocationInfo.Parameters != null ? invocationInfo.Parameters.Count : null), 1)) {
                            throw new System.ArgumentException(value);
                        }

                        var mi = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 8, 284, invocationInfo.MethodName);

                        instance.On(eventName, Bridge.fn.bind(this, function () {
                            Bridge.Reflection.midel(mi, Bridge.unbox(this.Caller))(System.Linq.Enumerable.from(invocationInfo.Parameters).first());
                        }));
                        return;
                    }

                    var methodInfo1 = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 8, 284, value);

                    instance.On(eventName, Bridge.fn.bind(this, function () {
                        Bridge.Reflection.midel(methodInfo1, Bridge.unbox(this.Caller))(null);
                    }));
                    return;
                }

                if (System.String.startsWith(nameUpperCase, "CSS.")) {
                    var styleAttributeName = name.substr(4);
                    instance._root.css(styleAttributeName, value);
                    return;
                }

                // css.Pseudo.backgroundImage
                if (System.String.startsWith(nameUpperCase, "CSS.PSEUDO.")) {
                    throw new System.ArgumentException();
                    // var pseudoAttributeName = name.Substring(11);
                    // DOM.head.Append("<style>#" + instance.Id + "::" + pseudoAttributeName + "{ content:'bar' }</style>");
                    // return;
                }

                if (Bridge.referenceEquals(name, "x.Name")) {
                    var fi = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 4, 284, value);

                    Bridge.Reflection.fieldAccess(fi, Bridge.unbox(this.Caller), instance);
                    return;
                }

                instance._root.attr(name, value);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.Builder.InvocationInfo", {
        statics: {
            methods: {
                /**
                 * Parses from string.
                     <p>Example: this.Notify(OnContactClicked)</p>
                 *
                 * @static
                 * @public
                 * @this Bridge.CustomUIMarkup.UI.Builder.InvocationInfo
                 * @memberof Bridge.CustomUIMarkup.UI.Builder.InvocationInfo
                 * @param   {string}                                             value
                 * @return  {Bridge.CustomUIMarkup.UI.Builder.InvocationInfo}
                 */
                ParseFromString: function (value) {
                    var $t;
                    var invocationInfo = new Bridge.CustomUIMarkup.UI.Builder.InvocationInfo();

                    var arr = System.String.split(value, [46, 40, 41].map(function(i) {{ return String.fromCharCode(i); }}));

                    $t = Bridge.getEnumerator(arr);
                    try {
                        while ($t.moveNext()) {
                            var token = $t.Current;
                            if (System.String.isNullOrWhiteSpace(token)) {
                                continue;
                            }
                            if (Bridge.referenceEquals(token.trim(), "this")) {
                                invocationInfo.HasThis = true;
                                continue;
                            }

                            if (invocationInfo.MethodName == null) {
                                invocationInfo.MethodName = token.trim();
                                continue;
                            }

                            if (invocationInfo.Parameters == null) {
                                invocationInfo.Parameters = new (System.Collections.Generic.List$1(System.String)).ctor();
                            }

                            invocationInfo.Parameters.add(token);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    return invocationInfo;
                }
            }
        },
        fields: {
            HasThis: false,
            MethodName: null,
            Parameters: null
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.TypeFinder", {
        statics: {
            fields: {
                _tags: null,
                _tagTypeMap: null
            },
            props: {
                Tags: {
                    get: function () {
                        return Bridge.CustomUIMarkup.UI.TypeFinder._tags;
                    }
                },
                TagTypeMap: {
                    get: function () {
                        var $t;
                        if (Bridge.CustomUIMarkup.UI.TypeFinder._tagTypeMap == null) {
                            Bridge.CustomUIMarkup.UI.TypeFinder._tagTypeMap = new (System.Collections.Generic.Dictionary$2(System.String,Function))();
                            $t = Bridge.getEnumerator(Bridge.CustomUIMarkup.UI.TypeFinder._tags);
                            try {
                                while ($t.moveNext()) {
                                    var intellisenseInfo = $t.Current;
                                    Bridge.CustomUIMarkup.UI.TypeFinder._tagTypeMap.set(intellisenseInfo.TagName.toUpperCase(), intellisenseInfo.Type);
                                }
                            } finally {
                                if (Bridge.is($t, System.IDisposable)) {
                                    $t.System$IDisposable$dispose();
                                }
                            }}

                        return Bridge.CustomUIMarkup.UI.TypeFinder._tagTypeMap;
                    }
                }
            },
            ctors: {
                init: function () {
                    this._tags = function (_o1) {
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("swiper.slider", Bridge.CustomUIMarkup.Libraries.Swiper.Slider));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("div", System.Windows.FrameworkElement_div));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("a", System.Windows.FrameworkElement_a));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("img", System.Windows.FrameworkElement_img));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("SplitPanel", System.Windows.Controls.SplitPanel));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("computer.tablet.only.row", Bridge.CustomUIMarkup.Libraries.SemanticUI.computer_tablet_only_row));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.navbar.menu", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_navbar_menu));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("mobile.only.row", Bridge.CustomUIMarkup.Libraries.SemanticUI.mobile_only_row));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("right.menu", Bridge.CustomUIMarkup.Libraries.SemanticUI.right_menu));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.page.grid", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_page_grid));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("left.menu", Bridge.CustomUIMarkup.Libraries.SemanticUI.left_menu));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.text.menu.navbar", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_text_menu_navbar));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.button", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("TabPanel", Bridge.CustomUIMarkup.Libraries.SemanticUI.TabPanel));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("Tab", Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("card", Bridge.CustomUIMarkup.Libraries.SemanticUI.card));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.card", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_card));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.cards", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_cards));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("description", Bridge.CustomUIMarkup.Libraries.SemanticUI.description));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("content", Bridge.CustomUIMarkup.Libraries.SemanticUI.content));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("extra-content", Bridge.CustomUIMarkup.Libraries.SemanticUI.ExtraContent));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.basic.button", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_basic_button));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("carousel", Bridge.CustomUIMarkup.Libraries.jssor.Carousel));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.divider", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_divider));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.menu", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_menu));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("item", Bridge.CustomUIMarkup.Libraries.SemanticUI.item));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.vertical.menu", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_vertical_menu));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("textInput", Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("textBox", Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("combo", Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("comboBox", Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.selection.dropdown", Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.equal.width.grid", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_equal_width_grid));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("textArea", Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.container", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_container));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.stacked", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_stacked));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.hidden.clearing.divider", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_hidden_clearing_divider));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.grid", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_grid));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui page grid", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_page_grid));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("field", Bridge.CustomUIMarkup.Libraries.SemanticUI.Field));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.form", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_form));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("row", Bridge.CustomUIMarkup.Libraries.SemanticUI.Row));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("column", Bridge.CustomUIMarkup.Libraries.SemanticUI.column));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.header.1", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_header_1));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.header.2", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_header_2));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.header.3", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_header_3));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("header", Bridge.CustomUIMarkup.Libraries.SemanticUI.header));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.image", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_image));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("icon", Bridge.CustomUIMarkup.Libraries.SemanticUI.Icon));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("ui.segment", Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_segment));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("textBlock", System.Windows.Controls.TextBlock));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("xmlEditor", Bridge.CustomUIMarkup.UI.XmlEditor));
                            _o1.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo("uiEditor", Bridge.CustomUIMarkup.UI.UIEditor));
                            return _o1;
                        }(new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo)).ctor());
                }
            },
            methods: {
                RegisterTag: function (tagName, type) {
                    Bridge.CustomUIMarkup.UI.TypeFinder._tags.add(new Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo(tagName, type));
                }
            }
        },
        methods: {
            FindType: function (tag) {
                if (Bridge.CustomUIMarkup.UI.TypeFinder.TagTypeMap.containsKey(tag)) {
                    return Bridge.CustomUIMarkup.UI.TypeFinder.TagTypeMap.get(tag);
                }

                return null;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup_DesignerSamples.App", {
        statics: {
            props: {
                "TestUI": {
                    get: function () {
                        return "\r\n\r\n<div class='ui two row grid' HeightPercent = '100' WidthPercent = '100' >\r\n    <row>\r\n        <column Align='Center'>\r\n             <ComboBox \r\n                ItemsSource = '{Binding Examples}' \r\n                DisplayMemberPath = 'Name'\r\n                SelectedValuePath = 'XmlTemplate' \r\n\t\t        SelectedValue = '{Binding CurrentTemplate}' />\r\n        </column>\r\n    </row>\r\n    \r\n    <row HeightPercent = '100'>\r\n        <UIEditor SourceText = '{CurrentTemplate}'  />\r\n    </row>\r\n        \r\n</div>\r\n\r\n\r\n";
                    }
                }
            },
            methods: {
                Init: function () {
                    $(Bridge.CustomUIMarkup_DesignerSamples.App.RenderUIEditor);
                },
                RenderUIEditor: function () {
                    var $t;
                    var builder = ($t = new Bridge.CustomUIMarkup.UI.Builder(), $t.DataContext = new Bridge.CustomUIMarkup_DesignerSamples.ExampleDataContext(), $t.XmlString = Bridge.CustomUIMarkup_DesignerSamples.App["TestUI"], $t);

                    var element = builder.Build();

                    element.Root.appendTo(document.body);
                }
            }
        }
    });

    Bridge.define("Bridge.jQuery2.Extensions", {
        statics: {
            methods: {
                AppendTo: function (query, list) {
                    System.Array.add(list, query, $);

                    return query;
                },
                Css_display_Inline_Block: function (query) {
                    query.css("display", "inline-block");

                    return query;
                },
                Css_float_Left: function (query) {
                    query.css("float", "left");

                    return query;
                },
                Css_height_max: function (query) {
                    query.css("height", "100%");

                    return query;
                },
                Css_width: function (query, value) {
                    query.css("width", value);

                    return query;
                },
                Css_width_max: function (query) {
                    query.css("width", "100%");

                    return query;
                }
            }
        }
    });

    /**
     * The bag changed event arguments
     *
     * @public
     * @class System.ComponentModel.BagChangedEventArgs
     * @augments System.ComponentModel.PropertyChangedEventArgs
     * @see {@link System.ComponentModel.PropertyChangedEventArgs}
     */
    Bridge.define("System.ComponentModel.BagChangedEventArgs", {
        inherits: [System.ComponentModel.PropertyChangedEventArgs],
        fields: {
            /**
             * Gets the new value.
             *
             * @instance
             * @public
             * @memberof System.ComponentModel.BagChangedEventArgs
             * @function NewValue
             * @type System.Object
             */
            NewValue: null,
            /**
             * Gets the old value.
             *
             * @instance
             * @public
             * @memberof System.ComponentModel.BagChangedEventArgs
             * @function OldValue
             * @type System.Object
             */
            OldValue: null
        },
        ctors: {
            /**
             * Initializes a new instance of the {@link } class.
             *
             * @instance
             * @public
             * @this System.ComponentModel.BagChangedEventArgs
             * @memberof System.ComponentModel.BagChangedEventArgs
             * @param   {string}    propertyName    Name of the property.
             * @return  {void}
             */
            ctor: function (propertyName) {
                this.$initialize();
                System.ComponentModel.PropertyChangedEventArgs.ctor.call(this, propertyName);
            },
            /**
             * Initializes a new instance of the {@link } class.
             *
             * @instance
             * @public
             * @this System.ComponentModel.BagChangedEventArgs
             * @memberof System.ComponentModel.BagChangedEventArgs
             * @param   {string}           propertyName    Name of the property.
             * @param   {System.Object}    newValue        The new value.
             * @return  {void}
             */
            $ctor1: function (propertyName, newValue) {
                this.$initialize();
                System.ComponentModel.PropertyChangedEventArgs.ctor.call(this, propertyName);
                this.NewValue = newValue;
            },
            /**
             * Initializes a new instance of the {@link } class.
             *
             * @instance
             * @public
             * @this System.ComponentModel.BagChangedEventArgs
             * @memberof System.ComponentModel.BagChangedEventArgs
             * @param   {string}           propertyName    Name of the property.
             * @param   {System.Object}    newValue        The new value.
             * @param   {System.Object}    oldValue        The old value.
             * @return  {void}
             */
            $ctor2: function (propertyName, newValue, oldValue) {
                this.$initialize();
                System.ComponentModel.PropertyChangedEventArgs.ctor.call(this, propertyName);
                this.NewValue = newValue;
                this.OldValue = oldValue;
            }
        }
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @return  {void}
     */

    Bridge.define("System.ComponentModel.Extensions", {
        statics: {
            methods: {
                /**
                 * invoke action when propertyName raised
                 *
                 * @static
                 * @public
                 * @this System.ComponentModel.Extensions
                 * @memberof System.ComponentModel.Extensions
                 * @param   {System.ComponentModel.INotifyPropertyChanged}    notifyPropertyChanged    
                 * @param   {string}                                          propertyName             
                 * @param   {System.Action}                                   action
                 * @return  {void}
                 */
                OnPropertyChanged: function (notifyPropertyChanged, propertyName, action) {
                    if (notifyPropertyChanged == null) {
                        throw new System.ArgumentNullException("notifyPropertyChanged");
                    }
                    notifyPropertyChanged.System$ComponentModel$INotifyPropertyChanged$addPropertyChanged(function (s, e) {
                        if (Bridge.referenceEquals(e.propertyName, propertyName)) {
                            action();
                        }
                    });
                }
            }
        }
    });

    Bridge.define("System.ComponentModel.ReflectionHelper", {
        statics: {
            props: {
                AllBindings: {
                    get: function () {
                        return 61;
                    }
                }
            },
            methods: {
                FindEvent: function (instance, eventName) {
                    if (instance == null) {
                        throw new System.ArgumentNullException("instance");
                    }

                    if (eventName == null) {
                        throw new System.ArgumentNullException("eventName");
                    }

                    var type = Bridge.getType(instance);
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    return Bridge.Reflection.getMembers(type, 2, 284, eventName);
                },
                FindMethodInfo: function (instance, methodName) {
                    if (instance == null) {
                        throw new System.ArgumentNullException("instance");
                    }

                    if (methodName == null) {
                        throw new System.ArgumentNullException("methodName");
                    }

                    var type = Bridge.getType(instance);
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    return Bridge.Reflection.getMembers(type, 8, 284, methodName);
                },
                FindMethodInfo$1: function (instance, methodName, parameterTypes) {
                    if (parameterTypes === void 0) { parameterTypes = []; }
                    if (instance == null) {
                        throw new System.ArgumentNullException("instance");
                    }

                    if (methodName == null) {
                        throw new System.ArgumentNullException("methodName");
                    }

                    var type = Bridge.getType(instance);
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    return Bridge.Reflection.getMembers(type, 8, System.ComponentModel.ReflectionHelper.AllBindings | 256, methodName, parameterTypes);
                },
                FindProperty: function (instance, propertyName) {
                    if (instance == null) {
                        throw new System.ArgumentNullException("instance");
                    }

                    if (propertyName == null) {
                        throw new System.ArgumentNullException("propertyName");
                    }

                    var type = Bridge.getType(instance);
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    return Bridge.Reflection.getMembers(type, 16, 284, propertyName);
                },
                GetPropertyValue: function (instance, propertyName) {


                    var propertyInfo = System.ComponentModel.ReflectionHelper.FindProperty(instance, propertyName);

                    if (propertyInfo == null) {
                        var bag = Bridge.as(instance, System.ComponentModel.Bag);
                        if (bag != null) {
                            return bag.GetValue(propertyName);
                        }

                        throw new System.MissingMemberException((Bridge.Reflection.getTypeFullName(Bridge.getType(instance)) || "") + "->" + (propertyName || ""));
                    }

                    return Bridge.Reflection.midel(propertyInfo.g, Bridge.unbox(instance))();
                },
                Invoke: function (instance, methodName) {
                    var methodInfo = System.ComponentModel.ReflectionHelper.FindMethodInfo(instance, methodName);
                    if (methodInfo == null) {
                        throw new System.MissingMemberException((Bridge.Reflection.getTypeFullName(Bridge.getType(instance)) || "") + "->" + (methodName || ""));
                    }

                    return Bridge.Reflection.midel(methodInfo, Bridge.unbox(instance))(null);
                },
                Invoke$1: function (instance, methodName, parameters) {
                    if (parameters === void 0) { parameters = []; }
                    var methodInfo = System.ComponentModel.ReflectionHelper.FindMethodInfo(instance, methodName);
                    if (methodInfo == null) {
                        throw new System.MissingMemberException((Bridge.Reflection.getTypeFullName(Bridge.getType(instance)) || "") + "->" + (methodName || ""));
                    }

                    return Bridge.Reflection.midel(methodInfo, Bridge.unbox(instance)).apply(null, Bridge.unbox(parameters));
                },
                SetPropertyValue: function (instance, propertyName, value) {
                    if (instance == null) {
                        throw new System.ArgumentNullException("instance");
                    }

                    if (propertyName == null) {
                        throw new System.ArgumentNullException("propertyName");
                    }



                    var type = Bridge.getType(instance);
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    var propertyInfo = System.ComponentModel.ReflectionHelper.FindProperty(instance, propertyName);

                    if (propertyInfo == null) {
                        var bag = Bridge.as(instance, System.ComponentModel.Bag);
                        if (bag != null) {
                            bag.SetValue(propertyName, value);
                            return;
                        }

                        throw new System.MissingMemberException((Bridge.Reflection.getTypeFullName(type) || "") + "->" + (propertyName || ""));
                    }

                    Bridge.Reflection.midel(propertyInfo.s, Bridge.unbox(instance))(Bridge.unbox(value));
                },
                GetMethodInfo: function (instance, methodName) {
                    var methodInfo = System.ComponentModel.ReflectionHelper.FindMethodInfo(instance, methodName);
                    if (methodInfo == null) {
                        throw new System.MissingMemberException("MethodNotFound: " + (Bridge.Reflection.getTypeFullName(Bridge.getType(instance)) || "") + " -> " + (methodName || ""));
                    }
                    return methodInfo;
                }
            }
        }
    });

    Bridge.define("System.ComponentModel.TypeConverterAttribute", {
        inherits: [System.Attribute],
        statics: {
            fields: {
                Default: null
            },
            ctors: {
                ctor: function () {
                    System.ComponentModel.TypeConverterAttribute.Default = new System.ComponentModel.TypeConverterAttribute.ctor();
                }
            }
        },
        fields: {
            _type: null,
            typeName: null
        },
        props: {
            ConverterTypeName: {
                get: function () {
                    return this.typeName;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this.typeName = "";
            },
            $ctor2: function (type) {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this._type = type;
                this.typeName = Bridge.Reflection.getTypeQName(type);
            },
            $ctor1: function (typeName) {
                this.$initialize();
                System.Attribute.ctor.call(this);
                System.Extensions2.ToUpper(typeName, System.Globalization.CultureInfo.invariantCulture);
                this.typeName = typeName;
            }
        },
        methods: {
            equals: function (obj) {
                var typeConverterAttribute = Bridge.as(obj, System.ComponentModel.TypeConverterAttribute);
                if (typeConverterAttribute == null) {
                    return false;
                }
                return Bridge.referenceEquals(typeConverterAttribute.ConverterTypeName, this.typeName);
            },
            getHashCode: function () {
                return Bridge.getHashCode(this.typeName);
            }
        }
    });

    Bridge.define("System.Convert2", {
        statics: {
            fields: {
                ConvertTypes: null
            },
            props: {
                Thread_CurrentThread_CurrentCulture: {
                    get: function () {
                        return System.Globalization.CultureInfo.getCurrentCulture();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.ConvertTypes = System.Array.init([
                        System.Empty, 
                        System.Object, 
                        System.DBNull, 
                        System.Boolean, 
                        System.Char, 
                        System.SByte, 
                        System.Byte, 
                        System.Int16, 
                        System.UInt16, 
                        System.Int32, 
                        System.UInt32, 
                        System.Int64, 
                        System.UInt64, 
                        System.Single, 
                        System.Double, 
                        System.Decimal, 
                        System.DateTime, 
                        System.Object, 
                        System.String
                    ], Function);
                }
            },
            methods: {
                ChangeType$2: function (value, typeCode) {
                    return System.Convert2.ChangeType$3(value, typeCode, System.Convert2.Thread_CurrentThread_CurrentCulture);
                },
                ChangeType$3: function (value, typeCode, provider) {
                    if (value == null && (typeCode === System.TypeCode.Empty || typeCode === System.TypeCode.String || typeCode === System.TypeCode.Object)) {
                        return null;
                    }

                    switch (typeCode) {
                        case System.TypeCode.Boolean: 
                            return Bridge.box(System.Convert.toBoolean(value, provider), System.Boolean, System.Boolean.toString);
                        case System.TypeCode.Char: 
                            return Bridge.box(System.Convert.toChar(value, provider, 1), System.Char, String.fromCharCode, System.Char.getHashCode);
                        case System.TypeCode.SByte: 
                            return Bridge.box(System.Convert.toSByte(value, provider), System.SByte);
                        case System.TypeCode.Byte: 
                            return Bridge.box(System.Convert.toByte(value, provider), System.Byte);
                        case System.TypeCode["Int16"]: 
                            return Bridge.box(System.Convert.toInt16(value, provider), System.Int16);
                        case System.TypeCode["UInt16"]: 
                            return Bridge.box(System.Convert.toUInt16(value, provider), System.UInt16);
                        case System.TypeCode["Int32"]: 
                            return Bridge.box(System.Convert.toInt32(value, provider), System.Int32);
                        case System.TypeCode["UInt32"]: 
                            return Bridge.box(System.Convert.toUInt32(value, provider), System.UInt32);
                        case System.TypeCode["Int64"]: 
                            return System.Convert.toInt64(value, provider);
                        case System.TypeCode["UInt64"]: 
                            return System.Convert.toUInt64(value, provider);
                        case System.TypeCode.Single: 
                            return Bridge.box(System.Convert.toSingle(value, provider), System.Single, System.Single.format, System.Single.getHashCode);
                        case System.TypeCode.Double: 
                            return Bridge.box(System.Convert.toDouble(value, provider), System.Double, System.Double.format, System.Double.getHashCode);
                        case System.TypeCode.Decimal: 
                            return System.Convert.toDecimal(value, provider);
                        case System.TypeCode.DateTime: 
                            return Bridge.box(System.Convert.toDateTime(value, provider), System.DateTime, System.DateTime.format);
                        case System.TypeCode.String: 
                            return System.Convert.toString(value, provider);
                        case System.TypeCode.Object: 
                            return value;
                        case System.TypeCode.DBNull: 
                            throw new System.InvalidCastException(System.Convert2.Environment_GetResourceString("InvalidCast_DBNull"));
                        case System.TypeCode.Empty: 
                            throw new System.InvalidCastException(System.Convert2.Environment_GetResourceString("InvalidCast_Empty"));
                        default: 
                            throw new System.ArgumentException(System.Convert2.Environment_GetResourceString("Arg_UnknownTypeCode"));
                    }
                },
                ChangeType: function (value, conversionType) {
                    return System.Convert2.ChangeType$1(value, conversionType, System.Convert2.Thread_CurrentThread_CurrentCulture);
                },
                ChangeType$1: function (value, conversionType, provider) {
                    if (conversionType == null) {
                        throw new System.ArgumentNullException("conversionType");
                    }

                    if (value == null) {
                        //if (conversionType.IsValueType)
                        //{
                        //    throw new InvalidCastException(Environment_GetResourceString("InvalidCast_CannotCastNullToValueType"));
                        //}
                        return null;
                    }

                    if (Bridge.referenceEquals(Bridge.getType(value), conversionType)) {
                        return value;
                    }

                    var rtConversionType = conversionType;

                    if (Bridge.referenceEquals(rtConversionType, System.Boolean)) {
                        return Bridge.box(System.Convert.toBoolean(value, provider), System.Boolean, System.Boolean.toString);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.Char, System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toChar(value, provider, 1), System.Char, String.fromCharCode, System.Char.getHashCode);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.SByte, System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toSByte(value, provider), System.SByte);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.Byte, System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toByte(value, provider), System.Byte);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode["Int16"], System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toInt16(value, provider), System.Int16);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode["UInt16"], System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toUInt16(value, provider), System.UInt16);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode["Int32"], System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toInt32(value, provider), System.Int32);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode["UInt32"], System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toUInt32(value, provider), System.UInt32);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode["Int64"], System.Convert2.ConvertTypes)])) {
                        return System.Convert.toInt64(value, provider);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode["UInt64"], System.Convert2.ConvertTypes)])) {
                        return System.Convert.toUInt64(value, provider);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.Single, System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toSingle(value, provider), System.Single, System.Single.format, System.Single.getHashCode);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.Double, System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toDouble(value, provider), System.Double, System.Double.format, System.Double.getHashCode);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.Decimal, System.Convert2.ConvertTypes)])) {
                        return System.Convert.toDecimal(value, provider);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.DateTime, System.Convert2.ConvertTypes)])) {
                        return Bridge.box(System.Convert.toDateTime(value, provider), System.DateTime, System.DateTime.format);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.String, System.Convert2.ConvertTypes)])) {
                        return System.Convert.toString(value, provider);
                    }
                    if (Bridge.referenceEquals(rtConversionType, System.Convert2.ConvertTypes[System.Array.index(System.TypeCode.Object, System.Convert2.ConvertTypes)])) {
                        return value;
                    }

                    throw new System.NotImplementedException();
                },
                Environment_GetResourceString: function (key) {
                    return key;
                }
            }
        }
    });

    Bridge.define("System.DBNull", {
        statics: {
            fields: {
                Value: null
            },
            ctors: {
                init: function () {
                    this.Value = new System.DBNull();
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            GetTypeCode: function () {
                return System.TypeCode.DBNull;
            },
            toString: function () {
                return "";
            },
            ToString: function (provider) {
                return "";
            }
        }
    });

    Bridge.define("System.Empty", {
        statics: {
            fields: {
                Value: null
            },
            ctors: {
                init: function () {
                    this.Value = new System.Empty();
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            toString: function () {
                return "";
            }
        }
    });

    /**
     * The extensions
     *
     * @static
     * @abstract
     * @public
     * @class System.Extensions
     */
    Bridge.define("System.Extensions", {
        statics: {
            props: {
                /**
                 * Gets the default format provider.
                 *
                 * @static
                 * @private
                 * @readonly
                 * @memberof System.Extensions
                 * @function DefaultFormatProvider
                 * @type System.IFormatProvider
                 */
                DefaultFormatProvider: {
                    get: function () {
                        return System.Globalization.CultureInfo.getCurrentCulture();
                    }
                }
            },
            methods: {
                /**
                 * Removes value from start of str
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {string}    data     
                 * @param   {string}    value
                 * @return  {string}
                 */
                RemoveFromStart: function (data, value) {
                    if (data == null) {
                        return null;
                    }

                    if (System.String.startsWith(data, value)) {
                        return data.substr(value.length, ((data.length - value.length) | 0));
                    }

                    return data;
                },
                /**
                 * Compares the specified right.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}             left              The left.
                 * @param   {System.Object}             right             The right.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {number}
                 */
                Compare: function (left, right, formatProvider) {
                    if (formatProvider === void 0) { formatProvider = null; }
                    if (Bridge.referenceEquals(left, null) && Bridge.referenceEquals(right, null)) {
                        return 0;
                    }

                    if (!System.Extensions.IsNumeric(left)) {
                        throw System.Extensions.ValueMustbeNumeric(left);
                    }

                    if (!System.Extensions.IsNumeric(right)) {
                        throw System.Extensions.ValueMustbeNumeric(right);
                    }

                    return System.Convert.toDecimal(left, formatProvider).compareTo(System.Convert.toDecimal(right, formatProvider));
                },
                /**
                 * Determines whether [is bigger than] [the specified right].
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @throws {System.ArgumentException} 
                 * @param   {System.Object}             left              The left.
                 * @param   {System.Object}             right             The right.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {boolean}                                     <pre><code>true</code></pre> if [is bigger than] [the specified right]; otherwise, <pre><code>false</code></pre>.
                 */
                IsBiggerThan: function (left, right, formatProvider) {
                    if (formatProvider === void 0) { formatProvider = null; }
                    if (Bridge.referenceEquals(left, null) || Bridge.referenceEquals(right, null)) {
                        return false;
                    }

                    if (System.Extensions.IsNumeric(left) && System.Extensions.IsNumeric(right)) {
                        return System.Convert.toDecimal(left, formatProvider).gt(System.Convert.toDecimal(right, formatProvider));
                    }
                    throw new System.ArgumentException(left.toString());
                },
                /**
                 * Determines whether [is not null].
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}    value    The value.
                 * @return  {boolean}                   <pre><code>true</code></pre> if [is not null] [the specified value]; otherwise, <pre><code>false</code></pre>.
                 */
                IsNotNull: function (value) {
                    return !Bridge.referenceEquals(value, null);
                },
                /**
                 * Determines whether this instance is null.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}    value    The value.
                 * @return  {boolean}                   <pre><code>true</code></pre> if the specified value is null; otherwise, <pre><code>false</code></pre>.
                 */
                IsNull: function (value) {
                    return Bridge.referenceEquals(value, null);
                },
                /**
                 * Determines whether this instance is numeric.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @throws {System.ArgumentException} 
                 * @param   {System.Object}    value    The value.
                 * @return  {boolean}                   <pre><code>true</code></pre> if the specified value is numeric; otherwise, <pre><code>false</code></pre>.
                 */
                IsNumeric: function (value) {
                    if (Bridge.referenceEquals(value, null)) {
                        return false;
                    }

                    if (Bridge.is(value, System.Byte) || Bridge.is(value, System.SByte) || Bridge.is(value, System.UInt16) || Bridge.is(value, System.UInt32) || Bridge.is(value, System.UInt64) || Bridge.is(value, System.Int16) || Bridge.is(value, System.Int32) || Bridge.is(value, System.Int64) || Bridge.is(value, System.Decimal) || Bridge.is(value, System.Double) || Bridge.is(value, System.Single)) {
                        return true;
                    }

                    throw new System.ArgumentException(value.toString());
                },
                /**
                 * Determines whether the specified right is same.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}             left              The left.
                 * @param   {System.Object}             right             The right.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {boolean}                                     <pre><code>true</code></pre> if the specified right is same; otherwise, <pre><code>false</code></pre>.
                 */
                IsSame: function (left, right, formatProvider) {
                    if (formatProvider === void 0) { formatProvider = null; }
                    if (Bridge.referenceEquals(left, null)) {
                        return Bridge.referenceEquals(right, null);
                    }

                    var leftAsString = Bridge.as(left, System.String);
                    if (leftAsString != null) {
                        return Bridge.equals(leftAsString, right);
                    }
                    if (Bridge.is(right, System.String)) {
                        return false;
                    }

                    if (System.Extensions.IsNumeric(left) && System.Extensions.IsNumeric(right)) {
                        return System.Convert.toDecimal(left, formatProvider).equalsT(System.Convert.toDecimal(right, formatProvider));
                    }

                    return Bridge.equals(left, right);
                },
                /**
                 * Determines whether this instance is string.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}    value    The value.
                 * @return  {?boolean}
                 */
                IsString: function (value) {
                    return Bridge.is(value, System.String);
                },
                /**
                 * To the boolean.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}    value    The value.
                 * @return  {boolean}
                 */
                ToBoolean: function (value) {
                    return System.Extensions.ToBoolean$1(value, System.Extensions.DefaultFormatProvider);
                },
                /**
                 * To the boolean.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @throws {System.ArgumentNullException} value
                 * @param   {System.Object}             value             The value.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {boolean}
                 */
                ToBoolean$1: function (value, formatProvider) {
                    if (System.Extensions.IsNull(value)) {
                        throw new System.ArgumentNullException("value");
                    }
                    return System.Convert.toBoolean(value, formatProvider);
                },
                /**
                 * To the boolean nullable.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}    value    The value.
                 * @return  {?boolean}
                 */
                ToBooleanNullable: function (value) {
                    return System.Extensions.ToBooleanNullable$1(value, System.Extensions.DefaultFormatProvider);
                },
                /**
                 * To the boolean nullable.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}             value             The value.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {?boolean}
                 */
                ToBooleanNullable$1: function (value, formatProvider) {
                    if (System.Extensions.IsNull(value)) {
                        return null;
                    }
                    return System.Convert.toBoolean(value, formatProvider);
                },
                /**
                 * To the decimal.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @throws {System.ArgumentNullException} value
                 * @param   {System.Object}             value             The value.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {number}
                 */
                ToDecimal$1: function (value, formatProvider) {
                    if (System.Extensions.IsNull(value)) {
                        throw new System.ArgumentNullException("value");
                    }
                    return System.Convert.toDecimal(value, formatProvider);
                },
                /**
                 * To the decimal.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @throws {System.ArgumentNullException} value
                 * @param   {System.Object}    value    The value.
                 * @return  {number}
                 */
                ToDecimal: function (value) {
                    if (System.Extensions.IsNull(value)) {
                        throw new System.ArgumentNullException("value");
                    }
                    return System.Extensions.ToDecimal$1(value, System.Extensions.DefaultFormatProvider);
                },
                /**
                 * To the decimal nullable.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}             value             The value.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {?number}
                 */
                ToDecimalNullable$1: function (value, formatProvider) {
                    if (System.Extensions.IsNull(value)) {
                        return System.Decimal.lift(null);
                    }
                    return System.Convert.toDecimal(value, formatProvider);
                },
                /**
                 * To the decimal nullable.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}    value    The value.
                 * @return  {?number}
                 */
                ToDecimalNullable: function (value) {
                    return System.Extensions.ToDecimalNullable$1(value, System.Extensions.DefaultFormatProvider);
                },
                /**
                 * To the int32.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @throws {System.ArgumentNullException} value
                 * @param   {System.Object}    value    The value.
                 * @return  {number}
                 */
                ToInt32: function (value) {
                    if (System.Extensions.IsNull(value)) {
                        throw new System.ArgumentNullException("value");
                    }
                    return System.Convert.toInt32(value, System.Extensions.DefaultFormatProvider);
                },
                /**
                 * To the int32 nullable.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}             value             The value.
                 * @param   {System.IFormatProvider}    formatProvider    The format provider.
                 * @return  {?number}
                 */
                ToInt32Nullable$1: function (value, formatProvider) {
                    if (System.Extensions.IsNull(value)) {
                        return null;
                    }
                    return System.Convert.toInt32(value, formatProvider);
                },
                /**
                 * To the int32 nullable.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}    value
                 * @return  {?number}
                 */
                ToInt32Nullable: function (value) {
                    return System.Extensions.ToInt32Nullable$1(value, System.Globalization.CultureInfo.getCurrentCulture());
                },
                /**
                 * Values the mustbe numeric.
                 *
                 * @static
                 * @private
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}               value    The value.
                 * @return  {System.ArgumentException}
                 */
                ValueMustbeNumeric: function (value) {
                    return new System.ArgumentException(value.toString());
                }
            }
        }
    });

    Bridge.define("System.Extensions2", {
        statics: {
            methods: {
                ToUpper: function (value, culture) {
                    // TODO: eng and turkish
                    return value.toUpperCase();
                }
            }
        }
    });

    Bridge.define("System.MissingMemberException", {
        inherits: [System.Exception],
        ctors: {
            ctor: function (message, innerException) {
                if (innerException === void 0) { innerException = null; }

                this.$initialize();
                System.Exception.ctor.call(this, message, innerException);
            }
        }
    });

    Bridge.define("System.Windows.Data.IValueConverter", {
        $kind: "interface"
    });

    Bridge.define("System.Windows.Controls.Orientation", {
        $kind: "enum",
        statics: {
            fields: {
                Horizontal: 0,
                Vertical: 1
            }
        }
    });

    Bridge.define("System.Windows.Data.BindingInfo", {
        statics: {
            fields: {
                BindingExpressionTokenizer: null
            },
            ctors: {
                init: function () {
                    var $t;
                    this.BindingExpressionTokenizer = ($t = new Bridge.CustomUIMarkup.Tokenizers.Tokenizer(), $t.TokenDefinitions = Bridge.CustomUIMarkup.Tokenizers.BindingExpressionTokenDefinitions.Value, $t);
                }
            },
            methods: {
                TryParseExpression: function (value) {
                    var $t;
                    if (value == null) {
                        return null;
                    }

                    value = value.trim();

                    if (System.String.startsWith(value, "{") === false) {
                        return null;
                    }

                    if (System.String.endsWith(value, "}") === false) {
                        return null;
                    }


                    var sourcePath = null;
                    var bindingMode = { v : System.Windows.Data.BindingMode.TwoWay };

                    var tokens = System.Windows.Data.BindingInfo.BindingExpressionTokenizer.Tokenize(value);
                    var len = System.Array.getCount(tokens, Bridge.CustomUIMarkup.Tokenizers.Token);
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var token = System.Array.getItem(tokens, i, Bridge.CustomUIMarkup.Tokenizers.Token);

                        if (token.TokenType === Bridge.CustomUIMarkup.Tokenizers.TokenType.Binding || Bridge.referenceEquals(token.Value, " ")) {
                            continue;
                        }

                        if (sourcePath == null && token.TokenType === Bridge.CustomUIMarkup.Tokenizers.TokenType["Identifier"]) {
                            sourcePath = "";
                            while (i < len) {
                                token = System.Array.getItem(tokens, i, Bridge.CustomUIMarkup.Tokenizers.Token);

                                if (token.TokenType === Bridge.CustomUIMarkup.Tokenizers.TokenType["Identifier"] || token.TokenType === Bridge.CustomUIMarkup.Tokenizers.TokenType.Dot) {
                                    sourcePath = (sourcePath || "") + (token.Value || "");
                                    i = (i + 1) | 0;
                                } else {
                                    i = (i - 1) | 0;
                                    break;
                                }
                            }

                            continue;
                        }


                        if (token.TokenType === Bridge.CustomUIMarkup.Tokenizers.TokenType.Mode) {
                            System.Enum.tryParse(Bridge.global.System.Windows.Data.BindingMode, System.Array.getItem(tokens, ((i + 2) | 0), Bridge.CustomUIMarkup.Tokenizers.Token).Value, bindingMode);
                        }
                    }

                    return ($t = new System.Windows.Data.BindingInfo(), $t.SourcePath = System.Windows.PropertyPath.op_Implicit(sourcePath), $t.BindingMode = bindingMode.v, $t);
                }
            }
        },
        fields: {
            BindingMode: 0,
            Source: null,
            SourcePath: null,
            Target: null,
            TargetPath: null
        },
        methods: {
            Connect: function () {
                this.ConnectSourceToTarget();

                if (this.BindingMode === System.Windows.Data.BindingMode.TwoWay) {
                    this.ConnectTargetToSource();
                } else {
                    this.TargetPath.Walk(this.Target);
                }

                this.UpdateTarget();
            },
            UpdateSource: function () {
                this.SourcePath.SetPropertyValue(this.TargetPath.GetPropertyValue());
            },
            UpdateTarget: function () {
                this.TargetPath.SetPropertyValue(this.SourcePath.GetPropertyValue());
            },
            ConnectSourceToTarget: function () {
                this.SourcePath.Listen(this.Source, Bridge.fn.cacheBind(this, this.UpdateTarget));
            },
            ConnectTargetToSource: function () {
                this.TargetPath.Listen(this.Target, Bridge.fn.cacheBind(this, this.UpdateSource));
            }
        }
    });

    Bridge.define("System.Windows.Data.BindingMode", {
        $kind: "enum",
        statics: {
            fields: {
                TwoWay: 0,
                OneWay: 1
            }
        }
    });

    Bridge.define("System.Windows.DependencyProperty", {
        statics: {
            fields: {
                Cache: null
            },
            ctors: {
                init: function () {
                    this.Cache = new (System.Collections.Generic.Dictionary$2(System.String,System.Windows.DependencyProperty))();
                }
            },
            methods: {
                GetAllProperties: function (ownerType, addBase) {
                    var $t;
                    if (addBase === void 0) { addBase = true; }

                    if (ownerType == null || Bridge.referenceEquals(ownerType, System.Object)) {
                        return null;
                    }

                    var items = new (System.Collections.Generic.List$1(System.Windows.DependencyProperty)).ctor();

                    var key = System.Windows.DependencyProperty.CreateKey$1(ownerType, null);
                    $t = Bridge.getEnumerator(System.Windows.DependencyProperty.Cache.getKeys(), System.String);
                    try {
                        while ($t.moveNext()) {
                            var cacheKey = $t.Current;
                            if (System.String.startsWith(cacheKey, key)) {
                                items.add(System.Windows.DependencyProperty.Cache.get(cacheKey));
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    if (addBase) {
                        var baseValues = System.Windows.DependencyProperty.GetAllProperties(Bridge.Reflection.getBaseType(ownerType));
                        if (baseValues != null) {
                            items.addRange(baseValues);
                        }
                    }

                    return items;
                },
                CreateKey: function (ownerTypeFullName, propertyName) {
                    return (ownerTypeFullName || "") + "->" + (propertyName || "");
                },
                CreateKey$1: function (ownerType, propertyName) {


                    return System.Windows.DependencyProperty.CreateKey(Bridge.Reflection.getTypeFullName(ownerType), propertyName);
                },
                TryFind: function (ownerType, propertyName) {

                    var key = System.Windows.DependencyProperty.CreateKey$1(ownerType, propertyName);
                    var property = { v : null };
                    System.Windows.DependencyProperty.Cache.tryGetValue(key, property);

                    return property.v;
                },
                Search: function (ownerType, propertyName) {
                    while (true) {
                        if (ownerType == null || Bridge.referenceEquals(ownerType, System.Object)) {
                            return null;
                        }

                        var dependencyProperty = System.Windows.DependencyProperty.TryFind(ownerType, propertyName);
                        if (dependencyProperty != null) {
                            return dependencyProperty;
                        }

                        ownerType = Bridge.Reflection.getBaseType(ownerType);
                    }
                },
                TryInvokeOnPropertyChange: function (instance, name, newValue, oldValue) {
                    var $t, $t1;
                    var dependencyProperty = System.Windows.DependencyProperty.Search(Bridge.getType(instance), name);
                    if (dependencyProperty == null) {
                        return;
                    }
                    if (Bridge.staticEquals((($t = dependencyProperty.PropertyMetadata) != null ? $t.PropertyChangedCallback : null), null)) {
                        return;
                    }

                    ($t1 = dependencyProperty.PropertyMetadata) != null ? $t1.PropertyChangedCallback(instance, new System.Windows.DependencyPropertyChangedEventArgs.$ctor2(name, newValue, oldValue)) : null;
                },
                Register$2: function (description) {
                    if (System.Windows.DependencyProperty.Cache.containsKey(description.Key)) {
                        throw new System.ArgumentException(description.Key);
                    }

                    System.Windows.DependencyProperty.Cache.set(description.Key, description);

                },
                Register: function (name, propertyType, ownerType) {
                    var $t;
                    var dependencyProperty = ($t = new System.Windows.DependencyProperty(), $t.Name = name, $t.PropertyType = propertyType, $t.OwnerType = ownerType, $t);
                    System.Windows.DependencyProperty.Register$2(dependencyProperty);

                    return dependencyProperty;
                },
                Register$1: function (name, propertyType, ownerType, propertyMetadata) {
                    var $t;
                    var dependencyProperty = ($t = new System.Windows.DependencyProperty(), $t.Name = name, $t.PropertyType = propertyType, $t.OwnerType = ownerType, $t.PropertyMetadata = propertyMetadata, $t);
                    System.Windows.DependencyProperty.Register$2(dependencyProperty);

                    return dependencyProperty;
                }
            }
        },
        fields: {
            Name: null,
            OwnerType: null,
            PropertyType: null,
            PropertyMetadata: null
        },
        props: {
            Key: {
                get: function () {
                    return System.Windows.DependencyProperty.CreateKey(Bridge.Reflection.getTypeFullName(this.OwnerType), this.Name);
                }
            }
        }
    });

    Bridge.define("System.Windows.DOM", {
        statics: {
            props: {
                head: {
                    get: function () {
                        return $("head");
                    }
                },
                body: {
                    get: function () {
                        return $("body");
                    }
                }
            },
            methods: {
                ById: function (id) {
                    return $(document.getElementById(id));
                },
                a: function (className) {
                    return System.Windows.DOM.CreateElement$1("a", className);
                },
                button: function (className) {
                    return System.Windows.DOM.CreateElement$1("button", className);
                },
                CreateElement: function (tagName) {
                    return $(document.createElement(tagName));
                },
                CreateElement$1: function (tagName, className) {
                    return $(document.createElement(tagName)).addClass(className);
                },
                div: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("div", className);
                },
                h1: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("h1", className);
                },
                h2: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("h2", className);
                },
                h3: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("h3", className);
                },
                i: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("i", className);
                },
                img: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("img", className);
                },
                input: function (type, className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("input", className).attr("type", type);
                },
                label: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("label", className);
                },
                textarea: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("textarea", className);
                }
            }
        }
    });

    Bridge.define("System.Windows.PropertyMetadata", {
        fields: {
            DefaultValue: null,
            PropertyChangedCallback: null
        },
        ctors: {
            $ctor2: function (propertyChangedCallback) {
                this.$initialize();
                this.PropertyChangedCallback = propertyChangedCallback;
            },
            $ctor1: function (defaultValue, propertyChangedCallback) {
                this.$initialize();
                this.DefaultValue = defaultValue;
                this.PropertyChangedCallback = propertyChangedCallback;
            },
            ctor: function (defaultValue) {
                this.$initialize();
                this.DefaultValue = defaultValue;
            }
        }
    });

    Bridge.define("System.Windows.PropertyPath", {
        statics: {
            methods: {
                op_Implicit: function (path) {
                    return new System.Windows.PropertyPath(path);
                }
            }
        },
        fields: {
            Triggers: null,
            Path: null
        },
        props: {
            LastTrigger: {
                get: function () {
                    return this.Triggers.getItem(((this.Triggers.Count - 1) | 0));
                }
            }
        },
        ctors: {
            init: function () {
                this.Triggers = new (System.Collections.Generic.List$1(System.Windows.PropertyPath.Trigger)).ctor();
            },
            ctor: function (path) {
                this.$initialize();
                this.Path = path;
            }
        },
        methods: {
            Clear: function () {
                this.Triggers.forEach(function (t) {
                    t.StopListen();
                });
                this.Triggers.clear();
            },
            GetPropertyValue: function () {
                if (this.Triggers.Count === 0) {
                    throw new System.InvalidOperationException("PropertyPathProblem:" + (this.Path || ""));
                }

                var lastTrigger = this.LastTrigger;
                var instance = lastTrigger["Instance"];
                var propertyName = lastTrigger.PropertyName;

                var value = System.ComponentModel.ReflectionHelper.GetPropertyValue(instance, propertyName);

                return value;
            },
            Listen: function (instance, onPropertyValueChanged) {
                this.Walk(instance);

                var len = this.Triggers.Count;
                var last = (len - 1) | 0;

                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var trigger = this.Triggers.getItem(i);
                    if (i === last) {
                        trigger.OnPropertyValueChanged = onPropertyValueChanged;
                        trigger.Listen();
                        continue;
                    }

                    trigger.OnPropertyValueChanged = Bridge.fn.bind(this, function () {
                        this.Listen(instance, onPropertyValueChanged);
                        onPropertyValueChanged();
                    });
                    trigger.Listen();
                }
            },
            SetPropertyValue: function (value) {
                var lastTrigger = this.LastTrigger;
                var instance = lastTrigger["Instance"];
                var propertyName = lastTrigger.PropertyName;

                System.ComponentModel.ReflectionHelper.SetPropertyValue(instance, propertyName, value);
            },
            Walk: function (instance) {
                this.Clear();

                this.ParsePath(instance, this.Path);
            },
            ParsePath: function (instance, path) {
                var $t;
                while (true) {
                    if (instance == null) {
                        return;
                    }

                    var firstDat = System.String.indexOf(path, String.fromCharCode(46));

                    if (firstDat < 0) {
                        this.Triggers.add(($t = new System.Windows.PropertyPath.Trigger(), $t["Instance"] = instance, $t.PropertyName = path, $t));
                        return;
                    }

                    var propertyName = path.substr(0, firstDat);

                    this.Triggers.add(($t = new System.Windows.PropertyPath.Trigger(), $t["Instance"] = instance, $t.PropertyName = propertyName, $t));

                    instance = System.ComponentModel.ReflectionHelper.GetPropertyValue(instance, propertyName);

                    path = path.substr(((firstDat + 1) | 0));
                }
            }
        }
    });

    Bridge.define("System.Windows.PropertyPath.Trigger", {
        fields: {
            "Instance": null,
            OnPropertyValueChanged: null,
            PropertyName: null
        },
        props: {
            "InstanceAsNotifyPropertyChanged": {
                get: function () {
                    return Bridge.as(this["Instance"], System.ComponentModel.INotifyPropertyChanged);
                }
            }
        },
        methods: {
            Listen: function () {
                if (this["InstanceAsNotifyPropertyChanged"] == null) {
                    return;
                }
                this["InstanceAsNotifyPropertyChanged"].System$ComponentModel$INotifyPropertyChanged$addPropertyChanged(Bridge.fn.cacheBind(this, this.OnChange));
            },
            StopListen: function () {
                if (this["InstanceAsNotifyPropertyChanged"] == null) {
                    return;
                }
                this["InstanceAsNotifyPropertyChanged"].System$ComponentModel$INotifyPropertyChanged$removePropertyChanged(Bridge.fn.cacheBind(this, this.OnChange));
            },
            toString: function () {
                return System.String.concat(this["Instance"], "->") + (this.PropertyName || "");
            },
            OnChange: function (sender, e) {
                if (Bridge.referenceEquals(e.propertyName, this.PropertyName)) {
                    this.OnPropertyValueChanged();
                }
            }
        }
    });

    Bridge.define("System.Windows.TextWrapping", {
        $kind: "enum",
        statics: {
            fields: {
                WrapWithOverflow: 0,
                NoWrap: 1,
                Wrap: 2
            }
        }
    });

    Bridge.define("System.Windows.Visibility", {
        $kind: "enum",
        statics: {
            fields: {
                Visible: 0,
                Hidden: 1,
                Collapsed: 2
            }
        },
        $utype: System.Byte
    });

    Bridge.define("System.Xml.XmlException", {
        inherits: [System.SystemException],
        ctors: {
            ctor: function (message, innerException) {
                this.$initialize();
                System.SystemException.ctor.call(this, message, innerException);
            }
        }
    });

    Bridge.define("System.Windows.DependencyObject", {
        inherits: [System.ComponentModel.Bag]
    });

    Bridge.define("System.Windows.Controls.BooleanToVisibilityConverter", {
        inherits: [System.Windows.Data.IValueConverter],
        alias: [
            "Convert", "System$Windows$Data$IValueConverter$Convert",
            "ConvertBack", "System$Windows$Data$IValueConverter$ConvertBack"
        ],
        methods: {
            Convert: function (value, targetType, parameter, culture) {
                if (Bridge.is(value, System.Boolean)) {
                    return Bridge.box(System.Nullable.getValue(Bridge.cast(Bridge.unbox(value), System.Boolean)) ? System.Windows.Visibility.Visible : System.Windows.Visibility.Collapsed, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility));
                }

                return Bridge.box(System.Windows.Visibility.Collapsed, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility));
            },
            ConvertBack: function (value, targetType, parameter, culture) {
                if (!(Bridge.is(value, System.Byte))) {
                    return Bridge.box(false, System.Boolean, System.Boolean.toString);
                }
                return Bridge.box(System.Nullable.getValue(Bridge.cast(Bridge.unbox(value), System.Byte)) === System.Windows.Visibility.Visible, System.Boolean, System.Boolean.toString);
            }
        }
    });

    Bridge.define("System.Windows.Data.HTMLBindingInfo", {
        inherits: [System.Windows.Data.BindingInfo],
        statics: {
            methods: {
                TryParseExpression: function (value) {
                    var $t;
                    var bindingInfo = System.Windows.Data.BindingInfo.TryParseExpression(value);
                    if (bindingInfo == null) {
                        return null;
                    }

                    return ($t = new System.Windows.Data.HTMLBindingInfo(), $t.SourcePath = bindingInfo.SourcePath, $t);
                }
            }
        },
        props: {
            Target$1: {
                get: function () {
                    return Bridge.cast(this.Target, $);
                },
                set: function (value) {
                    this.Target = value;
                }
            }
        },
        methods: {
            UpdateTarget: function () {
                var value = this.SourcePath.GetPropertyValue();

                var path = this.TargetPath.Path.toUpperCase();

                if (Bridge.referenceEquals(path, "INNERHTML")) {
                    this.Target$1.html(System.String.concat(value, ""));
                    return;
                }

                if (Bridge.referenceEquals(path, "VALUE")) {
                    this.Target$1.val(System.String.concat(value, ""));
                    return;
                }

                this.Target$1.attr(this.TargetPath.Path, System.String.concat(value, ""));
            },
            ConnectTargetToSource: function () {
                this.Target$1.focusout(Bridge.fn.bind(this, function (ev) {
                        this.UpdateSource();
                    }));
            }
        }
    });

    Bridge.define("System.Windows.DependencyPropertyChangedEventArgs", {
        inherits: [System.ComponentModel.BagChangedEventArgs],
        ctors: {
            ctor: function (propertyName) {
                this.$initialize();
                System.ComponentModel.BagChangedEventArgs.ctor.call(this, propertyName);
            },
            $ctor1: function (propertyName, newValue) {
                this.$initialize();
                System.ComponentModel.BagChangedEventArgs.$ctor1.call(this, propertyName, newValue);
            },
            $ctor2: function (propertyName, newValue, oldValue) {
                this.$initialize();
                System.ComponentModel.BagChangedEventArgs.$ctor2.call(this, propertyName, newValue, oldValue);
            }
        }
    });

    Bridge.define("System.Windows.FrameworkElement", {
        inherits: [System.Windows.DependencyObject,System.Windows.Markup.IAddChild],
        statics: {
            fields: {
                BorderProperty: null,
                ClassProperty: null,
                AddClassProperty: null,
                MarginProperty: null,
                MarginLeftProperty: null,
                MarginRightProperty: null,
                MarginBottomProperty: null,
                MarginTopProperty: null,
                PaddingLeftProperty: null,
                PaddingRightProperty: null,
                PaddingBottomProperty: null,
                PaddingTopProperty: null,
                PaddingProperty: null,
                TextWrappingProperty: null,
                FontWeightProperty: null,
                FontSizeProperty: null,
                WidthProperty: null,
                WidthPercentProperty: null,
                ColorProperty: null,
                "InnerHTMLProperty": null,
                VisibilityProperty: null,
                HeightProperty: null,
                HeightPercentProperty: null,
                BackgroundProperty: null,
                "ID": 0
            },
            ctors: {
                init: function () {
                    this.BorderProperty = System.Windows.DependencyProperty.Register$1("Border", System.String, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("border"));
                    this.ClassProperty = System.Windows.DependencyProperty.Register$1("Class", System.String, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("class"));
                    this.AddClassProperty = System.Windows.DependencyProperty.Register$1("AddClass", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnAddClassChanged));
                    this.MarginProperty = System.Windows.DependencyProperty.Register$1("Margin", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("margin"));
                    this.MarginLeftProperty = System.Windows.DependencyProperty.Register$1("MarginLeft", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("marginLeft"));
                    this.MarginRightProperty = System.Windows.DependencyProperty.Register$1("MarginRight", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("marginRight"));
                    this.MarginBottomProperty = System.Windows.DependencyProperty.Register$1("MarginBottom", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("marginBottom"));
                    this.MarginTopProperty = System.Windows.DependencyProperty.Register$1("MarginTop", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("marginTop"));
                    this.PaddingLeftProperty = System.Windows.DependencyProperty.Register$1("PaddingLeft", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("paddingLeft"));
                    this.PaddingRightProperty = System.Windows.DependencyProperty.Register$1("PaddingRight", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("paddingRight"));
                    this.PaddingBottomProperty = System.Windows.DependencyProperty.Register$1("PaddingBottom", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("paddingBottom"));
                    this.PaddingTopProperty = System.Windows.DependencyProperty.Register$1("PaddingTop", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("paddingTop"));
                    this.PaddingProperty = System.Windows.DependencyProperty.Register$1("Padding", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("padding"));
                    this.TextWrappingProperty = System.Windows.DependencyProperty.Register$1("TextWrapping", System.Windows.TextWrapping, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnTextWrappingChanged));
                    this.FontWeightProperty = System.Windows.DependencyProperty.Register$1("FontWeight", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("fontWeight"));
                    this.FontSizeProperty = System.Windows.DependencyProperty.Register$1("FontSize", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("fontSize"));
                    this.WidthProperty = System.Windows.DependencyProperty.Register$1("Width", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("width"));
                    this.WidthPercentProperty = System.Windows.DependencyProperty.Register$1("WidthPercent", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater$1("width", function (v) {
                        return System.String.concat(v, "%");
                    }));
                    this.ColorProperty = System.Windows.DependencyProperty.Register$1("Color", System.String, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("color"));
                    this["InnerHTMLProperty"] = System.Windows.DependencyProperty.Register$1("InnerHTML", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                    this.VisibilityProperty = System.Windows.DependencyProperty.Register$1("Visibility", System.Windows.Visibility, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnVisibilityChanged));
                    this.HeightProperty = System.Windows.DependencyProperty.Register$1("Height", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("height"));
                    this.HeightPercentProperty = System.Windows.DependencyProperty.Register$1("HeightPercent", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater$1("height", function (v) {
                        return System.String.concat(v, "%");
                    }));
                    this.BackgroundProperty = System.Windows.DependencyProperty.Register$1("Background", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnBackgroundChanged));
                }
            },
            methods: {
                CreateHtmlAttributeUpdater: function (htmlAttribute) {
                    return new System.Windows.PropertyMetadata.$ctor2(function (d, e) {
                        var me = Bridge.cast(d, System.Windows.FrameworkElement);

                        me._root.attr(htmlAttribute, Bridge.cast(e.NewValue, System.String));
                    });
                },
                CreateJQueryCssUpdater: function (jqueryCssAttribute) {
                    return new System.Windows.PropertyMetadata.$ctor2(function (d, e) {
                        var me = Bridge.cast(d, System.Windows.FrameworkElement);

                        me._root.css(jqueryCssAttribute, Bridge.unbox(e.NewValue));
                    });
                },
                CreateJQueryCssUpdater$1: function (jqueryCssAttribute, valueConverter) {
                    return new System.Windows.PropertyMetadata.$ctor2(function (d, e) {
                        var me = Bridge.cast(d, System.Windows.FrameworkElement);

                        me._root.css(jqueryCssAttribute, Bridge.unbox(valueConverter(e.NewValue)));
                    });
                },
                OnAddClassChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    me._root != null ? me._root.addClass(Bridge.cast(e.NewValue, System.String)) : null;
                },
                OnTextWrappingChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));
                    if (value === System.Windows.TextWrapping.NoWrap) {
                        me._root.css("white-space", "nowrap");
                        return;
                    }
                    if (value === System.Windows.TextWrapping.Wrap) {
                        me._root.css("white-space", "normal");
                        return;
                    }

                    throw new System.ArgumentException(System.Enum.toString(System.Windows.TextWrapping, value));
                },
                OnInnerHTMLChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    me._root != null ? me._root.html(Bridge.cast(e.NewValue, System.String)) : null;
                },
                OnVisibilityChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);
                    var value = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Byte));

                    if (value === System.Windows.Visibility.Visible) {
                        me._root.css("visibility", "visible");
                    } else {
                        me._root.css("visibility", "hidden");
                    }
                },
                OnBackgroundChanged: function (d, e) {
                    var fe = Bridge.cast(d, System.Windows.FrameworkElement);
                    var newValue = e.NewValue;

                    if (System.Extensions.IsNull(newValue)) {
                        fe._root.css("background", "");
                        return;
                    }
                    if (Bridge.is(newValue, System.String)) {
                        fe._root.css("background", Bridge.as(newValue, System.String));
                        return;
                    }

                    throw new System.ArgumentException(newValue.toString());
                }
            }
        },
        fields: {
            _root: null,
            _childeren: null,
            _id: null,
            _dataContext: null
        },
        events: {
            BeforeConnectToParent: null,
            AfterAddChild: null,
            BeforeAddChild: null,
            "AfterInitDOM": null
        },
        props: {
            Childeren: {
                get: function () {
                    if (this._childeren == null) {
                        this._childeren = new (System.Collections.Generic.List$1(System.Windows.FrameworkElement)).ctor();
                    }

                    return this._childeren;
                }
            },
            Root: {
                get: function () {
                    return this._root;
                }
            },
            ChildrenCount: {
                get: function () {
                    return System.Nullable.getValueOrDefault((this._childeren != null ? this._childeren.Count : null), 0);
                }
            },
            Border: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.FrameworkElement.BorderProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.BorderProperty, value);
                }
            },
            Class: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.FrameworkElement.ClassProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.ClassProperty, value);
                }
            },
            AddClass: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.FrameworkElement.AddClassProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.AddClassProperty, value);
                }
            },
            Margin: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.MarginProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.MarginProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            MarginLeft: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.MarginLeftProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.MarginLeftProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            MarginRight: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.MarginRightProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.MarginRightProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            MarginBottom: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.MarginBottomProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.MarginBottomProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            MarginTop: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.MarginTopProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.MarginTopProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingLeft: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.PaddingLeftProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.PaddingLeftProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingRight: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.PaddingRightProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.PaddingRightProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingBottom: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.PaddingBottomProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.PaddingBottomProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingTop: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.PaddingTopProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.PaddingTopProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            Padding: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.PaddingProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.PaddingProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            TextWrapping: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("TextWrapping")), System.Int32));
                },
                set: function (value) {
                    this.setItem("TextWrapping", Bridge.box(value, System.Windows.TextWrapping, System.Enum.toStringFn(System.Windows.TextWrapping)));
                }
            },
            FontWeight: {
                get: function () {
                    return this.getItem("FontWeight");
                },
                set: function (value) {
                    this.setItem("FontWeight", value);
                }
            },
            FontSize: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.FontSizeProperty)), System.Double));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.FontSizeProperty, Bridge.box(value, System.Double, System.Double.format, System.Double.getHashCode));
                }
            },
            Width: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.WidthProperty)), System.Double));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.WidthProperty, Bridge.box(value, System.Double, System.Double.format, System.Double.getHashCode));
                }
            },
            WidthPercent: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.WidthPercentProperty)), System.Double));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.WidthPercentProperty, Bridge.box(value, System.Double, System.Double.format, System.Double.getHashCode));
                }
            },
            Color: {
                get: function () {
                    return Bridge.cast(this.getItem("Color"), System.String);
                },
                set: function (value) {
                    this.setItem("Color", value);
                }
            },
            "InnerHTML": {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.FrameworkElement["InnerHTMLProperty"]), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement["InnerHTMLProperty"], value);
                }
            },
            Visibility: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("Visibility")), System.Byte));
                },
                set: function (value) {
                    this.setItem("Visibility", Bridge.box(value, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility)));
                }
            },
            Height: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.HeightProperty)), System.Double));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.HeightProperty, Bridge.box(value, System.Double, System.Double.format, System.Double.getHashCode));
                }
            },
            HeightPercent: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.HeightPercentProperty)), System.Double));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.HeightPercentProperty, Bridge.box(value, System.Double, System.Double.format, System.Double.getHashCode));
                }
            },
            "Id": {
                get: function () {
                    var $t;
                    if (this._id == null) {
                        this._id = "WS-" + Bridge.identity(System.Windows.FrameworkElement["ID"], ($t = (System.Windows.FrameworkElement["ID"] + 1) | 0, System.Windows.FrameworkElement["ID"] = $t, $t));
                    }
                    return this._id;
                }
            },
            DataContext: {
                get: function () {
                    return this._dataContext;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._dataContext, value)) {
                        this._dataContext = value;
                        this.OnPropertyChanged("DataContext");
                    }
                }
            }
        },
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        ctors: {
            ctor: function (tag, className) {
                if (tag === void 0) { tag = null; }
                if (className === void 0) { className = null; }

                this.$initialize();
                System.Windows.DependencyObject.ctor.call(this);
                if (tag != null) {
                    this._root = System.Windows.DOM.CreateElement$1(tag, className);
                }

                this.addPropertyChanged(Bridge.fn.bind(this, function (s, e) {
                    var propertyChangeEventArgs = Bridge.as(e, System.ComponentModel.BagChangedEventArgs);
                    if (propertyChangeEventArgs != null) {
                        System.Windows.DependencyProperty.TryInvokeOnPropertyChange(this, propertyChangeEventArgs.propertyName, propertyChangeEventArgs.NewValue, propertyChangeEventArgs.OldValue);
                    }
                }));
            }
        },
        methods: {
            Add: function (element) {



                !Bridge.staticEquals(element.BeforeConnectToParent, null) ? element.BeforeConnectToParent() : null;

                element._root.appendTo(this._root);

                !Bridge.staticEquals(this.BeforeAddChild, null) ? this.BeforeAddChild(element) : null;

                if (this._childeren == null) {
                    this._childeren = new (System.Collections.Generic.List$1(System.Windows.FrameworkElement)).ctor();
                }

                this._childeren.add(element);

                !Bridge.staticEquals(this.AfterAddChild, null) ? this.AfterAddChild(element) : null;
            },
            GetValue$1: function (dp) {
                var value = this.getItem(dp.Name);
                if (value == null) {
                    if (dp.PropertyMetadata.DefaultValue != null) {
                        return dp.PropertyMetadata.DefaultValue;
                    }
                    if (Bridge.Reflection.isEnum(dp.PropertyType)) {
                        return System.Enum.parse(dp.PropertyType, "0");
                    }
                }
                return value;
            },
            InitDOM: function () {
                if (this._root == null) {
                    this._root = $(document.createElement("div"));
                }

            },
            On: function (eventName, handler) {
                this._root.on(eventName, handler);
            },
            SetValue$1: function (dp, value) {
                this.setItem(dp.Name, value);
            },
            InvokeAfterInitDOM: function () {
                !Bridge.staticEquals(this.AfterInitDOM, null) ? this.AfterInitDOM() : null;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                TextProperty: null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor.TextChanged));
                }
            },
            methods: {
                TextChanged: function (d, e) {
                    var newValue = Bridge.cast(e.NewValue, System.String);

                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor);

                    if (me._editor != null) {
                        if (me.isFiring_OnTextChanged) {
                            return;
                        }

                        me._editor.setValue(newValue);
                    }
                }
            }
        },
        fields: {
            _editor: null,
            isFiring_OnTextChanged: false,
            _cursorCurrentLineNumber: 0,
            "SchemaInfo": null
        },
        events: {
            OnTextChanged: null,
            OnCursorLineNumberChanged: null
        },
        props: {
            Text: {
                get: function () {
                    return Bridge.cast(this.getItem("Text"), System.String);
                },
                set: function (value) {
                    this.setItem("Text", value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this);

                System.ComponentModel.Extensions.OnPropertyChanged(this, "FontSize", Bridge.fn.cacheBind(this, this.FontSizeChanged));
            }
        },
        methods: {
            FontSizeChanged: function () {
                var fontSize = this.FontSize;

                var me = this;

                if (me._editor != null) {
                    if (me.isFiring_OnTextChanged) {
                        return;
                    }

                    me._editor.display.wrapper.style.fontSize = fontSize + 'px';
                    me._editor.refresh();
                }
            },
            InitDOM: function () {
                this._root = System.Windows.DOM.div();
                this.Render();
            },
            Render: function () {
                this._root.empty();

                this._root.css("height", "100%");

                System.Windows.DOM.textarea().prop("id", this["Id"]).appendTo(this._root).css("height", "100%");

                $(Bridge.fn.bind(this, function () {
                        this.Render$1(this["Id"]);
                    }));
            },
            Render$1: function (id) {
                var fontSize = this.getItem("FontSize") == null ? 15 : this.FontSize;

                var schemaInfo = this["SchemaInfo"];

                


function completeAfter(cm, pred) 
{
	var cur = cm.getCursor();
	if (!pred || pred()) setTimeout(function() 
	{
		if (!cm.state.completionActive)
		cm.showHint({completeSingle: false});
	}, 100);
	
	return CodeMirror.Pass;
}

function completeIfAfterLt(cm) 
{
	return completeAfter(cm, function() {
		var cur = cm.getCursor();
		return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == '<';
	});
}

function completeIfInTag(cm) 
{
	return completeAfter(cm, function() 
    {
	  var tok = cm.getTokenAt(cm.getCursor());

	  if (tok.type == 'string' && (!/['']/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1))
      {
            return false;
      }
	  var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
	  return inner.tagName;
	});
}

this._editor = CodeMirror.fromTextArea(document.getElementById(id), 
{
	mode: 'xml',
	lineNumbers: true,
	extraKeys: {
	  '<': completeAfter,
	  '\'': completeIfAfterLt,
	  ' ': completeIfInTag,
	  '=': completeIfInTag,
	  'Ctrl-Space': 'autocomplete'
	},
	hintOptions: {schemaInfo: schemaInfo},
    autoCloseTags:true,
    matchTags: {bothTags: false},
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
});

var me = this;
var onChange = function(editor,changeObj)
{ 
    me.Fire_OnTextChanged.apply(me,[editor,changeObj]);
}

this._editor.on('change', onChange );

var onCursorActivity= function(e)
{ 
    me.Fire_onCursorActivity.apply(me,[e]);
}

this._editor.on('cursorActivity', onCursorActivity );






me._editor.display.wrapper.style.fontSize = fontSize + 'px';
me._editor.display.wrapper.style.height = '95%';



            },
            Fire_OnTextChanged: function (editor, changeObj) {
                if (this.isFiring_OnTextChanged) {
                    return;
                }

                this.isFiring_OnTextChanged = true;

                if (this._editor != null) {
                    var editorValue = this._editor.getValue();
                    this.Text = editorValue;
                }

                !Bridge.staticEquals(this.OnTextChanged, null) ? this.OnTextChanged() : null;

                this.isFiring_OnTextChanged = false;
            },
            Fire_onCursorActivity: function (e) {
                this._cursorCurrentLineNumber = e.doc.getCursor().line;

                !Bridge.staticEquals(this.OnCursorLineNumberChanged, null) ? this.OnCursorLineNumberChanged(this._cursorCurrentLineNumber) : null;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.jssor.Carousel", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                DataSourceProperty: null
            },
            props: {
                Template: {
                    get: function () {
                        return "<div id='jssor_1' style='position:relative;margin:0 auto;top:0px;left:0px;width:980px;height:380px;overflow:hidden;visibility:hidden;'>\r\n    <!-- Loading Screen \r\n    <div data-u='loading' class='jssorl-009-spin' style='position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-color:rgba(0,0,0,0.7);'>\r\n        <img style='margin-top:-19px;position:relative;top:50%;width:38px;height:38px;' src='img/spin.svg' />\r\n    </div> -->\r\n    <div data-u='slides' id='imagesContainer' style='cursor:default;position:relative;top:0px;left:0px;width:980px;height:380px;overflow:hidden;'>\r\n        <!-- template\r\n        <div>\r\n            <img data-u='image' src='img/001.jpg' />\r\n        </div>\r\n        -->\r\n    </div>\r\n    <!-- Bullet Navigator -->\r\n    <div data-u='navigator' class='jssorb051' style='position:absolute;bottom:12px;right:12px;' data-autocenter='1' data-scale='0.5' data-scale-bottom='0.75'>\r\n        <div data-u='prototype' class='i' style='width:16px;height:16px;'>\r\n            <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>\r\n                <circle class='b' cx='8000' cy='8000' r='5800'></circle>\r\n            </svg>\r\n        </div>\r\n    </div>\r\n    <!-- Arrow Navigator -->\r\n    <div data-u='arrowleft' class='jssora051' style='width:55px;height:55px;top:0px;left:25px;' data-autocenter='2' data-scale='0.75' data-scale-left='0.75'>\r\n        <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>\r\n            <polyline class='a' points='11040,1920 4960,8000 11040,14080 '></polyline>\r\n        </svg>\r\n    </div>\r\n    <div data-u='arrowright' class='jssora051' style='width:55px;height:55px;top:0px;right:25px;' data-autocenter='2' data-scale='0.75' data-scale-right='0.75'>\r\n        <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>\r\n            <polyline class='a' points='4960,1920 11040,8000 4960,14080 '></polyline>\r\n        </svg>\r\n    </div>\r\n</div>";
                    }
                }
            },
            ctors: {
                init: function () {
                    this.DataSourceProperty = System.Windows.DependencyProperty.Register$1("DataSource", System.String, Bridge.CustomUIMarkup.Libraries.jssor.Carousel, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.jssor.Carousel.OnDataSourceChanged));
                }
            },
            methods: {
                OnDataSourceChanged: function (d, e) {
                    var $t;
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.jssor.Carousel);

                    me.imagesContainer.empty();

                    var images = Bridge.cast(e.NewValue, System.String);
                    $t = Bridge.getEnumerator(System.Linq.Enumerable.from(System.String.split(images, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (x) {
                            return System.String.isNullOrWhiteSpace(x) === false;
                        }));
                    try {
                        while ($t.moveNext()) {
                            var src = $t.Current;
                            System.Windows.DOM.div().appendTo(me.imagesContainer).append(System.Windows.DOM.img().attr("data-u", "img").attr("src", src));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    $(function () {
                            var id = me["Id"];
                            jssor_1_slider_init(id);
                        });
                }
            }
        },
        props: {
            imagesContainer: {
                get: function () {
                    return this._root.find("#imagesContainer");
                }
            },
            DataSource: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.jssor.Carousel.DataSourceProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.jssor.Carousel.DataSourceProperty, value);
                }
            }
        },
        methods: {
            InitDOM: function () {
                this._root = $(System.Linq.Enumerable.from($.parseHTML(System.String.replaceAll(Bridge.CustomUIMarkup.Libraries.jssor.Carousel.Template, "\n", ""),null)).first());
                this._root.attr("id", this["Id"]);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                SizeProperty: null,
                "IsCenterAlignedProperty": null,
                "IsRightAlignedProperty": null,
                AlignProperty: null
            },
            ctors: {
                init: function () {
                    this.SizeProperty = System.Windows.DependencyProperty.Register$1("Size", Bridge.CustomUIMarkup.Libraries.SemanticUI.Size, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase.OnSizeChanged));
                    this["IsCenterAlignedProperty"] = System.Windows.DependencyProperty.Register$1("IsCenterAligned", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase.IsCenterAlignedChanged));
                    this["IsRightAlignedProperty"] = System.Windows.DependencyProperty.Register$1("IsRightAligned", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase.IsRightAlignedChanged));
                    this.AlignProperty = System.Windows.DependencyProperty.Register$1("Align", Bridge.CustomUIMarkup.Libraries.SemanticUI.Align, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase.OnAlignChanged));
                }
            },
            methods: {
                OnSizeChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase);

                    var newValue = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));

                    me._root.addClass(System.Enum.toString(Bridge.CustomUIMarkup.Libraries.SemanticUI.Size, newValue).toLowerCase());
                },
                IsCenterAlignedChanged: function (d, e) {
                    Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase).AddCssClassOnTrueElseRemove(e.NewValue, "center aligned");
                },
                IsRightAlignedChanged: function (d, e) {
                    Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase).AddCssClassOnTrueElseRemove(e.NewValue, "right aligned");
                },
                OnAlignChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase);

                    var value = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));
                    var className = (System.Enum.toString(Bridge.CustomUIMarkup.Libraries.SemanticUI.Align, value).toLowerCase() || "") + " aligned";

                    me.AddCssClassOnTrueElseRemove(e.NewValue, className);
                }
            }
        },
        props: {
            Size: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("Size")), System.Int32));
                },
                set: function (value) {
                    this.setItem("Size", Bridge.box(value, Bridge.CustomUIMarkup.Libraries.SemanticUI.Size, System.Enum.toStringFn(Bridge.CustomUIMarkup.Libraries.SemanticUI.Size)));
                }
            },
            Align: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("Align")), System.Int32));
                },
                set: function (value) {
                    this.setItem("Align", Bridge.box(value, Bridge.CustomUIMarkup.Libraries.SemanticUI.Align, System.Enum.toStringFn(Bridge.CustomUIMarkup.Libraries.SemanticUI.Align)));
                }
            },
            HtmlTag: {
                get: function () {
                    return "div";
                }
            },
            HtmlClassName: {
                get: function () {
                    return Bridge.Reflection.getTypeName(Bridge.getType(this));
                }
            }
        },
        methods: {
            AddCssClassOnTrueElseRemove: function (value, cssClass) {
                if (System.Nullable.eq(System.Extensions.ToBooleanNullable(value), true)) {
                    this._root.addClass(cssClass);
                    return;
                }

                this._root.removeClass(cssClass);
            },
            InitDOM: function () {

                this._root = System.Windows.DOM.CreateElement$1(this.HtmlTag, this.HtmlClassName);

            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo", {
        inherits: [System.Windows.FrameworkElement],
        fields: {
            _iconElement: null,
            _defaultTextElement: null,
            _menuElement: null,
            _hidden: null,
            _options: null,
            _itemsSource: null,
            _displayMemberPath: null,
            _selectedValuePath: null,
            _selectedValue: null
        },
        props: {
            Options: {
                get: function () {
                    return this._options;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._options, value)) {
                        this._options = value;
                        this.OnPropertyChanged("Options");
                    }
                }
            },
            "ItemsSource": {
                get: function () {
                    return this._itemsSource;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._itemsSource, value)) {
                        this._itemsSource = value;
                        this.OnPropertyChanged("ItemsSource");
                    }
                }
            },
            DisplayMemberPath: {
                get: function () {
                    return this._displayMemberPath;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._displayMemberPath, value)) {
                        this._displayMemberPath = value;
                        this.OnPropertyChanged("DisplayMemberPath");
                    }
                }
            },
            SelectedValuePath: {
                get: function () {
                    return this._selectedValuePath;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._selectedValuePath, value)) {
                        this._selectedValuePath = value;
                        this.OnPropertyChanged("SelectedValuePath");
                    }
                }
            },
            SelectedValue: {
                get: function () {
                    return this._selectedValue;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._selectedValue, value)) {
                        this._selectedValue = value;
                        this.OnPropertyChanged("SelectedValue");
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this);
                this.addPropertyChanged(Bridge.fn.bind(this, function (s, e) {
                    if (Bridge.referenceEquals(e.propertyName, "ItemsSource") || Bridge.referenceEquals(e.propertyName, "DisplayMemberPath") || Bridge.referenceEquals(e.propertyName, "SelectedValuePath")) {
                        this.TryToBind();
                    }
                }));
            }
        },
        methods: {
            InitDOM: function () {
                this._root = System.Windows.DOM.div("ui selection dropdown");

                this._hidden = System.Windows.DOM.input("hidden").appendTo(this._root).on("change", Bridge.fn.cacheBind(this, this.ValueChanged));

                this._iconElement = System.Windows.DOM.i("dropdown icon").appendTo(this._root);
                this._defaultTextElement = System.Windows.DOM.div("default text").appendTo(this._root);
                this._menuElement = System.Windows.DOM.div("menu").appendTo(this._root);

                this.addPropertyChanged(Bridge.fn.bind(this, function (e, args) {
                    if (Bridge.is(this.Options, System.String)) {
                        this.SetOptionsFrom(System.String.split((System.String.concat(this.Options, "")), [44].map(function(i) {{ return String.fromCharCode(i); }})));
                    }
                }));

                this._root.dropdown();
            },
            SetOptionsFrom: function (options) {
                var $t;
                this._menuElement.empty();

                $t = Bridge.getEnumerator(options, System.String);
                try {
                    while ($t.moveNext()) {
                        var option = $t.Current;
                        var optionElement = System.Windows.DOM.div("item");

                        optionElement.html(option);
                        optionElement.attr("data-value", option);

                        this._menuElement.append(optionElement);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            TryToBind: function () {
                var $t;
                if (this["ItemsSource"] == null || this.DisplayMemberPath == null || this.SelectedValuePath == null) {
                    return;
                }

                var enumerableItemSource = Bridge.as(this["ItemsSource"], System.Collections.IEnumerable);
                if (enumerableItemSource == null) {
                    return;
                }

                this._menuElement.empty();

                $t = Bridge.getEnumerator(enumerableItemSource);
                try {
                    while ($t.moveNext()) {
                        var record = $t.Current;
                        var optionElement = System.Windows.DOM.div("item");

                        var text = System.String.concat(System.ComponentModel.ReflectionHelper.GetPropertyValue(record, this.DisplayMemberPath), "");
                        var value = System.String.concat(System.ComponentModel.ReflectionHelper.GetPropertyValue(record, this.SelectedValuePath), "");

                        optionElement.html(text);
                        optionElement.attr("data-value", value);

                        this._menuElement.append(optionElement);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            ValueChanged: function () {
                this.SelectedValue = this._hidden.val();
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem", {
        inherits: [System.Windows.FrameworkElement,System.Windows.Markup.IAddChild],
        fields: {
            _headerElement: null,
            _contentElement: null,
            _header: null
        },
        props: {
            Header: {
                get: function () {
                    return this._header;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._header, value)) {
                        this._header = value;
                        this.OnPropertyChanged("Header");
                    }
                }
            }
        },
        methods: {
            Add$1: function (element) {
                element.Root.appendTo(this._contentElement);
            },
            InitDOM: function () {
                this._headerElement = System.Windows.DOM.a("item").attr("data-tab", this["Id"]);

                // BindPropertyToInnerHTML(nameof(Header), _headerElement);

                this._contentElement = System.Windows.DOM.div("ui bottom attached tab segment").attr("data-tab", this["Id"]);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.TabPanel", {
        inherits: [System.Windows.FrameworkElement,System.Windows.Markup.IAddChild],
        statics: {
            fields: {
                active: null
            },
            ctors: {
                init: function () {
                    this.active = "active";
                }
            }
        },
        fields: {
            _tabs: null,
            _menuElement: null
        },
        ctors: {
            init: function () {
                this._tabs = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem)).ctor();
            }
        },
        methods: {
            Add$1: function (element) {
                var tabItem = Bridge.as(element, Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem);
                if (tabItem == null) {
                    throw new System.ArgumentException();
                }

                this._menuElement.append(tabItem._headerElement);

                this._root.append(tabItem._contentElement);

                tabItem._headerElement.click(Bridge.fn.bind(this, function () {
                    this.RemoveClassActive();

                    tabItem._headerElement.addClass(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabPanel.active);
                    tabItem._contentElement.addClass(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabPanel.active);
                }));

                this._tabs.add(tabItem);
            },
            InitDOM: function () {
                this._root = System.Windows.DOM.div();

                this._menuElement = System.Windows.DOM.div("ui top attached tabular menu").appendTo(this._root);

                this._root.tab();
            },
            RemoveClassActive: function () {
                var $t;
                $t = Bridge.getEnumerator(this._tabs);
                try {
                    while ($t.moveNext()) {
                        var tabItem = $t.Current;
                        tabItem._contentElement.removeClass(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabPanel.active);
                        tabItem._headerElement.removeClass(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabPanel.active);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.Swiper.Slider", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                DelayProperty: null
            },
            ctors: {
                init: function () {
                    this.DelayProperty = System.Windows.DependencyProperty.Register$1("Delay", System.String, Bridge.CustomUIMarkup.Libraries.Swiper.Slider, new System.Windows.PropertyMetadata.ctor(Bridge.box(2000, System.Int32)));
                }
            }
        },
        fields: {
            _wrapper: null,
            swiper_wrapper: null
        },
        props: {
            Delay: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.Swiper.Slider.DelayProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.Swiper.Slider.DelayProperty, Bridge.box(value, System.Int32));
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this);
                this.addBeforeConnectToParent(Bridge.fn.cacheBind(this, this.InitWrapper));
                this.addAfterAddChild(Bridge.fn.cacheBind(this, this.CreateSlide));
            }
        },
        methods: {
            InitDOM: function () {
                this._root = System.Windows.DOM.div("swiper-container");
                this["Id"].toString();

                this.swiper_wrapper = System.Windows.DOM.div("swiper-wrapper").appendTo(this._root);

                //DOM.div("swiper-pagination").AppendTo(_root);

                //DOM.div("swiper-button-next").AppendTo(_root);
                //DOM.div("swiper-button-prev").AppendTo(_root);
            },
            CreateSlide: function (element) {
                System.Windows.DOM.div("swiper-slide").appendTo(this.swiper_wrapper).append(element._root);
            },
            InitWrapper: function () {
                // ReSharper disable once UnusedVariable
                var delay = this.Delay;
                // ReSharper disable once UnusedVariable
                var me = this;

                

setTimeout(function(){

    me._wrapper = new Swiper(me._root, {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: delay,
        disableOnInteraction: false,
      }
    });


},0);



            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.UIEditor", {
        inherits: [System.Windows.FrameworkElement],
        fields: {
            _builder: null,
            CreateBuilder: null,
            OutputElement: null,
            _sourceText: null,
            _sourceDataContext: null
        },
        props: {
            Container: {
                get: function () {
                    return System.Array.getItem(this.OutputElement.Childeren, 1, System.Windows.FrameworkElement).Root;
                }
            },
            Template: {
                get: function () {
                    return "\r\n<SplitPanel Orientation='horizontal' HeightPercent = '100' WidthPercent = '100'>\r\n    <XmlEditor Text ='{SourceText}' HeightPercent = '100' WidthPercent = '100' \r\n        OnTextChanged = '{OnTextChanged}' \r\n        OnCursorLineNumberChanged = '{OnCursorLineNumberChanged}' \r\n         />\r\n    <div Border = '1px solid Green' HeightPercent = '100' WidthPercent = '100' />\r\n</SplitPanel>";
                }
            },
            SourceText: {
                get: function () {
                    return this._sourceText;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._sourceText, value)) {
                        this._sourceText = value;
                        this.OnPropertyChanged("SourceText");
                    }
                }
            },
            SourceDataContext: {
                get: function () {
                    return this._sourceDataContext;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._sourceDataContext, value)) {
                        this._sourceDataContext = value;
                        this.OnPropertyChanged("SourceDataContext");
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this);
                this.CreateBuilder = function () {
                    return new Bridge.CustomUIMarkup.UI.Builder();
                };
            }
        },
        methods: {
            InitDOM: function () {
                var builder = this.CreateBuilder();
                builder.XmlString = this.Template;
                builder.DataContext = this;

                this.OutputElement = builder.Build();

                this._root = this.OutputElement.Root;
            },
            OnCursorLineNumberChanged: function (lineNumber) {
                this._builder != null ? this._builder.FocusToLine(lineNumber) : null;
            },
            OnTextChanged: function () {
                this.ClearOutput();

                if (System.String.isNullOrWhiteSpace(this.SourceText)) {
                    return;
                }

                this._builder = this.CreateBuilder();
                this._builder.XmlString = this.SourceText;
                this._builder.DataContext = this.SourceDataContext;
                this._builder["IsDesignMode"] = true;

                var component = null;

                try {
                    component = this._builder.Build();
                    this.SetOutput(Bridge.cast(component, System.Windows.FrameworkElement).Root);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    var e;
                    if (Bridge.is($e1, System.Xml.XmlException)) {
                        e = $e1;
                        this.SetErrorMessage(e.toString());
                    } else {
                        e = $e1;
                        this.SetErrorMessage(e.toString());
                    }
                }
            },
            ClearOutput: function () {
                this.Container.empty();
            },
            SetErrorMessage: function (message) {
                Bridge.CustomUIMarkup.Common.Extensions.SetFirstChild(this.Container, System.Windows.DOM.div().html(message));
            },
            SetOutput: function (element) {
                this.Container.empty();
                element.appendTo(this.Container);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup_DesignerSamples.ExampleDataContext", {
        inherits: [System.Windows.FrameworkElement],
        fields: {
            _examples: null,
            _currentTemplate: null
        },
        props: {
            Examples: {
                get: function () {
                    return this._examples;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._examples, value)) {
                        this._examples = value;
                        this.OnPropertyChanged("Examples");
                    }
                }
            },
            CurrentTemplate: {
                get: function () {
                    return this._currentTemplate;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._currentTemplate, value)) {
                        this._currentTemplate = value;
                        this.OnPropertyChanged("CurrentTemplate");
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this);
                this.Examples = function (_o1) {
                        var $t;
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "All", $t.XmlTemplate = "\r\n\r\n\r\n\r\n\r\n\r\n<ui.page.grid>\r\n   <ui.container>\r\n      <ui.text.menu.navbar FontSize='18'>\r\n         <left.menu>\r\n            <item>Project Name</item>\r\n         </left.menu>\r\n         <right.menu>\r\n            <item>Home</item>\r\n            <item>About</item>\r\n            <item>Contact</item>\r\n         </right.menu>\r\n      </ui.text.menu.navbar>\r\n      <ui.divider MarginBottom='10' />\r\n      <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />\r\n      <ui.divider MarginBottom='10' />\r\n\t  <ui.cards>\r\n\t  \r\n\t\t  <card>\r\n\t\t\t <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />\r\n\t\t\t <content Align='Center'>\r\n\t\t\t\t<Header Align='Center'>Motor Safari</Header>\r\n\t\t\t\t<description>Macera sizi bekliyor...</description>\r\n\t\t\t\t<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n\t\t\t </content>\r\n\t\t  </card>\r\n\t\t  \r\n\t\t  <card>\r\n\t\t\t <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />\r\n\t\t\t <content Align='Center'>\r\n\t\t\t\t<Header Align='Center'>Motor Safari</Header>\r\n\t\t\t\t<description>Macera sizi bekliyor...</description>\r\n\t\t\t\t<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n\t\t\t </content>\r\n\t\t  </card>\r\n\t\t  \r\n\t  </ui.cards>\r\n   </ui.container>\r\n</ui.page.grid>\r\n\r\n\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Carousel", $t.XmlTemplate = "\r\n\r\n\r\n<ui.container>\r\n    <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />\r\n</ui.container>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Card", $t.XmlTemplate = "\r\n\r\n<ui.cards>\r\n\r\n    <card>\r\n\t    <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg'/>\r\n\t    <content Align='Center'>\r\n            <Header Align='Center' >Motor Safari</Header>\r\n            <description> Macera sizi bekliyor...</description>\r\n            <ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n        </content>\t\r\n    </card>\r\n\r\n</ui.cards>\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Grid.column", $t.XmlTemplate = "\r\n\r\n\r\n<ui.grid>\r\n  \r\n    <column Width='27' Align='Center'>\r\n        <Icon Type='Setting' Color='#ffbb00' FontSize='17' />\r\n    </column>\r\n  \r\n  \t<Column Width='80'>\r\n        <TextBlock Text='Start Date:' Color='#888888' FontSize='13' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n  \t\r\n  \t<Column   Align='Left' >\r\n        <TextBlock Text='November 1, 2017 15:30' Color='#888888' FontSize='12' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n</ui.grid>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Form", $t.XmlTemplate = "\r\n\r\n\r\n<ui.segment>\r\n  <ui.page.grid Align='Center' MarginTop='5'>\r\n      <ui.form  Padding='55' Border='1px solid #ddd'>\r\n        <ui.header.3>Input form</ui.header.3>\r\n     <Field Value='A' Label='yy'>\r\n        <TextBox PlaceHolder='Write 1' />\r\n     </Field>\r\n     <ui.stacked>\r\n        <Field Value='A' Label='yy' >\r\n           <TextBox PlaceHolder='Write 1' IsMandatory='True' />\r\n        </Field>\r\n     </ui.stacked>\r\n     <ui.equal.width.grid>\r\n        <column>\r\n           <Field Value='A' Label='yy'>\r\n              <TextBox PlaceHolder='Write 1' />\r\n           </Field>\r\n        </column>\r\n        <column>\r\n           <Field Value='A' Label='yy'>\r\n              <TextBox PlaceHolder='Write 1' />\r\n           </Field>\r\n        </column>\r\n     </ui.equal.width.grid>\r\n        \r\n        <ui.grid>\r\n          <column Align='Right'>\r\n        \t\t<ui.button Text='No'   />\r\n            \t<ui.button Text='Yes'  AddClass='positive'  />\r\n            </column>\r\n        </ui.grid>\r\n  </ui.form>\r\n  </ui.page.grid>\r\n</ui.segment>\r\n\r\n\r\n\r\n\r\n", $t));
                        return _o1;
                    }(new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo)).ctor());


            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo", {
        inherits: [System.Windows.FrameworkElement],
        fields: {
            _name: null,
            _xmlTemplate: null
        },
        props: {
            Name: {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._name, value)) {
                        this._name = value;
                        this.OnPropertyChanged("Name");
                    }
                }
            },
            XmlTemplate: {
                get: function () {
                    return this._xmlTemplate;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._xmlTemplate, value)) {
                        this._xmlTemplate = value;
                        this.OnPropertyChanged("XmlTemplate");
                    }
                }
            }
        }
    });

    Bridge.define("System.Windows.Controls.SplitPanel", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                horizontal: null,
                vertical: null,
                OrientationProperty: null
            },
            ctors: {
                init: function () {
                    this.horizontal = "horizontal";
                    this.vertical = "vertical";
                    this.OrientationProperty = System.Windows.DependencyProperty.Register$1("Orientation", System.Windows.Controls.Orientation, System.Windows.Controls.SplitPanel, new System.Windows.PropertyMetadata.$ctor2(System.Windows.Controls.SplitPanel.OnOrientationChanged));
                }
            },
            methods: {
                OnOrientationChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.Controls.SplitPanel);
                    me.SetOrientation(System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32)));
                }
            }
        },
        fields: {
            _direction: null,
            _left: null,
            _right: null,
            _wrapper: null
        },
        props: {
            ClassName: {
                get: function () {
                    return "split split-" + (this._direction || "");
                }
            },
            Orientation: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.Controls.SplitPanel.OrientationProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.Controls.SplitPanel.OrientationProperty, Bridge.box(value, System.Windows.Controls.Orientation, System.Enum.toStringFn(System.Windows.Controls.Orientation)));
                }
            }
        },
        ctors: {
            init: function () {
                this._direction = "horizontal";
            },
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this);
                this.addAfterAddChild(Bridge.fn.cacheBind(this, this.AfterAddChildElement));
            }
        },
        methods: {
            InitDOM: function () {
                this._root = System.Windows.DOM.div();

                this._left = System.Windows.DOM.div().appendTo(this._root);

                this._right = System.Windows.DOM.div().appendTo(this._root);

                this.ReInitializeWrapper();
            },
            AfterAddChildElement: function (element) {
                if (System.Array.getCount(this.Childeren, System.Windows.FrameworkElement) === 1) {
                    Bridge.CustomUIMarkup.Common.Extensions.SetFirstChild(this._left, Bridge.CustomUIMarkup.Common.Extensions.RemoveFromParent(this._root.children().last()));
                } else {
                    Bridge.CustomUIMarkup.Common.Extensions.SetFirstChild(this._right, Bridge.CustomUIMarkup.Common.Extensions.RemoveFromParent(this._root.children().last()));
                }

                this.ReInitializeWrapper();
            },
            ReInitializeWrapper: function () {
                this._wrapper != null ? this._wrapper.destroy() : null;

                this._wrapper = this.Split();
            },
            SetOrientation: function (orientation) {
                this._direction = orientation === System.Windows.Controls.Orientation.Horizontal ? System.Windows.Controls.SplitPanel.horizontal : System.Windows.Controls.SplitPanel.vertical;

                Bridge.CustomUIMarkup.Common.Extensions.Foreach(Bridge.CustomUIMarkup.Common.Extensions.SetClass(this._root, this.ClassName).children(), Bridge.fn.bind(this, function (c) {
                    Bridge.CustomUIMarkup.Common.Extensions.SetClass(c, this.ClassName);
                }));
                Bridge.CustomUIMarkup.Common.Extensions.SetClass(this._left, this.ClassName);
                Bridge.CustomUIMarkup.Common.Extensions.SetClass(this._right, this.ClassName);

                this.ReInitializeWrapper();
            },
            Split: function () {
                return Split([this._left[0], this._right[0]], { sizes:[50,50],  direction:this._direction });
                ;
            }
        }
    });

    Bridge.define("System.Windows.Controls.TextBlock", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                TextProperty: null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, System.Windows.Controls.TextBlock, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                }
            }
        },
        props: {
            Text: {
                get: function () {
                    return this["InnerHTML"];
                },
                set: function (value) {
                    this["InnerHTML"] = value;
                }
            }
        },
        methods: {
            InitDOM: function () {
                this._root = Bridge.jQuery2.Extensions.Css_display_Inline_Block($(document.createElement("TextBlock")));
            }
        }
    });

    Bridge.define("System.Windows.FrameworkElement_a", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                HrefProperty: null
            },
            ctors: {
                init: function () {
                    this.HrefProperty = System.Windows.DependencyProperty.Register$1("Href", System.String, System.Windows.FrameworkElement_a, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("href"));
                }
            }
        },
        props: {
            Href: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.FrameworkElement_a.HrefProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement_a.HrefProperty, value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this, "a");
            }
        }
    });

    Bridge.define("System.Windows.FrameworkElement_div", {
        inherits: [System.Windows.FrameworkElement],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this, "div");
            }
        }
    });

    Bridge.define("System.Windows.FrameworkElement_img", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                SrcProperty: null
            },
            ctors: {
                init: function () {
                    this.SrcProperty = System.Windows.DependencyProperty.Register$1("Src", System.String, System.Windows.FrameworkElement_img, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("src"));
                }
            }
        },
        props: {
            Src: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.FrameworkElement_img.SrcProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement_img.SrcProperty, value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this, "img");
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.card", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "card";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.column", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        statics: {
            fields: {
                WideProperty: null
            },
            ctors: {
                init: function () {
                    this.WideProperty = System.Windows.DependencyProperty.Register$1("Wide", System.Int32, Bridge.CustomUIMarkup.Libraries.SemanticUI.column, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.column.WideChanged));
                }
            },
            methods: {
                WideChanged: function (d, e) {
                    var oldValue = e.OldValue;
                    var newValue = System.Extensions.ToInt32Nullable(e.NewValue);

                    var fe = Bridge.cast(d, System.Windows.FrameworkElement);

                    if (System.Extensions.IsNotNull(oldValue)) {
                        fe._root.removeClass((Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord.ToWord(System.Extensions.ToInt32(oldValue)) || "") + " wide");
                    }

                    if (System.Nullable.hasValue(newValue)) {
                        if (System.Nullable.getValue(newValue) < 0 || System.Nullable.getValue(newValue) > 16) {
                            throw new System.ArgumentException("Max wide is 16. @value:" + System.Nullable.getValue(newValue));
                        }

                        fe._root.addClass((Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord.ToWord(System.Nullable.getValue(newValue)) || "") + " wide");
                    }
                }
            }
        },
        props: {
            HtmlClassName: {
                get: function () {
                    return "column";
                }
            },
            Wide: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.column.WideProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.column.WideProperty, Bridge.box(value, System.Int32));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.computer_tablet_only_row", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "computer tablet only row";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.content", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase]
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.description", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase]
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ExtraContent", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "extra content";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Field", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        statics: {
            fields: {
                ErrorMessageProperty: null,
                LabelProperty: null
            },
            ctors: {
                init: function () {
                    this.ErrorMessageProperty = System.Windows.DependencyProperty.Register$1("ErrorMessage", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.OnErrorMessageChanged));
                    this.LabelProperty = System.Windows.DependencyProperty.Register$1("Label", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.OnLabelChanged));
                }
            },
            methods: {
                OnErrorMessageChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field);
                    var value = Bridge.cast(e.NewValue, System.String);
                    if (Bridge.CustomUIMarkup.Common.Extensions.IsNullOrWhiteSpace(value)) {
                        me.RemoveError();
                    } else {
                        me.InitError(Bridge.cast(e.NewValue, System.String));
                    }
                },
                OnLabelChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field);
                    var value = Bridge.cast(e.NewValue, System.String);
                    if (Bridge.CustomUIMarkup.Common.Extensions.IsNullOrWhiteSpace(value)) {
                        me.RemoveLabel();
                    } else {
                        me.InitLabel(value);
                    }
                }
            }
        },
        fields: {
            _labelElement: null,
            _errorElement: null
        },
        props: {
            ErrorMessage: {
                get: function () {
                    return Bridge.cast(this.getItem("ErrorMessage"), System.String);
                },
                set: function (value) {
                    this.setItem("ErrorMessage", value);
                }
            },
            Label: {
                get: function () {
                    return Bridge.cast(this.getItem("Label"), System.String);
                },
                set: function (value) {
                    this.setItem("Label", value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase.ctor.call(this);
                this.addAfterAddChild(Bridge.fn.bind(this, function (el) {
                    this.ReOrderElements();
                }));
            }
        },
        methods: {
            InitDOM: function () {
                this._root = System.Windows.DOM.div("field");
            },
            ReOrderElements: function () {
                this._root.remove();

                if (System.Extensions.IsNotNull(this._labelElement)) {
                    Bridge.CustomUIMarkup.Common.Extensions.SetFirstChild(this._root, this._labelElement);
                }
                if (System.Array.getCount(this.Childeren, System.Windows.FrameworkElement) === 1) {
                    Bridge.CustomUIMarkup.Common.Extensions.SetLastChild(this._root, System.Linq.Enumerable.from(this.Childeren).first()._root);
                }

                if (System.Extensions.IsNotNull(this._errorElement)) {
                    Bridge.CustomUIMarkup.Common.Extensions.SetLastChild(this._root, this._errorElement);
                }
            },
            InitError: function (errorMessage) {
                this._errorElement = System.Windows.DOM.div("ui red pointing label transition visible").html(errorMessage);
                this._root.addClass("error");

                this.ReOrderElements();
            },
            RemoveError: function () {
                Bridge.CustomUIMarkup.Common.Extensions.RemoveFromParent(this._errorElement);
                this._errorElement = null;
                this._root.removeClass("error");
            },
            InitLabel: function (label) {
                if (System.Extensions.IsNull(this._labelElement)) {
                    this._labelElement = System.Windows.DOM.label();
                    this.ReOrderElements();
                }

                this._labelElement.html(label);
            },
            RemoveLabel: function () {
                this._labelElement != null ? Bridge.CustomUIMarkup.Common.Extensions.RemoveFromParent(this._labelElement) : null;
                this._labelElement = null;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.header", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.header, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                }
            }
        },
        props: {
            HtmlClassName: {
                get: function () {
                    return "header";
                }
            },
            Text: {
                get: function () {
                    return this["InnerHTML"];
                },
                set: function (value) {
                    this["InnerHTML"] = value;
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Icon", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        statics: {
            fields: {
                TypeProperty: null
            },
            ctors: {
                init: function () {
                    this.TypeProperty = System.Windows.DependencyProperty.Register$1("Type", Bridge.CustomUIMarkup.Libraries.SemanticUI.IconType, Bridge.CustomUIMarkup.Libraries.SemanticUI.Icon, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.Icon.OnTypeChanged));
                }
            },
            methods: {
                OnTypeChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.Icon);
                    var iconType = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));

                    var className = (System.String.replaceAll(System.Enum.toString(Bridge.CustomUIMarkup.Libraries.SemanticUI.IconType, iconType), "_", " ").toLowerCase() || "") + " icon";

                    me._root.addClass(className);
                }
            }
        },
        props: {
            HtmlTag: {
                get: function () {
                    return "i";
                }
            },
            Type: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Icon.TypeProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Icon.TypeProperty, Bridge.box(value, Bridge.CustomUIMarkup.Libraries.SemanticUI.IconType, System.Enum.toStringFn(Bridge.CustomUIMarkup.Libraries.SemanticUI.IconType)));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null,
                PlaceHolderProperty: null,
                "IsMandatoryProperty": null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.OnTextChanged));
                    this.PlaceHolderProperty = System.Windows.DependencyProperty.Register$1("PlaceHolder", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.OnPlaceHolderChanged));
                    this["IsMandatoryProperty"] = System.Windows.DependencyProperty.Register$1("IsMandatory", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.OnIsMandatoryChanged));
                }
            },
            methods: {
                OnTextChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText);

                    me._inputElement.attr("value", Bridge.cast(e.NewValue, System.String));
                },
                OnPlaceHolderChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText);

                    me._inputElement.attr("placeholder", Bridge.cast(e.NewValue, System.String));
                },
                OnIsMandatoryChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText);

                    if (System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Boolean))) {
                        me.InitializeCornerLabelDiv();
                    } else {
                        me.RemoveCornerLabelDiv();
                    }
                }
            }
        },
        fields: {
            _inputElement: null,
            _cornerLabelDiv: null
        },
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui input";
                }
            },
            Text: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.TextProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.TextProperty, value);
                }
            },
            PlaceHolder: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.PlaceHolderProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.PlaceHolderProperty, value);
                }
            },
            "IsMandatory": {
                get: function () {
                    return System.Extensions.ToBoolean(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText["IsMandatoryProperty"]));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText["IsMandatoryProperty"], Bridge.box(value, System.Boolean, System.Boolean.toString));
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase.ctor.call(this);
                this.addAfterInitDOM(Bridge.fn.cacheBind(this, this.CreateInputElement));
            }
        },
        methods: {
            CreateInputElement: function () {
                this._inputElement = System.Windows.DOM.input("text").appendTo(this._root);
            },
            InitializeCornerLabelDiv: function () {
                if (this._cornerLabelDiv == null) {
                    this._cornerLabelDiv = System.Windows.DOM.div("ui corner label").appendTo(this._root);
                    System.Windows.DOM.i("asterisk icon").appendTo(this._cornerLabelDiv);
                    this._root.addClass("labeled");
                }
            },
            RemoveCornerLabelDiv: function () {
                if (this._cornerLabelDiv == null) {
                    return;
                }

                Bridge.CustomUIMarkup.Common.Extensions.RemoveFromParent(this._cornerLabelDiv);
                this._cornerLabelDiv = null;

                this._root.removeClass("labeled");
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.item", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "item";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.left_menu", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "left menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.mobile_only_row", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "mobile only row";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Modal", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase,System.Windows.Markup.IAddChild],
        fields: {
            content: null,
            header: null,
            _title: null
        },
        props: {
            Title: {
                get: function () {
                    return this._title;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._title, value)) {
                        this._title = value;
                        this.OnPropertyChanged("Title");
                    }
                }
            }
        },
        methods: {
            Add$1: function (element) {
                this.content.append(element.Root);
            },
            InitDOM: function () {
                this._root = System.Windows.DOM.div("ui modal");

                this.header = System.Windows.DOM.div("header").appendTo(this._root);

                this.content = System.Windows.DOM.div("content").appendTo(this._root);

                this._root.modal("show");

                // BindPropertyToInnerHTML(nameof(Title), header);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.right_menu", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "right menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Row", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "row";
                }
            },
            rowClass: {
                get: function () {
                    return (Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord.ToWord(System.Array.getCount(this.Childeren, System.Windows.FrameworkElement)) || "") + " column row";
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase.ctor.call(this);
                this.addAfterAddChild(Bridge.fn.bind(this, function (el) {
                    this.UpdateClass();
                }));
            }
        },
        methods: {
            UpdateClass: function () {
                this._root.attr("class", this.rowClass);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null,
                "IsActiveProperty": null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                    this["IsActiveProperty"] = System.Windows.DependencyProperty.Register$1("IsActive", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button.IsActiveChanged));
                }
            },
            methods: {
                IsActiveChanged: function (d, e) {
                    Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button).AddCssClassOnTrueElseRemove(e.NewValue, "active");
                }
            }
        },
        props: {
            "IsActive": {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button["IsActiveProperty"])), System.Boolean, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button["IsActiveProperty"], Bridge.box(value, System.Boolean, System.Nullable.toStringFn(System.Boolean.toString), System.Nullable.getHashCode));
                }
            },
            HtmlClassName: {
                get: function () {
                    return "ui button";
                }
            },
            HtmlTag: {
                get: function () {
                    return "button";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_card", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui card";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_cards", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui cards";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_container", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui container";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_divider", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui divider";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_equal_width_grid", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui equal width grid";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_form", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui form";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_grid", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui grid";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_hidden_clearing_divider", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui hidden clearing divider";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_image", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        statics: {
            fields: {
                SrcProperty: null
            },
            ctors: {
                init: function () {
                    this.SrcProperty = System.Windows.DependencyProperty.Register$1("Src", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_image, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("src"));
                }
            }
        },
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui image";
                }
            },
            HtmlTag: {
                get: function () {
                    return "img";
                }
            },
            Src: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_image.SrcProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_image.SrcProperty, value);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_menu", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_navbar_menu", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui navbar menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_page_grid", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui page grid";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_segment", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui segment";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_stacked", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui stacked";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_text_menu_navbar", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui text menu navbar";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_vertical_menu", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui vertical menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.XmlEditor", {
        inherits: [Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor],
        props: {
            "SchemaInfo": {
                get: function () {
                    var xmlIntellisenseInfos = Bridge.CustomUIMarkup.UI.TypeFinder.Tags;
                    return Bridge.CustomUIMarkup.Libraries.CodeMirror.SchemaInfo.CreateFrom(xmlIntellisenseInfos).ToJson();
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText],
        statics: {
            fields: {
                RowsProperty: null
            },
            ctors: {
                init: function () {
                    this.RowsProperty = System.Windows.DependencyProperty.Register$1("Rows", System.Nullable$1(System.Int32), Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea.OnRowsChanged));
                }
            },
            methods: {
                OnRowsChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea);
                    var value = Bridge.as(e.NewValue, System.Int32, true);
                    if (System.Nullable.hasValue(value)) {
                        me._inputElement.attr("rows", System.Nullable.getValue(value));
                    }
                }
            }
        },
        props: {
            Rows: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea.RowsProperty)), System.Int32, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea.RowsProperty, Bridge.box(value, System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                }
            }
        },
        methods: {
            CreateInputElement: function () {
                this._inputElement = System.Windows.DOM.textarea().appendTo(this._root);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_basic_button", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_button],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui basic button";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_header_1", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.header],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui header";
                }
            },
            HtmlTag: {
                get: function () {
                    return "h1";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_header_2", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.header],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui header";
                }
            },
            HtmlTag: {
                get: function () {
                    return "h2";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_header_3", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.header],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui header";
                }
            },
            HtmlTag: {
                get: function () {
                    return "h3";
                }
            }
        }
    });
});
