/*
  exportToDXF.jsx for Adobe Illustrator
  Description: Export all artboards or selection to separately DXF
  Date: May, 2021
  Author: Sergey Osokin, email: hi@sergosokin.ru

  Installation: https://github.com/creold/illustrator-scripts#how-to-run-scripts

  Versions:
   0.1 Initial version

  Donate (optional):
  If you find this script helpful, you can buy me a coffee
  - via YooMoney https://yoomoney.ru/to/410011149615582​
  - via QIWI https://qiwi.com/n/OSOKIN​
  - via Donatty https://donatty.com/sergosokin
  - via PayPal http://www.paypal.me/osokin/usd

  NOTICE:
  Tested with Adobe Illustrator CC 2018-2021 (Mac), 2021 (Win).
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.

  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php

  Check other author's scripts: https://github.com/creold
*/

//@target illustrator
$.localize = true; // Enabling automatic localization

var SCRIPT = {
      name: 'Export To DXF',
      version: 'v.0.1'
    },
    LANG = {
      errDoc: { en: 'Error\nOpen a document and try again',
                ru: 'Ошибка\nОткройте документ и запустите скрипт' },
      errFolder: { en: "Error\nThis folder doesn't exist",
                ru: 'Ошибка\nТакой папки не существует' },
      errPrefix: { en: 'Error\nPlease enter file name prefix',
                ru: 'Ошибка\nВведите префикс имени' },
      folder: { en: 'Output folder', ru: 'Папка назначения' },
      select: { en: 'Select', ru: 'Выбрать' },
      selectTitle: { en: 'Select a folder to export', 
                      ru: 'Выберите папку для экспорта' },
      prefix: { en: 'File name prefix', ru: 'Префикс имен файлов' },
      separator: { en: 'Separator', ru: 'Разделитель' },
      placeholder: { en: 'all artboards', ru: 'все артборды' },
      abs: { en: 'Artboards', ru: 'Артборды' },
      totalSel: { en: 'Selection', ru: 'Все выделение' },
      eachSel: { en: 'Each selection', ru: 'По отдельности' },
      absRange: { en: 'Artboards range', ru: 'Диапазон артбордов' },
      wait: { en: 'Waiting...', ru: 'Ожидайте...' },
      cancel: { en: 'Cancel', ru: 'Отмена' },
      ok: { en: 'Export', ru: 'Экспортировать' }
    };

var DEF_RB = 1, // Default export: 1 - Artboards, 2 - Selection, 3 - Each selection
    ABS_RANGE_PH = '1, 2-4',
    ALL_ABS_PH = '%all',
    UI_MARGINS = [10, 15, 10, 10],
    DLG_OPACITY = .97; // UI window opacity. Range 0-1

// Main function
function main() {
  if (!documents.length) {
    alert(LANG.errDoc);
    return;
  }

  // Default variables for dialog box
  var doc = app.activeDocument,
      fileName = getDocName(doc),
      exportOptions = getOptions(),
      separator = '-',
      outFolder = (doc.path != '') ? doc.path : Folder.desktop;

  // Create dialog box
  var dialog = new Window('dialog', SCRIPT.name + ' ' + SCRIPT.version);
      dialog.alignChildren = ['fill', 'fill'];
      dialog.opacity = DLG_OPACITY;

  var outPnl = dialog.add('panel', undefined, LANG.folder);
      outPnl.orientation = 'row';
      outPnl.margins = UI_MARGINS;
  var btnOutFolder = outPnl.add('button', undefined, LANG.select);
  var lblOutFolder = outPnl.add('edittext', undefined);
      lblOutFolder.text = decodeURI(outFolder);
      lblOutFolder.characters = 22;

  var fileNameGrp = dialog.add('group');
  var namePnl = fileNameGrp.add('panel', undefined, LANG.prefix);
      namePnl.orientation = 'row';
      namePnl.margins = UI_MARGINS;
  var namePrefix = namePnl.add('edittext', undefined, fileName);
      namePrefix.characters = 22;
  var separatorPnl = fileNameGrp.add('panel', undefined, LANG.separator);
      separatorPnl.margins = UI_MARGINS;
  var symbol = separatorPnl.add('edittext', undefined, separator);
      symbol.characters = 4;
  
  var optionPnl = dialog.add('group');
      optionPnl.orientation = 'row';
  var rbAbs = optionPnl.add('radiobutton', undefined, LANG.abs);
  var rbSel = optionPnl.add('radiobutton', undefined, LANG.totalSel);
  var rbSelSep = optionPnl.add('radiobutton', undefined, LANG.eachSel);
  switch (DEF_RB) {
    case 1:
    default:
      rbAbs.value = true;
      break;
    case 2: 
      rbSel.value = true;
      break;
    case 3: 
      rbSelSep.value = true;
      break;
  }

  if (!selection.length || selection.typename == 'TextRange') {
    rbSel.enabled = rbSelSep.enabled = false;
    rbSel.value = rbSelSep.value = false;
    rbAbs.value = true;
  }
  
  var abPanel = dialog.add('panel', undefined, LANG.absRange);
      abPanel.orientation = 'column';
      abPanel.alignChildren = ['fill','fill']; 
      abPanel.margins = UI_MARGINS;
  var absInput = abPanel.add('edittext', undefined, ABS_RANGE_PH);
  var absDescr = abPanel.add('statictext', undefined, ALL_ABS_PH + ' - ' + LANG.placeholder);
      absDescr.justify = 'left';

  rbSel.onClick = rbSelSep.onClick = function() {
    abPanel.enabled = false;
  }
  rbAbs.onClick = function () {
    abPanel.enabled = true;
  }

  var btnGroup = dialog.add('group');
      btnGroup.alignChildren = ['center', 'center'];
  var cancel = btnGroup.add('button', undefined, LANG.cancel, { name: 'cancel' });
  var ok = btnGroup.add('button', undefined, LANG.ok, { name: 'ok' });

  var copyright = dialog.add('statictext', undefined, '\u00A9 Sergey Osokin, github.com/creold');
      copyright.justify = 'center';
      copyright.enabled = false;

  btnOutFolder.onClick = function () {
    var userFolder = Folder.selectDialog(LANG.selectTitle);
        
    if (userFolder !== null) {
      lblOutFolder.text = decodeURI(userFolder);
      outFolder = userFolder;
    }
  }

  absDescr.addEventListener('mousedown', function() {
    rbAbs.active = true;
    dialog.update();
    absInput.text = ALL_ABS_PH;
    absInput.active = true;
  });

  cancel.onClick = function () {
    dialog.close();
  }

  ok.onClick = okClick;
  
  function okClick() {
    outFolder = decodeURI(lblOutFolder.text);

    if (isEmpty(outFolder.toString())) {
      lblOutFolder.text = (doc.path != '') ? doc.path : Folder.desktop;
      return;
    }
    
    if (!Folder(outFolder).exists) {
      alert(LANG.errFolder);
      lblOutFolder.text = (doc.path != '') ? doc.path : Folder.desktop;
      return;
    }

    if (!isEmpty(namePrefix.text)) {
      fileName = namePrefix.text.trim();
    } else {
      alert(LANG.errPrefix);
      return;
    }

    ok.text = LANG.wait;
    dialog.update();
    
    var docSel = selection,
        tmpRange = absInput.text,
        absRange = []; // Range of artboards indexes

    // Prepare
    tmpRange = tmpRange.replace(/\s/g, ''); // Remove whitespaces
    tmpRange = tmpRange.split(','); // Split string to array
    absRange = getArtboardsRange(tmpRange, ALL_ABS_PH);

    if (!isEmpty(symbol.text)) separator = symbol.text;
    var rootDest = outFolder + '/' + fileName + separator;

    if (rbAbs.value) {
      selection = null;
      for (var i = 0, abLen = absRange.length; i < abLen; i++) {
        var idx = absRange[i];
        var abName = doc.artboards[idx].name.replace(/\s/g, '_')
        doc.artboards.setActiveArtboardIndex(idx);
        doc.selectObjectsOnActiveArtboard();
        exportDXF(rootDest + abName, exportOptions);
        selection = null;
      }
      doc.artboards.setActiveArtboardIndex(currBoardIdx);
    }
    if (rbSel.value) {
      exportDXF(rootDest.slice(0, -1 * separator.length), exportOptions);
    }
    if (rbSelSep.value) {
      selection = null;
      for (var i = 0, sLen = docSel.length; i < sLen; i++) {
        docSel[i].selected = true;
        exportDXF(rootDest + i, exportOptions);
        selection = null;
      }
    }
    
    selection = docSel;
    dialog.close();
  }

  dialog.center();
  dialog.show();
};

/**
 * Get document name without extension
 * @param {object} doc Adobe Illustrator document
 * @return {string} name without extension (symbols after point)
 */
function getDocName(doc) {
  var name = decodeURI(doc.name);
  name = name.replace(/\s/g, '_'); // Replace all space symbols
  // Remove filename extension
  var lastDot = name.lastIndexOf('.');
  if (lastDot > -1) return name.slice(0, lastDot);
  return name;
}

/**
 * Check empty string
 * @param {string} str input string
 * @return {boolean} answer 
 */
function isEmpty(str) {
  return str.replace(/\s/g, '').length == 0;
}

// Remove whitespaces from start and end of string
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, '');
};

/**
 * Get document artboards from user input
 * @param {array} arr raw array of artboards
 * @param {string} placeholder keyword for get all artboards
 * @return {array} array of artboard indexes
 */
function getArtboardsRange(arr, placeholder) { 
  var parsedStr = [];
  forEach(arr, function(e) {
    if (e.match(placeholder) != null) {
      for (var i = 0; i <= app.activeDocument.artboards.length; i++) {
        parsedStr.push(i);
      }
      return;
    };
    if (e.match('-') == null) {
      parsedStr.push(e * 1);
      return;
    };
    var extremeVal = e.split('-'); // Min & max value in range
    for (var j = (extremeVal[0] * 1); j <= extremeVal[1]; j++) {
      parsedStr.push(j);
    }
  });
  return intersect(app.activeDocument.artboards, parsedStr);
}


/**
 * Calls a provided callback function once for each element in an array
 * @param {array} collection
 * @param {function} fn the callback function
 */
function forEach(collection, fn) {
	for (var i = 0; i < collection.length; i++) {
		fn(collection[i]);
	}
}

/**
 * Search for common elements in arrays
 * @param {array} arr1
 * @param {array} arr2
 * @return {array} array of common elements
 */
function intersect(arr1, arr2) {
  var tmp = [];
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(i + 1) !== -1) tmp.push(i);
  }
  return tmp;
}

// Polyfill indexOf() for Array
Array.prototype.indexOf = function (item) {
  for (var i = 0 ; i < this.length; i++ ) {
    if ( this[i] === item ) return i;
  }
  return -1;
}

/**
 * Get AutoCAD options for export to DXF
 * @return {object} options
 */
function getOptions() {
  var options = new ExportOptionsAutoCAD();
  options.exportFileFormat = AutoCADExportFileFormat.DXF;
  // exportOptions.exportOption = AutoCADExportOption.PreserveAppearance;
  options.exportOption = AutoCADExportOption.MaximumEditability;
  // AutoCADCompatibility.AutoCADRelease13
  // AutoCADCompatibility.AutoCADRelease14
  // AutoCADCompatibility.AutoCADRelease15
  // AutoCADCompatibility.AutoCADRelease18
  // AutoCADCompatibility.AutoCADRelease21
  // AutoCADCompatibility.AutoCADRelease24
  options.version = AutoCADCompatibility.AutoCADRelease14;
  options.unit = AutoCADUnit.Millimeters;
  options.scaleLineweights = false;
  options.exportSelectedArtOnly = true;
  options.convertTextToOutlines = false;
  options.generateThumbnails = false;
  return options;
}

/**
 * Export to file
 * @param {string} dest folder path
 * @param {object} options AutoCAD export options
 */
function exportDXF(dest, options) {
  var file = new File(dest + '.dxf');
  app.activeDocument.exportFile(file, ExportType.AUTOCAD, options);
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