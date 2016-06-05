// Copyright 2010-2016 i-designer.net.  All rights reserved.
// This script will generator file with guide for bootstrap
// Written by Nguyen Nhu Tuan
// Created at: 2015-05-06
// Updated at: 2015-05-06
// Email: tuanquynh0508@gmail.com
// Using function guideLine and clearGuides of Patrick. Thanks Patrick !. Ref: http://www.ps-scripts.com/bb/viewtopic.php?t=1775&highlight=&sid=9980aca4225b16adf2b0543df74aa975
// Using function StrToIntWithDefault of Adobe Systems. Thanks Adobe Systems !.

/*
@@@BUILDINFO@@@ BoostrapGridGenerator.jsx 1.0.0
*/

/*

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/BoostrapGridGenerator/Menu=Bootstrap Grid Generator...</name>
<about>$$$/JavaScripts/BoostrapGridGenerator/About=Bootstrap Grid Generator ^r^rCopyright 2010-2016 i-designer.net. All rights reserved.^r^rGenerator Grid For Bootstrap</about>
<category>aaaThisPutsMeAtTheTopOfTheMenu</category>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

*/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

//=================================================================
// Globals
//=================================================================

// UI strings to be localized
//Label
var strTextCopyrightTNQSoft = localize("$$$/JavaScripts/BoostrapGridGenerator/TextCopyrightTNQSoft=(c) 2010-2016. i-designer.net");
var strTitle = localize("$$$/JavaScripts/BoostrapGridGenerator/Title=Bootstrap Grid Generator");
var strButtonRun = localize("$$$/JavaScripts/BoostrapGridGenerator/Run=Create");
var strButtonCancel = localize("$$$/JavaScripts/BoostrapGridGenerator/Cancel=Cancel");
var strLabelContainerWidth = localize("$$$/JavaScripts/BoostrapGridGenerator/ContainerWidth=Container width(px):");
var strLabelColPadding = localize("$$$/JavaScripts/BoostrapGridGenerator/ColPadding=Column padding(px):");
var strLabelTotalHeight = localize("$$$/JavaScripts/BoostrapGridGenerator/TotalHeight=Total height(Not less than 200px):");
var strLabelDocumentType = localize("$$$/JavaScripts/BoostrapGridGenerator/DocumentType=Background Contents:");
//Default value
var	stretContainerWidth = localize( "$$$/locale_specific/JavaScripts/BoostrapGridGenerator/ETContainerWidthLength=1170" );
var	stretColPadding = localize( "$$$/locale_specific/JavaScripts/BoostrapGridGenerator/ETColPaddingLength=15" );
var	stretTotalHeight = localize( "$$$/locale_specific/JavaScripts/BoostrapGridGenerator/ETTotalHeightLength=2000" );
var	strddDocumentType = localize( "$$$/locale_specific/JavaScripts/BoostrapGridGenerator/DDDocumentType=100" );
//Alert
var strAlertSpecifyContainerWidth = localize("$$$/JavaScripts/BoostrapGridGenerator/SpecifyContainerWidth=Please specify Container width.");
var strAlertNotNullContainerWidth = localize("$$$/JavaScripts/BoostrapGridGenerator/NotNullContainerWidth=Value of Container width is not equal zero.");
var strAlertSpecifyColPadding = localize("$$$/JavaScripts/BoostrapGridGenerator/SpecifyColPadding=Please specify Column padding left and right.");
var strAlertNotNullColPadding = localize("$$$/JavaScripts/BoostrapGridGenerator/NotNullColPadding=Value of Column padding is not equal zero.");
var strAlertSpecifyTotalHeight = localize("$$$/JavaScripts/BoostrapGridGenerator/SpecifyTotalHeight=Total height value not less than 200.");

// ok and cancel button
var runButtonID = 1;
var cancelButtonID = 2;

var documentWith = 1600;
var totalColumn = 12; //Total column of bootstrap grid system
var primaryVerticalSpace = 10;
var whiteIndex = 0;
var backgroundColorIndex = 1;
var transparentIndex = 2;

///////////////////////////////////////////////////////////////////////////////
// Dispatch
///////////////////////////////////////////////////////////////////////////////


main();



///////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// Function: main
// Usage: the core routine for this script
// Input: <none>
// Return: <none>
///////////////////////////////////////////////////////////////////////////////
function main() {
    
    var generatorObj = new Object();    
    initGeneratorObj(generatorObj);
     	    
    if ( DialogModes.ALL == app.playbackDisplayDialogs ) {
    	if (cancelButtonID == settingDialog(generatorObj)) {
	    	return 'cancel'; // quit, returning 'cancel' (dont localize) makes the actions palette not record our script
	    }
	}
	
	gridGeneratorTemplate(generatorObj);
    
}


///////////////////////////////////////////////////////////////////////////////
// Function: settingDialog
// Usage: pop the ui and get user settings
// Input: generatorObj object containing our parameters
// Return: on ok, the dialog info is set to the generatorObj object
///////////////////////////////////////////////////////////////////////////////
function settingDialog(generatorObj)
{
    dlgMain = new Window("dialog", strTitle);
    
    // match our dialog background color to the host application
	//var brush = dlgMain.graphics.newBrush(dlgMain.graphics.BrushType.THEME_COLOR, "appDialogBackground");
    //dlgMain.graphics.backgroundColor = brush;
    //dlgMain.graphics.disabledBackgroundColor = brush;

	dlgMain.orientation = 'column';
	dlgMain.alignChildren = 'left';	

	// -- two groups, one for left and one for right ok, cancel
	dlgMain.grpTop = dlgMain.add("group");
	dlgMain.grpTop.orientation = 'column';
	dlgMain.grpTop.alignChildren = 'left';
	dlgMain.grpTop.alignment = 'fill';
	
	// -- two groups, one for left and one for right ok, cancel
	dlgMain.grpButton = dlgMain.add("group");
	dlgMain.grpButton.orientation = 'row';
	dlgMain.grpButton.alignChildren = 'center';
	dlgMain.grpButton.alignment = 'fill';
	
	dlgMain.pnlCreateOption = dlgMain.add("panel", undefined, "Options");
	dlgMain.pnlCreateOption.alignChildren = 'left';
	dlgMain.pnlCreateOption.alignment = 'fill';
	
	dlgMain.grpBottom = dlgMain.add("group");
	dlgMain.grpBottom.orientation = 'column';
	dlgMain.grpBottom.alignChildren = 'center';
	dlgMain.grpBottom.alignment = 'fill';		

	// -- the third line in the dialog
    dlgMain.grpTop.add("statictext", undefined, strLabelContainerWidth);
	// -- the fourth line in the dialog
    dlgMain.etContainerWidth = dlgMain.grpTop.add("edittext", undefined, generatorObj.containerWidth.toString());
    dlgMain.etContainerWidth.alignment = 'fill';
    dlgMain.etContainerWidth.preferredSize.width = StrToIntWithDefault( strLabelContainerWidth, 160 );
	
	// -- the third line in the dialog
    dlgMain.grpTop.add("statictext", undefined, strLabelColPadding);
	// -- the fourth line in the dialog
    dlgMain.etColPadding = dlgMain.grpTop.add("edittext", undefined, generatorObj.colPadding.toString());
    dlgMain.etColPadding.alignment = 'fill';
    dlgMain.etColPadding.preferredSize.width = StrToIntWithDefault( strLabelColPadding, 160 );
	
	// -- the fourth line in the dialog
    dlgMain.etHorizontalGuides = dlgMain.pnlCreateOption.add("checkbox", undefined, 'Horizontal Guides');
	
	// -- the third line in the dialog
    dlgMain.pnlCreateOption.add("statictext", undefined, strLabelTotalHeight);
	// -- the fourth line in the dialog
    dlgMain.etTotalHeight = dlgMain.pnlCreateOption.add("edittext", undefined, generatorObj.totalHeight.toString());
    dlgMain.etTotalHeight.alignment = 'fill';
    dlgMain.etTotalHeight.preferredSize.width = StrToIntWithDefault( strLabelTotalHeight, 160 );
	
	// -- the third line in the dialog	
    dlgMain.pnlCreateOption.add("statictext", undefined, strLabelDocumentType);
	dlgMain.ddDocumentType = dlgMain.pnlCreateOption.add("dropdownlist", undefined);
    dlgMain.ddDocumentType.preferredSize.width = StrToIntWithDefault( strddDocumentType, 100 );
    dlgMain.ddDocumentType.alignment = 'left';
    dlgMain.ddDocumentType.add("item", "White");
    dlgMain.ddDocumentType.add("item", "Black");
    dlgMain.ddDocumentType.add("item", "Transparent");
	dlgMain.ddDocumentType.items[generatorObj.documentType].selected = true;

	dlgMain.btnRun = dlgMain.grpButton.add("button", undefined, strButtonRun );
    dlgMain.btnRun.onClick = function() {
		var containerWidth = dlgMain.etContainerWidth.text;
		if (containerWidth.length == 0) {
	        alert(strAlertSpecifyContainerWidth);
			return;
		}
		if (Math.abs(parseInt(containerWidth, 10)) == 0) {
	        alert(strAlertNotNullContainerWidth);
			return;
		}
		
		var colPadding = dlgMain.etColPadding.text;
		if (colPadding.length == 0) {
	        alert(strAlertSpecifyColPadding);
			return;
		}
		if (Math.abs(parseInt(colPadding, 10)) == 0) {
	        alert(strAlertNotNullColPadding);
			return;
		}
		
		var totalHeight = dlgMain.etTotalHeight.text;		
		if (Math.abs(parseInt(totalHeight, 10)) < 200) {
	        alert(strAlertSpecifyTotalHeight);
			return;
		}
		
		dlgMain.close(runButtonID);
	}

	dlgMain.btnCancel = dlgMain.grpButton.add("button", undefined, strButtonCancel );
    dlgMain.btnCancel.onClick = function() { 
		dlgMain.close(cancelButtonID); 
	}
	
	dlgMain.grpBottom.add("statictext", undefined, strTextCopyrightTNQSoft);
	
	dlgMain.defaultElement = dlgMain.btnRun;
	dlgMain.cancelElement = dlgMain.btnCancel;
    
	app.bringToFront();
	
	dlgMain.center();
    var result = dlgMain.show();
    
    if (cancelButtonID == result) {
		return result;  // close to quit
	}
    
    // get setting from dialog
    generatorObj.containerWidth = Math.abs(parseInt(dlgMain.etContainerWidth.text, 10));
	generatorObj.colPadding = Math.abs(parseInt(dlgMain.etColPadding.text, 10));
	generatorObj.horizontalGuides = dlgMain.etHorizontalGuides.value;
	generatorObj.totalHeight = Math.abs(parseInt(dlgMain.etTotalHeight.text, 10));
	generatorObj.documentType = dlgMain.ddDocumentType.selection.index;

    return result;
}

///////////////////////////////////////////////////////////////////////////////
// Function: initGeneratorObj
// Usage: create our default parameters
// Input: a new Object
// Return: a new object with params set to default
///////////////////////////////////////////////////////////////////////////////
function initGeneratorObj(generatorObj)
{
    generatorObj.containerWidth = parseInt(stretContainerWidth, 10);
	generatorObj.colPadding = parseInt(stretColPadding, 10);
	generatorObj.totalHeight = parseInt(stretTotalHeight, 10);
	generatorObj.horizontalGuides = false;
	generatorObj.documentType = whiteIndex;
}

///////////////////////////////////////////////////////////////////////////////
// Function: gridGeneratorTemplate
// Usage: create our default parameters
// Input: a new Object
// Return: a new object with params set to default
///////////////////////////////////////////////////////////////////////////////
function gridGeneratorTemplate(generatorObj)
{
	var p = generatorObj.colPadding;
	var w1 = generatorObj.containerWidth;
	var c = totalColumn;
	var h = generatorObj.totalHeight;
	var dt = generatorObj.documentType;
	var w_grid = (w1-c*p*2)/c;
	var documentPadding = (documentWith-w1)/2;
	
	if ( ( h == 0 ) || ( !h) ) h=Math.abs(parseInt(stretTotalHeight, 10));
	
	var strtRulerUnits = app.preferences.rulerUnits;
	var strtTypeUnits = app.preferences.typeUnits;
	app.preferences.rulerUnits = Units.PIXELS;
	app.preferences.typeUnits = TypeUnits.POINTS;

	if ( dt == whiteIndex ) {
		var newDocumentRef = app.documents.add(documentWith, h, 72.0, "Grid Template " + w1 + "-" + c + "-" + p, NewDocumentMode.RGB,DocumentFill.WHITE);
	}
	if ( dt == backgroundColorIndex ) {
		var newDocumentRef = app.documents.add(documentWith, h, 72.0, "Grid Template " + w1 + "-" + c + "-" + p, NewDocumentMode.RGB,DocumentFill.BACKGROUNDCOLOR);
	}
	if ( dt == transparentIndex ) {
		var newDocumentRef = app.documents.add(documentWith, h, 72.0, "Grid Template " + w1 + "-" + c + "-" + p, NewDocumentMode.RGB,DocumentFill.TRANSPARENT);
	}

	//Add text
	var textColor = new SolidColor;
	textColor.rgb.red = 0;
	textColor.rgb.green = 0;
	textColor.rgb.blue = 0;

	var newTextLayer = newDocumentRef.artLayers.add();
	newTextLayer.kind = LayerKind.TEXT;	
	newTextLayer.textItem.justification = Justification.CENTERJUSTIFIED;
	newTextLayer.textItem.size = 12;
	newTextLayer.textItem.font = "Arial";
	newTextLayer.textItem.color = textColor;
	newTextLayer.textItem.antiAliasMethod = AntiAlias.NONE;
	newTextLayer.textItem.contents = "Container width: " + w1 + ", Columns: " + c + ", Column padding lef and right: " + p + ". Generator By Gridgenerator: " + strTextCopyrightTNQSoft;
	//Now change the text layer type to paragraph so you can determine the width of the text
	newTextLayer.textItem.kind = TextType.PARAGRAPHTEXT;
	newTextLayer.textItem.width = w1;
	newTextLayer.textItem.position = Array(documentPadding,20);
	
	app.preferences.rulerUnits = strtRulerUnits;
	app.preferences.typeUnits = strtTypeUnits;
	newDocumentRef = null;
	textColor = null;
	newTextLayer = null;	
	
	//Add guide
	guideLine(documentPadding, 'Vrtc');
	guideLine(documentPadding+p, 'Vrtc');
	var j = documentPadding+p;
	for(i=1;i<=c;i++)
	{		
		j += w_grid;
		guideLine(j, 'Vrtc');
		if(i < c) {
			j += p*2;			
		} else {
			j += p;
		}
		guideLine(j, 'Vrtc');
	}	
	
	if(true === generatorObj.horizontalGuides) {
		j = 50;
		for(i=0;i<((h-100)/primaryVerticalSpace);i++)
		{
			j += primaryVerticalSpace;
			guideLine(j, 'Hrzn');
		}
	}

}

///////////////////////////////////////////////////////////////////////////
// Function: guideLine
// Usage: make guideline
// Input:  number and string
// Return: void
///////////////////////////////////////////////////////////////////////////
function guideLine(position, type) {
   // types: Vrtc & Hrzn
   // =======================================================
   var id296 = charIDToTypeID( "Mk  " );
       var desc50 = new ActionDescriptor();
       var id297 = charIDToTypeID( "Nw  " );
           var desc51 = new ActionDescriptor();
           var id298 = charIDToTypeID( "Pstn" );
           var id299 = charIDToTypeID( "#Pxl" );
           desc51.putUnitDouble( id298, id299, position );
           var id300 = charIDToTypeID( "Ornt" );
           var id301 = charIDToTypeID( "Ornt" );
           var id302 = charIDToTypeID( type );
         desc51.putEnumerated( id300, id301, id302 );
          var id303 = charIDToTypeID( "Gd  " );
       desc50.putObject( id297, id303, desc51 );
   executeAction( id296, desc50, DialogModes.NO );
};

///////////////////////////////////////////////////////////////////////////////
// Function: clearGuides
// Usage: clear all guidelines
// Input: 
// Return: void
///////////////////////////////////////////////////////////////////////////////
function clearGuides() {
   // =======================================================
   var id556 = charIDToTypeID( "Dlt " );
       var desc102 = new ActionDescriptor();
       var id557 = charIDToTypeID( "null" );
           var ref70 = new ActionReference();
           var id558 = charIDToTypeID( "Gd  " );
           var id559 = charIDToTypeID( "Ordn" );
           var id560 = charIDToTypeID( "Al  " );
           ref70.putEnumerated( id558, id559, id560 );
       desc102.putReference( id557, ref70 );
   executeAction( id556, desc102, DialogModes.NO );
};

///////////////////////////////////////////////////////////////////////////
// Function: StrToIntWithDefault
// Usage: convert a string to a number, first stripping all characters
// Input: string and a default number
// Return: a number
///////////////////////////////////////////////////////////////////////////
function StrToIntWithDefault( s, n ) {
    var onlyNumbers = /[^0-9]/g;
    var t = s.replace( onlyNumbers, "" );
	t = parseInt( t , 10);
	if ( ! isNaN( t ) ) {
        n = t;
    }
    return n;
}

// End Layer Comps To Files.jsx
