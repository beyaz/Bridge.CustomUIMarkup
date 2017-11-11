using System;
using System.Windows;
using System.Xml;
using Bridge.CustomUIMarkup.UI.Design;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.Design
{
    class UIEditor : FrameworkElement
    {
        #region Fields
        Builder _builder;
        #endregion

        #region Public Properties
        public Func<Builder> CreateBuilder { get; set; }
        public FrameworkElement OutputElement { get; private set; }
        #endregion

        #region Properties
        jQuery Container => OutputElement.Childeren[1].Root;

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
            var builder = CreateBuilder();
            builder.XmlString = Template;
            builder.DataContext = this;

            OutputElement = (FrameworkElement) builder.Build();

            _root = OutputElement.Root;
        }

        public void OnCursorLineNumberChanged(int lineNumber)
        {
            _builder?.FocusToLine(lineNumber);
        }

        public void OnTextChanged()
        {
            ClearOutput();

            if (string.IsNullOrWhiteSpace(SourceText))
            {
                return;
            }

            _builder = CreateBuilder();
            _builder.XmlString = SourceText;
            _builder.DataContext = SourceDataContext;
            _builder.IsDesignMode = true;

            object component = null;

            try
            {
                component = _builder.Build();
                SetOutput(((FrameworkElement) component).Root);
            }
            catch (XmlException)
            {
            }
            catch (Exception e)
            {
                SetErrorMessage(e.ToString());
            }
        }
        #endregion

        #region Methods
        void ClearOutput()
        {
            Container.Empty();
        }

        void SetErrorMessage(string message)
        {
            Container.Html(message);
        }

        void SetOutput(jQuery element)
        {
            element.AppendTo(Container);
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