using System;
using System.Windows;
using Bridge.CustomUIMarkup.UI;

namespace Bridge.CustomUIMarkup.Test
{
    public class TestBase
    {
        #region Fields
        protected string SampleImageUrl_350_150 = "http://via.placeholder.com/350x150";
        protected string SampleImageUrl_350_151 = "http://via.placeholder.com/350x151";
        #endregion

        #region Methods
        protected void AssertNotNull(object value)
        {
            if (value == null)
            {
                throw new InvalidCastException("@value can not be null.");
            }
        }

        protected FrameworkElement BuildAndGetFirstLogicalChild(string xmlString, object dataContext)
        {
            return new FrameworkElement
            {
                DataContext = dataContext
            }.LoadComponent(xmlString).GetLogicalChildAt(0);
        }

        protected void MustEqual(string expected, string actual)
        {
            if (expected != actual)
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }

        protected void MustEqual(int expected, int actual)
        {
            if (expected != actual)
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }

        protected void MustEqualByReference(object expected, object actual)
        {
            if (!ReferenceEquals(expected, actual))
            {
                throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
            }
        }

        protected void MustTrue(bool condition)
        {
            if (condition)
            {
                return;
            }

            throw new InvalidCastException("Test Failed.Expects True");
        }
        #endregion

        protected static class Assert
        {
            #region Public Methods
            public static void False(bool condition)
            {
                if (condition)
                {
                    throw new InvalidOperationException("Test Failed.Expects False");
                }
            }

            public static void True(bool condition)
            {
                if (condition)
                {
                    return;
                }

                throw new InvalidOperationException("Test Failed.Expects True");
            }

            public static void AreEqual(string expected, string actual)
            {
                if (expected != actual)
                {
                    throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
                }
            }

            public static void AreEqual(int? expected, int? actual)
            {
                if (expected != actual)
                {
                    throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
                }
            }
            public static void AreEqual(decimal expected, decimal actual)
            {
                if (expected != actual)
                {
                    throw new InvalidCastException("@expected: " + expected + " , @actual: " + actual);
                }
            }
            #endregion
        }
    }
}