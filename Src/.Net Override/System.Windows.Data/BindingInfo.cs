using Bridge.CustomUIMarkup.Tokenizers;

namespace System.Windows.Data
{
    public class BindingInfo
    {
        public IValueConverter Converter { get; set; }


        #region Public Properties
        public BindingMode BindingMode { get; set; }

        public object Source { get; set; }

        public PropertyPath SourcePath { get; set; }

        public object Target { get; set; }

        public PropertyPath TargetPath { get; set; }
        #endregion

        #region Public Methods
        public static BindingInfo TryParseExpression(string value)
        {
            if (value == null)
            {
                return null;
            }

            value = value.Trim();

            if (value.StartsWith("{") == false)
            {
                return null;
            }

            if (value.EndsWith("}") == false)
            {
                return null;
            }


            string sourcePath = null;
            var bindingMode = Data.BindingMode.TwoWay;

            var tokens = BindingExpressionTokenizer.Tokenize(value);
            var len = tokens.Count;
            for (int i = 0; i < len; i++)
            {
                var token = tokens[i];

                if (token.TokenType == TokenType.Binding || token.Value == " ")
                {
                    continue;
                }

                if (sourcePath == null && token.TokenType == TokenType.Identifier)
                {
                    sourcePath = "";
                    while (i<len)
                    {
                        token = tokens[i];

                        if (token.TokenType == TokenType.Identifier ||
                            token.TokenType == TokenType.Dot )
                        {
                            sourcePath += token.Value;
                            i++;
                        }
                        else
                        {
                            i--;
                            break;
                        }
                    }
                    
                    continue;
                }
                

                if (token.TokenType == TokenType.Mode)
                {
                    Enum.TryParse( tokens[i + 2].Value, out bindingMode);
                }
            }

            return new BindingInfo {SourcePath = sourcePath,BindingMode = bindingMode};
        }

        static readonly Tokenizer BindingExpressionTokenizer = new Tokenizer
        {
            TokenDefinitions = BindingExpressionTokenDefinitions.Value
        };

        public void Connect()
        {
            ConnectSourceToTarget();

            if (BindingMode == BindingMode.TwoWay)
            {
                ConnectTargetToSource();
            }
            else
            {
                TargetPath.Walk(Target);
            }

            UpdateTarget();
        }


        protected virtual object GetTargetValue()
        {
            return TargetPath.GetPropertyValue();
        }


        public virtual void UpdateSource()
        {
            SourcePath.SetPropertyValue(GetTargetValue());
        }

        public virtual void UpdateTarget()
        {
            var value = SourcePath.GetPropertyValue();

            if (Converter != null)
            {
                value = Converter.Convert(value, null, null, null);
            }


            TargetPath.SetPropertyValue(value);
        }
        #endregion

        #region Methods
        protected virtual void ConnectSourceToTarget()
        {
            SourcePath.Listen(Source, UpdateTarget);
        }

        protected virtual void ConnectTargetToSource()
        {
            TargetPath.Listen(Target, UpdateSource);
        }
        #endregion
    }
}