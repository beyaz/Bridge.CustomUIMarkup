using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Test
{
    public static class QUnitExtensions
    {
        #region Public Methods
        public static void AreEqual(this Assert assert, string expected, string actual)
        {
            assert.Equal(actual, expected);
        }

        public static void AreEqual(this Assert assert, int? expected, int? actual)
        {
            assert.Equal(actual, expected);
        }

        public static void AreEqual(this Assert assert, int expected, int actual)
        {
            assert.Equal(actual, expected);
        }
        public static void AreEqual(this Assert assert, int expected, int actual,string message)
        {
            assert.Equal(actual, expected,message);
        }

        public static void AreEqual(this Assert assert, decimal expected, decimal actual)
        {
            assert.Equal(actual, expected);
        }

        public static void AreNotEqual(this Assert assert, string expected, string actual)
        {
            assert.NotEqual(actual, expected);
        }

        public static void AreNotEqual(this Assert assert, int expected, int actual)
        {
            assert.NotEqual(actual, expected);
        }

        public static void AreNotEqual(this Assert assert, int? expected, int? actual)
        {
            assert.NotEqual(actual, expected);
        }

        public static void AreNotEqual(this Assert assert, long? expected, long? actual)
        {
            assert.NotEqual(actual, expected);
        }

        public static void AreNotEqual(this Assert assert, ulong? expected, ulong? actual)
        {
            assert.NotEqual(actual, expected);
        }

        public static void False(this Assert assert, bool condition)
        {
            assert.Equal(condition, false);
        }

        public static void IsNull(this Assert assert, object value)
        {
            assert.Equal(value, null);
        }

        public static void IsTrue(this Assert assert, bool condition)
        {
            assert.Equal(condition, true);
        }
        public static void IsTrue(this Assert assert, bool condition,string message)
        {
            assert.Equal(condition, true, message);
        }

        public static void True(this Assert assert, bool condition)
        {
            assert.Equal(condition, true);
        }
        #endregion
    }
}