/*
  RenameArtboardAsSize.jsx for Adobe Illustrator
  Description: The script fills in the name of artboard its size
  Date: September, 2018
  Author: Sergey Osokin, email: hi@sergosokin.ru
  ==========================================================================================
  Installation:
  1. Place script in:
     Win (32 bit): C:\Program Files (x86)\Adobe\Adobe Illustrator [vers.]\Presets\en_GB\Scripts\
     Win (64 bit): C:\Program Files\Adobe\Adobe Illustrator [vers.] (64 Bit)\Presets\en_GB\Scripts\
     Mac OS: <hard drive>/Applications/Adobe Illustrator [vers.]/Presets.localized/en_GB/Scripts
  2. Restart Illustrator
  3. Choose File > Scripts > RenameArtboardAsSize
  ============================================================================
  Donate (optional): If you find this script helpful and want to support me 
  by shouting me a cup of coffee, you can by via PayPal http://www.paypal.me/osokin/usd
  ==========================================================================================
  NOTICE:
  Tested with Adobe Illustrator CC 2017-2019 (Mac).
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.
  ==========================================================================================
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  ==========================================================================================
  Check other author's scripts: https://github.com/creold
*/

//@target illustrator

// Global variables
var SAVE_NAME = true,
    SPLIT = '_';



function main() {
  if (app.documents.length == 0) {
    alert('Error: \nOpen a document and try again.');
    return;
  }

  var doc = app.activeDocument;
  var width, height;

  for (var i = 0; i < doc.artboards.length; i++) {
    doc.artboards.setActiveArtboardIndex(i);
    var currArtboard = doc.artboards[i];
    width = currArtboard.artboardRect[2] - currArtboard.artboardRect[0];
    height = currArtboard.artboardRect[1] - currArtboard.artboardRect[3];

    if (SAVE_NAME) {
      currArtboard.name += SPLIT + Math.round(width) + 'x' + Math.round(height);
    } else {
      currArtboard.name = Math.round(width) + 'x' + Math.round(height);
    }

  }
}

function showError(err) {
  if (confirm(scriptName + ': an unknown error has occurred.\n' +
      'Would you like to see more information?', true, 'Unknown Error')) {
    alert(err + ': on line ' + err.line, 'Script Error', true);
  }
}

try {
  main();
} catch (e) {
  // showError(e);
}