using Bridge.CustomUIMarkup.UI;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup_DesignerSamples
{
    public class App
    {
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
        <UIEditor SourceDataContext='{Inner}'   SourceText = '{CurrentTemplate}'/>
    </row>
        
</div>


";
        #endregion

        #region Public Methods
        public static void Init()
        {
            jQuery.Ready(RenderUIEditor);
        }
        #endregion

        #region Methods
        
        static void RenderUIEditor()
        {
            var builder = new Builder
            {
                DataContext = new ExampleDataContext { Inner = new ExampleDataContext{CurrentTemplate = "Write xml code here"}},
                XmlString = TestUI
            };

            var element =  builder.Build();

            element.Root.AppendTo(Document.Body);
        }
        #endregion
    }
}