using System.ComponentModel;
using Bridge.jQuery2;

namespace System.Windows.Data
{
    public class HTMLBindingInfo : BindingInfo
    {
        #region Fields
        internal bool UpdateOnlyInnerHTML;
        #endregion

        #region Public Properties
        public new jQuery Target
        {
            get { return (jQuery) base.Target; }
            set { base.Target = value; }
        }
        #endregion

        #region Public Methods
        public new static HTMLBindingInfo TryParseExpression(string value)
        {
            var bindingInfo = BindingInfo.TryParseExpression(value);
            if (bindingInfo == null)
            {
                return null;
            }

            return new HTMLBindingInfo {SourcePath = bindingInfo.SourcePath};
        }

        public override void UpdateTarget()
        {
            if (ReflectionHelper.FindProperty(Source, SourcePath.Path) == null)
            {
                return;
            }

            var value = ReflectionHelper.GetPropertyValue(Source, SourcePath.Path);

            if (UpdateOnlyInnerHTML)
            {
                Target.Html(value + "");
                return;
            }

            if (TargetPath.Path == "value")
            {
                Target.Val(value + "");
            }
            else
            {
                Target.Attr(TargetPath.Path, value + "");
            }
        }
        #endregion

        #region Methods
        protected override void ConnectTargetToSource()
        {
            Target.FocusOut(ev => { UpdateSource(); });
        }
        #endregion
    }
}