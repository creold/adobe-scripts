/*
  ObjectsCounter.jsx for Adobe Illustrator
  Description: Counts the number of selected objects.
  Date: August, 2020
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
$.localize = true; // Enabling automatic localization

var objCount = 0;
var LANG_NUM = { en: 'Selected objects: ', ru: 'Выделено объектов: '};

getPaths(selection);

alert(LANG_NUM + objCount);

function getPaths(range) {
  for (var i = 0, len = range.length; i < len; i++) {
    try {
      switch (range[i].typename) {
        case 'GroupItem':
          getPaths(range[i].pageItems, objCount);
          break;
        default:
          objCount++;
          break;
      }
    } catch (e) {}
  }
}