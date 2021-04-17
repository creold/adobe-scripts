/*
  GrayscaleToOpacity.jsx for Adobe Illustrator
  Description: Convert selection colors to Grayscale and set identical Opacity value.
  Date: February, 2019
  Author: Sergey Osokin, email: hi@sergosokin.ru

  Donate (optional):
  If you find this script helpful, you can buy me a coffee
  - via PayPal http://www.paypal.me/osokin/usd
  - via QIWI https://qiwi.com/n/OSOKIN​
  - via YooMoney https://yoomoney.ru/to/410011149615582​

  NOTICE:
  Tested with Adobe Illustrator CC 2018-2021 (Mac), 2021 (Win).
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale

  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php

  Check other author's scripts: https://github.com/creold
*/

//@target illustrator

var doc = app.activeDocument;
var selArray = [];

app.executeMenuCommand('Colors7');

getPaths(doc.selection, selArray);

for (var i = 0, selLen = selArray.length; i < selLen; i++) {
  var grayValue = selArray[i].fillColor.gray;
  selArray[i].opacity = grayValue.toFixed(0);
}

// Get paths from selection
function getPaths(item, arr) {
  for (var i = 0, iLen = item.length; i < iLen; i++) {
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