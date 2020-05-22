/*
  GrayscaleToOpacity.jsx for Adobe Illustrator
  Description: Convert selection colors to Grayscale and set identical Opacity value.
  Date: February, 2019
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

var doc = app.activeDocument;
var selArray = [];

app.executeMenuCommand('Colors7');

getPaths(doc.selection, selArray);

for (var i = 0; i < selArray.length; i++) {
  var grayValue = selArray[i].fillColor.gray;
  selArray[i].opacity = grayValue.toFixed(0);
}

// Get paths from selection
function getPaths(item, arr) {
  for (var i = 0; i < item.length; i++) {
    var currItem = item[i];
    try {
      switch (currItem.typename) {
        case 'GroupItem':
          getPaths(currItem.pageItems, arr);
          break;
        case 'PathItem':
          arr.push(currItem);
          break;
        case 'CompoundPathItem':
          getPaths(currItem.pathItems, arr);
          break;
        default:
          currItem.selected = false;
          break;
      }
    } catch (e) {}
  }
}