using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Xml;
using Bridge.CustomUIMarkup.Common;
using Bridge.Html5;

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
                    "        <div Border = '1px solid Green' HeightPercent = '100' WidthPercent = '100' css.display='inline-table' />" +
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

            Window.SetTimeout(() =>
            {
                try
                {
                    RenderComponent(TryGetDesignerdataContext());
                }
                catch (Exception e)
                {
                    SetErrorMessage(e.ToString());
                }

            },5);
            
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

        void RenderComponent(object dataContext)
        {
            try
            {
                var fe = new FrameworkElement
                {
                    DataContext = dataContext
                };

                UIBuilder.LoadComponent(fe, XmlHelper.GetRootNode(SourceText), true, (line, element) => { _lineNumberToControlMap[line] = element; }, SourceText);

                var component = fe.GetLogicalChildAt(0);

                SetOutput(component);
            }
            catch (Exception e)
            {
                SetErrorMessage(e.ToString());
            }
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

        object TryGetDesignerdataContext()
        {
            Type   type                = null;
            object instance            = null;
            var    rootNode            = XmlHelper.GetRootNode(SourceText);
            var    designerdataContext = rootNode.GetAttribute(UIBuilder.AttributeName_d_designerdataContext);

            if (designerdataContext == null)
            {
                return null;
            }

            if (designerdataContext.StartsWith("Random:"))
            {
                return  RandomValue.Object(GetTypeEnsure(designerdataContext.RemoveFromStart("Random:").Trim()));
            }

            var isMemberInfo = designerdataContext.Contains(":");

            if (isMemberInfo)
            {
                var list = SplitAndTrim(designerdataContext, ':');
                var typeName   = list[0];
                var memberName = list[1];

                type = GetTypeEnsure(typeName);
                

                instance = Activator.CreateInstance(type);

                if (memberName.EndsWith("()"))
                {
                    memberName     = memberName.RemoveFromEnd("()").Trim();
                    var methodInfo = type.GetMethod(memberName, ReflectionHelper.AllBindings);
                    if (methodInfo == null)
                    {
                        throw new MissingMemberException(designerdataContext);
                    }

                    if (methodInfo.IsStatic)
                    {
                        return methodInfo.Invoke(null);
                    }

                    return methodInfo.Invoke(instance);
                }
            }
            

            return Activator.CreateInstance(GetTypeEnsure(designerdataContext));
        }


        static List<string> SplitAndTrim(string value,char spliter)
        {
            return value.Split(spliter).Where(x => !x.IsNullOrWhiteSpace()).Select(x => x.Trim()).ToList();

        }
        static Type GetTypeEnsure(string typeName)
        {
            var type = Type.GetType(typeName);
            if (type == null)
            {
                throw new MissingMemberException(typeName);
            }

            return type;

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
    }
}