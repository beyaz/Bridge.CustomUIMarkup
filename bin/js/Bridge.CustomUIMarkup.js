/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.5.0
 */
Bridge.assembly("Bridge.CustomUIMarkup", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.CustomUIMarkup.CodeMirror.AttributeInfo", {
        fields: {
            Name: null,
            Values: null
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.CodeMirror.SchemaInfo", {
        statics: {
            methods: {
                ForceToLoadDependencyProperties: function (type) {
                    Bridge.createInstance(type);
                },
                CreateFrom: function (intellisenseInfos) {
                    var $t, $t1, $t2;
                    var schemaInfo = ($t = new Bridge.CustomUIMarkup.CodeMirror.SchemaInfo(), $t.Tags = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.CodeMirror.TagInfo)).ctor(), $t);

                    $t = Bridge.getEnumerator(intellisenseInfos, Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo);
                    try {
                        while ($t.moveNext()) {
                            var pair = $t.Current;
                            var name = pair.TagName;
                            var type = pair.Type;

                            Bridge.CustomUIMarkup.CodeMirror.SchemaInfo.ForceToLoadDependencyProperties(type);

                            var tag = ($t1 = new Bridge.CustomUIMarkup.CodeMirror.TagInfo(), $t1.Name = name, $t1.Attributes = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.CodeMirror.AttributeInfo)).ctor(), $t1);
                            var dependencyProperties = System.Windows.DependencyProperty.GetAllProperties(type);
                            $t1 = Bridge.getEnumerator(dependencyProperties, System.Windows.DependencyProperty);
                            try {
                                while ($t1.moveNext()) {
                                    var dp = $t1.Current;
                                    var attributeInfo = ($t2 = new Bridge.CustomUIMarkup.CodeMirror.AttributeInfo(), $t2.Name = dp.Name, $t2);
                                    if (Bridge.referenceEquals(dp.PropertyType, System.Boolean)) {
                                        attributeInfo.Values = System.Array.init(["true", "false"], System.String);
                                    }

                                    if (Bridge.Reflection.isEnum(dp.PropertyType)) {
                                        attributeInfo.Values = System.Enum.getNames(dp.PropertyType);
                                    }

                                    System.Array.add(tag.Attributes, attributeInfo, Bridge.CustomUIMarkup.CodeMirror.AttributeInfo);
                                }
                            } finally {
                                if (Bridge.is($t1, System.IDisposable)) {
                                    $t1.System$IDisposable$dispose();
                                }
                            }if (pair.ChildrenTags != null) {
                                tag.ChildrenTags = pair.ChildrenTags;
                            }
                            System.Array.add(schemaInfo.Tags, tag, Bridge.CustomUIMarkup.CodeMirror.TagInfo);
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

                $t = Bridge.getEnumerator(this.Tags, Bridge.CustomUIMarkup.CodeMirror.TagInfo);
                try {
                    while ($t.moveNext()) {
                        var tag = $t.Current;
                        var attributes = { };

                        $t1 = Bridge.getEnumerator(tag.Attributes, Bridge.CustomUIMarkup.CodeMirror.AttributeInfo);
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

    Bridge.define("Bridge.CustomUIMarkup.CodeMirror.TagInfo", {
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

    Bridge.define("Bridge.CustomUIMarkup.Common.DOM", {
        statics: {
            methods: {
                a: function (className) {
                    return $(document.createElement("a")).addClass(className);
                },
                button: function (className) {
                    return $(document.createElement("button")).addClass(className);
                },
                div: function (className) {
                    if (className === void 0) { className = null; }
                    return $(document.createElement("div")).addClass(className);
                },
                h1: function (className) {
                    if (className === void 0) { className = null; }
                    return $(document.createElement("h1")).addClass(className);
                },
                h2: function (className) {
                    if (className === void 0) { className = null; }
                    return $(document.createElement("h2")).addClass(className);
                },
                h3: function (className) {
                    if (className === void 0) { className = null; }
                    return $(document.createElement("h3")).addClass(className);
                },
                i: function (className) {
                    if (className === void 0) { className = null; }
                    var el = $(document.createElement("i"));
                    if (className != null) {
                        el.addClass(className);
                    }

                    return el;
                },
                input: function (type, className) {
                    if (className === void 0) { className = null; }
                    return $(document.createElement("input")).attr("type", type).addClass(className);
                },
                label: function (className) {
                    if (className === void 0) { className = null; }
                    return $(document.createElement("label")).addClass(className);
                },
                textarea: function (className) {
                    if (className === void 0) { className = null; }
                    return $(document.createElement("textarea")).addClass(className);
                },
                img: function () {
                    return $(document.createElement("img"));
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
            fields: {
                JsDirectory: null,
                CssDirectory: null,
                Map: null
            },
            ctors: {
                init: function () {
                    this.JsDirectory = "Scripts/";
                    this.CssDirectory = "css/";
                    this.Map = { };
                }
            },
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

    Bridge.define("Bridge.CustomUIMarkup.DesignerSamples.App", {
        statics: {
            props: {
                "TestUI": {
                    get: function () {
                        return "\r\n\r\n<ui.container>\r\n    \r\n    <ComboBox \r\n            ItemsSource = '{Binding Examples}' \r\n            DisplayMemberPath = 'Name'\r\n            SelectedValuePath = 'XmlTemplate' \r\n\t\t    SelectedValue = '{Binding CurrentTemplate}' />\r\n        \r\n    <UIEditor SourceText = '{CurrentTemplate}'  />\r\n        \r\n</ui.container>\r\n\r\n\r\n";
                    }
                }
            },
            methods: {
                Init: function () {
                    $(function () {
                            var $t;
                            Bridge.CustomUIMarkup.Common.ScriptLoader.LoadCssFile(Bridge.CustomUIMarkup.SemanticUI.VersionInfo.CssFile);
                            Bridge.CustomUIMarkup.Common.ScriptLoader.LoadCssFiles(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.CssFiles);
                            Bridge.CustomUIMarkup.Common.ScriptLoader.LoadCssFiles(Bridge.CustomUIMarkup.jssor.Carousel.CssFiles);

                            var scripts = new (System.Collections.Generic.List$1(System.String)).ctor();
                            scripts.addRange(Bridge.CustomUIMarkup.SemanticUI.VersionInfo.Scripts);
                            scripts.addRange(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.Scripts);
                            scripts.addRange(Bridge.CustomUIMarkup.jssor.Carousel.JsFiles);

                            ($t = new Bridge.CustomUIMarkup.Common.ScriptLoader(), $t.Scripts = scripts, $t.OnLoacCompleted = Bridge.CustomUIMarkup.DesignerSamples.App.RenderUIEditor, $t).Load();
                        });
                },
                RenderUIEditor: function () {
                    var $t;
                    var builder = ($t = new Bridge.CustomUIMarkup.SemanticUI.Builder(), $t.DataContext = new Bridge.CustomUIMarkup.DesignerSamples.ExampleDataContext(), $t.XmlString = Bridge.CustomUIMarkup.DesignerSamples.App["TestUI"], $t);

                    var element = Bridge.cast(builder.Build(), System.Windows.FrameworkElement);

                    element.Root.appendTo(document.body);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Align", {
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

    Bridge.define("Bridge.CustomUIMarkup.UI.Design.Builder", {
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
        methods: {
            Build: function () {
                var instance = null;

                var rootNode = (this._rootNode = Bridge.CustomUIMarkup.UI.Design.Builder.GetRootNode(this.XmlString));

                instance = this.BuildNode(rootNode);

                return instance;
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

                var frameworkElement = Bridge.as(instance, System.Windows.FrameworkElement);
                if (frameworkElement != null) {
                    frameworkElement.DataContext = this.DataContext;
                    frameworkElement.InitDOM();
                    Bridge.Reflection.midel(Bridge.Reflection.getMembers(Bridge.getType(frameworkElement), 8, 36 | 256, "AfterInitDOM"), frameworkElement)(null);
                }

                $t = Bridge.getEnumerator(xmlNode.attributes);
                try {
                    while ($t.moveNext()) {
                        var nodeAttribute = $t.Current;
                        this.ProcessAttribute(instance, nodeAttribute.nodeName, nodeAttribute.nodeValue);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                $t1 = Bridge.getEnumerator(xmlNode.childNodes);
                try {
                    while ($t1.moveNext()) {
                        var childNode = $t1.Current;
                        if (childNode.nodeType === 8) {
                            continue;
                        }

                        if (childNode.nodeType === 3) {
                            var html = $(childNode).text();
                            if (System.String.isNullOrWhiteSpace(html)) {
                                continue;
                            }

                            Bridge.cast(instance, System.Windows.FrameworkElement)["InnerHTML"] = html;
                            continue;
                        }

                        var subControl = this.BuildNode(childNode);

                        var el = Bridge.cast(subControl, System.Windows.FrameworkElement);

                        var iaddChild = Bridge.as(instance, System.Windows.Markup.IAddChild);

                        if (iaddChild != null) {
                            iaddChild.System$Windows$Markup$IAddChild$Add(el);
                            continue;
                        }

                        throw new System.ArgumentException(Bridge.Reflection.getTypeFullName(Bridge.getType(subControl)));
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$dispose();
                    }
                }
                return instance;
            },
            CreateInstance: function (xmlNode) {
                var tag = xmlNode.nodeName.toUpperCase();

                var controlType = this.CreateType(tag);

                if (controlType == null) {
                    if (xmlNode.nodeName.length <= 3) {
                        return new System.Windows.FrameworkElement();
                    }

                    throw new System.ArgumentException((System.String.format("NotRecognizedTag:", null) || "") + (tag || ""));
                }

                return Bridge.createInstance(controlType);
            },
            ProcessAttribute: function (instance, name, value) {
                if (Bridge.referenceEquals(name, "class")) {
                    name = "Class";
                }

                var fe = Bridge.as(instance, System.Windows.FrameworkElement);

                var bi = System.Windows.Data.BindingInfo.TryParseExpression(value);
                if (bi != null) {
                    bi.Source = this.DataContext;
                    bi.Target = instance;
                    bi.TargetPropertyName = name;

                    bi.Connect();

                    return;
                }

                var targetProperty = System.ComponentModel.ReflectionHelper.FindProperty(instance, name);
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

                    var methodInfo = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 8, 284, value);

                    fe != null ? fe.On(eventName, Bridge.fn.bind(this, function () {
                            Bridge.Reflection.midel(methodInfo, Bridge.unbox(this.Caller))(null);
                        })) : null;
                    return;
                }

                if (Bridge.referenceEquals(name, "x.Name")) {
                    var fi = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 4, 284, value);

                    Bridge.Reflection.fieldAccess(fi, Bridge.unbox(this.Caller), Bridge.unbox(instance));
                    return;
                }

                var instanceAsBag = Bridge.as(instance, System.ComponentModel.Bag);
                if (instanceAsBag != null) {
                    instanceAsBag.SetValue(name, value);
                    return;
                }

                throw new System.MissingMemberException(name);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.IconType", {
        $kind: "enum",
        statics: {
            fields: {
                Add_to_Calendar: 0,
                Map: 1,
                Delete_Calendar: 2,
                Marker: 3,
                Setting: 4,
                Check_Circle_Outline: 5
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.NumberToWord", {
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
                    return Bridge.CustomUIMarkup.SemanticUI.NumberToWord.unitsMap[System.Array.index(value, Bridge.CustomUIMarkup.SemanticUI.NumberToWord.unitsMap)];
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Size", {
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.VersionInfo", {
        statics: {
            props: {
                CssFile: {
                    get: function () {
                        return "https://cdn.jsdelivr.net/npm/semantic-ui@2.2.13/dist/semantic.css";
                    }
                },
                Scripts: {
                    get: function () {
                        return System.Array.init(["https://cdn.jsdelivr.net/npm/semantic-ui@2.2.13/dist/semantic.js"], System.String);
                    }
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.Design.Binder", {
        statics: {
            methods: {
                TryParseExpression: function (value) {
                    return System.Windows.Data.HTMLBindingInfo.TryParseExpression(value);
                }
            }
        },
        fields: {
            BinderEventAttributeResolver: null,
            Caller: null,
            DataContext: null,
            TemplateQuery: null
        },
        props: {
            TemplateHTML: {
                set: function (value) {
                    this.TemplateQuery = $($.parseHTML(value));
                }
            }
        },
        ctors: {
            init: function () {
                this.BinderEventAttributeResolver = new Bridge.CustomUIMarkup.UI.Design.BinderEventAttributeResolver();
            }
        },
        methods: {
            Process: function () {
                this.TemplateQuery.each(Bridge.fn.bind(this, function (index, element) {
                    var $t;
                    if (element.nodeType === 3) {
                        if (Bridge.CustomUIMarkup.UI.Design.Binder.TryParseExpression(element.innerHTML) != null) {
                            this.ProcessElement(element);
                        }
                        return;
                    }

                    this.ProcessElement(element);

                    if (Bridge.CustomUIMarkup.Common.Extensions.GetElementsByTagNameIsNotSupporting(element)) {
                        return;
                    }

                    $t = Bridge.getEnumerator(element.getElementsByTagName("*"));
                    try {
                        while ($t.moveNext()) {
                            var htmlElement = $t.Current;
                            this.ProcessElement(htmlElement);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}));
            },
            ProcessElement: function (element) {
                var $t;
                $t = Bridge.getEnumerator(element.attributes);
                try {
                    while ($t.moveNext()) {
                        var attribute = $t.Current;
                        var attributeName = attribute.nodeName;
                        if (this.BinderEventAttributeResolver.IsEventAttribute(attributeName)) {
                            this.ProcessElementPropertyForEvents(element, attribute.nodeName, this.BinderEventAttributeResolver.GetjQueryEventName(attributeName));
                            continue;
                        }
                        this.ProcessElementProperty(element, attribute.nodeName);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                this.ProcessElementPropertyForHtmlContent(element);
            },
            ProcessElementProperty: function (element, propertyName) {
                var value = element.getAttribute(propertyName);

                var info = Bridge.CustomUIMarkup.UI.Design.Binder.TryParseExpression(value);

                if (info == null) {
                    return;
                }

                info.Source = this.DataContext;
                info.Target$1 = $(element);
                info.TargetPropertyName = propertyName;

                info.Connect();
            },
            ProcessElementPropertyForEvents: function (element, attiributeName, jQueryEventName) {
                var value = element.getAttribute(attiributeName);

                var info = Bridge.CustomUIMarkup.UI.Design.Binder.TryParseExpression(value);

                if (info == null) {
                    return;
                }

                var mi = Bridge.Reflection.getMembers(Bridge.getType(this.Caller), 8, 284, info.SourcePath);
                if (mi == null) {
                    throw new System.ArgumentException(info.SourcePath);
                }

                if (Bridge.referenceEquals(jQueryEventName, "click") && Bridge.referenceEquals(System.Linq.Enumerable.from((mi.p || [])).firstOrDefault(null, null), jQuery.Event)) {
                    $(element).click(Bridge.fn.bind(this, function (mouseEvent) {
                        Bridge.Reflection.midel(mi, Bridge.unbox(this.Caller))(mouseEvent);
                    }));
                } else {
                    if ((mi.p || []).length !== 0) {
                        throw new System.ArgumentException(info.SourcePath);
                    }
                    $(element).on(jQueryEventName, Bridge.fn.bind(this, function () {
                        Bridge.Reflection.midel(mi, Bridge.unbox(this.Caller))(null);
                    }));
                }
            },
            ProcessElementPropertyForHtmlContent: function (element) {
                var value = $(element).html();

                var info = Bridge.CustomUIMarkup.UI.Design.Binder.TryParseExpression(value);

                if (info == null) {
                    return;
                }

                info.Source = this.DataContext;
                info.Target$1 = $(element);
                info["UpdateOnlyInnerHTML"] = true;

                info.Connect();
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.Design.BinderEventAttributeResolver", {
        statics: {
            fields: {
                EventMap: null
            },
            ctors: {
                init: function () {
                    this.EventMap = function (_o1) {
                            _o1.add("CLICK", "click");
                            return _o1;
                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());
                }
            }
        },
        methods: {
            GetjQueryEventName: function (attributeName) {
                return Bridge.CustomUIMarkup.UI.Design.BinderEventAttributeResolver.EventMap.get(attributeName.toUpperCase());
            },
            IsEventAttribute: function (attributeName) {
                return Bridge.CustomUIMarkup.UI.Design.BinderEventAttributeResolver.EventMap.containsKey(attributeName.toUpperCase());
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo", {
        fields: {
            ChildrenTags: null,
            TagName: null,
            Type: null
        },
        ctors: {
            ctor: function (tagName, type) {
                this.$initialize();
                if (tagName == null) {
                    throw new System.ArgumentNullException("tagName");
                }
                if (type == null) {
                    throw new System.ArgumentNullException("type");
                }

                this.TagName = tagName;
                this.Type = type;
            }
        }
    });

    Bridge.define("Bridge.jQuery2.Extensions", {
        statics: {
            methods: {
                Css_display_Inline_Block: function (query) {
                    query.css("display", "inline-block");

                    return query;
                },
                Css_float_Left: function (query) {
                    query.css("float", "left");

                    return query;
                },
                Css_width: function (query, value) {
                    query.css("width", value);

                    return query;
                },
                Css_width_max: function (query) {
                    query.css("width", "100%");

                    return query;
                },
                Css_height_max: function (query) {
                    query.css("height", "100%");

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

                    var text = value.substr(1, ((value.length - 2) | 0));

                    text = System.Extensions.RemoveFromStart(text, "Binding ");

                    return ($t = new System.Windows.Data.BindingInfo(), $t.SourcePath = text, $t);
                }
            }
        },
        fields: {
            BindingMode: 0,
            Source: null,
            Path: null,
            Target: null,
            TargetPropertyName: null
        },
        props: {
            SourcePath: {
                get: function () {
                    var $t;
                    return ($t = this.Path) != null ? $t.Path : null;
                },
                set: function (value) {
                    this.Path = new System.Windows.PropertyPath(value);
                }
            },
            TargetValue: {
                get: function () {
                    return Bridge.Reflection.midel(Bridge.Reflection.getMembers(Bridge.getType(this.Target), 16, 284, this.TargetPropertyName).g, Bridge.unbox(this.Target))();
                }
            }
        },
        methods: {
            Connect: function () {
                if (this.TargetPropertyName != null) {
                    var eventInfo = System.ComponentModel.ReflectionHelper.FindEvent(this.Target, this.TargetPropertyName);
                    if (eventInfo != null) {
                        var methodInfo = Bridge.Reflection.getMembers(Bridge.getType(this.Source), 8, 284, this.SourcePath);

                        var handler = Bridge.Reflection.createDelegate(methodInfo, this.Source);
                        if (Bridge.staticEquals(handler, null)) {
                            handler = Bridge.Reflection.createDelegate(methodInfo, this.Source);
                        }
                        if (Bridge.staticEquals(handler, null)) {
                            throw new System.ArgumentException(this.SourcePath);
                        }

                        Bridge.Reflection.midel(eventInfo.ad, this.Target)(handler);

                        return;
                    }
                }
                this.ConnectSourceToTarget();

                this.UpdateTarget();

                if (this.BindingMode === System.Windows.Data.BindingMode.TwoWay) {
                    this.ConnectTargetToSource();
                }
            },
            UpdateSource: function (newValue) {
                System.ComponentModel.ReflectionHelper.SetPropertyValue(this.Source, this.SourcePath, newValue);
            },
            UpdateTarget: function () {
                var newValue = System.ComponentModel.ReflectionHelper.GetPropertyValue(this.Source, this.SourcePath);

                System.ComponentModel.ReflectionHelper.SetPropertyValue(this.Target, this.TargetPropertyName, newValue);
            },
            ConnectSourceToTarget: function () {
                var source = Bridge.as(this.Source, System.ComponentModel.INotifyPropertyChanged);
                if (source == null) {
                    return;
                }

                source.System$ComponentModel$INotifyPropertyChanged$addPropertyChanged(Bridge.fn.bind(this, function (sender, e) {
                    if (Bridge.referenceEquals(e.propertyName, this.SourcePath)) {
                        this.UpdateTarget();
                    }
                }));
            },
            ConnectTargetToSource: function () {
                var target = Bridge.as(this.Target, System.ComponentModel.INotifyPropertyChanged);
                if (target == null) {
                    return;
                }

                target.System$ComponentModel$INotifyPropertyChanged$addPropertyChanged(Bridge.fn.bind(this, function (sender, e) {
                    if (Bridge.referenceEquals(e.propertyName, this.TargetPropertyName)) {
                        this.UpdateSource(this.TargetValue);
                    }
                }));
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

    Bridge.define("System.Windows.PropertyMetadata", {
        fields: {
            DefaultValue: null,
            PropertyChangedCallback: null
        },
        ctors: {
            $ctor1: function (propertyChangedCallback) {
                this.$initialize();
                this.PropertyChangedCallback = propertyChangedCallback;
            },
            ctor: function (defaultValue, propertyChangedCallback) {
                this.$initialize();
                this.DefaultValue = defaultValue;
                this.PropertyChangedCallback = propertyChangedCallback;
            }
        }
    });

    Bridge.define("System.Windows.PropertyPath", {
        fields: {
            Path: null
        },
        ctors: {
            ctor: function (path) {
                this.$initialize();
                this.Path = path;
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Builder", {
        inherits: [Bridge.CustomUIMarkup.UI.Design.Builder],
        statics: {
            fields: {
                _tags: null,
                TagTypeMap: null
            },
            props: {
                Tags: {
                    get: function () {
                        return Bridge.CustomUIMarkup.SemanticUI.Builder._tags;
                    }
                }
            },
            ctors: {
                init: function () {
                    this._tags = function (_o1) {
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("div", System.Windows.html_div));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("span", System.Windows.html_span));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("strong", System.Windows.html_strong));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("a", System.Windows.html_a));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("computer.tablet.only.row", Bridge.CustomUIMarkup.SemanticUI.computer_tablet_only_row));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.navbar.menu", Bridge.CustomUIMarkup.SemanticUI.ui_navbar_menu));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("mobile.only.row", Bridge.CustomUIMarkup.SemanticUI.mobile_only_row));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("right.menu", Bridge.CustomUIMarkup.SemanticUI.right_menu));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.page.grid", Bridge.CustomUIMarkup.SemanticUI.ui_page_grid));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("left.menu", Bridge.CustomUIMarkup.SemanticUI.left_menu));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.text.menu.navbar", Bridge.CustomUIMarkup.SemanticUI.ui_text_menu_navbar));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.button", Bridge.CustomUIMarkup.SemanticUI.ui_button));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("TabPanel", Bridge.CustomUIMarkup.SemanticUI.TabPanel));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Tab", Bridge.CustomUIMarkup.SemanticUI.TabItem));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("card", Bridge.CustomUIMarkup.SemanticUI.card));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.card", Bridge.CustomUIMarkup.SemanticUI.ui_card));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.cards", Bridge.CustomUIMarkup.SemanticUI.ui_cards));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("description", Bridge.CustomUIMarkup.SemanticUI.description));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("content", Bridge.CustomUIMarkup.SemanticUI.content));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("extra-content", Bridge.CustomUIMarkup.SemanticUI.ExtraContent));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.basic.button", Bridge.CustomUIMarkup.SemanticUI.ui_basic_button));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("carousel", Bridge.CustomUIMarkup.jssor.Carousel));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.divider", Bridge.CustomUIMarkup.SemanticUI.ui_divider));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.menu", Bridge.CustomUIMarkup.SemanticUI.ui_menu));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("item", Bridge.CustomUIMarkup.SemanticUI.item));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.vertical.menu", Bridge.CustomUIMarkup.SemanticUI.ui_vertical_menu));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("textInput", Bridge.CustomUIMarkup.SemanticUI.InputText));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("textBox", Bridge.CustomUIMarkup.SemanticUI.InputText));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("combo", Bridge.CustomUIMarkup.SemanticUI.Combo));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("comboBox", Bridge.CustomUIMarkup.SemanticUI.Combo));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.equal.width.grid", Bridge.CustomUIMarkup.SemanticUI.ui_equal_width_grid));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("textArea", Bridge.CustomUIMarkup.SemanticUI.TextArea));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.container", Bridge.CustomUIMarkup.SemanticUI.ui_container));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.stacked", Bridge.CustomUIMarkup.SemanticUI.ui_stacked));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.grid", Bridge.CustomUIMarkup.SemanticUI.ui_grid));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui page grid", Bridge.CustomUIMarkup.SemanticUI.ui_page_grid));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("field", Bridge.CustomUIMarkup.SemanticUI.Field));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.form", Bridge.CustomUIMarkup.SemanticUI.ui_form));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("row", Bridge.CustomUIMarkup.SemanticUI.Row));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("column", Bridge.CustomUIMarkup.SemanticUI.column));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.header.1", Bridge.CustomUIMarkup.SemanticUI.ui_header_1));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.header.2", Bridge.CustomUIMarkup.SemanticUI.ui_header_2));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.header.3", Bridge.CustomUIMarkup.SemanticUI.ui_header_3));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("header", Bridge.CustomUIMarkup.SemanticUI.header));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.image", Bridge.CustomUIMarkup.SemanticUI.ui_image));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("icon", Bridge.CustomUIMarkup.SemanticUI.Icon));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ui.segment", Bridge.CustomUIMarkup.SemanticUI.ui_segment));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("textBlock", System.Windows.Controls.TextBlock));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("xmlEditor", Bridge.CustomUIMarkup.SemanticUI.XmlEditor));
                            _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("uiEditor", Bridge.CustomUIMarkup.SemanticUI.UIEditor));
                            return _o1;
                        }(new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo)).ctor());
                }
            },
            methods: {
                RegisterTag: function (tagName, type) {
                    Bridge.CustomUIMarkup.SemanticUI.Builder._tags.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo(tagName, type));
                }
            }
        },
        methods: {
            CreateType: function (tag) {
                var $t;
                if (Bridge.CustomUIMarkup.SemanticUI.Builder.TagTypeMap == null) {
                    Bridge.CustomUIMarkup.SemanticUI.Builder.TagTypeMap = new (System.Collections.Generic.Dictionary$2(System.String,Function))();
                    $t = Bridge.getEnumerator(Bridge.CustomUIMarkup.SemanticUI.Builder._tags);
                    try {
                        while ($t.moveNext()) {
                            var intellisenseInfo = $t.Current;
                            Bridge.CustomUIMarkup.SemanticUI.Builder.TagTypeMap.set(intellisenseInfo.TagName.toUpperCase(), intellisenseInfo.Type);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}
                if (Bridge.CustomUIMarkup.SemanticUI.Builder.TagTypeMap.containsKey(tag)) {
                    return Bridge.CustomUIMarkup.SemanticUI.Builder.TagTypeMap.get(tag);
                }

                return null;
            }
        }
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
        fields: {
            "UpdateOnlyInnerHTML": false
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
                if (System.ComponentModel.ReflectionHelper.FindProperty(this.Source, this.SourcePath) == null) {
                    return;
                }

                var value = System.ComponentModel.ReflectionHelper.GetPropertyValue(this.Source, this.SourcePath);

                if (this["UpdateOnlyInnerHTML"]) {
                    this.Target$1.html(System.String.concat(value, ""));
                    return;
                }

                if (Bridge.referenceEquals(this.TargetPropertyName, "value")) {
                    this.Target$1.val(System.String.concat(value, ""));
                } else {
                    this.Target$1.attr(this.TargetPropertyName, System.String.concat(value, ""));
                }
            },
            ConnectTargetToSource: function () {
                this.Target$1.focusout(Bridge.fn.bind(this, function (ev) {
                        this.UpdateSource(this.Target$1.val());
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
                BackgroundProperty: null,
                "ID": 0
            },
            ctors: {
                init: function () {
                    this.BorderProperty = System.Windows.DependencyProperty.Register$1("Border", System.String, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("border"));
                    this.ClassProperty = System.Windows.DependencyProperty.Register$1("Class", System.String, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("class"));
                    this.AddClassProperty = System.Windows.DependencyProperty.Register$1("AddClass", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnAddClassChanged));
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
                    this.TextWrappingProperty = System.Windows.DependencyProperty.Register$1("TextWrapping", System.Windows.TextWrapping, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnTextWrappingChanged));
                    this.FontWeightProperty = System.Windows.DependencyProperty.Register$1("FontWeight", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("fontWeight"));
                    this.FontSizeProperty = System.Windows.DependencyProperty.Register$1("FontSize", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("fontSize"));
                    this.WidthProperty = System.Windows.DependencyProperty.Register$1("Width", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("width"));
                    this.WidthPercentProperty = System.Windows.DependencyProperty.Register$1("WidthPercent", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater$1("width", function (v) {
                        return System.String.concat(v, "%");
                    }));
                    this.ColorProperty = System.Windows.DependencyProperty.Register$1("Color", System.String, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("color"));
                    this["InnerHTMLProperty"] = System.Windows.DependencyProperty.Register$1("InnerHTML", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                    this.VisibilityProperty = System.Windows.DependencyProperty.Register$1("Visibility", System.Windows.Visibility, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnVisibilityChanged));
                    this.HeightProperty = System.Windows.DependencyProperty.Register$1("Height", System.Double, System.Windows.FrameworkElement, System.Windows.FrameworkElement.CreateJQueryCssUpdater("height"));
                    this.BackgroundProperty = System.Windows.DependencyProperty.Register$1("Background", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnBackgroundChanged));
                }
            },
            methods: {
                CreateHtmlAttributeUpdater: function (htmlAttribute) {
                    return new System.Windows.PropertyMetadata.$ctor1(function (d, e) {
                        var me = Bridge.cast(d, System.Windows.FrameworkElement);

                        me._root.attr(htmlAttribute, Bridge.cast(e.NewValue, System.String));
                    });
                },
                CreateJQueryCssUpdater: function (jqueryCssAttribute) {
                    return new System.Windows.PropertyMetadata.$ctor1(function (d, e) {
                        var me = Bridge.cast(d, System.Windows.FrameworkElement);

                        me._root.css(jqueryCssAttribute, Bridge.unbox(e.NewValue));
                    });
                },
                CreateJQueryCssUpdater$1: function (jqueryCssAttribute, valueConverter) {
                    return new System.Windows.PropertyMetadata.$ctor1(function (d, e) {
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
            ctor: function () {
                this.$initialize();
                System.Windows.DependencyObject.ctor.call(this);
                this.addPropertyChanged(Bridge.fn.bind(this, function (s, e) {
                    var propertyChangeEventArgs = Bridge.as(e, System.ComponentModel.BagChangedEventArgs);
                    if (propertyChangeEventArgs != null) {
                        System.Windows.DependencyProperty.TryInvokeOnPropertyChange(this, propertyChangeEventArgs.propertyName, propertyChangeEventArgs.NewValue, propertyChangeEventArgs.OldValue);
                    }
                }));
            }
        },
        methods: {
            On: function (eventName, handler) {
                this._root.on(eventName, handler);
            },
            Add: function (element) {
                element._root.appendTo(this._root);

                this.AddChild(element);
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
                this._root = $(document.createElement("div"));
            },
            SetValue$1: function (dp, value) {
                this.setItem(dp.Name, value);
            },
            AddChild: function (element) {
                this.BeforeAddChild(element);

                if (this._childeren == null) {
                    this._childeren = new (System.Collections.Generic.List$1(System.Windows.FrameworkElement)).ctor();
                }
                this._childeren.add(element);

                this.AfterAddChild(element);
            },
            AfterAddChild: function (element) { },
            AfterInitDOM: function () { },
            BeforeAddChild: function (element) { },
            BindPropertyToInnerHTML: function (propertyName, targetElement) {
                // TODO: remove
                this.addPropertyChanged(Bridge.fn.bind(this, function (s, a) {
                    var $t;
                    var bi = ($t = new System.Windows.Data.HTMLBindingInfo(), $t.BindingMode = System.Windows.Data.BindingMode.OneWay, $t.Source = this, $t.SourcePath = propertyName, $t.Target$1 = targetElement, $t["UpdateOnlyInnerHTML"] = true, $t);
                    bi.UpdateTarget();
                }));
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.CodeMirror.XmlEditor", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                TextProperty: null
            },
            props: {
                CssFiles: {
                    get: function () {
                        return System.Array.init([(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "codemirror.css", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/hint/show-hint.css", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/fold/foldgutter.css", (Bridge.CustomUIMarkup.Common.ScriptLoader.CssDirectory || "") + "CodeMirror.css"], System.String);
                    }
                },
                CodeMirrorDirectoryDefault: {
                    get: function () {
                        return "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/";
                    }
                },
                CodeMirrorDirectory: {
                    get: function () {
                        return Bridge.cast(Bridge.CustomUIMarkup.Common.ScriptLoader.Map.CodeMirrorDir, System.String);
                    }
                },
                JsDir: {
                    get: function () {
                        var $t;
                        return ($t = Bridge.CustomUIMarkup.CodeMirror.XmlEditor.CodeMirrorDirectory, $t != null ? $t : Bridge.CustomUIMarkup.CodeMirror.XmlEditor.CodeMirrorDirectoryDefault);
                    }
                },
                Scripts: {
                    get: function () {
                        return System.Array.init([(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "codemirror.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "mode/xml/xml.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/hint/show-hint.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/hint/xml-hint.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/edit/closetag.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/fold/foldcode.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/fold/foldgutter.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/fold/xml-fold.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/fold/indent-fold.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/fold/markdown-fold.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "mode/markdown/markdown.js", (Bridge.CustomUIMarkup.CodeMirror.XmlEditor.JsDir || "") + "addon/edit/matchtags.js"], System.String);
                    }
                }
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.CodeMirror.XmlEditor, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.TextChanged));
                }
            },
            methods: {
                TextChanged: function (d, e) {
                    var newValue = Bridge.cast(e.NewValue, System.String);

                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.CodeMirror.XmlEditor);

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
                this._root = Bridge.CustomUIMarkup.Common.DOM.div();
                this.Render();
            },
            Render: function () {
                this._root.empty();

                this._root.css("height", "100%");

                Bridge.CustomUIMarkup.Common.DOM.textarea().prop("id", this["Id"]).appendTo(this._root).css("height", "100%");

                $(Bridge.fn.bind(this, function () {
                        this.Render$1(this["Id"]);
                    }));
            },
            Render$1: function (id) {
                var fontSize = this.getItem("FontSize") == null ? 12 : this.FontSize;

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
    matchTags: {bothTags: true},
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

    Bridge.define("Bridge.CustomUIMarkup.Design.UIEditor", {
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
                    return "\r\n<ui.container>\r\n    <XmlEditor Text ='{SourceText}' \r\n        OnTextChanged = '{OnTextChanged}' \r\n        OnCursorLineNumberChanged = '{OnCursorLineNumberChanged}' \r\n        Height='400' />\r\n    <ui.container Border = '1px solid Green' />\r\n</ui.container>";
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
        methods: {
            InitDOM: function () {
                var builder = this.CreateBuilder();
                builder.XmlString = this.Template;
                builder.DataContext = this;

                this.OutputElement = Bridge.cast(builder.Build(), System.Windows.FrameworkElement);

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
                Bridge.CustomUIMarkup.Common.Extensions.SetFirstChild(this.Container, Bridge.CustomUIMarkup.Common.DOM.div().html(message));
            },
            SetOutput: function (element) {
                this.Container.empty();
                element.appendTo(this.Container);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.DesignerSamples.ExampleDataContext", {
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
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "All", $t.XmlTemplate = "\r\n\r\n\r\n\r\n\r\n\r\n<ui.page.grid>\r\n   <ui.container>\r\n      <ui.text.menu.navbar FontSize='18'>\r\n         <left.menu>\r\n            <item>Project Name</item>\r\n         </left.menu>\r\n         <right.menu>\r\n            <item>Home</item>\r\n            <item>About</item>\r\n            <item>Contact</item>\r\n         </right.menu>\r\n      </ui.text.menu.navbar>\r\n      <ui.divider MarginBottom='10' />\r\n      <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />\r\n      <ui.divider MarginBottom='10' />\r\n\t  <ui.cards>\r\n\t  \r\n\t\t  <card>\r\n\t\t\t <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />\r\n\t\t\t <content Align='Center'>\r\n\t\t\t\t<Header Align='Center'>Motor Safari</Header>\r\n\t\t\t\t<description>Macera sizi bekliyor...</description>\r\n\t\t\t\t<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n\t\t\t </content>\r\n\t\t  </card>\r\n\t\t  \r\n\t\t  <card>\r\n\t\t\t <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />\r\n\t\t\t <content Align='Center'>\r\n\t\t\t\t<Header Align='Center'>Motor Safari</Header>\r\n\t\t\t\t<description>Macera sizi bekliyor...</description>\r\n\t\t\t\t<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n\t\t\t </content>\r\n\t\t  </card>\r\n\t\t  \r\n\t  </ui.cards>\r\n   </ui.container>\r\n</ui.page.grid>\r\n\r\n\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Carousel", $t.XmlTemplate = "\r\n\r\n\r\n<ui.container>\r\n    <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />\r\n</ui.container>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Card", $t.XmlTemplate = "\r\n\r\n<ui.cards>\r\n\r\n    <card>\r\n\t    <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg'/>\r\n\t    <content Align='Center'>\r\n            <Header Align='Center' >Motor Safari</Header>\r\n            <description> Macera sizi bekliyor...</description>\r\n            <ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />\r\n        </content>\t\r\n    </card>\r\n\r\n</ui.cards>\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Grid.column", $t.XmlTemplate = "\r\n\r\n\r\n<ui.grid>\r\n  \r\n    <column Width='27' Align='Center'>\r\n        <Icon Type='Setting' Color='#ffbb00' FontSize='17' />\r\n    </column>\r\n  \r\n  \t<Column Width='80'>\r\n        <TextBlock Text='Start Date:' Color='#888888' FontSize='13' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n  \t\r\n  \t<Column   Align='Left' >\r\n        <TextBlock Text='November 1, 2017 15:30' Color='#888888' FontSize='12' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n</ui.grid>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Form", $t.XmlTemplate = "\r\n\r\n\r\n<ui.segment>\r\n  <ui.page.grid Align='Center' MarginTop='5'>\r\n      <ui.form  Padding='55' Border='1px solid #ddd'>\r\n        <ui.header.3>Input form</ui.header.3>\r\n     <Field Value='A' Label='yy'>\r\n        <TextBox PlaceHolder='Write 1' />\r\n     </Field>\r\n     <ui.stacked>\r\n        <Field Value='A' Label='yy' >\r\n           <TextBox PlaceHolder='Write 1' IsMandatory='True' />\r\n        </Field>\r\n     </ui.stacked>\r\n     <ui.equal.width.grid>\r\n        <column>\r\n           <Field Value='A' Label='yy'>\r\n              <TextBox PlaceHolder='Write 1' />\r\n           </Field>\r\n        </column>\r\n        <column>\r\n           <Field Value='A' Label='yy'>\r\n              <TextBox PlaceHolder='Write 1' />\r\n           </Field>\r\n        </column>\r\n     </ui.equal.width.grid>\r\n        \r\n        <ui.grid>\r\n          <column Align='Right'>\r\n        \t\t<ui.button Text='No'   />\r\n            \t<ui.button Text='Yes'  AddClass='positive'  />\r\n            </column>\r\n        </ui.grid>\r\n  </ui.form>\r\n  </ui.page.grid>\r\n</ui.segment>\r\n\r\n\r\n\r\n\r\n", $t));
                        return _o1;
                    }(new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo)).ctor());
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo", {
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

    Bridge.define("Bridge.CustomUIMarkup.jssor.Carousel", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                DataSourceProperty: null
            },
            props: {
                CssFiles: {
                    get: function () {
                        return function (_o1) {
                                _o1.add((Bridge.CustomUIMarkup.Common.ScriptLoader.CssDirectory || "") + "Carousel.css");
                                return _o1;
                            }(new (System.Collections.Generic.List$1(System.String)).ctor());
                    }
                },
                JsFiles: {
                    get: function () {
                        return function (_o2) {
                                _o2.add((Bridge.CustomUIMarkup.Common.ScriptLoader.JsDirectory || "") + "jssor.slider-26.5.0.min.js");
                                _o2.add((Bridge.CustomUIMarkup.Common.ScriptLoader.JsDirectory || "") + "jssor.Carousel.js");
                                return _o2;
                            }(new (System.Collections.Generic.List$1(System.String)).ctor());
                    }
                },
                Template: {
                    get: function () {
                        return "<div id='jssor_1' style='position:relative;margin:0 auto;top:0px;left:0px;width:980px;height:380px;overflow:hidden;visibility:hidden;'>\r\n    <!-- Loading Screen \r\n    <div data-u='loading' class='jssorl-009-spin' style='position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-color:rgba(0,0,0,0.7);'>\r\n        <img style='margin-top:-19px;position:relative;top:50%;width:38px;height:38px;' src='img/spin.svg' />\r\n    </div> -->\r\n    <div data-u='slides' id='imagesContainer' style='cursor:default;position:relative;top:0px;left:0px;width:980px;height:380px;overflow:hidden;'>\r\n        <!-- template\r\n        <div>\r\n            <img data-u='image' src='img/001.jpg' />\r\n        </div>\r\n        -->\r\n    </div>\r\n    <!-- Bullet Navigator -->\r\n    <div data-u='navigator' class='jssorb051' style='position:absolute;bottom:12px;right:12px;' data-autocenter='1' data-scale='0.5' data-scale-bottom='0.75'>\r\n        <div data-u='prototype' class='i' style='width:16px;height:16px;'>\r\n            <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>\r\n                <circle class='b' cx='8000' cy='8000' r='5800'></circle>\r\n            </svg>\r\n        </div>\r\n    </div>\r\n    <!-- Arrow Navigator -->\r\n    <div data-u='arrowleft' class='jssora051' style='width:55px;height:55px;top:0px;left:25px;' data-autocenter='2' data-scale='0.75' data-scale-left='0.75'>\r\n        <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>\r\n            <polyline class='a' points='11040,1920 4960,8000 11040,14080 '></polyline>\r\n        </svg>\r\n    </div>\r\n    <div data-u='arrowright' class='jssora051' style='width:55px;height:55px;top:0px;right:25px;' data-autocenter='2' data-scale='0.75' data-scale-right='0.75'>\r\n        <svg viewbox='0 0 16000 16000' style='position:absolute;top:0;left:0;width:100%;height:100%;'>\r\n            <polyline class='a' points='4960,1920 11040,8000 4960,14080 '></polyline>\r\n        </svg>\r\n    </div>\r\n</div>";
                    }
                }
            },
            ctors: {
                init: function () {
                    this.DataSourceProperty = System.Windows.DependencyProperty.Register$1("DataSource", System.String, Bridge.CustomUIMarkup.jssor.Carousel, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.jssor.Carousel.OnDataSourceChanged));
                }
            },
            methods: {
                OnDataSourceChanged: function (d, e) {
                    var $t;
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.jssor.Carousel);

                    me.imagesContainer.empty();

                    var images = Bridge.cast(e.NewValue, System.String);
                    $t = Bridge.getEnumerator(System.Linq.Enumerable.from(System.String.split(images, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (x) {
                            return System.String.isNullOrWhiteSpace(x) === false;
                        }));
                    try {
                        while ($t.moveNext()) {
                            var src = $t.Current;
                            Bridge.CustomUIMarkup.Common.DOM.div().appendTo(me.imagesContainer).append(Bridge.CustomUIMarkup.Common.DOM.img().attr("data-u", "img").attr("src", src));
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
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.jssor.Carousel.DataSourceProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.jssor.Carousel.DataSourceProperty, value);
                }
            }
        },
        methods: {
            InitDOM: function () {
                this._root = $(System.Linq.Enumerable.from($.parseHTML(System.String.replaceAll(Bridge.CustomUIMarkup.jssor.Carousel.Template, "\n", ""),null)).first());
                this._root.attr("id", this["Id"]);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ElementBase", {
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
                    this.SizeProperty = System.Windows.DependencyProperty.Register$1("Size", Bridge.CustomUIMarkup.SemanticUI.Size, Bridge.CustomUIMarkup.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.ElementBase.OnSizeChanged));
                    this["IsCenterAlignedProperty"] = System.Windows.DependencyProperty.Register$1("IsCenterAligned", System.Boolean, Bridge.CustomUIMarkup.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.ElementBase.IsCenterAlignedChanged));
                    this["IsRightAlignedProperty"] = System.Windows.DependencyProperty.Register$1("IsRightAligned", System.Boolean, Bridge.CustomUIMarkup.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.ElementBase.IsRightAlignedChanged));
                    this.AlignProperty = System.Windows.DependencyProperty.Register$1("Align", Bridge.CustomUIMarkup.SemanticUI.Align, Bridge.CustomUIMarkup.SemanticUI.ElementBase, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.ElementBase.OnAlignChanged));
                }
            },
            methods: {
                OnSizeChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.ElementBase);

                    var newValue = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));

                    me._root.addClass(System.Enum.toString(Bridge.CustomUIMarkup.SemanticUI.Size, newValue).toLowerCase());
                },
                IsCenterAlignedChanged: function (d, e) {
                    Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.ElementBase).AddCssClassOnTrueElseRemove(e.NewValue, "center aligned");
                },
                IsRightAlignedChanged: function (d, e) {
                    Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.ElementBase).AddCssClassOnTrueElseRemove(e.NewValue, "right aligned");
                },
                OnAlignChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.ElementBase);

                    var value = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));
                    var className = (System.Enum.toString(Bridge.CustomUIMarkup.SemanticUI.Align, value).toLowerCase() || "") + " aligned";

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
                    this.setItem("Size", Bridge.box(value, Bridge.CustomUIMarkup.SemanticUI.Size, System.Enum.toStringFn(Bridge.CustomUIMarkup.SemanticUI.Size)));
                }
            },
            Align: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("Align")), System.Int32));
                },
                set: function (value) {
                    this.setItem("Align", Bridge.box(value, Bridge.CustomUIMarkup.SemanticUI.Align, System.Enum.toStringFn(Bridge.CustomUIMarkup.SemanticUI.Align)));
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
                this._root = $(document.createElement(this.HtmlTag)).addClass(this.HtmlClassName);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Combo", {
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
                this._root = Bridge.CustomUIMarkup.Common.DOM.div("ui selection dropdown");

                this._hidden = Bridge.CustomUIMarkup.Common.DOM.input("hidden").appendTo(this._root).on("change", Bridge.fn.cacheBind(this, this.ValueChanged));

                this._iconElement = Bridge.CustomUIMarkup.Common.DOM.i("dropdown icon").appendTo(this._root);
                this._defaultTextElement = Bridge.CustomUIMarkup.Common.DOM.div("default text").appendTo(this._root);
                this._menuElement = Bridge.CustomUIMarkup.Common.DOM.div("menu").appendTo(this._root);

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
                        var optionElement = Bridge.CustomUIMarkup.Common.DOM.div("item");

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
                        var optionElement = Bridge.CustomUIMarkup.Common.DOM.div("item");

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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.TabItem", {
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
                this._headerElement = Bridge.CustomUIMarkup.Common.DOM.a("item").attr("data-tab", this["Id"]);

                this.BindPropertyToInnerHTML("Header", this._headerElement);

                this._contentElement = Bridge.CustomUIMarkup.Common.DOM.div("ui bottom attached tab segment").attr("data-tab", this["Id"]);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.TabPanel", {
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
                this._tabs = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.SemanticUI.TabItem)).ctor();
            }
        },
        methods: {
            Add$1: function (element) {
                var tabItem = Bridge.as(element, Bridge.CustomUIMarkup.SemanticUI.TabItem);
                if (tabItem == null) {
                    throw new System.ArgumentException();
                }

                this._menuElement.append(tabItem._headerElement);

                this._root.append(tabItem._contentElement);

                tabItem._headerElement.click(Bridge.fn.bind(this, function () {
                    this.RemoveClassActive();

                    tabItem._headerElement.addClass(Bridge.CustomUIMarkup.SemanticUI.TabPanel.active);
                    tabItem._contentElement.addClass(Bridge.CustomUIMarkup.SemanticUI.TabPanel.active);
                }));

                this._tabs.add(tabItem);
            },
            InitDOM: function () {
                this._root = Bridge.CustomUIMarkup.Common.DOM.div();

                this._menuElement = Bridge.CustomUIMarkup.Common.DOM.div("ui top attached tabular menu").appendTo(this._root);

                this._root.tab();
            },
            RemoveClassActive: function () {
                var $t;
                $t = Bridge.getEnumerator(this._tabs);
                try {
                    while ($t.moveNext()) {
                        var tabItem = $t.Current;
                        tabItem._contentElement.removeClass(Bridge.CustomUIMarkup.SemanticUI.TabPanel.active);
                        tabItem._headerElement.removeClass(Bridge.CustomUIMarkup.SemanticUI.TabPanel.active);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
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
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, System.Windows.Controls.TextBlock, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnInnerHTMLChanged));
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

    Bridge.define("System.Windows.html_a", {
        inherits: [System.Windows.FrameworkElement],
        statics: {
            fields: {
                HrefProperty: null
            },
            ctors: {
                init: function () {
                    this.HrefProperty = System.Windows.DependencyProperty.Register$1("Href", System.String, System.Windows.html_a, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("href"));
                }
            }
        },
        props: {
            Href: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(System.Windows.html_a.HrefProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(System.Windows.html_a.HrefProperty, value);
                }
            }
        },
        methods: {
            InitDOM: function () {
                this._root = $(document.createElement("a"));
            }
        }
    });

    Bridge.define("System.Windows.html_div", {
        inherits: [System.Windows.FrameworkElement],
        methods: {
            InitDOM: function () {
                this._root = $(document.createElement("div"));
            }
        }
    });

    Bridge.define("System.Windows.html_span", {
        inherits: [System.Windows.FrameworkElement],
        methods: {
            InitDOM: function () {
                this._root = $(document.createElement("span"));
            }
        }
    });

    Bridge.define("System.Windows.html_strong", {
        inherits: [System.Windows.FrameworkElement],
        methods: {
            InitDOM: function () {
                this._root = $(document.createElement("strong"));
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.card", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "card";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.column", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                WideProperty: null
            },
            ctors: {
                init: function () {
                    this.WideProperty = System.Windows.DependencyProperty.Register$1("Wide", System.Int32, Bridge.CustomUIMarkup.SemanticUI.column, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.column.WideChanged));
                }
            },
            methods: {
                WideChanged: function (d, e) {
                    var oldValue = e.OldValue;
                    var newValue = System.Extensions.ToInt32Nullable(e.NewValue);

                    var fe = Bridge.cast(d, System.Windows.FrameworkElement);

                    if (System.Extensions.IsNotNull(oldValue)) {
                        fe._root.removeClass((Bridge.CustomUIMarkup.SemanticUI.NumberToWord.ToWord(System.Extensions.ToInt32(oldValue)) || "") + " wide");
                    }

                    if (System.Nullable.hasValue(newValue)) {
                        if (System.Nullable.getValue(newValue) < 0 || System.Nullable.getValue(newValue) > 16) {
                            throw new System.ArgumentException("Max wide is 16. @value:" + System.Nullable.getValue(newValue));
                        }

                        fe._root.addClass((Bridge.CustomUIMarkup.SemanticUI.NumberToWord.ToWord(System.Nullable.getValue(newValue)) || "") + " wide");
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
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.column.WideProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.column.WideProperty, Bridge.box(value, System.Int32));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.computer_tablet_only_row", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "computer tablet only row";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.content", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase]
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.description", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase]
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ExtraContent", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "extra content";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Field", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                ErrorMessageProperty: null,
                LabelProperty: null
            },
            ctors: {
                init: function () {
                    this.ErrorMessageProperty = System.Windows.DependencyProperty.Register$1("ErrorMessage", System.String, Bridge.CustomUIMarkup.SemanticUI.Field, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.Field.OnErrorMessageChanged));
                    this.LabelProperty = System.Windows.DependencyProperty.Register$1("Label", System.String, Bridge.CustomUIMarkup.SemanticUI.Field, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.Field.OnLabelChanged));
                }
            },
            methods: {
                OnErrorMessageChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.Field);
                    var value = Bridge.cast(e.NewValue, System.String);
                    if (Bridge.CustomUIMarkup.Common.Extensions.IsNullOrWhiteSpace(value)) {
                        me.RemoveError();
                    } else {
                        me.InitError(Bridge.cast(e.NewValue, System.String));
                    }
                },
                OnLabelChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.Field);
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
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        methods: {
            Add: function (element) {
                this.AddChild(element);

                this.ReOrderElements();
            },
            InitDOM: function () {
                this._root = Bridge.CustomUIMarkup.Common.DOM.div("field");
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
                this._errorElement = Bridge.CustomUIMarkup.Common.DOM.div("ui red pointing label transition visible").html(errorMessage);
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
                    this._labelElement = Bridge.CustomUIMarkup.Common.DOM.label();
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.header", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.SemanticUI.header, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnInnerHTMLChanged));
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Icon", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                TypeProperty: null
            },
            ctors: {
                init: function () {
                    this.TypeProperty = System.Windows.DependencyProperty.Register$1("Type", Bridge.CustomUIMarkup.SemanticUI.IconType, Bridge.CustomUIMarkup.SemanticUI.Icon, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.Icon.OnTypeChanged));
                }
            },
            methods: {
                OnTypeChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.Icon);
                    var iconType = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));

                    var className = (System.String.replaceAll(System.Enum.toString(Bridge.CustomUIMarkup.SemanticUI.IconType, iconType), "_", " ").toLowerCase() || "") + " icon";

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
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.Icon.TypeProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.Icon.TypeProperty, Bridge.box(value, Bridge.CustomUIMarkup.SemanticUI.IconType, System.Enum.toStringFn(Bridge.CustomUIMarkup.SemanticUI.IconType)));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.InputText", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null,
                PlaceHolderProperty: null,
                "IsMandatoryProperty": null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.InputText.OnTextChanged));
                    this.PlaceHolderProperty = System.Windows.DependencyProperty.Register$1("PlaceHolder", System.String, Bridge.CustomUIMarkup.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.InputText.OnPlaceHolderChanged));
                    this["IsMandatoryProperty"] = System.Windows.DependencyProperty.Register$1("IsMandatory", System.Boolean, Bridge.CustomUIMarkup.SemanticUI.InputText, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.InputText.OnIsMandatoryChanged));
                }
            },
            methods: {
                OnTextChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.InputText);

                    me._inputElement.attr("value", Bridge.cast(e.NewValue, System.String));
                },
                OnPlaceHolderChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.InputText);

                    me._inputElement.attr("placeholder", Bridge.cast(e.NewValue, System.String));
                },
                OnIsMandatoryChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.InputText);

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
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.InputText.TextProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.InputText.TextProperty, value);
                }
            },
            PlaceHolder: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.InputText.PlaceHolderProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.InputText.PlaceHolderProperty, value);
                }
            },
            "IsMandatory": {
                get: function () {
                    return System.Extensions.ToBoolean(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.InputText["IsMandatoryProperty"]));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.InputText["IsMandatoryProperty"], Bridge.box(value, System.Boolean, System.Boolean.toString));
                }
            }
        },
        methods: {
            AfterInitDOM: function () {
                this._inputElement = Bridge.CustomUIMarkup.Common.DOM.input("text").appendTo(this._root);
            },
            InitializeCornerLabelDiv: function () {
                if (this._cornerLabelDiv == null) {
                    this._cornerLabelDiv = Bridge.CustomUIMarkup.Common.DOM.div("ui corner label").appendTo(this._root);
                    Bridge.CustomUIMarkup.Common.DOM.i("asterisk icon").appendTo(this._cornerLabelDiv);
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.item", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "item";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.left_menu", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "left menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.mobile_only_row", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "mobile only row";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Modal", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase,System.Windows.Markup.IAddChild],
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
                this._root = Bridge.CustomUIMarkup.Common.DOM.div("ui modal");

                this.header = Bridge.CustomUIMarkup.Common.DOM.div("header").appendTo(this._root);

                this.content = Bridge.CustomUIMarkup.Common.DOM.div("content").appendTo(this._root);

                this._root.modal("show");

                this.BindPropertyToInnerHTML("Title", this.header);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.right_menu", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "right menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Row", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "row";
                }
            },
            rowClass: {
                get: function () {
                    return (Bridge.CustomUIMarkup.SemanticUI.NumberToWord.ToWord(System.Array.getCount(this.Childeren, System.Windows.FrameworkElement)) || "") + " column row";
                }
            }
        },
        methods: {
            AfterAddChild: function (element) {
                this._root.attr("class", this.rowClass);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.UIEditor", {
        inherits: [Bridge.CustomUIMarkup.Design.UIEditor],
        ctors: {
            ctor: function () {
                this.$initialize();
                Bridge.CustomUIMarkup.Design.UIEditor.ctor.call(this);
                this.CreateBuilder = function () {
                    return new Bridge.CustomUIMarkup.SemanticUI.Builder();
                };
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_button", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null,
                "IsActiveProperty": null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.SemanticUI.ui_button, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                    this["IsActiveProperty"] = System.Windows.DependencyProperty.Register$1("IsActive", System.Boolean, Bridge.CustomUIMarkup.SemanticUI.ui_button, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.ui_button.IsActiveChanged));
                }
            },
            methods: {
                IsActiveChanged: function (d, e) {
                    Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.ui_button).AddCssClassOnTrueElseRemove(e.NewValue, "active");
                }
            }
        },
        props: {
            "IsActive": {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.ui_button["IsActiveProperty"])), System.Boolean, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.ui_button["IsActiveProperty"], Bridge.box(value, System.Boolean, System.Nullable.toStringFn(System.Boolean.toString), System.Nullable.getHashCode));
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_card", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui card";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_cards", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui cards";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_container", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui container";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_divider", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui divider";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_equal_width_grid", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui equal width grid";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_form", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui form";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_grid", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui grid";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_image", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                SrcProperty: null
            },
            ctors: {
                init: function () {
                    this.SrcProperty = System.Windows.DependencyProperty.Register$1("Src", System.String, Bridge.CustomUIMarkup.SemanticUI.ui_image, System.Windows.FrameworkElement.CreateHtmlAttributeUpdater("src"));
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
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.ui_image.SrcProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.ui_image.SrcProperty, value);
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_menu", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_navbar_menu", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui navbar menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_page_grid", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui page grid";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_segment", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui segment";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_stacked", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui stacked";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_text_menu_navbar", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui text menu navbar";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_vertical_menu", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui vertical menu";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.XmlEditor", {
        inherits: [Bridge.CustomUIMarkup.CodeMirror.XmlEditor],
        props: {
            "SchemaInfo": {
                get: function () {
                    var xmlIntellisenseInfos = Bridge.CustomUIMarkup.SemanticUI.Builder.Tags;
                    return Bridge.CustomUIMarkup.CodeMirror.SchemaInfo.CreateFrom(xmlIntellisenseInfos).ToJson();
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.TextArea", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.InputText],
        statics: {
            fields: {
                RowsProperty: null
            },
            ctors: {
                init: function () {
                    this.RowsProperty = System.Windows.DependencyProperty.Register$1("Rows", System.Nullable$1(System.Int32), Bridge.CustomUIMarkup.SemanticUI.TextArea, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.TextArea.OnRowsChanged));
                }
            },
            methods: {
                OnRowsChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.TextArea);
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
                    return Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.TextArea.RowsProperty)), System.Int32, true);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.TextArea.RowsProperty, Bridge.box(value, System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                }
            }
        },
        methods: {
            AfterInitDOM: function () {
                this._inputElement = Bridge.CustomUIMarkup.Common.DOM.textarea().appendTo(this._root);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_basic_button", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ui_button],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui basic button";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_header_1", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.header],
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_header_2", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.header],
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ui_header_3", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.header],
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
