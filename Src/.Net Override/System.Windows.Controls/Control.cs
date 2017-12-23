using Bridge.CustomUIMarkup.UI;

namespace System.Windows.Controls
{
    public class Control : FrameworkElement
    {
        #region Events
        protected internal event Action AfterTemplateApplied;
        #endregion

        #region Public Properties
        public virtual string DefaultTemplateAsXml
        {
            get { return null; }
        }

        public Template Template { get; set; }
        #endregion

        #region Properties
        internal Template DefaultTemplate
        {
            get
            {
                var key = GetType().FullName;

                Template template = null;

                if (Template.Cache.TryGetValue(key, out template))
                {
                    return template;
                }

                var defaultTemplateAsXml = DefaultTemplateAsXml;
                if (defaultTemplateAsXml == null)
                {
                    Template.Cache[key] = null;
                    return null;
                }

                template = Template.CreateFromXml(defaultTemplateAsXml);

                Template.Cache[key] = template;

                return template;
            }
        }
        #endregion

        #region Methods
        internal void ApplyTemplate()
        {
            var template = Template ?? DefaultTemplate;

            if (template == null)
            {
                return;
            }

            Builder.BuildControlTemplate(template, this);

            AfterTemplateApplied?.Invoke();
        }
        #endregion
    }

    public class UserControl : ContentControl
    {
        #region Public Properties
        public override string DefaultTemplateAsXml =>
            "<div HeightPercent = '100' " +
            "     WidthPercent  = '100' >" +
            "    <ContentPresenter HeightPercent = '100' WidthPercent  = '100' />" +
            "</div>";
        #endregion
    }
}