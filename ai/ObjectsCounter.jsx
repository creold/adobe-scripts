/*
  ObjectsCounter.jsx for Adobe Illustrator
  Description: Counts the number of selected objects.
  Date: August, 2020
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
$.localize = true; // Enabling automatic localization

var objCount = 0;
var LANG_NUM = { en: 'Selected objects: ', ru: 'Выделено объектов: '};

getPaths(selection);

alert(LANG_NUM + objCount);

function getPaths(range) {
  for (var i = 0; i < range.length; i++) {
    var currItem = range[i];
    try {
      switch (currItem.typename) {
        case 'GroupItem':
          getPaths(currItem.pageItems, objCount);
          break;
        default:
          objCount++;
          break;
      }
    } catch (e) {}
  }
}