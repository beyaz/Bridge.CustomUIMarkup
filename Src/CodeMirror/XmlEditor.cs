using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using Bridge.CustomUIMarkup.Common;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.CodeMirror
{
    public class XmlEditor : FrameworkElement
    {
        public XmlEditor()
        {
            this.OnPropertyChanged(nameof(FontSize), FontSizeChanged);
        }
        #region FontSizeProperty
       
        void FontSizeChanged()
        {
            var fontSize = FontSize;

            var me = this;

            if (me._editor != null)
            {
                if (me.isFiring_OnTextChanged)
                {
                    return;
                }

                Script.Write<string>("me._editor.display.wrapper.style.fontSize = fontSize + 'px';");
                Script.Write<string>("me._editor.refresh();");
            }
        }
        #endregion

        #region Fields
        public object _editor;

        bool isFiring_OnTextChanged;
        #endregion

        #region Public Events
        public event Action OnTextChanged;
        public event Action<int> OnCursorLineNumberChanged;
        #endregion

        #region Public Properties
        public static IReadOnlyList<string> CssFiles => new[]
        {
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/codemirror.css",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/hint/show-hint.css",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/foldgutter.css",
                ScriptLoader.CssDirectory + "CodeMirror.css"
        };

        public static IReadOnlyList<string> Scripts => new[]
        {
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/codemirror.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/mode/xml/xml.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/hint/show-hint.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/hint/xml-hint.js",
           
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/edit/closetag.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/foldcode.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/foldgutter.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/xml-fold.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/indent-fold.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/addon/fold/markdown-fold.js",
            "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0/mode/markdown/markdown.js"
        };
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            _root = DOM.div();
            Render();
        }
        #endregion

        #region Methods
        protected virtual void Render()
        {
            _root.Empty();

            _root.Css("height", "100%");

            DOM.textarea().Prop("id", Id).AppendTo(_root).Css("height", "100%");

            jQuery.Ready(() => { Render(Id); });
        }

        void Fire_OnTextChanged(object editor, object changeObj)
        {
            if (isFiring_OnTextChanged)
            {
                return; 
            }

            isFiring_OnTextChanged = true;

            if (_editor != null)
            {
                var editorValue = Script.Write<string>("this._editor.getValue()");
                Text = editorValue;
            }

            OnTextChanged?.Invoke();

            isFiring_OnTextChanged = false;
        }

        int _cursorCurrentLineNumber;
        void Fire_onCursorActivity( object e)
        {
            _cursorCurrentLineNumber = Script.Write<int>("e.doc.getCursor().line");

            OnCursorLineNumberChanged?.Invoke(_cursorCurrentLineNumber);
        }


        public virtual object SchemaInfo { get; set; }

        void Render(string id)
        {
            var fontSize = this[nameof(FontSize)] == null ? 12:FontSize;
            
            var schemaInfo = SchemaInfo;

            Script.Write(
                @"


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


");
        }
        #endregion

        #region TextProperty
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register(nameof(Text), typeof(string), typeof(XmlEditor), new PropertyMetadata(TextChanged));

        public string Text
        {
            get { return (string)this[nameof(Text)]; }
            set { this[nameof(Text)] = value; }
        }

        static void TextChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            var newValue = (string) e.NewValue;

            var me = (XmlEditor) d;

            if (me._editor != null)
            {
                if (me.isFiring_OnTextChanged)
                {
                    return;
                }

                Script.Write<string>("me._editor.setValue(newValue);");
            }
        }
        #endregion
    }
}