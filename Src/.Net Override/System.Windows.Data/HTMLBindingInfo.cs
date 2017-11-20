using Bridge.Html5;
using Bridge.jQuery2;

namespace System.Windows.Data
{
    public class HTMLBindingInfo : BindingInfo
    {
       

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
            var value = SourcePath.GetPropertyValue();

            var path = TargetPath.Path.ToUpperCase();

            if (path == "INNERHTML")
            {
                Target.Html(value + "");
                return;
            }

            if (path == "VALUE")
            {
                Target.Val(value + "");
                return;
            }

            Target.Attr(TargetPath.Path, value + "");
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