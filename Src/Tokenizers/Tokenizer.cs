﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Windows.Data;
using Bridge.Html5;

namespace Bridge.CustomUIMarkup.Tokenizers
{
    internal enum TokenType
    {
        Binding,
        Mode,
        Converter,
        TwoWay,
        LeftBracket,
        RightBracket,
        OpenParenthesis,
        CloseParenthesis,
        Identifier,
        Comma,
        Dot,
        Equals,
        This,
        NotEquals,
        StringValue,
        SequenceTerminator,
        NumberValue
    }

    class TokenDefinition
    {
        #region Fields
        readonly int _precedence;
        readonly Regex _regex;
        readonly TokenType _tokenType;
        #endregion

        #region Constructors
        public TokenDefinition(TokenType tokenType, string regexPattern, int precedence)
        {
            _regex = new Regex(regexPattern, RegexOptions.IgnoreCase /*| RegexOptions.Compiled*/);
            _tokenType = tokenType;
            _precedence = precedence;
        }
        #endregion

        #region Public Methods
        public IEnumerable<TokenMatch> FindMatches(string inputString)
        {
            var matches = _regex.Matches(inputString);
            var len = matches.Count;
            for (var i = 0; i < len; i++)
            {
                var match = matches[i];

                yield return new TokenMatch
                {
                    StartIndex = match.Index,
                    EndIndex = match.Index + match.Length,
                    TokenType = _tokenType,
                    Value = match.Value,
                    Precedence = _precedence
                };
            }
        }
        #endregion
    }

    class TokenMatch
    {
        #region Public Properties
        public int EndIndex { get; set; }
        public int Precedence { get; set; }
        public int StartIndex { get; set; }
        public TokenType TokenType { get; set; }
        public string Value { get; set; }
        #endregion
    }

    class Token
    {
        #region Constructors
        public Token(TokenType tokenType)
        {
            TokenType = tokenType;
            Value = string.Empty;
        }

        public Token(TokenType tokenType, string value)
        {
            TokenType = tokenType;
            Value = value;
        }
        #endregion

        #region Public Properties
        public TokenType TokenType { get; set; }
        public string Value { get; set; }
        #endregion

        #region Public Methods
        public Token Clone()
        {
            return new Token(TokenType, Value);
        }

        public override string ToString()
        {
            return "{" + TokenType + ":" + Value + "}";
        }
        #endregion
    }

    class BindingExpressionTokenDefinitions
    {
        #region Public Properties
        public static IReadOnlyList<TokenDefinition> Value
        {
            get
            {
                return new List<TokenDefinition>
                {
                    //new TokenDefinition(TokenType.Binding, "binding", 1),
                    //new TokenDefinition(TokenType.Mode, "mode", 1),
                    //new TokenDefinition(TokenType.Converter, "converter", 1),
                    //new TokenDefinition(TokenType.TwoWay, "twoway", 1),
                    new TokenDefinition(TokenType.LeftBracket, "\\{", 1),
                    new TokenDefinition(TokenType.RightBracket, "\\}", 1),
                    new TokenDefinition(TokenType.OpenParenthesis, "\\(", 1),
                    new TokenDefinition(TokenType.CloseParenthesis, "\\)", 1),

                    new TokenDefinition(TokenType.Equals, "=", 1),
                    new TokenDefinition(TokenType.This, "this", 1),
                    new TokenDefinition(TokenType.NotEquals, "!=", 1),
                    new TokenDefinition(TokenType.Identifier, "[a-zA-Z_$][a-zA-Z0-9_$]*", 1),

                    // new TokenDefinition(TokenType.StringValue, "'([^']*)'", 1),
                    new TokenDefinition(TokenType.NumberValue, "\\d+", 1),

                    new TokenDefinition(TokenType.Comma, ",", 1),
                    new TokenDefinition(TokenType.Dot, ".", 1)
                };
            }
        }
        #endregion
    }

    class Tokenizer
    {
        #region Public Properties
        public IReadOnlyList<TokenDefinition> TokenDefinitions { get; set; }
        #endregion

        #region Public Methods
        public IReadOnlyList<Token> Tokenize(string data)
        {
            var tokenDefinitions = TokenDefinitions;

            if (tokenDefinitions == null)
            {
                throw new ArgumentException(nameof(TokenDefinitions));
            }

            var tokenMatches = new List<TokenMatch>();

            foreach (var tokenDefinition in tokenDefinitions)
            {
                tokenMatches.AddRange(tokenDefinition.FindMatches(data).ToList());
            }

            var items = new List<Token>();

            var groupedByIndex = tokenMatches.GroupBy(x => x.StartIndex)
                                             .OrderBy(x => x.Key)
                                             .ToList();

            TokenMatch lastMatch = null;

            var len = groupedByIndex.Count;
            for (var i = 0; i < len; i++)
            {
                var bestMatch = groupedByIndex[i].OrderBy(x => x.Precedence).First();
                if (lastMatch != null && bestMatch.StartIndex < lastMatch.EndIndex)
                {
                    continue;
                }

                items.Add(new Token(bestMatch.TokenType, bestMatch.Value));

                lastMatch = bestMatch;
            }

            return items;
        }
        #endregion
    }



    static class Extensions
    {
        internal static void SkipSpace(this IReadOnlyList<Token> tokens, ref int i)
        {
            var len = tokens.Count;

            while (i < len)
            {
                var token = tokens[i];

                if (token.Value == " ")
                {
                    i++;
                    continue;
                }
                return;

            }

        }
    }

    internal class ViewInvocationExpressionInfo
    {
        static readonly Tokenizer BindingExpressionTokenizer = new Tokenizer
        {
            TokenDefinitions = new List<TokenDefinition>
            {
                new TokenDefinition(TokenType.Binding, "this", 1),
                new TokenDefinition(TokenType.OpenParenthesis, "\\(", 1),
                new TokenDefinition(TokenType.CloseParenthesis, "\\)", 1),

                new TokenDefinition(TokenType.Identifier, "[a-zA-Z_$][a-zA-Z0-9_$]*", 1),

                new TokenDefinition(TokenType.StringValue, "'([^']*)'", 1),
                new TokenDefinition(TokenType.Comma, ",", 1),
                new TokenDefinition(TokenType.Dot, ".", 1)
            }
    };

        public string        MethodName       { get; set; }
        public bool          IsStartsWithThis { get; set; }
        public IReadOnlyList<object> Parameters       { get; set; }





       


        public static ViewInvocationExpressionInfo Parse(string expression)
        {
            var info = new ViewInvocationExpressionInfo();

            var parameters = new List<object>();

         

            var tokens = BindingExpressionTokenizer.Tokenize(expression);
            var len = tokens.Count;
            for (int i = 0; i < len; i++)
            {
                var token = tokens[i];

                if (token.Value.ToUpperCase() == "THIS" || token.Value == " "|| token.Value == "(" || token.Value == ")" || token.Value == "," || token.Value == ".")
                {
                    info.IsStartsWithThis = true;
                    continue;
                }

                if (info.MethodName == null && token.TokenType == TokenType.Identifier)
                {
                    info.MethodName = token.Value;

                    continue;
                }

                // in parameters

                if (token.Value.StartsWith("'"))
                {
                    var valueLen = token.Value.Length;
                    parameters.Add(token.Value.Substring(1,valueLen-2));
                    continue;
                }

                parameters.Add(decimal.Parse(token.Value));
            }

            info.Parameters = parameters;
            return info;
        }
    }
}