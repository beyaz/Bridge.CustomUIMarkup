/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("Bridge.CustomUIMarkup", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.CustomUIMarkup.Common.AsyncAjax", {
        inherits: [Bridge.IPromise],
        statics: {
            methods: {
                PostJson: function (url, json, onError) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        promise, 
                        $t, 
                        resultHandler, 
                        errorHandler, 
                        task, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1], $step);
                                    switch ($step) {
                                        case 0: {
                                            if (onError === void 0) { onError = null; }
                                            promise = ($t = new Bridge.CustomUIMarkup.Common.AsyncAjax(), $t.Url = url, $t.Data = json, $t);
                                            resultHandler = function (request) {
                                                return request.ResponseText;
                                            };

                                            errorHandler = function (me) {
                                                !Bridge.staticEquals(onError, null) ? onError(me._error) : null;

                                                return new System.IO.IOException.$ctor1(me._error);
                                            };

                                            task = System.Threading.Tasks.Task.fromPromise(promise, resultHandler, errorHandler);

                                            $task1 = task;
                                            $step = 1;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 1: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            $tcs.setResult(task.getResult());
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                }
            }
        },
        fields: {
            _error: null,
            ResponseText: null,
            Data: null,
            Url: null
        },
        alias: ["then", "Bridge$IPromise$then"],
        methods: {
            then: function (fulfilledHandler, errorHandler, progressHandler) {
                if (progressHandler === void 0) { progressHandler = null; }
                $.ajax({ type: "POST", url: this.Url, data: this.Data, async: true, contentType: "JSON", success: Bridge.fn.bind(this, function (o, s, arg3) {
                    this.ResponseText = arg3.responseText;
                    fulfilledHandler.call(null, this);
                }), error: Bridge.fn.bind(this, function (jqXhr, status, errror) {
                    this._error = "Ajax Error Occured. For this reason 'POST' operation was canceled." + ("\n" || "") + "@status   :" + (status || "") + ("\n" || "") + "@errror   :" + (errror || "") + ("\n" || "") + "@POST Data:" + (this.Data || "") + ("\n" || "") + "@Url      :" + (this.Url || "");

                    Bridge.Console.log(this._error);

                    Bridge.Console.log(jqXhr);

                    errorHandler.call(null, this);
                }) });
            }
        }
    });

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

    Bridge.define("Bridge.CustomUIMarkup.Libraries.CodeMirror.Elements", {
        statics: {
            methods: {
                RegisterToBuilder: function () {
                    Bridge.CustomUIMarkup.UI.Builder.Register("UIEditor", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.CodeMirror.UIEditor); });

                    Bridge.CustomUIMarkup.UI.Builder.Register("XmlEditor", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor); });
                }
            }
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

                if (Bridge.referenceEquals(oldValue, null) && Bridge.referenceEquals(value, null)) {
                    return;
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

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridCellEditorType", {
        $kind: "enum",
        statics: {
            fields: {
                Text: 0
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements", {
        statics: {
            fields: {
                "IconTypes": null
            },
            ctors: {
                init: function () {
                    this["IconTypes"] = System.Array.init(["content", "edit", "bug", "alternate github", "music", "world", "search", "green check", "large red delete link", "disabled warning sign", "add to calendar", "address book", "address book outline", "address card", "address card outline", "alarm", "alarm mute", "alarm mute outline", "alarm outline", "at", "browser", "calendar", "calendar outline", "checked calendar", "cloud", "code", "comment", "comment outline", "comments", "comments outline", "copyright", "creative commons", "dashboard", "delete calendar", "external", "external square", "eyedropper", "feed", "find", "hand pointer", "handshake", "hashtag", "heartbeat", "history", "home", "hourglass empty", "hourglass end", "hourglass full", "hourglass half", "hourglass start", "id badge", "id card", "id card outline", "idea", "image", "inbox", "industry", "lab", "mail", "mail outline", "mail square", "mouse pointer", "open envelope", "open envelope outline", "options", "paint brush", "payment", "percent", "podcast", "privacy", "protect", "registered", "remove from calendar", "setting", "settings", "shop", "shopping bag", "shopping basket", "sidebar", "signal", "sitemap", "tag", "tags", "tasks", "terminal", "text telephone", "ticket", "trademark", "trophy", "window close", "window close outline", "window maximize", "window minimize", "window restore", "add to cart", "add user", "adjust", "archive", "ban", "bookmark", "call", "call square", "clone", "cloud download", "cloud upload", "talk", "talk outline", "compress", "configure", "download", "erase", "exchange", "expand", "external share", "filter", "hide", "in cart", "Lock", "mail forward", "group object", "ungroup object", "pin", "print", "random", "recycle", "refresh", "remove bookmark", "remove user", "repeat", "reply all", "reply", "retweet", "send", "send outline", "share alternate", "share alternate square", "share", "share square", "sign in", "sign out", "theme", "translate", "undo", "unhide", "unlock alternate", "unlock", "upload", "wait", "wizard", "write", "write square", "object group", "object ungroup", "announcement", "birthday", "help circle", "help circle outline", "help", "info circle", "info", "warning circle", "warning", "warning sign", "child", "doctor", "handicap", "spy", "student", "user", "user circle", "user circle outline", "user outline", "users", "female", "gay", "genderless", "heterosexual", "intergender", "lesbian", "male", "man", "neuter", "non binary transgender", "other gender horizontal", "other gender", "other gender vertical", "transgender", "woman", "block layout", "crop", "grid layout", "list layout", "maximize", "resize horizontal", "resize vertical", "zoom", "zoom out", "anchor", "bar", "bathtub", "bomb", "book", "bullseye", "calculator", "cocktail", "diamond", "fax", "fire extinguisher", "fire", "flag checkered", "flag", "flag outline", "gift", "hand lizard", "hand peace", "hand paper", "hand rock", "hand scissors", "hand spock", "law", "leaf", "legal", "lemon", "life ring", "lightning", "magnet", "money", "moon", "plane", "puzzle", "road", "rocket", "shipping", "shower", "snowflake", "soccer", "sticky note", "sticky note outline", "suitcase", "sun", "thermometer empty", "thermometer quarter", "thermometer half", "thermometer three quarters", "thermometer full", "travel", "treatment", "tv", "umbrella", "asterisk", "certificate", "circle", "circle notched", "circle thin", "crosshairs", "cube", "cubes", "ellipsis horizontal", "ellipsis vertical", "quote left", "quote right", "spinner", "square", "square outline", "add circle", "add square", "check circle", "check circle outline", "check square", "checkmark box", "checkmark", "minus circle", "minus", "minus square", "minus square outline", "move", "plus", "plus square outline", "radio", "remove circle", "remove circle outline", "remove", "selected radio", "toggle off", "toggle on", "area chart", "bar chart", "camera retro", "newspaper", "film", "line chart", "photo", "pie chart", "sound", "angle double down", "angle double left", "angle double right", "angle double up", "angle down", "angle left", "angle right", "angle up", "arrow circle down", "arrow circle left", "arrow circle outline down", "arrow circle outline left", "arrow circle outline right", "arrow circle outline up", "arrow circle right", "arrow circle up", "arrow down", "arrow left", "arrow right", "arrow up", "caret down", "caret left", "caret right", "caret up", "chevron circle down", "chevron circle left", "chevron circle right", "chevron circle up", "chevron down", "chevron left", "chevron right", "chevron up", "long arrow down", "long arrow left", "long arrow right", "long arrow up", "pointing down", "pointing left", "pointing right", "pointing up", "toggle down", "toggle left", "toggle right", "toggle up", "mobile", "tablet", "battery empty", "battery low", "battery medium", "battery high", "battery full", "desktop", "disk outline", "game", "keyboard", "laptop", "plug", "power", "file archive outline", "file audio outline", "file code outline", "file excel outline", "file", "file image outline", "file outline", "file pdf outline", "file powerpoint outline", "file text", "file text outline", "file video outline", "file word outline", "folder", "folder open", "folder open outline", "folder outline", "level down", "level up", "trash", "trash outline", "barcode", "bluetooth alternative", "bluetooth", "css3", "database", "fork", "html5", "microchip", "openid", "qrcode", "rss", "rss square", "server", "usb", "empty heart", "empty star", "frown", "heart", "meh", "smile", "star half empty", "star half", "star", "thumbs down", "thumbs outline down", "thumbs outline up", "thumbs up", "backward", "closed captioning", "eject", "fast backward", "fast forward", "forward", "mute", "pause circle", "pause circle outline", "pause", "play", "record", "step backward", "step forward", "stop circle", "stop circle outline", "stop", "unmute", "video play", "video play outline", "volume down", "volume off", "volume up", "bicycle", "building", "building outline", "bus", "car", "coffee", "compass", "emergency", "first aid", "food", "h", "hospital", "hotel", "location arrow", "map", "map outline", "map pin", "map signs", "marker", "military", "motorcycle", "paw", "ship", "space shuttle", "spoon", "street view", "subway", "taxi", "train", "tree", "university", "television", "columns", "sort alphabet ascending", "sort alphabet descending", "sort ascending", "sort content ascending", "sort content descending", "sort descending", "sort", "sort numeric ascending", "sort numeric descending", "table", "align center", "align justify", "align left", "align right", "attach", "bold", "copy", "cut", "font", "header", "indent", "italic", "linkify", "list", "ordered list", "outdent", "paragraph", "paste", "save", "strikethrough", "subscript", "superscript", "text cursor", "text height", "text width", "underline", "unlinkify", "unordered list", "bitcoin", "dollar", "euro", "lira", "pound", "ruble", "rupee", "shekel", "won", "yen", "american express", "credit card alternative", "diners club", "discover", "google wallet", "japan credit bureau", "mastercard", "paypal card", "paypal", "stripe", "visa", "wheelchair", "asl interpreting", "assistive listening systems", "audio description", "blind", "braille", "deafness", "low vision", "sign language", "universal access", "volume control phone", "adn", "amazon", "android", "angellist", "apple", "bandcamp", "behance", "behance square", "bitbucket", "bitbucket square", "black tie", "buysellads", "chrome", "codepen", "codiepie", "connectdevelop", "contao", "dashcube", "delicious", "deviantart", "digg", "dribble", "dropbox", "drupal", "eercast", "empire", "envira gallery", "etsy", "expeditedssl", "facebook f", "facebook", "facebook square", "firefox", "first order", "flickr", "font awesome", "fonticons", "fort awesome", "forumbee", "foursquare", "free code camp", "gg circle", "gg", "git", "git square", "github alternate", "github", "github square", "gitlab", "gittip", "glide g", "glide", "google", "google plus circle", "google plus", "google plus square", "grav", "hacker news", "houzz", "imdb", "instagram", "internet explorer", "ioxhost", "joomla", "jsfiddle", "lastfm", "lastfm square", "leanpub", "linkedin", "linkedin square", "linode", "linux", "maxcdn", "meanpath", "medium", "meetup", "microsoft edge", "mixcloud", "modx", "odnoklassniki", "odnoklassniki square", "opencart", "opera", "optinmonster", "pagelines", "pied piper alternate", "pied piper hat", "pied piper", "pinterest", "pinterest square", "pocket", "product hunt", "qq", "quora", "ravelry", "rebel", "reddit alien", "reddit", "reddit square", "renren", "safari", "scribd", "sellsy", "shirtsinbulk", "simplybuilt", "skyatlas", "skype", "slack", "slideshare", "snapchat ghost", "snapchat", "snapchat square", "soundcloud", "spotify", "stack exchange", "stack overflow", "steam", "steam square", "stumbleupon circle", "stumbleupon", "superpowers", "telegram", "tencent weibo", "themeisle", "trello", "tripadvisor", "tumblr", "tumblr square", "twitch", "twitter", "twitter square", "viacoin", "viadeo", "viadeo square", "vimeo", "vimeo square", "vine", "vk", "wechat", "weibo", "whatsapp", "wikipedia", "windows", "wordpress", "wpbeginner", "wpexplorer", "wpforms", "xing", "xing square", "y combinator", "yahoo", "yelp", "yoast", "youtube", "youtube play", "youtube square", "dribbble", "disabled users", "spinner loading", "notched circle loading", "asterisk loading", "fitted help", "mini home", "tiny home", "small home", "large home", "big home", "huge home", "massive home", "close link", "help link", "horizontally flipped cloud", "vertically flipped cloud", "clockwise rotated cloud", "counterclockwise rotated cloud", "circular users", "circular teal users", "circular inverted users", "circular inverted teal users", "bordered users", "bordered teal users", "bordered inverted black users", "bordered inverted teal users", "red users", "orange users", "yellow users", "olive users", "green users", "teal users", "blue users", "violet users", "purple users", "pink users", "brown users", "grey users", "black users", "inverted users", "inverted red users", "inverted orange users", "inverted yellow users", "inverted olive users", "inverted green users", "inverted teal users", "inverted blue users", "inverted violet users", "inverted purple users", "inverted pink users", "inverted brown users", "inverted grey users", "big thin circle", "big red dont", "black user", "big loading sun", "corner add", "top left corner add", "top right corner add", "bottom left corner add", "bottom right corner add", "inverted corner add", "close", "question"], System.String);
                }
            },
            methods: {
                CreateElement: function (tag, className) {
                    if (tag === void 0) { tag = null; }
                    if (className === void 0) { className = null; }
                    return new System.Windows.HtmlElement(tag, className);
                },
                RegisterToBuilder: function () {
                    var $t, $t1;
                    // row
                    Bridge.CustomUIMarkup.UI.Builder.Register("row", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", "row");
                    });

                    for (var i = 2; i <= 16; i = (i + 1) | 0) {
                        var className = { v : (Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord.ToWord(i) || "") + " column row" };

                        Bridge.CustomUIMarkup.UI.Builder.Register(System.String.replaceAll(className.v, " ", "_"), (function ($me, className) {
                            return function () {
                                return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", className.v);
                            };
                        })(this, className));
                    }


                    // column
                    Bridge.CustomUIMarkup.UI.Builder.Register("column", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", "column");
                    });

                    for (var i1 = 2; i1 <= 16; i1 = (i1 + 1) | 0) {
                        var className1 = { v : (Bridge.CustomUIMarkup.Libraries.SemanticUI.NumberToWord.ToWord(i1) || "") + " wide column" };

                        Bridge.CustomUIMarkup.UI.Builder.Register(System.String.replaceAll(className1.v, " ", "_"), (function ($me, className1) {
                            return function () {
                                return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", className1.v);
                            };
                        })(this, className1));
                    }



                    // TextBlock
                    Bridge.CustomUIMarkup.UI.Builder.Register("TextBlock", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock); });

                    Bridge.CustomUIMarkup.UI.Builder.Register("Field", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field); });

                    Bridge.CustomUIMarkup.UI.Builder.Register("textInput", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("textBox", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui-input-textarea", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("FieldString", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldString); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("FieldStringTextArea", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldTextArea); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("FieldTextArea", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldTextArea); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("FieldInt32", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldInt32); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("FieldDecimal", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDecimal); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("FieldDate", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDate); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ContentPresenter", function () {
                        return new System.Windows.ContentPresenter();
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui_rating", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui-rating", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating); });

                    Bridge.CustomUIMarkup.UI.Builder.Register("comment", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui_comments", function () {
                        return new System.Windows.HtmlElement("div", "ui comments");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui-comments", function () {
                        return new System.Windows.HtmlElement("div", "ui comments");
                    });


                    Bridge.CustomUIMarkup.UI.Builder.Register("comment", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment); });

                    Bridge.CustomUIMarkup.UI.Builder.Register("ui_top_attached_tabular_menu", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_top_attached_tabular_menu); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("Tab", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("TabItem", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem); });


                    Bridge.CustomUIMarkup.UI.Builder.Register("combo", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("comboBox", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui.selection.dropdown", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo); });

                    Bridge.CustomUIMarkup.UI.Builder.Register("DatePicker", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker); });



                    var classNames = System.Array.init(["ui segment", "ui form", "ui grid", "ui page grid", "ui text menu navbar", "left menu", "ui stacked", "computer tablet only row", "ui navbar menu", "mobile only row", "right menu", "ui hidden clearing divider", "card", "ui card", "ui cards", "extra content", "content", "ui divider", "item", "ui menu", "ui vertical menu", "ui equal width grid", "ui container", "ui button", "ui active button", "ui basic button", "ui basic active button", "ui pagination menu", "active item"], System.String);

                    $t = Bridge.getEnumerator(classNames);
                    try {
                        while ($t.moveNext()) {
                            var className2 = { v : $t.Current };
                            Bridge.CustomUIMarkup.UI.Builder.Register(System.String.replaceAll(className2.v, " ", "_"), (function ($me, className2) {
                                return function () {
                                    return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", className2.v);
                                };
                            })(this, className2));
                            Bridge.CustomUIMarkup.UI.Builder.Register(System.String.replaceAll(className2.v, " ", "."), (function ($me, className2) {
                                return function () {
                                    return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", className2.v);
                                };
                            })(this, className2));
                            Bridge.CustomUIMarkup.UI.Builder.Register(System.String.replaceAll(className2.v, " ", "-"), (function ($me, className2) {
                                return function () {
                                    return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", className2.v);
                                };
                            })(this, className2));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui-image", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("img", "ui image");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui.image", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("img", "ui image");
                    });


                    Bridge.CustomUIMarkup.UI.Builder.Register("header", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("div", "header");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui.header.1", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("h1", "ui header");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui.header.2", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("h2", "ui header");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui.header.3", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("h3", "ui header");
                    });


                    Bridge.CustomUIMarkup.UI.Builder.Register("ui.header.3", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("i", "ui header");
                    });

                    $t1 = Bridge.getEnumerator(Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements["IconTypes"]);
                    try {
                        while ($t1.moveNext()) {
                            var iconType = { v : $t1.Current };
                            Bridge.CustomUIMarkup.UI.Builder.Register("icon-" + (iconType.v || ""), (function ($me, iconType) {
                                return function () {
                                    return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("i", (iconType.v || "") + " icon");
                                };
                            })(this, iconType));
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$dispose();
                        }
                    }
                    Bridge.CustomUIMarkup.UI.Builder.Register("ui-celled-table", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("table", "ui celled table");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("thead", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("thead");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("tr", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("tr");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("th", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("th");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("tbody", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("tbody");
                    });
                    Bridge.CustomUIMarkup.UI.Builder.Register("td", function () {
                        return Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.CreateElement("td");
                    });


                    Bridge.CustomUIMarkup.UI.Builder.Register("ItemsControl", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(System.Windows.Controls.ItemsControl); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("DataGrid", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGrid); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("DataGridColumn", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn); });
                    Bridge.CustomUIMarkup.UI.Builder.Register("ListBox", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(System.Windows.Controls.ListBox); });




                }
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

    Bridge.define("Bridge.CustomUIMarkup.Libraries.split_js.Elements", {
        statics: {
            methods: {
                RegisterToBuilder: function () {
                    Bridge.CustomUIMarkup.UI.Builder.Register("SplitPanel", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel); });
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.Swiper.Elements", {
        statics: {
            methods: {
                RegisterToBuilder: function () {
                    Bridge.CustomUIMarkup.UI.Builder.Register("swiper.slider", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.Swiper.Slider); });
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.viewerjs.Elements", {
        statics: {
            methods: {
                RegisterToBuilder: function () {
                    Bridge.CustomUIMarkup.UI.Builder.Register("ImageGalery", function () { return Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.viewerjs.Viewer); });
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Resources", {
        statics: {
            methods: {
                GetXmlFileContent: function (key) {
                    return Bridge.CustomUIMarkup.Resources.$XmlFileContents[key];
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.Builder", {
        statics: {
            fields: {
                _elementCreators: null
            },
            ctors: {
                init: function () {
                    this._elementCreators = function (_o1) {
                            _o1.add("DIV", function () {
                                return new System.Windows.HtmlElement("div");
                            });
                            return _o1;
                        }(new (System.Collections.Generic.Dictionary$2(System.String,Function))());
                }
            },
            methods: {
                Create: function (T) {
                    var control = Bridge.createInstance(T);

                    return Bridge.CustomUIMarkup.UI.Builder.ApplyTemplate(T, control);
                },
                Register: function (tag, func) {
                    Bridge.CustomUIMarkup.UI.Builder._elementCreators.set(tag.toUpperCase(), func);
                },
                ApplyTemplate: function (T, control) {
                    control != null ? control.ApplyTemplate() : null;

                    return control;
                },
                BuildControlTemplate: function (xmlTemplate, control) {
                    var $t;
                    var builder = ($t = new Bridge.CustomUIMarkup.UI.Builder(), $t._rootNode = xmlTemplate.Root, $t.DataContext = control, $t.Caller = control, $t._isBuildingTemplate = true, $t);

                    var subControl = builder.BuildNode(builder._rootNode, control);

                    var subControlAsFrameworkElement = Bridge.as(subControl, System.Windows.FrameworkElement);
                    if (subControlAsFrameworkElement == null) {
                        throw new System.InvalidOperationException("TemplateControlFirstItemMustBeHTMLElement");
                    }

                    control._root = subControlAsFrameworkElement._root;
                    control.AddVisualChild(subControlAsFrameworkElement);
                },
                LoadComponent: function (control, xml) {
                    Bridge.CustomUIMarkup.UI.Builder.LoadComponent$1(control, System.Xml.XmlHelper.GetRootNode(xml));
                },
                LoadComponent$1: function (control, node, IsDesignMode, ElementCreatedAtLine, xml) {
                    var $t;
                    if (IsDesignMode === void 0) { IsDesignMode = false; }
                    if (ElementCreatedAtLine === void 0) { ElementCreatedAtLine = null; }
                    if (xml === void 0) { xml = null; }
                    var builder = ($t = new Bridge.CustomUIMarkup.UI.Builder(), $t._rootNode = node, $t.DataContext = control, $t.Caller = control, $t["IsDesignMode"] = IsDesignMode, $t.XmlString = xml, $t);

                    if (!Bridge.staticEquals(ElementCreatedAtLine, null)) {
                        builder.addElementCreatedAtLine(ElementCreatedAtLine);
                    }

                    var subControl = builder.BuildNode(builder._rootNode, control);

                    var subControlAsFrameworkElement = Bridge.as(subControl, System.Windows.FrameworkElement);
                    if (subControlAsFrameworkElement == null) {
                        throw new System.InvalidOperationException("ControlFirstItemMustBeHTMLElement");
                    }

                    Bridge.CustomUIMarkup.UI.Builder.InitDOM(control);
                    control.AddLogicalChild(subControlAsFrameworkElement);
                },
                GetFirstNodeSkipCommentAndText: function (xmlNodeList) {
                    var len = xmlNodeList.length;

                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var node = xmlNodeList[i];
                        var nodeType = node.nodeType;

                        if (nodeType === 8 || nodeType === 3) {
                            continue;
                        }

                        return node;
                    }

                    throw new System.InvalidOperationException("NodeCannotBeEmpty.");
                },
                InitDOM: function (instance) {
                    if (instance._root == null) {
                        instance.InitDOM();
                    }
                },
                IsUserDefinedTag: function (tag) {
                    return System.Linq.Enumerable.from(tag).contains(46) || System.Linq.Enumerable.from(tag).contains(45) || System.Linq.Enumerable.from(tag).contains(58);
                }
            }
        },
        fields: {
            XmlString: null,
            _rootNode: null,
            "_currentInstance": null,
            _isBuildingTemplate: false,
            Caller: null,
            DataContext: null,
            "IsDesignMode": false,
            TypeFinder: null
        },
        events: {
            ElementCreatedAtLine: null
        },
        ctors: {
            init: function () {
                this.TypeFinder = new Bridge.CustomUIMarkup.UI.TypeFinder();
            }
        },
        methods: {
            BuildNode: function (xmlNode, parentInstance) {
                if (xmlNode.nodeType === 8) {
                    return null;
                }

                if (xmlNode.nodeType === 3) {
                    return this.BuildTextNode(xmlNode, parentInstance);
                }

                //
                if (this.TryToInitParentProperty(xmlNode)) {
                    return null;
                }

                var instance = this.CreateInstance(xmlNode);



                this["_currentInstance"] = instance;

                if (this["IsDesignMode"]) {
                    var lineNumber = Bridge.CustomUIMarkup.Common.Extensions.GetOriginalLineNumber(xmlNode, this._rootNode, this.XmlString);

                    !Bridge.staticEquals(this.ElementCreatedAtLine, null) ? this.ElementCreatedAtLine(lineNumber, instance) : null;
                }

                this.InitializeDataContext(xmlNode, instance, parentInstance);



                this.ProcessAttributes(xmlNode, instance);

                var childNodes = xmlNode.childNodes;

                var len = childNodes.length;

                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var childNode = childNodes[i];

                    var subItem = this.BuildNode(childNode, instance);

                    this.Connect(instance, subItem);
                }

                return instance;
            },
            ProcessAttributes: function (xmlNode, instance) {
                var attributes = xmlNode.attributes;

                var len = attributes.length;
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var nodeAttribute = attributes[i];

                    this.ProcessAttribute(instance, nodeAttribute.nodeName, nodeAttribute.nodeValue);
                }
            },
            BuildTextNode: function (xmlNode, parentInstance) {
                // skip empty spaces
                var html = Bridge.CustomUIMarkup.UI.Extensions.GetInnerText(xmlNode);
                if (System.String.isNullOrWhiteSpace(html)) {
                    return null;
                }

                // maybe <div> {LastName} </div>
                var bindingInfo = System.Windows.Data.HTMLBindingInfo.TryParseExpression(html);
                if (bindingInfo != null) {
                    var textNode = $(document.createTextNode(""));
                    parentInstance._root.append(textNode);


                    bindingInfo.BindingMode = System.Windows.Data.BindingMode.OneWay;

                    bindingInfo.Source = parentInstance;
                    bindingInfo.SourcePath = System.Windows.PropertyPath.op_Implicit("DataContext." + (bindingInfo.SourcePath.Path || ""));

                    bindingInfo.Target$1 = textNode;
                    bindingInfo.TargetPath = System.Windows.PropertyPath.op_Implicit("InnerHTML");

                    bindingInfo.Connect();
                    return null;
                }

                var instanceAsContentControl = Bridge.as(parentInstance, System.Windows.ContentControl);
                if (instanceAsContentControl != null) {
                    instanceAsContentControl.Content = html;
                    return null;
                }

                parentInstance._root.append(html);

                return null;
            },
            Connect: function (parent, subItem) {
                if (subItem == null) {
                    return;
                }

                var subItemAsFrameworkElement = Bridge.as(subItem, System.Windows.FrameworkElement);
                if (subItemAsFrameworkElement == null) {
                    return;
                }

                Bridge.unbox(parent).AddLogicalChild(subItemAsFrameworkElement);
            },
            CreateInstanceInternal: function (xmlNode) {
                var $t;

                var tag = xmlNode.nodeName.toUpperCase();

                var creatorFunc = { v : null };
                Bridge.CustomUIMarkup.UI.Builder._elementCreators.tryGetValue(tag.toUpperCase(), creatorFunc);
                if (!Bridge.staticEquals(creatorFunc.v, null)) {
                    return creatorFunc.v();
                }

                var controlType = ($t = this.TypeFinder) != null ? $t.FindType(tag) : null;

                if (controlType == null) {
                    if (Bridge.CustomUIMarkup.UI.Builder.IsUserDefinedTag(xmlNode.nodeName) === false) {
                        return new System.Windows.HtmlElement(xmlNode.nodeName);
                    }

                    throw new System.ArgumentException("NotRecognizedTag:" + (tag || ""));
                }

                return Bridge.cast(Bridge.createInstance(controlType), System.Windows.FrameworkElement);
            },
            CreateInstance: function (xmlNode) {
                var instance = this.CreateInstanceInternal(xmlNode);
                Bridge.CustomUIMarkup.UI.Builder.InitDOM(instance);

                return instance;
            },
            InitializeDataContext: function (xmlNode, instance, parentInstance) {
                var $t;
                if (this._isBuildingTemplate) {
                    instance.DataContext = this.DataContext;
                } else {
                    var subControlDataContextAttribute = xmlNode.attributes.DataContext;
                    if (subControlDataContextAttribute == null) {
                        var bindingInfo = ($t = new System.Windows.Data.BindingInfo(), $t.BindingMode = System.Windows.Data.BindingMode.OneWay, $t.Source = parentInstance, $t.SourcePath = System.Windows.PropertyPath.op_Implicit("DataContext"), $t.Target = instance, $t.TargetPath = System.Windows.PropertyPath.op_Implicit("DataContext"), $t);
                        bindingInfo.Connect();
                    } else {
                        var bi = System.Windows.Data.BindingInfo.TryParseExpression(subControlDataContextAttribute.nodeValue);
                        if (bi == null) {
                            throw new System.InvalidOperationException("InvalidBindingExpression:" + (subControlDataContextAttribute.nodeValue || ""));
                        }

                        bi.BindingMode = System.Windows.Data.BindingMode.OneWay;
                        bi.Source = parentInstance;
                        bi.SourcePath = System.Windows.PropertyPath.op_Implicit("DataContext." + (bi.SourcePath.Path || ""));
                        bi.Target = instance;
                        bi.TargetPath = System.Windows.PropertyPath.op_Implicit("DataContext");
                        bi.Connect();
                    }
                }
            },
            ProcessAttribute: function (instance, name, value) {
                var $t;
                if (Bridge.referenceEquals(name, "DataContext")) {
                    return;
                }

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
                            var htmlBindingInfo = ($t = new System.Windows.Data.HTMLBindingInfo(), $t.Source = instance, $t.SourcePath = new System.Windows.PropertyPath("DataContext." + (bi.SourcePath.Path || "")), $t.Target$1 = Bridge.unbox(instance)._root, $t.TargetPath = System.Windows.PropertyPath.op_Implicit(name), $t.BindingMode = System.Windows.Data.BindingMode.OneWay, $t);

                            if (System.Windows.Data.HTMLBindingInfo.TargetCanUpdateSource(htmlBindingInfo.Target$1)) {
                                htmlBindingInfo.BindingMode = System.Windows.Data.BindingMode.TwoWay;
                            }


                            htmlBindingInfo.Connect();

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
                        var viewInvocationExpressionInfo = System.Text.Tokenizers.ViewInvocationExpressionInfo.Parse(value);

                        var methodName = viewInvocationExpressionInfo.MethodName;

                        var mi = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 8, 53 | 256, methodName);

                        Bridge.unbox(instance).On(eventName, Bridge.fn.bind(this, function () {
                            Bridge.Reflection.midel(mi, Bridge.unbox(this.Caller)).apply(null, Bridge.unbox(System.Linq.Enumerable.from(viewInvocationExpressionInfo.Parameters).toArray()));
                        }));
                        return;
                    }

                    var methodInfo1 = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 8, System.ComponentModel.ReflectionHelper.AllBindings | 256, value);

                    Bridge.unbox(instance).On(eventName, Bridge.fn.bind(this, function () {
                        Bridge.Reflection.midel(methodInfo1, Bridge.unbox(this.Caller))(null);
                    }));
                    return;
                }

                if (System.String.startsWith(nameUpperCase, "CSS.")) {
                    var styleAttributeName = name.substr(4);
                    Bridge.unbox(instance)._root.css(styleAttributeName, value);
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
                    System.ComponentModel.ReflectionHelper.SetNonStaticField(this.Caller, value, instance);

                    return;
                }

                Bridge.unbox(instance)._root.attr(name, value);
            },
            TryToInitParentProperty: function (xmlNode) {
                var $t;
                var parentNodeName = xmlNode.parentNode.nodeName;
                var nodeName = xmlNode.nodeName;


                // <ItemsControl.ItemTemplate>

                if (!System.String.startsWith(nodeName, (parentNodeName || "") + ".")) {
                    return false;
                }

                var propertyName = System.Extensions.RemoveFromStart(nodeName, (parentNodeName || "") + ".");
                if (propertyName == null) {
                    return false;
                }

                var propertyInfo = Bridge.Reflection.getMembers(Bridge.getType(this["_currentInstance"]), 16, 284, propertyName);
                if (propertyInfo == null) {
                    return false;
                }


                var propertyType = propertyInfo.rt;
                if (Bridge.referenceEquals(propertyType, System.Windows.Template)) {
                    var propertyValue = System.Windows.Template.CreateFrom(Bridge.CustomUIMarkup.UI.Builder.GetFirstNodeSkipCommentAndText(xmlNode.childNodes));
                    System.ComponentModel.ReflectionHelper.SetPropertyValue(this["_currentInstance"], propertyName, propertyValue);
                    return true;
                }

                var processAsAttribute = System.Extensions.IsNumeric$1(propertyType) || Bridge.referenceEquals(propertyType, System.String);
                if (!processAsAttribute) {
                    processAsAttribute = System.Nullable.eq((($t = System.Nullable.getUnderlyingType(propertyType)) != null ? System.Extensions.IsNumeric$1($t) : null), true);
                }

                if (processAsAttribute) {
                    var innerHTML = ((Bridge.CustomUIMarkup.UI.Extensions.GetInnerText(xmlNode) || "") + "").trim();

                    this.ProcessAttribute(this["_currentInstance"], propertyName, innerHTML);
                    return true;
                }

                /* 
                                   <DataGrid.Columns>
                                       <DataGridColumn Name='FullName' Label='Adı SoyAdı' />
                                   </DataGrid.Columns>
                */
                if (propertyInfo.s == null) {
                    var collection = Bridge.Reflection.midel(propertyInfo.g, Bridge.unbox(this["_currentInstance"]))();

                    var addMethod = Bridge.Reflection.getMembers(Bridge.getType(collection), 8, 284, "Add");


                    var childNodes = xmlNode.childNodes;

                    var len = childNodes.length;

                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var childNode = childNodes[i];

                        if (childNode.nodeType !== 1) {
                            continue;
                        }

                        var subItem = this.CreateInstance(childNode);


                        this.InitializeDataContext(childNode, subItem, Bridge.unbox(this["_currentInstance"]));

                        this.ProcessAttributes(childNode, subItem);

                        Bridge.Reflection.midel(addMethod, Bridge.unbox(collection))(subItem);
                    }

                    return true;

                }

                throw new System.NotImplementedException(nodeName);

            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.Extensions", {
        statics: {
            methods: {
                GetInnerText: function (xmlNode) {
                    if (xmlNode.nodeType === 3) {
                        return Bridge.unbox(xmlNode.textContent);
                    }

                    return Bridge.unbox(xmlNode.innerHTML);
                },
                LoadComponent: function (T, element, xml) {
                    Bridge.CustomUIMarkup.UI.Builder.LoadComponent(element, xml);

                    return element;
                }
            }
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
                    this._tags = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Common.XmlIntellisenseInfo)).ctor();
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
            methods: {
                Init: function () {
                    Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.RegisterToBuilder();
                    Bridge.CustomUIMarkup.Libraries.split_js.Elements.RegisterToBuilder();
                    Bridge.CustomUIMarkup.Libraries.CodeMirror.Elements.RegisterToBuilder();
                    Bridge.CustomUIMarkup.Libraries.viewerjs.Elements.RegisterToBuilder();
                    Bridge.CustomUIMarkup.Libraries.Swiper.Elements.RegisterToBuilder();

                    $(Bridge.CustomUIMarkup_DesignerSamples.App.RenderUIEditor);
                },
                RenderUIEditor: function () {
                    var $t, $t1, $t2;
                    var appContainer = ($t = new Bridge.CustomUIMarkup_DesignerSamples.AppContainer(), $t.DataContext = ($t1 = new Bridge.CustomUIMarkup_DesignerSamples.ExampleDataContext(), $t1.CurrentTemplate = "Write xml code here.", $t1["Inner"] = ($t2 = new Bridge.CustomUIMarkup_DesignerSamples.ExampleDataContext(), $t2.CurrentTemplate = "Write xml code here", $t2), $t1), $t);

                    appContainer.DataContext = ($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleDataContext(), $t.CurrentTemplate = "Write xml code here.", $t["Inner"] = ($t1 = new Bridge.CustomUIMarkup_DesignerSamples.ExampleDataContext(), $t1.CurrentTemplate = "Write xml code here", $t1), $t);

                    appContainer.RenderInBody();
                }
            }
        }
    });

    /** @namespace Bridge.Html5 */

    /**
     * The extensions
     *
     * @static
     * @abstract
     * @public
     * @class Bridge.Html5.Extensions
     */
    Bridge.define("Bridge.Html5.Extensions", {
        statics: {
            methods: {
                /**
                 * Ases the HTML string.
                 *
                 * @static
                 * @public
                 * @this Bridge.Html5.Extensions
                 * @memberof Bridge.Html5.Extensions
                 * @param   {Element}    element
                 * @return  {string}
                 */
                AsHtmlString: function (element) {
                    var div = document.createElement("div");

                    div.appendChild(element.cloneNode(true));

                    return System.String.replaceAll(div.innerHTML, "\"", "'");
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

    Bridge.define("System.ArrayTypeMismatchException", {
        inherits: [System.SystemException],
        ctors: {
            ctor: function (message, innerException) {
                if (message === void 0) { message = null; }
                if (innerException === void 0) { innerException = null; }

                this.$initialize();
                System.SystemException.ctor.call(this, message, innerException);
            }
        }
    });

    /** @namespace System */

    /**
     * Utility methods for casting operations
     *
     * @static
     * @abstract
     * @public
     * @class System.Cast
     */
    Bridge.define("System.Cast", {
        statics: {
            methods: {
                /**
                 * To the specified value.
                 *
                 * @static
                 * @public
                 * @this System.Cast
                 * @memberof System.Cast
                 * @param   {System.Object}             value         
                 * @param   {Function}                  targetType    
                 * @param   {System.IFormatProvider}    provider
                 * @return  {System.Object}
                 */
                To$2: function (value, targetType, provider) {
                    var $t;
                    if (targetType == null) {
                        throw new System.ArgumentNullException("targetType");
                    }

                    if (value == null) {
                        return System.Extensions.GetDefaultValue(targetType);
                    }


                    if (Bridge.Reflection.isGenericType(targetType) && Bridge.referenceEquals(Bridge.Reflection.getGenericTypeDefinition(targetType), System.Nullable$1)) {
                        var valueAsString = Bridge.as(value, System.String);
                        if (Bridge.referenceEquals(valueAsString, "")) {
                            return null;
                        }

                        return System.Cast.To$2(value, ($t = Bridge.Reflection.getGenericArguments(targetType))[System.Array.index(0, $t)], provider);
                    }


                    var valueType = Bridge.getType(value);

                    if (Bridge.referenceEquals(valueType, targetType)) {
                        return value;
                    }

                    if (Bridge.referenceEquals(targetType, System.Object)) {
                        return value;
                    }


                    // ReSharper disable once UnusedVariable
                    var targetTypeName = Bridge.Reflection.getTypeName(targetType);

                    // try to convert from predefined convert functions
                    var fn = System.Convert['to'+targetTypeName]; 
if(fn)
{
    return fn(value,provider);    
}
;




                    if (Bridge.Reflection.isAssignableFrom(valueType, targetType)) {
                        return value;
                    }

                    throw new System.InvalidCastException(System.String.concat("@value:", value) + "not convertible to " + (Bridge.Reflection.getTypeFullName(targetType) || ""));
                },
                /**
                 * Casts value to 'TTargetType'
                 *
                 * @static
                 * @public
                 * @this System.Cast
                 * @memberof System.Cast
                 * @param   {Function}                  TTargetType    
                 * @param   {System.Object}             value          
                 * @param   {System.IFormatProvider}    provider
                 * @return  {TTargetType}
                 */
                To$1: function (TTargetType, value, provider) {
                    return Bridge.cast(Bridge.unbox(System.Cast.To$2(value, TTargetType, provider)), TTargetType);
                },
                /**
                 * Casts value to 'TTargetType'
                 *
                 * @static
                 * @public
                 * @this System.Cast
                 * @memberof System.Cast
                 * @param   {Function}         TTargetType    
                 * @param   {System.Object}    value
                 * @return  {TTargetType}
                 */
                To: function (TTargetType, value) {
                    return System.Cast.To$1(TTargetType, value, System.Globalization.CultureInfo.invariantCulture);
                }
            }
        }
    });

    Bridge.define("System.Collections.Generic.Extensions", {
        statics: {
            methods: {
                TryGetValue: function (TKey, TValue, dictionary, key, defaultValue) {
                    var value = { v : Bridge.getDefaultValue(TValue) };
                    if (dictionary.tryGetValue(key, value)) {
                        return value.v;
                    }

                    return defaultValue;
                }
            }
        }
    });

    Bridge.define("System.Collections.ObjectModel.Collection$1", function (T) { return {
        inherits: [System.Collections.Generic.IList$1(T),System.Collections.IList,System.Collections.Generic.IReadOnlyList$1(T)],
        statics: {
            methods: {
                IsCompatibleObject: function (value) {
                    // Non-null values are fine.  Only accept nulls if T is a class or Nullable<U>.
                    // Note that default(T) is not equal to null for value types except when T is Nullable<U>. 
                    return ((Bridge.is(value, T)) || (value == null && Bridge.getDefaultValue(T) == null));
                }
            }
        },
        fields: {
            items: null,
            _syncRoot: null
        },
        props: {
            Count: {
                get: function () {
                    return System.Array.getCount(this.items, T);
                }
            },
            "Items": {
                get: function () {
                    return this.items;
                }
            },
            "System$Collections$Generic$ICollection$1$IsReadOnly": {
                get: function () {
                    return System.Array.getIsReadOnly(this.items, T);
                }
            },
            "System$Collections$IList$IsReadOnly": {
                get: function () {
                    return System.Array.getIsReadOnly(this.items, T);
                }
            }
        },
        alias: [
            "Count", "System$Collections$Generic$IReadOnlyCollection$1$" + Bridge.getTypeAlias(T) + "$Count",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$Count",
            "getItem", "System$Collections$Generic$IReadOnlyList$1$" + Bridge.getTypeAlias(T) + "$getItem",
            "setItem", "System$Collections$Generic$IReadOnlyList$1$" + Bridge.getTypeAlias(T) + "$setItem",
            "getItem", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$getItem",
            "setItem", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$setItem",
            "add", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$add",
            "clear", "System$Collections$IList$clear",
            "clear", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$clear",
            "copyTo", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$copyTo",
            "contains", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$contains",
            "getEnumerator", ["System$Collections$Generic$IEnumerable$1$" + Bridge.getTypeAlias(T) + "$getEnumerator", "System$Collections$Generic$IEnumerable$1$getEnumerator"],
            "indexOf", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$indexOf",
            "insert", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$insert",
            "remove", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$remove",
            "removeAt", "System$Collections$IList$removeAt",
            "removeAt", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$removeAt",
            "System$Collections$Generic$ICollection$1$IsReadOnly", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$IsReadOnly"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this.items = new (System.Collections.Generic.List$1(T)).ctor();
            },
            $ctor1: function (list) {
                this.$initialize();
                if (list == null) {
                    System.ThrowHelper.ThrowArgumentNullException(System.ExceptionArgument.list);
                }
                this.items = list;
            }
        },
        methods: {
            getItem: function (index) {
                return System.Array.getItem(this.items, index, T);
            },
            setItem: function (index, value) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }

                if (index < 0 || index >= System.Array.getCount(this.items, T)) {
                    System.ThrowHelper.ThrowArgumentOutOfRangeException();
                }

                this.SetItem(index, value);
            },
            System$Collections$IList$getItem: function (index) {
                return System.Array.getItem(this.items, index, T);
            },
            System$Collections$IList$setItem: function (index, value) {
                System.ThrowHelper.IfNullAndNullsAreIllegalThenThrow(T, value, System.ExceptionArgument.value);

                try {
                    this.setItem(index, Bridge.cast(Bridge.unbox(value), T));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    if (Bridge.is($e1, System.InvalidCastException)) {
                        System.ThrowHelper.ThrowWrongValueTypeArgumentException(value, T);
                    } else {
                        throw $e1;
                    }
                }

            },
            add: function (item) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }

                var index = System.Array.getCount(this.items, T);
                this.InsertItem(index, item);
            },
            System$Collections$IList$add: function (value) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }
                System.ThrowHelper.IfNullAndNullsAreIllegalThenThrow(T, value, System.ExceptionArgument.value);

                try {
                    this.add(Bridge.cast(Bridge.unbox(value), T));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    if (Bridge.is($e1, System.InvalidCastException)) {
                        System.ThrowHelper.ThrowWrongValueTypeArgumentException(value, T);
                    } else {
                        throw $e1;
                    }
                }

                return ((this.Count - 1) | 0);
            },
            clear: function () {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }

                this.ClearItems();
            },
            copyTo: function (array, index) {
                System.Array.copyTo(this.items, array, index, T);
            },
            System$Collections$ICollection$copyTo: function (array, index) {
                if (array == null) {
                    System.ThrowHelper.ThrowArgumentNullException(System.ExceptionArgument.array);
                }

                if (System.Array.getRank(array) !== 1) {
                    System.ThrowHelper.ThrowArgumentException(System.ExceptionResource.Arg_RankMultiDimNotSupported);
                }

                if (System.Array.getLower(array, 0) !== 0) {
                    System.ThrowHelper.ThrowArgumentException(System.ExceptionResource.Arg_NonZeroLowerBound);
                }

                if (index < 0) {
                    System.ThrowHelper.ThrowArgumentOutOfRangeException$2(System.ExceptionArgument.index, System.ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
                }

                if (((array.length - index) | 0) < this.Count) {
                    System.ThrowHelper.ThrowArgumentException(System.ExceptionResource.Arg_ArrayPlusOffTooSmall);
                }

                var tArray = Bridge.as(array, System.Array.type(T));
                if (tArray != null) {
                    System.Array.copyTo(this.items, tArray, index, T);
                } else {
                    //
                    // Catch the obvious case assignment will fail.
                    // We can found all possible problems by doing the check though.
                    // For example, if the element type of the Array is derived from T,
                    // we can't figure out if we can successfully copy the element beforehand.
                    //
                    var targetType = (Bridge.getType(array).$elementType || null);
                    var sourceType = T;
                    if (!(Bridge.Reflection.isAssignableFrom(targetType, sourceType) || Bridge.Reflection.isAssignableFrom(sourceType, targetType))) {
                        System.ThrowHelper.ThrowArgumentException(System.ExceptionResource["Argument_InvalidArrayType"]);
                    }

                    //
                    // We can't cast array of value type to object[], so we don't support 
                    // widening of primitive types here.
                    //
                    var objects = Bridge.as(array, System.Array.type(System.Object));
                    if (objects == null) {
                        System.ThrowHelper.ThrowArgumentException(System.ExceptionResource["Argument_InvalidArrayType"]);
                    }

                    var count = System.Array.getCount(this.items, T);
                    try {
                        for (var i = 0; i < count; i = (i + 1) | 0) {
                            objects[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), objects)] = System.Array.getItem(this.items, i, T);
                        }
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                        if (Bridge.is($e1, System.ArrayTypeMismatchException)) {
                            System.ThrowHelper.ThrowArgumentException(System.ExceptionResource["Argument_InvalidArrayType"]);
                        } else {
                            throw $e1;
                        }
                    }
                }
            },
            contains: function (item) {
                return System.Array.contains(this.items, item, T);
            },
            System$Collections$IList$contains: function (value) {
                if (System.Collections.ObjectModel.Collection$1(T).IsCompatibleObject(value)) {
                    return this.contains(Bridge.cast(Bridge.unbox(value), T));
                }
                return false;
            },
            getEnumerator: function () {
                return Bridge.getEnumerator(this.items, T);
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return Bridge.getEnumerator(Bridge.cast(this.items, System.Collections.IEnumerable));
            },
            indexOf: function (item) {
                return System.Array.indexOf(this.items, item, 0, null, T);
            },
            System$Collections$IList$indexOf: function (value) {
                if (System.Collections.ObjectModel.Collection$1(T).IsCompatibleObject(value)) {
                    return this.indexOf(Bridge.cast(Bridge.unbox(value), T));
                }
                return -1;
            },
            insert: function (index, item) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }

                if (index < 0 || index > System.Array.getCount(this.items, T)) {
                    System.ThrowHelper.ThrowArgumentOutOfRangeException$2(System.ExceptionArgument.index, System.ExceptionResource["ArgumentOutOfRange_ListInsert"]);
                }

                this.InsertItem(index, item);
            },
            System$Collections$IList$insert: function (index, value) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }
                System.ThrowHelper.IfNullAndNullsAreIllegalThenThrow(T, value, System.ExceptionArgument.value);

                try {
                    this.insert(index, Bridge.cast(Bridge.unbox(value), T));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    if (Bridge.is($e1, System.InvalidCastException)) {
                        System.ThrowHelper.ThrowWrongValueTypeArgumentException(value, T);
                    } else {
                        throw $e1;
                    }
                }

            },
            remove: function (item) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }

                var index = System.Array.indexOf(this.items, item, 0, null, T);
                if (index < 0) {
                    return false;
                }
                this.RemoveItem(index);
                return true;
            },
            System$Collections$IList$remove: function (value) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }

                if (System.Collections.ObjectModel.Collection$1(T).IsCompatibleObject(value)) {
                    this.remove(Bridge.cast(Bridge.unbox(value), T));
                }
            },
            removeAt: function (index) {
                if (System.Array.getIsReadOnly(this.items, T)) {
                    System.ThrowHelper.ThrowNotSupportedException(System.ExceptionResource.NotSupported_ReadOnlyCollection);
                }

                if (index < 0 || index >= System.Array.getCount(this.items, T)) {
                    System.ThrowHelper.ThrowArgumentOutOfRangeException();
                }

                this.RemoveItem(index);
            },
            ClearItems: function () {
                System.Array.clear(this.items, T);
            },
            InsertItem: function (index, item) {
                System.Array.insert(this.items, index, item, T);
            },
            RemoveItem: function (index) {
                System.Array.removeAt(this.items, index, T);
            },
            SetItem: function (index, item) {
                System.Array.setItem(this.items, index, item, T);
            }
        }
    }; });

    Bridge.define("System.Collections.Specialized.INotifyCollectionChanged", {
        $kind: "interface"
    });

    Bridge.define("System.Collections.ObjectModel.ObservableCollection$1.SimpleMonitor", function (T) { return {
        inherits: [System.IDisposable],
        fields: {
            _busyCount: 0
        },
        props: {
            Busy: {
                get: function () {
                    return this._busyCount > 0;
                }
            }
        },
        alias: ["dispose", "System$IDisposable$dispose"],
        methods: {
            Enter: function () {
                this._busyCount = (this._busyCount + 1) | 0;
            },
            dispose: function () {
                this._busyCount = (this._busyCount - 1) | 0;
            }
        }
    }; });

    Bridge.define("System.Collections.Specialized.NotifyCollectionChangedAction", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * One or more items were added to the collection.
                 *
                 * @static
                 * @public
                 * @memberof System.Collections.Specialized.NotifyCollectionChangedAction
                 * @constant
                 * @default 0
                 * @type System.Collections.Specialized.NotifyCollectionChangedAction
                 */
                Add: 0,
                /**
                 * One or more items were removed from the collection.
                 *
                 * @static
                 * @public
                 * @memberof System.Collections.Specialized.NotifyCollectionChangedAction
                 * @constant
                 * @default 1
                 * @type System.Collections.Specialized.NotifyCollectionChangedAction
                 */
                Remove: 1,
                /**
                 * One or more items were replaced in the collection.
                 *
                 * @static
                 * @public
                 * @memberof System.Collections.Specialized.NotifyCollectionChangedAction
                 * @constant
                 * @default 2
                 * @type System.Collections.Specialized.NotifyCollectionChangedAction
                 */
                Replace: 2,
                /**
                 * One or more items were moved within the collection.
                 *
                 * @static
                 * @public
                 * @memberof System.Collections.Specialized.NotifyCollectionChangedAction
                 * @constant
                 * @default 3
                 * @type System.Collections.Specialized.NotifyCollectionChangedAction
                 */
                Move: 3,
                /**
                 * The content of the collection changed dramatically.
                 *
                 * @static
                 * @public
                 * @memberof System.Collections.Specialized.NotifyCollectionChangedAction
                 * @constant
                 * @default 4
                 * @type System.Collections.Specialized.NotifyCollectionChangedAction
                 */
                Reset: 4
            }
        }
    });

    /** @namespace System.Collections.Specialized */

    /**
     * Provides data for the {@link } event.
     *
     * @public
     * @class System.Collections.Specialized.NotifyCollectionChangedEventArgs
     * @augments System.Object
     */
    Bridge.define("System.Collections.Specialized.NotifyCollectionChangedEventArgs", {
        statics: {
            methods: {
                ArrayList_ReadOnly: function (list) {
                    // fixme:.net override ? 
                    return list;
                }
            }
        },
        fields: {
            _action: 0,
            "_newItems": null,
            "_oldItems": null,
            "_newStartingIndex": 0,
            "_oldStartingIndex": 0
        },
        props: {
            /**
             * Gets the action that caused the event.
             *
             * @instance
             * @public
             * @readonly
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @function Action
             * @type System.Collections.Specialized.NotifyCollectionChangedAction
             * @return  {[type]}        A {@link } value that describes the action that caused the event.
             */
            Action: {
                get: function () {
                    return this._action;
                }
            },
            /**
             * Gets the list of new items involved in the change.
             *
             * @instance
             * @public
             * @readonly
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @function NewItems
             * @type System.Collections.IList
             * @return  {[type]}        The list of new items involved in the change.
             */
            "NewItems": {
                get: function () {
                    return this["_newItems"];
                }
            },
            /**
             * Gets the index at which the change occurred.
             *
             * @instance
             * @public
             * @readonly
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @function NewStartingIndex
             * @type number
             * @return  {[type]}        The zero-based index at which the change occurred.
             */
            "NewStartingIndex": {
                get: function () {
                    return this["_newStartingIndex"];
                }
            },
            /**
             * Gets the list of items affected by a {@link }, Remove, or Move action.
             *
             * @instance
             * @public
             * @readonly
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @function OldItems
             * @type System.Collections.IList
             * @return  {[type]}        The list of items affected by a {@link }, Remove, or Move action.
             */
            "OldItems": {
                get: function () {
                    return this["_oldItems"];
                }
            },
            /**
             * Gets the index at which a {@link }, Remove, or Replace action occurred.
             *
             * @instance
             * @public
             * @readonly
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @function OldStartingIndex
             * @type number
             * @return  {[type]}        The zero-based index at which a {@link }, Remove, or Replace action occurred.
             */
            "OldStartingIndex": {
                get: function () {
                    return this["_oldStartingIndex"];
                }
            }
        },
        ctors: {
            init: function () {
                this["_newStartingIndex"] = -1;
                this["_oldStartingIndex"] = -1;
            },
            /**
             * Initializes a new instance of the {@link } class that describes a {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action    The action that caused the event. This must be set to {@link }.
             * @return  {void}
             */
            ctor: function (action) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    throw new System.ArgumentException("WrongActionForCtor");
                }
                this.InitializeAdd(action, null, -1);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a one-item change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Reset, Add, or Remove, or if <b /> is Reset and <b /> is not null.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action         The action that caused the event. This can be set to {@link }, {@link }, or {@link }.
             * @param   {System.Object}                                                   changedItem    The item that is affected by the change.
             * @return  {void}
             */
            $ctor7: function (action, changedItem) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Add && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Remove && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    throw new System.ArgumentException("MustBeResetAddOrRemoveActionForCtor");
                }
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    this.InitializeAddOrRemove(action, Bridge.cast((System.Array.init([changedItem], System.Object)), System.Collections.IList), -1);
                    return;
                }
                if (changedItem != null) {
                    throw new System.ArgumentException("ResetActionRequiresNullItem");
                }
                this.InitializeAdd(action, null, -1);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a one-item change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Reset, Add, or Remove, or if <b /> is Reset and either <b /> is not null or <b /> is not -1.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action         The action that caused the event. This can be set to {@link }, {@link }, or {@link }.
             * @param   {System.Object}                                                   changedItem    The item that is affected by the change.
             * @param   {number}                                                          index          The index where the change occurred.
             * @return  {void}
             */
            $ctor8: function (action, changedItem, index) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Add && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Remove && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    throw new System.ArgumentException("MustBeResetAddOrRemoveActionForCtor");
                }
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    this.InitializeAddOrRemove(action, Bridge.cast((System.Array.init([changedItem], System.Object)), System.Collections.IList), index);
                    return;
                }
                if (changedItem != null) {
                    throw new System.ArgumentException("ResetActionRequiresNullItem");
                }
                if (index !== -1) {
                    throw new System.ArgumentException("ResetActionRequiresIndexMinus1");
                }
                this.InitializeAdd(action, null, -1);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a multi-item change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action          The action that caused the event. This can be set to {@link }, {@link }, or {@link }.
             * @param   {System.Collections.IList}                                        changedItems    The items that are affected by the change.
             * @return  {void}
             */
            $ctor1: function (action, changedItems) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Add && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Remove && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    throw new System.ArgumentException("MustBeResetAddOrRemoveActionForCtor");
                }
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    if (changedItems == null) {
                        throw new System.ArgumentNullException("changedItems");
                    }
                    this.InitializeAddOrRemove(action, changedItems, -1);
                    return;
                }
                if (changedItems != null) {
                    throw new System.ArgumentException("ResetActionRequiresNullItem");
                }
                this.InitializeAdd(action, null, -1);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a multi-item change or a {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Reset, Add, or Remove, if <b /> is Reset and either <b /> is not null or <b /> is not -1, or if action is Add or Remove and <b /> is less than -1.
             * @throws If <b /> is Add or Remove and <b /> is null.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action           The action that caused the event. This can be set to {@link }, {@link }, or {@link }.
             * @param   {System.Collections.IList}                                        changedItems     The items affected by the change.
             * @param   {number}                                                          startingIndex    The index where the change occurred.
             * @return  {void}
             */
            $ctor5: function (action, changedItems, startingIndex) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Add && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Remove && action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    throw new System.ArgumentException("MustBeResetAddOrRemoveActionForCtor");
                }
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Reset) {
                    if (changedItems == null) {
                        throw new System.ArgumentNullException("changedItems");
                    }
                    if (startingIndex < -1) {
                        throw new System.ArgumentException("IndexCannotBeNegative:startingIndex");
                    }
                    this.InitializeAddOrRemove(action, changedItems, startingIndex);
                    return;
                }
                if (changedItems != null) {
                    throw new System.ArgumentException("ResetActionRequiresNullItem");
                }
                if (startingIndex !== -1) {
                    throw new System.ArgumentException("ResetActionRequiresIndexMinus1");
                }
                this.InitializeAdd(action, null, -1);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a one-item {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Replace.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action     The action that caused the event. This can only be set to {@link }.
             * @param   {System.Object}                                                   newItem    The new item that is replacing the original item.
             * @param   {System.Object}                                                   oldItem    The original item that is replaced.
             * @return  {void}
             */
            $ctor10: function (action, newItem, oldItem) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Replace) {
                    throw new System.ArgumentException("WrongActionForCtor");
                }
                var objArray = System.Array.init([newItem], System.Object);
                var objArray1 = System.Array.init([oldItem], System.Object);
                this.InitializeMoveOrReplace(action, Bridge.cast(objArray, System.Collections.IList), Bridge.cast(objArray1, System.Collections.IList), -1, -1);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a one-item {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Replace.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action     The action that caused the event. This can be set to {@link }.
             * @param   {System.Object}                                                   newItem    The new item that is replacing the original item.
             * @param   {System.Object}                                                   oldItem    The original item that is replaced.
             * @param   {number}                                                          index      The index of the item being replaced.
             * @return  {void}
             */
            $ctor11: function (action, newItem, oldItem, index) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Replace) {
                    throw new System.ArgumentException("WrongActionForCtor");
                }
                var ınt32 = index;
                var objArray = System.Array.init([newItem], System.Object);
                var objArray1 = System.Array.init([oldItem], System.Object);
                this.InitializeMoveOrReplace(action, Bridge.cast(objArray, System.Collections.IList), Bridge.cast(objArray1, System.Collections.IList), index, ınt32);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a multi-item {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Replace.
             * @throws If <b /> or <b /> is null.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action      The action that caused the event. This can only be set to {@link }.
             * @param   {System.Collections.IList}                                        newItems    The new items that are replacing the original items.
             * @param   {System.Collections.IList}                                        oldItems    The original items that are replaced.
             * @return  {void}
             */
            $ctor2: function (action, newItems, oldItems) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Replace) {
                    throw new System.ArgumentException("WrongActionForCtor");
                }
                if (newItems == null) {
                    throw new System.ArgumentNullException("newItems");
                }
                if (oldItems == null) {
                    throw new System.ArgumentNullException("oldItems");
                }
                this.InitializeMoveOrReplace(action, newItems, oldItems, -1, -1);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a multi-item {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Replace.
             * @throws If <b /> or <b /> is null.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action           The action that caused the event. This can only be set to {@link }.
             * @param   {System.Collections.IList}                                        newItems         The new items that are replacing the original items.
             * @param   {System.Collections.IList}                                        oldItems         The original items that are replaced.
             * @param   {number}                                                          startingIndex    The index of the first item of the items that are being replaced.
             * @return  {void}
             */
            $ctor3: function (action, newItems, oldItems, startingIndex) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Replace) {
                    throw new System.ArgumentException("WrongActionForCtor");
                }
                if (newItems == null) {
                    throw new System.ArgumentNullException("newItems");
                }
                if (oldItems == null) {
                    throw new System.ArgumentNullException("oldItems");
                }
                this.InitializeMoveOrReplace(action, newItems, oldItems, startingIndex, startingIndex);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a one-item {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Move or <b /> is less than 0.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action         The action that caused the event. This can only be set to {@link }.
             * @param   {System.Object}                                                   changedItem    The item affected by the change.
             * @param   {number}                                                          index          The new index for the changed item.
             * @param   {number}                                                          oldIndex       The old index for the changed item.
             * @return  {void}
             */
            $ctor9: function (action, changedItem, index, oldIndex) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Move) {
                    throw new System.ArgumentException(System.SR.GetString("WrongActionForCtor", System.Array.init([Bridge.box(System.Collections.Specialized.NotifyCollectionChangedAction.Move, System.Collections.Specialized.NotifyCollectionChangedAction, System.Enum.toStringFn(System.Collections.Specialized.NotifyCollectionChangedAction))], System.Object)), "action");
                }
                if (index < 0) {
                    throw new System.ArgumentException(System.SR.GetString("IndexCannotBeNegative"), "index");
                }
                var objArray = System.Array.init([changedItem], System.Object);
                this.InitializeMoveOrReplace(action, objArray, objArray, index, oldIndex);
            },
            /**
             * Initializes a new instance of the {@link } class that describes a multi-item {@link } change.
             *
             * @instance
             * @public
             * @this System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @memberof System.Collections.Specialized.NotifyCollectionChangedEventArgs
             * @throws If <b /> is not Move or <b /> is less than 0.
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action          The action that caused the event. This can only be set to {@link }.
             * @param   {System.Collections.IList}                                        changedItems    The items affected by the change.
             * @param   {number}                                                          index           The new index for the changed items.
             * @param   {number}                                                          oldIndex        The old index for the changed items.
             * @return  {void}
             */
            $ctor6: function (action, changedItems, index, oldIndex) {
                this.$initialize();
                if (action !== System.Collections.Specialized.NotifyCollectionChangedAction.Move) {
                    throw new System.ArgumentException(System.SR.GetString("WrongActionForCtor", System.Array.init([Bridge.box(System.Collections.Specialized.NotifyCollectionChangedAction.Move, System.Collections.Specialized.NotifyCollectionChangedAction, System.Enum.toStringFn(System.Collections.Specialized.NotifyCollectionChangedAction))], System.Object)), "action");
                }
                if (index < 0) {
                    throw new System.ArgumentException(System.SR.GetString("IndexCannotBeNegative"), "index");
                }
                this.InitializeMoveOrReplace(action, changedItems, changedItems, index, oldIndex);
            },
            $ctor4: function (action, newItems, oldItems, newIndex, oldIndex) {
                this.$initialize();
                var lists;
                var lists1;
                this._action = action;
                if (newItems == null) {
                    lists = null;
                } else {
                    lists = System.Collections.Specialized.NotifyCollectionChangedEventArgs.ArrayList_ReadOnly(newItems);

                }
                this["_newItems"] = lists;
                if (oldItems == null) {
                    lists1 = null;
                } else {
                    lists1 = System.Collections.Specialized.NotifyCollectionChangedEventArgs.ArrayList_ReadOnly(oldItems);

                }
                this["_oldItems"] = lists1;
                this["_newStartingIndex"] = newIndex;
                this["_oldStartingIndex"] = oldIndex;
            }
        },
        methods: {
            InitializeAdd: function (action, newItems, newStartingIndex) {
                var lists;
                this._action = action;
                if (newItems == null) {
                    lists = null;
                } else {
                    lists = System.Collections.Specialized.NotifyCollectionChangedEventArgs.ArrayList_ReadOnly(newItems);

                }
                this["_newItems"] = lists;
                this["_newStartingIndex"] = newStartingIndex;
            },
            InitializeAddOrRemove: function (action, changedItems, startingIndex) {
                if (action === System.Collections.Specialized.NotifyCollectionChangedAction.Add) {
                    this.InitializeAdd(action, changedItems, startingIndex);
                    return;
                }
                if (action === System.Collections.Specialized.NotifyCollectionChangedAction.Remove) {
                    this.InitializeRemove(action, changedItems, startingIndex);
                }
            },
            InitializeMoveOrReplace: function (action, newItems, oldItems, startingIndex, oldStartingIndex) {
                this.InitializeAdd(action, newItems, startingIndex);
                this.InitializeRemove(action, oldItems, oldStartingIndex);
            },
            InitializeRemove: function (action, oldItems, oldStartingIndex) {
                var lists;
                this._action = action;
                if (oldItems == null) {
                    lists = null;
                } else {
                    lists = System.Collections.Specialized.NotifyCollectionChangedEventArgs.ArrayList_ReadOnly(oldItems);

                }
                this["_oldItems"] = lists;
                this["_oldStartingIndex"] = oldStartingIndex;
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
                GetMethodInfo: function (instance, methodName) {
                    var methodInfo = System.ComponentModel.ReflectionHelper.FindMethodInfo(instance, methodName);
                    if (methodInfo == null) {
                        throw new System.MissingMemberException("MethodNotFound: " + (Bridge.Reflection.getTypeFullName(Bridge.getType(instance)) || "") + " -> " + (methodName || ""));
                    }

                    return methodInfo;
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
                /**
                 * Invokes the public non static method.
                 *
                 * @static
                 * @public
                 * @this System.ComponentModel.ReflectionHelper
                 * @memberof System.ComponentModel.ReflectionHelper
                 * @param   {System.Object}    instance      
                 * @param   {string}           methodName
                 * @return  {System.Object}
                 */
                InvokePublicNonStaticMethod: function (instance, methodName) {
                    if (instance == null) {
                        throw new System.ArgumentNullException("instance");
                    }

                    if (methodName == null) {
                        throw new System.ArgumentNullException("methodName");
                    }

                    var methodInfo = Bridge.Reflection.getMembers(Bridge.getType(instance), 8, 284, methodName);
                    if (methodInfo == null) {
                        throw new System.MissingMemberException((Bridge.Reflection.getTypeFullName(Bridge.getType(instance)) || "") + ":" + (methodName || ""));
                    }

                    return Bridge.Reflection.midel(methodInfo, Bridge.unbox(instance), null)(null);
                },
                SetNonStaticField: function (instance, fieldName, value) {
                    System.ComponentModel.ReflectionHelper.AssertParameters(instance, fieldName);

                    var type = Bridge.getType(instance);
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    var fieldInfo = Bridge.Reflection.getMembers(type, 4, System.ComponentModel.ReflectionHelper.AllBindings | 256, fieldName);
                    if (fieldInfo == null) {
                        throw new System.MissingMemberException("FieldNotFound: " + (Bridge.Reflection.getTypeFullName(Bridge.getType(instance)) || "") + " -> " + (fieldName || ""));
                    }

                    Bridge.Reflection.fieldAccess(fieldInfo, Bridge.unbox(instance), Bridge.unbox(value));
                },
                SetPropertyValue: function (instance, propertyName, value) {
                    System.ComponentModel.ReflectionHelper.AssertParameters(instance, propertyName);

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
                /**
                 * Tries the get value.
                 *
                 * @static
                 * @public
                 * @this System.ComponentModel.ReflectionHelper
                 * @memberof System.ComponentModel.ReflectionHelper
                 * @param   {System.Object}    instance        
                 * @param   {string}           propertyName
                 * @return  {System.Object}
                 */
                TryGetPropertyValue: function (instance, propertyName) {
                    var property = System.ComponentModel.ReflectionHelper.GetFirstNamedProperty(instance, propertyName);
                    if (property == null) {
                        return null;
                    }

                    return Bridge.Reflection.midel(property.g, Bridge.unbox(instance))();
                },
                AssertParameters: function (instance, memberName) {
                    if (instance == null) {
                        throw new System.ArgumentNullException("instance");
                    }

                    if (memberName == null) {
                        throw new System.ArgumentNullException("memberName");
                    }
                },
                /**
                 * Gets the first named property.
                 *
                 * @static
                 * @private
                 * @this System.ComponentModel.ReflectionHelper
                 * @memberof System.ComponentModel.ReflectionHelper
                 * @param   {System.Object}                     instance        
                 * @param   {string}                            propertyName
                 * @return  {System.Reflection.PropertyInfo}
                 */
                GetFirstNamedProperty: function (instance, propertyName) {
                    if (instance == null) {
                        return null;
                    }

                    return System.Linq.Enumerable.from(Bridge.Reflection.getMembers(Bridge.getType(instance), 16, 28)).firstOrDefault(function (p) {
                            return Bridge.referenceEquals(p.n, propertyName);
                        }, null);
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

    Bridge.define("System.ExceptionArgument", {
        $kind: "enum",
        statics: {
            fields: {
                obj: 0,
                dictionary: 1,
                dictionaryCreationThreshold: 2,
                array: 3,
                info: 4,
                key: 5,
                collection: 6,
                list: 7,
                match: 8,
                converter: 9,
                queue: 10,
                stack: 11,
                capacity: 12,
                index: 13,
                "startIndex": 14,
                value: 15,
                count: 16,
                "arrayIndex": 17,
                $name: 18,
                mode: 19,
                item: 20,
                options: 21,
                view: 22,
                sourceBytesToCopy: 23
            }
        }
    });

    Bridge.define("System.ExceptionResource", {
        $kind: "enum",
        statics: {
            fields: {
                "Argument_ImplementIComparable": 0,
                "Argument_InvalidType": 1,
                "Argument_InvalidArgumentForComparison": 2,
                "Argument_InvalidRegistryKeyPermissionCheck": 3,
                ArgumentOutOfRange_NeedNonNegNum: 4,
                Arg_ArrayPlusOffTooSmall: 5,
                Arg_NonZeroLowerBound: 6,
                Arg_RankMultiDimNotSupported: 7,
                Arg_RegKeyDelHive: 8,
                Arg_RegKeyStrLenBug: 9,
                Arg_RegSetStrArrNull: 10,
                Arg_RegSetMismatchedKind: 11,
                Arg_RegSubKeyAbsent: 12,
                Arg_RegSubKeyValueAbsent: 13,
                Argument_AddingDuplicate: 14,
                "Serialization_InvalidOnDeser": 15,
                Serialization_MissingKeys: 16,
                Serialization_NullKey: 17,
                "Argument_InvalidArrayType": 18,
                NotSupported_KeyCollectionSet: 19,
                NotSupported_ValueCollectionSet: 20,
                ArgumentOutOfRange_SmallCapacity: 21,
                "ArgumentOutOfRange_Index": 22,
                "Argument_InvalidOffLen": 23,
                "Argument_ItemNotExist": 24,
                ArgumentOutOfRange_Count: 25,
                "ArgumentOutOfRange_InvalidThreshold": 26,
                "ArgumentOutOfRange_ListInsert": 27,
                NotSupported_ReadOnlyCollection: 28,
                "InvalidOperation_CannotRemoveFromStackOrQueue": 29,
                "InvalidOperation_EmptyQueue": 30,
                "InvalidOperation_EnumOpCantHappen": 31,
                "InvalidOperation_EnumFailedVersion": 32,
                "InvalidOperation_EmptyStack": 33,
                ArgumentOutOfRange_BiggerThanCollection: 34,
                "InvalidOperation_EnumNotStarted": 35,
                "InvalidOperation_EnumEnded": 36,
                NotSupported_SortedListNestedWrite: 37,
                "InvalidOperation_NoValue": 38,
                "InvalidOperation_RegRemoveSubKey": 39,
                Security_RegistryPermission: 40,
                UnauthorizedAccess_RegistryNoWrite: 41,
                ObjectDisposed_RegKeyClosed: 42,
                "NotSupported_InComparableType": 43,
                "Argument_InvalidRegistryOptionsCheck": 44,
                "Argument_InvalidRegistryViewCheck": 45
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
                 * Compares the specified right.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {System.Object}             left              
                 * @param   {System.Object}             right             
                 * @param   {System.IFormatProvider}    formatProvider
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
                 * Gets default value of <b />
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {Function}         type
                 * @return  {System.Object}
                 */
                GetDefaultValue: function (type) {
                    if (Bridge.Reflection.isClass(type)) {
                        return null;
                    }

                    return Bridge.createInstance(type);
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
                 * @param   {System.Object}    value
                 * @return  {boolean}
                 */
                IsNumeric: function (value) {
                    if (Bridge.referenceEquals(value, null)) {
                        return false;
                    }

                    if (Bridge.is(value, System.Byte) || Bridge.is(value, System.SByte) || Bridge.is(value, System.UInt16) || Bridge.is(value, System.UInt32) || Bridge.is(value, System.UInt64) || Bridge.is(value, System.Int16) || Bridge.is(value, System.Int32) || Bridge.is(value, System.Int64) || Bridge.is(value, System.Decimal) || Bridge.is(value, System.Double) || Bridge.is(value, System.Single)) {
                        return true;
                    }

                    return false;
                },
                /**
                 * Determines whether this instance is numeric.
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {Function}    type
                 * @return  {boolean}
                 */
                IsNumeric$1: function (type) {
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    if (Bridge.referenceEquals(type, System.Byte) || Bridge.referenceEquals(type, System.SByte) || Bridge.referenceEquals(type, System.UInt16) || Bridge.referenceEquals(type, System.UInt32) || Bridge.referenceEquals(type, System.UInt64) || Bridge.referenceEquals(type, System.Int16) || Bridge.referenceEquals(type, System.Int32) || Bridge.referenceEquals(type, System.Int64) || Bridge.referenceEquals(type, System.Decimal) || Bridge.referenceEquals(type, System.Double) || Bridge.referenceEquals(type, System.Single)) {
                        return true;
                    }

                    return false;
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
                 * Removes value from end of str
                 *
                 * @static
                 * @public
                 * @this System.Extensions
                 * @memberof System.Extensions
                 * @param   {string}    data     
                 * @param   {string}    value
                 * @return  {string}
                 */
                RemoveFromEnd: function (data, value) {
                    if (System.String.endsWith(data, value)) {
                        return data.substr(0, ((data.length - value.length) | 0));
                    }

                    return data;
                },
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
                 * @return  {System.Decimal}
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
                 * @param   {System.Object}     value    The value.
                 * @return  {System.Decimal}
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
                 * @return  {?System.Decimal}
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
                 * @param   {System.Object}      value    The value.
                 * @return  {?System.Decimal}
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
        inherits: [System.SystemException],
        ctors: {
            ctor: function (message, innerException) {
                if (message === void 0) { message = null; }
                if (innerException === void 0) { innerException = null; }

                this.$initialize();
                System.SystemException.ctor.call(this, message, innerException);
            }
        }
    });

    Bridge.define("System.ObjectDisposedException", {
        inherits: [System.SystemException],
        fields: {
            objectName: null
        },
        props: {
            ObjectName: {
                get: function () {
                    return this.objectName;
                }
            }
        },
        ctors: {
            ctor: function (message, innerException) {
                if (message === void 0) { message = null; }
                if (innerException === void 0) { innerException = null; }

                this.$initialize();
                System.SystemException.ctor.call(this, message, innerException);
            },
            $ctor1: function (objectName, message) {
                this.$initialize();
                System.SystemException.ctor.call(this, message);
                this.objectName = objectName;
            }
        }
    });

    Bridge.define("System.Reflection.Extensions", {
        statics: {
            methods: {
                GetResource: function (assembly, name, throwOnError) {
                    var resource = assembly.getManifestResourceDataAsBase64(name);

                    if (resource == null) {
                        if (throwOnError) {
                            throw new System.InvalidOperationException("ResourceNotFound:" + (name || ""));
                        }

                        return null;
                    }

                    return System.Text.EncodingHelper.Base64Decode(resource);
                }
            }
        }
    });

    Bridge.define("System.Runtime.Serialization.SerializationException", {
        inherits: [System.SystemException],
        ctors: {
            ctor: function (message, innerException) {
                if (message === void 0) { message = null; }
                if (innerException === void 0) { innerException = null; }

                this.$initialize();
                System.SystemException.ctor.call(this, message, innerException);
            }
        }
    });

    Bridge.define("System.Security.SecurityException", {
        inherits: [System.SystemException],
        ctors: {
            ctor: function (message, innerException) {
                if (message === void 0) { message = null; }
                if (innerException === void 0) { innerException = null; }

                this.$initialize();
                System.SystemException.ctor.call(this, message, innerException);
            }
        }
    });

    Bridge.define("System.SR", {
        statics: {
            fields: {
                ObservableCollectionReentrancyNotAllowed: null
            },
            ctors: {
                init: function () {
                    this.ObservableCollectionReentrancyNotAllowed = "ObservableCollectionReentrancyNotAllowed";
                }
            },
            methods: {
                GetString: function (name, args) {
                    if (args === void 0) { args = []; }
                    return name;
                }
            }
        }
    });

    Bridge.define("System.Text.EncodingHelper", {
        statics: {
            methods: {
                Base64Decode: function (base64EncodedData) {
                    var base64EncodedBytes = System.Convert.fromBase64String(base64EncodedData);
                    return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                }
            }
        }
    });

    Bridge.define("System.Text.Tokenizers.BindingExpressionTokenDefinitions", {
        statics: {
            props: {
                Value: {
                    get: function () {
                        return function (_o1) {
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.LeftBracket, "\\{", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.RightBracket, "\\}", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.OpenParenthesis, "\\(", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.CloseParenthesis, "\\)", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.Equals, "=", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.This, "this", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.NotEquals, "!=", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType["Identifier"], "[a-zA-Z_$][a-zA-Z0-9_$]*", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.NumberValue, "\\d+", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.Comma, ",", 1));
                                _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.Dot, ".", 1));
                                return _o1;
                            }(new (System.Collections.Generic.List$1(System.Text.Tokenizers.TokenDefinition)).ctor());
                    }
                }
            }
        }
    });

    Bridge.define("System.Text.Tokenizers.Extensions", {
        statics: {
            methods: {
                SkipSpace: function (tokens, i) {
                    var len = System.Array.getCount(tokens, System.Text.Tokenizers.Token);

                    while (i.v < len) {
                        var token = System.Array.getItem(tokens, i.v, System.Text.Tokenizers.Token);

                        if (Bridge.referenceEquals(token.Value, " ")) {
                            i.v = (i.v + 1) | 0;
                            continue;
                        }

                        return;
                    }
                }
            }
        }
    });

    Bridge.define("System.Text.Tokenizers.Token", {
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
        }
    });

    Bridge.define("System.Text.Tokenizers.TokenDefinition", {
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
                return new (Bridge.GeneratorEnumerable$1(System.Text.Tokenizers.TokenMatch))(Bridge.fn.bind(this, function (inputString) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        matches,
                        len,
                        i,
                        match,
                        $t,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(System.Text.Tokenizers.TokenMatch))(Bridge.fn.bind(this, function () {
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

                                            $enumerator.current = ($t = new System.Text.Tokenizers.TokenMatch(), $t["StartIndex"] = match.getIndex(), $t["EndIndex"] = ((match.getIndex() + match.getLength()) | 0), $t.TokenType = this._tokenType, $t.Value = match.getValue(), $t.Precedence = this._precedence, $t);
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

    Bridge.define("System.Text.Tokenizers.Tokenizer", {
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

                var tokenMatches = new (System.Collections.Generic.List$1(System.Text.Tokenizers.TokenMatch)).ctor();

                $t = Bridge.getEnumerator(tokenDefinitions, System.Text.Tokenizers.TokenDefinition);
                try {
                    while ($t.moveNext()) {
                        var tokenDefinition = $t.Current;
                        tokenMatches.addRange(System.Linq.Enumerable.from(tokenDefinition.FindMatches(data)).toList(Bridge.global.System.Text.Tokenizers.TokenMatch));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                var items = new (System.Collections.Generic.List$1(System.Text.Tokenizers.Token)).ctor();

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

                    items.add(new System.Text.Tokenizers.Token.$ctor1(bestMatch.TokenType, bestMatch.Value));

                    lastMatch = bestMatch;
                }

                return items;
            }
        }
    });

    Bridge.define("System.Text.Tokenizers.TokenMatch", {
        fields: {
            "EndIndex": 0,
            Precedence: 0,
            "StartIndex": 0,
            TokenType: 0,
            Value: null
        }
    });

    Bridge.define("System.Text.Tokenizers.TokenType", {
        $kind: "enum",
        statics: {
            fields: {
                Binding: 0,
                Mode: 1,
                Converter: 2,
                TwoWay: 3,
                LeftBracket: 4,
                RightBracket: 5,
                OpenParenthesis: 6,
                CloseParenthesis: 7,
                "Identifier": 8,
                Comma: 9,
                Dot: 10,
                Equals: 11,
                This: 12,
                NotEquals: 13,
                StringValue: 14,
                SequenceTerminator: 15,
                NumberValue: 16
            }
        }
    });

    Bridge.define("System.Text.Tokenizers.ViewInvocationExpressionInfo", {
        statics: {
            fields: {
                BindingExpressionTokenizer: null
            },
            ctors: {
                init: function () {
                    var $t;
                    this.BindingExpressionTokenizer = ($t = new System.Text.Tokenizers.Tokenizer(), $t.TokenDefinitions = function (_o1) {
                            _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.Binding, "this", 1));
                            _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.OpenParenthesis, "\\(", 1));
                            _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.CloseParenthesis, "\\)", 1));
                            _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType["Identifier"], "[a-zA-Z_$][a-zA-Z0-9_$]*", 1));
                            _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.StringValue, "'([^']*)'", 1));
                            _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.Comma, ",", 1));
                            _o1.add(new System.Text.Tokenizers.TokenDefinition(System.Text.Tokenizers.TokenType.Dot, ".", 1));
                            return _o1;
                        }(new (System.Collections.Generic.List$1(System.Text.Tokenizers.TokenDefinition)).ctor()), $t);
                }
            },
            methods: {
                Parse: function (expression) {
                    var info = new System.Text.Tokenizers.ViewInvocationExpressionInfo();

                    var parameters = new (System.Collections.Generic.List$1(System.Object)).ctor();

                    var tokens = System.Text.Tokenizers.ViewInvocationExpressionInfo.BindingExpressionTokenizer.Tokenize(expression);
                    var len = System.Array.getCount(tokens, System.Text.Tokenizers.Token);
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var token = System.Array.getItem(tokens, i, System.Text.Tokenizers.Token);

                        if (Bridge.referenceEquals(token.Value.toUpperCase(), "THIS") || Bridge.referenceEquals(token.Value, " ") || Bridge.referenceEquals(token.Value, "(") || Bridge.referenceEquals(token.Value, ")") || Bridge.referenceEquals(token.Value, ",") || Bridge.referenceEquals(token.Value, ".")) {
                            info["IsStartsWithThis"] = true;
                            continue;
                        }

                        if (info.MethodName == null && token.TokenType === System.Text.Tokenizers.TokenType["Identifier"]) {
                            info.MethodName = token.Value;

                            continue;
                        }

                        // in parameters

                        if (System.String.startsWith(token.Value, "'")) {
                            var valueLen = token.Value.length;
                            parameters.add(token.Value.substr(1, ((valueLen - 2) | 0)));
                            continue;
                        }

                        parameters.add(System.Decimal(token.Value));
                    }

                    info.Parameters = parameters;
                    return info;
                }
            }
        },
        fields: {
            "IsStartsWithThis": false,
            MethodName: null,
            Parameters: null
        }
    });

    Bridge.define("System.ThrowHelper", {
        statics: {
            methods: {
                GetArgumentName: function (argument) {
                    var str = null;
                    switch (argument) {
                        case System.ExceptionArgument.obj: 
                            {
                                str = "obj";
                                break;
                            }
                        case System.ExceptionArgument.dictionary: 
                            {
                                str = "dictionary";
                                break;
                            }
                        case System.ExceptionArgument.dictionaryCreationThreshold: 
                            {
                                str = "dictionaryCreationThreshold";
                                break;
                            }
                        case System.ExceptionArgument.array: 
                            {
                                str = "array";
                                break;
                            }
                        case System.ExceptionArgument.info: 
                            {
                                str = "info";
                                break;
                            }
                        case System.ExceptionArgument.key: 
                            {
                                str = "key";
                                break;
                            }
                        case System.ExceptionArgument.collection: 
                            {
                                str = "collection";
                                break;
                            }
                        case System.ExceptionArgument.list: 
                            {
                                str = "list";
                                break;
                            }
                        case System.ExceptionArgument.match: 
                            {
                                str = "match";
                                break;
                            }
                        case System.ExceptionArgument.converter: 
                            {
                                str = "converter";
                                break;
                            }
                        case System.ExceptionArgument.queue: 
                            {
                                str = "queue";
                                break;
                            }
                        case System.ExceptionArgument.stack: 
                            {
                                str = "stack";
                                break;
                            }
                        case System.ExceptionArgument.capacity: 
                            {
                                str = "capacity";
                                break;
                            }
                        case System.ExceptionArgument.index: 
                            {
                                str = "index";
                                break;
                            }
                        case System.ExceptionArgument["startIndex"]: 
                            {
                                str = "startIndex";
                                break;
                            }
                        case System.ExceptionArgument.value: 
                            {
                                str = "value";
                                break;
                            }
                        case System.ExceptionArgument.count: 
                            {
                                str = "count";
                                break;
                            }
                        case System.ExceptionArgument["arrayIndex"]: 
                            {
                                str = "arrayIndex";
                                break;
                            }
                        case System.ExceptionArgument.$name: 
                            {
                                str = "name";
                                break;
                            }
                        case System.ExceptionArgument.mode: 
                            {
                                str = "mode";
                                break;
                            }
                        case System.ExceptionArgument.item: 
                            {
                                str = "item";
                                break;
                            }
                        case System.ExceptionArgument.options: 
                            {
                                str = "options";
                                break;
                            }
                        case System.ExceptionArgument.view: 
                            {
                                str = "view";
                                break;
                            }
                        case System.ExceptionArgument.sourceBytesToCopy: 
                            {
                                str = "sourceBytesToCopy";
                                break;
                            }
                        default: 
                            {
                                return "";
                            }
                    }
                    return str;
                },
                GetResourceName: function (resource) {
                    var str = null;
                    switch (resource) {
                        case System.ExceptionResource["Argument_ImplementIComparable"]: 
                            {
                                str = "Argument_ImplementIComparable";
                                break;
                            }
                        case System.ExceptionResource["Argument_InvalidType"]: 
                            {
                                str = "Argument_InvalidType";
                                break;
                            }
                        case System.ExceptionResource["Argument_InvalidArgumentForComparison"]: 
                            {
                                str = "Argument_InvalidArgumentForComparison";
                                break;
                            }
                        case System.ExceptionResource["Argument_InvalidRegistryKeyPermissionCheck"]: 
                            {
                                str = "Argument_InvalidRegistryKeyPermissionCheck";
                                break;
                            }
                        case System.ExceptionResource.ArgumentOutOfRange_NeedNonNegNum: 
                            {
                                str = "ArgumentOutOfRange_NeedNonNegNum";
                                break;
                            }
                        case System.ExceptionResource.Arg_ArrayPlusOffTooSmall: 
                            {
                                str = "Arg_ArrayPlusOffTooSmall";
                                break;
                            }
                        case System.ExceptionResource.Arg_NonZeroLowerBound: 
                            {
                                str = "Arg_NonZeroLowerBound";
                                break;
                            }
                        case System.ExceptionResource.Arg_RankMultiDimNotSupported: 
                            {
                                str = "Arg_RankMultiDimNotSupported";
                                break;
                            }
                        case System.ExceptionResource.Arg_RegKeyDelHive: 
                            {
                                str = "Arg_RegKeyDelHive";
                                break;
                            }
                        case System.ExceptionResource.Arg_RegKeyStrLenBug: 
                            {
                                str = "Arg_RegKeyStrLenBug";
                                break;
                            }
                        case System.ExceptionResource.Arg_RegSetStrArrNull: 
                            {
                                str = "Arg_RegSetStrArrNull";
                                break;
                            }
                        case System.ExceptionResource.Arg_RegSetMismatchedKind: 
                            {
                                str = "Arg_RegSetMismatchedKind";
                                break;
                            }
                        case System.ExceptionResource.Arg_RegSubKeyAbsent: 
                            {
                                str = "Arg_RegSubKeyAbsent";
                                break;
                            }
                        case System.ExceptionResource.Arg_RegSubKeyValueAbsent: 
                            {
                                str = "Arg_RegSubKeyValueAbsent";
                                break;
                            }
                        case System.ExceptionResource.Argument_AddingDuplicate: 
                            {
                                str = "Argument_AddingDuplicate";
                                break;
                            }
                        case System.ExceptionResource["Serialization_InvalidOnDeser"]: 
                            {
                                str = "Serialization_InvalidOnDeser";
                                break;
                            }
                        case System.ExceptionResource.Serialization_MissingKeys: 
                            {
                                str = "Serialization_MissingKeys";
                                break;
                            }
                        case System.ExceptionResource.Serialization_NullKey: 
                            {
                                str = "Serialization_NullKey";
                                break;
                            }
                        case System.ExceptionResource["Argument_InvalidArrayType"]: 
                            {
                                str = "Argument_InvalidArrayType";
                                break;
                            }
                        case System.ExceptionResource.NotSupported_KeyCollectionSet: 
                            {
                                str = "NotSupported_KeyCollectionSet";
                                break;
                            }
                        case System.ExceptionResource.NotSupported_ValueCollectionSet: 
                            {
                                str = "NotSupported_ValueCollectionSet";
                                break;
                            }
                        case System.ExceptionResource.ArgumentOutOfRange_SmallCapacity: 
                            {
                                str = "ArgumentOutOfRange_SmallCapacity";
                                break;
                            }
                        case System.ExceptionResource["ArgumentOutOfRange_Index"]: 
                            {
                                str = "ArgumentOutOfRange_Index";
                                break;
                            }
                        case System.ExceptionResource["Argument_InvalidOffLen"]: 
                            {
                                str = "Argument_InvalidOffLen";
                                break;
                            }
                        case System.ExceptionResource["Argument_ItemNotExist"]: 
                            {
                                str = "Argument_ItemNotExist";
                                break;
                            }
                        case System.ExceptionResource.ArgumentOutOfRange_Count: 
                            {
                                str = "ArgumentOutOfRange_Count";
                                break;
                            }
                        case System.ExceptionResource["ArgumentOutOfRange_InvalidThreshold"]: 
                            {
                                str = "ArgumentOutOfRange_InvalidThreshold";
                                break;
                            }
                        case System.ExceptionResource["ArgumentOutOfRange_ListInsert"]: 
                            {
                                str = "ArgumentOutOfRange_ListInsert";
                                break;
                            }
                        case System.ExceptionResource.NotSupported_ReadOnlyCollection: 
                            {
                                str = "NotSupported_ReadOnlyCollection";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_CannotRemoveFromStackOrQueue"]: 
                            {
                                str = "InvalidOperation_CannotRemoveFromStackOrQueue";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_EmptyQueue"]: 
                            {
                                str = "InvalidOperation_EmptyQueue";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_EnumOpCantHappen"]: 
                            {
                                str = "InvalidOperation_EnumOpCantHappen";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_EnumFailedVersion"]: 
                            {
                                str = "InvalidOperation_EnumFailedVersion";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_EmptyStack"]: 
                            {
                                str = "InvalidOperation_EmptyStack";
                                break;
                            }
                        case System.ExceptionResource.ArgumentOutOfRange_BiggerThanCollection: 
                            {
                                str = "ArgumentOutOfRange_BiggerThanCollection";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_EnumNotStarted"]: 
                            {
                                str = "InvalidOperation_EnumNotStarted";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_EnumEnded"]: 
                            {
                                str = "InvalidOperation_EnumEnded";
                                break;
                            }
                        case System.ExceptionResource.NotSupported_SortedListNestedWrite: 
                            {
                                str = "NotSupported_SortedListNestedWrite";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_NoValue"]: 
                            {
                                str = "InvalidOperation_NoValue";
                                break;
                            }
                        case System.ExceptionResource["InvalidOperation_RegRemoveSubKey"]: 
                            {
                                str = "InvalidOperation_RegRemoveSubKey";
                                break;
                            }
                        case System.ExceptionResource.Security_RegistryPermission: 
                            {
                                str = "Security_RegistryPermission";
                                break;
                            }
                        case System.ExceptionResource.UnauthorizedAccess_RegistryNoWrite: 
                            {
                                str = "UnauthorizedAccess_RegistryNoWrite";
                                break;
                            }
                        case System.ExceptionResource.ObjectDisposed_RegKeyClosed: 
                            {
                                str = "ObjectDisposed_RegKeyClosed";
                                break;
                            }
                        case System.ExceptionResource["NotSupported_InComparableType"]: 
                            {
                                str = "NotSupported_InComparableType";
                                break;
                            }
                        case System.ExceptionResource["Argument_InvalidRegistryOptionsCheck"]: 
                            {
                                str = "Argument_InvalidRegistryOptionsCheck";
                                break;
                            }
                        case System.ExceptionResource["Argument_InvalidRegistryViewCheck"]: 
                            {
                                str = "Argument_InvalidRegistryViewCheck";
                                break;
                            }
                        default: 
                            {
                                return "";
                            }
                    }
                    return str;
                },
                IfNullAndNullsAreIllegalThenThrow: function (T, value, argName) {
                    if (value == null) {
                        if (Bridge.getDefaultValue(T) != null) {
                            System.ThrowHelper.ThrowArgumentNullException(argName);
                        }
                    }
                },
                ThrowArgumentException: function (resource) {
                    throw new System.ArgumentException(System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)));
                },
                ThrowArgumentException$1: function (resource, argument) {
                    throw new System.ArgumentException(System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)), System.ThrowHelper.GetArgumentName(argument));
                },
                ThrowArgumentNullException: function (argument) {
                    throw new System.ArgumentNullException(System.ThrowHelper.GetArgumentName(argument));
                },
                ThrowArgumentOutOfRangeException: function () {
                    System.ThrowHelper.ThrowArgumentOutOfRangeException$2(System.ExceptionArgument.index, System.ExceptionResource["ArgumentOutOfRange_Index"]);
                },
                ThrowArgumentOutOfRangeException$1: function (argument) {
                    throw new System.ArgumentOutOfRangeException(System.ThrowHelper.GetArgumentName(argument));
                },
                ThrowArgumentOutOfRangeException$2: function (argument, resource) {
                    //if (!CompatibilitySwitches.IsAppEarlierThanWindowsPhone8)
                    //{
                    //    throw new ArgumentOutOfRangeException(ThrowHelper.GetArgumentName(argument), Environment.GetResourceString(ThrowHelper.GetResourceName(resource)));
                    //}
                    throw new System.ArgumentOutOfRangeException(System.ThrowHelper.GetArgumentName(argument), "");
                },
                ThrowInvalidOperationException: function (resource) {
                    throw new System.InvalidOperationException(System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)));
                },
                ThrowKeyNotFoundException: function () {
                    throw new System.Collections.Generic.KeyNotFoundException();
                },
                ThrowNotSupportedException: function (resource) {
                    throw new System.InvalidOperationException(System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)));
                },
                ThrowObjectDisposedException: function (objectName, resource) {
                    throw new System.ObjectDisposedException.$ctor1(objectName, System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)));
                },
                ThrowSecurityException: function (resource) {
                    throw new System.Security.SecurityException(System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)));
                },
                ThrowSerializationException: function (resource) {
                    throw new System.Runtime.Serialization.SerializationException(System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)));
                },
                ThrowUnauthorizedAccessException: function (resource) {
                    throw new System.UnauthorizedAccessException(System.ThrowHelper.Environment.GetResourceString(System.ThrowHelper.GetResourceName(resource)));
                },
                ThrowWrongKeyTypeArgumentException: function (key, targetType) {
                    throw new System.ArgumentException(System.String.concat(System.String.concat("WrongKeyTypeArgumentException. @key:", key) + " @targetType:", Bridge.getTypeName(targetType)));
                },
                ThrowWrongValueTypeArgumentException: function (value, targetType) {
                    throw new System.ArgumentException(System.String.concat(System.String.concat("WrongValueTypeArgumentException. @value:", value) + " @targetType:", Bridge.getTypeName(targetType)));
                }
            }
        }
    });

    Bridge.define("System.ThrowHelper.Environment", {
        statics: {
            methods: {
                GetResourceString: function (key) {
                    return key;
                }
            }
        }
    });

    Bridge.define("System.UnauthorizedAccessException", {
        inherits: [System.SystemException],
        ctors: {
            ctor: function (message, innerException) {
                if (message === void 0) { message = null; }
                if (innerException === void 0) { innerException = null; }

                this.$initialize();
                System.SystemException.ctor.call(this, message, innerException);
            }
        }
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
                    this.BindingExpressionTokenizer = ($t = new System.Text.Tokenizers.Tokenizer(), $t.TokenDefinitions = System.Text.Tokenizers.BindingExpressionTokenDefinitions.Value, $t);
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
                    var valueConverter = null;
                    var converterParameter = null;

                    var tokens = System.Windows.Data.BindingInfo.BindingExpressionTokenizer.Tokenize(value);
                    var len = System.Array.getCount(tokens, System.Text.Tokenizers.Token);
                    for (var i = { v : 0 }; i.v < len; i.v = (i.v + 1) | 0) {
                        var token = System.Array.getItem(tokens, i.v, System.Text.Tokenizers.Token);

                        if (Bridge.referenceEquals(token.Value.toUpperCase(), "BINDING") || Bridge.referenceEquals(token.Value, " ")) {
                            continue;
                        }

                        if (sourcePath == null && token.TokenType === System.Text.Tokenizers.TokenType["Identifier"]) {
                            sourcePath = System.Windows.Data.BindingInfo.ReadPath(tokens, i);

                            continue;
                        }

                        if (Bridge.referenceEquals(token.Value.toUpperCase(), "MODE")) {
                            i.v = (i.v + 1) | 0; // skip mode

                            System.Windows.Data.BindingInfo.SkipAssignmentAndSpace(tokens, i);

                            System.Enum.tryParse(Bridge.global.System.Windows.Data.BindingMode, System.Array.getItem(tokens, i.v, System.Text.Tokenizers.Token).Value, bindingMode);
                            continue;
                        }

                        if (Bridge.referenceEquals(token.Value.toUpperCase(), "CONVERTERPARAMETER")) {
                            i.v = (i.v + 1) | 0; // skip converterparameter
                            System.Windows.Data.BindingInfo.SkipAssignmentAndSpace(tokens, i);

                            converterParameter = System.Windows.Data.BindingInfo.ReadConverterParameter(tokens, i);
                            converterParameter = converterParameter.trim();

                            if (System.String.startsWith(converterParameter, "'") && System.String.endsWith(converterParameter, "'")) {
                                converterParameter = System.Extensions.RemoveFromEnd(System.Extensions.RemoveFromStart(converterParameter, "'"), "'");
                            }

                            continue;
                        }

                        if (Bridge.referenceEquals(token.Value.toUpperCase(), "CONVERTER")) {
                            i.v = (i.v + 1) | 0; // skip converter

                            System.Windows.Data.BindingInfo.SkipAssignmentAndSpace(tokens, i);

                            var converterTypeFullName = System.Windows.Data.BindingInfo.ReadPath(tokens, i);

                            var converterType = Bridge.Reflection.getType(converterTypeFullName);
                            if (converterType == null) {
                                throw new System.MissingMemberException(converterTypeFullName);
                            }

                            valueConverter = Bridge.cast(Bridge.createInstance(converterType), System.Windows.Data.IValueConverter);
                        }
                    }

                    return ($t = new System.Windows.Data.BindingInfo(), $t.SourcePath = System.Windows.PropertyPath.op_Implicit(sourcePath), $t.BindingMode = bindingMode.v, $t.Converter = valueConverter, $t.ConverterParameter = converterParameter, $t);
                },
                SkipAssignmentAndSpace: function (tokens, i) {
                    var len = System.Array.getCount(tokens, System.Text.Tokenizers.Token);

                    while (i.v < len) {
                        var token = System.Array.getItem(tokens, i.v, System.Text.Tokenizers.Token);

                        if (Bridge.referenceEquals(token.Value, "=") || Bridge.referenceEquals(token.Value, " ")) {
                            i.v = (i.v + 1) | 0;
                            continue;
                        }
                        return;

                    }

                },
                ReadConverterParameter: function (tokens, i) {
                    var len = System.Array.getCount(tokens, System.Text.Tokenizers.Token);

                    var path = "";
                    while (i.v < len) {
                        var token = System.Array.getItem(tokens, i.v, System.Text.Tokenizers.Token);

                        if (token.TokenType === System.Text.Tokenizers.TokenType.Comma || token.TokenType === System.Text.Tokenizers.TokenType.RightBracket) {
                            i.v = (i.v - 1) | 0;
                            break;
                        }

                        path = (path || "") + (token.Value || "");
                        i.v = (i.v + 1) | 0;
                    }

                    return path;
                },
                ReadPath: function (tokens, i) {
                    var path = "";
                    while (true) {
                        var token = System.Array.getItem(tokens, i.v, System.Text.Tokenizers.Token);

                        if (Bridge.referenceEquals(token.Value, " ")) {
                            i.v = (i.v + 1) | 0;
                            continue;
                        }

                        if (token.TokenType === System.Text.Tokenizers.TokenType["Identifier"] || token.TokenType === System.Text.Tokenizers.TokenType.Dot) {
                            path = (path || "") + (token.Value || "");
                            i.v = (i.v + 1) | 0;
                        } else {
                            i.v = (i.v - 1) | 0;
                            break;
                        }
                    }

                    return path;
                }
            }
        },
        fields: {
            BindingMode: 0,
            Converter: null,
            ConverterParameter: null,
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
                if (this.SourcePath["IsNotReadyToUpdate"]) {
                    return;
                }

                this.SourcePath.SetPropertyValue(this.GetTargetValue());
            },
            UpdateTarget: function () {
                if (this.TargetPath["IsNotReadyToUpdate"]) {
                    return;
                }

                var value = this.SourcePath.GetPropertyValue();

                if (this.Converter != null) {
                    value = this.Converter.System$Windows$Data$IValueConverter$Convert(value, null, this.ConverterParameter, null);
                }

                this.TargetPath.SetPropertyValue(value);
            },
            ConnectSourceToTarget: function () {
                this.SourcePath.Listen(this.Source, Bridge.fn.cacheBind(this, this.UpdateTarget));
            },
            ConnectTargetToSource: function () {
                this.TargetPath.Listen(this.Target, Bridge.fn.cacheBind(this, this.UpdateSource));
            },
            GetTargetValue: function () {
                return this.TargetPath.GetPropertyValue();
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

    Bridge.define("System.Windows.Data.IValueConverter", {
        $kind: "interface"
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
                    if (ownerType == null) {
                        throw new System.ArgumentNullException("ownerType");
                    }


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
                body: {
                    get: function () {
                        return $("body");
                    }
                },
                head: {
                    get: function () {
                        return $("head");
                    }
                }
            },
            methods: {
                a: function (className) {
                    return System.Windows.DOM.CreateElement$1("a", className);
                },
                button: function (className) {
                    return System.Windows.DOM.CreateElement$1("button", className);
                },
                ById: function (id) {
                    return $(document.getElementById(id));
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
                li: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("li", className);
                },
                textarea: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("textarea", className);
                },
                ul: function (className) {
                    if (className === void 0) { className = null; }
                    return System.Windows.DOM.CreateElement$1("ul", className);
                }
            }
        }
    });

    Bridge.define("System.Windows.FrameworkElementExtensions", {
        statics: {
            methods: {
                Attr: function (T, element, attributeName, value) {
                    element._root.attr(attributeName, value);
                    return element;
                },
                Attr$1: function (T, element, attributeName) {
                    return element._root.attr(attributeName);
                },
                html: function (T, element) {
                    return element._root.html();
                },
                Val$1: function (T, element) {
                    return element._root.val();
                },
                Val: function (T, element, value) {
                    element._root.val(value);

                    return element;
                }
            }
        }
    });

    Bridge.define("System.Windows.HtmlBodyElement", {
        statics: {
            fields: {
                _value: null
            },
            props: {
                Value: {
                    get: function () {
                        var $t;
                        if (System.Windows.HtmlBodyElement._value == null) {
                            System.Windows.HtmlBodyElement._value = ($t = new System.Windows.HtmlElement(), $t._root = System.Windows.DOM.body, $t);
                        }

                        return System.Windows.HtmlBodyElement._value;
                    }
                }
            }
        }
    });

    Bridge.define("System.Windows.Markup.IAddChild", {
        $kind: "interface"
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
            "_pathLastNodeIsReachable": false,
            Path: null
        },
        props: {
            "IsNotReadyToUpdate": {
                get: function () {
                    return !this["_pathLastNodeIsReachable"];
                }
            },
            LastTrigger: {
                get: function () {
                    return this.Triggers.getItem(((this.Triggers.Count - 1) | 0));
                }
            }
        },
        ctors: {
            init: function () {
                this.Triggers = new (System.Collections.Generic.List$1(System.Windows.PropertyPath.Trigger)).ctor();
                this["_pathLastNodeIsReachable"] = true;
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
                this["_pathLastNodeIsReachable"] = true;
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

                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var trigger = this.Triggers.getItem(i);

                    trigger.OnPropertyValueChanged = Bridge.fn.bind(this, function () {
                        this.Listen(instance, onPropertyValueChanged);
                        onPropertyValueChanged();
                    });
                    trigger.Listen();
                }
            },
            SetPropertyValue: function (value) {
                var $t;
                var lastTrigger = this.LastTrigger;
                var instance = lastTrigger["Instance"];
                var propertyName = lastTrigger.PropertyName;

                var propertyType = ($t = System.ComponentModel.ReflectionHelper.FindProperty(instance, propertyName)) != null ? $t.rt : null;
                if (propertyType != null) {
                    value = System.Cast.To$2(value, propertyType, System.Globalization.CultureInfo.getCurrentCulture());
                }

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
                        this["_pathLastNodeIsReachable"] = false;
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

    Bridge.define("System.Windows.Template", {
        statics: {
            fields: {
                Cache: null
            },
            ctors: {
                init: function () {
                    this.Cache = new (System.Collections.Generic.Dictionary$2(System.String,System.Windows.Template))();
                }
            },
            methods: {
                CreateFromXml: function (xmlTemplate) {
                    var $t;
                    var rootNode = System.Xml.XmlHelper.GetRootNode(xmlTemplate);

                    var template = ($t = new System.Windows.Template(), $t._xmlTemplate = xmlTemplate, $t._rootNode = rootNode, $t);

                    return template;
                },
                CreateFrom: function (xmlNode) {
                    var $t;

                    return ($t = new System.Windows.Template(), $t._rootNode = xmlNode, $t);
                },
                RegisterAsXml: function (key, xmlTemplate) {
                    var $t;
                    var rootNode = System.Xml.XmlHelper.GetRootNode(xmlTemplate);

                    var template = ($t = new System.Windows.Template(), $t._key = key, $t._xmlTemplate = xmlTemplate, $t._rootNode = rootNode, $t);

                    System.Windows.Template.Cache.set(key, template);
                },
                RegisterAsXml$1: function (key, xmlTemplate) {
                    System.Windows.Template.RegisterAsXml(Bridge.Reflection.getTypeFullName(key), xmlTemplate);
                },
                GetDefaultTemplate: function (type) {
                    var cacheKey = Bridge.Reflection.getTypeFullName(type);

                    var template = { v : null };

                    if (System.Windows.Template.Cache.tryGetValue(cacheKey, template)) {
                        return template.v;
                    }

                    var templateAsXmlString = Bridge.CustomUIMarkup.Resources.GetXmlFileContent(System.Windows.Template.GetResourceKey(type));

                    if (templateAsXmlString == null) {
                        System.Windows.Template.Cache.set(cacheKey, null);
                        return null;
                    }

                    template.v = System.Windows.Template.CreateFromXml(templateAsXmlString);


                    System.Windows.Template.Cache.set(cacheKey, template.v);

                    return template.v;
                },
                GetResourceKey: function (type) {
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    return (System.String.replaceAll(System.Extensions.RemoveFromStart(Bridge.Reflection.getTypeFullName(type), "Bridge.CustomUIMarkup."), ".", "/") || "") + ".Template.xml";
                },
                Register: function (type) {
                    if (type == null) {
                        throw new System.ArgumentNullException("type");
                    }

                    var resourceKey = System.Windows.Template.GetResourceKey(type);

                    var templateXml = Bridge.CustomUIMarkup.Resources.GetXmlFileContent(resourceKey);

                    System.Windows.Template.RegisterAsXml(Bridge.Reflection.getTypeFullName(type), templateXml);
                },
                Get$1: function (key) {
                    return System.Windows.Template.Get(Bridge.Reflection.getTypeFullName(key));
                },
                Get: function (key) {

                    var template = System.Windows.Template.Find(key);
                    if (template == null) {
                        throw new System.InvalidOperationException("TemplateNotFound. Key: " + (key || ""));
                    }
                    return template;
                },
                Find$1: function (key) {
                    return System.Windows.Template.Find(Bridge.Reflection.getTypeFullName(key));
                },
                Find: function (key) {
                    var template = { v : null };
                    System.Windows.Template.Cache.tryGetValue(key, template);
                    return template.v;
                }
            }
        },
        fields: {
            _key: null,
            _xmlTemplate: null,
            _rootNode: null
        },
        props: {
            Root: {
                get: function () {
                    return this._rootNode;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();

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

    Bridge.define("System.Xml.XmlHelper", {
        statics: {
            methods: {
                GetRootNode: function (xmlString) {
                    var $t;
                    return ($t = System.Xml.XmlHelper.Parse(xmlString)) != null ? $t.firstChild : null;
                },
                Parse: function (xmlString) {
                    try {
                        xmlString = System.String.replaceAll(System.String.replaceAll(xmlString, "x:Name=", "x.Name = "), "x:Name =", "x.Name = ");
                        return $.parseXML(xmlString);
                    }
                    catch (e) {
                        e = System.Exception.create(e);
                        throw new System.Xml.XmlException("XmlParseErrorOccured.", e);
                    }
                }
            }
        }
    });

    Bridge.define("System.Windows.DependencyObject", {
        inherits: [System.ComponentModel.Bag],
        methods: {
            SetValue$1: function (dp, value) {
                this.setItem(dp.Name, value);
            },
            GetValue$1: function (dp) {
                var $t;
                var value = this.getItem(dp.Name);
                if (value == null) {
                    if ((($t = dp.PropertyMetadata) != null ? $t.DefaultValue : null) != null) {
                        return dp.PropertyMetadata.DefaultValue;
                    }

                    if (Bridge.Reflection.isEnum(dp.PropertyType)) {
                        return System.Enum.parse(dp.PropertyType, "0");
                    }
                }
                return value;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup_DesignerSamples.ExampleDataContext", {
        inherits: [System.ComponentModel.Bag],
        fields: {
            _inner: null,
            _examples: null,
            _currentTemplate: null
        },
        props: {
            "Inner": {
                get: function () {
                    return this._inner;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._inner, value)) {
                        this._inner = value;
                        this.OnPropertyChanged("Inner");
                    }
                }
            },
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
                System.ComponentModel.Bag.ctor.call(this);
                this.Examples = function (_o1) {
                        var $t;
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "DataGrid", $t.XmlTemplate = "\r\n\r\n\r\n<div Padding='11'>\r\n\t<DataGrid ItemsSource='{Examples}'>\r\n\t\t<DataGrid.Columns>\r\n\t\t\t<DataGridColumn Label='Label_A'    Name = 'Name' />\r\n\t\t\t<DataGridColumn Label='xxxx'    Name = 'Name' />\r\n\t\t</DataGrid.Columns>\r\n\t</DataGrid>\r\n</div> \r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Add review", $t.XmlTemplate = "\r\n\r\n\r\n<ui.segment Margin='11'>\r\n\t<ui.form >\r\n\t\t<ui.header.2>Add a review</ui.header.2>\r\n\r\n\t\t<field Label='your Rating'>\r\n\t\t\t<ui_rating  MaxRate='5'  />\r\n\t\t</field>\r\n\r\n\t\t<field Label='Name' >\r\n\t\t\t<textBox  IsMandatory='true' />\r\n\t\t</field>\r\n\r\n\t\t<field Label='Your review'>\r\n\t\t\t<textArea  IsMandatory='true' />\r\n\t\t</field>\r\n\r\n\t\t<ui.basic.button> Gönder\r\n\t\t</ui.basic.button>\r\n\r\n\t</ui.form>\r\n\r\n</ui.segment>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "comments", $t.XmlTemplate = "\r\n\r\n<ui_comments>\r\n\t<comment AvatarImageUrl='img/AvatarImageSample.jpg'  \r\n             Author='adana'\r\n             MetadataTimeInfo='11 agustos Pazar 5:44 AM'\r\n             Text='uzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggg'\r\n             />\r\n  \r\n  <comment AvatarImageUrl='img/AvatarImageSample.jpg'  \r\n             Author='ahmet'\r\n             MetadataTimeInfo='11 agustos Pazar 5:44 AM'\r\n             Text='uzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggg'\r\n             />\r\n    \r\n   <comment AvatarImageUrl='img/AvatarImageSample.jpg'  \r\n             Author='xyz'\r\n             MetadataTimeInfo='11 agustos Pazar 5:44 AM'\r\n             Text='uzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggg'\r\n             />\r\n  \r\n</ui_comments>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Tabs", $t.XmlTemplate = "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div Padding='11'>\r\n\t<ui_top_attached_tabular_menu>\r\n\t\t<Tab Header ='Header1' AddClass='active'>\r\n  \t\t\t<div class='ui segment'>\r\n                <ui.header.3> Product description</ui.header.3>\r\n          \t    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\r\n            </div>\r\n  \t\t</Tab>  \r\n  \r\n  \t\t<Tab Header ='Header2'> \r\n  \t\t\tWrite Content here 2\r\n  \t\t</Tab> \r\n\t</ui_top_attached_tabular_menu> \r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Viewverjs", $t.XmlTemplate = "\r\n\r\n\r\n\r\n<div>\r\n  <ImageGalery>\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n      <img src='img/carousel_1.jpg'  />\r\n  </ImageGalery>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "All", $t.XmlTemplate = "\r\n\r\n\r\n\r\n\r\n\r\n<ui.page.grid>\r\n   <ui.container>\r\n      <ui.text.menu.navbar FontSize='18'>\r\n         <left.menu>\r\n            <item>Project Name</item>\r\n         </left.menu>\r\n         <right.menu>\r\n            <item>Home</item>\r\n            <item>About</item>\r\n            <item>Contact</item>\r\n         </right.menu>\r\n      </ui.text.menu.navbar>\r\n      <ui.divider MarginBottom='10' />\r\n      <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />\r\n      <ui.divider MarginBottom='10' />\r\n\t  <ui.cards>\r\n\t  \r\n\t\t  <card>\r\n\t\t\t <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />\r\n\t\t\t <content Align='Center'>\r\n\t\t\t\t<Header Align='Center'>Motor Safari</Header>\r\n\t\t\t\t<description>Macera sizi bekliyor...</description>\r\n\t\t\t\t<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n\t\t\t </content>\r\n\t\t  </card>\r\n\t\t  \r\n\t\t  <card>\r\n\t\t\t <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />\r\n\t\t\t <content Align='Center'>\r\n\t\t\t\t<Header Align='Center'>Motor Safari</Header>\r\n\t\t\t\t<description>Macera sizi bekliyor...</description>\r\n\t\t\t\t<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n\t\t\t </content>\r\n\t\t  </card>\r\n\t\t  \r\n\t  </ui.cards>\r\n   </ui.container>\r\n</ui.page.grid>\r\n\r\n\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "DataGrid", $t.XmlTemplate = "\r\n\r\n\r\n<ui-container>\r\n    <DataGrid />\r\n</ui-container>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Card", $t.XmlTemplate = "\r\n\r\n<ui.cards>\r\n\r\n    <card>\r\n\t    <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg'/>\r\n\t    <content Align='Center'>\r\n            <Header Align='Center' >Motor Safari</Header>\r\n            <description> Macera sizi bekliyor...</description>\r\n            <ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n        </content>\t\r\n    </card>\r\n\r\n</ui.cards>\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Grid.column", $t.XmlTemplate = "\r\n\r\n\r\n<ui.grid>\r\n  \r\n    <column Width='27' Align='Center'>\r\n        <Icon Type='Setting' Color='#ffbb00' FontSize='17' />\r\n    </column>\r\n  \r\n  \t<Column Width='80'>\r\n        <TextBlock Text='Start Date:' Color='#888888' FontSize='13' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n  \t\r\n  \t<Column   Align='Left' >\r\n        <TextBlock Text='November 1, 2017 15:30' Color='#888888' FontSize='12' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n</ui.grid>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo(), $t.Name = "Form", $t.XmlTemplate = "\r\n\r\n\r\n<ui.segment>\r\n  <ui.page.grid Align='Center' MarginTop='5'>\r\n      <ui.form  Padding='55' Border='1px solid #ddd'>\r\n        <ui.header.3>Input form</ui.header.3>\r\n     <Field Value='A' Label='yy'>\r\n        <TextBox PlaceHolder='Write 1' />\r\n     </Field>\r\n     <ui.stacked>\r\n        <Field Value='A' Label='yy' >\r\n           <TextBox PlaceHolder='Write 1' IsMandatory='True' />\r\n        </Field>\r\n     </ui.stacked>\r\n     <ui.equal.width.grid>\r\n        <column>\r\n           <Field Value='A' Label='yy'>\r\n              <TextBox PlaceHolder='Write 1' />\r\n           </Field>\r\n        </column>\r\n        <column>\r\n           <Field Value='A' Label='yy'>\r\n              <TextBox PlaceHolder='Write 1' />\r\n           </Field>\r\n        </column>\r\n     </ui.equal.width.grid>\r\n        \r\n        <ui.grid>\r\n          <column Align='Right'>\r\n        \t\t<ui.button Text='No'   />\r\n            \t<ui.button Text='Yes'  AddClass='positive'  />\r\n            </column>\r\n        </ui.grid>\r\n  </ui.form>\r\n  </ui.page.grid>\r\n</ui.segment>\r\n\r\n\r\n\r\n\r\n", $t));
                        return _o1;
                    }(new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup_DesignerSamples.ExampleInfo)).ctor());
            }
        }
    });

    /**
     * @memberof System.Collections.Specialized
     * @callback System.Collections.Specialized.NotifyCollectionChangedEventHandler
     * @param   {System.Object}                                                      sender    
     * @param   {System.Collections.Specialized.NotifyCollectionChangedEventArgs}    e
     * @return  {void}
     */

    /** @namespace System.Collections.ObjectModel */

    /**
     * Implementation of a dynamic data collection based on generic Collection&lt;T&gt;,
     implementing INotifyCollectionChanged to notify listeners
     when items get added, removed or the whole list is refreshed.
     *
     * @public
     * @class System.Collections.ObjectModel.ObservableCollection$1
     * @augments System.Collections.ObjectModel.Collection$1
     * @implements  System.Collections.Specialized.INotifyCollectionChanged
     * @implements  System.ComponentModel.INotifyPropertyChanged
     */
    Bridge.define("System.Collections.ObjectModel.ObservableCollection$1", function (T) { return {
        inherits: [System.Collections.ObjectModel.Collection$1(T),System.Collections.Specialized.INotifyCollectionChanged,System.ComponentModel.INotifyPropertyChanged],
        statics: {
            fields: {
                CountString: null,
                "IndexerName": null
            },
            ctors: {
                init: function () {
                    this.CountString = "Count";
                    this["IndexerName"] = "Item[]";
                }
            }
        },
        fields: {
            _monitor: null
        },
        events: {
            /**
             * Occurs when the collection changes, either by adding or removing an item.
             *
             * @instance
             * @public
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @function addCollectionChanged
             * @param   {System.Collections.Specialized.NotifyCollectionChangedEventHandler}    value
             * @return  {void}
             * @see {@link INotifyCollectionChanged}
             */
            /**
             * Occurs when the collection changes, either by adding or removing an item.
             *
             * @instance
             * @public
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @function removeCollectionChanged
             * @param   {System.Collections.Specialized.NotifyCollectionChangedEventHandler}    value
             * @return  {void}
             * @see {@link INotifyCollectionChanged}
             */
            CollectionChanged: null,
            /**
             * PropertyChanged event (per {@link }).
             *
             * @instance
             * @protected
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @function addPropertyChanged
             * @param   {System.ComponentModel.PropertyChangedEventHandler}    value
             * @return  {void}
             */
            /**
             * PropertyChanged event (per {@link }).
             *
             * @instance
             * @protected
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @function removePropertyChanged
             * @param   {System.ComponentModel.PropertyChangedEventHandler}    value
             * @return  {void}
             */
            PropertyChanged: null
        },
        alias: ["addCollectionChanged", "System$Collections$Specialized$INotifyCollectionChanged$addCollectionChanged",
        "removeCollectionChanged", "System$Collections$Specialized$INotifyCollectionChanged$removeCollectionChanged"],
        ctors: {
            init: function () {
                this._monitor = new (System.Collections.ObjectModel.ObservableCollection$1.SimpleMonitor(T))();
            },
            /**
             * Initializes a new instance of ObservableCollection that is empty and has default initial capacity.
             *
             * @instance
             * @public
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                System.Collections.ObjectModel.Collection$1(T).ctor.call(this);
            },
            /**
             * Initializes a new instance of the ObservableCollection class
             that contains elements copied from the specified list
             *
             * @instance
             * @public
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @throws list is a null reference
             * @param   {System.Collections.Generic.List$1}    list    The list whose elements are copied to the new list.
             * @return  {void}
             */
            $ctor2: function (list) {
                this.$initialize();
                System.Collections.ObjectModel.Collection$1(T).$ctor1.call(this, (list != null) ? new (System.Collections.Generic.List$1(T)).$ctor2(list.Count) : list);
                // Workaround for VSWhidbey bug 562681 (tracked by Windows bug 1369339).
                // We should be able to simply call the base(list) ctor.  But Collection<T>
                // doesn't copy the list (contrary to the documentation) - it uses the
                // list directly as its storage.  So we do the copying here.
                //
                this.CopyFrom(list);
            },
            /**
             * Initializes a new instance of the ObservableCollection class that contains
             elements copied from the specified collection and has sufficient capacity
             to accommodate the number of elements copied.
             *
             * @instance
             * @public
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @throws collection is a null reference
             * @param   {System.Collections.Generic.IEnumerable$1}    collection    The collection whose elements are copied to the new list.
             * @return  {void}
             */
            $ctor1: function (collection) {
                this.$initialize();
                System.Collections.ObjectModel.Collection$1(T).ctor.call(this);
                if (collection == null) {
                    throw new System.ArgumentNullException("collection");
                }

                this.CopyFrom(collection);
            }
        },
        methods: {
            /**
             * PropertyChanged event (per {@link }).
             *
             * @instance
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @event System.Collections.ObjectModel.ObservableCollection$1#PropertyChanged
             * @return  {System.ComponentModel.PropertyChangedEventHandler}
             */
            System$ComponentModel$INotifyPropertyChanged$addPropertyChanged: function (value) {
                this.addPropertyChanged(value);
            },
            /**
             * PropertyChanged event (per {@link }).
             *
             * @instance
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @event System.Collections.ObjectModel.ObservableCollection$1#PropertyChanged
             * @return  {System.ComponentModel.PropertyChangedEventHandler}
             */
            System$ComponentModel$INotifyPropertyChanged$removePropertyChanged: function (value) {
                this.removePropertyChanged(value);
            },
            CopyFrom: function (collection) {
                var items = this["Items"];
                if (collection != null && items != null) {
                    var enumerator = Bridge.getEnumerator(collection, T);
                    try {
                        while (enumerator.System$Collections$IEnumerator$moveNext()) {
                            System.Array.add(items, enumerator[Bridge.geti(enumerator, "System$Collections$Generic$IEnumerator$1$" + Bridge.getTypeAlias(T) + "$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1")], T);
                        }
                    }
                    finally {
                        if (Bridge.hasValue(enumerator)) {
                            enumerator.System$IDisposable$dispose();
                        }
                    }
                }
            },
            /**
             * Move item at oldIndex to newIndex.
             *
             * @instance
             * @public
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {number}    oldIndex    
             * @param   {number}    newIndex
             * @return  {void}
             */
            Move: function (oldIndex, newIndex) {
                this.MoveItem(oldIndex, newIndex);
            },
            /**
             * Called by base class Collection&lt;T&gt; when the list is being cleared;
             raises a CollectionChanged event to any listeners.
             *
             * @instance
             * @protected
             * @override
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @return  {void}
             */
            ClearItems: function () {
                this.CheckReentrancy();
                System.Collections.ObjectModel.Collection$1(T).prototype.ClearItems.call(this);
                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T).CountString);
                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T)["IndexerName"]);
                this.OnCollectionReset();
            },
            /**
             * Called by base class Collection&lt;T&gt; when an item is removed from list;
             raises a CollectionChanged event to any listeners.
             *
             * @instance
             * @protected
             * @override
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {number}    index
             * @return  {void}
             */
            RemoveItem: function (index) {
                this.CheckReentrancy();
                var removedItem = this.getItem(index);

                System.Collections.ObjectModel.Collection$1(T).prototype.RemoveItem.call(this, index);

                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T).CountString);
                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T)["IndexerName"]);
                this.OnCollectionChanged$1(System.Collections.Specialized.NotifyCollectionChangedAction.Remove, removedItem, index);
            },
            /**
             * Called by base class Collection&lt;T&gt; when an item is added to list;
             raises a CollectionChanged event to any listeners.
             *
             * @instance
             * @protected
             * @override
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {number}    index    
             * @param   {T}         item
             * @return  {void}
             */
            InsertItem: function (index, item) {
                this.CheckReentrancy();
                System.Collections.ObjectModel.Collection$1(T).prototype.InsertItem.call(this, index, item);

                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T).CountString);
                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T)["IndexerName"]);
                this.OnCollectionChanged$1(System.Collections.Specialized.NotifyCollectionChangedAction.Add, item, index);
            },
            /**
             * Called by base class Collection&lt;T&gt; when an item is set in list;
             raises a CollectionChanged event to any listeners.
             *
             * @instance
             * @protected
             * @override
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {number}    index    
             * @param   {T}         item
             * @return  {void}
             */
            SetItem: function (index, item) {
                this.CheckReentrancy();
                var originalItem = this.getItem(index);
                System.Collections.ObjectModel.Collection$1(T).prototype.SetItem.call(this, index, item);

                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T)["IndexerName"]);
                this.OnCollectionChanged$3(System.Collections.Specialized.NotifyCollectionChangedAction.Replace, originalItem, item, index);
            },
            /**
             * Called by base class ObservableCollection&lt;T&gt; when an item is to be moved within the list;
             raises a CollectionChanged event to any listeners.
             *
             * @instance
             * @protected
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {number}    oldIndex    
             * @param   {number}    newIndex
             * @return  {void}
             */
            MoveItem: function (oldIndex, newIndex) {
                this.CheckReentrancy();

                var removedItem = this.getItem(oldIndex);

                System.Collections.ObjectModel.Collection$1(T).prototype.RemoveItem.call(this, oldIndex);
                System.Collections.ObjectModel.Collection$1(T).prototype.InsertItem.call(this, newIndex, removedItem);

                this.OnPropertyChanged$1(System.Collections.ObjectModel.ObservableCollection$1(T)["IndexerName"]);
                this.OnCollectionChanged$2(System.Collections.Specialized.NotifyCollectionChangedAction.Move, removedItem, newIndex, oldIndex);
            },
            /**
             * Raises a PropertyChanged event (per {@link }).
             *
             * @instance
             * @protected
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {System.ComponentModel.PropertyChangedEventArgs}    e
             * @return  {void}
             */
            OnPropertyChanged: function (e) {
                if (!Bridge.staticEquals(this.PropertyChanged, null)) {
                    this.PropertyChanged(this, e);
                }
            },
            /**
             * Helper to raise a PropertyChanged event  /&gt;).
             *
             * @instance
             * @private
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {string}    propertyName
             * @return  {void}
             */
            OnPropertyChanged$1: function (propertyName) {
                this.OnPropertyChanged(new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            },
            /**
             * Raise CollectionChanged event to any listeners.
             Properties/methods modifying this ObservableCollection will raise
             a collection changed event through this virtual method.
             *
             * @instance
             * @protected
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {System.Collections.Specialized.NotifyCollectionChangedEventArgs}    e
             * @return  {void}
             */
            OnCollectionChanged: function (e) {
                var $t;
                if (!Bridge.staticEquals(this.CollectionChanged, null)) {
                    $t = this.BlockReentrancy();
                    try {
                        this.CollectionChanged(this, e);
                    }
                    finally {
                        if (Bridge.hasValue($t)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                }
            },
            /**
             * Helper to raise CollectionChanged event to any listeners
             *
             * @instance
             * @private
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action    
             * @param   {System.Object}                                                   item      
             * @param   {number}                                                          index
             * @return  {void}
             */
            OnCollectionChanged$1: function (action, item, index) {
                this.OnCollectionChanged(new System.Collections.Specialized.NotifyCollectionChangedEventArgs.$ctor8(action, item, index));
            },
            /**
             * Helper to raise CollectionChanged event to any listeners
             *
             * @instance
             * @private
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action      
             * @param   {System.Object}                                                   item        
             * @param   {number}                                                          index       
             * @param   {number}                                                          oldIndex
             * @return  {void}
             */
            OnCollectionChanged$2: function (action, item, index, oldIndex) {
                this.OnCollectionChanged(new System.Collections.Specialized.NotifyCollectionChangedEventArgs.$ctor9(action, item, index, oldIndex));
            },
            /**
             * Helper to raise CollectionChanged event to any listeners
             *
             * @instance
             * @private
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @param   {System.Collections.Specialized.NotifyCollectionChangedAction}    action     
             * @param   {System.Object}                                                   oldItem    
             * @param   {System.Object}                                                   newItem    
             * @param   {number}                                                          index
             * @return  {void}
             */
            OnCollectionChanged$3: function (action, oldItem, newItem, index) {
                this.OnCollectionChanged(new System.Collections.Specialized.NotifyCollectionChangedEventArgs.$ctor11(action, newItem, oldItem, index));
            },
            /**
             * Disallow reentrant attempts to change this collection. E.g. a event handler
             of the CollectionChanged event is not allowed to make changes to this collection.
             *
             * @instance
             * @protected
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @return  {System.IDisposable}
             */
            BlockReentrancy: function () {
                this._monitor.Enter();
                return this._monitor;
            },
            /**
             * Check and assert for reentrant attempts to change this collection.
             *
             * @instance
             * @protected
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @throws raised when changing the collection
             while another collection change is still being notified to other listeners
             * @return  {void}
             */
            CheckReentrancy: function () {
                if (this._monitor.Busy) {
                    // we can allow changes if there's only one listener - the problem
                    // only arises if reentrant changes make the original event args
                    // invalid for later listeners.  This keeps existing code working
                    // (e.g. Selector.SelectedItems).
                    if ((!Bridge.staticEquals(this.CollectionChanged, null)) && (Bridge.fn.getInvocationList(this.CollectionChanged).length > 1)) {
                        throw new System.InvalidOperationException(System.SR.GetString(System.SR.ObservableCollectionReentrancyNotAllowed));
                    }
                }
            },
            /**
             * Helper to raise CollectionChanged event with action == Reset to any listeners
             *
             * @instance
             * @private
             * @this System.Collections.ObjectModel.ObservableCollection$1
             * @memberof System.Collections.ObjectModel.ObservableCollection$1
             * @return  {void}
             */
            OnCollectionReset: function () {
                this.OnCollectionChanged(new System.Collections.Specialized.NotifyCollectionChangedEventArgs.ctor(System.Collections.Specialized.NotifyCollectionChangedAction.Reset));
            }
        }
    }; });

    Bridge.define("System.Windows.Data.Converters.BooleanToCssClassConverter", {
        inherits: [System.Windows.Data.IValueConverter],
        statics: {
            methods: {
                ParseParameter: function (parameter) {
                    var parameterAsString = Bridge.as(parameter, System.String);

                    if (parameterAsString == null) {
                        throw new System.ArgumentNullException(System.String.concat("@InvalidConverterParameter:", parameter));
                    }

                    var strings = System.Linq.Enumerable.from(System.String.split(parameterAsString, [58].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (p) {
                            return System.String.isNullOrWhiteSpace(p) === false;
                        }).select(function (p) {
                        return p.trim();
                    }).toList(System.String);

                    if (strings.Count !== 2) {
                        throw new System.ArgumentNullException(System.String.concat("@InvalidConverterParameter:", parameter) + " (must be seperate bey css)");
                    }

                    return strings;
                }
            }
        },
        alias: [
            "Convert", "System$Windows$Data$IValueConverter$Convert",
            "ConvertBack", "System$Windows$Data$IValueConverter$ConvertBack"
        ],
        methods: {
            Convert: function (value, targetType, parameter, culture) {
                var valueAsBoolean = System.Cast.To(System.Boolean, value);
                var strings = System.Windows.Data.Converters.BooleanToCssClassConverter.ParseParameter(parameter);

                if (valueAsBoolean) {
                    return strings.getItem(0);
                }

                return strings.getItem(1);
            },
            ConvertBack: function (value, targetType, parameter, culture) {
                var strings = System.Windows.Data.Converters.BooleanToCssClassConverter.ParseParameter(parameter);

                if (Bridge.referenceEquals(System.String.concat(value, ""), strings.getItem(0))) {
                    return Bridge.box(true, System.Boolean, System.Boolean.toString);
                }

                return Bridge.box(false, System.Boolean, System.Boolean.toString);
            }
        }
    });

    Bridge.define("System.Windows.Data.Converters.BooleanToVisibilityConverter", {
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

                    return ($t = new System.Windows.Data.HTMLBindingInfo(), $t.SourcePath = bindingInfo.SourcePath, $t.Converter = bindingInfo.Converter, $t.ConverterParameter = bindingInfo.ConverterParameter, $t);
                },
                TargetCanUpdateSource: function (element) {
                    if (Bridge.referenceEquals(element.get(0).tagName, "INPUT")) {
                        var type = element.attr("type");
                        if (type == null) {
                            return false;
                        }

                        type = type.toUpperCase();

                        if (Bridge.referenceEquals(type, "HIDDEN") || Bridge.referenceEquals(type, "TEXT") || Bridge.referenceEquals(type, "TEXTAREA")) {
                            return true;
                        }
                    }

                    return false;
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
                    if (this.Target$1.get(0).nodeType === 3) {
                        this.Target$1.get(0).nodeValue = System.String.concat(value, "");
                        return;
                    }

                    this.Target$1.html(System.String.concat(value, ""));
                    return;
                }

                if (Bridge.referenceEquals(path, "VALUE")) {
                    this.Target$1.val(System.String.concat(value, "")).change();
                    return;
                }

                this.Target$1.attr(this.TargetPath.Path, System.String.concat(value, ""));
            },
            ConnectTargetToSource: function () {
                var element = this.Target$1;

                if (Bridge.referenceEquals(element.get(0).tagName, "INPUT")) {
                    var type = element.attr("type");

                    if (Bridge.referenceEquals((type != null ? type.toUpperCase() : null), "HIDDEN")) {
                        this.Target$1.on("change", Bridge.fn.cacheBind(this, this.UpdateSource));
                        return;
                    }
                }

                this.Target$1.focusout(Bridge.fn.bind(this, function (ev) {
                        this.UpdateSource();
                    }));
            },
            GetTargetValue: function () {
                var val = this.Target$1.val();

                if (Bridge.referenceEquals(val, "")) {
                    return null;
                }

                return val;
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
        inherits: [System.Windows.DependencyObject],
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
                "IsVisibleProperty": null,
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
                    this.WidthProperty = System.Windows.DependencyProperty.Register$1("Width", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("width"));
                    this.WidthPercentProperty = System.Windows.DependencyProperty.Register$1("WidthPercent", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater$1("width", function (v) {
                        return System.String.concat(v, "%");
                    }));
                    this.ColorProperty = System.Windows.DependencyProperty.Register$1("Color", System.String, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("color"));
                    this["InnerHTMLProperty"] = System.Windows.DependencyProperty.Register$1("InnerHTML", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                    this["IsVisibleProperty"] = System.Windows.DependencyProperty.Register$1("IsVisible", System.Boolean, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(Bridge.box(true, System.Boolean, System.Boolean.toString), System.Windows.FrameworkElement.OnVisibleChanged));
                    this.VisibilityProperty = System.Windows.DependencyProperty.Register$1("Visibility", System.Windows.Visibility, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnVisibilityChanged));
                    this.HeightProperty = System.Windows.DependencyProperty.Register$1("Height", System.Nullable$1(System.Double), System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("height"));
                    this.HeightPercentProperty = System.Windows.DependencyProperty.Register$1("HeightPercent", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater$1("height", function (v) {
                        return System.String.concat(v, "%");
                    }));
                    this.BackgroundProperty = System.Windows.DependencyProperty.Register$1("Background", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor2(System.Windows.FrameworkElement.OnBackgroundChanged));
                }
            },
            methods: {
                AddCssClassOnTrueElseRemove: function (cssClass) {
                    return new System.Windows.PropertyMetadata.$ctor2(function (d, e) {
                        var me = Bridge.cast(d, System.Windows.FrameworkElement);

                        if (System.Nullable.eq(System.Extensions.ToBooleanNullable(e.NewValue), true)) {
                            me._root.addClass(cssClass);
                            return;
                        }

                        me._root.removeClass(cssClass);
                    });
                },
                CreateHtmlAttributeUpdater: function (htmlAttribute) {
                    return new System.Windows.PropertyMetadata.$ctor2(function (d, e) {
                        var $t;
                        var me = Bridge.cast(d, System.Windows.FrameworkElement);

                        me._root.attr(htmlAttribute, ($t = e.NewValue) != null ? $t.toString() : null);
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
                RegisterDependencyProperty: function (name, propertyType, ownerType, propertyChangedCallback) {
                    return System.Windows.DependencyProperty.Register$1(name, propertyType, ownerType, new System.Windows.PropertyMetadata.$ctor2(propertyChangedCallback));
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
                OnVisibleChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var newValue = e.NewValue;

                    var value = System.Nullable.getValue(Bridge.cast(Bridge.unbox(newValue), System.Boolean));

                    if (value) {
                        me._root.css("visibility", "visible");
                    } else {
                        me._root.css("visibility", "hidden");
                    }
                },
                OnVisibilityChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var newValue = e.NewValue;

                    var value = System.Nullable.getValue(Bridge.cast(Bridge.unbox(newValue), System.Byte));

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
            _logicalParent: null,
            _visaulParent: null,
            _visualChilderen: null,
            _logicalChilderen: null,
            _id: null,
            _dataContext: null
        },
        events: {
            AfterConnectToLogicalParent: null,
            AfterConnectToVisualParent: null,
            AfterLogicalChildAdd: null,
            AfterLogicalChildRemove: null,
            BeforeLogicalChildAdd: null,
            AfterVisualChildAdd: null,
            BeforeConnectToLogicalParent: null,
            BeforeConnectToVisualParent: null
        },
        props: {
            _el: {
                get: function () {
                    return this._root.get(0);
                }
            },
            LogicalParent: {
                get: function () {
                    return this._logicalParent;
                }
            },
            VisaulParent: {
                get: function () {
                    return this._visaulParent;
                }
            },
            VisualChilderen: {
                get: function () {
                    return this.GetVisualChilderen();
                }
            },
            VisualChilderenCount: {
                get: function () {
                    var $t;
                    return ($t = (this._visualChilderen != null ? this._visualChilderen.Count : null), $t != null ? $t : 0);
                }
            },
            LogicalChilderen: {
                get: function () {
                    return this.GetLogicalChilderen();
                }
            },
            LogicalChilderenCount: {
                get: function () {
                    var $t;
                    return ($t = (this._logicalChilderen != null ? this._logicalChilderen.Count : null), $t != null ? $t : 0);
                }
            },
            Root: {
                get: function () {
                    return this._root;
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
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.WidthProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.WidthProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
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
            "IsVisible": {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement["IsVisibleProperty"])), System.Boolean));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement["IsVisibleProperty"], Bridge.box(value, System.Boolean, System.Boolean.toString));
                }
            },
            Visibility: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.VisibilityProperty)), System.Byte));
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.VisibilityProperty, Bridge.box(value, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility)));
                }
            },
            Height: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(System.Windows.FrameworkElement.HeightProperty)), System.Double, true);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.FrameworkElement.HeightProperty, Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
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
            RenderInBody: function () {
                System.Windows.HtmlBodyElement.Value.AddLogicalChild(this);
            },
            AddLogicalChild: function (child) {
                !Bridge.staticEquals(this.BeforeLogicalChildAdd, null) ? this.BeforeLogicalChildAdd(child) : null;

                !Bridge.staticEquals(child.BeforeConnectToLogicalParent, null) ? child.BeforeConnectToLogicalParent(this) : null;

                this.GetLogicalChilderen().add(child);

                child._logicalParent = this;

                !Bridge.staticEquals(this.AfterLogicalChildAdd, null) ? this.AfterLogicalChildAdd(child) : null;

                !Bridge.staticEquals(child.AfterConnectToLogicalParent, null) ? child.AfterConnectToLogicalParent() : null;
            },
            RemoveLogicalChild: function (child) {
                this._logicalChilderen != null ? this._logicalChilderen.remove(child) : null;

                !Bridge.staticEquals(this.AfterLogicalChildRemove, null) ? this.AfterLogicalChildRemove(child) : null;
            },
            RemoveVisualChild: function (child) {
                this._visualChilderen != null ? this._visualChilderen.remove(child) : null;

                Bridge.CustomUIMarkup.Common.Extensions.RemoveFromParent(child._root);
            },
            AddVisualChild: function (child) {
                !Bridge.staticEquals(child.BeforeConnectToVisualParent, null) ? child.BeforeConnectToVisualParent(this) : null;

                child._root.appendTo(this._root);

                child._visaulParent = this;

                !Bridge.staticEquals(this.AfterVisualChildAdd, null) ? this.AfterVisualChildAdd(child) : null;

                !Bridge.staticEquals(child.AfterConnectToVisualParent, null) ? child.AfterConnectToVisualParent() : null;

                this.GetVisualChilderen().add(child);
            },
            ClearVisualChilds: function () {
                this._root.empty();
                this._visualChilderen != null ? this._visualChilderen.clear() : null;
            },
            ClearLogicalChilds: function () {
                this._logicalChilderen != null ? this._logicalChilderen.clear() : null;
            },
            GetVisualChildAt: function (index) {
                return System.Array.getItem(this.VisualChilderen, index, System.Windows.FrameworkElement);
            },
            GetVisualChildAt$1: function (indexes) {
                if (indexes === void 0) { indexes = []; }
                var currentElement = this;
                var len = indexes.length;
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var index = indexes[System.Array.index(i, indexes)];

                    currentElement = currentElement.GetVisualChildAt(index);
                }

                return currentElement;
            },
            GetVisualChilderen: function () {
                if (this._visualChilderen == null) {
                    this._visualChilderen = new (System.Collections.Generic.List$1(System.Windows.FrameworkElement)).ctor();
                }

                return this._visualChilderen;
            },
            GetLogicalChilderen: function () {
                if (this._logicalChilderen == null) {
                    this._logicalChilderen = new (System.Collections.Generic.List$1(System.Windows.FrameworkElement)).ctor();
                }

                return this._logicalChilderen;
            },
            GetLogicalChildAt: function (index) {
                return System.Array.getItem(this.LogicalChilderen, index, System.Windows.FrameworkElement);
            },
            InitDOM: function () {
                if (this._root == null) {
                    this._root = $(document.createElement("div"));
                }
            },
            On: function (eventName, handler) {
                this._root.on(eventName, handler);
            }
        }
    });

    Bridge.define("System.Windows.Controls.Control", {
        inherits: [System.Windows.FrameworkElement],
        fields: {
            Template: null
        },
        events: {
            AfterTemplateApplied: null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return null;
                }
            },
            DefaultTemplate: {
                get: function () {
                    var key = Bridge.Reflection.getTypeFullName(Bridge.getType(this));

                    var template = { v : null };

                    if (System.Windows.Template.Cache.tryGetValue(key, template)) {
                        return template.v;
                    }

                    var defaultTemplateAsXml = this.DefaultTemplateAsXml;
                    if (defaultTemplateAsXml == null) {
                        System.Windows.Template.Cache.set(key, null);
                        return null;
                    }

                    template.v = System.Windows.Template.CreateFromXml(defaultTemplateAsXml);

                    System.Windows.Template.Cache.set(key, template.v);

                    return template.v;
                }
            }
        },
        methods: {
            ApplyTemplate: function () {
                var template = this.Template || this.DefaultTemplate;

                if (template == null) {
                    return;
                }

                Bridge.CustomUIMarkup.UI.Builder.BuildControlTemplate(template, this);

                !Bridge.staticEquals(this.AfterTemplateApplied, null) ? this.AfterTemplateApplied() : null;
            }
        }
    });

    Bridge.define("System.Windows.HtmlElement", {
        inherits: [System.Windows.FrameworkElement],
        ctors: {
            ctor: function (tag, className) {
                if (tag === void 0) { tag = null; }
                if (className === void 0) { className = null; }

                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this, tag, className);
                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.AddVisualChild));
                this.addAfterLogicalChildRemove(Bridge.fn.cacheBind(this, this.RemoveVisualChild));

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

    Bridge.define("Bridge.CustomUIMarkup.Libraries.CodeMirror.UIEditor", {
        inherits: [System.Windows.Controls.Control],
        fields: {
            _lineNumberToControlMap: null,
            _sourceText: null,
            _sourceDataContext: null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div  HeightPercent = '100' WidthPercent = '100'>    <SplitPanel Orientation='horizontal' HeightPercent = '100' WidthPercent = '100'>        <XmlEditor Text ='{SourceText}' HeightPercent = '100' WidthPercent = '100'                    OnTextChanged = '{OnTextChanged}'                    OnCursorLineNumberChanged = '{OnCursorLineNumberChanged}' />        <div Border = '1px solid Green' HeightPercent = '100' WidthPercent = '100' />    </SplitPanel></div>";
                }
            },
            Container: {
                get: function () {
                    return this.GetVisualChildAt$1([0, 0]).GetLogicalChildAt(1);
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
            init: function () {
                this._lineNumberToControlMap = new (System.Collections.Generic.Dictionary$2(System.Int32,System.Windows.FrameworkElement))();
            }
        },
        methods: {
            OnCursorLineNumberChanged: function (lineNumber) {
                this.FocusToLine(lineNumber);
            },
            FocusToLine: function (lineNumber) {
                lineNumber = (lineNumber + 1) | 0;
                var component = { v : null };
                this._lineNumberToControlMap != null ? this._lineNumberToControlMap.tryGetValue(lineNumber, component) : null;
                if (component.v == null) {
                    return;
                }

                var query = component.v._root;

                Bridge.CustomUIMarkup.Common.Extensions.highlight(query);
            },
            OnTextChanged: function () {
                var $t;
                this.ClearOutput();

                if (System.String.isNullOrWhiteSpace(this.SourceText)) {
                    return;
                }





                try {


                    var fe = ($t = new System.Windows.FrameworkElement(), $t.DataContext = this.SourceDataContext, $t);


                    Bridge.CustomUIMarkup.UI.Builder.LoadComponent$1(fe, System.Xml.XmlHelper.GetRootNode(this.SourceText), true, Bridge.fn.bind(this, function (line, element) {
                        this._lineNumberToControlMap.set(line, element);
                    }), this.SourceText);



                    var component = fe.GetLogicalChildAt(0);

                    this.SetOutput(component);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    var e;
                    if (Bridge.is($e1, System.Xml.XmlException)) {
                        e = $e1;
                        Bridge.Console.clear();
                        Bridge.Console.log(e);
                        this.SetErrorMessage(e.toString());
                    } else {
                        e = $e1;
                        Bridge.Console.clear();
                        Bridge.Console.log(e);
                        this.SetErrorMessage(e.toString());
                    }
                }
            },
            ClearOutput: function () {
                this.Container.ClearVisualChilds();
            },
            SetErrorMessage: function (message) {
                this.ClearOutput();

                var textBlock = Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock);

                textBlock.Text = message;

                this.Container.AddLogicalChild(textBlock);
            },
            SetOutput: function (element) {
                this.ClearOutput();

                this.Container.AddLogicalChild(element);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor", {
        inherits: [System.Windows.Controls.Control],
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
            _textArea: null,
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
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor.TextProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.CodeMirror.XmlEditor.TextProperty, value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);
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

                ((this._textArea = System.Windows.DOM.textarea())).appendTo(this._root).css("height", "100%");

                window.setTimeout(Bridge.fn.bind(this, function () {
                    this.Render$1(this._textArea.get(0));
                }), 0);
            },
            Render$1: function (textAreaElement) {
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

this._editor = CodeMirror.fromTextArea(textAreaElement, 
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

    Bridge.define("System.Windows.Controls.ItemsControl", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                DisplayMemberPathProperty: null,
                "ItemsSourceProperty": null
            },
            ctors: {
                init: function () {
                    this.DisplayMemberPathProperty = System.Windows.DependencyProperty.Register$1("DisplayMemberPath", System.String, System.Windows.Controls.ItemsControl, new System.Windows.PropertyMetadata.ctor(null));
                    this["ItemsSourceProperty"] = System.Windows.DependencyProperty.Register$1("ItemsSource", System.Object, System.Windows.Controls.ItemsControl, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        fields: {
            "ItemTemplate": null
        },
        events: {
            "ItemClicked": null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div />";
                }
            },
            DisplayMemberPath: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.Controls.ItemsControl.DisplayMemberPathProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.Controls.ItemsControl.DisplayMemberPathProperty, value);
                }
            },
            "ItemsSource": {
                get: function () {
                    return this.GetValue$1(System.Windows.Controls.ItemsControl["ItemsSourceProperty"]);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.Controls.ItemsControl["ItemsSourceProperty"], value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);
                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.AddVisualChild));

                this.addBeforeConnectToLogicalParent(Bridge.fn.cacheBind(this, this.OnBeforeConnectToLogicalParent));

                System.ComponentModel.Extensions.OnPropertyChanged(this, "ItemsSource", Bridge.fn.cacheBind(this, this.Render));
            }
        },
        methods: {
            ConnectItem: function (item) {
                this.AddLogicalChild(item);
            },
            ClearItems: function () {
                this.ClearVisualChilds();
                this.ClearLogicalChilds();
            },
            ItemSourceMustbe_Enumerable: function () {
                return new System.ArgumentException("MustbeList:ItemsSource@ItemsSource.Type:" + (Bridge.Reflection.getTypeFullName(Bridge.getType(this["ItemsSource"])) || ""));
            },
            RaiseEvent_ItemClicked: function (itemDataContext) {
                !Bridge.staticEquals(this.ItemClicked, null) ? this.ItemClicked(itemDataContext) : null;
            },
            Render: function () {
                var $t;
                if (this["ItemsSource"] == null) {
                    return;
                }

                var list = Bridge.as(this["ItemsSource"], System.Collections.IList);
                if (list == null) {
                    throw this.ItemSourceMustbe_Enumerable();
                }

                this.ClearItems();

                var itemTemplate = this["ItemTemplate"];

                var len = System.Array.getCount(list);
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var itemData = { v : System.Array.getItem(list, i) };

                    var item = null;
                    if (itemTemplate != null) {
                        var fe = ($t = new System.Windows.FrameworkElement(), $t.DataContext = itemData.v, $t);

                        Bridge.CustomUIMarkup.UI.Builder.LoadComponent$1(fe, this["ItemTemplate"].Root);

                        item = fe.GetLogicalChildAt(0);
                    } else {
                        var textBlock = Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock);
                        textBlock["InnerHTML"] = itemData.v != null ? itemData.v.toString() : null;

                        item = textBlock;
                    }

                    item.On("click", (function ($me, itemData) {
                        return Bridge.fn.bind($me, function () {
                            !Bridge.staticEquals(this.ItemClicked, null) ? this.ItemClicked(itemData.v) : null;
                        });
                    })(this, itemData));

                    this.ConnectItem(item);
                }
            },
            OnBeforeConnectToLogicalParent: function (arg) {
                this.Render();
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.comment", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                "AvatarImageUrlProperty": null,
                AuthorProperty: null,
                "MetadataTimeInfoProperty": null,
                TextProperty: null
            },
            ctors: {
                init: function () {
                    this["AvatarImageUrlProperty"] = System.Windows.DependencyProperty.Register("AvatarImageUrl", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.comment);
                    this.AuthorProperty = System.Windows.DependencyProperty.Register("Author", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.comment);
                    this["MetadataTimeInfoProperty"] = System.Windows.DependencyProperty.Register("MetadataTimeInfo", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.comment);
                    this.TextProperty = System.Windows.DependencyProperty.Register("Text", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.comment);
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='comment'>  <a class='avatar'>    <img src='{AvatarImageUrl}' />  </a>  <div class='content'>    <a class='author'>{Author}</a>    <div class='metadata'>      <span>{MetadataTimeInfo}</span>    </div>    <div class='text'>{Text}</div>  </div></div>";
                }
            },
            "AvatarImageUrl": {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment["AvatarImageUrlProperty"]), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment["AvatarImageUrlProperty"], value);
                }
            },
            Author: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment.AuthorProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment.AuthorProperty, value);
                }
            },
            "MetadataTimeInfo": {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment["MetadataTimeInfoProperty"]), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment["MetadataTimeInfoProperty"], value);
                }
            },
            Text: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment.TextProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.comment.TextProperty, value);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                EditorTypeProperty: null,
                LabelProperty: null,
                NameProperty: null
            },
            ctors: {
                init: function () {
                    this.EditorTypeProperty = System.Windows.DependencyProperty.Register$1("EditorType", Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridCellEditorType, Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn, new System.Windows.PropertyMetadata.ctor(0));
                    this.LabelProperty = System.Windows.DependencyProperty.Register$1("Label", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn, new System.Windows.PropertyMetadata.ctor(null));
                    this.NameProperty = System.Windows.DependencyProperty.Register$1("Name", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<th>{Label}</th>";
                }
            },
            EditorType: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn.EditorTypeProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn.EditorTypeProperty, Bridge.box(value, Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridCellEditorType, System.Enum.toStringFn(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridCellEditorType)));
                }
            },
            Label: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn.LabelProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn.LabelProperty, value);
                }
            },
            Name: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn.NameProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn.NameProperty, value);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                "IsDisabledProperty": null,
                ValueProperty: null
            },
            ctors: {
                init: function () {
                    this["IsDisabledProperty"] = System.Windows.DependencyProperty.Register$1("IsDisabled", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker, new System.Windows.PropertyMetadata.$ctor1(Bridge.box(false, System.Boolean, System.Boolean.toString), Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker.OnIsDisabledChanged));
                    this.ValueProperty = System.Windows.DependencyProperty.Register$1("Value", System.Nullable$1(System.DateTime), Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker, new System.Windows.PropertyMetadata.$ctor1(null, Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker.OnValueChanged));
                }
            },
            methods: {
                OnIsDisabledChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker);

                    me._ui_input.Class = System.Extensions.ToBoolean(e.NewValue) ? "ui disabled input left icon" : "ui input left icon";
                },
                OnValueChanged: function (d, e) {
                    var datePicker = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker);

                    var root = datePicker._root;
                    var value = Bridge.as(e.NewValue, System.DateTime, true);

                    root.calendar('set date',value);
                }
            }
        },
        fields: {
            _inputText: null,
            _ui_input: null
        },
        props: {
            "IsDisabled": {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker["IsDisabledProperty"])), System.Boolean));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker["IsDisabledProperty"], Bridge.box(value, System.Boolean, System.Boolean.toString));
                }
            },
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='ui calendar'>    <div x.Name='_ui_input'  class='ui input left icon'>        <i class='calendar icon'/>        <input type = 'text' x.Name='_inputText'/>    </div></div>";
                }
            },
            Value: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker.ValueProperty)), System.DateTime, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DatePicker.ValueProperty, Bridge.box(value, System.DateTime, System.Nullable.toStringFn(System.DateTime.format), System.Nullable.getHashCode));
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);
                this.addBeforeConnectToLogicalParent(Bridge.fn.bind(this, function (parent) {
                    var root = this._root;
                    var me = this;
                    

var settings = 
{
    type    : 'date',
    onChange:function (date, text, mode)
	{
		me.Value = date||null;
	},
    text:semantic_ui_calendar_text
};
root.calendar(settings);




                }));
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ElementBase", {
        inherits: [System.Windows.HtmlElement],
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

    Bridge.define("System.Windows.ContentControl", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                ContentProperty: null
            },
            ctors: {
                init: function () {
                    this.ContentProperty = System.Windows.FrameworkElement.RegisterDependencyProperty("Content", System.Object, System.Windows.ContentControl, System.Windows.ContentControl.OnContentChanged);
                }
            },
            methods: {
                Find: function (element) {
                    var elementAsContentPresenter = Bridge.as(element, System.Windows.ContentPresenter);

                    if (elementAsContentPresenter != null) {
                        return elementAsContentPresenter;
                    }

                    var len = element.VisualChilderenCount;

                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        elementAsContentPresenter = System.Windows.ContentControl.Find(element.GetVisualChildAt(i));
                        if (elementAsContentPresenter != null) {
                            return elementAsContentPresenter;
                        }
                    }

                    return null;
                },
                OnContentChanged: function (d, e) {
                    Bridge.cast(d, System.Windows.ContentControl).OnContentChanged();
                }
            }
        },
        fields: {
            _contentPresenter: null,
            _isContentChanging: false
        },
        props: {
            Content: {
                get: function () {
                    return this.GetValue$1(System.Windows.ContentControl.ContentProperty);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.ContentControl.ContentProperty, value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);

                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.CanOnlyBeOneChild));
                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.AssignFirstLogicalChildToContent));
                this.addAfterTemplateApplied(Bridge.fn.cacheBind(this, this.InitializeContentPresenter));
            }
        },
        methods: {
            InitializeContentPresenter: function () {
                this._contentPresenter = System.Windows.ContentControl.Find(this);
                if (this._contentPresenter == null) {
                    throw new System.InvalidOperationException("ContentPresenter must be defined in template.");
                }

            },
            AssignFirstLogicalChildToContent: function (element) {
                if (this._isContentChanging) {
                    return;
                }

                this.Content = element;
            },
            CanOnlyBeOneChild: function (child) {
                if (this.LogicalChilderenCount === 2) {
                    throw new System.InvalidOperationException("Content cannot be set more than once.");
                }
            },
            OnContentChanged: function () {

                if (this._contentPresenter == null) {
                    throw new System.InvalidOperationException("'ContentPresenter' element not found.");
                }

                this._isContentChanging = true;

                var content = this.Content;

                if (content == null) {
                    this._isContentChanging = false;
                    this._contentPresenter["InnerHTML"] = null;
                    return;
                }


                var frameworkElement = Bridge.as(content, System.Windows.FrameworkElement);
                if (frameworkElement != null) {
                    if (this._contentPresenter.LogicalChilderenCount === 1) {
                        this._contentPresenter.RemoveLogicalChild(this._contentPresenter.GetLogicalChildAt(0));
                    }

                    if (this._contentPresenter.VisualChilderenCount === 1) {
                        this._contentPresenter.RemoveVisualChild(this._contentPresenter.GetVisualChildAt(0));
                    }

                    this._contentPresenter.AddLogicalChild(frameworkElement);

                    if (this.LogicalChilderenCount === 1) {
                        this.RemoveLogicalChild(this.GetLogicalChildAt(0));
                    }

                    this.AddLogicalChild(frameworkElement);

                    this._isContentChanging = false;
                    return;
                }

                var contentAsString = content.toString();

                var textBlock = Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock);
                textBlock.Text = contentAsString;
                this._contentPresenter.AddLogicalChild(textBlock);

                if (this.LogicalChilderenCount === 1) {
                    this.RemoveLogicalChild(this.GetLogicalChildAt(0));
                }

                this.AddLogicalChild(textBlock);

                this._isContentChanging = false;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                "IsDisabledProperty": null,
                TextProperty: null,
                PlaceHolderProperty: null,
                "IsMandatoryProperty": null
            },
            ctors: {
                init: function () {
                    this["IsDisabledProperty"] = System.Windows.DependencyProperty.Register$1("IsDisabled", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor1(Bridge.box(false, System.Boolean, System.Boolean.toString), Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.OnIsDisabledChanged));
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.OnTextChanged));
                    this.PlaceHolderProperty = System.Windows.DependencyProperty.Register$1("PlaceHolder", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.OnPlaceHolderChanged));
                    this["IsMandatoryProperty"] = System.Windows.DependencyProperty.Register$1("IsMandatory", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText.OnIsMandatoryChanged));
                }
            },
            methods: {
                OnIsDisabledChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText);

                    if (System.Extensions.ToBoolean(e.NewValue)) {
                        me.Class = "ui disabled input";
                    } else {
                        me.Class = "ui input";
                    }

                },
                OnTextChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText);

                    me._inputElement._root.val(Bridge.cast(e.NewValue, System.String));
                },
                OnPlaceHolderChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText);
                    System.Windows.FrameworkElementExtensions.Attr(Bridge.global.System.Windows.FrameworkElement, me._inputElement, "placeholder", Bridge.cast(e.NewValue, System.String));
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
            "AllowOnlyDecimalInputs": false,
            "AllowOnlyNumericInputs": false,
            _cornerLabelDiv: null
        },
        events: {
            KeyPress: null
        },
        props: {
            "IsDisabled": {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText["IsDisabledProperty"])), System.Boolean));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.InputText["IsDisabledProperty"], Bridge.box(value, System.Boolean, System.Boolean.toString));
                }
            },
            DefaultTemplateAsXml: {
                get: function () {
                    // System.Windows.Data.Converters.BooleanToCssClassConverter
                    return "<div>   <input type='text'  x:Name = '_inputElement' /></div>";
                }
            },
            _value: {
                get: function () {
                    return this._inputElement._root.val();
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
                System.Windows.Controls.Control.ctor.call(this);
                this.addBeforeConnectToLogicalParent(Bridge.fn.bind(this, function (parent) {
                    this.AttachEvents();
                }));

                this.addAfterTemplateApplied(Bridge.fn.bind(this, function () {
                    this.Class = "ui input";
                }));
            }
        },
        methods: {
            AttachEvents: function () {
                this._inputElement._root.focusout(Bridge.fn.cacheBind(this, this.OnFocusOut));
                this._inputElement._root.keypress(Bridge.fn.cacheBind(this, this.OnKeyPress));
            },
            DisableNonDecimalInputs: function (e) {
                var isDot = e.which === 46;

                if (isDot) {
                    var alreadyContainsDot = System.String.indexOf(((this._value || "") + ""), String.fromCharCode(46)) >= 0;
                    if (alreadyContainsDot) {
                        e.preventDefault();
                    }

                    return;
                }

                this.DisableNonNumericValues(e);
            },
            DisableNonNumericValues: function (e) {
                if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
                    e.preventDefault();
                }
            },
            OnFocusOut: function (e) {
                var val = System.Windows.FrameworkElementExtensions.Val$1(Bridge.global.System.Windows.FrameworkElement, this._inputElement);
                if ((this["AllowOnlyDecimalInputs"] || this["AllowOnlyNumericInputs"]) && System.String.isNullOrEmpty(val)) {
                    return;
                }


                if (this["AllowOnlyDecimalInputs"]) {
                    if (Bridge.referenceEquals((val != null ? val.trim() : null), ".")) {
                        System.Windows.FrameworkElementExtensions.Val(Bridge.global.System.Windows.FrameworkElement, this._inputElement, "");
                        return;
                    }

                }


                this.Text = val;
            },
            OnKeyPress: function (e) {
                !Bridge.staticEquals(this.KeyPress, null) ? this.KeyPress(e) : null;

                if (this["AllowOnlyDecimalInputs"]) {
                    this.DisableNonDecimalInputs(e);
                    return;
                }

                if (this["AllowOnlyNumericInputs"]) {
                    this.DisableNonNumericValues(e);
                }
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

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                TextProperty: null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div InnerHTML = '{Text}' css.display = 'inline-block' />";
                }
            },
            Text: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock.TextProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextBlock.TextProperty, value);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                "IconIsStarProperty": null,
                MaxRateProperty: null,
                RateProperty: null
            },
            ctors: {
                init: function () {
                    this["IconIsStarProperty"] = System.Windows.DependencyProperty.Register$1("IconIsStar", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating, new System.Windows.PropertyMetadata.ctor(Bridge.box(true, System.Boolean, System.Boolean.toString)));
                    this.MaxRateProperty = System.Windows.DependencyProperty.Register$1("MaxRate", System.Nullable$1(System.Int32), Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("data-max-rating"));
                    this.RateProperty = System.Windows.DependencyProperty.Register$1("Rate", System.Nullable$1(System.Int32), Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("data-rating"));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='ui star rating'  data-max-rating = '{MaxRate}' data-rating ='{Rate}'  />";
                }
            },
            "IconIsStar": {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating["IconIsStarProperty"])), System.Boolean, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating["IconIsStarProperty"], Bridge.box(value, System.Boolean, System.Nullable.toStringFn(System.Boolean.toString), System.Nullable.getHashCode));
                }
            },
            MaxRate: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating.MaxRateProperty)), System.Int32, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating.MaxRateProperty, Bridge.box(value, System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                }
            },
            Rate: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating.RateProperty)), System.Int32, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_rating.RateProperty, Bridge.box(value, System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);
                this.addBeforeConnectToLogicalParent(Bridge.fn.bind(this, function (parent) {
                    this._root.rating();
                }));
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.ui_top_attached_tabular_menu", {
        inherits: [System.Windows.Controls.Control],
        fields: {
            _headerContainer: null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div>    <div x:Name ='_headerContainer'  class = 'ui top attached tabular menu' /></div>";
                }
            },
            Tabs: {
                get: function () {
                    return System.Linq.Enumerable.from(this.LogicalChilderen).select(function (tab) {
                            return Bridge.as(tab, Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem);
                        });
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);
                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.OnAfterAddChild));
                this.addBeforeConnectToLogicalParent(Bridge.fn.cacheBind(this, this.OnBeforeConnectToParent));
            }
        },
        methods: {
            AddTab: function (tabItem) {
                this._headerContainer.AddVisualChild(tabItem._headerElement);

                this.AddVisualChild(tabItem._bodyElement);

                tabItem._headerElement._root.click(Bridge.fn.bind(this, function () {
                    this.ActivateTab(tabItem);
                }));
            },
            ActivateTab: function (tabItem) {
                var $t;
                $t = Bridge.getEnumerator(this.Tabs, Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem);
                try {
                    while ($t.moveNext()) {
                        var tab = $t.Current;
                        tab["IsActive"] = false;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                tabItem["IsActive"] = true;
            },
            OnAfterAddChild: function (element) {
                var tabItem = Bridge.as(element, Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem);
                if (tabItem == null) {
                    throw new System.ArgumentException();
                }

                this.AddTab(tabItem);
            },
            OnBeforeConnectToParent: function (parent) {
                this._root.tab();
                if (System.Linq.Enumerable.from(this.Tabs).any()) {
                    this.ActivateTab(System.Linq.Enumerable.from(this.Tabs).firstOrDefault(null, null));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel", {
        inherits: [System.Windows.Controls.Control],
        statics: {
            fields: {
                OrientationProperty: null
            },
            ctors: {
                init: function () {
                    this.OrientationProperty = System.Windows.DependencyProperty.Register$1("Orientation", System.Windows.Controls.Orientation, Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel, new System.Windows.PropertyMetadata.$ctor2(Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel.OnOrientationChanged));
                }
            },
            methods: {
                OnOrientationChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel);
                    me.SetOrientation(System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32)));
                }
            }
        },
        fields: {
            _wrapper: null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div>   <div class='{Class}' />   <div class='{Class}' /></div>";
                }
            },
            Left: {
                get: function () {
                    return this.GetVisualChildAt$1([0, 0]);
                }
            },
            Right: {
                get: function () {
                    return this.GetVisualChildAt$1([0, 1]);
                }
            },
            Orientation: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel.OrientationProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.split_js.SplitPanel.OrientationProperty, Bridge.box(value, System.Windows.Controls.Orientation, System.Enum.toStringFn(System.Windows.Controls.Orientation)));
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);
                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.AfterAddChildElement));
                this.addBeforeConnectToLogicalParent(Bridge.fn.cacheBind(this, this.ReInitializeWrapper));
                this.addBeforeConnectToVisualParent(Bridge.fn.cacheBind(this, this.ReInitializeWrapper));
            }
        },
        methods: {
            AfterAddChildElement: function (element) {
                if (this.LogicalChilderenCount === 1) {
                    this.Left.AddVisualChild(element);
                } else {
                    this.Right.AddVisualChild(element);
                }
            },
            ReInitializeWrapper: function (parent) {
                if (parent === void 0) { parent = null; }
                this._wrapper != null ? this._wrapper.destroy() : null;

                this._wrapper = this.Split();
            },
            SetOrientation: function (orientation) {
                var direction = orientation === System.Windows.Controls.Orientation.Horizontal ? "horizontal" : "vertical";

                this.Class = "split split-" + (direction || "");

                Bridge.CustomUIMarkup.Common.Extensions.Foreach(this._root.children(), Bridge.fn.bind(this, function (c) {
                    Bridge.CustomUIMarkup.Common.Extensions.SetClass(c, this.Class);
                }));

                if (this.LogicalParent != null) {
                    this.ReInitializeWrapper();
                }
            },
            Split: function () {
                // ReSharper disable once UnusedVariable
                var left = this.Left._root.get(0);
                // ReSharper disable once UnusedVariable
                var right = this.Right._root.get(0);

                return Split([ left, right], { sizes:[50,50],  direction:this._direction });
                ;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.Swiper.Slider", {
        inherits: [System.Windows.Controls.Control],
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
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='swiper-container'>    <div class='swiper-wrapper' /></div>";
                }
            },
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
                System.Windows.Controls.Control.ctor.call(this);
                this.addBeforeConnectToLogicalParent(Bridge.fn.cacheBind(this, this.InitWrapper));
                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.CreateSlide));
            }
        },
        methods: {
            CreateSlide: function (element) {
                var item = Bridge.CustomUIMarkup.UI.Builder.Create(Bridge.CustomUIMarkup.Libraries.Swiper.Slider.SwiperItemControl);
                item.Content = element;

                this.GetVisualChildAt(0).AddVisualChild(item);
            },
            InitWrapper: function (parent) {
                // ReSharper disable once UnusedVariable
                var delay = this.Delay;
                // ReSharper disable once UnusedVariable
                var me = this;

                

setTimeout(function(){

    new Swiper(me._root, {
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

    Bridge.define("Bridge.CustomUIMarkup.Libraries.viewerjs.Viewer", {
        inherits: [System.Windows.Controls.Control],
        fields: {
            _wrapper: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Control.ctor.call(this);
                this.addBeforeConnectToLogicalParent(Bridge.fn.cacheBind(this, this.InitWrapper));
                this.addAfterLogicalChildAdd(Bridge.fn.cacheBind(this, this.CreateImage));
            }
        },
        methods: {
            InitDOM: function () {
                this._root = System.Windows.DOM.ul("pictures");
            },
            CreateImage: function (element) {
                var li = new System.Windows.HtmlElement("li");
                li.AddVisualChild(element);
                this.AddVisualChild(li);

                // DOM.li().AppendTo(_root).Append(element._root);
            },
            InitWrapper: function (parent) {
                // ReSharper disable once UnusedVariable
                var root = this._root.get(0);
                // ReSharper disable once UnusedVariable
                var me = this;
                var id = this["Id"];


                var css = "\r\n.pictures {\r\n      margin: 0;\r\n      padding: 0;\r\n      list-style: none;\r\n      max-width: 30rem;\r\n      display:table-cell;\r\n    }\r\n\r\n    .pictures > li {\r\n      float: left;\r\n      width: 33.3%;\r\n      height: 33.3%;\r\n      margin: 0 -1px -1px 0;\r\n      border: 1px solid transparent;\r\n      overflow: hidden;\r\n    }\r\n\r\n    .pictures > li > img {\r\n      width: 100%;\r\n      cursor: -webkit-zoom-in;\r\n      cursor: zoom-in;\r\n    }\r\n";

                

setTimeout(function(){

    var options = {};
    me._wrapper = new Viewer(root, options);





$( '<style> '+css+'</style>' ).appendTo( 'head' );

},0);








            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup_DesignerSamples.AppContainer", {
        inherits: [System.Windows.HtmlElement],
        statics: {
            props: {
                "TestUI": {
                    get: function () {
                        return "\r\n\r\n<div class='ui two row grid' HeightPercent = '100' WidthPercent = '100' >\r\n    <row>\r\n        <column Align='Center'>\r\n             <ComboBox \r\n                ItemsSource = '{Binding Examples}' \r\n                DisplayMemberPath = 'Name'\r\n                SelectedValuePath = 'XmlTemplate' \r\n\t\t        SelectedValue = '{Binding CurrentTemplate}' />\r\n        </column>\r\n    </row>\r\n    \r\n    <row HeightPercent = '100'>\r\n        <UIEditor SourceDataContext='{Inner}'   SourceText = '{CurrentTemplate}'/>\r\n    </row>\r\n        \r\n</div>\r\n\r\n\r\n";
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.HtmlElement.ctor.call(this);

                Bridge.CustomUIMarkup.UI.Builder.LoadComponent(this, Bridge.CustomUIMarkup_DesignerSamples.AppContainer["TestUI"]);
                this.HeightPercent = 100;
            }
        }
    });

    Bridge.define("System.Windows.ContentPresenter", {
        inherits: [System.Windows.HtmlElement]
    });

    Bridge.define("System.Windows.Controls.Primitives.Selector", {
        inherits: [System.Windows.Controls.ItemsControl],
        statics: {
            fields: {
                "SelectedItemProperty": null,
                SelectedValueProperty: null,
                SelectedValuePathProperty: null
            },
            ctors: {
                init: function () {
                    this["SelectedItemProperty"] = System.Windows.DependencyProperty.Register$1("SelectedItem", System.Object, System.Windows.Controls.Primitives.Selector, new System.Windows.PropertyMetadata.ctor(null));
                    this.SelectedValueProperty = System.Windows.DependencyProperty.Register$1("SelectedValue", System.Object, System.Windows.Controls.Primitives.Selector, new System.Windows.PropertyMetadata.ctor(null));
                    this.SelectedValuePathProperty = System.Windows.DependencyProperty.Register$1("SelectedValuePath", System.String, System.Windows.Controls.Primitives.Selector, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            "SelectedItem": {
                get: function () {
                    return this.GetValue$1(System.Windows.Controls.Primitives.Selector["SelectedItemProperty"]);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.Controls.Primitives.Selector["SelectedItemProperty"], value);
                }
            },
            SelectedValue: {
                get: function () {
                    return this.GetValue$1(System.Windows.Controls.Primitives.Selector.SelectedValueProperty);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.Controls.Primitives.Selector.SelectedValueProperty, value);
                }
            },
            SelectedValuePath: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.Controls.Primitives.Selector.SelectedValuePathProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.Controls.Primitives.Selector.SelectedValuePathProperty, value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.ItemsControl.ctor.call(this);
                this.addItemClicked(Bridge.fn.cacheBind(this, this.OnItemClicked));
            }
        },
        methods: {
            OnItemClicked: function (itemDataContext) {
                this["SelectedItem"] = itemDataContext;
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Field", {
        inherits: [System.Windows.ContentControl],
        statics: {
            fields: {
                "IsDisabledProperty": null,
                LabelVisibilityProperty: null,
                ErrorMessageVisibilityProperty: null,
                ErrorMessageProperty: null,
                LabelProperty: null
            },
            ctors: {
                init: function () {
                    this["IsDisabledProperty"] = System.Windows.DependencyProperty.Register$1("IsDisabled", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field, new System.Windows.PropertyMetadata.ctor(Bridge.getDefaultValue(System.Boolean)));
                    this.LabelVisibilityProperty = System.Windows.DependencyProperty.Register$1("LabelVisibility", System.Windows.Visibility, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field, new System.Windows.PropertyMetadata.ctor(Bridge.box(System.Windows.Visibility.Collapsed, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility))));
                    this.ErrorMessageVisibilityProperty = System.Windows.DependencyProperty.Register$1("ErrorMessageVisibility", System.Windows.Visibility, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field, new System.Windows.PropertyMetadata.ctor(Bridge.box(System.Windows.Visibility.Collapsed, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility))));
                    this.ErrorMessageProperty = System.Windows.DependencyProperty.Register("ErrorMessage", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field);
                    this.LabelProperty = System.Windows.DependencyProperty.Register("Label", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.Field);
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class = 'field' on.click = 'ClearErrorMessage' >   <label Visibility = '{LabelVisibility}'>{Label}</label>   <ContentPresenter />   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div></div>";
                }
            },
            "IsDisabled": {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field["IsDisabledProperty"])), System.Boolean));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field["IsDisabledProperty"], Bridge.box(value, System.Boolean, System.Boolean.toString));
                }
            },
            LabelVisibility: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.LabelVisibilityProperty)), System.Byte));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.LabelVisibilityProperty, Bridge.box(value, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility)));
                }
            },
            ErrorMessageVisibility: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.ErrorMessageVisibilityProperty)), System.Byte));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.ErrorMessageVisibilityProperty, Bridge.box(value, System.Windows.Visibility, System.Enum.toStringFn(System.Windows.Visibility)));
                }
            },
            ErrorMessage: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.ErrorMessageProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.ErrorMessageProperty, value);
                }
            },
            Label: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.LabelProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Field.LabelProperty, value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.ContentControl.ctor.call(this);
                System.ComponentModel.Extensions.OnPropertyChanged(this, "ErrorMessage", Bridge.fn.bind(this, function () {
                    if (this.ErrorMessage == null) {
                        this.Class = "field";
                        this.ErrorMessageVisibility = System.Windows.Visibility.Collapsed;
                        return;
                    }

                    this.Class = "field error";
                    this.ErrorMessageVisibility = System.Windows.Visibility.Visible;
                }));

                System.ComponentModel.Extensions.OnPropertyChanged(this, "Label", Bridge.fn.bind(this, function () {
                    if (this.Label == null) {
                        this.LabelVisibility = System.Windows.Visibility.Collapsed;
                        return;
                    }

                    this.LabelVisibility = System.Windows.Visibility.Visible;
                }));
            }
        },
        methods: {
            ClearErrorMessage: function () {
                if (this.ErrorMessage != null) {
                    this.ErrorMessage = null;
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem", {
        inherits: [System.Windows.ContentControl],
        statics: {
            fields: {
                HeaderProperty: null,
                "IsActiveProperty": null
            },
            ctors: {
                init: function () {
                    this.HeaderProperty = System.Windows.DependencyProperty.Register("Header", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem);
                    this["IsActiveProperty"] = System.Windows.DependencyProperty.Register$1("IsActive", System.Boolean, Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem, new System.Windows.PropertyMetadata.$ctor1(Bridge.getDefaultValue(System.Boolean), Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem.OnIsActiveChanged));
                }
            },
            methods: {
                OnIsActiveChanged: function (d, e) {
                    var tabItem = Bridge.cast(d, Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem);

                    if (System.Extensions.ToBoolean(e.NewValue)) {
                        tabItem._headerElement.Class = "item active";
                        tabItem._bodyElement.Class = "ui bottom attached tab segment active";
                    } else {
                        tabItem._headerElement.Class = "item";
                        tabItem._bodyElement.Class = "ui bottom attached tab segment";
                    }
                }
            }
        },
        fields: {
            _headerElement: null,
            _bodyElement: null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div>    <a x:Name = '_headerElement' class = 'item' data-tab='{Id}' >{Header}</a>    <div x:Name = '_BodyElement' class = 'ui bottom attached tab segment' data-tab = '{Id}' >        <ContentPresenter />    </div></div>";
                }
            },
            Header: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem.HeaderProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem.HeaderProperty, value);
                }
            },
            "IsActive": {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem["IsActiveProperty"])), System.Boolean));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TabItem["IsActiveProperty"], Bridge.box(value, System.Boolean, System.Boolean.toString));
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
                    this.RowsProperty = System.Windows.DependencyProperty.Register$1("Rows", System.Int32, Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea, new System.Windows.PropertyMetadata.ctor(Bridge.box(2, System.Int32)));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div>   <textarea rows='{Rows}' x:Name = '_inputElement' /></div>";
                }
            },
            Rows: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea.RowsProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.TextArea.RowsProperty, Bridge.box(value, System.Int32));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.Swiper.Slider.SwiperItemControl", {
        inherits: [System.Windows.ContentControl],
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='swiper-slide'>    <ContentPresenter /></div>";
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

    Bridge.define("System.Windows.Controls.UserControl", {
        inherits: [System.Windows.ContentControl],
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div HeightPercent = '100'      WidthPercent  = '100' >    <ContentPresenter HeightPercent = '100' WidthPercent  = '100' /></div>";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo", {
        inherits: [System.Windows.Controls.Primitives.Selector],
        statics: {
            fields: {
                DefaultTextProperty: null
            },
            ctors: {
                init: function () {
                    this.DefaultTextProperty = System.Windows.DependencyProperty.Register$1("DefaultText", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        fields: {
            _menu: null,
            _hidden: null,
            _wrapper: null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class = 'ui selection dropdown' WidthPercent = '100' >    <input type = 'hidden' value='{SelectedValue}'  x.Name = '_hidden' />    <i class = 'dropdown icon' />    <div class = 'default text' >{DefaultText}</div>    <div class = 'menu' x.Name='_menu' /></div>";
                }
            },
            DefaultText: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo.DefaultTextProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.Combo.DefaultTextProperty, value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Primitives.Selector.ctor.call(this);
                this.addBeforeConnectToLogicalParent(Bridge.fn.bind(this, function (parent) {
                    this._wrapper = this._root.dropdown();
                }));

                System.ComponentModel.Extensions.OnPropertyChanged(this, "DisplayMemberPath", Bridge.fn.cacheBind(this, this.InitializeItemTemplate));
                System.ComponentModel.Extensions.OnPropertyChanged(this, "SelectedValuePath", Bridge.fn.cacheBind(this, this.InitializeItemTemplate));

                System.ComponentModel.Extensions.OnPropertyChanged(this, "DisplayMemberPath", Bridge.fn.cacheBind(this, this.Render));
                System.ComponentModel.Extensions.OnPropertyChanged(this, "SelectedValuePath", Bridge.fn.cacheBind(this, this.Render));
                System.ComponentModel.Extensions.OnPropertyChanged(this, "ItemsSource", Bridge.fn.cacheBind(this, this.Render));

                System.ComponentModel.Extensions.OnPropertyChanged(this, "ItemsSource", Bridge.fn.bind(this, function () {
                    this.OnPropertyChanged("SelectedValue");
                }));

                System.ComponentModel.Extensions.OnPropertyChanged(this, "SelectedValue", Bridge.fn.cacheBind(this, this.InitSelectedItemByUsingSelectedValue));
                System.ComponentModel.Extensions.OnPropertyChanged(this, "SelectedValue", Bridge.fn.bind(this, function () {
                    var el = this._root;
                    var selectedValue = this.SelectedValue;

                    el.dropdown('set selected',selectedValue);
                    el.dropdown('refresh');


                }));

            }
        },
        methods: {
            InitSelectedItemByUsingSelectedValue: function () {
                var $t;
                var enumerable = Bridge.as(this["ItemsSource"], System.Collections.IEnumerable);
                if (enumerable == null) {
                    return;
                }

                var selectedValuePath = this.SelectedValuePath;
                if (selectedValuePath == null) {
                    return;
                }

                var selectedValue = this.SelectedValue;


                $t = Bridge.getEnumerator(enumerable);
                try {
                    while ($t.moveNext()) {
                        var data = $t.Current;
                        if (data == null) {
                            continue;
                        }

                        var propertyPath = new System.Windows.PropertyPath(selectedValuePath);

                        propertyPath.Walk(data);

                        var propertyValue = propertyPath.GetPropertyValue();

                        if ((selectedValue == null && propertyValue == null) || System.Nullable.eq((selectedValue != null ? Bridge.equals(selectedValue, propertyValue) : null), true)) {
                            this["SelectedItem"] = data;
                            return;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            ConnectItem: function (item) {
                this._menu.AddLogicalChild(item);
            },
            ClearItems: function () {
                this._menu.ClearVisualChilds();
            },
            Render: function () {
                if (this.DisplayMemberPath == null || this.SelectedValuePath == null) {
                    return;
                }

                System.Windows.Controls.Primitives.Selector.prototype.Render.call(this);
            },
            InitializeItemTemplate: function () {
                this["ItemTemplate"] = System.Windows.Template.CreateFromXml("<div class='item' data-value='{" + (this.SelectedValuePath || "") + "}' InnerHTML='{" + (this.DisplayMemberPath || "") + "}' />");
            }
        }
    });

    Bridge.define("System.Windows.Controls.Primitives.MultiSelector", {
        inherits: [System.Windows.Controls.Primitives.Selector]
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDate", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.Field],
        statics: {
            fields: {
                ValueProperty: null
            },
            ctors: {
                init: function () {
                    this.ValueProperty = System.Windows.DependencyProperty.Register$1("Value", System.Nullable$1(System.DateTime), Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDate, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='field' on.click = 'ClearErrorMessage' >   <label Visibility = '{LabelVisibility}'>{Label}</label>   <ContentPresenter>       <DatePicker Value = '{Value}' IsDisabled='{IsDisabled}' />   </ContentPresenter>   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div></div>";
                }
            },
            Value: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDate.ValueProperty)), System.DateTime, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDate.ValueProperty, Bridge.box(value, System.DateTime, System.Nullable.toStringFn(System.DateTime.format), System.Nullable.getHashCode));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDecimal", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.Field],
        statics: {
            fields: {
                ValueProperty: null
            },
            ctors: {
                init: function () {
                    this.ValueProperty = System.Windows.DependencyProperty.Register$1("Value", System.Nullable$1(System.Decimal), Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDecimal, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='field' on.click = 'ClearErrorMessage' >   <label Visibility = '{LabelVisibility}'>{Label}</label>   <ContentPresenter>       <textBox Text = '{Value}' AllowOnlyDecimalInputs = 'True' />   </ContentPresenter>   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div></div>";
                }
            },
            Value: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDecimal.ValueProperty)), System.Decimal, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldDecimal.ValueProperty, value);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldInt32", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.Field],
        statics: {
            fields: {
                ValueProperty: null
            },
            ctors: {
                init: function () {
                    this.ValueProperty = System.Windows.DependencyProperty.Register$1("Value", System.Nullable$1(System.Int32), Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldInt32, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='field' on.click = 'ClearErrorMessage' >   <label Visibility = '{LabelVisibility}'>{Label}</label>   <ContentPresenter>       <textBox Text = '{Value}' AllowOnlyNumericInputs = 'True' />   </ContentPresenter>   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div></div>";
                }
            },
            Value: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldInt32.ValueProperty)), System.Int32, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldInt32.ValueProperty, Bridge.box(value, System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldString", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.Field],
        statics: {
            fields: {
                ValueProperty: null
            },
            ctors: {
                init: function () {
                    this.ValueProperty = System.Windows.DependencyProperty.Register$1("Value", System.String, Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldString, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='field' on.click = 'ClearErrorMessage' >   <label Visibility = '{LabelVisibility}'>{Label}</label>   <ContentPresenter>       <textBox Text = '{Value}' IsDisabled='{IsDisabled}'  />   </ContentPresenter>   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div></div>";
                }
            },
            Value: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldString.ValueProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldString.ValueProperty, value);
                }
            }
        }
    });

    Bridge.define("System.Windows.Controls.ListBox", {
        inherits: [System.Windows.Controls.Primitives.Selector]
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGrid", {
        inherits: [System.Windows.Controls.Primitives.MultiSelector],
        statics: {
            methods: {
                Wrap: function (me, root) {
                    

setTimeout(function()
{
    var options = 
    {
        destroy:true,
        language:dataTables_language   
    };

    me._wrapper = root.DataTable(options); 

},0) ;
                }
            }
        },
        fields: {
            _selectedRow: null,
            _thead: null,
            _thead_first_tr: null,
            _tbody: null,
            _wrapper: null,
            SelectedRowBackground: null,
            Columns: null,
            _columnNames: null
        },
        props: {
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div  />";
                }
            },
            ColumnNames: {
                get: function () {
                    return this._columnNames;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(this._columnNames, value)) {
                        this._columnNames = value;
                        this.OnPropertyChanged("ColumnNames");
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this.SelectedRowBackground = "#27ae60";
                this.Columns = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn)).ctor();
            },
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.Primitives.MultiSelector.ctor.call(this);
                this.addBeforeConnectToLogicalParent(Bridge.fn.cacheBind(this, this.OnBeforeConnectToLogicalParent$1));

                System.ComponentModel.Extensions.OnPropertyChanged(this, "ColumnNames", Bridge.fn.cacheBind(this, this.ParseColumnNames));

                this.addAfterConnectToLogicalParent(Bridge.fn.bind(this, function () {
                    System.ComponentModel.Extensions.OnPropertyChanged(this, "ItemsSource", Bridge.fn.cacheBind(this, this.ReRender));
                }));


            }
        },
        methods: {
            MarkSelectedRow: function (element) {
                this._selectedRow != null ? this._selectedRow._root.css("background", "") : null;

                element.Root.css("background", this.SelectedRowBackground);

                this._selectedRow = element;
            },
            OnBeforeConnectToLogicalParent$1: function (arg) {
                this.ReRender();
            },
            ParseColumnNames: function () {
                var $t, $t1;
                System.Array.clear(this.Columns, Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn);

                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(System.String.split(this.ColumnNames, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (x) {
                        return !System.String.isNullOrWhiteSpace(x);
                    }));
                try {
                    while ($t.moveNext()) {
                        var value1 = $t.Current;
                        var arr = System.Linq.Enumerable.from(System.String.split(value1, [58].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (x) {
                                return !System.String.isNullOrWhiteSpace(x);
                            }).toArray(System.String);
                        System.Array.add(this.Columns, ($t1 = new Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn(), $t1.Name = ((arr[System.Array.index(0, arr)] || "") + "").trim(), $t1.Label = ((arr[System.Array.index(1, arr)] || "") + "").trim(), $t1), Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            ReRender: function () {
                var $t, $t1, $t2;


                if (this["ItemsSource"] == null) {
                    return;
                }

                var list = Bridge.as(this["ItemsSource"], System.Collections.IList);
                if (list == null) {
                    throw new System.ArgumentException("MustbeList:ItemsSource@ItemsSource.Type:" + ((($t = this["ItemsSource"]) != null ? Bridge.Reflection.getTypeFullName(Bridge.getType($t)) : null) || ""));
                }

                this.ClearVisualChilds();
                this.ClearLogicalChilds();

                var table = new System.Windows.HtmlElement("table", "ui celled table");

                this.AddLogicalChild(table);

                table.AddVisualChild((this._thead = new System.Windows.HtmlElement("thead")));

                this._thead.AddVisualChild((this._thead_first_tr = new System.Windows.HtmlElement("tr")));

                $t1 = Bridge.getEnumerator(this.Columns, Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn);
                try {
                    while ($t1.moveNext()) {
                        var columnInfo = $t1.Current;
                        this._thead_first_tr.AddVisualChild(columnInfo);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$dispose();
                    }
                }
                table.AddVisualChild((this._tbody = new System.Windows.HtmlElement("tbody")));

                var len = System.Array.getCount(list);
                for (var i = 0; i < len; i = (i + 1) | 0) {
                    var itemData = { v : System.Array.getItem(list, i) };

                    var tr = { v : new System.Windows.HtmlElement("tr") };

                    $t2 = Bridge.getEnumerator(this.Columns, Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridColumn);
                    try {
                        while ($t2.moveNext()) {
                            var columnInfo1 = $t2.Current;
                            var td = new System.Windows.HtmlElement("td");



                            if (columnInfo1.EditorType === Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridCellEditorType.Text) {
                                var propertyPath = new System.Windows.PropertyPath(columnInfo1.Name);
                                propertyPath.Walk(itemData.v);
                                var cellValue = propertyPath.GetPropertyValue();

                                td["InnerHTML"] = cellValue != null ? cellValue.toString() : null;
                            } else {
                                throw new System.NotImplementedException(System.Enum.toString(Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGridCellEditorType, columnInfo1.EditorType));
                            }

                            //var bindingInfo = new BindingInfo
                            //{
                            //    Source = itemData,
                            //    SourcePath = columnInfo.Name,
                            //    BindingMode = BindingMode.OneWay,
                            //    Target = td,
                            //    TargetPath = nameof(td.InnerHTML)
                            //};
                            //bindingInfo.Connect();

                            tr.v.AddLogicalChild(td);
                        }
                    } finally {
                        if (Bridge.is($t2, System.IDisposable)) {
                            $t2.System$IDisposable$dispose();
                        }
                    }
                    this._tbody.AddLogicalChild(tr.v);

                    tr.v.On("click", (function ($me, tr) {
                        return Bridge.fn.bind($me, function () {
                            this.MarkSelectedRow(tr.v);
                        });
                    })(this, tr));

                    tr.v.On("click", (function ($me, itemData) {
                        return Bridge.fn.bind($me, function () {
                            this.RaiseEvent_ItemClicked(itemData.v);
                        });
                    })(this, itemData));


                }


                var me = this;

                Bridge.CustomUIMarkup.Libraries.SemanticUI.DataGrid.Wrap(me, table._root);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldTextArea", {
        inherits: [Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldString],
        statics: {
            fields: {
                RowsProperty: null
            },
            ctors: {
                init: function () {
                    this.RowsProperty = System.Windows.DependencyProperty.Register$1("Rows", System.Nullable$1(System.Int32), Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldTextArea, new System.Windows.PropertyMetadata.ctor(null));
                }
            }
        },
        props: {
            Rows: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldTextArea.RowsProperty)), System.Int32, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.Libraries.SemanticUI.FieldTextArea.RowsProperty, Bridge.box(value, System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                }
            },
            DefaultTemplateAsXml: {
                get: function () {
                    return "<div class='field' on.click = 'ClearErrorMessage' >   <label Visibility = '{LabelVisibility}'>{Label}</label>   <ContentPresenter>       <ui-input-textarea  Text = '{Value}' IsDisabled='{IsDisabled}' Rows='{Rows}' />   </ContentPresenter>   <div class = 'ui red pointing label transition' Visibility = '{ErrorMessageVisibility}'> {ErrorMessage} </div></div>";
                }
            }
        }
    });
});
