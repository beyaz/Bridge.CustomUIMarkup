using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.Libraries.CodeMirror;
using Bridge.jQuery2;
using Elements = Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements;
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
            Elements.RegisterToBuilder();
            CustomUIMarkup.Libraries.split_js.Elements.RegisterToBuilder();
            CustomUIMarkup.Libraries.CodeMirror.Elements.RegisterToBuilder();
            UIBuilder.Register("XmlEditor", () => new XmlEditor());
            CustomUIMarkup.Libraries.viewerjs.Elements.RegisterToBuilder();
            CustomUIMarkup.Libraries.Swiper.Elements.RegisterToBuilder();

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