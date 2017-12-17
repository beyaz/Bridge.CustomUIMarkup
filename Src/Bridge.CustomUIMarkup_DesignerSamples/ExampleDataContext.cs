﻿using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;

namespace Bridge.CustomUIMarkup_DesignerSamples
{
    public class ExampleDataContext : Bag
    {

     


        #region ExampleDataContext Inner
        ExampleDataContext _inner;
        public ExampleDataContext Inner
        {
            get { return _inner; }
            set
            {
                if (_inner != value)
                {
                    _inner = value;
                    OnPropertyChanged("Inner");
                }
            }
        }
        #endregion




        #region Constructors
        public ExampleDataContext()
        {
            Examples = new List<ExampleInfo>
            {

                new ExampleInfo
                {
                    Name = "DataGrid",
                    XmlTemplate =
                        @"


<div Padding='11'>
	<DataGrid ItemsSource='{Examples}'>
		<DataGrid.Columns>
			<DataGridColumn Label='Label_A'    Name = 'Name' />
			<DataGridColumn Label='xxxx'    Name = 'Name' />
		</DataGrid.Columns>
	</DataGrid>
</div> 

"
                },

                new ExampleInfo
                {
                    Name = "Add review",
                    XmlTemplate =
                        @"


<ui.segment Margin='11'>
	<ui.form >
		<ui.header.2>Add a review</ui.header.2>

		<field Label='your Rating'>
			<ui_rating  MaxRate='5'  />
		</field>

		<field Label='Name' >
			<textBox  IsMandatory='true' />
		</field>

		<field Label='Your review'>
			<textArea  IsMandatory='true' />
		</field>

		<ui.basic.button> Gönder
		</ui.basic.button>

	</ui.form>

</ui.segment>

"
                },



                new ExampleInfo
                {
                    Name = "comments",
                    XmlTemplate =
                        @"

<ui_comments>
	<comment AvatarImageUrl='img/AvatarImageSample.jpg'  
             Author='adana'
             MetadataTimeInfo='11 agustos Pazar 5:44 AM'
             Text='uzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggg'
             />
  
  <comment AvatarImageUrl='img/AvatarImageSample.jpg'  
             Author='ahmet'
             MetadataTimeInfo='11 agustos Pazar 5:44 AM'
             Text='uzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggg'
             />
    
   <comment AvatarImageUrl='img/AvatarImageSample.jpg'  
             Author='xyz'
             MetadataTimeInfo='11 agustos Pazar 5:44 AM'
             Text='uzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggguzuncana bir comment br  sdfsdfsdfsgggg'
             />
  
</ui_comments>

"
                },

                new ExampleInfo
                {
                    Name = "Tabs",
                    XmlTemplate =
                        @"







<div Padding='11'>
	<ui_top_attached_tabular_menu>
		<Tab Header ='Header1' AddClass='active'>
  			<div class='ui segment'>
                <ui.header.3> Product description</ui.header.3>
          	    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
            </div>
  		</Tab>  
  
  		<Tab Header ='Header2'> 
  			Write Content here 2
  		</Tab> 
	</ui_top_attached_tabular_menu> 
</div>







"
                },
                new ExampleInfo
                {
                    Name = "Viewverjs",
                    XmlTemplate =
                        @"



<div>
  <ImageGalery>
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
      <img src='img/carousel_1.jpg'  />
  </ImageGalery>
</div>





"
                },
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
                    Name = "DataGrid",
                    XmlTemplate =
                        @"


<ui-container>
    <DataGrid />
</ui-container>

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
}