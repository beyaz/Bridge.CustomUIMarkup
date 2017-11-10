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

    Bridge.define("Bridge.CustomUIMarkup.DesignerSamples.App", {
        main: function Main () {
            $(function () {
                    var $t;
                    Bridge.CustomUIMarkup.Common.ScriptLoader.LoadCssFile(Bridge.CustomUIMarkup.SemanticUI.VersionInfo.CssFile);
                    Bridge.CustomUIMarkup.Common.ScriptLoader.LoadCssFiles(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.CssFiles);

                    var scripts = new (System.Collections.Generic.List$1(System.String)).ctor();
                    scripts.addRange(Bridge.CustomUIMarkup.SemanticUI.VersionInfo.Scripts);
                    scripts.addRange(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.Scripts);

                    ($t = new Bridge.CustomUIMarkup.Common.ScriptLoader(), $t.Scripts = scripts, $t.OnLoacCompleted = Bridge.CustomUIMarkup.DesignerSamples.App.RenderUIEditor, $t).Load();
                });
        },
        statics: {
            props: {
                "TestUI": {
                    get: function () {
                        return "\r\n\r\n<Container >\r\n    \r\n    <ComboBox \r\n            ItemsSource = '{Binding Examples}' \r\n            DisplayMemberPath = 'Name'\r\n            SelectedValuePath = 'XmlTemplate' \r\n\t\t    SelectedValue = '{Binding CurrentTemplate}' />\r\n        \r\n    <UIEditor SourceText = '{CurrentTemplate}'  />\r\n        \r\n</Container>\r\n\r\n\r\n";
                    }
                }
            },
            methods: {
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
            GetIntellisenseInfos: function () {
                return new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo)).ctor();
            },
            BuildNode: function (xmlNode) {
                var $t, $t1;
                var tag = xmlNode.nodeName.toUpperCase();

                var controlType = this.CreateType(tag);

                if (controlType == null) {
                    throw new System.ArgumentException((System.String.format("NotRecognizedTag:", null) || "") + (tag || ""));
                }

                var instance = Bridge.createInstance(controlType);

                if (this["IsDesignMode"]) {
                    var lineNumber = Bridge.CustomUIMarkup.Common.Extensions.GetOriginalLineNumber(xmlNode, this._rootNode, this.XmlString);

                    this.LineNumberToControlMap.set(lineNumber, instance);
                }

                var frameworkElement = Bridge.as(instance, System.Windows.FrameworkElement);
                if (frameworkElement != null) {
                    frameworkElement.DataContext = this.DataContext;
                    frameworkElement.InitDOM();
                }

                $t = Bridge.getEnumerator(xmlNode.attributes);
                try {
                    while ($t.moveNext()) {
                        var nodeAttribute = $t.Current;
                        var name = nodeAttribute.nodeName;
                        var value = nodeAttribute.nodeValue;

                        var bi = System.Windows.Data.BindingInfo.TryParseExpression(value);
                        if (bi != null) {
                            bi.Source = this.DataContext;
                            bi.Target = instance;
                            bi.TargetPropertyName = name;

                            bi.Connect();

                            continue;
                        }

                        var targetProperty = System.ComponentModel.ReflectionHelper.FindProperty(instance, name);
                        if (targetProperty != null) {
                            if (Bridge.Reflection.isEnum(targetProperty.rt)) {
                                System.ComponentModel.ReflectionHelper.SetPropertyValue(instance, name, System.Enum.parse(targetProperty.rt, value, true));
                                continue;
                            }

                            var converterAttributes = System.Attribute.getCustomAttributes(targetProperty, System.ComponentModel.TypeConverterAttribute);
                            var firstConverterAtribute = converterAttributes != null ? System.Linq.Enumerable.from(converterAttributes).firstOrDefault(null, null) : null;
                            if (firstConverterAtribute != null) {
                                var converter = Bridge.cast(firstConverterAtribute, System.ComponentModel.TypeConverterAttribute);
                                var valueConverter = Bridge.cast(Bridge.createInstance(converter._type), System.Windows.Data.IValueConverter);
                                var convertedValue = valueConverter.System$Windows$Data$IValueConverter$Convert(value, Bridge.Reflection.getMembers(Bridge.getType(instance), 16, 284, name).rt, null, System.Globalization.CultureInfo.getCurrentCulture());

                                System.ComponentModel.ReflectionHelper.SetPropertyValue(instance, name, convertedValue);
                                continue;
                            }

                            System.ComponentModel.ReflectionHelper.SetPropertyValue(instance, name, Bridge.CustomUIMarkup.Common.ConvertHelper.ChangeType(value, targetProperty.rt));
                            continue;
                        }
                        var instanceAsBag = Bridge.as(instance, System.ComponentModel.Bag);
                        if (instanceAsBag != null) {
                            instanceAsBag.SetValue(name, value);
                            continue;
                        }

                        throw new System.MissingMemberException(name);
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
                        if (childNode.nodeType === 3 || childNode.nodeType === 8) {
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
            }
        }
    });

    Bridge.define("System.Windows.Markup.IAddChild", {
        $kind: "interface"
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

    /** @namespace System */

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
                Types: null
            }
        },
        methods: {
            GetIntellisenseInfos: function () {
                return function (_o1) {
                        var $t;
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Button", Bridge.CustomUIMarkup.SemanticUI.Button));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("TabPanel", Bridge.CustomUIMarkup.SemanticUI.TabPanel));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Tab", Bridge.CustomUIMarkup.SemanticUI.TabItem));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("card", Bridge.CustomUIMarkup.SemanticUI.card));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("TextInput", Bridge.CustomUIMarkup.SemanticUI.InputText));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("TextBox", Bridge.CustomUIMarkup.SemanticUI.InputText));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Combo", Bridge.CustomUIMarkup.SemanticUI.Combo));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("ComboBox", Bridge.CustomUIMarkup.SemanticUI.Combo));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("UniformGrid", Bridge.CustomUIMarkup.SemanticUI.UniformGrid));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("TextArea", Bridge.CustomUIMarkup.SemanticUI.TextArea));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Container", Bridge.CustomUIMarkup.SemanticUI.Container));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Stacked", Bridge.CustomUIMarkup.SemanticUI.stacked));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("GroupBox", Bridge.CustomUIMarkup.SemanticUI.GroupBox));
                        _o1.add(($t = new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Grid", Bridge.CustomUIMarkup.SemanticUI.Grid), $t.ChildrenTags = System.Array.init(["Row"], System.String), $t));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Field", Bridge.CustomUIMarkup.SemanticUI.Field));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Form", Bridge.CustomUIMarkup.SemanticUI.Form));
                        _o1.add(($t = new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Row", Bridge.CustomUIMarkup.SemanticUI.Row), $t.ChildrenTags = System.Array.init(["Column"], System.String), $t));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Column", Bridge.CustomUIMarkup.SemanticUI.Column));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Header1", Bridge.CustomUIMarkup.SemanticUI.Header1));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Header2", Bridge.CustomUIMarkup.SemanticUI.Header2));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Header3", Bridge.CustomUIMarkup.SemanticUI.Header3));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Image", Bridge.CustomUIMarkup.SemanticUI.Image));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Icon", Bridge.CustomUIMarkup.SemanticUI.Icon));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("Segment", Bridge.CustomUIMarkup.SemanticUI.Segment));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("TextBlock", System.Windows.Controls.TextBlock));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("XmlEditor", Bridge.CustomUIMarkup.CodeMirror.XmlEditor));
                        _o1.add(new Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo("UIEditor", Bridge.CustomUIMarkup.Design.UIEditor));
                        return _o1;
                    }(new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo)).ctor());
            },
            CreateType: function (tag) {
                var $t;
                if (Bridge.CustomUIMarkup.SemanticUI.Builder.Types == null) {
                    Bridge.CustomUIMarkup.SemanticUI.Builder.Types = new (System.Collections.Generic.Dictionary$2(System.String,Function))();
                    $t = Bridge.getEnumerator(this.GetIntellisenseInfos(), Bridge.CustomUIMarkup.UI.Design.XmlIntellisenseInfo);
                    try {
                        while ($t.moveNext()) {
                            var intellisenseInfo = $t.Current;
                            Bridge.CustomUIMarkup.SemanticUI.Builder.Types.set(intellisenseInfo.TagName.toUpperCase(), intellisenseInfo.Type);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}
                if (Bridge.CustomUIMarkup.SemanticUI.Builder.Types.containsKey(tag)) {
                    return Bridge.CustomUIMarkup.SemanticUI.Builder.Types.get(tag);
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
        inherits: [System.Windows.DependencyObject],
        statics: {
            fields: {
                MarginLeftProperty: null,
                MarginRightProperty: null,
                MarginBottomProperty: null,
                MarginTopProperty: null,
                PaddingLeftProperty: null,
                PaddingRightProperty: null,
                PaddingBottomProperty: null,
                PaddingTopProperty: null,
                TextWrappingProperty: null,
                FontWeightProperty: null,
                FontSizeProperty: null,
                WidthProperty: null,
                ColorProperty: null,
                "InnerHTMLProperty": null,
                VisibilityProperty: null,
                HeightProperty: null,
                BackgroundProperty: null,
                "ID": 0
            },
            ctors: {
                init: function () {
                    this.MarginLeftProperty = System.Windows.DependencyProperty.Register$1("MarginLeft", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnMarginLeftChanged));
                    this.MarginRightProperty = System.Windows.DependencyProperty.Register$1("MarginRight", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnMarginRightChanged));
                    this.MarginBottomProperty = System.Windows.DependencyProperty.Register$1("MarginBottom", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnMarginBottomChanged));
                    this.MarginTopProperty = System.Windows.DependencyProperty.Register$1("MarginTop", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnMarginTopChanged));
                    this.PaddingLeftProperty = System.Windows.DependencyProperty.Register$1("PaddingLeft", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnPaddingLeftChanged));
                    this.PaddingRightProperty = System.Windows.DependencyProperty.Register$1("PaddingRight", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnPaddingRightChanged));
                    this.PaddingBottomProperty = System.Windows.DependencyProperty.Register$1("PaddingBottom", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnPaddingBottomChanged));
                    this.PaddingTopProperty = System.Windows.DependencyProperty.Register$1("PaddingTop", System.Nullable$1(System.Double), System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnPaddingTopChanged));
                    this.TextWrappingProperty = System.Windows.DependencyProperty.Register$1("TextWrapping", System.Windows.TextWrapping, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnTextWrappingChanged));
                    this.FontWeightProperty = System.Windows.DependencyProperty.Register$1("FontWeight", System.Double, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnFontWeightChanged));
                    this.FontSizeProperty = System.Windows.DependencyProperty.Register$1("FontSize", System.Double, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnFontSizeChanged));
                    this.WidthProperty = System.Windows.DependencyProperty.Register$1("Width", System.Double, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnWidthChanged));
                    this.ColorProperty = System.Windows.DependencyProperty.Register$1("Color", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnColorChanged));
                    this["InnerHTMLProperty"] = System.Windows.DependencyProperty.Register$1("InnerHTML", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnInnerHTMLChanged));
                    this.VisibilityProperty = System.Windows.DependencyProperty.Register$1("Visibility", System.Windows.Visibility, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnVisibilityChanged));
                    this.HeightProperty = System.Windows.DependencyProperty.Register$1("Height", System.Double, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnHeightChanged));
                    this.BackgroundProperty = System.Windows.DependencyProperty.Register$1("Background", System.String, System.Windows.FrameworkElement, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnBackgroundChanged));
                }
            },
            methods: {
                OnMarginLeftChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("marginLeft", "");
                        return;
                    }

                    me._root.css("marginLeft", System.Nullable.toString(value, System.Double.format) + "px");
                },
                OnMarginRightChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("marginRight", "");
                        return;
                    }

                    me._root.css("marginRight", System.Nullable.toString(value, System.Double.format) + "px");
                },
                OnMarginBottomChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("marginBottom", "");
                        return;
                    }

                    me._root.css("marginBottom", System.Nullable.toString(value, System.Double.format) + "px");
                },
                OnMarginTopChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("marginTop", "");
                        return;
                    }

                    me._root.css("marginTop", System.Nullable.toString(value, System.Double.format) + "px");
                },
                OnPaddingLeftChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("PaddingLeft", "");
                        return;
                    }

                    me._root.css("paddingLeft", System.Nullable.toString(value, System.Double.format) + "px");
                },
                OnPaddingRightChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("PaddingRight", "");
                        return;
                    }

                    me._root.css("paddingRight", System.Nullable.toString(value, System.Double.format) + "px");
                },
                OnPaddingBottomChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("PaddingBottom", "");
                        return;
                    }

                    me._root.css("paddingBottom", System.Nullable.toString(value, System.Double.format) + "px");
                },
                OnPaddingTopChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    var value = Bridge.cast(Bridge.unbox(e.NewValue), System.Double, true);

                    if (value == null) {
                        me._root.css("PaddingTop", "");
                        return;
                    }

                    me._root.css("paddingTop", System.Nullable.toString(value, System.Double.format) + "px");
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
                OnFontWeightChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    me._root.css("fontWeight", Bridge.unbox(e.NewValue));
                },
                OnFontSizeChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    me._root.css("fontSize", System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Double)));
                },
                OnWidthChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    me._root.css("width", Bridge.unbox(e.NewValue));
                },
                OnColorChanged: function (d, e) {
                    var me = Bridge.cast(d, System.Windows.FrameworkElement);

                    me._root.css("color", Bridge.unbox(e.NewValue));
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
                OnHeightChanged: function (d, e) {
                    var fe = Bridge.cast(d, System.Windows.FrameworkElement);

                    if (e.NewValue == null) {
                        fe._root.css("height", "");
                        return;
                    }

                    fe._root.css("height", Bridge.unbox(e.NewValue));
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
            MarginLeft: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("MarginLeft")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("MarginLeft", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            MarginRight: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("MarginRight")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("MarginRight", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            MarginBottom: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("MarginBottom")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("MarginBottom", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            MarginTop: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("MarginTop")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("MarginTop", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingLeft: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("PaddingLeft")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("PaddingLeft", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingRight: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("PaddingRight")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("PaddingRight", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingBottom: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("PaddingBottom")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("PaddingBottom", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
                }
            },
            PaddingTop: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.getItem("PaddingTop")), System.Double, true);
                },
                set: function (value) {
                    this.setItem("PaddingTop", Bridge.box(value, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode)));
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
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("FontSize")), System.Double));
                },
                set: function (value) {
                    this.setItem("FontSize", Bridge.box(value, System.Double, System.Double.format, System.Double.getHashCode));
                }
            },
            Width: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("Width")), System.Double));
                },
                set: function (value) {
                    this.setItem("Width", Bridge.box(value, System.Double, System.Double.format, System.Double.getHashCode));
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
            SetValue$1: function (dp, value) {
                this.setItem(dp.Name, value);
            },
            InitDOM: function () { },
            AddChild: function (element) {
                if (this._childeren == null) {
                    this._childeren = new (System.Collections.Generic.List$1(System.Windows.FrameworkElement)).ctor();
                }
                this._childeren.add(element);
            },
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
                FontSizeProperty: null,
                TextProperty: null
            },
            props: {
                CssFiles: {
                    get: function () {
                        return System.Array.init(["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/codemirror.css", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/hint/show-hint.css"], System.String);
                    }
                },
                Scripts: {
                    get: function () {
                        return System.Array.init(["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/codemirror.js", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/hint/show-hint.js", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/hint/xml-hint.js", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/mode/xml/xml.js", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/edit/closetag.js", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/foldcode.js", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/xml-fold.js"], System.String);
                    }
                }
            },
            ctors: {
                init: function () {
                    this.FontSizeProperty = System.Windows.DependencyProperty.Register$1("FontSize", System.Int32, Bridge.CustomUIMarkup.CodeMirror.XmlEditor, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.FontSizeChanged));
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.CodeMirror.XmlEditor, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.CodeMirror.XmlEditor.TextChanged));
                }
            },
            methods: {
                FontSizeChanged: function (d, e) {
                    var fontSize = System.Nullable.getValue(Bridge.cast(Bridge.unbox(e.NewValue), System.Int32));

                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.CodeMirror.XmlEditor);

                    if (me._editor != null) {
                        if (me.isFiring_OnTextChanged) {
                            return;
                        }

                        me._editor.display.wrapper.style.fontSize = fontSize + 'px';
                        me._editor.refresh();
                    }
                },
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
            _cursorCurrentLineNumber: 0
        },
        events: {
            OnTextChanged: null,
            OnCursorLineNumberChanged: null
        },
        props: {
            FontSize$1: {
                get: function () {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.getItem("FontSize")), System.Int32));
                },
                set: function (value) {
                    this.setItem("FontSize", Bridge.box(value, System.Int32));
                }
            },
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
                this.FontSize$1 = 12;
            }
        },
        methods: {
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
                var fontSize = this.FontSize$1;

                var xmlIntellisenseInfos = new Bridge.CustomUIMarkup.SemanticUI.Builder().GetIntellisenseInfos();
                var schemaInfo = Bridge.CustomUIMarkup.CodeMirror.SchemaInfo.CreateFrom(xmlIntellisenseInfos).ToJson();

                


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
	return completeAfter(cm, function() {
	  var tok = cm.getTokenAt(cm.getCursor());
	  if (tok.type == 'string' && (!/['']/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)) return false;
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
    autoCloseTags:true


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
            UniformGrid: null,
            _builder: null,
            _sourceText: null,
            _sourceDataContext: null
        },
        props: {
            Container: {
                get: function () {
                    return System.Array.getItem(this.UniformGrid.Childeren, 1, System.Windows.FrameworkElement).Root;
                }
            },
            Template: {
                get: function () {
                    return "\r\n<Container>\r\n    <XmlEditor Text ='{SourceText}' \r\n        OnTextChanged = '{OnTextChanged}' \r\n        OnCursorLineNumberChanged = '{OnCursorLineNumberChanged}' \r\n        Height='400' />\r\n    <Container Background='#f3f5f6' />\r\n</Container>";
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
                var $t;
                var ui = ($t = new Bridge.CustomUIMarkup.SemanticUI.Builder(), $t.XmlString = this.Template, $t.DataContext = this, $t).Build();

                this.UniformGrid = Bridge.cast(ui, Bridge.CustomUIMarkup.SemanticUI.Container);

                this._root = this.UniformGrid.Root;
            },
            OnCursorLineNumberChanged: function (lineNumber) {
                this._builder != null ? this._builder.FocusToLine(lineNumber) : null;
            },
            OnTextChanged: function () {
                var $t;
                this.Container.empty();

                if (System.String.isNullOrWhiteSpace(this.SourceText)) {
                    return;
                }

                this._builder = ($t = new Bridge.CustomUIMarkup.SemanticUI.Builder(), $t.XmlString = this.SourceText, $t.DataContext = this.SourceDataContext, $t["IsDesignMode"] = true, $t);

                var component = null;

                try {
                    component = this._builder.Build();
                    Bridge.cast(component, System.Windows.FrameworkElement).Root.appendTo(this.Container);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    var e;
                    if (Bridge.is($e1, System.Xml.XmlException)) {

                    } else {
                        e = $e1;
                        this.Container.html(e.toString());
                    }
                }
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
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "StackPanel", $t.XmlTemplate = "\r\n\r\n\r\n<StackPanel Orientation='Horizontal'>\r\n  \r\n    <Icon Type='Setting' Color='#ffbb00' FontSize='17' />\r\n  \r\n  \t<TextBlock Width='80' Text='Start Date:' Color='#888888' FontSize='13' FontWeight='600' TextWrapping='NoWrap' />\r\n  \t\r\n  \t<TextBlock Text='November 1, 2017 15:30' Color='#888888' FontSize='12' FontWeight='600' TextWrapping='NoWrap' />\r\n\r\n</StackPanel>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "copy", $t.XmlTemplate = "\r\n\r\n\r\n<Grid>\r\n  \r\n    <Column Width='27' Align='Center'>\r\n        <Icon Type='Setting' Color='#ffbb00' FontSize='17' />\r\n    </Column>\r\n  \r\n  \t<Column Width='80'>\r\n        <TextBlock Text='Start Date:' Color='#888888' FontSize='13' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n  \t\r\n  \t<Column   Align='Left' >\r\n        <TextBlock Text='November 1, 2017 15:30' Color='#888888' FontSize='12' FontWeight='600' TextWrapping='NoWrap' />\r\n    </Column>\r\n</Grid>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "properties", $t.XmlTemplate = "\r\n<Grid>\n    <column IsRightAligned ='True' Wide='15'>\n        <Button Text='Aloha'  />    \n    </column>\n</Grid>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Layout", $t.XmlTemplate = "\r\n\r\n<GroupBox Header='Yellow -> GroupBox' Background='Yellow' >\r\n    <Container Background='Blue' Height='300'>\r\n        <Grid  Background='Green'>\r\n            <Row> \r\n\t            <Container  Background='Yellow' Height='30'/>\r\n\t            <Container  Background='Yellow' Height='30'/>\r\n            </Row>\r\n            <Row> \r\n\t            <Container  Background='Yellow' Height='30'/>\r\n            </Row>\r\n            <Row> \r\n\t            <Container  Background='Yellow' Height='30'/>\r\n\t            <Container  Background='Yellow' Height='30' /> \r\n            </Row>\r\n            <Row> \r\n\t            <StackPanel  Background='Red' Height='50'>\r\n\t                <Container  Background='Blue' Height='10' />     \r\n\t                <Container  Background='Yellow' Height='10' />     \r\n\t                <StackPanel  Background='Blue' Height='10' />     \r\n\t            </StackPanel>\r\n            </Row>\r\n        </Grid>\r\n    </Container> \r\n\r\n</GroupBox>\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Simple", $t.XmlTemplate = "\r\n\r\n<GroupBox Header='Group Header'>\r\n    <Container>\r\n\r\n        <UniformGrid>\r\n\t        <textInput Value ='A'  PlaceHolder='Write 1' />\r\n\t        <textInput   PlaceHolder='Write 2' />\r\n            \r\n        </UniformGrid>\r\n\r\n        <TextArea PlaceHolder='Write your ui here' Rows='5' />\r\n\r\n    </Container>\r\n\r\n</GroupBox>\r\n\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Form", $t.XmlTemplate = "\r\n\r\n\r\n<Form>\r\n       \r\n       <Field Value ='A'  Label='yy' PlaceHolder='Write 1' />\r\n       <Field Value ='A'  PlaceHolder='Write 1' />\r\n       <StackPanel>\r\n           <Field Value ='A'  PlaceHolder='Write 1' />\r\n       </StackPanel>\r\n       \r\n       <UniformGrid>\r\n           <Field Value ='1' Label='1' PlaceHolder='Write 1' />\r\n           <Field Value ='2'  PlaceHolder='Write 1' />\r\n           <Field Value ='2'  PlaceHolder='Write 1' />\r\n           <Field Value ='2'  PlaceHolder='Write 1' />\r\n       </UniformGrid>\r\n       \r\n        <Container>\r\n           <Field Value ='1'  PlaceHolder='Write 1' />\r\n           <Field Value ='2'  PlaceHolder='Write 1' />\r\n       </Container>\r\n\r\n</Form>\r\n\r\n\r\n\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Gravity in Columns", $t.XmlTemplate = "\r\n<Grid  Background='Black'>\r\n    <Row> \r\n        <Column  Background='Yellow'   Gravity='2' >\r\n           \r\n        </Column>\r\n        <Column  Background='REd'    />\r\n        \r\n        <!-- stretch max height  -->\r\n        <Column  Background='Blue' Height='200' Gravity='2'   />\r\n    </Row> \r\n    \r\n</Grid>\r\n\r\n", $t));
                        _o1.add(($t = new Bridge.CustomUIMarkup.DesignerSamples.ExampleInfo(), $t.Name = "Form 2", $t.XmlTemplate = "\r\n\n\n<Form>\n    <Container>\n  \n    <GroupBox Header='İrtibat Bilgileri'>\n        <Grid>\n            <Row> \n                <Column >\n                   <Field Label='E-Posta'/>\n                   <Field Label='Telefon'/>\n                </Column>\n            </Row> \n        </Grid>\n    </GroupBox>\n    \n    <GroupBox Header='TESLİMAT BİLGİLERİ'>\n        <Grid>\n            <Row> \n                <Column >\n                    <Field Label='Adı'/>\n                    <Field Label='Soy Adı'/>\n                    <Field Label='Şehir'/>\n                     <Field Label='İlçe'/>\n                      <Field Label='Adres'/>\n                      <Field Label='TC Kimlik No (İsteğe Bağlı)'/>\n                </Column>\n            </Row> \n        </Grid>\n    </GroupBox>\n    \n    <Grid>\n        <Row>\n            <Column Gravity='7' />\n           \n            <Column >\n                <Button Text='İlerle'/>                \n            </Column>\n        </Row>\n    \n    </Grid>\n    \n    \n  </Container>\n</Form>\n\n\r\n", $t));
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

                this.AfterInitDOM();
            },
            AfterInitDOM: function () {

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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Field", {
        inherits: [System.Windows.FrameworkElement,System.Windows.Markup.IAddChild],
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.GroupBox", {
        inherits: [System.Windows.FrameworkElement,System.Windows.Markup.IAddChild],
        fields: {
            _h3: null,
            _container: null,
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
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        methods: {
            Add: function (element) {
                element.Root.appendTo(this._container);
            },
            InitDOM: function () {
                this._root = Bridge.CustomUIMarkup.Common.DOM.div("ui segment");

                this._h3 = Bridge.CustomUIMarkup.Common.DOM.h3("ui header").appendTo(this._root);

                this._container = Bridge.CustomUIMarkup.Common.DOM.div("container").appendTo(this._root);

                this.BindPropertyToInnerHTML("Header", this._h3);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Modal", {
        inherits: [System.Windows.FrameworkElement,System.Windows.Markup.IAddChild],
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
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        methods: {
            Add: function (element) {
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
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        methods: {
            Add: function (element) {
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
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        ctors: {
            init: function () {
                this._tabs = new (System.Collections.Generic.List$1(Bridge.CustomUIMarkup.SemanticUI.TabItem)).ctor();
            }
        },
        methods: {
            Add: function (element) {
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.UniformGrid", {
        inherits: [System.Windows.FrameworkElement,System.Windows.Markup.IAddChild],
        fields: {
            row: null
        },
        props: {
            ColumnCount: {
                get: function () {
                    return this._childeren.Count;
                }
            },
            gridClass: {
                get: function () {
                    return "ui " + (Bridge.CustomUIMarkup.SemanticUI.NumberToWord.ToWord(this.ColumnCount) || "") + " column grid";
                }
            }
        },
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.FrameworkElement.ctor.call(this);
                this._childeren = new (System.Collections.Generic.List$1(System.Windows.FrameworkElement)).ctor();
            }
        },
        methods: {
            getItem$1: function (columnIndex) {
                return this._childeren.getItem(columnIndex);
            },
            Add: function (element) {
                var columnDiv = Bridge.CustomUIMarkup.Common.DOM.div("column").appendTo(this.row);

                element.Root.appendTo(columnDiv);

                this._childeren.add(element);
            },
            InitDOM: function () {
                this._root = Bridge.CustomUIMarkup.Common.DOM.div("ui equal width grid");

                this.row = Bridge.CustomUIMarkup.Common.DOM.div("row").appendTo(this._root);
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Button", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null,
                "IsActiveProperty": null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.SemanticUI.Button, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.Button.TextChanged));
                    this["IsActiveProperty"] = System.Windows.DependencyProperty.Register$1("IsActive", System.Boolean, Bridge.CustomUIMarkup.SemanticUI.Button, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.Button.IsActiveChanged));
                }
            },
            methods: {
                TextChanged: function (d, e) {
                    Bridge.cast(d, System.Windows.FrameworkElement)._root.html(Bridge.as(e.NewValue, System.String));
                },
                IsActiveChanged: function (d, e) {
                    Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.Button).AddCssClassOnTrueElseRemove(e.NewValue, "active");
                }
            }
        },
        props: {
            HtmlTag: {
                get: function () {
                    return "button";
                }
            },
            HtmlClassName: {
                get: function () {
                    return "ui button";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.ElementContainer", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase,System.Windows.Markup.IAddChild],
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        methods: {
            BeforeAddChild: function (element) {

            },
            AfterAddChild: function (element) {

            },
            Add: function (element) {
                element._root.appendTo(this._root);

                this.AddChild(element);
            },
            AddChild: function (element) {
                this.BeforeAddChild(element);
                Bridge.CustomUIMarkup.SemanticUI.ElementBase.prototype.AddChild.call(this, element);
                this.AfterAddChild(element);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.description", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase]
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Grid", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase,System.Windows.Markup.IAddChild],
        props: {
            AllChildrenAreColumn: {
                get: function () {
                    var $t;
                    $t = Bridge.getEnumerator(this.Childeren, System.Windows.FrameworkElement);
                    try {
                        while ($t.moveNext()) {
                            var child = $t.Current;
                            if (!(Bridge.is(child, Bridge.CustomUIMarkup.SemanticUI.Column))) {
                                return false;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    return true;
                }
            },
            ClassName: {
                get: function () {
                    if (this.ChildrenCount === 0) {
                        return "ui grid";
                    }

                    if (this.AllChildrenAreColumn) {
                        return "ui " + (Bridge.CustomUIMarkup.SemanticUI.NumberToWord.ToWord(System.Array.getCount(this.Childeren, System.Windows.FrameworkElement)) || "") + " column grid";
                    }

                    return "ui grid";
                }
            }
        },
        alias: ["Add", "System$Windows$Markup$IAddChild$Add"],
        methods: {
            Add: function (element) {
                element.Root.appendTo(this._root);

                this.AddChild(element);

                this.UpdateClassName();
            },
            InitDOM: function () {
                this._root = Bridge.CustomUIMarkup.Common.DOM.div();
                this.UpdateClassName();
            },
            UpdateClassName: function () {
                this._root.attr("class", this.ClassName);
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Header", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                TextProperty: null
            },
            ctors: {
                init: function () {
                    this.TextProperty = System.Windows.DependencyProperty.Register$1("Text", System.String, Bridge.CustomUIMarkup.SemanticUI.Header, new System.Windows.PropertyMetadata.$ctor1(System.Windows.FrameworkElement.OnInnerHTMLChanged));
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Image", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementBase],
        statics: {
            fields: {
                SrcProperty: null
            },
            ctors: {
                init: function () {
                    this.SrcProperty = System.Windows.DependencyProperty.Register$1("Src", System.String, Bridge.CustomUIMarkup.SemanticUI.Image, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.Image.OnSrcChanged));
                }
            },
            methods: {
                OnSrcChanged: function (d, e) {
                    var me = Bridge.cast(d, Bridge.CustomUIMarkup.SemanticUI.Image);

                    var newValue = Bridge.cast(e.NewValue, System.String);

                    me["_elementImage"].attr("Src", newValue);
                }
            }
        },
        fields: {
            "_elementImage": null
        },
        props: {
            Src: {
                get: function () {
                    return Bridge.cast(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.Image.SrcProperty), System.String);
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.Image.SrcProperty, value);
                }
            }
        },
        methods: {
            InitDOM: function () {
                this._root = Bridge.CustomUIMarkup.Common.DOM.button("ui image");
                this["_elementImage"] = Bridge.CustomUIMarkup.Common.DOM.img().appendTo(this._root);
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.card", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer]
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Column", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer],
        statics: {
            fields: {
                WideProperty: null
            },
            ctors: {
                init: function () {
                    this.WideProperty = System.Windows.DependencyProperty.Register$1("Wide", System.Int32, Bridge.CustomUIMarkup.SemanticUI.Column, new System.Windows.PropertyMetadata.$ctor1(Bridge.CustomUIMarkup.SemanticUI.Column.WideChanged));
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
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.GetValue$1(Bridge.CustomUIMarkup.SemanticUI.Column.WideProperty)), System.Int32));
                },
                set: function (value) {
                    this.SetValue$1(Bridge.CustomUIMarkup.SemanticUI.Column.WideProperty, Bridge.box(value, System.Int32));
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Container", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui container";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.content", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer]
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Form", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui form";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Header1", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.Header],
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Header2", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.Header],
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Header3", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.Header],
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Row", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer],
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

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.Segment", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui segment";
                }
            }
        }
    });

    Bridge.define("Bridge.CustomUIMarkup.SemanticUI.stacked", {
        inherits: [Bridge.CustomUIMarkup.SemanticUI.ElementContainer],
        props: {
            HtmlClassName: {
                get: function () {
                    return "ui stacked";
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
                    return Bridge.cast(Bridge.unbox(this.getItem("Rows")), System.Int32, true);
                },
                set: function (value) {
                    this.setItem("Rows", Bridge.box(value, System.Int32, System.Nullable.toString, System.Nullable.getHashCode));
                }
            }
        },
        methods: {
            AfterInitDOM: function () {
                this._inputElement = Bridge.CustomUIMarkup.Common.DOM.textarea().appendTo(this._root);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkNvZGVNaXJyb3IvU2NoZW1hSW5mby5jcyIsIi5OZXQgT3ZlcnJpZGUvU3lzdGVtL0NvbXBvbmVudE1vZGVsL0JhZy5jcyIsIkNvbW1vbi9Db252ZXJ0SGVscGVyLmNzIiwiQ29tbW9uL0RPTS5jcyIsIkNvbW1vbi9FeHRlbnNpb25zLmNzIiwiQ29tbW9uL1NjcmlwdExvYWRlci5jcyIsIkJyaWRnZS5DdXN0b21VSU1hcmt1cC5EZXNpZ25lclNhbXBsZXMvQXBwLmNzIiwiVUkvRGVzaWduL0J1aWxkZXIuY3MiLCJTZW1hbnRpY1VJL051bWJlclRvV29yZC5jcyIsIlNlbWFudGljVUkvVmVyc2lvbkluZm8uY3MiLCJVSS9EZXNpZ24vQmluZGVyLmNzIiwiVUkvRGVzaWduL0JpbmRlckV2ZW50QXR0cmlidXRlUmVzb2x2ZXIuY3MiLCJCcmlkZ2UualF1ZXJ5Mi9FeHRlbnNpb25zLmNzIiwiLk5ldCBPdmVycmlkZS9TeXN0ZW0vQ29tcG9uZW50TW9kZWwvQmFnQ2hhbmdlZEV2ZW50QXJncy5jcyIsIi5OZXQgT3ZlcnJpZGUvU3lzdGVtL0NvbXBvbmVudE1vZGVsL1JlZmxlY3Rpb25IZWxwZXIuY3MiLCIuTmV0IE92ZXJyaWRlL1N5c3RlbS5Db21wb25lbnRNb2RlbC9UeXBlQ29udmVydGVyQXR0cmlidXRlLmNzIiwiLk5ldCBPdmVycmlkZS9TeXN0ZW0uY3MiLCIuTmV0IE92ZXJyaWRlL1N5c3RlbS9FeHRlbnNpb25zLmNzIiwiLk5ldCBPdmVycmlkZS9TeXN0ZW0uV2luZG93cy5EYXRhL0JpbmRpbmdJbmZvLmNzIiwiLk5ldCBPdmVycmlkZS9TeXN0ZW0uV2luZG93cy9EZXBlbmRlbmN5UHJvcGVydHkuY3MiLCIuTmV0IE92ZXJyaWRlL1N5c3RlbS5XaW5kb3dzL1Byb3BlcnR5TWV0YWRhdGEuY3MiLCIuTmV0IE92ZXJyaWRlL1N5c3RlbS5XaW5kb3dzL1Byb3BlcnR5UGF0aC5jcyIsIi5OZXQgT3ZlcnJpZGUvU3lzdGVtLlhtbC5jcyIsIlNlbWFudGljVUkvQnVpbGRlci5jcyIsIi5OZXQgT3ZlcnJpZGUvU3lzdGVtLldpbmRvd3MuQ29udHJvbHMvQm9vbGVhblRvVmlzaWJpbGl0eUNvbnZlcnRlci5jcyIsIi5OZXQgT3ZlcnJpZGUvU3lzdGVtLldpbmRvd3MuRGF0YS9IVE1MQmluZGluZ0luZm8uY3MiLCIuTmV0IE92ZXJyaWRlL1N5c3RlbS5XaW5kb3dzL0ZyYW1ld29ya0VsZW1lbnQuY3MiLCJDb2RlTWlycm9yL1htbEVkaXRvci5jcyIsIkJyaWRnZS5DdXN0b21VSU1hcmt1cC5EZXNpZ24vVUlFZGl0b3IuY3MiLCJTZW1hbnRpY1VJL0VsZW1lbnRCYXNlLmNzIiwiU2VtYW50aWNVSS9Db21iby5jcyIsIlNlbWFudGljVUkvRmllbGQuY3MiLCJTZW1hbnRpY1VJL0dyb3VwQm94LmNzIiwiU2VtYW50aWNVSS9Nb2RhbC5jcyIsIlNlbWFudGljVUkvVGFiSXRlbS5jcyIsIlNlbWFudGljVUkvVGFiUGFuZWwuY3MiLCJTZW1hbnRpY1VJL1VuaWZvcm1HcmlkLmNzIiwiLk5ldCBPdmVycmlkZS9TeXN0ZW0uV2luZG93cy5Db250cm9scy9UZXh0QmxvY2suY3MiLCJTZW1hbnRpY1VJL0J1dHRvbi5jcyIsIlNlbWFudGljVUkvRWxlbWVudENvbnRhaW5lci5jcyIsIlNlbWFudGljVUkvR3JpZC5jcyIsIlNlbWFudGljVUkvSGVhZGVyLmNzIiwiU2VtYW50aWNVSS9JY29uLmNzIiwiU2VtYW50aWNVSS9JbWFnZS5jcyIsIlNlbWFudGljVUkvSW5wdXRUZXh0LmNzIiwiU2VtYW50aWNVSS9jb2x1bW4uY3MiLCJTZW1hbnRpY1VJL0NvbnRhaW5lci5jcyIsIlNlbWFudGljVUkvRm9ybS5jcyIsIlNlbWFudGljVUkvcm93LmNzIiwiU2VtYW50aWNVSS9TZWdtZW50LmNzIiwiU2VtYW50aWNVSS9zdGFja2VkLmNzIiwiU2VtYW50aWNVSS9UZXh0QXJl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QSxJQUFJQTt3QkFFQUEsOEJBQThCQTs7Ozs7Ozs7b0JBVjVCQSxPQUFPQSxZQUFNQTs7O29CQUNiQSxxQkFBZUE7Ozs7OztnQkFWckJBLHFCQUFnQkEscURBQXdCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cztcclxudXNpbmcgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlVJLkRlc2lnbjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuQ29kZU1pcnJvclxyXG57XHJcbiAgICBjbGFzcyBUYWdJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG4gICAgICAgIHB1YmxpYyBJQ29sbGVjdGlvbjxBdHRyaWJ1dGVJbmZvPiBBdHRyaWJ1dGVzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSUNvbGxlY3Rpb248c3RyaW5nPiBDaGlsZHJlblRhZ3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEF0dHJpYnV0ZUluZm9cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSUNvbGxlY3Rpb248c3RyaW5nPiBWYWx1ZXMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBTY2hlbWFJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG4gICAgICAgIHB1YmxpYyBJQ29sbGVjdGlvbjxUYWdJbmZvPiBUYWdzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgRm9yY2VUb0xvYWREZXBlbmRlbmN5UHJvcGVydGllcyhUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UodHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU2NoZW1hSW5mbyBDcmVhdGVGcm9tKElFbnVtZXJhYmxlPFhtbEludGVsbGlzZW5zZUluZm8+IGludGVsbGlzZW5zZUluZm9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNjaGVtYUluZm8gPSBuZXcgU2NoZW1hSW5mb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUYWdzID0gbmV3IExpc3Q8VGFnSW5mbz4oKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBhaXIgaW4gaW50ZWxsaXNlbnNlSW5mb3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gcGFpci5UYWdOYW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBwYWlyLlR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgRm9yY2VUb0xvYWREZXBlbmRlbmN5UHJvcGVydGllcyh0eXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gbmV3IFRhZ0luZm9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBOYW1lID0gbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzID0gbmV3IExpc3Q8QXR0cmlidXRlSW5mbz4oKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHZhciBkZXBlbmRlbmN5UHJvcGVydGllcyA9IERlcGVuZGVuY3lQcm9wZXJ0eS5HZXRBbGxQcm9wZXJ0aWVzKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGRwIGluIGRlcGVuZGVuY3lQcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVJbmZvID0gbmV3IEF0dHJpYnV0ZUluZm8ge05hbWUgPSBkcC5OYW1lfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHAuUHJvcGVydHlUeXBlID09IHR5cGVvZihib29sKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUluZm8uVmFsdWVzID0gbmV3W10ge1widHJ1ZVwiLCBcImZhbHNlXCJ9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRwLlByb3BlcnR5VHlwZS5Jc0VudW0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVJbmZvLlZhbHVlcyA9IEVudW0uR2V0TmFtZXMoZHAuUHJvcGVydHlUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRhZy5BdHRyaWJ1dGVzLkFkZChhdHRyaWJ1dGVJbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYWlyLkNoaWxkcmVuVGFncyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZy5DaGlsZHJlblRhZ3MgPSBwYWlyLkNoaWxkcmVuVGFncztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjaGVtYUluZm8uVGFncy5BZGQodGFnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYUluZm87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb2JqZWN0IFRvSnNvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBPYmplY3RMaXRlcmFsLkNyZWF0ZTxvYmplY3Q+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdGFnIGluIFRhZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gT2JqZWN0TGl0ZXJhbC5DcmVhdGU8b2JqZWN0PigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhdHRyaWJ1dGVJbmZvIGluIHRhZy5BdHRyaWJ1dGVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlSW5mby5OYW1lXSA9IGF0dHJpYnV0ZUluZm8uVmFsdWVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0YWdPYmogPSBPYmplY3RMaXRlcmFsLkNyZWF0ZTxvYmplY3Q+KCk7XHJcbiAgICAgICAgICAgICAgICB0YWdPYmpbXCJhdHRyc1wiXSA9IGF0dHJpYnV0ZXM7XHJcbiAgICAgICAgICAgICAgICB0YWdPYmpbXCJjaGlsZHJlblwiXSA9IHRhZy5DaGlsZHJlblRhZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbdGFnLk5hbWVdID0gdGFnT2JqO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5Db21wb25lbnRNb2RlbFxyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gICAgIFRoZSBiYWdcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAvLy8gPHNlZWFsc28gY3JlZj1cIlN5c3RlbS5Db21wb25lbnRNb2RlbC5JTm90aWZ5UHJvcGVydHlDaGFuZ2VkXCIgLz5cclxuICAgIFtTZXJpYWxpemFibGVdXHJcbiAgICBwdWJsaWMgY2xhc3MgQmFnIDogSU5vdGlmeVByb3BlcnR5Q2hhbmdlZFxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gRmllbGRzXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgVGhlIGVudHJpZXNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IF9lbnRyaWVzID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCk7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBJbmRleGVyc1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIEdldHMgb3Igc2V0cyB0aGUgPHNlZSBjcmVmPVwiU3lzdGVtLk9iamVjdFwiIC8+IHdpdGggdGhlIHNwZWNpZmllZCBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx2YWx1ZT5cclxuICAgICAgICAvLy8gICAgIFRoZSA8c2VlIGNyZWY9XCJTeXN0ZW0uT2JqZWN0XCIgLz4uXHJcbiAgICAgICAgLy8vIDwvdmFsdWU+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicHJvcGVydHlOYW1lXCI+TmFtZSBvZiB0aGUgcHJvcGVydHkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBuZXcgb2JqZWN0IHRoaXNbc3RyaW5nIHByb3BlcnR5TmFtZV1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBHZXRWYWx1ZShwcm9wZXJ0eU5hbWUpOyB9XHJcbiAgICAgICAgICAgIHNldCB7IFNldFZhbHVlKHByb3BlcnR5TmFtZSwgdmFsdWUpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG5hbWUgY29udGFpbnMga2V5LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicHJvcGVydHlOYW1lXCI+TmFtZSBvZiB0aGUgcHJvcGVydHkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+XHJcbiAgICAgICAgLy8vICAgICA8Yz50cnVlPC9jPiBpZiB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG5hbWUgY29udGFpbnMga2V5OyBvdGhlcndpc2UsIDxjPmZhbHNlPC9jPi5cclxuICAgICAgICAvLy8gPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zS2V5KHN0cmluZyBwcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2VudHJpZXMuQ29udGFpbnNLZXkocHJvcGVydHlOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG5hbWUgY29udGFpbnMga2V5LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicHJvcGVydHlOYW1lXCI+TmFtZSBvZiB0aGUgcHJvcGVydHkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+XHJcbiAgICAgICAgLy8vICAgICA8Yz50cnVlPC9jPiBpZiB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG5hbWUgY29udGFpbnMga2V5OyBvdGhlcndpc2UsIDxjPmZhbHNlPC9jPi5cclxuICAgICAgICAvLy8gPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zS2V5KEVudW0gcHJvcGVydHlOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvbnRhaW5zS2V5KHByb3BlcnR5TmFtZS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIEdldHMgdGhlIHZhbHVlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicHJvcGVydHlOYW1lXCI+TmFtZSBvZiB0aGUgcHJvcGVydHkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBvYmplY3QgR2V0VmFsdWUoc3RyaW5nIHByb3BlcnR5TmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9iamVjdCB2YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIF9lbnRyaWVzLlRyeUdldFZhbHVlKHByb3BlcnR5TmFtZSwgb3V0IHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgU2V0cyB0aGUgdmFsdWUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwcm9wZXJ0eU5hbWVcIj5OYW1lIG9mIHRoZSBwcm9wZXJ0eS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VmFsdWUoc3RyaW5nIHByb3BlcnR5TmFtZSwgb2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gR2V0VmFsdWUocHJvcGVydHlOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghUmVmZXJlbmNlRXF1YWxzKG9sZFZhbHVlLCBudWxsKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbHVlLkVxdWFscyh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfZW50cmllc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBJTm90aWZ5UHJvcGVydHlDaGFuZ2VkIE1lbWJlcnNcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBOb3RpZmllcyBjbGllbnRzIHRoYXQgYSBwcm9wZXJ0eSB2YWx1ZSBoYXMgY2hhbmdlZC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIFtmaWVsZDogTm9uU2VyaWFsaXplZF1cclxuICAgICAgICBwdWJsaWMgZXZlbnQgUHJvcGVydHlDaGFuZ2VkRXZlbnRIYW5kbGVyIFByb3BlcnR5Q2hhbmdlZDtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgQ2FsbGVkIHdoZW4gW3Byb3BlcnR5IGNoYW5nZWRdLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicHJvcFwiPlRoZSBwcm9wZXJ0eS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm5ld1ZhbHVlXCI+VGhlIG5ldyB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9sZFZhbHVlXCI+VGhlIG9sZCB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIHZvaWQgT25Qcm9wZXJ0eUNoYW5nZWQoc3RyaW5nIHByb3AsIG9iamVjdCBuZXdWYWx1ZSwgb2JqZWN0IG9sZFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvcGVydHlDaGFuZ2VkIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5Qcm9wZXJ0eUNoYW5nZWQuSW52b2tlKHRoaXMsIG5ldyBCYWdDaGFuZ2VkRXZlbnRBcmdzKHByb3AsIG5ld1ZhbHVlLCBvbGRWYWx1ZSkpKTpudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgQ2FsbGVkIHdoZW4gW3Byb3BlcnR5IGNoYW5nZWRdLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicHJvcFwiPlRoZSBwcm9wZXJ0eS48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgT25Qcm9wZXJ0eUNoYW5nZWQoc3RyaW5nIHByb3ApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eUNoYW5nZWQhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PlByb3BlcnR5Q2hhbmdlZC5JbnZva2UodGhpcywgbmV3IEJhZ0NoYW5nZWRFdmVudEFyZ3MocHJvcCkpKTpudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb25cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vICAgICBVdGlsaXR5IG1ldGhvZHMgZm9yIGNhc3Rpbmcgb3BlcmF0aW9uc1xyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgQ29udmVydEhlbHBlclxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG4gICAgICAgIHN0YXRpYyBJRm9ybWF0UHJvdmlkZXIgRm9ybWF0UHJvdmlkZXIge2dldHtyZXR1cm4gQ3VsdHVyZUluZm8uQ3VycmVudEN1bHR1cmU7fX1cclxuICAgICAgICAjZW5kcmVnaW9uIFxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvYmplY3QgQ2hhbmdlVHlwZSh0aGlzIG9iamVjdCB2YWx1ZSwgVHlwZSB0YXJnZXRUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENoYW5nZVR5cGUodmFsdWUsIHRhcmdldFR5cGUsIEZvcm1hdFByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IENoYW5nZVR5cGUodGhpcyBvYmplY3QgdmFsdWUsIFR5cGUgdGFyZ2V0VHlwZSwgSUZvcm1hdFByb3ZpZGVyIHByb3ZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInRhcmdldFR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0VHlwZS5Jc0NsYXNzIHx8IE51bGxhYmxlLkdldFVuZGVybHlpbmdUeXBlKHRhcmdldFR5cGUpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJAdmFsdWU6bnVsbCBjYW4gbm90IGNvbnZlcnRlZCB0byBAdGFyZ2V0VHlwZTpcIiArIHRhcmdldFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUuR2V0VHlwZSgpID09IHRhcmdldFR5cGUgfHwgdGFyZ2V0VHlwZS5Jc0luc3RhbmNlT2ZUeXBlKHZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdW5kZXJseWluZ1R5cGUgPSBOdWxsYWJsZS5HZXRVbmRlcmx5aW5nVHlwZSh0YXJnZXRUeXBlKTtcclxuICAgICAgICAgICAgaWYgKHVuZGVybHlpbmdUeXBlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFR5cGUgPSB1bmRlcmx5aW5nVHlwZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKGJvb2wpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9Cb29sZWFuKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRUeXBlID09IHR5cGVvZihjaGFyKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvQ2hhcih2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0VHlwZSA9PSB0eXBlb2Yoc2J5dGUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9TQnl0ZSh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0VHlwZSA9PSB0eXBlb2YoYnl0ZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0J5dGUodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKHNob3J0KSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvSW50MTYodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKHVzaG9ydCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub1VJbnQxNih2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0VHlwZSA9PSB0eXBlb2YoaW50KSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvSW50MzIodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKHVpbnQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9VSW50MzIodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKGxvbmcpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9JbnQ2NCh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0VHlwZSA9PSB0eXBlb2YodWxvbmcpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9VSW50NjQodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKGZsb2F0KSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvU2luZ2xlKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRUeXBlID09IHR5cGVvZihkb3VibGUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9Eb3VibGUodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKGRlY2ltYWwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9EZWNpbWFsKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRUeXBlID09IHR5cGVvZihEYXRlVGltZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0RhdGVUaW1lKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRUeXBlID09IHR5cGVvZihzdHJpbmcpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9TdHJpbmcodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldFR5cGUgPT0gdHlwZW9mKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIkB2YWx1ZTpcIiArIHZhbHVlICsgXCIgY2FuIG5vdCBjb252ZXJ0ZWQgdG8gQHRhcmdldFR5cGU6XCIgKyB0YXJnZXRUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVFRhcmdldFR5cGUgVG88VFRhcmdldFR5cGU+KHRoaXMgb2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChUVGFyZ2V0VHlwZSkgdmFsdWUuQ2hhbmdlVHlwZSh0eXBlb2YoVFRhcmdldFR5cGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuQ29tbW9uXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRE9NXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgalF1ZXJ5IGEoc3RyaW5nIGNsYXNzTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgalF1ZXJ5KERvY3VtZW50LkNyZWF0ZUVsZW1lbnQoXCJhXCIpKS5BZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBqUXVlcnkgYnV0dG9uKHN0cmluZyBjbGFzc05hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGpRdWVyeShEb2N1bWVudC5DcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKS5BZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBqUXVlcnkgZGl2KHN0cmluZyBjbGFzc05hbWUgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqUXVlcnkoRG9jdW1lbnQuQ3JlYXRlRWxlbWVudChcImRpdlwiKSkuQWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBqUXVlcnkgaDEoc3RyaW5nIGNsYXNzTmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGpRdWVyeShEb2N1bWVudC5DcmVhdGVFbGVtZW50KFwiaDFcIikpLkFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgalF1ZXJ5IGgyKHN0cmluZyBjbGFzc05hbWUgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqUXVlcnkoRG9jdW1lbnQuQ3JlYXRlRWxlbWVudChcImgyXCIpKS5BZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBoMyhzdHJpbmcgY2xhc3NOYW1lID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgalF1ZXJ5KERvY3VtZW50LkNyZWF0ZUVsZW1lbnQoXCJoM1wiKSkuQWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgalF1ZXJ5IGkoc3RyaW5nIGNsYXNzTmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSBuZXcgalF1ZXJ5KERvY3VtZW50LkNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcclxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbC5BZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBpbnB1dChzdHJpbmcgdHlwZSwgc3RyaW5nIGNsYXNzTmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGpRdWVyeShEb2N1bWVudC5DcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpLkF0dHIoXCJ0eXBlXCIsIHR5cGUpLkFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgalF1ZXJ5IGxhYmVsKHN0cmluZyBjbGFzc05hbWUgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqUXVlcnkoRG9jdW1lbnQuQ3JlYXRlRWxlbWVudChcImxhYmVsXCIpKS5BZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSB0ZXh0YXJlYShzdHJpbmcgY2xhc3NOYW1lID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgalF1ZXJ5KERvY3VtZW50LkNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKSkuQWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBpbWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqUXVlcnkoRG9jdW1lbnQuQ3JlYXRlRWxlbWVudChcImltZ1wiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLlhtbDtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuQ29tbW9uXHJcbntcclxuICAgIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICBcclxuXHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgR2V0T3JpZ2luYWxMaW5lTnVtYmVyKHRoaXMgWG1sTm9kZSBlbGVtZW50LCBYbWxOb2RlIHhtbFJvb3ROb2RlLCBzdHJpbmcgc0NvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBodHRwczovL2pzZmlkZGxlLm5ldC9nMTEzYzM1MC8zL1xyXG5cclxuICAgICAgICAgICAgU2NyaXB0LldyaXRlPGludD4oXHJcbiAgICAgICAgICAgICAgICBAXCJcclxuXHJcbiAgICB2YXIgc1RhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWU7XHJcbiAgICB2YXIgYU5vZGVMaXN0QnlUYWcgPSB4bWxSb290Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShzVGFnTmFtZSk7XHJcbiAgICB2YXIgaU1heEluZGV4ID0gMDtcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgYU5vZGVMaXN0QnlUYWcubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAoYU5vZGVMaXN0QnlUYWcuaXRlbShqKSA9PT0gZWxlbWVudCkge1xyXG4gICAgICAgICAgICBpTWF4SW5kZXggPSBqO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCc8JyArIHNUYWdOYW1lLCAnZycpO1xyXG4gICAgdmFyIG9mZnNldCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpTWF4SW5kZXg7IGkrKykge1xyXG4gICAgICAgIG9mZnNldCA9IHJlZ2V4LmV4ZWMoc0NvbnRlbnQpLmluZGV4O1xyXG4gICAgfVxyXG4gICAgdmFyIGxpbmUgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzQ29udGVudC5zdWJzdHJpbmcoMCwgb2Zmc2V0KS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChzQ29udGVudFtpXSA9PT0gJ1xcbicpIHtcclxuICAgICAgICAgICAgbGluZSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaW5lICsgMTtcclxuXHJcblwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgLy8gUmVTaGFycGVyIGRpc2FibGUgb25jZSBVbnVzZWRQYXJhbWV0ZXIuR2xvYmFsXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIEdldEVsZW1lbnRzQnlUYWdOYW1lSXNOb3RTdXBwb3J0aW5nKHRoaXMgRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5Xcml0ZTxib29sPihcImVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPT09IHVuZGVmaW5lZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc051bGxPcldoaXRlU3BhY2UodGhpcyBzdHJpbmcgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBSZW1vdmVGcm9tUGFyZW50KHRoaXMgalF1ZXJ5IHF1ZXJ5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcXVlcnkhPW51bGw/cXVlcnkuUmVtb3ZlKCk6KGpRdWVyeSludWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBqUXVlcnkgaGlnaGxpZ2h0KHRoaXMgalF1ZXJ5IGVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9sZENvbG9yID0gZWwuQ3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSBlbC5Dc3MoXCJvcGFjaXR5XCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGVsLkNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZjk5XCIpO1xyXG4gICAgICAgICAgICBlbC5Dc3MoXCJvcGFjaXR5XCIsIDAuOSk7XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuU2V0VGltZW91dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbC5Dc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIG9sZENvbG9yKTtcclxuICAgICAgICAgICAgICAgIGVsLkNzcyhcIm9wYWNpdHlcIiwgb3BhY2l0eSk7XHJcbiAgICAgICAgICAgIH0pLDYwMCk7XHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBTZXRGaXJzdENoaWxkKHRoaXMgalF1ZXJ5IHF1ZXJ5LCBqUXVlcnkgY2hpbGRFbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gcXVlcnkhPW51bGw/cXVlcnkuQ2hpbGRyZW4oKTooalF1ZXJ5KW51bGw7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbiA9PSBudWxsIHx8IGNoaWxkcmVuLkxlbmd0aD09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5BcHBlbmRUbyhxdWVyeSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNoaWxkRWxlbWVudC5JbnNlcnRCZWZvcmUoY2hpbGRyZW4uRmlyc3QoKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBTZXRMYXN0Q2hpbGQodGhpcyBqUXVlcnkgcXVlcnksIGpRdWVyeSBjaGlsZEVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBxdWVyeSE9bnVsbD9xdWVyeS5DaGlsZHJlbigpOihqUXVlcnkpbnVsbDtcclxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuID09IG51bGwgfHwgY2hpbGRyZW4uTGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5BcHBlbmRUbyhxdWVyeSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNoaWxkRWxlbWVudC5JbnNlcnRBZnRlcihjaGlsZHJlbi5MYXN0KCkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkNvbW1vblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2NyaXB0TG9hZGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBGaWVsZHNcclxuICAgICAgICBpbnQgaW5kZXg7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHVibGljIEFjdGlvbiBPbkxvYWNDb21wbGV0ZWQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJUmVhZE9ubHlMaXN0PHN0cmluZz4gU2NyaXB0cyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHZvaWQgTG9hZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoU2NyaXB0cyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBTY3JpcHRzLkNvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPbkxvYWNDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgalF1ZXJ5LkdldFNjcmlwdChTY3JpcHRzW2luZGV4XSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIHN0cmluZywgZ2xvYmFsOjpCcmlkZ2UualF1ZXJ5Mi5qcVhIUj4pKChhLCBiLCBjKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgTG9hZCgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvYWRDc3NGaWxlKHN0cmluZyB1cmwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuZXcgalF1ZXJ5KFwiaGVhZFwiKS5BcHBlbmQoXCI8bGluayByZWw9J3N0eWxlc2hlZXQnIGhyZWY9J1wiKyB1cmwgKyBcIicgdHlwZT0ndGV4dC9jc3MnIC8+XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTG9hZENzc0ZpbGVzKElFbnVtZXJhYmxlPHN0cmluZz4gY3NzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHVybCBpbiBjc3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvYWRDc3NGaWxlKHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cDtcclxudXNpbmcgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkNvZGVNaXJyb3I7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuRGVzaWduZXJTYW1wbGVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFeGFtcGxlSW5mbyA6IEZyYW1ld29ya0VsZW1lbnRcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIHN0cmluZyBOYW1lXHJcbiAgICAgICAgc3RyaW5nIF9uYW1lO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfbmFtZTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9uYW1lICE9IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgT25Qcm9wZXJ0eUNoYW5nZWQoXCJOYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdHJpbmcgWG1sVGVtcGxhdGVcclxuICAgICAgICBzdHJpbmcgX3htbFRlbXBsYXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFhtbFRlbXBsYXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX3htbFRlbXBsYXRlOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3htbFRlbXBsYXRlICE9IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF94bWxUZW1wbGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIE9uUHJvcGVydHlDaGFuZ2VkKFwiWG1sVGVtcGxhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFeGFtcGxlRGF0YUNvbnRleHQgOiBGcmFtZXdvcmtFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuICAgICAgICBwdWJsaWMgRXhhbXBsZURhdGFDb250ZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEV4YW1wbGVzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IExpc3Q8RXhhbXBsZUluZm8+KCksKF9vMSk9PntfbzEuQWRkKG5ldyBFeGFtcGxlSW5mb1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE5hbWUgPSBcIlN0YWNrUGFuZWxcIixcclxuICAgICAgICAgICAgICAgICAgICBYbWxUZW1wbGF0ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBcIlxyXG5cclxuXHJcbjxTdGFja1BhbmVsIE9yaWVudGF0aW9uPSdIb3Jpem9udGFsJz5cclxuICBcclxuICAgIDxJY29uIFR5cGU9J1NldHRpbmcnIENvbG9yPScjZmZiYjAwJyBGb250U2l6ZT0nMTcnIC8+XHJcbiAgXHJcbiAgXHQ8VGV4dEJsb2NrIFdpZHRoPSc4MCcgVGV4dD0nU3RhcnQgRGF0ZTonIENvbG9yPScjODg4ODg4JyBGb250U2l6ZT0nMTMnIEZvbnRXZWlnaHQ9JzYwMCcgVGV4dFdyYXBwaW5nPSdOb1dyYXAnIC8+XHJcbiAgXHRcclxuICBcdDxUZXh0QmxvY2sgVGV4dD0nTm92ZW1iZXIgMSwgMjAxNyAxNTozMCcgQ29sb3I9JyM4ODg4ODgnIEZvbnRTaXplPScxMicgRm9udFdlaWdodD0nNjAwJyBUZXh0V3JhcHBpbmc9J05vV3JhcCcgLz5cclxuXHJcbjwvU3RhY2tQYW5lbD5cclxuXHJcblwiXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBFeGFtcGxlSW5mb1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE5hbWUgPSBcImNvcHlcIixcclxuICAgICAgICAgICAgICAgICAgICBYbWxUZW1wbGF0ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBcIlxyXG5cclxuXHJcbjxHcmlkPlxyXG4gIFxyXG4gICAgPENvbHVtbiBXaWR0aD0nMjcnIEFsaWduPSdDZW50ZXInPlxyXG4gICAgICAgIDxJY29uIFR5cGU9J1NldHRpbmcnIENvbG9yPScjZmZiYjAwJyBGb250U2l6ZT0nMTcnIC8+XHJcbiAgICA8L0NvbHVtbj5cclxuICBcclxuICBcdDxDb2x1bW4gV2lkdGg9JzgwJz5cclxuICAgICAgICA8VGV4dEJsb2NrIFRleHQ9J1N0YXJ0IERhdGU6JyBDb2xvcj0nIzg4ODg4OCcgRm9udFNpemU9JzEzJyBGb250V2VpZ2h0PSc2MDAnIFRleHRXcmFwcGluZz0nTm9XcmFwJyAvPlxyXG4gICAgPC9Db2x1bW4+XHJcbiAgXHRcclxuICBcdDxDb2x1bW4gICBBbGlnbj0nTGVmdCcgPlxyXG4gICAgICAgIDxUZXh0QmxvY2sgVGV4dD0nTm92ZW1iZXIgMSwgMjAxNyAxNTozMCcgQ29sb3I9JyM4ODg4ODgnIEZvbnRTaXplPScxMicgRm9udFdlaWdodD0nNjAwJyBUZXh0V3JhcHBpbmc9J05vV3JhcCcgLz5cclxuICAgIDwvQ29sdW1uPlxyXG48L0dyaWQ+XHJcblxyXG5cIlxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgRXhhbXBsZUluZm9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBOYW1lID0gXCJwcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgWG1sVGVtcGxhdGUgPVxyXG4gICAgICAgICAgICAgICAgICAgIEBcIlxyXG48R3JpZD5cbiAgICA8Y29sdW1uIElzUmlnaHRBbGlnbmVkID0nVHJ1ZScgV2lkZT0nMTUnPlxuICAgICAgICA8QnV0dG9uIFRleHQ9J0Fsb2hhJyAgLz4gICAgXG4gICAgPC9jb2x1bW4+XG48L0dyaWQ+XHJcblxyXG5cIlxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgRXhhbXBsZUluZm9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBOYW1lID0gXCJMYXlvdXRcIixcclxuICAgICAgICAgICAgICAgICAgICBYbWxUZW1wbGF0ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBcIlxyXG5cclxuPEdyb3VwQm94IEhlYWRlcj0nWWVsbG93IC0+IEdyb3VwQm94JyBCYWNrZ3JvdW5kPSdZZWxsb3cnID5cclxuICAgIDxDb250YWluZXIgQmFja2dyb3VuZD0nQmx1ZScgSGVpZ2h0PSczMDAnPlxyXG4gICAgICAgIDxHcmlkICBCYWNrZ3JvdW5kPSdHcmVlbic+XHJcbiAgICAgICAgICAgIDxSb3c+IFxyXG5cdCAgICAgICAgICAgIDxDb250YWluZXIgIEJhY2tncm91bmQ9J1llbGxvdycgSGVpZ2h0PSczMCcvPlxyXG5cdCAgICAgICAgICAgIDxDb250YWluZXIgIEJhY2tncm91bmQ9J1llbGxvdycgSGVpZ2h0PSczMCcvPlxyXG4gICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgPFJvdz4gXHJcblx0ICAgICAgICAgICAgPENvbnRhaW5lciAgQmFja2dyb3VuZD0nWWVsbG93JyBIZWlnaHQ9JzMwJy8+XHJcbiAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICA8Um93PiBcclxuXHQgICAgICAgICAgICA8Q29udGFpbmVyICBCYWNrZ3JvdW5kPSdZZWxsb3cnIEhlaWdodD0nMzAnLz5cclxuXHQgICAgICAgICAgICA8Q29udGFpbmVyICBCYWNrZ3JvdW5kPSdZZWxsb3cnIEhlaWdodD0nMzAnIC8+IFxyXG4gICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgPFJvdz4gXHJcblx0ICAgICAgICAgICAgPFN0YWNrUGFuZWwgIEJhY2tncm91bmQ9J1JlZCcgSGVpZ2h0PSc1MCc+XHJcblx0ICAgICAgICAgICAgICAgIDxDb250YWluZXIgIEJhY2tncm91bmQ9J0JsdWUnIEhlaWdodD0nMTAnIC8+ICAgICBcclxuXHQgICAgICAgICAgICAgICAgPENvbnRhaW5lciAgQmFja2dyb3VuZD0nWWVsbG93JyBIZWlnaHQ9JzEwJyAvPiAgICAgXHJcblx0ICAgICAgICAgICAgICAgIDxTdGFja1BhbmVsICBCYWNrZ3JvdW5kPSdCbHVlJyBIZWlnaHQ9JzEwJyAvPiAgICAgXHJcblx0ICAgICAgICAgICAgPC9TdGFja1BhbmVsPlxyXG4gICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICA8L0dyaWQ+XHJcbiAgICA8L0NvbnRhaW5lcj4gXHJcblxyXG48L0dyb3VwQm94PlxyXG5cIlxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgRXhhbXBsZUluZm9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBOYW1lID0gXCJTaW1wbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBYbWxUZW1wbGF0ZSA9IEBcIlxyXG5cclxuPEdyb3VwQm94IEhlYWRlcj0nR3JvdXAgSGVhZGVyJz5cclxuICAgIDxDb250YWluZXI+XHJcblxyXG4gICAgICAgIDxVbmlmb3JtR3JpZD5cclxuXHQgICAgICAgIDx0ZXh0SW5wdXQgVmFsdWUgPSdBJyAgUGxhY2VIb2xkZXI9J1dyaXRlIDEnIC8+XHJcblx0ICAgICAgICA8dGV4dElucHV0ICAgUGxhY2VIb2xkZXI9J1dyaXRlIDInIC8+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvVW5pZm9ybUdyaWQ+XHJcblxyXG4gICAgICAgIDxUZXh0QXJlYSBQbGFjZUhvbGRlcj0nV3JpdGUgeW91ciB1aSBoZXJlJyBSb3dzPSc1JyAvPlxyXG5cclxuICAgIDwvQ29udGFpbmVyPlxyXG5cclxuPC9Hcm91cEJveD5cclxuXHJcblxyXG5cIlxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgRXhhbXBsZUluZm9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBOYW1lID0gXCJGb3JtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgWG1sVGVtcGxhdGUgPVxyXG5AXCJcclxuXHJcblxyXG48Rm9ybT5cclxuICAgICAgIFxyXG4gICAgICAgPEZpZWxkIFZhbHVlID0nQScgIExhYmVsPSd5eScgUGxhY2VIb2xkZXI9J1dyaXRlIDEnIC8+XHJcbiAgICAgICA8RmllbGQgVmFsdWUgPSdBJyAgUGxhY2VIb2xkZXI9J1dyaXRlIDEnIC8+XHJcbiAgICAgICA8U3RhY2tQYW5lbD5cclxuICAgICAgICAgICA8RmllbGQgVmFsdWUgPSdBJyAgUGxhY2VIb2xkZXI9J1dyaXRlIDEnIC8+XHJcbiAgICAgICA8L1N0YWNrUGFuZWw+XHJcbiAgICAgICBcclxuICAgICAgIDxVbmlmb3JtR3JpZD5cclxuICAgICAgICAgICA8RmllbGQgVmFsdWUgPScxJyBMYWJlbD0nMScgUGxhY2VIb2xkZXI9J1dyaXRlIDEnIC8+XHJcbiAgICAgICAgICAgPEZpZWxkIFZhbHVlID0nMicgIFBsYWNlSG9sZGVyPSdXcml0ZSAxJyAvPlxyXG4gICAgICAgICAgIDxGaWVsZCBWYWx1ZSA9JzInICBQbGFjZUhvbGRlcj0nV3JpdGUgMScgLz5cclxuICAgICAgICAgICA8RmllbGQgVmFsdWUgPScyJyAgUGxhY2VIb2xkZXI9J1dyaXRlIDEnIC8+XHJcbiAgICAgICA8L1VuaWZvcm1HcmlkPlxyXG4gICAgICAgXHJcbiAgICAgICAgPENvbnRhaW5lcj5cclxuICAgICAgICAgICA8RmllbGQgVmFsdWUgPScxJyAgUGxhY2VIb2xkZXI9J1dyaXRlIDEnIC8+XHJcbiAgICAgICAgICAgPEZpZWxkIFZhbHVlID0nMicgIFBsYWNlSG9sZGVyPSdXcml0ZSAxJyAvPlxyXG4gICAgICAgPC9Db250YWluZXI+XHJcblxyXG48L0Zvcm0+XHJcblxyXG5cclxuXHJcblxyXG5cIlxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgRXhhbXBsZUluZm9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBOYW1lID0gXCJHcmF2aXR5IGluIENvbHVtbnNcIixcclxuICAgICAgICAgICAgICAgICAgICBYbWxUZW1wbGF0ZSA9IEBcIlxyXG48R3JpZCAgQmFja2dyb3VuZD0nQmxhY2snPlxyXG4gICAgPFJvdz4gXHJcbiAgICAgICAgPENvbHVtbiAgQmFja2dyb3VuZD0nWWVsbG93JyAgIEdyYXZpdHk9JzInID5cclxuICAgICAgICAgICBcclxuICAgICAgICA8L0NvbHVtbj5cclxuICAgICAgICA8Q29sdW1uICBCYWNrZ3JvdW5kPSdSRWQnICAgIC8+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPCEtLSBzdHJldGNoIG1heCBoZWlnaHQgIC0tPlxyXG4gICAgICAgIDxDb2x1bW4gIEJhY2tncm91bmQ9J0JsdWUnIEhlaWdodD0nMjAwJyBHcmF2aXR5PScyJyAgIC8+XHJcbiAgICA8L1Jvdz4gXHJcbiAgICBcclxuPC9HcmlkPlxyXG5cclxuXCJcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IEV4YW1wbGVJbmZvXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTmFtZSA9IFwiRm9ybSAyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgWG1sVGVtcGxhdGUgPSBAXCJcclxuXG5cbjxGb3JtPlxuICAgIDxDb250YWluZXI+XG4gIFxuICAgIDxHcm91cEJveCBIZWFkZXI9J8SwcnRpYmF0IEJpbGdpbGVyaSc+XG4gICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgPFJvdz4gXG4gICAgICAgICAgICAgICAgPENvbHVtbiA+XG4gICAgICAgICAgICAgICAgICAgPEZpZWxkIExhYmVsPSdFLVBvc3RhJy8+XG4gICAgICAgICAgICAgICAgICAgPEZpZWxkIExhYmVsPSdUZWxlZm9uJy8+XG4gICAgICAgICAgICAgICAgPC9Db2x1bW4+XG4gICAgICAgICAgICA8L1Jvdz4gXG4gICAgICAgIDwvR3JpZD5cbiAgICA8L0dyb3VwQm94PlxuICAgIFxuICAgIDxHcm91cEJveCBIZWFkZXI9J1RFU0zEsE1BVCBCxLBMR8SwTEVSxLAnPlxuICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgIDxSb3c+IFxuICAgICAgICAgICAgICAgIDxDb2x1bW4gPlxuICAgICAgICAgICAgICAgICAgICA8RmllbGQgTGFiZWw9J0FkxLEnLz5cbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIExhYmVsPSdTb3kgQWTEsScvPlxuICAgICAgICAgICAgICAgICAgICA8RmllbGQgTGFiZWw9J8WeZWhpcicvPlxuICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIExhYmVsPSfEsGzDp2UnLz5cbiAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgTGFiZWw9J0FkcmVzJy8+XG4gICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIExhYmVsPSdUQyBLaW1saWsgTm8gKMSwc3RlxJ9lIEJhxJ9sxLEpJy8+XG4gICAgICAgICAgICAgICAgPC9Db2x1bW4+XG4gICAgICAgICAgICA8L1Jvdz4gXG4gICAgICAgIDwvR3JpZD5cbiAgICA8L0dyb3VwQm94PlxuICAgIFxuICAgIDxHcmlkPlxuICAgICAgICA8Um93PlxuICAgICAgICAgICAgPENvbHVtbiBHcmF2aXR5PSc3JyAvPlxuICAgICAgICAgICBcbiAgICAgICAgICAgIDxDb2x1bW4gPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gVGV4dD0nxLBsZXJsZScvPiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICA8L1Jvdz5cbiAgICBcbiAgICA8L0dyaWQ+XG4gICAgXG4gICAgXG4gIDwvQ29udGFpbmVyPlxuPC9Gb3JtPlxuXG5cclxuXCJcclxuICAgICAgICAgICAgICAgIH0pO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBMaXN0PEV4YW1wbGVJbmZvPiBFeGFtcGxlc1xyXG4gICAgICAgIExpc3Q8RXhhbXBsZUluZm8+IF9leGFtcGxlcztcclxuXHJcbiAgICAgICAgcHVibGljIExpc3Q8RXhhbXBsZUluZm8+IEV4YW1wbGVzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2V4YW1wbGVzOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2V4YW1wbGVzICE9IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9leGFtcGxlcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIE9uUHJvcGVydHlDaGFuZ2VkKFwiRXhhbXBsZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIHN0cmluZyBDdXJyZW50VGVtcGxhdGVcclxuICAgICAgICBzdHJpbmcgX2N1cnJlbnRUZW1wbGF0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDdXJyZW50VGVtcGxhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfY3VycmVudFRlbXBsYXRlOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2N1cnJlbnRUZW1wbGF0ZSAhPSB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfY3VycmVudFRlbXBsYXRlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgT25Qcm9wZXJ0eUNoYW5nZWQoXCJDdXJyZW50VGVtcGxhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuICAgICAgICBzdGF0aWMgc3RyaW5nIFRlc3RVSSB7Z2V0e3JldHVybiBAXCJcclxuXHJcbjxDb250YWluZXIgPlxyXG4gICAgXHJcbiAgICA8Q29tYm9Cb3ggXHJcbiAgICAgICAgICAgIEl0ZW1zU291cmNlID0gJ3tCaW5kaW5nIEV4YW1wbGVzfScgXHJcbiAgICAgICAgICAgIERpc3BsYXlNZW1iZXJQYXRoID0gJ05hbWUnXHJcbiAgICAgICAgICAgIFNlbGVjdGVkVmFsdWVQYXRoID0gJ1htbFRlbXBsYXRlJyBcclxuXHRcdCAgICBTZWxlY3RlZFZhbHVlID0gJ3tCaW5kaW5nIEN1cnJlbnRUZW1wbGF0ZX0nIC8+XHJcbiAgICAgICAgXHJcbiAgICA8VUlFZGl0b3IgU291cmNlVGV4dCA9ICd7Q3VycmVudFRlbXBsYXRlfScgIC8+XHJcbiAgICAgICAgXHJcbjwvQ29udGFpbmVyPlxyXG5cclxuXHJcblwiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgalF1ZXJ5LlJlYWR5KChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNjcmlwdExvYWRlci5Mb2FkQ3NzRmlsZShWZXJzaW9uSW5mby5Dc3NGaWxlKTtcclxuICAgICAgICAgICAgICAgIFNjcmlwdExvYWRlci5Mb2FkQ3NzRmlsZXMoWG1sRWRpdG9yLkNzc0ZpbGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0cyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdHMuQWRkUmFuZ2UoVmVyc2lvbkluZm8uU2NyaXB0cyk7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHRzLkFkZFJhbmdlKFhtbEVkaXRvci5TY3JpcHRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXcgU2NyaXB0TG9hZGVyXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2NyaXB0cyA9IHNjcmlwdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgT25Mb2FjQ29tcGxldGVkID0gUmVuZGVyVUlFZGl0b3JcclxuICAgICAgICAgICAgICAgIH0uTG9hZCgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBNZXRob2RzXHJcbiAgICAgICAgc3RhdGljIHZvaWQgUmVuZGVyVUlFZGl0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJ1aWxkZXIgPSBuZXcgQnVpbGRlclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEYXRhQ29udGV4dCA9IG5ldyBFeGFtcGxlRGF0YUNvbnRleHQoKSxcclxuICAgICAgICAgICAgICAgIFhtbFN0cmluZyA9IFRlc3RVSVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAoRnJhbWV3b3JrRWxlbWVudCkgYnVpbGRlci5CdWlsZCgpO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5Sb290LkFwcGVuZFRvKERvY3VtZW50LkJvZHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzLkRhdGE7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzLk1hcmt1cDtcclxudXNpbmcgU3lzdGVtLlhtbDtcclxudXNpbmcgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkNvbW1vbjtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuVUkuRGVzaWduXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBYbWxJbnRlbGxpc2Vuc2VJbmZvXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuICAgICAgICBwdWJsaWMgWG1sSW50ZWxsaXNlbnNlSW5mbyhzdHJpbmcgdGFnTmFtZSwgVHlwZSB0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRhZ05hbWUgPT0gbnVsbCkgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInRhZ05hbWVcIik7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IG51bGwpIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ0eXBlXCIpO1xyXG5cclxuICAgICAgICAgICAgVGFnTmFtZSA9IHRhZ05hbWU7XHJcbiAgICAgICAgICAgIFR5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gQ2hpbGRyZW5UYWdzIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUYWdOYW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVHlwZSBUeXBlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQnVpbGRlclxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gRmllbGRzXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBYbWxTdHJpbmc7XHJcblxyXG4gICAgICAgIERpY3Rpb25hcnk8aW50LCBvYmplY3Q+IF9saW5lTnVtYmVyVG9Db250cm9sTWFwO1xyXG5cclxuICAgICAgICBYbWxOb2RlIF9yb290Tm9kZTtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuICAgICAgICBwdWJsaWMgb2JqZWN0IENhbGxlciB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIG9iamVjdCBEYXRhQ29udGV4dCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRGVzaWduTW9kZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBqUXVlcnkgUmVzdWx0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBYbWxEb2N1bWVudCBYbWxEb2N1bWVudCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuICAgICAgICBEaWN0aW9uYXJ5PGludCwgb2JqZWN0PiBMaW5lTnVtYmVyVG9Db250cm9sTWFwXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9saW5lTnVtYmVyVG9Db250cm9sTWFwID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVOdW1iZXJUb0NvbnRyb2xNYXAgPSBuZXcgRGljdGlvbmFyeTxpbnQsIG9iamVjdD4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVOdW1iZXJUb0NvbnRyb2xNYXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBCdWlsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYmplY3QgaW5zdGFuY2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvb3ROb2RlID0gX3Jvb3ROb2RlID0gR2V0Um9vdE5vZGUoWG1sU3RyaW5nKTtcclxuXHJcbiAgICAgICAgICAgIGluc3RhbmNlID0gQnVpbGROb2RlKHJvb3ROb2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgRm9jdXNUb0xpbmUoaW50IGxpbmVOdW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lTnVtYmVyID0gbGluZU51bWJlciArIDE7XHJcbiAgICAgICAgICAgIG9iamVjdCBjb21wb25lbnQgPSBudWxsO1xyXG4gICAgICAgICAgICBfbGluZU51bWJlclRvQ29udHJvbE1hcCE9bnVsbD9fbGluZU51bWJlclRvQ29udHJvbE1hcC5UcnlHZXRWYWx1ZShsaW5lTnVtYmVyLCBvdXQgY29tcG9uZW50KTooYm9vbD8pbnVsbDtcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBxdWVyeSA9ICgoRnJhbWV3b3JrRWxlbWVudCkgY29tcG9uZW50KS5fcm9vdDtcclxuXHJcbiAgICAgICAgICAgIHF1ZXJ5LmhpZ2hsaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgSVJlYWRPbmx5TGlzdDxYbWxJbnRlbGxpc2Vuc2VJbmZvPiBHZXRJbnRlbGxpc2Vuc2VJbmZvcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpc3Q8WG1sSW50ZWxsaXNlbnNlSW5mbz4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1ldGhvZHNcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgVHlwZSBDcmVhdGVUeXBlKHN0cmluZyB0YWcpO1xyXG5cclxuICAgICAgICBzdGF0aWMgWG1sTm9kZSBHZXRSb290Tm9kZShzdHJpbmcgeG1sU3RyaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLGpRdWVyeS5QYXJzZVhNTCh4bWxTdHJpbmcpLkFzPFhtbERvY3VtZW50PigpKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8WG1sRG9jdW1lbnQ+KFwia2V5MVwiKS5GaXJzdENoaWxkOihYbWxOb2RlKW51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgWG1sRXhjZXB0aW9uKFwiWG1sUGFyc2VFcnJvck9jY3VyZWQuXCIsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmplY3QgQnVpbGROb2RlKFhtbE5vZGUgeG1sTm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWcgPSB4bWxOb2RlLk5hbWUuVG9VcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xUeXBlID0gQ3JlYXRlVHlwZSh0YWcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRyb2xUeXBlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiTm90UmVjb2duaXplZFRhZzpcIikrIHRhZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZShjb250cm9sVHlwZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoSXNEZXNpZ25Nb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU51bWJlciA9IHhtbE5vZGUuR2V0T3JpZ2luYWxMaW5lTnVtYmVyKF9yb290Tm9kZSwgWG1sU3RyaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBMaW5lTnVtYmVyVG9Db250cm9sTWFwW2xpbmVOdW1iZXJdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmcmFtZXdvcmtFbGVtZW50ID0gaW5zdGFuY2UgYXMgRnJhbWV3b3JrRWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKGZyYW1ld29ya0VsZW1lbnQgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnJhbWV3b3JrRWxlbWVudC5EYXRhQ29udGV4dCA9IERhdGFDb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgZnJhbWV3b3JrRWxlbWVudC5Jbml0RE9NKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBub2RlQXR0cmlidXRlIGluIHhtbE5vZGUuQXR0cmlidXRlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub2RlQXR0cmlidXRlLk5hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBub2RlQXR0cmlidXRlLlZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBiaSA9IEJpbmRpbmdJbmZvLlRyeVBhcnNlRXhwcmVzc2lvbih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiaS5Tb3VyY2UgPSBEYXRhQ29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICBiaS5UYXJnZXQgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBiaS5UYXJnZXRQcm9wZXJ0eU5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiaS5Db25uZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRQcm9wZXJ0eSA9IFJlZmxlY3Rpb25IZWxwZXIuRmluZFByb3BlcnR5KGluc3RhbmNlLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRQcm9wZXJ0eSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRQcm9wZXJ0eS5Qcm9wZXJ0eVR5cGUuSXNFbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmbGVjdGlvbkhlbHBlci5TZXRQcm9wZXJ0eVZhbHVlKGluc3RhbmNlLCBuYW1lLCBFbnVtLlBhcnNlKHRhcmdldFByb3BlcnR5LlByb3BlcnR5VHlwZSwgdmFsdWUsIHRydWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udmVydGVyQXR0cmlidXRlcyA9IHRhcmdldFByb3BlcnR5LkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFR5cGVDb252ZXJ0ZXJBdHRyaWJ1dGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3RDb252ZXJ0ZXJBdHJpYnV0ZSA9IGNvbnZlcnRlckF0dHJpYnV0ZXMhPW51bGw/Y29udmVydGVyQXR0cmlidXRlcy5GaXJzdE9yRGVmYXVsdCgpOihvYmplY3QpbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RDb252ZXJ0ZXJBdHJpYnV0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnZlcnRlciA9IChUeXBlQ29udmVydGVyQXR0cmlidXRlKSBmaXJzdENvbnZlcnRlckF0cmlidXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVDb252ZXJ0ZXIgPSAoSVZhbHVlQ29udmVydGVyKSBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UoY29udmVydGVyLl90eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnZlcnRlZFZhbHVlID0gdmFsdWVDb252ZXJ0ZXIuQ29udmVydCh2YWx1ZSwgaW5zdGFuY2UuR2V0VHlwZSgpLkdldFByb3BlcnR5KG5hbWUpLlByb3BlcnR5VHlwZSwgbnVsbCwgQ3VsdHVyZUluZm8uQ3VycmVudEN1bHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmbGVjdGlvbkhlbHBlci5TZXRQcm9wZXJ0eVZhbHVlKGluc3RhbmNlLCBuYW1lLCBjb252ZXJ0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVmbGVjdGlvbkhlbHBlci5TZXRQcm9wZXJ0eVZhbHVlKGluc3RhbmNlLCBuYW1lLCB2YWx1ZS5DaGFuZ2VUeXBlKHRhcmdldFByb3BlcnR5LlByb3BlcnR5VHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlQXNCYWcgPSBpbnN0YW5jZSBhcyBCYWc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VBc0JhZyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlQXNCYWcuU2V0VmFsdWUobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNaXNzaW5nTWVtYmVyRXhjZXB0aW9uKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY2hpbGROb2RlIGluIHhtbE5vZGUuQ2hpbGROb2RlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5Ob2RlVHlwZSA9PSBOb2RlVHlwZS5UZXh0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGROb2RlLk5vZGVUeXBlID09IE5vZGVUeXBlLkNvbW1lbnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1YkNvbnRyb2wgPSBCdWlsZE5vZGUoY2hpbGROb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSAoRnJhbWV3b3JrRWxlbWVudCkgc3ViQ29udHJvbDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaWFkZENoaWxkID0gaW5zdGFuY2UgYXMgSUFkZENoaWxkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpYWRkQ2hpbGQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpYWRkQ2hpbGQuQWRkKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oc3ViQ29udHJvbC5HZXRUeXBlKCkuRnVsbE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSVxyXG57XHJcbiAgICBzdGF0aWMgY2xhc3MgTnVtYmVyVG9Xb3JkXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBTdGF0aWMgRmllbGRzXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHN0cmluZ1tdIHVuaXRzTWFwID0ge1wiemVyb1wiLCBcIm9uZVwiLCBcInR3b1wiLCBcInRocmVlXCIsIFwiZm91clwiLCBcImZpdmVcIiwgXCJzaXhcIiwgXCJzZXZlblwiLCBcImVpZ2h0XCIsIFwibmluZVwiLCBcInRlblwiLCBcImVsZXZlblwiLCBcInR3ZWx2ZVwiLCBcInRoaXJ0ZWVuXCIsIFwiZm91cnRlZW5cIiwgXCJmaWZ0ZWVuXCIsIFwic2l4dGVlblwiLCBcInNldmVudGVlblwiLCBcImVpZ2h0ZWVuXCIsIFwibmluZXRlZW5cIn07XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVG9Xb3JkKHRoaXMgaW50IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuaXRzTWFwW3ZhbHVlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFZlcnNpb25JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIENzc0ZpbGUge2dldHtyZXR1cm4gXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3NlbWFudGljLXVpQDIuMi4xMy9kaXN0L3NlbWFudGljLmNzc1wiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBJUmVhZE9ubHlMaXN0PHN0cmluZz4gU2NyaXB0cyB7Z2V0e3JldHVybiBuZXdbXSB7XCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3NlbWFudGljLXVpQDIuMi4xMy9kaXN0L3NlbWFudGljLmpzXCJ9O319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLldpbmRvd3MuRGF0YTtcclxudXNpbmcgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkNvbW1vbjtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuVUkuRGVzaWduXHJcbntcclxuXHJcbiAgXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJpbmRlciBcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgQmluZGVyRXZlbnRBdHRyaWJ1dGVSZXNvbHZlciBCaW5kZXJFdmVudEF0dHJpYnV0ZVJlc29sdmVyIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgb2JqZWN0IENhbGxlciB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIG9iamVjdCBEYXRhQ29udGV4dCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVGVtcGxhdGVIVE1MXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXQgeyBUZW1wbGF0ZVF1ZXJ5ID0galF1ZXJ5LkVsZW1lbnQoalF1ZXJ5LlBhcnNlSFRNTCh2YWx1ZSkpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgalF1ZXJ5IFRlbXBsYXRlUXVlcnkgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIFByb2Nlc3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGVtcGxhdGVRdWVyeS5FYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248aW50LCBnbG9iYWw6OkJyaWRnZS5IdG1sNS5FbGVtZW50PikoKGluZGV4LCBlbGVtZW50KSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5Ob2RlVHlwZSA9PSBOb2RlVHlwZS5UZXh0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChUcnlQYXJzZUV4cHJlc3Npb24oZWxlbWVudC5Jbm5lckhUTUwpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9jZXNzRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFByb2Nlc3NFbGVtZW50KGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LkdldEVsZW1lbnRzQnlUYWdOYW1lSXNOb3RTdXBwb3J0aW5nKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBodG1sRWxlbWVudCBpbiBlbGVtZW50LkdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQcm9jZXNzRWxlbWVudChodG1sRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1ldGhvZHNcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdm9pZCBQcm9jZXNzRWxlbWVudChFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYXR0cmlidXRlIGluIGVsZW1lbnQuQXR0cmlidXRlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUuTm9kZU5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoQmluZGVyRXZlbnRBdHRyaWJ1dGVSZXNvbHZlci5Jc0V2ZW50QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFByb2Nlc3NFbGVtZW50UHJvcGVydHlGb3JFdmVudHMoZWxlbWVudCwgYXR0cmlidXRlLk5vZGVOYW1lLCBCaW5kZXJFdmVudEF0dHJpYnV0ZVJlc29sdmVyLkdldGpRdWVyeUV2ZW50TmFtZShhdHRyaWJ1dGVOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBQcm9jZXNzRWxlbWVudFByb3BlcnR5KGVsZW1lbnQsIGF0dHJpYnV0ZS5Ob2RlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFByb2Nlc3NFbGVtZW50UHJvcGVydHlGb3JIdG1sQ29udGVudChlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgUHJvY2Vzc0VsZW1lbnRQcm9wZXJ0eShFbGVtZW50IGVsZW1lbnQsIHN0cmluZyBwcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50LkdldEF0dHJpYnV0ZShwcm9wZXJ0eU5hbWUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGluZm8gPSBUcnlQYXJzZUV4cHJlc3Npb24odmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZm8gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmZvLlNvdXJjZSA9IERhdGFDb250ZXh0O1xyXG4gICAgICAgICAgICBpbmZvLlRhcmdldCA9IGpRdWVyeS5FbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpbmZvLlRhcmdldFByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcclxuXHJcbiAgICAgICAgICAgIGluZm8uQ29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBQcm9jZXNzRWxlbWVudFByb3BlcnR5Rm9yRXZlbnRzKEVsZW1lbnQgZWxlbWVudCwgc3RyaW5nIGF0dGlyaWJ1dGVOYW1lLCBzdHJpbmcgalF1ZXJ5RXZlbnROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZWxlbWVudC5HZXRBdHRyaWJ1dGUoYXR0aXJpYnV0ZU5hbWUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGluZm8gPSBUcnlQYXJzZUV4cHJlc3Npb24odmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZm8gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbWkgPSBDYWxsZXIuR2V0VHlwZSgpLkdldE1ldGhvZChpbmZvLlNvdXJjZVBhdGgpO1xyXG4gICAgICAgICAgICBpZiAobWkgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKGluZm8uU291cmNlUGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChqUXVlcnlFdmVudE5hbWUgPT0gXCJjbGlja1wiICYmIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8Z2xvYmFsOjpTeXN0ZW0uVHlwZT4obWkuUGFyYW1ldGVyVHlwZXMpID09IHR5cGVvZihqUXVlcnlNb3VzZUV2ZW50KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LkVsZW1lbnQoZWxlbWVudCkuQ2xpY2soKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5qUXVlcnkyLmpRdWVyeU1vdXNlRXZlbnQ+KShtb3VzZUV2ZW50ID0+IHsgbWkuSW52b2tlKENhbGxlciwgbW91c2VFdmVudCk7IH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtaS5QYXJhbWV0ZXJUeXBlcy5MZW5ndGggIT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oaW5mby5Tb3VyY2VQYXRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGpRdWVyeS5FbGVtZW50KGVsZW1lbnQpLk9uKGpRdWVyeUV2ZW50TmFtZSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT4geyBtaS5JbnZva2UoQ2FsbGVyKTsgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFByb2Nlc3NFbGVtZW50UHJvcGVydHlGb3JIdG1sQ29udGVudChFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBqUXVlcnkuRWxlbWVudChlbGVtZW50KS5IdG1sKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5mbyA9IFRyeVBhcnNlRXhwcmVzc2lvbih2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5mbyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluZm8uU291cmNlID0gRGF0YUNvbnRleHQ7XHJcbiAgICAgICAgICAgIGluZm8uVGFyZ2V0ID0galF1ZXJ5LkVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGluZm8uVXBkYXRlT25seUlubmVySFRNTCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpbmZvLkNvbm5lY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBIVE1MQmluZGluZ0luZm8gVHJ5UGFyc2VFeHByZXNzaW9uKHN0cmluZyB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBIVE1MQmluZGluZ0luZm8uVHJ5UGFyc2VFeHByZXNzaW9uKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICBcbnByaXZhdGUgQmluZGVyRXZlbnRBdHRyaWJ1dGVSZXNvbHZlciBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQmluZGVyRXZlbnRBdHRyaWJ1dGVSZXNvbHZlcj1uZXcgQmluZGVyRXZlbnRBdHRyaWJ1dGVSZXNvbHZlcigpO31cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5VSS5EZXNpZ25cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJpbmRlckV2ZW50QXR0cmlidXRlUmVzb2x2ZXJcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFN0YXRpYyBGaWVsZHNcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4gRXZlbnRNYXAgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4oKSwoX28xKT0+e19vMS5BZGQoXCJDTElDS1wiLFwiY2xpY2tcIik7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBzdHJpbmcgR2V0alF1ZXJ5RXZlbnROYW1lKHN0cmluZyBhdHRyaWJ1dGVOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEV2ZW50TWFwW2F0dHJpYnV0ZU5hbWUuVG9VcHBlcigpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgSXNFdmVudEF0dHJpYnV0ZShzdHJpbmcgYXR0cmlidXRlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFdmVudE1hcC5Db250YWluc0tleShhdHRyaWJ1dGVOYW1lLlRvVXBwZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBCcmlkZ2UualF1ZXJ5MlxyXG57XHJcbiAgICBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBDc3NfZGlzcGxheV9JbmxpbmVfQmxvY2sodGhpcyBqUXVlcnkgcXVlcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBxdWVyeS5Dc3MoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBqUXVlcnkgQ3NzX2Zsb2F0X0xlZnQodGhpcyBqUXVlcnkgcXVlcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBxdWVyeS5Dc3MoXCJmbG9hdFwiLCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGpRdWVyeSBDc3Nfd2lkdGgodGhpcyBqUXVlcnkgcXVlcnksc3RyaW5nIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcXVlcnkuQ3NzKFwid2lkdGhcIiwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgU3lzdGVtLkNvbXBvbmVudE1vZGVsXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyAgICAgVGhlIGJhZyBjaGFuZ2VkIGV2ZW50IGFyZ3VtZW50c1xyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIC8vLyA8c2VlYWxzbyBjcmVmPVwiU3lzdGVtLkNvbXBvbmVudE1vZGVsLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiIC8+XHJcbiAgICBwdWJsaWMgY2xhc3MgQmFnQ2hhbmdlZEV2ZW50QXJncyA6IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1xyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIDxzZWUgY3JlZj1cIkJhZ0NoYW5nZWRFdmVudEFyZ3NcIiAvPiBjbGFzcy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInByb3BlcnR5TmFtZVwiPk5hbWUgb2YgdGhlIHByb3BlcnR5LjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIEJhZ0NoYW5nZWRFdmVudEFyZ3Moc3RyaW5nIHByb3BlcnR5TmFtZSkgOiBiYXNlKHByb3BlcnR5TmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgPHNlZSBjcmVmPVwiQmFnQ2hhbmdlZEV2ZW50QXJnc1wiIC8+IGNsYXNzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicHJvcGVydHlOYW1lXCI+TmFtZSBvZiB0aGUgcHJvcGVydHkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJuZXdWYWx1ZVwiPlRoZSBuZXcgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgQmFnQ2hhbmdlZEV2ZW50QXJncyhzdHJpbmcgcHJvcGVydHlOYW1lLCBvYmplY3QgbmV3VmFsdWUpIDogYmFzZShwcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOZXdWYWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIDxzZWUgY3JlZj1cIkJhZ0NoYW5nZWRFdmVudEFyZ3NcIiAvPiBjbGFzcy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInByb3BlcnR5TmFtZVwiPk5hbWUgb2YgdGhlIHByb3BlcnR5LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibmV3VmFsdWVcIj5UaGUgbmV3IHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2xkVmFsdWVcIj5UaGUgb2xkIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIEJhZ0NoYW5nZWRFdmVudEFyZ3Moc3RyaW5nIHByb3BlcnR5TmFtZSwgb2JqZWN0IG5ld1ZhbHVlLCBvYmplY3Qgb2xkVmFsdWUpIDogYmFzZShwcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOZXdWYWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICBPbGRWYWx1ZSA9IG9sZFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBHZXRzIHRoZSBuZXcgdmFsdWUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgbmV3IG9iamVjdCBOZXdWYWx1ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgR2V0cyB0aGUgb2xkIHZhbHVlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIG5ldyBvYmplY3QgT2xkVmFsdWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLkNvbXBvbmVudE1vZGVsXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZWZsZWN0aW9uSGVscGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRXZlbnRJbmZvIEZpbmRFdmVudChvYmplY3QgaW5zdGFuY2UsIHN0cmluZyBldmVudE5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImluc3RhbmNlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJldmVudE5hbWVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gaW5zdGFuY2UuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGUuR2V0RXZlbnQoZXZlbnROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTWV0aG9kSW5mbyBGaW5kTWV0aG9kSW5mbyhvYmplY3QgaW5zdGFuY2UsIHN0cmluZyBtZXRob2ROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJpbnN0YW5jZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1ldGhvZE5hbWUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIm1ldGhvZE5hbWVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gaW5zdGFuY2UuR2V0VHlwZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwidHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGUuR2V0TWV0aG9kKG1ldGhvZE5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBCaW5kaW5nRmxhZ3MgQWxsQmluZGluZ3Mge2dldHtyZXR1cm4gQmluZGluZ0ZsYWdzLklnbm9yZUNhc2UgfCBCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLk5vblB1YmxpYyB8IEJpbmRpbmdGbGFncy5JbnN0YW5jZSB8IEJpbmRpbmdGbGFncy5TdGF0aWM7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNZXRob2RJbmZvIEZpbmRNZXRob2RJbmZvKG9iamVjdCBpbnN0YW5jZSwgc3RyaW5nIG1ldGhvZE5hbWUscGFyYW1zICBUeXBlW11wYXJhbWV0ZXJUeXBlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5zdGFuY2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtZXRob2ROYW1lID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXRob2ROYW1lXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGluc3RhbmNlLkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlLkdldE1ldGhvZChtZXRob2ROYW1lLCBBbGxCaW5kaW5ncywgcGFyYW1ldGVyVHlwZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFByb3BlcnR5SW5mbyBGaW5kUHJvcGVydHkob2JqZWN0IGluc3RhbmNlLCBzdHJpbmcgcHJvcGVydHlOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJpbnN0YW5jZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwicHJvcGVydHlOYW1lXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGluc3RhbmNlLkdldFR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlLkdldFByb3BlcnR5KHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9iamVjdCBHZXRQcm9wZXJ0eVZhbHVlKG9iamVjdCBpbnN0YW5jZSwgc3RyaW5nIHByb3BlcnR5TmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5SW5mbyA9IEZpbmRQcm9wZXJ0eShpbnN0YW5jZSwgcHJvcGVydHlOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eUluZm8gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJhZyA9IGluc3RhbmNlIGFzIEJhZztcclxuICAgICAgICAgICAgICAgIGlmIChiYWcgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFnLkdldFZhbHVlKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1pc3NpbmdNZW1iZXJFeGNlcHRpb24oaW5zdGFuY2UuR2V0VHlwZSgpLkZ1bGxOYW1lICsgXCItPlwiICsgcHJvcGVydHlOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5SW5mby5HZXRWYWx1ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9iamVjdCBJbnZva2Uob2JqZWN0IGluc3RhbmNlLCBzdHJpbmcgbWV0aG9kTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZXRob2RJbmZvID0gRmluZE1ldGhvZEluZm8oaW5zdGFuY2UsIG1ldGhvZE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kSW5mbyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWlzc2luZ01lbWJlckV4Y2VwdGlvbihpbnN0YW5jZS5HZXRUeXBlKCkuRnVsbE5hbWUgKyBcIi0+XCIgKyBtZXRob2ROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZEluZm8uSW52b2tlKGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IEludm9rZShvYmplY3QgaW5zdGFuY2UsIHN0cmluZyBtZXRob2ROYW1lLCBwYXJhbXMgb2JqZWN0W10gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZXRob2RJbmZvID0gRmluZE1ldGhvZEluZm8oaW5zdGFuY2UsIG1ldGhvZE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kSW5mbyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWlzc2luZ01lbWJlckV4Y2VwdGlvbihpbnN0YW5jZS5HZXRUeXBlKCkuRnVsbE5hbWUgKyBcIi0+XCIgKyBtZXRob2ROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZEluZm8uSW52b2tlKGluc3RhbmNlLCBwYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTZXRQcm9wZXJ0eVZhbHVlKG9iamVjdCBpbnN0YW5jZSwgc3RyaW5nIHByb3BlcnR5TmFtZSwgb2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJpbnN0YW5jZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwicHJvcGVydHlOYW1lXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBpbnN0YW5jZS5HZXRUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHlJbmZvID0gRmluZFByb3BlcnR5KGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb3BlcnR5SW5mbyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmFnID0gaW5zdGFuY2UgYXMgQmFnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhZyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhZy5TZXRWYWx1ZShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1pc3NpbmdNZW1iZXJFeGNlcHRpb24odHlwZS5GdWxsTmFtZSArIFwiLT5cIiArIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByb3BlcnR5SW5mby5TZXRWYWx1ZShpbnN0YW5jZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcblxubmFtZXNwYWNlIFN5c3RlbS5Db21wb25lbnRNb2RlbFxue1xuICAgIFtBdHRyaWJ1dGVVc2FnZShBdHRyaWJ1dGVUYXJnZXRzLkFsbCldXG4gICAgcHVibGljIHNlYWxlZCBjbGFzcyBUeXBlQ29udmVydGVyQXR0cmlidXRlIDogQXR0cmlidXRlXG4gICAge1xuICAgICAgICBpbnRlcm5hbCBUeXBlIF90eXBlO1xuICAgICAgICAjcmVnaW9uIFN0YXRpYyBGaWVsZHNcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlQ29udmVydGVyQXR0cmlidXRlIERlZmF1bHQ7XG4gICAgICAgICNlbmRyZWdpb25cblxuICAgICAgICAjcmVnaW9uIEZpZWxkc1xuICAgICAgICByZWFkb25seSBzdHJpbmcgdHlwZU5hbWU7XG4gICAgICAgICNlbmRyZWdpb25cblxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xuICAgICAgICBzdGF0aWMgVHlwZUNvbnZlcnRlckF0dHJpYnV0ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIERlZmF1bHQgPSBuZXcgVHlwZUNvbnZlcnRlckF0dHJpYnV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFR5cGVDb252ZXJ0ZXJBdHRyaWJ1dGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlTmFtZSA9IHN0cmluZy5FbXB0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUeXBlQ29udmVydGVyQXR0cmlidXRlKFR5cGUgdHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX3R5cGUgPSB0eXBlO1xuICAgICAgICAgICAgdHlwZU5hbWUgPSB0eXBlLkFzc2VtYmx5UXVhbGlmaWVkTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUeXBlQ29udmVydGVyQXR0cmlidXRlKHN0cmluZyB0eXBlTmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZU5hbWUuVG9VcHBlcihDdWx0dXJlSW5mby5JbnZhcmlhbnRDdWx0dXJlKTtcbiAgICAgICAgICAgIHRoaXMudHlwZU5hbWUgPSB0eXBlTmFtZTtcbiAgICAgICAgfVxuICAgICAgICAjZW5kcmVnaW9uXG5cbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xuICAgICAgICBwdWJsaWMgc3RyaW5nIENvbnZlcnRlclR5cGVOYW1lIHtnZXR7cmV0dXJuIHR5cGVOYW1lO319XG4gICAgICAgICNlbmRyZWdpb25cblxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEVxdWFscyhvYmplY3Qgb2JqKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdHlwZUNvbnZlcnRlckF0dHJpYnV0ZSA9IG9iaiBhcyBUeXBlQ29udmVydGVyQXR0cmlidXRlO1xuICAgICAgICAgICAgaWYgKHR5cGVDb252ZXJ0ZXJBdHRyaWJ1dGUgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHlwZUNvbnZlcnRlckF0dHJpYnV0ZS5Db252ZXJ0ZXJUeXBlTmFtZSA9PSB0eXBlTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZU5hbWUuR2V0SGFzaENvZGUoKTtcbiAgICAgICAgfVxuICAgICAgICAjZW5kcmVnaW9uXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbVxyXG57XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zMlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFRvVXBwZXIodGhpcyBzdHJpbmcgdmFsdWUsIEN1bHR1cmVJbmZvIGN1bHR1cmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgICAvLyBUT0RPOiBlbmcgYW5kIHR1cmtpc2hcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLlRvVXBwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgTWlzc2luZ01lbWJlckV4Y2VwdGlvbiA6IEV4Y2VwdGlvblxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcbiAgICAgICAgcHVibGljIE1pc3NpbmdNZW1iZXJFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UsIEV4Y2VwdGlvbiBpbm5lckV4Y2VwdGlvbiA9IG51bGwpIDogYmFzZShtZXNzYWdlLCBpbm5lckV4Y2VwdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxuXHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgc2VhbGVkIGNsYXNzIEVtcHR5XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBTdGF0aWMgRmllbGRzXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFbXB0eSBWYWx1ZSA9IG5ldyBFbXB0eSgpO1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuICAgICAgICBFbXB0eSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxuXHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgcHVibGljIHNlYWxlZCBjbGFzcyBEQk51bGxcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFN0YXRpYyBGaWVsZHNcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERCTnVsbCBWYWx1ZSA9IG5ldyBEQk51bGwoKTtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gQ29uc3RydWN0b3JzXHJcbiAgICAgICAgREJOdWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBUeXBlQ29kZSBHZXRUeXBlQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVHlwZUNvZGUuREJOdWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUb1N0cmluZyhJRm9ybWF0UHJvdmlkZXIgcHJvdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW1cclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBDb252ZXJ0MlxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gU3RhdGljIEZpZWxkc1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBUeXBlW10gQ29udmVydFR5cGVzID0ge3R5cGVvZihFbXB0eSksIHR5cGVvZihvYmplY3QpLCB0eXBlb2YoREJOdWxsKSwgdHlwZW9mKGJvb2wpLCB0eXBlb2YoY2hhciksIHR5cGVvZihzYnl0ZSksIHR5cGVvZihieXRlKSwgdHlwZW9mKHNob3J0KSwgdHlwZW9mKHVzaG9ydCksIHR5cGVvZihpbnQpLCB0eXBlb2YodWludCksIHR5cGVvZihsb25nKSwgdHlwZW9mKHVsb25nKSwgdHlwZW9mKGZsb2F0KSwgdHlwZW9mKGRvdWJsZSksIHR5cGVvZihkZWNpbWFsKSwgdHlwZW9mKERhdGVUaW1lKSwgdHlwZW9mKG9iamVjdCksIHR5cGVvZihzdHJpbmcpfTtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG4gICAgICAgIHN0YXRpYyBDdWx0dXJlSW5mbyBUaHJlYWRfQ3VycmVudFRocmVhZF9DdXJyZW50Q3VsdHVyZSB7Z2V0e3JldHVybiBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IENoYW5nZVR5cGUob2JqZWN0IHZhbHVlLCBUeXBlQ29kZSB0eXBlQ29kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGFuZ2VUeXBlKHZhbHVlLCB0eXBlQ29kZSwgVGhyZWFkX0N1cnJlbnRUaHJlYWRfQ3VycmVudEN1bHR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvYmplY3QgQ2hhbmdlVHlwZShvYmplY3QgdmFsdWUsIFR5cGVDb2RlIHR5cGVDb2RlLCBJRm9ybWF0UHJvdmlkZXIgcHJvdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCAmJiAodHlwZUNvZGUgPT0gVHlwZUNvZGUuRW1wdHkgfHwgdHlwZUNvZGUgPT0gVHlwZUNvZGUuU3RyaW5nIHx8IHR5cGVDb2RlID09IFR5cGVDb2RlLk9iamVjdCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVDb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVDb2RlLkJvb2xlYW46XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9Cb29sZWFuKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVDb2RlLkNoYXI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9DaGFyKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVDb2RlLlNCeXRlOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvU0J5dGUodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUNvZGUuQnl0ZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0J5dGUodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUNvZGUuSW50MTY6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9JbnQxNih2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQ29kZS5VSW50MTY6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9VSW50MTYodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUNvZGUuSW50MzI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9JbnQzMih2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQ29kZS5VSW50MzI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9VSW50MzIodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUNvZGUuSW50NjQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9JbnQ2NCh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQ29kZS5VSW50NjQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9VSW50NjQodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUNvZGUuU2luZ2xlOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvU2luZ2xlKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVDb2RlLkRvdWJsZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0RvdWJsZSh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQ29kZS5EZWNpbWFsOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvRGVjaW1hbCh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQ29kZS5EYXRlVGltZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0RhdGVUaW1lKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVDb2RlLlN0cmluZzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub1N0cmluZyh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQ29kZS5PYmplY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQ29kZS5EQk51bGw6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRDYXN0RXhjZXB0aW9uKEVudmlyb25tZW50X0dldFJlc291cmNlU3RyaW5nKFwiSW52YWxpZENhc3RfREJOdWxsXCIpKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUNvZGUuRW1wdHk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRDYXN0RXhjZXB0aW9uKEVudmlyb25tZW50X0dldFJlc291cmNlU3RyaW5nKFwiSW52YWxpZENhc3RfRW1wdHlcIikpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oRW52aXJvbm1lbnRfR2V0UmVzb3VyY2VTdHJpbmcoXCJBcmdfVW5rbm93blR5cGVDb2RlXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvYmplY3QgQ2hhbmdlVHlwZShvYmplY3QgdmFsdWUsIFR5cGUgY29udmVyc2lvblR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhbmdlVHlwZSh2YWx1ZSwgY29udmVyc2lvblR5cGUsIFRocmVhZF9DdXJyZW50VGhyZWFkX0N1cnJlbnRDdWx0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IENoYW5nZVR5cGUob2JqZWN0IHZhbHVlLCBUeXBlIGNvbnZlcnNpb25UeXBlLCBJRm9ybWF0UHJvdmlkZXIgcHJvdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29udmVyc2lvblR5cGUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNvbnZlcnNpb25UeXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoY29udmVyc2lvblR5cGUuSXNWYWx1ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIHRocm93IG5ldyBJbnZhbGlkQ2FzdEV4Y2VwdGlvbihFbnZpcm9ubWVudF9HZXRSZXNvdXJjZVN0cmluZyhcIkludmFsaWRDYXN0X0Nhbm5vdENhc3ROdWxsVG9WYWx1ZVR5cGVcIikpO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlLkdldFR5cGUoKSA9PSBjb252ZXJzaW9uVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcnRDb252ZXJzaW9uVHlwZSA9IGNvbnZlcnNpb25UeXBlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJ0Q29udmVyc2lvblR5cGUgPT0gdHlwZW9mKGJvb2wpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9Cb29sZWFuKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmIChydENvbnZlcnNpb25UeXBlID09IENvbnZlcnRUeXBlc1soaW50KSBUeXBlQ29kZS5DaGFyXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvQ2hhcih2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAocnRDb252ZXJzaW9uVHlwZSA9PSBDb252ZXJ0VHlwZXNbKGludCkgVHlwZUNvZGUuU0J5dGVdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9TQnl0ZSh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAocnRDb252ZXJzaW9uVHlwZSA9PSBDb252ZXJ0VHlwZXNbKGludCkgVHlwZUNvZGUuQnl0ZV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0J5dGUodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHJ0Q29udmVyc2lvblR5cGUgPT0gQ29udmVydFR5cGVzWyhpbnQpIFR5cGVDb2RlLkludDE2XSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvSW50MTYodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHJ0Q29udmVyc2lvblR5cGUgPT0gQ29udmVydFR5cGVzWyhpbnQpIFR5cGVDb2RlLlVJbnQxNl0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub1VJbnQxNih2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAocnRDb252ZXJzaW9uVHlwZSA9PSBDb252ZXJ0VHlwZXNbKGludCkgVHlwZUNvZGUuSW50MzJdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9JbnQzMih2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAocnRDb252ZXJzaW9uVHlwZSA9PSBDb252ZXJ0VHlwZXNbKGludCkgVHlwZUNvZGUuVUludDMyXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvVUludDMyKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmIChydENvbnZlcnNpb25UeXBlID09IENvbnZlcnRUeXBlc1soaW50KSBUeXBlQ29kZS5JbnQ2NF0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0ludDY0KHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmIChydENvbnZlcnNpb25UeXBlID09IENvbnZlcnRUeXBlc1soaW50KSBUeXBlQ29kZS5VSW50NjRdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9VSW50NjQodmFsdWUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgaWYgKHJ0Q29udmVyc2lvblR5cGUgPT0gQ29udmVydFR5cGVzWyhpbnQpIFR5cGVDb2RlLlNpbmdsZV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub1NpbmdsZSh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAocnRDb252ZXJzaW9uVHlwZSA9PSBDb252ZXJ0VHlwZXNbKGludCkgVHlwZUNvZGUuRG91YmxlXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvRG91YmxlKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmIChydENvbnZlcnNpb25UeXBlID09IENvbnZlcnRUeXBlc1soaW50KSBUeXBlQ29kZS5EZWNpbWFsXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvRGVjaW1hbCh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAocnRDb252ZXJzaW9uVHlwZSA9PSBDb252ZXJ0VHlwZXNbKGludCkgVHlwZUNvZGUuRGF0ZVRpbWVdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9EYXRlVGltZSh2YWx1ZSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBpZiAocnRDb252ZXJzaW9uVHlwZSA9PSBDb252ZXJ0VHlwZXNbKGludCkgVHlwZUNvZGUuU3RyaW5nXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvU3RyaW5nKHZhbHVlLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIGlmIChydENvbnZlcnNpb25UeXBlID09IENvbnZlcnRUeXBlc1soaW50KSBUeXBlQ29kZS5PYmplY3RdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBNZXRob2RzXHJcbiAgICAgICAgc3RhdGljIHN0cmluZyBFbnZpcm9ubWVudF9HZXRSZXNvdXJjZVN0cmluZyhzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyAgICAgVGhlIGV4dGVuc2lvbnNcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBSZW1vdmVzIHZhbHVlIGZyb20gc3RhcnQgb2Ygc3RyXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBSZW1vdmVGcm9tU3RhcnQodGhpcyBzdHJpbmcgZGF0YSwgc3RyaW5nIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLlN0YXJ0c1dpdGgodmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5TdWJzdHJpbmcodmFsdWUuTGVuZ3RoLCBkYXRhLkxlbmd0aCAtIHZhbHVlLkxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgR2V0cyB0aGUgZGVmYXVsdCBmb3JtYXQgcHJvdmlkZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBzdGF0aWMgSUZvcm1hdFByb3ZpZGVyIERlZmF1bHRGb3JtYXRQcm92aWRlciB7Z2V0e3JldHVybiBDdWx0dXJlSW5mby5DdXJyZW50Q3VsdHVyZTt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIENvbXBhcmVzIHRoZSBzcGVjaWZpZWQgcmlnaHQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJsZWZ0XCI+VGhlIGxlZnQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyaWdodFwiPlRoZSByaWdodC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZvcm1hdFByb3ZpZGVyXCI+VGhlIGZvcm1hdCBwcm92aWRlci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgQ29tcGFyZSh0aGlzIG9iamVjdCBsZWZ0LCBvYmplY3QgcmlnaHQsIElGb3JtYXRQcm92aWRlciBmb3JtYXRQcm92aWRlciA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoUmVmZXJlbmNlRXF1YWxzKGxlZnQsIG51bGwpICYmIFJlZmVyZW5jZUVxdWFscyhyaWdodCwgbnVsbCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxlZnQuSXNOdW1lcmljKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFZhbHVlTXVzdGJlTnVtZXJpYyhsZWZ0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFyaWdodC5Jc051bWVyaWMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgVmFsdWVNdXN0YmVOdW1lcmljKHJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9EZWNpbWFsKGxlZnQsIGZvcm1hdFByb3ZpZGVyKS5Db21wYXJlVG8oQ29udmVydC5Ub0RlY2ltYWwocmlnaHQsIGZvcm1hdFByb3ZpZGVyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBEZXRlcm1pbmVzIHdoZXRoZXIgW2lzIGJpZ2dlciB0aGFuXSBbdGhlIHNwZWNpZmllZCByaWdodF0uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJsZWZ0XCI+VGhlIGxlZnQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyaWdodFwiPlRoZSByaWdodC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZvcm1hdFByb3ZpZGVyXCI+VGhlIGZvcm1hdCBwcm92aWRlci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5cclxuICAgICAgICAvLy8gICAgIDxjPnRydWU8L2M+IGlmIFtpcyBiaWdnZXIgdGhhbl0gW3RoZSBzcGVjaWZpZWQgcmlnaHRdOyBvdGhlcndpc2UsIDxjPmZhbHNlPC9jPi5cclxuICAgICAgICAvLy8gPC9yZXR1cm5zPlxyXG4gICAgICAgIC8vLyA8ZXhjZXB0aW9uIGNyZWY9XCJTeXN0ZW0uQXJndW1lbnRFeGNlcHRpb25cIj48L2V4Y2VwdGlvbj5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNCaWdnZXJUaGFuKHRoaXMgb2JqZWN0IGxlZnQsIG9iamVjdCByaWdodCwgSUZvcm1hdFByb3ZpZGVyIGZvcm1hdFByb3ZpZGVyID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChSZWZlcmVuY2VFcXVhbHMobGVmdCwgbnVsbCkgfHwgUmVmZXJlbmNlRXF1YWxzKHJpZ2h0LCBudWxsKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGVmdC5Jc051bWVyaWMoKSAmJiByaWdodC5Jc051bWVyaWMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9EZWNpbWFsKGxlZnQsIGZvcm1hdFByb3ZpZGVyKSA+IENvbnZlcnQuVG9EZWNpbWFsKHJpZ2h0LCBmb3JtYXRQcm92aWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKGxlZnQuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBEZXRlcm1pbmVzIHdoZXRoZXIgW2lzIG5vdCBudWxsXS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlxyXG4gICAgICAgIC8vLyAgICAgPGM+dHJ1ZTwvYz4gaWYgW2lzIG5vdCBudWxsXSBbdGhlIHNwZWNpZmllZCB2YWx1ZV07IG90aGVyd2lzZSwgPGM+ZmFsc2U8L2M+LlxyXG4gICAgICAgIC8vLyA8L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzTm90TnVsbCh0aGlzIG9iamVjdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhUmVmZXJlbmNlRXF1YWxzKHZhbHVlLCBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIERldGVybWluZXMgd2hldGhlciB0aGlzIGluc3RhbmNlIGlzIG51bGwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5cclxuICAgICAgICAvLy8gICAgIDxjPnRydWU8L2M+IGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgbnVsbDsgb3RoZXJ3aXNlLCA8Yz5mYWxzZTwvYz4uXHJcbiAgICAgICAgLy8vIDwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNOdWxsKHRoaXMgb2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlZmVyZW5jZUVxdWFscyh2YWx1ZSwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBEZXRlcm1pbmVzIHdoZXRoZXIgdGhpcyBpbnN0YW5jZSBpcyBudW1lcmljLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+XHJcbiAgICAgICAgLy8vICAgICA8Yz50cnVlPC9jPiBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIG51bWVyaWM7IG90aGVyd2lzZSwgPGM+ZmFsc2U8L2M+LlxyXG4gICAgICAgIC8vLyA8L3JldHVybnM+XHJcbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIlN5c3RlbS5Bcmd1bWVudEV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc051bWVyaWModGhpcyBvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoUmVmZXJlbmNlRXF1YWxzKHZhbHVlLCBudWxsKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgaXMgYnl0ZSB8fFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgaXMgc2J5dGUgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlIGlzIHVzaG9ydCB8fFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgaXMgdWludCB8fFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgaXMgdWxvbmcgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlIGlzIHNob3J0IHx8XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSBpcyBpbnQgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlIGlzIGxvbmcgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlIGlzIGRlY2ltYWwgfHxcclxuICAgICAgICAgICAgICAgIHZhbHVlIGlzIGRvdWJsZSB8fFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgaXMgZmxvYXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24odmFsdWUuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCByaWdodCBpcyBzYW1lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibGVmdFwiPlRoZSBsZWZ0LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmlnaHRcIj5UaGUgcmlnaHQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmb3JtYXRQcm92aWRlclwiPlRoZSBmb3JtYXQgcHJvdmlkZXIuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+XHJcbiAgICAgICAgLy8vICAgICA8Yz50cnVlPC9jPiBpZiB0aGUgc3BlY2lmaWVkIHJpZ2h0IGlzIHNhbWU7IG90aGVyd2lzZSwgPGM+ZmFsc2U8L2M+LlxyXG4gICAgICAgIC8vLyA8L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzU2FtZSh0aGlzIG9iamVjdCBsZWZ0LCBvYmplY3QgcmlnaHQsIElGb3JtYXRQcm92aWRlciBmb3JtYXRQcm92aWRlciA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoUmVmZXJlbmNlRXF1YWxzKGxlZnQsIG51bGwpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmZXJlbmNlRXF1YWxzKHJpZ2h0LCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxlZnRBc1N0cmluZyA9IGxlZnQgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAobGVmdEFzU3RyaW5nICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0QXNTdHJpbmcuRXF1YWxzKHJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmlnaHQgaXMgc3RyaW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsZWZ0LklzTnVtZXJpYygpICYmIHJpZ2h0LklzTnVtZXJpYygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0RlY2ltYWwobGVmdCwgZm9ybWF0UHJvdmlkZXIpID09IENvbnZlcnQuVG9EZWNpbWFsKHJpZ2h0LCBmb3JtYXRQcm92aWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBsZWZ0LkVxdWFscyhyaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBEZXRlcm1pbmVzIHdoZXRoZXIgdGhpcyBpbnN0YW5jZSBpcyBzdHJpbmcuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sPyBJc1N0cmluZyh0aGlzIG9iamVjdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSBpcyBzdHJpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBUbyB0aGUgYm9vbGVhbi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgVG9Cb29sZWFuKHRoaXMgb2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRvQm9vbGVhbih2YWx1ZSwgRGVmYXVsdEZvcm1hdFByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIFRvIHRoZSBib29sZWFuLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmb3JtYXRQcm92aWRlclwiPlRoZSBmb3JtYXQgcHJvdmlkZXIuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIC8vLyA8ZXhjZXB0aW9uIGNyZWY9XCJTeXN0ZW0uQXJndW1lbnROdWxsRXhjZXB0aW9uXCI+dmFsdWU8L2V4Y2VwdGlvbj5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgVG9Cb29sZWFuKHRoaXMgb2JqZWN0IHZhbHVlLCBJRm9ybWF0UHJvdmlkZXIgZm9ybWF0UHJvdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuSXNOdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0Jvb2xlYW4odmFsdWUsIGZvcm1hdFByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIFRvIHRoZSBib29sZWFuIG51bGxhYmxlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbD8gVG9Cb29sZWFuTnVsbGFibGUodGhpcyBvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVG9Cb29sZWFuTnVsbGFibGUodmFsdWUsIERlZmF1bHRGb3JtYXRQcm92aWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBUbyB0aGUgYm9vbGVhbiBudWxsYWJsZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZm9ybWF0UHJvdmlkZXJcIj5UaGUgZm9ybWF0IHByb3ZpZGVyLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2w/IFRvQm9vbGVhbk51bGxhYmxlKHRoaXMgb2JqZWN0IHZhbHVlLCBJRm9ybWF0UHJvdmlkZXIgZm9ybWF0UHJvdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuSXNOdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvQm9vbGVhbih2YWx1ZSwgZm9ybWF0UHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgVG8gdGhlIGRlY2ltYWwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZvcm1hdFByb3ZpZGVyXCI+VGhlIGZvcm1hdCBwcm92aWRlci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIlN5c3RlbS5Bcmd1bWVudE51bGxFeGNlcHRpb25cIj52YWx1ZTwvZXhjZXB0aW9uPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGVjaW1hbCBUb0RlY2ltYWwodGhpcyBvYmplY3QgdmFsdWUsIElGb3JtYXRQcm92aWRlciBmb3JtYXRQcm92aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5Jc051bGwoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvRGVjaW1hbCh2YWx1ZSwgZm9ybWF0UHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgVG8gdGhlIGRlY2ltYWwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIlN5c3RlbS5Bcmd1bWVudE51bGxFeGNlcHRpb25cIj52YWx1ZTwvZXhjZXB0aW9uPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGVjaW1hbCBUb0RlY2ltYWwodGhpcyBvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuSXNOdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gVG9EZWNpbWFsKHZhbHVlLCBEZWZhdWx0Rm9ybWF0UHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgVG8gdGhlIGRlY2ltYWwgbnVsbGFibGUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZvcm1hdFByb3ZpZGVyXCI+VGhlIGZvcm1hdCBwcm92aWRlci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkZWNpbWFsPyBUb0RlY2ltYWxOdWxsYWJsZSh0aGlzIG9iamVjdCB2YWx1ZSwgSUZvcm1hdFByb3ZpZGVyIGZvcm1hdFByb3ZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLklzTnVsbCgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0RlY2ltYWwodmFsdWUsIGZvcm1hdFByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIFRvIHRoZSBkZWNpbWFsIG51bGxhYmxlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGVjaW1hbD8gVG9EZWNpbWFsTnVsbGFibGUodGhpcyBvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVG9EZWNpbWFsTnVsbGFibGUodmFsdWUsIERlZmF1bHRGb3JtYXRQcm92aWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBUbyB0aGUgaW50MzIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgLy8vIDxleGNlcHRpb24gY3JlZj1cIlN5c3RlbS5Bcmd1bWVudE51bGxFeGNlcHRpb25cIj52YWx1ZTwvZXhjZXB0aW9uPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IFRvSW50MzIodGhpcyBvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuSXNOdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQ29udmVydC5Ub0ludDMyKHZhbHVlLCBEZWZhdWx0Rm9ybWF0UHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgVG8gdGhlIGludDMyIG51bGxhYmxlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmb3JtYXRQcm92aWRlclwiPlRoZSBmb3JtYXQgcHJvdmlkZXIuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50PyBUb0ludDMyTnVsbGFibGUodGhpcyBvYmplY3QgdmFsdWUsIElGb3JtYXRQcm92aWRlciBmb3JtYXRQcm92aWRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5Jc051bGwoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9JbnQzMih2YWx1ZSwgZm9ybWF0UHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBUbyB0aGUgaW50MzIgbnVsbGFibGUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludD8gVG9JbnQzMk51bGxhYmxlKHRoaXMgb2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRvSW50MzJOdWxsYWJsZSh2YWx1ZSwgQ3VsdHVyZUluZm8uQ3VycmVudEN1bHR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTWV0aG9kc1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIFZhbHVlcyB0aGUgbXVzdGJlIG51bWVyaWMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgc3RhdGljIEFyZ3VtZW50RXhjZXB0aW9uIFZhbHVlTXVzdGJlTnVtZXJpYyhvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFyZ3VtZW50RXhjZXB0aW9uKHZhbHVlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRGF0YVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmluZGluZ0luZm9cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHVibGljIEJpbmRpbmdNb2RlIEJpbmRpbmdNb2RlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBTb3VyY2UgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNvdXJjZVBhdGhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLFBhdGgpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxQcm9wZXJ0eVBhdGg+KFwia2V5MVwiKS5QYXRoOihzdHJpbmcpbnVsbDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUGF0aCA9IG5ldyBQcm9wZXJ0eVBhdGgodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHJvcGVydHlQYXRoIFBhdGhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldDtcclxuICAgICAgICAgICAgc2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBUYXJnZXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRhcmdldFByb3BlcnR5TmFtZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuICAgICAgICBvYmplY3QgVGFyZ2V0VmFsdWUge2dldHtyZXR1cm4gVGFyZ2V0LkdldFR5cGUoKS5HZXRQcm9wZXJ0eShUYXJnZXRQcm9wZXJ0eU5hbWUpLkdldFZhbHVlKFRhcmdldCk7fX1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEJpbmRpbmdJbmZvIFRyeVBhcnNlRXhwcmVzc2lvbihzdHJpbmcgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuVHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlLlN0YXJ0c1dpdGgoXCJ7XCIpID09IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlLkVuZHNXaXRoKFwifVwiKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gdmFsdWUuU3Vic3RyaW5nKDEsIHZhbHVlLkxlbmd0aCAtIDIpO1xyXG5cclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuUmVtb3ZlRnJvbVN0YXJ0KFwiQmluZGluZyBcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpbmRpbmdJbmZvIHsgU291cmNlUGF0aCA9IHRleHQgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENvbm5lY3QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFRhcmdldFByb3BlcnR5TmFtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRJbmZvID0gUmVmbGVjdGlvbkhlbHBlci5GaW5kRXZlbnQoVGFyZ2V0LCBUYXJnZXRQcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50SW5mbyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2RJbmZvID0gU291cmNlLkdldFR5cGUoKS5HZXRNZXRob2QoU291cmNlUGF0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0gRGVsZWdhdGUuQ3JlYXRlRGVsZWdhdGUodHlwZW9mKEFjdGlvbiksIFNvdXJjZSwgbWV0aG9kSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBEZWxlZ2F0ZS5DcmVhdGVEZWxlZ2F0ZSh0eXBlb2YoQWN0aW9uPGludD4pLCBTb3VyY2UsIG1ldGhvZEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKFNvdXJjZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRJbmZvLkFkZEV2ZW50SGFuZGxlcihUYXJnZXQsIGhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29ubmVjdFNvdXJjZVRvVGFyZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICBVcGRhdGVUYXJnZXQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChCaW5kaW5nTW9kZSA9PSBCaW5kaW5nTW9kZS5Ud29XYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbm5lY3RUYXJnZXRUb1NvdXJjZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZVNvdXJjZShvYmplY3QgbmV3VmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWZsZWN0aW9uSGVscGVyLlNldFByb3BlcnR5VmFsdWUoU291cmNlLCBTb3VyY2VQYXRoLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZVRhcmdldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBSZWZsZWN0aW9uSGVscGVyLkdldFByb3BlcnR5VmFsdWUoU291cmNlLCBTb3VyY2VQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIFJlZmxlY3Rpb25IZWxwZXIuU2V0UHJvcGVydHlWYWx1ZShUYXJnZXQsIFRhcmdldFByb3BlcnR5TmFtZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTWV0aG9kc1xyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQ29ubmVjdFNvdXJjZVRvVGFyZ2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBTb3VyY2UgYXMgSU5vdGlmeVByb3BlcnR5Q2hhbmdlZDtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNvdXJjZS5Qcm9wZXJ0eUNoYW5nZWQgKz0gKHNlbmRlciwgZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuUHJvcGVydHlOYW1lID09IFNvdXJjZVBhdGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlVGFyZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIENvbm5lY3RUYXJnZXRUb1NvdXJjZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gVGFyZ2V0IGFzIElOb3RpZnlQcm9wZXJ0eUNoYW5nZWQ7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuUHJvcGVydHlDaGFuZ2VkICs9IChzZW5kZXIsIGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlByb3BlcnR5TmFtZSA9PSBUYXJnZXRQcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlU291cmNlKFRhcmdldFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEZXBlbmRlbmN5UHJvcGVydHlcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBJTGlzdDxEZXBlbmRlbmN5UHJvcGVydHk+IEdldEFsbFByb3BlcnRpZXMoVHlwZSBvd25lclR5cGUsYm9vbCBhZGRCYXNlID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAob3duZXJUeXBlID09IG51bGwgfHwgb3duZXJUeXBlID09IHR5cGVvZihvYmplY3QpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gbmV3IExpc3Q8RGVwZW5kZW5jeVByb3BlcnR5PigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGtleSA9IENyZWF0ZUtleShvd25lclR5cGUsIG51bGwpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY2FjaGVLZXkgaW4gQ2FjaGUuS2V5cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlS2V5LlN0YXJ0c1dpdGgoa2V5KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5BZGQoQ2FjaGVbY2FjaGVLZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFkZEJhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBiYXNlVmFsdWVzID0gR2V0QWxsUHJvcGVydGllcyhvd25lclR5cGUuQmFzZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VWYWx1ZXMgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5BZGRSYW5nZShiYXNlVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGludGVybmFsIHN0cmluZyBLZXkge2dldHtyZXR1cm4gQ3JlYXRlS2V5KE93bmVyVHlwZS5GdWxsTmFtZSwgTmFtZSk7fX1cclxuXHJcbiAgICAgICAgc3RhdGljIHN0cmluZyBDcmVhdGVLZXkoc3RyaW5nIG93bmVyVHlwZUZ1bGxOYW1lLCBzdHJpbmcgcHJvcGVydHlOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG93bmVyVHlwZUZ1bGxOYW1lICsgXCItPlwiICsgcHJvcGVydHlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgc3RyaW5nIENyZWF0ZUtleShUeXBlIG93bmVyVHlwZSwgc3RyaW5nIHByb3BlcnR5TmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBDcmVhdGVLZXkob3duZXJUeXBlLkZ1bGxOYW1lLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgRGVwZW5kZW5jeVByb3BlcnR5IFRyeUZpbmQoVHlwZSBvd25lclR5cGUsIHN0cmluZyBwcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIGtleSA9IENyZWF0ZUtleShvd25lclR5cGUsIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIERlcGVuZGVuY3lQcm9wZXJ0eSBwcm9wZXJ0eSA9IG51bGw7XHJcbiAgICAgICAgICAgIENhY2hlLlRyeUdldFZhbHVlKGtleSwgb3V0IHByb3BlcnR5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBEZXBlbmRlbmN5UHJvcGVydHkgU2VhcmNoKFR5cGUgb3duZXJUeXBlLCBzdHJpbmcgcHJvcGVydHlOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvd25lclR5cGUgPT0gbnVsbCB8fCBvd25lclR5cGUgPT0gdHlwZW9mKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlcGVuZGVuY3lQcm9wZXJ0eSA9IFRyeUZpbmQob3duZXJUeXBlLCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lQcm9wZXJ0eSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZXBlbmRlbmN5UHJvcGVydHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb3duZXJUeXBlID0gb3duZXJUeXBlLkJhc2VUeXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVHlwZSBPd25lclR5cGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUeXBlIFByb3BlcnR5VHlwZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFByb3BlcnR5TWV0YWRhdGEgUHJvcGVydHlNZXRhZGF0YSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIHZvaWQgVHJ5SW52b2tlT25Qcm9wZXJ0eUNoYW5nZShEZXBlbmRlbmN5T2JqZWN0IGluc3RhbmNlLCBzdHJpbmcgbmFtZSwgb2JqZWN0IG5ld1ZhbHVlLCBvYmplY3Qgb2xkVmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGVwZW5kZW5jeVByb3BlcnR5ID0gU2VhcmNoKGluc3RhbmNlLkdldFR5cGUoKSwgbmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5UHJvcGVydHkgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixkZXBlbmRlbmN5UHJvcGVydHkuUHJvcGVydHlNZXRhZGF0YSkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFByb3BlcnR5TWV0YWRhdGE+KFwia2V5MVwiKS5Qcm9wZXJ0eUNoYW5nZWRDYWxsYmFjazooUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2spbnVsbCkgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLGRlcGVuZGVuY3lQcm9wZXJ0eS5Qcm9wZXJ0eU1ldGFkYXRhKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFByb3BlcnR5TWV0YWRhdGE+KFwia2V5MlwiKS5Qcm9wZXJ0eUNoYW5nZWRDYWxsYmFjay5JbnZva2UoaW5zdGFuY2UsIG5ldyBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKG5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSkpKTpudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgRGVwZW5kZW5jeVByb3BlcnR5PiBDYWNoZSA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgRGVwZW5kZW5jeVByb3BlcnR5PigpO1xyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBSZWdpc3RlcihEZXBlbmRlbmN5UHJvcGVydHkgZGVzY3JpcHRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ2FjaGUuQ29udGFpbnNLZXkoZGVzY3JpcHRpb24uS2V5KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKGRlc2NyaXB0aW9uLktleSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIENhY2hlW2Rlc2NyaXB0aW9uLktleV0gPSBkZXNjcmlwdGlvbjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIERlcGVuZGVuY3lQcm9wZXJ0eSBSZWdpc3RlcihzdHJpbmcgbmFtZSwgVHlwZSBwcm9wZXJ0eVR5cGUsIFR5cGUgb3duZXJUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRlcGVuZGVuY3lQcm9wZXJ0eSA9IG5ldyBEZXBlbmRlbmN5UHJvcGVydHlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmFtZSA9IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eVR5cGUgPSBwcm9wZXJ0eVR5cGUsXHJcbiAgICAgICAgICAgICAgICBPd25lclR5cGUgPSBvd25lclR5cGUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyKGRlcGVuZGVuY3lQcm9wZXJ0eSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVwZW5kZW5jeVByb3BlcnR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBEZXBlbmRlbmN5UHJvcGVydHkgUmVnaXN0ZXIoc3RyaW5nIG5hbWUsIFR5cGUgcHJvcGVydHlUeXBlLCBUeXBlIG93bmVyVHlwZSwgUHJvcGVydHlNZXRhZGF0YSBwcm9wZXJ0eU1ldGFkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRlcGVuZGVuY3lQcm9wZXJ0eSA9IG5ldyBEZXBlbmRlbmN5UHJvcGVydHlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmFtZSA9IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eVR5cGUgPSBwcm9wZXJ0eVR5cGUsXHJcbiAgICAgICAgICAgICAgICBPd25lclR5cGUgPSBvd25lclR5cGUsXHJcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eU1ldGFkYXRhID0gcHJvcGVydHlNZXRhZGF0YVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBSZWdpc3RlcihkZXBlbmRlbmN5UHJvcGVydHkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlcGVuZGVuY3lQcm9wZXJ0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9wZXJ0eU1ldGFkYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG9iamVjdCBEZWZhdWx0VmFsdWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrIFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBQcm9wZXJ0eU1ldGFkYXRhKFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrIHByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sgPSBwcm9wZXJ0eUNoYW5nZWRDYWxsYmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFByb3BlcnR5TWV0YWRhdGEob2JqZWN0IGRlZmF1bHRWYWx1ZSAsUHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2sgcHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEZWZhdWx0VmFsdWUgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrID0gcHJvcGVydHlDaGFuZ2VkQ2FsbGJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxlZ2F0ZSBib29sIFZhbGlkYXRlVmFsdWVDYWxsYmFjayhvYmplY3QgdmFsdWUpO1xyXG5cclxuICAgIHB1YmxpYyBkZWxlZ2F0ZSB2b2lkIFByb3BlcnR5Q2hhbmdlZENhbGxiYWNrKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKTtcclxuICAgIHB1YmxpYyBjbGFzcyBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIDogQmFnQ2hhbmdlZEV2ZW50QXJnc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHN0cmluZyBwcm9wZXJ0eU5hbWUpIDogYmFzZShwcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhzdHJpbmcgcHJvcGVydHlOYW1lLCBvYmplY3QgbmV3VmFsdWUpIDogYmFzZShwcm9wZXJ0eU5hbWUsIG5ld1ZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Moc3RyaW5nIHByb3BlcnR5TmFtZSwgb2JqZWN0IG5ld1ZhbHVlLCBvYmplY3Qgb2xkVmFsdWUpIDogYmFzZShwcm9wZXJ0eU5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9wZXJ0eVBhdGhcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG4gICAgICAgIHB1YmxpYyBQcm9wZXJ0eVBhdGgoc3RyaW5nIHBhdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQYXRoID0gcGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQYXRoIHsgZ2V0OyAgcHJpdmF0ZSBzZXQ7ICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLlhtbFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFhtbEV4Y2VwdGlvbiA6IFN5c3RlbUV4Y2VwdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBYbWxFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UsIEV4Y2VwdGlvbiBpbm5lckV4Y2VwdGlvbikgOiBiYXNlKG1lc3NhZ2UsIGlubmVyRXhjZXB0aW9uKSB7IH1cclxuICAgIH1cclxuICAgIFtJZ25vcmVDYXN0XVxyXG4gICAgW0V4dGVybmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFhtbERvY3VtZW50XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG4gICAgICAgIFtOYW1lKFwiZmlyc3RDaGlsZFwiKV1cclxuICAgICAgICBwdWJsaWMgWG1sTm9kZSBGaXJzdENoaWxkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxuXHJcbiAgICBbSWdub3JlQ2FzdF1cclxuICAgIFtFeHRlcm5hbF1cclxuICAgIHB1YmxpYyBjbGFzcyBYbWxOb2RlTGlzdCA6IElFbnVtZXJhYmxlPFhtbE5vZGU+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG4gICAgICAgIFtOYW1lKFwibGVuZ3RoXCIpXVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ291bnQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIFtOYW1lKFwiZmlyc3RDaGlsZFwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEZpcnN0Q2hpbGQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBJbmRleGVyc1xyXG4gICAgICAgIFtOYW1lKFwidGhpc1tpbmRleF1cIildXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgWG1sTm9kZSB0aGlzW2ludCBpbmRleF1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYXRvcjxYbWxOb2RlPiBHZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gRXhwbGljaXQgSW50ZXJmYWNlIE1ldGhvZHNcclxuICAgICAgICBJRW51bWVyYXRvciBJRW51bWVyYWJsZS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcblxyXG4gICAgW0lnbm9yZUNhc3RdXHJcbiAgICBbRXh0ZXJuYWxdXHJcbiAgICBwdWJsaWMgY2xhc3MgWG1sTm9kZVxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHVibGljIFByb3BlcnRpZXNcclxuICAgICAgICBbTmFtZShcImF0dHJpYnV0ZXNcIildXHJcbiAgICAgICAgcHVibGljICBYbWxBdHRyaWJ1dGVDb2xsZWN0aW9uIEF0dHJpYnV0ZXMgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIFtOYW1lKFwiY2hpbGROb2Rlc1wiKV1cclxuICAgICAgICBwdWJsaWMgWG1sTm9kZUxpc3QgQ2hpbGROb2RlcyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtOYW1lKFwibm9kZU5hbWVcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW05hbWUoXCJub2RlVHlwZVwiKV1cclxuICAgICAgICBwdWJsaWMgTm9kZVR5cGUgTm9kZVR5cGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIFtJZ25vcmVDYXN0XVxyXG4gICAgW0V4dGVybmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFhtbEF0dHJpYnV0ZUNvbGxlY3Rpb246IElFbnVtZXJhYmxlPFhtbEF0dHJpYnV0ZT5cclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgW05hbWUoXCJsZW5ndGhcIildXHJcbiAgICAgICAgcHVibGljIGludCBDb3VudCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIEluZGV4ZXJzXHJcbiAgICAgICAgW05hbWUoXCJ0aGlzW2luZGV4XVwiKV1cclxuICAgICAgICBwdWJsaWMgWG1sQXR0cmlidXRlIHRoaXNbaW50IGluZGV4XVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtOYW1lKFwidGhpc1tuYW1lXVwiKV1cclxuICAgICAgICBwdWJsaWMgbmV3IFhtbEF0dHJpYnV0ZSB0aGlzW3N0cmluZyBuYW1lXVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yPFhtbEF0dHJpYnV0ZT4gR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIEV4cGxpY2l0IEludGVyZmFjZSBNZXRob2RzXHJcbiAgICAgICAgSUVudW1lcmF0b3IgSUVudW1lcmFibGUuR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIFtJZ25vcmVDYXN0XVxyXG4gICAgW0V4dGVybmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFhtbEF0dHJpYnV0ZSA6IFhtbE5vZGVcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgW05hbWUoXCJub2RlVmFsdWVcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBWYWx1ZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLldpbmRvd3MuQ29udHJvbHM7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db2RlTWlycm9yO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuRGVzaWduO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuVUkuRGVzaWduO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCdWlsZGVyIDogVUkuRGVzaWduLkJ1aWxkZXJcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFN0YXRpYyBGaWVsZHNcclxuICAgICAgICBzdGF0aWMgRGljdGlvbmFyeTxzdHJpbmcsIFR5cGU+IFR5cGVzO1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBJUmVhZE9ubHlMaXN0PFhtbEludGVsbGlzZW5zZUluZm8+IEdldEludGVsbGlzZW5zZUluZm9zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxYbWxJbnRlbGxpc2Vuc2VJbmZvPigpLChfbzEpPT57X28xLkFkZChuZXcgWG1sSW50ZWxsaXNlbnNlSW5mbyhcIkJ1dHRvblwiLCB0eXBlb2YoQnV0dG9uKSkpO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJUYWJQYW5lbFwiLCB0eXBlb2YoVGFiUGFuZWwpKSk7X28xLkFkZChuZXcgWG1sSW50ZWxsaXNlbnNlSW5mbyhcIlRhYlwiLCB0eXBlb2YoVGFiSXRlbSkpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiY2FyZFwiLCB0eXBlb2YoY2FyZCkpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiVGV4dElucHV0XCIsIHR5cGVvZihJbnB1dFRleHQpKSk7X28xLkFkZChuZXcgWG1sSW50ZWxsaXNlbnNlSW5mbyhcIlRleHRCb3hcIiwgdHlwZW9mKElucHV0VGV4dCkpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiQ29tYm9cIiwgdHlwZW9mKENvbWJvKSkpO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJDb21ib0JveFwiLCB0eXBlb2YoQ29tYm8pKSk7X28xLkFkZChuZXcgWG1sSW50ZWxsaXNlbnNlSW5mbyhcIlVuaWZvcm1HcmlkXCIsIHR5cGVvZihVbmlmb3JtR3JpZCkpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiVGV4dEFyZWFcIiwgdHlwZW9mKFRleHRBcmVhKSkpO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJDb250YWluZXJcIiwgdHlwZW9mKENvbnRhaW5lcikpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiU3RhY2tlZFwiLCB0eXBlb2Yoc3RhY2tlZCkpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiR3JvdXBCb3hcIiwgdHlwZW9mKEdyb3VwQm94KSkpO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJHcmlkXCIsIHR5cGVvZihHcmlkKSkge0NoaWxkcmVuVGFncyA9IG5ld1tdIHtcIlJvd1wifX0pO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJGaWVsZFwiLCB0eXBlb2YoRmllbGQpKSk7X28xLkFkZChuZXcgWG1sSW50ZWxsaXNlbnNlSW5mbyhcIkZvcm1cIiwgdHlwZW9mKEZvcm0pKSk7X28xLkFkZChuZXcgWG1sSW50ZWxsaXNlbnNlSW5mbyhcIlJvd1wiLCB0eXBlb2YoUm93KSkge0NoaWxkcmVuVGFncyA9IG5ld1tdIHtcIkNvbHVtblwifX0pO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJDb2x1bW5cIiwgdHlwZW9mKENvbHVtbikpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiSGVhZGVyMVwiLCB0eXBlb2YoSGVhZGVyMSkpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiSGVhZGVyMlwiLCB0eXBlb2YoSGVhZGVyMikpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiSGVhZGVyM1wiLCB0eXBlb2YoSGVhZGVyMykpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiSW1hZ2VcIiwgdHlwZW9mKEltYWdlKSkpO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJJY29uXCIsIHR5cGVvZihJY29uKSkpO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJTZWdtZW50XCIsIHR5cGVvZihTZWdtZW50KSkpO19vMS5BZGQobmV3IFhtbEludGVsbGlzZW5zZUluZm8oXCJUZXh0QmxvY2tcIiwgdHlwZW9mKFRleHRCbG9jaykpKTtfbzEuQWRkKG5ldyBYbWxJbnRlbGxpc2Vuc2VJbmZvKFwiWG1sRWRpdG9yXCIsIHR5cGVvZihYbWxFZGl0b3IpKSk7X28xLkFkZChuZXcgWG1sSW50ZWxsaXNlbnNlSW5mbyhcIlVJRWRpdG9yXCIsIHR5cGVvZihVSUVkaXRvcikpKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTWV0aG9kc1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBUeXBlIENyZWF0ZVR5cGUoc3RyaW5nIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChUeXBlcyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUeXBlcyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgVHlwZT4oKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpbnRlbGxpc2Vuc2VJbmZvIGluIEdldEludGVsbGlzZW5zZUluZm9zKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVHlwZXNbaW50ZWxsaXNlbnNlSW5mby5UYWdOYW1lLlRvVXBwZXIoKV0gPSBpbnRlbGxpc2Vuc2VJbmZvLlR5cGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFR5cGVzLkNvbnRhaW5zS2V5KHRhZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBUeXBlc1t0YWddO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XG51c2luZyBTeXN0ZW0uV2luZG93cy5EYXRhO1xuXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuQ29udHJvbHNcbntcbiAgICBwdWJsaWMgc2VhbGVkIGNsYXNzIEJvb2xlYW5Ub1Zpc2liaWxpdHlDb252ZXJ0ZXIgOiBJVmFsdWVDb252ZXJ0ZXJcbiAgICB7XG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcbiAgICAgICAgcHVibGljIG9iamVjdCBDb252ZXJ0KG9iamVjdCB2YWx1ZSwgVHlwZSB0YXJnZXRUeXBlLCBvYmplY3QgcGFyYW1ldGVyLCBDdWx0dXJlSW5mbyBjdWx0dXJlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodmFsdWUgaXMgYm9vbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJvb2wpIHZhbHVlID8gVmlzaWJpbGl0eS5WaXNpYmxlIDogVmlzaWJpbGl0eS5Db2xsYXBzZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBWaXNpYmlsaXR5LkNvbGxhcHNlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvYmplY3QgQ29udmVydEJhY2sob2JqZWN0IHZhbHVlLCBUeXBlIHRhcmdldFR5cGUsIG9iamVjdCBwYXJhbWV0ZXIsIEN1bHR1cmVJbmZvIGN1bHR1cmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghKHZhbHVlIGlzIFZpc2liaWxpdHkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoVmlzaWJpbGl0eSkgdmFsdWUgPT0gVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgICAgICB9XG4gICAgICAgICNlbmRyZWdpb25cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5EYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIVE1MQmluZGluZ0luZm8gOiBCaW5kaW5nSW5mb1xyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gRmllbGRzXHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBVcGRhdGVPbmx5SW5uZXJIVE1MO1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG4gICAgICAgIHB1YmxpYyBuZXcgalF1ZXJ5IFRhcmdldFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChqUXVlcnkpIGJhc2UuVGFyZ2V0OyB9XHJcbiAgICAgICAgICAgIHNldCB7IGJhc2UuVGFyZ2V0ID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIG5ldyBzdGF0aWMgSFRNTEJpbmRpbmdJbmZvIFRyeVBhcnNlRXhwcmVzc2lvbihzdHJpbmcgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYmluZGluZ0luZm8gPSBCaW5kaW5nSW5mby5UcnlQYXJzZUV4cHJlc3Npb24odmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoYmluZGluZ0luZm8gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSFRNTEJpbmRpbmdJbmZvIHtTb3VyY2VQYXRoID0gYmluZGluZ0luZm8uU291cmNlUGF0aH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGVUYXJnZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFJlZmxlY3Rpb25IZWxwZXIuRmluZFByb3BlcnR5KFNvdXJjZSwgU291cmNlUGF0aCkgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBSZWZsZWN0aW9uSGVscGVyLkdldFByb3BlcnR5VmFsdWUoU291cmNlLCBTb3VyY2VQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChVcGRhdGVPbmx5SW5uZXJIVE1MKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUYXJnZXQuSHRtbCh2YWx1ZSArIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoVGFyZ2V0UHJvcGVydHlOYW1lID09IFwidmFsdWVcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGFyZ2V0LlZhbCh2YWx1ZSArIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGFyZ2V0LkF0dHIoVGFyZ2V0UHJvcGVydHlOYW1lLCB2YWx1ZSArIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBNZXRob2RzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQ29ubmVjdFRhcmdldFRvU291cmNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhcmdldC5Gb2N1c091dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLmpRdWVyeTIualF1ZXJ5Rm9jdXNFdmVudD4pKGV2ID0+IHsgVXBkYXRlU291cmNlKFRhcmdldC5WYWwoKSk7IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxudXNpbmcgU3lzdGVtLldpbmRvd3MuRGF0YTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3Ncclxue1xyXG4gICAgcHVibGljIGVudW0gVGV4dFdyYXBwaW5nXHJcbiAgICB7XHJcbiAgICAgICAgV3JhcFdpdGhPdmVyZmxvdyxcclxuICAgICAgICBOb1dyYXAsXHJcbiAgICAgICAgV3JhcFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBGcmFtZXdvcmtFbGVtZW50IDogRGVwZW5kZW5jeU9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvYmplY3QgR2V0VmFsdWUoRGVwZW5kZW5jeVByb3BlcnR5IGRwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gIHRoaXNbZHAuTmFtZV07XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRwLlByb3BlcnR5TWV0YWRhdGEuRGVmYXVsdFZhbHVlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRwLlByb3BlcnR5TWV0YWRhdGEuRGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRwLlByb3BlcnR5VHlwZS5Jc0VudW0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVudW0uUGFyc2UoZHAuUHJvcGVydHlUeXBlLCBcIjBcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFZhbHVlKERlcGVuZGVuY3lQcm9wZXJ0eSBkcCxvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzW2RwLk5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjcmVnaW9uIEZpZWxkc1xyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbCBqUXVlcnkgX3Jvb3Q7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PEZyYW1ld29ya0VsZW1lbnQ+IF9jaGlsZGVyZW47IFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdHJ1Y3RvcnNcclxuICAgICAgICBwdWJsaWMgRnJhbWV3b3JrRWxlbWVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eUNoYW5nZWQgKz0gKHMsIGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eUNoYW5nZUV2ZW50QXJncyA9IGUgYXMgQmFnQ2hhbmdlZEV2ZW50QXJncztcclxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eUNoYW5nZUV2ZW50QXJncyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERlcGVuZGVuY3lQcm9wZXJ0eS5UcnlJbnZva2VPblByb3BlcnR5Q2hhbmdlKHRoaXMsIHByb3BlcnR5Q2hhbmdlRXZlbnRBcmdzLlByb3BlcnR5TmFtZSwgcHJvcGVydHlDaGFuZ2VFdmVudEFyZ3MuTmV3VmFsdWUsIHByb3BlcnR5Q2hhbmdlRXZlbnRBcmdzLk9sZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHVibGljIElSZWFkT25seUxpc3Q8RnJhbWV3b3JrRWxlbWVudD4gQ2hpbGRlcmVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jaGlsZGVyZW4gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2hpbGRlcmVuID0gbmV3IExpc3Q8RnJhbWV3b3JrRWxlbWVudD4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NoaWxkZXJlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGpRdWVyeSBSb290IHtnZXR7cmV0dXJuIF9yb290O319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuICAgICAgICBwcm90ZWN0ZWQgaW50IENoaWxkcmVuQ291bnQge2dldHtyZXR1cm4gKF9jaGlsZGVyZW4hPW51bGw/X2NoaWxkZXJlbi5Db3VudDooaW50PyludWxsKS5HZXRWYWx1ZU9yRGVmYXVsdCgpO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBNZXRob2RzXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBBZGRDaGlsZChGcmFtZXdvcmtFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2NoaWxkZXJlbiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY2hpbGRlcmVuID0gbmV3IExpc3Q8RnJhbWV3b3JrRWxlbWVudD4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfY2hpbGRlcmVuLkFkZChlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQmluZFByb3BlcnR5VG9Jbm5lckhUTUwoc3RyaW5nIHByb3BlcnR5TmFtZSwgalF1ZXJ5IHRhcmdldEVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiByZW1vdmVcclxuICAgICAgICAgICAgUHJvcGVydHlDaGFuZ2VkICs9IChzLCBhKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmkgPSBuZXcgSFRNTEJpbmRpbmdJbmZvXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQmluZGluZ01vZGUgPSBCaW5kaW5nTW9kZS5PbmVXYXksXHJcbiAgICAgICAgICAgICAgICAgICAgU291cmNlID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBTb3VyY2VQYXRoID0gcHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFRhcmdldCA9IHRhcmdldEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlT25seUlubmVySFRNTCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBiaS5VcGRhdGVUYXJnZXQoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1hcmdpblxyXG4gICAgICAgICNyZWdpb24gTWFyZ2luTGVmdFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgTWFyZ2luTGVmdFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiTWFyZ2luTGVmdFwiLCB0eXBlb2YoZG91YmxlPyksIHR5cGVvZihGcmFtZXdvcmtFbGVtZW50KSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25NYXJnaW5MZWZ0Q2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlPyBNYXJnaW5MZWZ0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKGRvdWJsZT8pIHRoaXNbXCJNYXJnaW5MZWZ0XCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJNYXJnaW5MZWZ0XCJdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uTWFyZ2luTGVmdENoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChkb3VibGU/KSBlLk5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1lLl9yb290LkNzcyhcIm1hcmdpbkxlZnRcIiwgc3RyaW5nLkVtcHR5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWUuX3Jvb3QuQ3NzKFwibWFyZ2luTGVmdFwiLCB2YWx1ZSArIFwicHhcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBNYXJnaW5SaWdodFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgTWFyZ2luUmlnaHRQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIk1hcmdpblJpZ2h0XCIsIHR5cGVvZihkb3VibGU/KSwgdHlwZW9mKEZyYW1ld29ya0VsZW1lbnQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPbk1hcmdpblJpZ2h0Q2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlPyBNYXJnaW5SaWdodFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChkb3VibGU/KSB0aGlzW1wiTWFyZ2luUmlnaHRcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIk1hcmdpblJpZ2h0XCJdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uTWFyZ2luUmlnaHRDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEZyYW1ld29ya0VsZW1lbnQpIGQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAoZG91YmxlPykgZS5OZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJtYXJnaW5SaWdodFwiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJtYXJnaW5SaWdodFwiLCB2YWx1ZSArIFwicHhcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBNYXJnaW5Cb3R0b21Qcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IE1hcmdpbkJvdHRvbVByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiTWFyZ2luQm90dG9tXCIsIHR5cGVvZihkb3VibGU/KSwgdHlwZW9mKEZyYW1ld29ya0VsZW1lbnQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPbk1hcmdpbkJvdHRvbUNoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZT8gTWFyZ2luQm90dG9tXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKGRvdWJsZT8pIHRoaXNbXCJNYXJnaW5Cb3R0b21cIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIk1hcmdpbkJvdHRvbVwiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbk1hcmdpbkJvdHRvbUNoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChkb3VibGU/KSBlLk5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1lLl9yb290LkNzcyhcIm1hcmdpbkJvdHRvbVwiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJtYXJnaW5Cb3R0b21cIiwgdmFsdWUgKyBcInB4XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTWFyZ2luVG9wUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBNYXJnaW5Ub3BQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIk1hcmdpblRvcFwiLCB0eXBlb2YoZG91YmxlPyksIHR5cGVvZihGcmFtZXdvcmtFbGVtZW50KSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25NYXJnaW5Ub3BDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGU/IE1hcmdpblRvcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChkb3VibGU/KSB0aGlzW1wiTWFyZ2luVG9wXCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJNYXJnaW5Ub3BcIl0gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25NYXJnaW5Ub3BDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEZyYW1ld29ya0VsZW1lbnQpIGQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAoZG91YmxlPykgZS5OZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJtYXJnaW5Ub3BcIiwgc3RyaW5nLkVtcHR5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWUuX3Jvb3QuQ3NzKFwibWFyZ2luVG9wXCIsIHZhbHVlICsgXCJweFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQYWRkaW5nXHJcbiAgICAgICAgI3JlZ2lvbiBQYWRkaW5nTGVmdFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgUGFkZGluZ0xlZnRQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIlBhZGRpbmdMZWZ0XCIsIHR5cGVvZihkb3VibGU/KSwgdHlwZW9mKEZyYW1ld29ya0VsZW1lbnQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPblBhZGRpbmdMZWZ0Q2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlPyBQYWRkaW5nTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChkb3VibGU/KSB0aGlzW1wiUGFkZGluZ0xlZnRcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIlBhZGRpbmdMZWZ0XCJdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uUGFkZGluZ0xlZnRDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEZyYW1ld29ya0VsZW1lbnQpIGQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAoZG91YmxlPykgZS5OZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJQYWRkaW5nTGVmdFwiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSArIFwicHhcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQYWRkaW5nUmlnaHRQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IFBhZGRpbmdSaWdodFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiUGFkZGluZ1JpZ2h0XCIsIHR5cGVvZihkb3VibGU/KSwgdHlwZW9mKEZyYW1ld29ya0VsZW1lbnQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPblBhZGRpbmdSaWdodENoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZT8gUGFkZGluZ1JpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKGRvdWJsZT8pIHRoaXNbXCJQYWRkaW5nUmlnaHRcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIlBhZGRpbmdSaWdodFwiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblBhZGRpbmdSaWdodENoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChkb3VibGU/KSBlLk5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1lLl9yb290LkNzcyhcIlBhZGRpbmdSaWdodFwiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUgKyBcInB4XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUGFkZGluZ0JvdHRvbVByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgUGFkZGluZ0JvdHRvbVByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiUGFkZGluZ0JvdHRvbVwiLCB0eXBlb2YoZG91YmxlPyksIHR5cGVvZihGcmFtZXdvcmtFbGVtZW50KSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25QYWRkaW5nQm90dG9tQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlPyBQYWRkaW5nQm90dG9tXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKGRvdWJsZT8pIHRoaXNbXCJQYWRkaW5nQm90dG9tXCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJQYWRkaW5nQm90dG9tXCJdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uUGFkZGluZ0JvdHRvbUNoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChkb3VibGU/KSBlLk5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1lLl9yb290LkNzcyhcIlBhZGRpbmdCb3R0b21cIiwgc3RyaW5nLkVtcHR5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWUuX3Jvb3QuQ3NzKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSArIFwicHhcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQYWRkaW5nVG9wUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBQYWRkaW5nVG9wUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJQYWRkaW5nVG9wXCIsIHR5cGVvZihkb3VibGU/KSwgdHlwZW9mKEZyYW1ld29ya0VsZW1lbnQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPblBhZGRpbmdUb3BDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGU/IFBhZGRpbmdUb3BcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAoZG91YmxlPykgdGhpc1tcIlBhZGRpbmdUb3BcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIlBhZGRpbmdUb3BcIl0gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25QYWRkaW5nVG9wQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChGcmFtZXdvcmtFbGVtZW50KSBkO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gKGRvdWJsZT8pIGUuTmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWUuX3Jvb3QuQ3NzKFwiUGFkZGluZ1RvcFwiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJwYWRkaW5nVG9wXCIsIHZhbHVlICsgXCJweFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBUZXh0V3JhcHBpbmdQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IFRleHRXcmFwcGluZ1Byb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiVGV4dFdyYXBwaW5nXCIsIHR5cGVvZihUZXh0V3JhcHBpbmcpLCB0eXBlb2YoRnJhbWV3b3JrRWxlbWVudCksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uVGV4dFdyYXBwaW5nQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dFdyYXBwaW5nIFRleHRXcmFwcGluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChUZXh0V3JhcHBpbmcpIHRoaXNbXCJUZXh0V3JhcHBpbmdcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIlRleHRXcmFwcGluZ1wiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblRleHRXcmFwcGluZ0NoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChUZXh0V3JhcHBpbmcpIGUuTmV3VmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBUZXh0V3JhcHBpbmcuTm9XcmFwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJ3aGl0ZS1zcGFjZVwiLCBcIm5vd3JhcFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gVGV4dFdyYXBwaW5nLldyYXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1lLl9yb290LkNzcyhcIndoaXRlLXNwYWNlXCIsIFwibm9ybWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24odmFsdWUuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBGb250V2VpZ2h0UHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBGb250V2VpZ2h0UHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJGb250V2VpZ2h0XCIsIHR5cGVvZihkb3VibGUpLCB0eXBlb2YoRnJhbWV3b3JrRWxlbWVudCksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uRm9udFdlaWdodENoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBGb250V2VpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdGhpc1tcIkZvbnRXZWlnaHRcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIkZvbnRXZWlnaHRcIl0gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Gb250V2VpZ2h0Q2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChGcmFtZXdvcmtFbGVtZW50KSBkO1xyXG5cclxuICAgICAgICAgICAgbWUuX3Jvb3QuQ3NzKFwiZm9udFdlaWdodFwiLCBlLk5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIEZvbnRTaXplUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBGb250U2l6ZVByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiRm9udFNpemVcIiwgdHlwZW9mKGRvdWJsZSksIHR5cGVvZihGcmFtZXdvcmtFbGVtZW50KSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25Gb250U2l6ZUNoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBGb250U2l6ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChkb3VibGUpIHRoaXNbXCJGb250U2l6ZVwiXTsgfVxyXG4gICAgICAgICAgICBzZXQgeyB0aGlzW1wiRm9udFNpemVcIl0gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25Gb250U2l6ZUNoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuXHJcbiAgICAgICAgICAgIG1lLl9yb290LkNzcyhcImZvbnRTaXplXCIsIChkb3VibGUpIGUuTmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gV2lkdGhQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IFdpZHRoUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJXaWR0aFwiLCB0eXBlb2YoZG91YmxlKSwgdHlwZW9mKEZyYW1ld29ya0VsZW1lbnQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPbldpZHRoQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFdpZHRoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKGRvdWJsZSkgdGhpc1tcIldpZHRoXCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJXaWR0aFwiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbldpZHRoQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChGcmFtZXdvcmtFbGVtZW50KSBkO1xyXG5cclxuICAgICAgICAgICAgbWUuX3Jvb3QuQ3NzKFwid2lkdGhcIiwgZS5OZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb2xvclByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgQ29sb3JQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIkNvbG9yXCIsIHR5cGVvZihzdHJpbmcpLCB0eXBlb2YoRnJhbWV3b3JrRWxlbWVudCksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uQ29sb3JDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ29sb3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAoc3RyaW5nKSB0aGlzW1wiQ29sb3JcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIkNvbG9yXCJdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uQ29sb3JDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEZyYW1ld29ya0VsZW1lbnQpIGQ7XHJcblxyXG4gICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJjb2xvclwiLCBlLk5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIElubmVySFRNTFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgSW5uZXJIVE1MUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJJbm5lckhUTUxcIiwgdHlwZW9mKHN0cmluZyksIHR5cGVvZihGcmFtZXdvcmtFbGVtZW50KSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25Jbm5lckhUTUxDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgSW5uZXJIVE1MXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHN0cmluZylHZXRWYWx1ZShJbm5lckhUTUxQcm9wZXJ0eSk7IH1cclxuICAgICAgICAgICAgc2V0IHsgU2V0VmFsdWUoSW5uZXJIVE1MUHJvcGVydHksdmFsdWUpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIHZvaWQgT25Jbm5lckhUTUxDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEZyYW1ld29ya0VsZW1lbnQpIGQ7XHJcblxyXG4gICAgICAgICAgICBtZS5fcm9vdCE9bnVsbD9tZS5fcm9vdC5IdG1sKChzdHJpbmcpIGUuTmV3VmFsdWUpOihqUXVlcnkpbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFZpc2liaWxpdHlQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IFZpc2liaWxpdHlQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIlZpc2liaWxpdHlcIiwgdHlwZW9mKFZpc2liaWxpdHkpLCB0eXBlb2YoRnJhbWV3b3JrRWxlbWVudCksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uVmlzaWJpbGl0eUNoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIFZpc2liaWxpdHkgVmlzaWJpbGl0eVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChWaXNpYmlsaXR5KSB0aGlzW1wiVmlzaWJpbGl0eVwiXTsgfVxyXG4gICAgICAgICAgICBzZXQgeyB0aGlzW1wiVmlzaWJpbGl0eVwiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblZpc2liaWxpdHlDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEZyYW1ld29ya0VsZW1lbnQpIGQ7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChWaXNpYmlsaXR5KSBlLk5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IFZpc2liaWxpdHkuVmlzaWJsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWUuX3Jvb3QuQ3NzKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZS5fcm9vdC5Dc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBIZWlnaHRQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IEhlaWdodFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiSGVpZ2h0XCIsIHR5cGVvZihkb3VibGUpLCB0eXBlb2YoRnJhbWV3b3JrRWxlbWVudCksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uSGVpZ2h0Q2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbkhlaWdodENoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChlLk5ld1ZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZlLl9yb290LkNzcyhcImhlaWdodFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmUuX3Jvb3QuQ3NzKFwiaGVpZ2h0XCIsIGUuTmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gQmFja2dyb3VuZFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgQmFja2dyb3VuZFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiQmFja2dyb3VuZFwiLCB0eXBlb2Yoc3RyaW5nKSwgdHlwZW9mKEZyYW1ld29ya0VsZW1lbnQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPbkJhY2tncm91bmRDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uQmFja2dyb3VuZENoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmUgPSAoRnJhbWV3b3JrRWxlbWVudCkgZDtcclxuICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gZS5OZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5Jc051bGwoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmUuX3Jvb3QuQ3NzKFwiYmFja2dyb3VuZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgaXMgc3RyaW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmZS5fcm9vdC5Dc3MoXCJiYWNrZ3JvdW5kXCIsIG5ld1ZhbHVlIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihuZXdWYWx1ZS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIHN0cmluZyBJZFxyXG4gICAgICAgIHN0YXRpYyBpbnQgSUQ7XHJcbiAgICAgICAgc3RyaW5nIF9pZDtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBJZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfaWQgPSBcIldTLVwiICsgSUQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBfaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIG9iamVjdCBEYXRhQ29udGV4dFxyXG4gICAgICAgIG9iamVjdCBfZGF0YUNvbnRleHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvYmplY3QgRGF0YUNvbnRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfZGF0YUNvbnRleHQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfZGF0YUNvbnRleHQgIT0gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGFDb250ZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgT25Qcm9wZXJ0eUNoYW5nZWQoXCJEYXRhQ29udGV4dFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cztcclxudXNpbmcgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkNvbW1vbjtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkNvZGVNaXJyb3Jcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFhtbEVkaXRvciA6IEZyYW1ld29ya0VsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgWG1sRWRpdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZvbnRTaXplID0gMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNyZWdpb24gRm9udFNpemVQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IEZvbnRTaXplUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJGb250U2l6ZVwiLCB0eXBlb2YoaW50KSwgdHlwZW9mKFhtbEVkaXRvciksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKEZvbnRTaXplQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEZvbnRTaXplXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKGludCl0aGlzW1wiRm9udFNpemVcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIkZvbnRTaXplXCJdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIEZvbnRTaXplQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmb250U2l6ZSA9IChpbnQpZS5OZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZSA9IChYbWxFZGl0b3IpZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZS5fZWRpdG9yICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZS5pc0ZpcmluZ19PblRleHRDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBTY3JpcHQuV3JpdGU8c3RyaW5nPihcIm1lLl9lZGl0b3IuZGlzcGxheS53cmFwcGVyLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemUgKyAncHgnO1wiKTtcclxuICAgICAgICAgICAgICAgIFNjcmlwdC5Xcml0ZTxzdHJpbmc+KFwibWUuX2VkaXRvci5yZWZyZXNoKCk7XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBGaWVsZHNcclxuICAgICAgICBvYmplY3QgX2VkaXRvcjtcclxuXHJcbiAgICAgICAgYm9vbCBpc0ZpcmluZ19PblRleHRDaGFuZ2VkO1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRXZlbnRzXHJcbiAgICAgICAgcHVibGljIGV2ZW50IEFjdGlvbiBPblRleHRDaGFuZ2VkO1xyXG4gICAgICAgIHB1YmxpYyBldmVudCBBY3Rpb248aW50PiBPbkN1cnNvckxpbmVOdW1iZXJDaGFuZ2VkO1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgUHJvcGVydGllc1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSVJlYWRPbmx5TGlzdDxzdHJpbmc+IENzc0ZpbGVzIHtnZXR7cmV0dXJuIG5ld1tdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2NvZGVtaXJyb3IvNS4zMS4wL2NvZGVtaXJyb3IuY3NzXCIsXHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvY29kZW1pcnJvci81LjMxLjAvYWRkb24vaGludC9zaG93LWhpbnQuY3NzXCJcclxuICAgICAgICB9O319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSVJlYWRPbmx5TGlzdDxzdHJpbmc+IFNjcmlwdHMge2dldHtyZXR1cm4gbmV3W11cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvY29kZW1pcnJvci81LjMxLjAvY29kZW1pcnJvci5qc1wiLFxyXG4gICAgICAgICAgICBcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2NvZGVtaXJyb3IvNS4zMS4wL2FkZG9uL2hpbnQvc2hvdy1oaW50LmpzXCIsXHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvY29kZW1pcnJvci81LjMxLjAvYWRkb24vaGludC94bWwtaGludC5qc1wiLFxyXG4gICAgICAgICAgICBcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2NvZGVtaXJyb3IvNS4zMS4wL21vZGUveG1sL3htbC5qc1wiLFxyXG4gICAgICAgICAgICBcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2NvZGVtaXJyb3IvNS4zMS4wL2FkZG9uL2VkaXQvY2xvc2V0YWcuanNcIixcclxuICAgICAgICAgICAgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9jb2RlbWlycm9yLzUuMzEuMC9hZGRvbi9mb2xkL2ZvbGRjb2RlLmpzXCIsXHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvY29kZW1pcnJvci81LjMxLjAvYWRkb24vZm9sZC94bWwtZm9sZC5qc1wiXHJcbiAgICAgICAgfTt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXRET00oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb3QgPSBET00uZGl2KCk7XHJcbiAgICAgICAgICAgIFJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTWV0aG9kc1xyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgUmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290LkVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICBfcm9vdC5Dc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpO1xyXG5cclxuICAgICAgICAgICAgRE9NLnRleHRhcmVhKCkuUHJvcChcImlkXCIsIElkKS5BcHBlbmRUbyhfcm9vdCkuQ3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKTtcclxuXHJcbiAgICAgICAgICAgIGpRdWVyeS5SZWFkeSgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PiB7IFJlbmRlcihJZCk7IH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgRmlyZV9PblRleHRDaGFuZ2VkKG9iamVjdCBlZGl0b3IsIG9iamVjdCBjaGFuZ2VPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaXNGaXJpbmdfT25UZXh0Q2hhbmdlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXNGaXJpbmdfT25UZXh0Q2hhbmdlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2VkaXRvciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWRpdG9yVmFsdWUgPSBTY3JpcHQuV3JpdGU8c3RyaW5nPihcInRoaXMuX2VkaXRvci5nZXRWYWx1ZSgpXCIpO1xyXG4gICAgICAgICAgICAgICAgVGV4dCA9IGVkaXRvclZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBPblRleHRDaGFuZ2VkIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5PblRleHRDaGFuZ2VkLkludm9rZSgpKTpudWxsO1xyXG5cclxuICAgICAgICAgICAgaXNGaXJpbmdfT25UZXh0Q2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50IF9jdXJzb3JDdXJyZW50TGluZU51bWJlcjtcclxuICAgICAgICB2b2lkIEZpcmVfb25DdXJzb3JBY3Rpdml0eSggb2JqZWN0IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY3Vyc29yQ3VycmVudExpbmVOdW1iZXIgPSBTY3JpcHQuV3JpdGU8aW50PihcImUuZG9jLmdldEN1cnNvcigpLmxpbmVcIik7XHJcblxyXG4gICAgICAgICAgICBPbkN1cnNvckxpbmVOdW1iZXJDaGFuZ2VkIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5PbkN1cnNvckxpbmVOdW1iZXJDaGFuZ2VkLkludm9rZShfY3Vyc29yQ3VycmVudExpbmVOdW1iZXIpKTpudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHZvaWQgUmVuZGVyKHN0cmluZyBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmb250U2l6ZSA9IEZvbnRTaXplO1xyXG5cclxuICAgICAgICAgICAgdmFyIHhtbEludGVsbGlzZW5zZUluZm9zID0gbmV3IEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJLkJ1aWxkZXIoKS5HZXRJbnRlbGxpc2Vuc2VJbmZvcygpO1xyXG4gICAgICAgICAgICB2YXIgc2NoZW1hSW5mbyA9IFNjaGVtYUluZm8uQ3JlYXRlRnJvbSh4bWxJbnRlbGxpc2Vuc2VJbmZvcykuVG9Kc29uKCk7XHJcblxyXG4gICAgICAgICAgICBTY3JpcHQuV3JpdGUoXHJcbiAgICAgICAgICAgICAgICBAXCJcclxuXHJcblxyXG5mdW5jdGlvbiBjb21wbGV0ZUFmdGVyKGNtLCBwcmVkKSBcclxue1xyXG5cdHZhciBjdXIgPSBjbS5nZXRDdXJzb3IoKTtcclxuXHRpZiAoIXByZWQgfHwgcHJlZCgpKSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgXHJcblx0e1xyXG5cdFx0aWYgKCFjbS5zdGF0ZS5jb21wbGV0aW9uQWN0aXZlKVxyXG5cdFx0Y20uc2hvd0hpbnQoe2NvbXBsZXRlU2luZ2xlOiBmYWxzZX0pO1xyXG5cdH0sIDEwMCk7XHJcblx0XHJcblx0cmV0dXJuIENvZGVNaXJyb3IuUGFzcztcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcGxldGVJZkFmdGVyTHQoY20pIFxyXG57XHJcblx0cmV0dXJuIGNvbXBsZXRlQWZ0ZXIoY20sIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGN1ciA9IGNtLmdldEN1cnNvcigpO1xyXG5cdFx0cmV0dXJuIGNtLmdldFJhbmdlKENvZGVNaXJyb3IuUG9zKGN1ci5saW5lLCBjdXIuY2ggLSAxKSwgY3VyKSA9PSAnPCc7XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBsZXRlSWZJblRhZyhjbSkgXHJcbntcclxuXHRyZXR1cm4gY29tcGxldGVBZnRlcihjbSwgZnVuY3Rpb24oKSB7XHJcblx0ICB2YXIgdG9rID0gY20uZ2V0VG9rZW5BdChjbS5nZXRDdXJzb3IoKSk7XHJcblx0ICBpZiAodG9rLnR5cGUgPT0gJ3N0cmluZycgJiYgKCEvWycnXS8udGVzdCh0b2suc3RyaW5nLmNoYXJBdCh0b2suc3RyaW5nLmxlbmd0aCAtIDEpKSB8fCB0b2suc3RyaW5nLmxlbmd0aCA9PSAxKSkgcmV0dXJuIGZhbHNlO1xyXG5cdCAgdmFyIGlubmVyID0gQ29kZU1pcnJvci5pbm5lck1vZGUoY20uZ2V0TW9kZSgpLCB0b2suc3RhdGUpLnN0YXRlO1xyXG5cdCAgcmV0dXJuIGlubmVyLnRhZ05hbWU7XHJcblx0fSk7XHJcbn1cclxuXHJcbnRoaXMuX2VkaXRvciA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSwgXHJcbntcclxuXHRtb2RlOiAneG1sJyxcclxuXHRsaW5lTnVtYmVyczogdHJ1ZSxcclxuXHRleHRyYUtleXM6IHtcclxuXHQgICc8JzogY29tcGxldGVBZnRlcixcclxuXHQgICdcXCcnOiBjb21wbGV0ZUlmQWZ0ZXJMdCxcclxuXHQgICcgJzogY29tcGxldGVJZkluVGFnLFxyXG5cdCAgJz0nOiBjb21wbGV0ZUlmSW5UYWcsXHJcblx0ICAnQ3RybC1TcGFjZSc6ICdhdXRvY29tcGxldGUnXHJcblx0fSxcclxuXHRoaW50T3B0aW9uczoge3NjaGVtYUluZm86IHNjaGVtYUluZm99LFxyXG4gICAgYXV0b0Nsb3NlVGFnczp0cnVlXHJcblxyXG5cclxufSk7XHJcblxyXG52YXIgbWUgPSB0aGlzO1xyXG52YXIgb25DaGFuZ2UgPSBmdW5jdGlvbihlZGl0b3IsY2hhbmdlT2JqKVxyXG57IFxyXG4gICAgbWUuRmlyZV9PblRleHRDaGFuZ2VkLmFwcGx5KG1lLFtlZGl0b3IsY2hhbmdlT2JqXSk7XHJcbn1cclxuXHJcbnRoaXMuX2VkaXRvci5vbignY2hhbmdlJywgb25DaGFuZ2UgKTtcclxuXHJcbnZhciBvbkN1cnNvckFjdGl2aXR5PSBmdW5jdGlvbihlKVxyXG57IFxyXG4gICAgbWUuRmlyZV9vbkN1cnNvckFjdGl2aXR5LmFwcGx5KG1lLFtlXSk7XHJcbn1cclxuXHJcbnRoaXMuX2VkaXRvci5vbignY3Vyc29yQWN0aXZpdHknLCBvbkN1cnNvckFjdGl2aXR5ICk7XHJcblxyXG5cclxuXHJcblxyXG5tZS5fZWRpdG9yLmRpc3BsYXkud3JhcHBlci5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplICsgJ3B4JztcclxubWUuX2VkaXRvci5kaXNwbGF5LndyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gJzk1JSc7XHJcblxyXG5cclxuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gVGV4dFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgVGV4dFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiVGV4dFwiLCB0eXBlb2Yoc3RyaW5nKSwgdHlwZW9mKFhtbEVkaXRvciksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKFRleHRDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChzdHJpbmcpdGhpc1tcIlRleHRcIl07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpc1tcIlRleHRcIl0gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgVGV4dENoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSAoc3RyaW5nKSBlLk5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lID0gKFhtbEVkaXRvcikgZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZS5fZWRpdG9yICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZS5pc0ZpcmluZ19PblRleHRDaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBTY3JpcHQuV3JpdGU8c3RyaW5nPihcIm1lLl9lZGl0b3Iuc2V0VmFsdWUobmV3VmFsdWUpO1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG51c2luZyBTeXN0ZW0uWG1sO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkRlc2lnblxyXG57XHJcbiAgICBjbGFzcyBVSUVkaXRvciA6IEZyYW1ld29ya0VsZW1lbnRcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIEZpZWxkc1xyXG4gICAgICAgIENvbnRhaW5lciBVbmlmb3JtR3JpZDtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG4gICAgICAgIGpRdWVyeSBDb250YWluZXIge2dldHtyZXR1cm4gVW5pZm9ybUdyaWQuQ2hpbGRlcmVuWzFdLlJvb3Q7fX1cclxuXHJcbiAgICAgICAgc3RyaW5nIFRlbXBsYXRlIHtnZXR7cmV0dXJuIEBcIlxyXG48Q29udGFpbmVyPlxyXG4gICAgPFhtbEVkaXRvciBUZXh0ID0ne1wiICsgXCJTb3VyY2VUZXh0XCIrIEBcIn0nIFxyXG4gICAgICAgIE9uVGV4dENoYW5nZWQgPSAne1wiICsgXCJPblRleHRDaGFuZ2VkXCIrIEBcIn0nIFxyXG4gICAgICAgIE9uQ3Vyc29yTGluZU51bWJlckNoYW5nZWQgPSAne1wiICsgXCJPbkN1cnNvckxpbmVOdW1iZXJDaGFuZ2VkXCIrIEBcIn0nIFxyXG4gICAgICAgIEhlaWdodD0nNDAwJyAvPlxyXG4gICAgPENvbnRhaW5lciBCYWNrZ3JvdW5kPScjZjNmNWY2JyAvPlxyXG48L0NvbnRhaW5lcj5cIjt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXRET00oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHVpID0gbmV3IFNlbWFudGljVUkuQnVpbGRlclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBYbWxTdHJpbmcgPSBUZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIERhdGFDb250ZXh0ID0gdGhpc1xyXG4gICAgICAgICAgICB9LkJ1aWxkKCk7XHJcblxyXG4gICAgICAgICAgICBVbmlmb3JtR3JpZCA9IChDb250YWluZXIpIHVpO1xyXG5cclxuICAgICAgICAgICAgX3Jvb3QgPSBVbmlmb3JtR3JpZC5Sb290O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT25DdXJzb3JMaW5lTnVtYmVyQ2hhbmdlZChpbnQgbGluZU51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9idWlsZGVyIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5fYnVpbGRlci5Gb2N1c1RvTGluZShsaW5lTnVtYmVyKSk6bnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNlbWFudGljVUkuQnVpbGRlciBfYnVpbGRlcjtcclxuICAgICAgICBwdWJsaWMgdm9pZCBPblRleHRDaGFuZ2VkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5FbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UoU291cmNlVGV4dCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2J1aWxkZXIgPSBuZXcgU2VtYW50aWNVSS5CdWlsZGVyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFhtbFN0cmluZyA9IFNvdXJjZVRleHQsXHJcbiAgICAgICAgICAgICAgICBEYXRhQ29udGV4dCA9IFNvdXJjZURhdGFDb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgSXNEZXNpZ25Nb2RlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgb2JqZWN0IGNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gX2J1aWxkZXIuQnVpbGQoKTtcclxuICAgICAgICAgICAgICAgICgoRnJhbWV3b3JrRWxlbWVudCkgY29tcG9uZW50KS5Sb290LkFwcGVuZFRvKENvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKFhtbEV4Y2VwdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDb250YWluZXIuSHRtbChlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdHJpbmcgU291cmNlVGV4dFxyXG4gICAgICAgIHN0cmluZyBfc291cmNlVGV4dDtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTb3VyY2VUZXh0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX3NvdXJjZVRleHQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfc291cmNlVGV4dCAhPSB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfc291cmNlVGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIE9uUHJvcGVydHlDaGFuZ2VkKFwiU291cmNlVGV4dFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gb2JqZWN0IFNvdXJjZURhdGFDb250ZXh0XHJcbiAgICAgICAgb2JqZWN0IF9zb3VyY2VEYXRhQ29udGV4dDtcclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBTb3VyY2VEYXRhQ29udGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9zb3VyY2VEYXRhQ29udGV4dDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9zb3VyY2VEYXRhQ29udGV4dCAhPSB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfc291cmNlRGF0YUNvbnRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChcIlNvdXJjZURhdGFDb250ZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzLkNvbnRyb2xzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFbGVtZW50QmFzZSA6IEZyYW1ld29ya0VsZW1lbnRcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFNpemVQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IFNpemVQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIlNpemVcIiwgdHlwZW9mKFNpemUpLCB0eXBlb2YoRWxlbWVudEJhc2UpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPblNpemVDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTaXplIFNpemVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAoU2l6ZSl0aGlzW1wiU2l6ZVwiXTsgfVxyXG4gICAgICAgICAgICBzZXQgeyB0aGlzW1wiU2l6ZVwiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblNpemVDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEVsZW1lbnRCYXNlKWQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSAoU2l6ZSllLk5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgbWUuX3Jvb3QuQWRkQ2xhc3MobmV3VmFsdWUuVG9TdHJpbmcoKS5Ub0xvd2VyKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTWV0aG9kc1xyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIEFkZENzc0NsYXNzT25UcnVlRWxzZVJlbW92ZShvYmplY3QgdmFsdWUsIHN0cmluZyBjc3NDbGFzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5Ub0Jvb2xlYW5OdWxsYWJsZSgpID09IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9yb290LkFkZENsYXNzKGNzc0NsYXNzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX3Jvb3QuUmVtb3ZlQ2xhc3MoY3NzQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gSXNDZW50ZXJBbGlnbmVkUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBJc0NlbnRlckFsaWduZWRQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIklzQ2VudGVyQWxpZ25lZFwiLCB0eXBlb2YoYm9vbCksIHR5cGVvZihFbGVtZW50QmFzZSksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKElzQ2VudGVyQWxpZ25lZENoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgSXNDZW50ZXJBbGlnbmVkQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICgoRWxlbWVudEJhc2UpIGQpLkFkZENzc0NsYXNzT25UcnVlRWxzZVJlbW92ZShlLk5ld1ZhbHVlLCBcImNlbnRlciBhbGlnbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gSXNSaWdodEFsaWduZWRQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IElzUmlnaHRBbGlnbmVkUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJJc1JpZ2h0QWxpZ25lZFwiLCB0eXBlb2YoYm9vbCksIHR5cGVvZihFbGVtZW50QmFzZSksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKElzUmlnaHRBbGlnbmVkQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBJc1JpZ2h0QWxpZ25lZENoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAoKEVsZW1lbnRCYXNlKSBkKS5BZGRDc3NDbGFzc09uVHJ1ZUVsc2VSZW1vdmUoZS5OZXdWYWx1ZSwgXCJyaWdodCBhbGlnbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gQWxpZ25Qcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IEFsaWduUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJBbGlnblwiLCB0eXBlb2YoQWxpZ24pLCB0eXBlb2YoRWxlbWVudEJhc2UpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPbkFsaWduQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWxpZ24gQWxpZ25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAoQWxpZ24pdGhpc1tcIkFsaWduXCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJBbGlnblwiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbkFsaWduQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChFbGVtZW50QmFzZSlkO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gKEFsaWduKWUuTmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSB2YWx1ZS5Ub1N0cmluZygpLlRvTG93ZXIoKSArIFwiIGFsaWduZWRcIjtcclxuXHJcbiAgICAgICAgICAgIG1lLkFkZENzc0NsYXNzT25UcnVlRWxzZVJlbW92ZShlLk5ld1ZhbHVlLCBjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBzdHJpbmcgSHRtbFRhZyB7Z2V0e3JldHVybiBcImRpdlwiO319XHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgc3RyaW5nIEh0bWxDbGFzc05hbWUge2dldHtyZXR1cm4gR2V0VHlwZSgpLk5hbWU7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgSW5pdERPTSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcm9vdCA9ICBuZXcgalF1ZXJ5KERvY3VtZW50LkNyZWF0ZUVsZW1lbnQoSHRtbFRhZykpLkFkZENsYXNzKEh0bWxDbGFzc05hbWUpO1xyXG5cclxuICAgICAgICAgICAgQWZ0ZXJJbml0RE9NKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEFmdGVySW5pdERPTSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIGNhcmQ6IEVsZW1lbnRDb250YWluZXJcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBjb250ZW50IDogRWxlbWVudENvbnRhaW5lclxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgZGVzY3JpcHRpb24gOiBFbGVtZW50QmFzZVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuQ29tbW9uO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29tYm8gOiBGcmFtZXdvcmtFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBGaWVsZHNcclxuICAgICAgICBqUXVlcnkgX2ljb25FbGVtZW50LCBfZGVmYXVsdFRleHRFbGVtZW50LCBfbWVudUVsZW1lbnQsIF9oaWRkZW47XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG4gICAgICAgIHB1YmxpYyBDb21ibygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eUNoYW5nZWQgKz0gKHMsIGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlByb3BlcnR5TmFtZSA9PSBcIkl0ZW1zU291cmNlXCJ8fFxyXG4gICAgICAgICAgICAgICAgICAgIGUuUHJvcGVydHlOYW1lID09IFwiRGlzcGxheU1lbWJlclBhdGhcInx8XHJcbiAgICAgICAgICAgICAgICAgICAgZS5Qcm9wZXJ0eU5hbWUgPT0gXCJTZWxlY3RlZFZhbHVlUGF0aFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRyeVRvQmluZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290ID0gRE9NLmRpdihcInVpIHNlbGVjdGlvbiBkcm9wZG93blwiKTtcclxuXHJcbiAgICAgICAgICAgIF9oaWRkZW4gPSBET00uaW5wdXQoXCJoaWRkZW5cIikuQXBwZW5kVG8oX3Jvb3QpLk9uKFwiY2hhbmdlXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pVmFsdWVDaGFuZ2VkKTtcclxuXHJcbiAgICAgICAgICAgIF9pY29uRWxlbWVudCA9IERPTS5pKFwiZHJvcGRvd24gaWNvblwiKS5BcHBlbmRUbyhfcm9vdCk7XHJcbiAgICAgICAgICAgIF9kZWZhdWx0VGV4dEVsZW1lbnQgPSBET00uZGl2KFwiZGVmYXVsdCB0ZXh0XCIpLkFwcGVuZFRvKF9yb290KTtcclxuICAgICAgICAgICAgX21lbnVFbGVtZW50ID0gRE9NLmRpdihcIm1lbnVcIikuQXBwZW5kVG8oX3Jvb3QpO1xyXG5cclxuICAgICAgICAgICAgUHJvcGVydHlDaGFuZ2VkICs9IChlLCBhcmdzKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT3B0aW9ucyBpcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2V0T3B0aW9uc0Zyb20oKE9wdGlvbnMgKyBcIlwiKS5TcGxpdCgnLCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF9yb290LkFzPHNlbWFudGljX3VpLkpRdWVyeT4oKS5kcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0T3B0aW9uc0Zyb20oSUVudW1lcmFibGU8c3RyaW5nPiBvcHRpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX21lbnVFbGVtZW50LkVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgb3B0aW9uIGluIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRpb25FbGVtZW50ID0gRE9NLmRpdihcIml0ZW1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgb3B0aW9uRWxlbWVudC5IdG1sKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25FbGVtZW50LkF0dHIoXCJkYXRhLXZhbHVlXCIsIG9wdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgX21lbnVFbGVtZW50LkFwcGVuZChvcHRpb25FbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTWV0aG9kc1xyXG4gICAgICAgIHZvaWQgVHJ5VG9CaW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJdGVtc1NvdXJjZSA9PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICBEaXNwbGF5TWVtYmVyUGF0aCA9PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICBTZWxlY3RlZFZhbHVlUGF0aCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBlbnVtZXJhYmxlSXRlbVNvdXJjZSA9IEl0ZW1zU291cmNlIGFzIElFbnVtZXJhYmxlO1xyXG4gICAgICAgICAgICBpZiAoZW51bWVyYWJsZUl0ZW1Tb3VyY2UgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfbWVudUVsZW1lbnQuRW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciByZWNvcmQgaW4gZW51bWVyYWJsZUl0ZW1Tb3VyY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRpb25FbGVtZW50ID0gRE9NLmRpdihcIml0ZW1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBSZWZsZWN0aW9uSGVscGVyLkdldFByb3BlcnR5VmFsdWUocmVjb3JkLCBEaXNwbGF5TWVtYmVyUGF0aCkgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gUmVmbGVjdGlvbkhlbHBlci5HZXRQcm9wZXJ0eVZhbHVlKHJlY29yZCwgU2VsZWN0ZWRWYWx1ZVBhdGgpICsgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpb25FbGVtZW50Lkh0bWwodGV4dCk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25FbGVtZW50LkF0dHIoXCJkYXRhLXZhbHVlXCIsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfbWVudUVsZW1lbnQuQXBwZW5kKG9wdGlvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFZhbHVlQ2hhbmdlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZWxlY3RlZFZhbHVlID0gX2hpZGRlbi5WYWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIG9iamVjdCBPcHRpb25zXHJcbiAgICAgICAgb2JqZWN0IF9vcHRpb25zO1xyXG5cclxuICAgICAgICBwdWJsaWMgb2JqZWN0IE9wdGlvbnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfb3B0aW9uczsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9vcHRpb25zICE9IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9vcHRpb25zID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgT25Qcm9wZXJ0eUNoYW5nZWQoXCJPcHRpb25zXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBjb21ib1xyXG4gICAgICAgICNyZWdpb24gb2JqZWN0IEl0ZW1zU291cmNlXHJcbiAgICAgICAgb2JqZWN0IF9pdGVtc1NvdXJjZTtcclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBJdGVtc1NvdXJjZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9pdGVtc1NvdXJjZTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9pdGVtc1NvdXJjZSAhPSB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfaXRlbXNTb3VyY2UgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChcIkl0ZW1zU291cmNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdHJpbmcgRGlzcGxheU1lbWJlclBhdGhcclxuICAgICAgICBzdHJpbmcgX2Rpc3BsYXlNZW1iZXJQYXRoO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERpc3BsYXlNZW1iZXJQYXRoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2Rpc3BsYXlNZW1iZXJQYXRoOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2Rpc3BsYXlNZW1iZXJQYXRoICE9IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kaXNwbGF5TWVtYmVyUGF0aCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIE9uUHJvcGVydHlDaGFuZ2VkKFwiRGlzcGxheU1lbWJlclBhdGhcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIHN0cmluZyBTZWxlY3RlZFZhbHVlUGF0aFxyXG4gICAgICAgIHN0cmluZyBfc2VsZWN0ZWRWYWx1ZVBhdGg7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2VsZWN0ZWRWYWx1ZVBhdGhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfc2VsZWN0ZWRWYWx1ZVBhdGg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfc2VsZWN0ZWRWYWx1ZVBhdGggIT0gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkVmFsdWVQYXRoID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgT25Qcm9wZXJ0eUNoYW5nZWQoXCJTZWxlY3RlZFZhbHVlUGF0aFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gb2JqZWN0IFNlbGVjdGVkVmFsdWVcclxuICAgICAgICBvYmplY3QgX3NlbGVjdGVkVmFsdWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvYmplY3QgU2VsZWN0ZWRWYWx1ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9zZWxlY3RlZFZhbHVlOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3NlbGVjdGVkVmFsdWUgIT0gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChcIlNlbGVjdGVkVmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cy5NYXJrdXA7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBGaWVsZCA6IEZyYW1ld29ya0VsZW1lbnQsIElBZGRDaGlsZFxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gRmllbGRzXHJcbiAgICAgICAgalF1ZXJ5IF9sYWJlbEVsZW1lbnQsIF9lcnJvckVsZW1lbnQ7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEZyYW1ld29ya0VsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZENoaWxkKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgUmVPcmRlckVsZW1lbnRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290ID0gRE9NLmRpdihcImZpZWxkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHZvaWQgUmVPcmRlckVsZW1lbnRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290LlJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9sYWJlbEVsZW1lbnQuSXNOb3ROdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9yb290LlNldEZpcnN0Q2hpbGQoX2xhYmVsRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKENoaWxkZXJlbi5Db3VudCA9PSAxIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3Jvb3QuU2V0TGFzdENoaWxkKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpTeXN0ZW0uV2luZG93cy5GcmFtZXdvcmtFbGVtZW50PihDaGlsZGVyZW4pLl9yb290KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF9lcnJvckVsZW1lbnQuSXNOb3ROdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9yb290LlNldExhc3RDaGlsZChfZXJyb3JFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIFxyXG4gICAgICAgXHJcblxyXG4gICAgICAgICNyZWdpb24gRXJyb3JNZXNzYWdlUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBFcnJvck1lc3NhZ2VQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIkVycm9yTWVzc2FnZVwiLCB0eXBlb2Yoc3RyaW5nKSwgdHlwZW9mKEZpZWxkKSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25FcnJvck1lc3NhZ2VDaGFuZ2VkKSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXJyb3JNZXNzYWdlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHN0cmluZyl0aGlzW1wiRXJyb3JNZXNzYWdlXCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJFcnJvck1lc3NhZ2VcIl0gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25FcnJvck1lc3NhZ2VDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKEZpZWxkKWQ7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChzdHJpbmcpIGUuTmV3VmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5Jc051bGxPcldoaXRlU3BhY2UoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWUuUmVtb3ZlRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1lLkluaXRFcnJvcigoc3RyaW5nKWUuTmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEluaXRFcnJvcihzdHJpbmcgZXJyb3JNZXNzYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Vycm9yRWxlbWVudCA9IERPTS5kaXYoXCJ1aSByZWQgcG9pbnRpbmcgbGFiZWwgdHJhbnNpdGlvbiB2aXNpYmxlXCIpLkh0bWwoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgX3Jvb3QuQWRkQ2xhc3MoXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIFJlT3JkZXJFbGVtZW50cygpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdm9pZCBSZW1vdmVFcnJvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZXJyb3JFbGVtZW50LlJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgX2Vycm9yRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIF9yb290LlJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBMYWJlbFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgTGFiZWxQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIkxhYmVsXCIsIHR5cGVvZihzdHJpbmcpLCB0eXBlb2YoRmllbGQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPbkxhYmVsQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExhYmVsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHN0cmluZykgdGhpc1tcIkxhYmVsXCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJMYWJlbFwiXSA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPbkxhYmVsQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChGaWVsZCkgZDtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gKHN0cmluZykgZS5OZXdWYWx1ZTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLklzTnVsbE9yV2hpdGVTcGFjZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZS5SZW1vdmVMYWJlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWUuSW5pdExhYmVsKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBJbml0TGFiZWwoc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9sYWJlbEVsZW1lbnQuSXNOdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sYWJlbEVsZW1lbnQgPSBET00ubGFiZWwoKTtcclxuICAgICAgICAgICAgICAgIFJlT3JkZXJFbGVtZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfbGFiZWxFbGVtZW50Lkh0bWwobGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZvaWQgUmVtb3ZlTGFiZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xhYmVsRWxlbWVudCE9bnVsbD9fbGFiZWxFbGVtZW50LlJlbW92ZUZyb21QYXJlbnQoKTooalF1ZXJ5KW51bGw7XHJcbiAgICAgICAgICAgIF9sYWJlbEVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uV2luZG93cztcclxudXNpbmcgU3lzdGVtLldpbmRvd3MuTWFya3VwO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuQ29tbW9uO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuVUkuRGVzaWduO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR3JvdXBCb3ggOiBGcmFtZXdvcmtFbGVtZW50LCBJQWRkQ2hpbGRcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIEZpZWxkc1xyXG4gICAgICAgIGpRdWVyeSBfaDMsIF9jb250YWluZXI7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEZyYW1ld29ya0VsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuUm9vdC5BcHBlbmRUbyhfY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXRET00oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb3QgPSBET00uZGl2KFwidWkgc2VnbWVudFwiKTtcclxuXHJcbiAgICAgICAgICAgIF9oMyA9IERPTS5oMyhcInVpIGhlYWRlclwiKS5BcHBlbmRUbyhfcm9vdCk7XHJcblxyXG4gICAgICAgICAgICBfY29udGFpbmVyID0gRE9NLmRpdihcImNvbnRhaW5lclwiKS5BcHBlbmRUbyhfcm9vdCk7XHJcblxyXG4gICAgICAgICAgICBCaW5kUHJvcGVydHlUb0lubmVySFRNTChcIkhlYWRlclwiLCBfaDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gc3RyaW5nIEhlYWRlclxyXG4gICAgICAgIHN0cmluZyBfaGVhZGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEhlYWRlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9oZWFkZXI7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaGVhZGVyICE9IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9oZWFkZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChcIkhlYWRlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cy5NYXJrdXA7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5VSS5EZXNpZ247XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb2RhbCA6IEZyYW1ld29ya0VsZW1lbnQsIElBZGRDaGlsZFxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gRmllbGRzXHJcbiAgICAgICAgalF1ZXJ5IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIGpRdWVyeSBoZWFkZXI7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEZyYW1ld29ya0VsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuQXBwZW5kKGVsZW1lbnQuUm9vdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290ID0gRE9NLmRpdihcInVpIG1vZGFsXCIpO1xyXG5cclxuICAgICAgICAgICAgaGVhZGVyID0gRE9NLmRpdihcImhlYWRlclwiKS5BcHBlbmRUbyhfcm9vdCk7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50ID0gRE9NLmRpdihcImNvbnRlbnRcIikuQXBwZW5kVG8oX3Jvb3QpO1xyXG5cclxuICAgICAgICAgICAgX3Jvb3QuQXM8c2VtYW50aWNfdWkuSlF1ZXJ5PigpLm1vZGFsKHNlbWFudGljX3VpLkxpdGVyYWxzLnNob3cpO1xyXG5cclxuICAgICAgICAgICAgQmluZFByb3BlcnR5VG9Jbm5lckhUTUwoXCJUaXRsZVwiLCBoZWFkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gc3RyaW5nIFRpdGxlXHJcbiAgICAgICAgc3RyaW5nIF90aXRsZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUaXRsZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF90aXRsZTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aXRsZSAhPSB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChcIlRpdGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cy5NYXJrdXA7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5VSS5EZXNpZ247XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUYWJJdGVtIDogRnJhbWV3b3JrRWxlbWVudCwgSUFkZENoaWxkXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBGaWVsZHNcclxuICAgICAgICBpbnRlcm5hbCBqUXVlcnkgX2hlYWRlckVsZW1lbnQsIF9jb250ZW50RWxlbWVudDtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoRnJhbWV3b3JrRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudC5Sb290LkFwcGVuZFRvKF9jb250ZW50RWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9oZWFkZXJFbGVtZW50ID0gRE9NLmEoXCJpdGVtXCIpLkF0dHIoXCJkYXRhLXRhYlwiLCBJZCk7XHJcblxyXG4gICAgICAgICAgICBCaW5kUHJvcGVydHlUb0lubmVySFRNTChcIkhlYWRlclwiLCBfaGVhZGVyRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBfY29udGVudEVsZW1lbnQgPSBET00uZGl2KFwidWkgYm90dG9tIGF0dGFjaGVkIHRhYiBzZWdtZW50XCIpLkF0dHIoXCJkYXRhLXRhYlwiLCBJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBzdHJpbmcgSGVhZGVyXHJcbiAgICAgICAgc3RyaW5nIF9oZWFkZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgSGVhZGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2hlYWRlcjsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9oZWFkZXIgIT0gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2hlYWRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIE9uUHJvcGVydHlDaGFuZ2VkKFwiSGVhZGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cy5NYXJrdXA7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5VSS5EZXNpZ247XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUYWJQYW5lbCA6IEZyYW1ld29ya0VsZW1lbnQsIElBZGRDaGlsZFxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gQ29uc3RhbnRzXHJcbiAgICAgICAgY29uc3Qgc3RyaW5nIGFjdGl2ZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIEZpZWxkc1xyXG4gICAgICAgIHJlYWRvbmx5IExpc3Q8VGFiSXRlbT4gX3RhYnMgPSBuZXcgTGlzdDxUYWJJdGVtPigpO1xyXG4gICAgICAgIGpRdWVyeSBfbWVudUVsZW1lbnQ7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEZyYW1ld29ya0VsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWJJdGVtID0gZWxlbWVudCBhcyBUYWJJdGVtO1xyXG4gICAgICAgICAgICBpZiAodGFiSXRlbSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX21lbnVFbGVtZW50LkFwcGVuZCh0YWJJdGVtLl9oZWFkZXJFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIF9yb290LkFwcGVuZCh0YWJJdGVtLl9jb250ZW50RWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICB0YWJJdGVtLl9oZWFkZXJFbGVtZW50LkNsaWNrKChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlbW92ZUNsYXNzQWN0aXZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiSXRlbS5faGVhZGVyRWxlbWVudC5BZGRDbGFzcyhhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgdGFiSXRlbS5fY29udGVudEVsZW1lbnQuQWRkQ2xhc3MoYWN0aXZlKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgX3RhYnMuQWRkKHRhYkl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgSW5pdERPTSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcm9vdCA9IERPTS5kaXYoKTtcclxuXHJcbiAgICAgICAgICAgIF9tZW51RWxlbWVudCA9IERPTS5kaXYoXCJ1aSB0b3AgYXR0YWNoZWQgdGFidWxhciBtZW51XCIpLkFwcGVuZFRvKF9yb290KTtcclxuXHJcbiAgICAgICAgICAgIF9yb290LkFzPHNlbWFudGljX3VpLkpRdWVyeT4oKS50YWIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1ldGhvZHNcclxuICAgICAgICB2b2lkIFJlbW92ZUNsYXNzQWN0aXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB0YWJJdGVtIGluIF90YWJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWJJdGVtLl9jb250ZW50RWxlbWVudC5SZW1vdmVDbGFzcyhhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgdGFiSXRlbS5faGVhZGVyRWxlbWVudC5SZW1vdmVDbGFzcyhhY3RpdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cztcclxudXNpbmcgU3lzdGVtLldpbmRvd3MuTWFya3VwO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuQ29tbW9uO1xyXG51c2luZyBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuVUkuRGVzaWduO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFVuaWZvcm1HcmlkIDogRnJhbWV3b3JrRWxlbWVudCwgSUFkZENoaWxkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFVuaWZvcm1HcmlkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jaGlsZGVyZW4gPSBuZXcgTGlzdDxGcmFtZXdvcmtFbGVtZW50PigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjcmVnaW9uIEZpZWxkc1xyXG5cclxuICAgICAgICBqUXVlcnkgcm93O1xyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgaW50IENvbHVtbkNvdW50IHtnZXR7cmV0dXJuIF9jaGlsZGVyZW4uQ291bnQ7fX1cclxuXHJcbiAgICAgICAgc3RyaW5nIGdyaWRDbGFzcyB7Z2V0e3JldHVybiBcInVpIFwiICsgQ29sdW1uQ291bnQuVG9Xb3JkKCkgKyBcIiBjb2x1bW4gZ3JpZFwiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBJbmRleGVyc1xyXG4gICAgICAgIHB1YmxpYyBGcmFtZXdvcmtFbGVtZW50IHRoaXNbaW50IGNvbHVtbkluZGV4XSB7Z2V0e3JldHVybiBfY2hpbGRlcmVuW2NvbHVtbkluZGV4XTt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChGcmFtZXdvcmtFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29sdW1uRGl2ID0gRE9NLmRpdihcImNvbHVtblwiKS5BcHBlbmRUbyhyb3cpO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5Sb290LkFwcGVuZFRvKGNvbHVtbkRpdik7XHJcblxyXG4gICAgICAgICAgICBfY2hpbGRlcmVuLkFkZChlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXRET00oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb3QgPSBET00uZGl2KFwidWkgZXF1YWwgd2lkdGggZ3JpZFwiKTtcclxuXHJcbiAgICAgICAgICAgIHJvdyA9IERPTS5kaXYoXCJyb3dcIikuQXBwZW5kVG8oX3Jvb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzLkNvbnRyb2xzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0QmxvY2sgOiBGcmFtZXdvcmtFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXRET00oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb3QgPSBuZXcgalF1ZXJ5KERvY3VtZW50LkNyZWF0ZUVsZW1lbnQoXCJUZXh0QmxvY2tcIikpLkNzc19kaXNwbGF5X0lubGluZV9CbG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gVGV4dFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgVGV4dFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiVGV4dFwiLCB0eXBlb2Yoc3RyaW5nKSwgdHlwZW9mKFRleHRCbG9jayksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uSW5uZXJIVE1MQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBJbm5lckhUTUw7IH1cclxuICAgICAgICAgICAgc2V0IHsgSW5uZXJIVE1MID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJ1dHRvbiA6IEVsZW1lbnRCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sVGFnIHtnZXR7cmV0dXJuIFwiYnV0dG9uXCI7fX1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEh0bWxDbGFzc05hbWUge2dldHtyZXR1cm4gXCJ1aSBidXR0b25cIjt9fVxyXG5cclxuICAgICAgICAjcmVnaW9uIFRleHRQcm9wZXJ0eVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVwZW5kZW5jeVByb3BlcnR5IFRleHRQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIlRleHRcIiwgdHlwZW9mKHN0cmluZyksIHR5cGVvZihCdXR0b24pLCBuZXcgUHJvcGVydHlNZXRhZGF0YShUZXh0Q2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBUZXh0Q2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICgoRnJhbWV3b3JrRWxlbWVudClkKS5fcm9vdC5IdG1sKGUuTmV3VmFsdWUgYXMgc3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIElzQ2VudGVyQWxpZ25lZFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgSXNBY3RpdmVQcm9wZXJ0eSA9IERlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIklzQWN0aXZlXCIsIHR5cGVvZihib29sKSwgdHlwZW9mKEJ1dHRvbiksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKElzQWN0aXZlQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBJc0FjdGl2ZUNoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAoKEJ1dHRvbilkKS5BZGRDc3NDbGFzc09uVHJ1ZUVsc2VSZW1vdmUoZS5OZXdWYWx1ZSwgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgICAgIFxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzLk1hcmt1cDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRWxlbWVudENvbnRhaW5lcjogRWxlbWVudEJhc2UsIElBZGRDaGlsZFxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQmVmb3JlQWRkQ2hpbGQoRnJhbWV3b3JrRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQWZ0ZXJBZGRDaGlsZChGcmFtZXdvcmtFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEZyYW1ld29ya0VsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX3Jvb3QuQXBwZW5kVG8oX3Jvb3QpO1xyXG5cclxuICAgICAgICAgICAgQWRkQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENoaWxkKEZyYW1ld29ya0VsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJlZm9yZUFkZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBiYXNlLkFkZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBBZnRlckFkZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cy5NYXJrdXA7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdyaWQgOiBFbGVtZW50QmFzZSwgSUFkZENoaWxkXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgYm9vbCBBbGxDaGlsZHJlbkFyZUNvbHVtblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjaGlsZCBpbiBDaGlsZGVyZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hpbGQgaXMgQ29sdW1uKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0cmluZyBDbGFzc05hbWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2hpbGRyZW5Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInVpIGdyaWRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQWxsQ2hpbGRyZW5BcmVDb2x1bW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidWkgXCIgKyBDaGlsZGVyZW4uQ291bnQuVG9Xb3JkKCkgKyBcIiBjb2x1bW4gZ3JpZFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBcInVpIGdyaWRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoRnJhbWV3b3JrRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudC5Sb290LkFwcGVuZFRvKF9yb290KTtcclxuXHJcbiAgICAgICAgICAgIEFkZENoaWxkKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgVXBkYXRlQ2xhc3NOYW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290ID0gRE9NLmRpdigpO1xyXG4gICAgICAgICAgICBVcGRhdGVDbGFzc05hbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1ldGhvZHNcclxuICAgICAgICB2b2lkIFVwZGF0ZUNsYXNzTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcm9vdC5BdHRyKFwiY2xhc3NcIiwgQ2xhc3NOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhlYWRlciA6IEVsZW1lbnRCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sQ2xhc3NOYW1lIHtnZXR7cmV0dXJuIFwiaGVhZGVyXCI7fX1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gVGV4dFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgVGV4dFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiVGV4dFwiLCB0eXBlb2Yoc3RyaW5nKSwgdHlwZW9mKEhlYWRlciksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uSW5uZXJIVE1MQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBJbm5lckhUTUw7IH1cclxuICAgICAgICAgICAgc2V0IHsgSW5uZXJIVE1MID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIZWFkZXIxIDogSGVhZGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sQ2xhc3NOYW1lIHtnZXR7cmV0dXJuIFwidWkgaGVhZGVyXCI7fX1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEh0bWxUYWcge2dldHtyZXR1cm4gXCJoMVwiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIZWFkZXIyIDogSGVhZGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sQ2xhc3NOYW1lIHtnZXR7cmV0dXJuIFwidWkgaGVhZGVyXCI7fX1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEh0bWxUYWcge2dldHtyZXR1cm4gXCJoMlwiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIZWFkZXIzIDogSGVhZGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sQ2xhc3NOYW1lIHtnZXR7cmV0dXJuIFwidWkgaGVhZGVyXCI7fX1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEh0bWxUYWcge2dldHtyZXR1cm4gXCJoM1wiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEljb24gOiBFbGVtZW50QmFzZVxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgSHRtbFRhZyB7Z2V0e3JldHVybiBcImlcIjt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBUeXBlUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBUeXBlUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJUeXBlXCIsIHR5cGVvZihJY29uVHlwZSksIHR5cGVvZihJY29uKSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25UeXBlQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSWNvblR5cGUgVHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChJY29uVHlwZSkgR2V0VmFsdWUoVHlwZVByb3BlcnR5KTsgfVxyXG4gICAgICAgICAgICBzZXQgeyBTZXRWYWx1ZShUeXBlUHJvcGVydHksIHZhbHVlKTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25UeXBlQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChJY29uKSBkO1xyXG4gICAgICAgICAgICB2YXIgaWNvblR5cGUgPSAoSWNvblR5cGUpIGUuTmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gaWNvblR5cGUuVG9TdHJpbmcoKS5SZXBsYWNlKFwiX1wiLCBcIiBcIikuVG9Mb3dlcigpICsgXCIgaWNvblwiO1xyXG5cclxuICAgICAgICAgICAgbWUuX3Jvb3QuQWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBJbWFnZSA6IEVsZW1lbnRCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBGaWVsZHNcclxuICAgICAgICBqUXVlcnkgX2VsZW1lbnRJbWFnZTtcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUHVibGljIE1ldGhvZHNcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290ID0gRE9NLmJ1dHRvbihcInVpIGltYWdlXCIpO1xyXG4gICAgICAgICAgICBfZWxlbWVudEltYWdlID0gRE9NLmltZygpLkFwcGVuZFRvKF9yb290KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFNyY1Byb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgU3JjUHJvcGVydHkgPSBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJTcmNcIiwgdHlwZW9mKHN0cmluZyksIHR5cGVvZihJbWFnZSksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uU3JjQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNyY1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChzdHJpbmcpIEdldFZhbHVlKFNyY1Byb3BlcnR5KTsgfVxyXG4gICAgICAgICAgICBzZXQgeyBTZXRWYWx1ZShTcmNQcm9wZXJ0eSx2YWx1ZSk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uU3JjQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChJbWFnZSkgZDtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IChzdHJpbmcpIGUuTmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICBtZS5fZWxlbWVudEltYWdlLkF0dHIoXCJTcmNcIiwgbmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cztcclxudXNpbmcgQnJpZGdlLkN1c3RvbVVJTWFya3VwLkNvbW1vbjtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIElucHV0VGV4dCA6IEVsZW1lbnRCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBGaWVsZHNcclxuICAgICAgICBwcm90ZWN0ZWQgalF1ZXJ5IF9pbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEh0bWxDbGFzc05hbWUge2dldHtyZXR1cm4gXCJ1aSBpbnB1dFwiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1ldGhvZHNcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZnRlckluaXRET00oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2lucHV0RWxlbWVudCA9IERPTS5pbnB1dChcInRleHRcIikuQXBwZW5kVG8oX3Jvb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gVGV4dFByb3BlcnR5XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXBlbmRlbmN5UHJvcGVydHkgVGV4dFByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiVGV4dFwiLCB0eXBlb2Yoc3RyaW5nKSwgdHlwZW9mKElucHV0VGV4dCksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uVGV4dENoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUZXh0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHN0cmluZykgR2V0VmFsdWUoVGV4dFByb3BlcnR5KTsgfVxyXG4gICAgICAgICAgICBzZXQgeyBTZXRWYWx1ZShUZXh0UHJvcGVydHksIHZhbHVlKTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgT25UZXh0Q2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChJbnB1dFRleHQpIGQ7XHJcblxyXG4gICAgICAgICAgICBtZS5faW5wdXRFbGVtZW50LkF0dHIoXCJ2YWx1ZVwiLCAoc3RyaW5nKSBlLk5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFBsYWNlSG9sZGVyUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBQbGFjZUhvbGRlclByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiUGxhY2VIb2xkZXJcIiwgdHlwZW9mKHN0cmluZyksIHR5cGVvZihJbnB1dFRleHQpLCBuZXcgUHJvcGVydHlNZXRhZGF0YShPblBsYWNlSG9sZGVyQ2hhbmdlZCkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBsYWNlSG9sZGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKHN0cmluZykgR2V0VmFsdWUoUGxhY2VIb2xkZXJQcm9wZXJ0eSk7IH1cclxuICAgICAgICAgICAgc2V0IHsgU2V0VmFsdWUoUGxhY2VIb2xkZXJQcm9wZXJ0eSwgdmFsdWUpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBPblBsYWNlSG9sZGVyQ2hhbmdlZChEZXBlbmRlbmN5T2JqZWN0IGQsIERlcGVuZGVuY3lQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9IChJbnB1dFRleHQpIGQ7XHJcblxyXG4gICAgICAgICAgICBtZS5faW5wdXRFbGVtZW50LkF0dHIoXCJwbGFjZWhvbGRlclwiLCAoc3RyaW5nKSBlLk5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIF9jb3JuZXJMYWJlbERpdlxyXG4gICAgICAgIGpRdWVyeSBfY29ybmVyTGFiZWxEaXY7XHJcblxyXG4gICAgICAgIHZvaWQgSW5pdGlhbGl6ZUNvcm5lckxhYmVsRGl2KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfY29ybmVyTGFiZWxEaXYgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2Nvcm5lckxhYmVsRGl2ID0gRE9NLmRpdihcInVpIGNvcm5lciBsYWJlbFwiKS5BcHBlbmRUbyhfcm9vdCk7XHJcbiAgICAgICAgICAgICAgICBET00uaShcImFzdGVyaXNrIGljb25cIikuQXBwZW5kVG8oX2Nvcm5lckxhYmVsRGl2KTtcclxuICAgICAgICAgICAgICAgIF9yb290LkFkZENsYXNzKFwibGFiZWxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBSZW1vdmVDb3JuZXJMYWJlbERpdigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2Nvcm5lckxhYmVsRGl2ID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2Nvcm5lckxhYmVsRGl2LlJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgX2Nvcm5lckxhYmVsRGl2ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIF9yb290LlJlbW92ZUNsYXNzKFwibGFiZWxlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIElzTWFuZGF0b3J5UHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBJc01hbmRhdG9yeVByb3BlcnR5ID0gRGVwZW5kZW5jeVByb3BlcnR5LlJlZ2lzdGVyKFwiSXNNYW5kYXRvcnlcIiwgdHlwZW9mKGJvb2wpLCB0eXBlb2YoSW5wdXRUZXh0KSwgbmV3IFByb3BlcnR5TWV0YWRhdGEoT25Jc01hbmRhdG9yeUNoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNNYW5kYXRvcnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBHZXRWYWx1ZShJc01hbmRhdG9yeVByb3BlcnR5KS5Ub0Jvb2xlYW4oKTsgfVxyXG4gICAgICAgICAgICBzZXQgeyBTZXRWYWx1ZShJc01hbmRhdG9yeVByb3BlcnR5LCB2YWx1ZSk7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uSXNNYW5kYXRvcnlDaGFuZ2VkKERlcGVuZGVuY3lPYmplY3QgZCwgRGVwZW5kZW5jeVByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lID0gKElucHV0VGV4dCkgZDtcclxuXHJcbiAgICAgICAgICAgIGlmICgoYm9vbCkgZS5OZXdWYWx1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWUuSW5pdGlhbGl6ZUNvcm5lckxhYmVsRGl2KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZS5SZW1vdmVDb3JuZXJMYWJlbERpdigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENvbHVtbiA6IEVsZW1lbnRDb250YWluZXJcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEh0bWxDbGFzc05hbWUge2dldHtyZXR1cm4gXCJjb2x1bW5cIjt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBXaWRlUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBXaWRlUHJvcGVydHkgPVxyXG4gICAgICAgICAgICBEZXBlbmRlbmN5UHJvcGVydHkuUmVnaXN0ZXIoXCJXaWRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YoaW50KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihDb2x1bW4pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb3BlcnR5TWV0YWRhdGEoV2lkZUNoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKGludCkgR2V0VmFsdWUoV2lkZVByb3BlcnR5KTsgfVxyXG4gICAgICAgICAgICBzZXQgeyBTZXRWYWx1ZShXaWRlUHJvcGVydHksIHZhbHVlKTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgV2lkZUNoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSBlLk9sZFZhbHVlO1xyXG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBlLk5ld1ZhbHVlLlRvSW50MzJOdWxsYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZlID0gKEZyYW1ld29ya0VsZW1lbnQpIGQ7XHJcblxyXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUuSXNOb3ROdWxsKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZlLl9yb290LlJlbW92ZUNsYXNzKG9sZFZhbHVlLlRvSW50MzIoKS5Ub1dvcmQoKSArIFwiIHdpZGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5IYXNWYWx1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLlZhbHVlIDwgMCB8fCBuZXdWYWx1ZS5WYWx1ZSA+IDE2KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIk1heCB3aWRlIGlzIDE2LiBAdmFsdWU6XCIgKyBuZXdWYWx1ZS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmUuX3Jvb3QuQWRkQ2xhc3MobmV3VmFsdWUuVmFsdWUuVG9Xb3JkKCkgKyBcIiB3aWRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29udGFpbmVyIDogRWxlbWVudENvbnRhaW5lclxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgSHRtbENsYXNzTmFtZSB7Z2V0e3JldHVybiBcInVpIGNvbnRhaW5lclwiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBGb3JtIDogRWxlbWVudENvbnRhaW5lclxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gUHJvcGVydGllc1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgSHRtbENsYXNzTmFtZSB7Z2V0e3JldHVybiBcInVpIGZvcm1cIjt9fVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5XaW5kb3dzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5TZW1hbnRpY1VJXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSb3cgOiBFbGVtZW50Q29udGFpbmVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sQ2xhc3NOYW1lIHtnZXR7cmV0dXJuIFwicm93XCI7fX1cclxuICAgICAgICBzdHJpbmcgcm93Q2xhc3Mge2dldHtyZXR1cm4gQ2hpbGRlcmVuLkNvdW50LlRvV29yZCgpICsgXCIgY29sdW1uIHJvd1wiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1ldGhvZHNcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZnRlckFkZENoaWxkKEZyYW1ld29ya0VsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb290LkF0dHIoXCJjbGFzc1wiLCByb3dDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuQ3VzdG9tVUlNYXJrdXAuU2VtYW50aWNVSVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2VnbWVudCA6IEVsZW1lbnRDb250YWluZXJcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIEh0bWxDbGFzc05hbWUge2dldHtyZXR1cm4gXCJ1aSBzZWdtZW50XCI7fX1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIHN0YWNrZWQgOiBFbGVtZW50Q29udGFpbmVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sQ2xhc3NOYW1lIHtnZXR7cmV0dXJuIFwidWkgc3RhY2tlZFwiO319XHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLldpbmRvd3M7XHJcbnVzaW5nIEJyaWRnZS5DdXN0b21VSU1hcmt1cC5Db21tb247XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkN1c3RvbVVJTWFya3VwLlNlbWFudGljVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRBcmVhIDogSW5wdXRUZXh0XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBNZXRob2RzXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWZ0ZXJJbml0RE9NKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9pbnB1dEVsZW1lbnQgPSBET00udGV4dGFyZWEoKS5BcHBlbmRUbyhfcm9vdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBSb3dzUHJvcGVydHlcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlcGVuZGVuY3lQcm9wZXJ0eSBSb3dzUHJvcGVydHkgPURlcGVuZGVuY3lQcm9wZXJ0eS5SZWdpc3RlcihcIlJvd3NcIiwgdHlwZW9mKGludD8pLHR5cGVvZihUZXh0QXJlYSksIG5ldyBQcm9wZXJ0eU1ldGFkYXRhKE9uUm93c0NoYW5nZWQpKTtcclxuXHJcbiAgICAgICAgcHVibGljIGludD8gUm93c1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChpbnQ/KXRoaXNbXCJSb3dzXCJdOyB9XHJcbiAgICAgICAgICAgIHNldCB7IHRoaXNbXCJSb3dzXCJdID0gdmFsdWU7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uUm93c0NoYW5nZWQoRGVwZW5kZW5jeU9iamVjdCBkLCBEZXBlbmRlbmN5UHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWUgPSAoVGV4dEFyZWEpZDtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZS5OZXdWYWx1ZSBhcyBpbnQ/O1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuSGFzVmFsdWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1lLl9pbnB1dEVsZW1lbnQuQXR0cihcInJvd3NcIiwgdmFsdWUuVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSJdCn0K
