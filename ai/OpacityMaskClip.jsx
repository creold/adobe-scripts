/*
  OpacityMaskClip.jsx for Adobe Illustrator
  Description: The script activates the 'Clip' checkbox in Transparency > Opacity Mask.
  Date: April, 2019
  Author: Sergey Osokin, email: hi@sergosokin.ru

  Installation: https://github.com/creold/illustrator-scripts#how-to-run-scripts

  Versions:
  0.1 Initial version
  0.2 To improve performance, the script only works with selected objects;
      Added progress bar
  
  Donate (optional): If you find this script helpful, you can buy me a coffee
                     via PayPal http://www.paypal.me/osokin/usd

  NOTICE:
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.
  
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  
  Check other author's scripts: https://github.com/creold
*/

//@target illustrator
$.localize = true; // Enabling automatic localization

var SCRIPT_NAME = 'OpacityMaskClip',
    SCRIPT_VERSION = '0.2',
    AI_VER = parseInt(app.version),
    ACTION_SET = 'OpacityMask',
    ACTION_NAME = 'ActivateClip',
    ACTION_PATH = Folder.myDocuments + '/Adobe Scripts/',
    LANG_ERR_DOC = { en: 'Error\nOpen a document and try again.',
                    ru: 'Ошибка\nОткройте документ и запустите скрипт.'},
    LANG_ERR_VER = { en: 'Error\nSorry, script only works in Illustrator CS6 and later.',
                    ru: 'Ошибка\nСкрипт работает в Illustrator CS6 и выше.'},
    LANG_ERR_SEL = { en: 'Error\nPlease select at least 1 object and try again.',
                    ru: 'Ошибка\nВыберите хотя бы один объект и запустите скрипт.'},
    LANG_STATUS_TITLE = { en: 'Preparing objects', ru: 'Подготовка объектов'},
    PERCENTAGE = '%',
    OVER_ITEMS = 10; // When the amount of selected items, full-screen mode is enabled;

function main() {
  if (app.documents.length == 0) {
    alert(LANG_ERR_DOC);
    return;
  }

  if (AI_VER < 16) {
    alert(LANG_ERR_VER);
    return;
  }

  if (!selection.length || selection.typename === 'TextRange') {
    alert(LANG_ERR_SEL);
    return;
  }

  var doc = app.activeDocument,
      userScreen = doc.views[0].screenMode,
      selItems = [];

  if (!Folder(ACTION_PATH).exists) Folder(ACTION_PATH).create();

  // Generate action
  var actionStr =  [
      '/version 3',
      '/name [' + ACTION_SET.length,
          ascii2Hex(ACTION_SET),
      ']',
      '/isOpen 1',
      '/actionCount 1',
      '/action-1 {',
          '/name [' + ACTION_NAME.length,
              ascii2Hex(ACTION_NAME),
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

  createAction(actionStr, ACTION_SET);
   
  getItems(selection, selItems);
  
  selection = null;

  if (selItems.length > OVER_ITEMS) {
    doc.views[0].screenMode = ScreenMode.FULLSCREEN;
  }

  // Create progress bar
  var progMinValue = 0,
      progMaxValue = 100;
  var win = new Window('palette', SCRIPT_NAME + ' ' + SCRIPT_VERSION);
      win.opacity = .9;
  var progPnl = win.add('panel', undefined, LANG_STATUS_TITLE);
      progPnl.margins = [10, 20, 10, 10];
      win.alignChildren = ['fill','center'];
  var progBar = progPnl.add('progressbar', [20, 15, 300, 25], progMinValue, progMaxValue);
  var progLabel = progPnl.add('statictext', undefined, progMinValue + PERCENTAGE);
      progLabel.preferredSize.width = 35;

  win.center();
  win.show();
  
  for (var i = 0; i < selItems.length; i++) {
    activateClip(selItems[i]);

    // Update Progress bar
    progBar.value = parseInt((i / selItems.length) * 100);
    progLabel.text = progBar.value + PERCENTAGE;
    win.update();
  }

  app.unloadAction(ACTION_SET, '');
  doc.views[0].screenMode = userScreen;

  // The final progress bar value
  progBar.value = progMaxValue;
  progLabel.text = progBar.value + PERCENTAGE;
  win.update();
  win.close();
}

// Load Action to Adobe Illustrator
function createAction(str, set) {
  var f = new File('' + ACTION_PATH + '/' + set + '.aia');
  f.open('w');
  f.write(str);
  f.close();
  app.loadAction(f);
  f.remove();
}

function ascii2Hex(hex) {
  return hex.replace(/./g, function (a) { return a.charCodeAt(0).toString(16) });
}

function getItems(items, arr) {
  for (var i = 0; i < items.length; i++) {
    var currItem = items[i];
    try {
      switch (currItem.typename) {
        case 'GroupItem':
          arr.push(currItem);
          getItems(currItem.pageItems, arr);
          break;
        default:
          arr.push(currItem);
          break;
      }
    } catch (e) {}
  }
}

function activateClip(item) {
  try {
    item.selected = true;
    app.doScript(ACTION_NAME, ACTION_SET);
    selection = null;
    app.redraw();
  } catch (e) {}
}

function showError(err) {
  alert(err + ': on line ' + err.line, 'Script Error', true);
}

// Run script
try {
  main();
} catch (e) {
  // showError(e);
}
