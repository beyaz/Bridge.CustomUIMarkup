using System.Collections.Generic;
using Bridge.CustomUIMarkup.Common;
using Bridge.Html5;
using Bridge.QUnit;

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

    class JsonSerializerTest
    {
        #region Public Methods
        [Ready]
        public static void RunAll()
        {
            QUnit.QUnit.Test(nameof(JsonSerializerTest) + "->" + nameof(Should_Not_Serialize_When_Property_Has_JsonIgnoreSerializationOnPostOperation_Attribute), Should_Not_Serialize_When_Property_Has_JsonIgnoreSerializationOnPostOperation_Attribute);
            QUnit.QUnit.Test(nameof(JsonSerializerTest) + "->" + nameof(Should_Restore_Values), Should_Restore_Values); 
        }
        #endregion

        #region Methods
        static JsonSerializerTest_Class1 CreateTestInstance()
        {
            return new JsonSerializerTest_Class1
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
        }

        static void Should_Not_Serialize_When_Property_Has_JsonIgnoreSerializationOnPostOperation_Attribute(Assert Assert)
        {
            var instance = CreateTestInstance();

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
            Assert.AreEqual("B", postValue.Inner.InnerList[0].StringProperty_2);
            Assert.AreEqual(6, postValue.Inner.InnerList[0].Int32Property_2);
            Assert.AreEqual(5, postValue.Inner.InnerList[0].Int32Property_1);

            Assert.IsNull(postValue.Inner.InnerDictionary);
        }


        static JsonSerializer Serializer => new JsonSerializer();

        static void Should_Restore_Values(Assert Assert)
        {
            var instance = CreateTestInstance();
            
            var postValue = Serializer.Deserialize<JsonSerializerTest_Class1>(Serializer.SerializeForPostOperation(instance));

            // ACT
            Serializer.RestoreAfterPostOperation(postValue,instance);

            Assert.Equal(Serializer.Serialize(postValue), Serializer.Serialize(CreateTestInstance()));
        }
        #endregion
    }
}