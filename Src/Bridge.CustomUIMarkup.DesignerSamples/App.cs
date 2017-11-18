using System.Collections.Generic;
using System.Windows;
using Bridge.CustomUIMarkup.SemanticUI;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup.DesignerSamples
{
    public class ExampleInfo : FrameworkElement
    {
        #region string Name
        string _name;

        public string Name
        {
            get { return _name; }
            set
            {
                if (_name != value)
                {
                    _name = value;
                    OnPropertyChanged("Name");
                }
            }
        }
        #endregion

        #region string XmlTemplate
        string _xmlTemplate;

        public string XmlTemplate
        {
            get { return _xmlTemplate; }
            set
            {
                if (_xmlTemplate != value)
                {
                    _xmlTemplate = value;
                    OnPropertyChanged("XmlTemplate");
                }
            }
        }
        #endregion
    }

    public class ExampleDataContext : FrameworkElement
    {
        #region Constructors
        public ExampleDataContext()
        {
            Examples = new List<ExampleInfo>
            {

                new ExampleInfo
                {
                    Name = "All",
                    XmlTemplate =
                        @"





<ui.page.grid>
   <ui.container>
      <ui.text.menu.navbar FontSize='18'>
         <left.menu>
            <item>Project Name</item>
         </left.menu>
         <right.menu>
            <item>Home</item>
            <item>About</item>
            <item>Contact</item>
         </right.menu>
      </ui.text.menu.navbar>
      <ui.divider MarginBottom='10' />
      <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />
      <ui.divider MarginBottom='10' />
	  <ui.cards>
	  
		  <card>
			 <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />
			 <content Align='Center'>
				<Header Align='Center'>Motor Safari</Header>
				<description>Macera sizi bekliyor...</description>
				<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />
			 </content>
		  </card>
		  
		  <card>
			 <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />
			 <content Align='Center'>
				<Header Align='Center'>Motor Safari</Header>
				<description>Macera sizi bekliyor...</description>
				<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />
			 </content>
		  </card>
		  
	  </ui.cards>
   </ui.container>
</ui.page.grid>



"
                },

                new ExampleInfo
                {
                    Name = "Carousel",
                    XmlTemplate =
                        @"


<ui.container>
    <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />
</ui.container>

"
                },

                new ExampleInfo
                {
                    Name = "Card",
                    XmlTemplate =
                        @"

<ui.cards>

    <card>
	    <ui.image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg'/>
	    <content Align='Center'>
            <Header Align='Center' >Motor Safari</Header>
            <description> Macera sizi bekliyor...</description>
            <ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />
        </content>	
    </card>

</ui.cards>
"
                },
                new ExampleInfo
                {
                    Name = "Grid.column",
                    XmlTemplate =
                        @"


<ui.grid>
  
    <column Width='27' Align='Center'>
        <Icon Type='Setting' Color='#ffbb00' FontSize='17' />
    </column>
  
  	<Column Width='80'>
        <TextBlock Text='Start Date:' Color='#888888' FontSize='13' FontWeight='600' TextWrapping='NoWrap' />
    </Column>
  	
  	<Column   Align='Left' >
        <TextBlock Text='November 1, 2017 15:30' Color='#888888' FontSize='12' FontWeight='600' TextWrapping='NoWrap' />
    </Column>
</ui.grid>

"
                },
                
               
                
                new ExampleInfo
                {
                    Name = "Form",
                    XmlTemplate =
@"


<ui.segment>
  <ui.page.grid Align='Center' MarginTop='5'>
      <ui.form  Padding='55' Border='1px solid #ddd'>
        <ui.header.3>Input form</ui.header.3>
     <Field Value='A' Label='yy'>
        <TextBox PlaceHolder='Write 1' />
     </Field>
     <ui.stacked>
        <Field Value='A' Label='yy' >
           <TextBox PlaceHolder='Write 1' IsMandatory='True' />
        </Field>
     </ui.stacked>
     <ui.equal.width.grid>
        <column>
           <Field Value='A' Label='yy'>
              <TextBox PlaceHolder='Write 1' />
           </Field>
        </column>
        <column>
           <Field Value='A' Label='yy'>
              <TextBox PlaceHolder='Write 1' />
           </Field>
        </column>
     </ui.equal.width.grid>
        
        <ui.grid>
          <column Align='Right'>
        		<ui.button Text='No'   />
            	<ui.button Text='Yes'  AddClass='positive'  />
            </column>
        </ui.grid>
  </ui.form>
  </ui.page.grid>
</ui.segment>




"
                },

               
               
            };
        }
        #endregion

        #region List<ExampleInfo> Examples
        List<ExampleInfo> _examples;

        public List<ExampleInfo> Examples
        {
            get { return _examples; }
            set
            {
                if (_examples != value)
                {
                    _examples = value;
                    OnPropertyChanged("Examples");
                }
            }
        }
        #endregion

        #region string CurrentTemplate
        string _currentTemplate;

        public string CurrentTemplate
        {
            get { return _currentTemplate; }
            set
            {
                if (_currentTemplate != value)
                {
                    _currentTemplate = value;
                    OnPropertyChanged("CurrentTemplate");
                }
            }
        }
        #endregion


    }

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
        <UIEditor SourceText = '{CurrentTemplate}'  />
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
                DataContext = new ExampleDataContext(),
                XmlString = TestUI
            };

            var element =  builder.Build();

            element.Root.AppendTo(Document.Body);
        }
        #endregion
    }
}