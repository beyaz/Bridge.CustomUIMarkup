using System.Collections.Generic;
using System.Windows;
using Bridge.CustomUIMarkup;
using Bridge.CustomUIMarkup.CodeMirror;
using Bridge.CustomUIMarkup.Common;
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
   <Container>
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
			 <image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />
			 <content Align='Center'>
				<Header Align='Center'>Motor Safari</Header>
				<description>Macera sizi bekliyor...</description>
				<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />
			 </content>
		  </card>
		  
		  <card>
			 <image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg' />
			 <content Align='Center'>
				<Header Align='Center'>Motor Safari</Header>
				<description>Macera sizi bekliyor...</description>
				<ui.basic.button Text='İncele' MarginTop='11' AddClass='yellow' />
			 </content>
		  </card>
		  
	  </ui.cards>
   </Container>
</ui.page.grid>

"
                },

                new ExampleInfo
                {
                    Name = "Carousel",
                    XmlTemplate =
                        @"


<container>
    <Carousel DataSource='img/carousel_1.jpg,img/carousel_2.jpg,img/carousel_3.jpg' />
</container>

"
                },

                new ExampleInfo
                {
                    Name = "Card",
                    XmlTemplate =
                        @"

<ui.cards>

    <card>
	    <image Src='http://www.samsunkorkuciftligi.com/upload/20170314__2069208026.jpg'/>
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
                    Name = "copy",
                    XmlTemplate =
                        @"


<Grid>
  
    <Column Width='27' Align='Center'>
        <Icon Type='Setting' Color='#ffbb00' FontSize='17' />
    </Column>
  
  	<Column Width='80'>
        <TextBlock Text='Start Date:' Color='#888888' FontSize='13' FontWeight='600' TextWrapping='NoWrap' />
    </Column>
  	
  	<Column   Align='Left' >
        <TextBlock Text='November 1, 2017 15:30' Color='#888888' FontSize='12' FontWeight='600' TextWrapping='NoWrap' />
    </Column>
</Grid>

"
                },
                new ExampleInfo
                {
                    Name = "properties",
                    XmlTemplate =
                    @"
<Grid>
    <column IsRightAligned ='True' Wide='15'>
        <Button Text='Aloha'  />    
    </column>
</Grid>

"
                },
                new ExampleInfo
                {
                    Name = "Layout",
                    XmlTemplate =
                        @"

<GroupBox Header='Yellow -> GroupBox' Background='Yellow' >
    <Container Background='Blue' Height='300'>
        <Grid  Background='Green'>
            <Row> 
	            <Container  Background='Yellow' Height='30'/>
	            <Container  Background='Yellow' Height='30'/>
            </Row>
            <Row> 
	            <Container  Background='Yellow' Height='30'/>
            </Row>
            <Row> 
	            <Container  Background='Yellow' Height='30'/>
	            <Container  Background='Yellow' Height='30' /> 
            </Row>
            <Row> 
	            <StackPanel  Background='Red' Height='50'>
	                <Container  Background='Blue' Height='10' />     
	                <Container  Background='Yellow' Height='10' />     
	                <StackPanel  Background='Blue' Height='10' />     
	            </StackPanel>
            </Row>
        </Grid>
    </Container> 

</GroupBox>
"
                },

                new ExampleInfo
                {
                    Name = "Simple",
                    XmlTemplate = @"

<GroupBox Header='Group Header'>
    <Container>

        <UniformGrid>
	        <textInput Value ='A'  PlaceHolder='Write 1' />
	        <textInput   PlaceHolder='Write 2' />
            
        </UniformGrid>

        <TextArea PlaceHolder='Write your ui here' Rows='5' />

    </Container>

</GroupBox>


"
                },
                new ExampleInfo
                {
                    Name = "Form",
                    XmlTemplate =
@"


<Form>
       
       <Field Value ='A'  Label='yy' PlaceHolder='Write 1' />
       <Field Value ='A'  PlaceHolder='Write 1' />
       <StackPanel>
           <Field Value ='A'  PlaceHolder='Write 1' />
       </StackPanel>
       
       <UniformGrid>
           <Field Value ='1' Label='1' PlaceHolder='Write 1' />
           <Field Value ='2'  PlaceHolder='Write 1' />
           <Field Value ='2'  PlaceHolder='Write 1' />
           <Field Value ='2'  PlaceHolder='Write 1' />
       </UniformGrid>
       
        <Container>
           <Field Value ='1'  PlaceHolder='Write 1' />
           <Field Value ='2'  PlaceHolder='Write 1' />
       </Container>

</Form>




"
                },

                new ExampleInfo
                {
                    Name = "Gravity in Columns",
                    XmlTemplate = @"
<Grid  Background='Black'>
    <Row> 
        <Column  Background='Yellow'   Gravity='2' >
           
        </Column>
        <Column  Background='REd'    />
        
        <!-- stretch max height  -->
        <Column  Background='Blue' Height='200' Gravity='2'   />
    </Row> 
    
</Grid>

"
                },
                new ExampleInfo
                {
                    Name = "Form 2",
                    XmlTemplate = @"


<Form>
    <Container>
  
    <GroupBox Header='İrtibat Bilgileri'>
        <Grid>
            <Row> 
                <Column >
                   <Field Label='E-Posta'/>
                   <Field Label='Telefon'/>
                </Column>
            </Row> 
        </Grid>
    </GroupBox>
    
    <GroupBox Header='TESLİMAT BİLGİLERİ'>
        <Grid>
            <Row> 
                <Column >
                    <Field Label='Adı'/>
                    <Field Label='Soy Adı'/>
                    <Field Label='Şehir'/>
                     <Field Label='İlçe'/>
                      <Field Label='Adres'/>
                      <Field Label='TC Kimlik No (İsteğe Bağlı)'/>
                </Column>
            </Row> 
        </Grid>
    </GroupBox>
    
    <Grid>
        <Row>
            <Column Gravity='7' />
           
            <Column >
                <Button Text='İlerle'/>                
            </Column>
        </Row>
    
    </Grid>
    
    
  </Container>
</Form>


"
                }
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

<Container >
    
    <ComboBox 
            ItemsSource = '{Binding Examples}' 
            DisplayMemberPath = 'Name'
            SelectedValuePath = 'XmlTemplate' 
		    SelectedValue = '{Binding CurrentTemplate}' />
        
    <UIEditor SourceText = '{CurrentTemplate}'  />
        
</Container>


";
        #endregion

        #region Public Methods
        public static void Main()
        {
            jQuery.Ready(() =>
            {
                ScriptLoader.LoadCssFile(VersionInfo.CssFile);
                ScriptLoader.LoadCssFiles(XmlEditor.CssFiles);
                ScriptLoader.LoadCssFiles(Bridge.CustomUIMarkup.jssor.Carousel.CssFiles); 

                var scripts = new List<string>();
                scripts.AddRange(VersionInfo.Scripts);
                scripts.AddRange(XmlEditor.Scripts);
                scripts.AddRange(Bridge.CustomUIMarkup.jssor.Carousel.JsFiles);

                new ScriptLoader
                {
                    Scripts = scripts,
                    OnLoacCompleted = RenderUIEditor
                }.Load();
            });
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

            var element = (FrameworkElement) builder.Build();

            element.Root.AppendTo(Document.Body);
        }
        #endregion
    }
}