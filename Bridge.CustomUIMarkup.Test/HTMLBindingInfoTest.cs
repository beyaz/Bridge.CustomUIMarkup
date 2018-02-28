using System.ComponentModel;
using System.Windows;
using System.Windows.Data;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Test
{
    public class Model : Bag
    {
        #region UserInfoContract UserInfo
        UserInfoContract _userInfo;

        public UserInfoContract UserInfo
        {
            get { return _userInfo; }
            set
            {
                if (_userInfo != value)
                {
                    _userInfo = value;
                    OnPropertyChanged("UserInfo");
                }
            }
        }
        #endregion
    }

    public class UserInfoContract : Bag
    {
        #region string StringProperty0
        string _stringProperty0;

        public string StringProperty0
        {
            get { return _stringProperty0; }
            set
            {
                if (_stringProperty0 != value)
                {
                    _stringProperty0 = value;
                    OnPropertyChanged("StringProperty0");
                }
            }
        }
        #endregion

        #region string StringProperty1
        string _stringProperty1;

        public string StringProperty1
        {
            get { return _stringProperty1; }
            set
            {
                if (_stringProperty1 != value)
                {
                    _stringProperty1 = value;
                    OnPropertyChanged("StringProperty1");
                }
            }
        }
        #endregion

        #region int Int32Property0
        int _int32Property0;

        public int Int32Property0
        {
            get { return _int32Property0; }
            set
            {
                if (_int32Property0 != value)
                {
                    _int32Property0 = value;
                    OnPropertyChanged("Int32Property0");
                }
            }
        }
        #endregion

        #region int Int32Property1
        int _int32Property1;

        public int Int32Property1
        {
            get { return _int32Property1; }
            set
            {
                if (_int32Property1 != value)
                {
                    _int32Property1 = value;
                    OnPropertyChanged("Int32Property1");
                }
            }
        }
        #endregion
    }

    class HTMLBindingInfoTest
    {
        #region Public Methods
        public static void RunAll()
        {
            QUnit.QUnit.Test(nameof(HTMLBindingInfoTest) + "->" + nameof(simpleBindingfor_src), simpleBindingfor_src);
            QUnit.QUnit.Test(nameof(HTMLBindingInfoTest) + "->" + nameof(simpleBindingfor_innerHtml), simpleBindingfor_innerHtml);
            QUnit.QUnit.Test(nameof(HTMLBindingInfoTest) + "->" + nameof(InnerHTML_binding_With_longPropertyPath), InnerHTML_binding_With_longPropertyPath);
        }
        #endregion

        #region Methods
        static void InnerHTML_binding_With_longPropertyPath(Assert Assert)
        {
            var model = new Model
            {
                UserInfo = new UserInfoContract
                {
                    StringProperty0 = "Test1"
                }
            };

            var div = DOM.CreateElement("div");
            var htmlBindingInfo = new HTMLBindingInfo
            {
                Source      = model,
                SourcePath  = "UserInfo.StringProperty0",
                Target      = div,
                TargetPath  = "innerHTML",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            model.UserInfo.StringProperty0 = "A";

            Assert.AreEqual("A", div.Html());

            div = TestHelper.BuildAndGetFirstLogicalChild("<div>{UserInfo.StringProperty0}</div>", model).Root;

            Assert.AreEqual("A", div.Html());

            model.UserInfo.StringProperty0 = "B";

            Assert.AreEqual("B", div.Html());
        }

        static void simpleBindingfor_innerHtml(Assert Assert)
        {
            var simpleClass1 = new SimpleClass1();

            var img = DOM.CreateElement("div");
            var htmlBindingInfo = new HTMLBindingInfo
            {
                Source      = simpleClass1,
                SourcePath  = "LastName",
                Target      = img,
                TargetPath  = "innerHTML",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            simpleClass1.LastName = TestHelper.SampleImageUrl_350_150;

            Assert.AreEqual(TestHelper.SampleImageUrl_350_150, img.Html());
        }

        static void simpleBindingfor_src(Assert Assert)
        {
            var simpleClass1 = new SimpleClass1();

            var img = DOM.CreateElement("img");
            var htmlBindingInfo = new HTMLBindingInfo
            {
                Source      = simpleClass1,
                SourcePath  = "LastName",
                Target      = img,
                TargetPath  = "src",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            simpleClass1.LastName = TestHelper.SampleImageUrl_350_150;

            Assert.AreEqual(TestHelper.SampleImageUrl_350_150, img.Attr("src"));
        }
        #endregion
    }
}