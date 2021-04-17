/*
  SaveAllDocs.jsx for Adobe Illustrator
  Description: Simple script to save all opened docs.
  Date: October, 2018
  Author: Sergey Osokin, email: hi@sergosokin.ru

  Installation: https://github.com/creold/illustrator-scripts#how-to-run-scripts
  
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

if (documents.length > 0) {
  var currDoc = app.activeDocument;
  try {
    for (var i = 0, docLen = documents.length; i < docLen; i++) {
      app.activeDocument = documents[i];
      if (!app.activeDocument.saved) app.activeDocument.save();
    }
  } catch (e) { }
  // Activate last used document 
  app.activeDocument = currDoc;
}
