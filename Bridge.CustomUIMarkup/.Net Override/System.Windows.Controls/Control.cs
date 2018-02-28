using System.Collections.Generic;

namespace System.Windows.Controls
{
    public class Control : FrameworkElement
    {
        #region Static Fields
        internal static readonly Dictionary<string, Template> TemplateCache = new Dictionary<string, Template>();
        #endregion

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

                if (TemplateCache.TryGetValue(key, out template))
                {
                    return template;
                }

                var defaultTemplateAsXml = DefaultTemplateAsXml;
                if (defaultTemplateAsXml == null)
                {
                    TemplateCache[key] = null;
                    return null;
                }

                template = Template.CreateFromXml(defaultTemplateAsXml);

                TemplateCache[key] = template;

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

            UIBuilder.BuildControlTemplate(template, this);

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