﻿using System.Windows;
using System.Windows.Controls;
using Bridge.CustomUIMarkup.UI;
using Bridge.jQuery2;

namespace Bridge.CustomUIMarkup_DesignerSamples
{


    class AppContainer:HtmlElement
    {
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
        public  AppContainer()
        {
            
            UIBuilder.LoadComponent(this,TestUI);
            HeightPercent = 100;
        }
    }

    public class App
    {
        #region Properties
     
        #endregion

        #region Public Methods
        public static void Init()
        {
            Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.split_js.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.CodeMirror.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.viewerjs.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.Swiper.Elements.RegisterToBuilder();

            jQuery.Ready(RenderUIEditor);
        }
        #endregion

        #region Methods
        
        static void RenderUIEditor()
        {
            var appContainer = new AppContainer
            {
                DataContext = new ExampleDataContext
                {
                    CurrentTemplate = "Write xml code here.",
                    Inner = new ExampleDataContext { CurrentTemplate = "Write xml code here" }
                }
            };

            appContainer.DataContext = new ExampleDataContext
            {
                CurrentTemplate = "Write xml code here.",
                Inner = new ExampleDataContext
                {
                    CurrentTemplate = "Write xml code here"
                }
            };

            appContainer.RenderInBody();
        }
        #endregion
    }
}