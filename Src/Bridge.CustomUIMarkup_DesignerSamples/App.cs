using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Libraries.CodeMirror;
using Bridge.CustomUIMarkup.Libraries.split_js;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.Libraries.Swiper;
using Bridge.CustomUIMarkup.Libraries.viewerjs;
using Bridge.jQuery2;
using XmlEditor = Bridge.CustomUIMarkup.UI.XmlEditor;

namespace Bridge.CustomUIMarkup_DesignerSamples
{
    class AppContainer : HtmlElement
    {
        #region Constructors
        public AppContainer()
        {
            UIBuilder.LoadComponent(this, TestUI);
            HeightPercent = 100;
        }
        #endregion

        #region Properties
        static string TestUI => @"

<div class='ui two row grid' HeightPercent = '100' WidthPercent = '100' >
    <row>
        <column Align='Center'>
             <ComboBox 
                ItemsSource = '{Binding Examples}' 
                DisplayMemberPath = 'Name'
                SelectedValuePath = 'XmlTemplate' 
		        SelectedValue = '{Binding CurrentTemplate}' />
        </column>
    </row>
    
    <row HeightPercent = '100'>
        <UIEditor   SourceText = '{CurrentTemplate}'/>
    </row>
        
</div>


";
        #endregion
    }

    public class App
    {
        #region Public Methods
        public static void Init()
        {
            SemanticUIElements.RegisterToBuilder();
            SplitJsElements.RegisterToBuilder();
            CodeMirrorElements.RegisterToBuilder();
            UIBuilder.Register("XmlEditor", () => new XmlEditor());
            ViewerJsElements.RegisterToBuilder();
            SwiperElements.RegisterToBuilder();

            jQuery.Ready(RenderUIEditor);
        }
        #endregion

        #region Methods
        static void RenderUIEditor()
        {
            UIBuilder.Create<UIEditor>().RenderInBody();
        }
        #endregion
    }
}