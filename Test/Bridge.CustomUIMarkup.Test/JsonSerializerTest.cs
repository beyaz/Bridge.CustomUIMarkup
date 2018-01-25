using System.Collections.Generic;
using Bridge.CustomUIMarkup.Common;

namespace Bridge.CustomUIMarkup.Test
{
    public class JsonSerializerTest_Class1
    {
        #region Public Properties
        public JsonSerializerTest_Class1 Inner { get; set; }

        [JsonIgnoreSerializationOnPostOperation]
        public Dictionary<string, JsonSerializerTest_Class1> InnerDictionary { get; set; }

        public List<JsonSerializerTest_Class1> InnerList { get; set; }

        public int Int32Property_1 { get; set; }

        [JsonIgnoreSerializationOnPostOperation]
        public int Int32Property_2 { get; set; }

        public string StringProperty_1 { get; set; }

        [JsonIgnoreSerializationOnPostOperation]
        public string StringProperty_2 { get; set; }
        #endregion
    }

    class JsonSerializerTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new JsonSerializerTest().Should_Not_Serialize_When_Property_Has_JsonIgnoreSerializationOnPostOperation_Attribute();
        }
        #endregion

        #region Methods
        void Should_Not_Serialize_When_Property_Has_JsonIgnoreSerializationOnPostOperation_Attribute()
        {
            var instance = new JsonSerializerTest_Class1
            {
                Int32Property_1  = 5,
                Int32Property_2  = 6,
                StringProperty_1 = "A",
                StringProperty_2 = "B",
                Inner            = new JsonSerializerTest_Class1
                {
                    Int32Property_1  = 5,
                    Int32Property_2  = 6,
                    StringProperty_1 = "A",
                    StringProperty_2 = "B",

                    InnerList = new List<JsonSerializerTest_Class1>
                    {
                        new JsonSerializerTest_Class1
                        {
                            Int32Property_1  = 5,
                            Int32Property_2  = 6,
                            StringProperty_1 = "A",
                            StringProperty_2 = "B"
                        }
                    },
                    InnerDictionary = new Dictionary<string, JsonSerializerTest_Class1>
                    {
                        {
                            "1", new JsonSerializerTest_Class1
                            {
                                Int32Property_1  = 5,
                                Int32Property_2  = 6,
                                StringProperty_1 = "A",
                                StringProperty_2 = "B"
                            }
                        }
                    }
                }
            };

            var jsonSerializer = new JsonSerializer();

            // ACT
            var postValue = jsonSerializer.Deserialize<JsonSerializerTest_Class1>(jsonSerializer.SerializeForPostOperation(instance));

            Assert.AreEqual("A", postValue.StringProperty_1);
            Assert.IsNull(postValue.StringProperty_2);
            Assert.AreEqual(0, postValue.Int32Property_2);
            Assert.AreEqual(5, postValue.Int32Property_1);

            Assert.AreEqual("A", postValue.Inner.StringProperty_1);
            Assert.IsNull(postValue.Inner.StringProperty_2);
            Assert.AreEqual(0, postValue.Inner.Int32Property_2);
            Assert.AreEqual(5, postValue.Inner.Int32Property_1);

            Assert.AreEqual("A", postValue.Inner.InnerList[0].StringProperty_1);
            Assert.IsNull(postValue.Inner.InnerList[0].StringProperty_2);
            Assert.AreEqual(0, postValue.Inner.InnerList[0].Int32Property_2);
            Assert.AreEqual(5, postValue.Inner.InnerList[0].Int32Property_1);

            Assert.IsNull(postValue.Inner.InnerDictionary);
        }
        #endregion
    }
}