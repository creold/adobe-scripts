/*
  OpacityMaskClip.jsx for Adobe Illustrator
  Description: The script activates the 'Clip' checkbox in Transparency > Opacity Mask.
  Date: April, 2019
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

// Global variables
if (app.documents.length > 0) {
    var doc = app.activeDocument;
}

// Generate Action
var setName = 'OpacityMask',
    actionName = 'ActivateClip',
    actionPath = Folder.myDocuments + '/Adobe Scripts/';

if (!Folder(actionPath).exists) Folder(actionPath).create();

var actionStr =  [
    '/version 3',
    '/name [' + setName.length,
        ascii2Hex(setName),
    ']',
    '/isOpen 1',
    '/actionCount 1',
    '/action-1 {',
        '/name [' + actionName.length,
            ascii2Hex(actionName),
        ']',
        '/keyIndex 0',
        '/colorIndex 0',
        '/isOpen 1',
        '/eventCount 1',
        '/event-1 {',
            '/useRulersIn1stQuadrant 0',
            '/internalName (ai_plugin_transparency)',
            '/localizedName [ 12',
            '    5472616e73706172656e6379',
            ']',
            '/isOpen 1',
            '/isOn 1',
            '/hasDialog 0',
            '/parameterCount 1',
            '/parameter-1 {',
                '/key 1668049264',
                '/showInPalette 4294967295',
                '/type (boolean)',
                '/value 1',
            '}',
        '}',
    '}'].join('\n');

function main() {
    var allItems = doc.pageItems;

    createAction(actionStr, setName);
    deselect();

    for (var i = 0; i < allItems.length; i++) {
        var currItem = allItems[i];
        makeClip(currItem);
    }
    app.unloadAction(setName, '');
}

function makeClip(item) {
    try {
        if (item.typename === 'GroupItem') {
            for (var j = 0; j < item.pageItems.length; j++) {
                makeClip(item[j]);
            }
        } else {
            item.selected = true;
            app.doScript(actionName, setName);
        }
    } catch (e) { }
    deselect();
    app.redraw();
}

function deselect() {
    doc.selection = null;
}

// Load Action to Adobe Illustrator
function createAction(str, set) {
    var f = new File('' + actionPath + '/' + set + '.aia');
    f.open('w');
    f.write(str);
    f.close();
    app.loadAction(f);
    f.remove();
}

function ascii2Hex(hex) {
    return hex.replace(/./g, function (a) { return a.charCodeAt(0).toString(16) });
}

// Run script
try {
    if (app.documents.length > 0) {
        main();
    } else {
        alert('There are no documents open.');
    }
} catch (e) { }