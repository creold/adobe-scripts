/*
  RenameArtboardAsSize.jsx for Adobe Illustrator
  Description: The script names the artboard by its size in pixels.
  Date: September, 2018
  Author: Sergey Osokin, email: hi@sergosokin.ru
  ============================================================================
  Donate (optional): If you find this script helpful and want to support me 
  by shouting me a cup of coffee, you can by via PayPal http://www.paypal.me/osokin/usd
  ============================================================================
  NOTICE:
  This script is provided "as is" without warranty of any kind.
  ============================================================================
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  ============================================================================
  Check other author's scripts: https://github.com/creold
*/

//@target illustrator

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
    width = currArtboard.artboardRect[2]-currArtboard.artboardRect[0];
    height = currArtboard.artboardRect[1]-currArtboard.artboardRect[3];
    currArtboard.name = Math.round(width) + 'x' + Math.round(height);
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