using System;
using System.Windows;
using System.Xml;
using Bridge.CustomUIMarkup.SemanticUI;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Design
{
    class UIEditor : FrameworkElement
    {
        #region Fields
        Container UniformGrid;
        #endregion

        #region Properties
        jQuery Container => UniformGrid.Childeren[1].Root;

        string Template => @"
<Container>
    <XmlEditor Text ='{" + nameof(SourceText) + @"}' 
        OnTextChanged = '{" + nameof(OnTextChanged) + @"}' 
        OnCursorLineNumberChanged = '{" + nameof(OnCursorLineNumberChanged) + @"}' 
        Height='400' />
    <Container Background='#f3f5f6' />
</Container>";
        #endregion

        #region Public Methods
        public override void InitDOM()
        {
            var ui = new SemanticUI.Builder
            {
                XmlString = Template,
                DataContext = this
            }.Build();

            UniformGrid = (Container) ui;

            _root = UniformGrid.Root;
        }

        public void OnCursorLineNumberChanged(int lineNumber)
        {
            _builder?.FocusToLine(lineNumber);
        }

        SemanticUI.Builder _builder;
        public void OnTextChanged()
        {
            Container.Empty();

            if (string.IsNullOrWhiteSpace(SourceText))
            {
                return;
            }

            _builder = new SemanticUI.Builder
            {
                XmlString = SourceText,
                DataContext = SourceDataContext,
                IsDesignMode = true
            };

            object component = null;

            try
            {
                component = _builder.Build();
                ((FrameworkElement) component).Root.AppendTo(Container);
            }
            catch (XmlException)
            {
                
            }
            catch (Exception e)
            {
                Container.Html(e.ToString());
            }
        }
        #endregion

        #region string SourceText
        string _sourceText;

        public string SourceText
        {
            get { return _sourceText; }
            set
            {
                if (_sourceText != value)
                {
                    _sourceText = value;
                    OnPropertyChanged("SourceText");
                }
            }
        }
        #endregion

        #region object SourceDataContext
        object _sourceDataContext;

        public object SourceDataContext
        {
            get { return _sourceDataContext; }
            set
            {
                if (_sourceDataContext != value)
                {
                    _sourceDataContext = value;
                    OnPropertyChanged("SourceDataContext");
                }
            }
        }
        #endregion
    }
}