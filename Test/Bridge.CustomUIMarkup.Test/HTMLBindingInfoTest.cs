using System.ComponentModel;
using System.Windows;
using System.Windows.Data;
using Bridge.CustomUIMarkup.Common;
using Bridge.CustomUIMarkup.UI;

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

    class HTMLBindingInfoTest : TestBase
    {
        #region Public Methods
        public static void RunAll()
        {
            new HTMLBindingInfoTest().simpleBindingfor_src();
            new HTMLBindingInfoTest().simpleBindingfor_innerHtml();
            new HTMLBindingInfoTest().InnerHTML_binding_With_longPropertyPath();
        }

        public void InnerHTML_binding_With_longPropertyPath()
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
                Source = model,
                SourcePath = "UserInfo.StringProperty0",
                Target = div,
                TargetPath = "innerHTML",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            model.UserInfo.StringProperty0 = "A";

            MustEqual("A", div.Html());


            div = BuildAndGetFirstLogicalChild("<div>{UserInfo.StringProperty0}</div>", model).Root;








            MustEqual("A", div.Html());

            model.UserInfo.StringProperty0 = "B";

            MustEqual("B", div.Html());

        }

        public void simpleBindingfor_innerHtml()
        {
            var simpleClass1 = new SimpleClass1();

            var img = DOM.CreateElement("div");
            var htmlBindingInfo = new HTMLBindingInfo
            {
                Source = simpleClass1,
                SourcePath = "LastName",
                Target = img,
                TargetPath = "innerHTML",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            simpleClass1.LastName = SampleImageUrl_350_150;

            MustEqual(SampleImageUrl_350_150, img.Html());
        }

        public void simpleBindingfor_src()
        {
            var simpleClass1 = new SimpleClass1();

            var img = DOM.CreateElement("img");
            var htmlBindingInfo = new HTMLBindingInfo
            {
                Source = simpleClass1,
                SourcePath = "LastName",
                Target = img,
                TargetPath = "src",
                BindingMode = BindingMode.OneWay
            };

            htmlBindingInfo.Connect();

            simpleClass1.LastName = SampleImageUrl_350_150;

            MustEqual(SampleImageUrl_350_150, img.Attr("src"));
        }
        #endregion
    }
}