using Bridge.CustomUIMarkup.UI;

namespace System.Windows.Controls
{
    public class Control : FrameworkElement
    {
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

        protected internal event Action AfterTemplateApplied;


        internal  void ApplyTemplate()
        {
            var template = Template ?? DefaultTemplate;

            if (template == null)
            {
                return ;
            }

            Builder.BuildControlTemplate(template, this);

            AfterTemplateApplied?.Invoke();
        }
    }
}