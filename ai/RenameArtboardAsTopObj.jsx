/*
  RenameArtboardAsTopObj.jsx for Adobe Illustrator
  Description: The script renames each Artboard by the custom name of the first visible unlocked item on it.
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

    // Create Main Window
    var win = new Window('dialog', 'Rename Artboard As Top Obj', undefined);
    win.orientation = 'column';
    win.alignChild = ['fill', 'fill'];

    // Buttons
    var btns = win.add('group');
    btns.alignChild = ['fill', 'fill'];
    btns.orientation = 'row';
    var allBtn = btns.add('button', undefined, 'All');
    var currBtn = btns.add('button', undefined, 'Current', { name: 'ok' });
    currBtn.active = true;

    allBtn.onClick = function() {
        for (var i = 0; i < doc.artboards.length; i++) {
            doc.artboards.setActiveArtboardIndex(i);
            var currArtboard = doc.artboards[i];
            doc.selectObjectsOnActiveArtboard(); // Get all items on current Artboard
            renameArtboard(currArtboard, doc);
        }
        doc.selection = null;
        win.close();
    }

    currBtn.onClick = function() {
        var i = doc.artboards.getActiveArtboardIndex();
        doc.selectObjectsOnActiveArtboard(); // Get all items on current Artboard
        renameArtboard(doc.artboards[i], doc);
        doc.selection = null;
        win.close();
    }

    win.center();
    win.show();
}

function renameArtboard(board, doc) {
    if (doc.selection[0] == undefined) {
        return;
    }
    var item = doc.selection[0];
    if (item.name) {
        var newName = item.name.replace(/\s/g, '-'); // Replace all space symbols in name
        item.name = newName;
        if (board.name != newName) {
            board.name = newName;
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