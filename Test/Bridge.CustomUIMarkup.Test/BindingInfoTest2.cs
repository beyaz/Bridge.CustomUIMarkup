using System.ComponentModel;
using System.Windows.Data;
using Bridge.Html5;
using Bridge.jQuery2;
using Bridge.QUnit;

namespace Bridge.CustomUIMarkup.Test
{
    class BindingInfoTest2
    {
        #region Public Methods
        public static void RunAll(Assert assert)
        {
            ShouldSupportTypeWhenSourcePropertyTypeIsObject(assert);
            ShouldSupportTypeWhenSourcePropertyTypeIsObjectAnd_Target_Is_HTML_Element(assert);
        }
        #endregion

        #region Methods
        static void ShouldSupportTypeWhenSourcePropertyTypeIsObject(Assert assert)
        {
            var source = new A();
            var target = new A();

            var bindingInfo = new BindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath  = nameof(source.ObjectProperty),
                Source      = source,
                Target      = target,
                TargetPath  = nameof(target.Int32Property)
            };

            bindingInfo.Connect();

            var value = 56;

            source.ObjectProperty = value;

            assert.AreEqual(56, target.Int32Property);

            target.Int32Property = 76;

            assert.AreEqual(76, (int) source.ObjectProperty);
        }

        static void ShouldSupportTypeWhenSourcePropertyTypeIsObjectAnd_Target_Is_HTML_Element(Assert assert)
        {
            var source = new A();
            var target = new jQuery(Document.CreateElement("input"));
            target.Attr("type", "hidden");

            var bindingInfo = new HTMLBindingInfo
            {
                BindingMode = BindingMode.TwoWay,
                SourcePath  = nameof(source.ObjectProperty),
                Source      = source,
                Target      = target,
                TargetPath  = "value"
            };

            bindingInfo.Connect();

            var value = 56;

            source.ObjectProperty = value;

            assert.AreEqual("56", target.Val());

            target.Val("76");

            target.Trigger(EventType.Change);

            assert.AreEqual(typeof(int).FullName, source.ObjectProperty.GetType().FullName);

            assert.AreEqual("76", source.ObjectProperty.ToString());
        }
        #endregion

        class A : Bag
        {
            #region int Int32Property
            int _int32Property;

            public int Int32Property
            {
                get { return _int32Property; }
                set
                {
                    if (_int32Property != value)
                    {
                        _int32Property = value;
                        OnPropertyChanged("Int32Property");
                    }
                }
            }
            #endregion

            #region object ObjectProperty
            object _objectProperty;

            public object ObjectProperty
            {
                get { return _objectProperty; }
                set
                {
                    if (_objectProperty != value)
                    {
                        _objectProperty = value;
                        OnPropertyChanged("ObjectProperty");
                    }
                }
            }
            #endregion
        }
    }
}