{
	"GlobalKeys":
	{
		"$(SolutionDir)":"D:\\github\\Bridge.CustomUIMarkup\\"
	},
	"Tasks":
	[			
		{
			"FullClassName": "WhiteStone.Tasks.CombineFilesIntoJsFile",
			"Keys":
			{	
				"ClearXml" : true,
				"Source" : "$(SolutionDir)Src\\Libraries\\*.xml",
				"Target" : "$(SolutionDir)\\bin\\js\\Bridge.CustomUIMarkup.Resources.XmlFileContents.js",
				"JsObjectPath" : "Bridge.CustomUIMarkup.Resources.$XmlFileContents"
			}
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyFile",
			"Keys":
			{	
				"Source" : "$(SolutionDir)Src\\bin\\Debug\\bridge\\jquery-2.2.4.js",
				"Target" : "$(SolutionDir)bin\\js\\jquery-2.2.4.js"
			}
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyFile",
			"Keys":
			{	
				"Source" : "$(SolutionDir)Src\\bin\\Debug\\bridge\\bridge.js",
				"Target" : "$(SolutionDir)bin\\js\\bridge.js"
			}
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyFile",
			"Keys":
			{	
				"Source" : "$(SolutionDir)Src\\bin\\Debug\\bridge\\bridge.console.js",
				"Target" : "$(SolutionDir)bin\\js\\bridge.console.js"
			}
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyFile",
			"Keys":
			{	
				"Source" : "$(SolutionDir)Src\\bin\\Debug\\bridge\\Bridge.CustomUIMarkup.js",
				"Target" : "$(SolutionDir)bin\\js\\Bridge.CustomUIMarkup.js"
			}
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyFile",
			"Keys":
			{	
				"Source" : "$(SolutionDir)Src\\bin\\Debug\\bridge\\Bridge.CustomUIMarkup.meta.js",
				"Target" : "$(SolutionDir)bin\\js\\Bridge.CustomUIMarkup.meta.js"
			}
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyFile",
			"Keys":
			{	
				"Source" : "$(SolutionDir)Src\\bin\\Debug\\bridge\\bridge.meta.js",
				"Target" : "$(SolutionDir)bin\\js\\bridge.meta.js"
			}
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyDirectory",
			"Keys":
			{
				"Source" : "$(SolutionDir)Src\\Lib\\",
				"Target" : "$(SolutionDir)bin\\Lib\\"
			}			
		}
		,
		{
			"FullClassName": "WhiteStone.Tasks.CopyFile",
			"Keys":
			{	
				"Source" : "$(SolutionDir)Src\\bin\\Debug\\Bridge.CustomUIMarkup.dll",
				"Target" : "$(SolutionDir)bin\\Bridge.CustomUIMarkup.dll"
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	]
}