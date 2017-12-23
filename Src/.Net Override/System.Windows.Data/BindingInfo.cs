using System.Collections.Generic;
using System.Linq;
using Bridge.CustomUIMarkup.Tokenizers;
using Bridge.Html5;

namespace System.Windows.Data
{
    public class BindingInfo
    {
        #region Static Fields
        static readonly Tokenizer BindingExpressionTokenizer = new Tokenizer
        {
            TokenDefinitions = BindingExpressionTokenDefinitions.Value
        };
        #endregion

        #region Public Properties
        public BindingMode BindingMode { get; set; }
        public IValueConverter Converter { get; set; }

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
            var bindingMode = BindingMode.TwoWay;
            IValueConverter valueConverter = null;

            var tokens = BindingExpressionTokenizer.Tokenize(value).Where(t => t.Value != " ").ToList();
            var len = tokens.Count;
            for (int i = 0; i < len; i++)
            {
                var token = tokens[i];

                if (token.Value.ToUpperCase() == "BINDING" || token.Value == " ")
                {
                    continue;
                }

                if (sourcePath == null && token.TokenType == TokenType.Identifier)
                {
                    sourcePath = ReadPath(tokens, ref i);

                    continue;
                }

                if (token.Value.ToUpperCase() == "MODE")
                {
                    i++; // skip mode
                    i++; // skip assingment

                    Enum.TryParse(tokens[i].Value, out bindingMode);
                    continue;
                }

                if (token.Value.ToUpperCase() == "CONVERTER")
                {
                    i++; // skip converter
                    i++; // skip assingment

                    var converterTypeFullName = ReadPath(tokens, ref i);

                    var converterType = Type.GetType(converterTypeFullName);
                    if (converterType == null)
                    {
                        throw new MissingMemberException(converterTypeFullName);
                    }

                    valueConverter = (IValueConverter) Activator.CreateInstance(converterType);
                }
            }

            return new BindingInfo
            {
                SourcePath = sourcePath,
                BindingMode = bindingMode,
                Converter = valueConverter
            };
        }

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

        public virtual void UpdateSource()
        {
            if (SourcePath.IsNotReadyToUpdate)
            {
                return;
            }

            SourcePath.SetPropertyValue(GetTargetValue());
        }

        public virtual void UpdateTarget()
        {
            if (TargetPath.IsNotReadyToUpdate)
            {
                return;
            }

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

        protected virtual object GetTargetValue()
        {
            return TargetPath.GetPropertyValue();
        }

        static string ReadPath(IReadOnlyList<Token> tokens, ref int i)
        {
            var path = "";
            while (true)
            {
                var token = tokens[i];

                if (token.TokenType == TokenType.Identifier ||
                    token.TokenType == TokenType.Dot)
                {
                    path += token.Value;
                    i++;
                }
                else
                {
                    i--;
                    break;
                }
            }

            return path;
        }
        #endregion
    }
}