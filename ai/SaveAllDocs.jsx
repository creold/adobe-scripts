/*
  SaveAllDocs.jsx for Adobe Illustrator
  Description: Simple script to save all opened docs.
  Date: October, 2018
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

if (app.documents.length > 0) {
  var currDoc = app.activeDocument;
  try {
    for (var i = 0; i < app.documents.length; i++) {
      app.activeDocument = app.documents[i];
      if (!app.activeDocument.saved) {
        app.activeDocument.save();
      }
    }
  } catch (e) { }
  // Activate last used document 
  app.activeDocument = currDoc;
}
