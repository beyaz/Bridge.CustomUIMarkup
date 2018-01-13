using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Xml;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.Libraries.CodeMirror
{
    class UIEditor : Control
    {
        #region Fields
        readonly Dictionary<int, FrameworkElement> _lineNumberToControlMap = new Dictionary<int, FrameworkElement>();
        #endregion

        #region Public Properties
        public override string DefaultTemplateAsXml
        {
            get
            {
                return
                    "<div  HeightPercent = '100' WidthPercent = '100'>" +
                    "    <SplitPanel Orientation='horizontal' HeightPercent = '100' WidthPercent = '100'>" +
                    "        <XmlEditor Text ='{" + nameof(SourceText) + @"}' HeightPercent = '100' WidthPercent = '100' " +
                    "                   OnTextChanged = '{" + nameof(OnTextChanged) + @"}' " +
                    "                   OnCursorLineNumberChanged = '{" + nameof(OnCursorLineNumberChanged) + @"}' />" +
                    "        <div Border = '1px solid Green' HeightPercent = '100' WidthPercent = '100' />" +
                    "    </SplitPanel>" +
                    "</div>";
            }
        }
        #endregion

        #region Properties
        FrameworkElement Container => GetVisualChildAt(0, 0).GetLogicalChildAt(1);
        #endregion

        #region Public Methods
        public void OnCursorLineNumberChanged(int lineNumber)
        {
            FocusToLine(lineNumber);
        }

        public void OnTextChanged()
        {
            ClearOutput();

            if (string.IsNullOrWhiteSpace(SourceText))
            {
                return;
            }

            try
            {
                var fe = new FrameworkElement
                {
                    DataContext = SourceDataContext
                };

                UIBuilder.LoadComponent(fe, XmlHelper.GetRootNode(SourceText), true, (line, element) => { _lineNumberToControlMap[line] = element; }, SourceText);

                var component = fe.GetLogicalChildAt(0);

                SetOutput(component);
            }
            catch (XmlException e)
            {
                SetErrorMessage(e.ToString());
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
            Container.ClearVisualChilds();
        }

        void FocusToLine(int lineNumber)
        {
            lineNumber                 = lineNumber + 1;
            FrameworkElement component = null;
            _lineNumberToControlMap?.TryGetValue(lineNumber, out component);
            if (component == null)
            {
                return;
            }

            var query = component._root;

            query.highlight();
        }

        void SetErrorMessage(string message)
        {
            ClearOutput();

            var textBlock = UIBuilder.Create<TextBlock>();

            textBlock.Text = message;

            Container.AddLogicalChild(textBlock);
        }

        void SetOutput(FrameworkElement element)
        {
            ClearOutput();

            Container.AddLogicalChild(element);
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