using System.Diagnostics.CodeAnalysis;
using Bridge;

namespace System.Windows
{
    public class Clipboard
    {
        #region Public Methods
        [SuppressMessage("ReSharper", "UnusedParameter.Global")]
        public static void SetText(string text)
        {
            Script.Write(
                         @"

//////////////////////////////////////////////////////////////////////////////////////////////////////
if (window.clipboardData && window.clipboardData.setData) 
{
	// IE specific code path to prevent textarea being shown while dialog is visible.
	return clipboardData.setData('Text', text); 

} 
else if (document.queryCommandSupported && document.queryCommandSupported('copy')) 
{
	var textarea = document.createElement('textarea');
	textarea.textContent = text;
	textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
	document.body.appendChild(textarea);
	textarea.select();

	try 
	{
		return document.execCommand('copy');  // Security exception may be thrown by some browsers.
	}
	catch (ex) 
	{
		alert(ex);
	}
	finally 
	{
		document.body.removeChild(textarea);
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

");
        }
        #endregion
    }
}