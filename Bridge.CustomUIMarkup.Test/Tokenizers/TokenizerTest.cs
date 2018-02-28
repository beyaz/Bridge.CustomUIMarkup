using System.Linq;
using Bridge.CustomUIMarkup.Test;

namespace System.Text.Tokenizers
{
    class TokenizerTest : TestBase
    {
        #region Public Methods
        public static void Run()
        {
            new TokenizerTest().ParseBindingExpressions();
        }
        #endregion

        #region Methods
        void ParseBindingExpressions()
        {
            var str = @"{Binding A.Br5.C_76,Mode=TwoWay}";

            var tokenizer = new Tokenizer
            {
                TokenDefinitions = BindingExpressionTokenDefinitions.Value
            };

            var tokens = tokenizer.Tokenize(str).ToList();

            MustEqual(13, tokens.Count);
        }
        #endregion
    }
}