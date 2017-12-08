﻿using System;
using System.Windows;
using Bridge.CustomUIMarkup.Libraries.SemanticUI;
using Bridge.CustomUIMarkup.Tokenizers;

namespace Bridge.CustomUIMarkup.Test
{
    public class App
    {
        #region Public Methods
        public static void Main()
        {
            Bridge.CustomUIMarkup.Libraries.SemanticUI.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.split_js.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.CodeMirror.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.viewerjs.Elements.RegisterToBuilder();
            Bridge.CustomUIMarkup.Libraries.Swiper.Elements.RegisterToBuilder();


            ContentControlTest.RunAll();
            BuilderTest.RunAll();

            TokenizerTest.Run();
            BindingInfoTest.RunAll();
            
            HTMLBindingInfoTest.RunAll();
            InputTextTest.RunAll();

            TabItemTest.RunAll();

            ItemsControlTests.RunAll();

            Console.WriteLine("Success");
        }
        #endregion
    }
}