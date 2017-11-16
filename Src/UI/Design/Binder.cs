using System;
using System.Linq;
using System.Windows.Data;
using Bridge.CustomUIMarkup.Common;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.UI.Design
{
    public class Binder 
    {
        #region Public Properties
        public virtual BinderEventAttributeResolver BinderEventAttributeResolver { get; set; } = new BinderEventAttributeResolver();
        public object Caller { get; set; }
        public object DataContext { get; set; }

        public string TemplateHTML
        {
            set { TemplateQuery = jQuery.Element(jQuery.ParseHTML(value)); }
        }

        public jQuery TemplateQuery { get; set; }
        #endregion

        #region Public Methods
        public void Process()
        {
            TemplateQuery.Each((index, element) =>
            {
                if (element.NodeType == NodeType.Text)
                {
                    if (TryParseExpression(element.InnerHTML) != null)
                    {
                        ProcessElement(element);
                    }
                    return;
                }

                ProcessElement(element);

                if (element.GetElementsByTagNameIsNotSupporting())
                {
                    return;
                }

                foreach (var htmlElement in element.GetElementsByTagName("*"))
                {
                    ProcessElement(htmlElement);
                }
            });
        }
        #endregion

        #region Methods
        

        void ProcessElement(Element element)
        {
            foreach (var attribute in element.Attributes)
            {
                var attributeName = attribute.NodeName;
                if (BinderEventAttributeResolver.IsEventAttribute(attributeName))
                {
                    ProcessElementPropertyForEvents(element, attribute.NodeName, BinderEventAttributeResolver.GetjQueryEventName(attributeName));
                    continue;
                }
                ProcessElementProperty(element, attribute.NodeName);
            }

            ProcessElementPropertyForHtmlContent(element);
        }

        void ProcessElementProperty(Element element, string propertyName)
        {
            var value = element.GetAttribute(propertyName);

            var info = TryParseExpression(value);

            if (info == null)
            {
                return;
            }

            info.Source = DataContext;
            info.Target = jQuery.Element(element);
            info.TargetPath = propertyName;

            info.Connect();
        }

        void ProcessElementPropertyForEvents(Element element, string attiributeName, string jQueryEventName)
        {
            var value = element.GetAttribute(attiributeName);

            var info = TryParseExpression(value);

            if (info == null)
            {
                return;
            }

            var mi = Caller.GetType().GetMethod(info.SourcePath.Path);
            if (mi == null)
            {
                throw new ArgumentException(info.SourcePath.Path);
            }

            if (jQueryEventName == "click" && mi.ParameterTypes.FirstOrDefault() == typeof(jQueryMouseEvent))
            {
                jQuery.Element(element).Click(mouseEvent => { mi.Invoke(Caller, mouseEvent); });
            }
            else
            {
                if (mi.ParameterTypes.Length != 0)
                {
                    throw new ArgumentException(info.SourcePath.Path);
                }
                jQuery.Element(element).On(jQueryEventName, () => { mi.Invoke(Caller); });
            }
        }

        void ProcessElementPropertyForHtmlContent(Element element)
        {
            var value = jQuery.Element(element).Html();

            var info = TryParseExpression(value);

            if (info == null)
            {
                return;
            }

            info.Source = DataContext;
            info.Target = jQuery.Element(element);
            info.UpdateOnlyInnerHTML = true;

            info.Connect();
        }

        static HTMLBindingInfo TryParseExpression(string value)
        {
            return HTMLBindingInfo.TryParseExpression(value);
        }
        #endregion
    }
}