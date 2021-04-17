/*
  RenameArtboardAsTopObj.jsx for Adobe Illustrator
  Description: The script renames each Artboard by the custom name of the first visible unlocked item on it.
  Date: September, 2018
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

function main() {
    if (!documents.length) {
        alert('Error: \nOpen a document and try again');
        return;
    }
    var doc = app.activeDocument;

    // Create Main Window
    var dialog = new Window('dialog', 'Rename Artboard As Top Obj', undefined);
    dialog.orientation = 'column';
    dialog.alignChild = ['fill', 'fill'];

    // Buttons
    var btns = dialog.add('group');
    btns.alignChild = ['fill', 'fill'];
    btns.orientation = 'row';
    var allBtn = btns.add('button', undefined, 'All');
    var currBtn = btns.add('button', undefined, 'Current', { name: 'ok' });
    currBtn.active = true;

    allBtn.onClick = function() {
        for (var i = 0, len = doc.artboards.length; i < len; i++) {
            doc.artboards.setActiveArtboardIndex(i);
            var currArtboard = doc.artboards[i];
            renameArtboard(currArtboard, doc);
        }
        selection = null;
        dialog.close();
    }

    currBtn.onClick = function() {
        var i = doc.artboards.getActiveArtboardIndex();
        renameArtboard(doc.artboards[i], doc);
        selection = null;
        dialog.close();
    }

    dialog.center();
    dialog.show();
}

function renameArtboard(board, doc) {
    doc.selectObjectsOnActiveArtboard(); // Get all items on current Artboard
    
    if (doc.selection[0] == undefined) return;
    
    var item = doc.selection[0];
    var itemName = '';
    if (item.typename === 'SymbolItem' && item.name == '') {
        itemName = item.symbol.name;
    } else {
        itemName = item.name;
    }

    if (itemName) {
        // var newName = item.name.replace(/\s/g, '-'); // Replace all space symbols in name
        // item.name = newName;
        if (board.name != itemName) board.name = itemName;
    }
}

// Debugging
function showError(err) {
  alert(err + ': on line ' + err.line, 'Script Error', true);
}

try {
  main();
} catch (e) {
  // showError(e);
}