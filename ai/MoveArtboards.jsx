/*
  MoveArtboards.jsx for Adobe Illustrator
  Description: Script for moving artboards range with artwork along the X and Y axis
  Requirements: Adobe Illustrator CS6 and later
  Date: October, 2020
  Author: Sergey Osokin, email: hi@sergosokin.ru
  
  Installation: https://github.com/creold/illustrator-scripts#how-to-run-scripts
  
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

var SCRIPT_NAME = 'Move Artboards',
    SETTINGS_FILE = {
      name: SCRIPT_NAME.replace(/\s/g, '_') + '_data.ini',
      folder: Folder.myDocuments + '/Adobe Scripts/'
    },
    AI_VER = parseInt(app.version),
    TEMP_GROUP = 'ARTBOARD_NUMBERS',
    ALL_BOARDS_PH = '%all',
    L_KEYWORD = '%isLocked',
    H_KEYWORD = '%isHidden',
    OVER_OBJ = 2500 // The amount of objects, when the script can run slowly
    CNVS_SIZE = 16383, // Illustrator canvas max bounds, px
    DEF_SHIFT = 100, // Units px
    DEF_RANGE = '1, 2-4',
    DEF_DLG_OPACITY = 0.9,  // UI window opacity. Range 0-1
    UI_MARGIN = [10, 15, 10, 10];

// EN-RU localized messages
var LANG_ERR_DOC = { en: 'Error\nOpen a document and try again.', ru: 'Ошибка\nОткройте документ и запустите скрипт.'},
    LANG_ERR_VER = { en: 'Error\nSorry, script only works in Illustrator CS6 and later.',
                     ru: 'Ошибка\nСкрипт работает в Illustrator CS6 и выше.'},
    LANG_ERR_OVER_CNVS_1 = { en: 'Error\nMoved artboards go beyond canvas\nbounds from the ', 
                         ru: 'Ошибка\nПеремещаемые артборды выходят за пределы\nхолста Иллюстратора с '},
    LANG_ERR_OVER_CNVS_2 = { en: 'side.', 
                         ru: 'стороны.'},
    LANG_ERR_OVER_L = { en: 'LEFT, ', ru: 'ЛЕВОЙ, '},
    LANG_ERR_OVER_R = { en: 'RIGHT, ', ru: 'ПРАВОЙ, '},
    LANG_ERR_OVER_T = { en: 'TOP, ', ru: 'ВЕРХНЕЙ, '},
    LANG_ERR_OVER_B = { en: 'BOTTOM, ', ru: 'НИЖНЕЙ, '},
    LANG_ERR_OVER_TIP = { en: '\n\nTry smaller distance or different range', 
                          ru: '\n\nПопробуйте меньший сдвиг или другой диапазон'},
    LANG_SLOW = { en: 'The document has over ' + OVER_OBJ + ' objects. The script can run slowly',
                  ru: 'В документе свыше ' + OVER_OBJ + ' объектов. Скрипт может работать медленно'},
    LANG_RANGE = { en: 'Artboards range', ru: 'Номера артбордов'},
    LANG_RANGE_DESCR = { en: ALL_BOARDS_PH + ' - all artboards', ru: ALL_BOARDS_PH + ' - все артборды'},
    LANG_SHIFT = { en: 'Shift', ru: 'Смещение'},
    LANG_X = { en: 'X axis', ru: 'Ось X'},
    LANG_Y = { en: 'Y axis', ru: 'Ось Y'},
    LANG_OK = { en: 'Ok', ru: 'Готово'},
    LANG_CANCEL = { en: 'Cancel', ru: 'Отмена'};

function main() {
  if (AI_VER < 16) {
    alert(LANG_ERR_VER);
    return;
  } 

  if (app.documents.length == 0) {
    alert(LANG_ERR_DOC);
    return;
  }

  var doc = app.activeDocument,
      currBoardIdx = doc.artboards.getActiveArtboardIndex();

  // Main Window
  var dialog = new Window('dialog', SCRIPT_NAME, undefined);
      dialog.orientation = 'column';
      dialog.alignChildren = ['fill','center'];
      dialog.opacity = DEF_DLG_OPACITY;

  // Value fields
  var abPanel = dialog.add('panel', undefined, LANG_RANGE);
      abPanel.orientation = 'column';
      abPanel.alignChildren = ['fill','center']; 
      abPanel.margins = UI_MARGIN;
  var abInput = abPanel.add('edittext', undefined, DEF_RANGE);
  var abDescr = abPanel.add('statictext', undefined, LANG_RANGE_DESCR);
      abDescr.justify = 'left';

  var shiftPanel = dialog.add('panel', undefined, LANG_SHIFT + ', ' + getDocUnit());
      shiftPanel.orientation = 'column';
      shiftPanel.alignChildren = ['left','center'];
      shiftPanel.margins = UI_MARGIN;
  
  var direction = shiftPanel.add('group');
      direction.orientation = 'row';

  var titleX = direction.add('statictext', undefined, LANG_X); 
  var inputX = direction.add('edittext', [0, 0, 50, 30], DEF_SHIFT);
  
  var titleY = direction.add('statictext', undefined, LANG_Y); 
  var inputY = direction.add('edittext', [0, 0, 50, 30], DEF_SHIFT);

  if (doc.pageItems.length > OVER_OBJ) {
    var warning = dialog.add('statictext', undefined, LANG_SLOW, { multiline: true });
  }
  
  // Buttons
  var btns = dialog.add('group');
      btns.orientation = 'row';
      btns.alignChildren = ['fill','center'];
  var cancel = btns.add('button', undefined, LANG_CANCEL);
  var ok = btns.add('button', undefined, LANG_OK);

  var copyright = dialog.add('statictext', undefined, '\u00A9 github.com/creold');
      copyright.justify = 'center';
      copyright.enabled = false;

  loadSettings();

  // Change listeners
  inputX.onChange = inputY.onChange = function() {
    this.text = convertInputToNum(this.text, DEF_SHIFT);
  }
  keyListener(inputX);
  keyListener(inputY);
  abDescr.addEventListener('mousedown', function(){
    inputX.active = true;
    dialog.update();
    abInput.text = ALL_BOARDS_PH;
  });

  drawArtboardsNames();
  app.redraw();

  ok.onClick = okClick;
  cancel.onClick = function() { 
    dialog.close(); 
  }

  function okClick() {
    var abRangeToMove = abInput.text,
        abRangeArr = [], // Range of artboards indexes
        extremeCoord = [], // Range of min & max artboards coordinates
        shiftX = convertUnits((inputX.text * 1) + getDocUnit(), 'px'), // Convert value to document units
        shiftY = convertUnits((inputY.text * 1) + getDocUnit(), 'px'); // Convert value to document units

    // Prepare
    abRangeToMove = abRangeToMove.replace(/\s/g, ''); // Remove whitespaces
    abRangeToMove = abRangeToMove.split(','); // Split string to array
    abRangeArr = getArtboardsRange(abRangeToMove);
    
    saveItemsState(); // Save information about locked & hidden pageItems
    
    // Check coordinates limit before moving
    extremeCoord = collectExtremeCoordinates(abRangeArr);
    var overCnvsSize = isOverCnvsBounds(extremeCoord, shiftX, shiftY);
    if (overCnvsSize.val) {
      alert(overCnvsSize.msg);
      return;
    }

    var abItems = collectArtboardItems(abRangeArr);

    for (var i = 0; i < abRangeArr.length; i++) {
      var idx = abRangeArr[i];
      try {
        moveArtboard(doc.artboards[idx], abItems[i][0], shiftX, shiftY);
      } catch (e) {}
    }
    
    // Restore locked & hidden pageItems
    selection = null;
    restoreItemsState();

    doc.artboards.setActiveArtboardIndex(currBoardIdx);
    
    saveSettings();
    dialog.close();
  }

  dialog.center();
  dialog.show();

  // Remove temp group with artboards numbers
  try {
    var groupToRm = doc.groupItems.getByName(TEMP_GROUP);
    groupToRm.remove();
  } catch (e) {}

  function keyListener(item) {
    item.addEventListener('keydown', function (kd) {
      var step;
      ScriptUI.environment.keyboardState['shiftKey'] ? step = 10 : step = 1;
      if (kd.keyName == 'Down') {
        this.text = Number(this.text) - step;
        kd.preventDefault();
      }
      if (kd.keyName == 'Up') {
        this.text = Number(this.text) + step;
        kd.preventDefault();
      }
    });
  }

  function saveSettings() {
    if(!Folder(SETTINGS_FILE.folder).exists) Folder(SETTINGS_FILE.folder).create();
    var $file = new File(SETTINGS_FILE.folder + SETTINGS_FILE.name),
        data = [
          abInput.text,
          inputX.text,
          inputY.text
        ].join(';');
    $file.open('w');
    $file.write(data);
    $file.close();
  }
 
  function loadSettings() {
    var $file = File(SETTINGS_FILE.folder + SETTINGS_FILE.name);
    if ($file.exists) {
      try {
        $file.open('r');
        var data = $file.read().split('\n'),
            $main = data[0].split(';');
        abInput.text  = $main[0];
        inputX.text = $main[1];
        inputY.text = $main[2];
      } catch (e) {}
      $file.close();
    }
  }
}

function drawArtboardsNames() {
  var doc = app.activeDocument,
      tempGroup;
  
  try {
    tempGroup = doc.groupItems.getByName(TEMP_GROUP);
  } catch (e) {
    tempGroup = doc.activeLayer.groupItems.add();
    tempGroup.name = TEMP_GROUP;
  }
  
  for (var i = 0; i < doc.artboards.length; i++)  {
    doc.artboards.setActiveArtboardIndex(i);
    var currAb = doc.artboards[i],
        abWidth = currAb.artboardRect[2] - currAb.artboardRect[0],
        abHeight = currAb.artboardRect[1] - currAb.artboardRect[3],
        label = doc.textFrames.add(),
        labelSize = (abWidth >= abHeight) ? abHeight : abWidth;
    label.contents = i + 1;
    label.textRange.characterAttributes.size = labelSize / 2;
    label.position = [
      currAb.artboardRect[0],
      currAb.artboardRect[1]
    ];
    label.move(tempGroup, ElementPlacement.PLACEATBEGINNING);
  }
}

function collectArtboardItems(abRange) {
  var doc = app.activeDocument;
  var obj = [];
  for (var i = 0; i < abRange.length; i++) {
    idx = abRange[i];
    doc.artboards.setActiveArtboardIndex(idx);
    doc.selectObjectsOnActiveArtboard();
    obj[i] = [];
    obj[i].push(selection);
    selection = null;
  }
  
  return obj;
}

// Get min & max coordinate of artboards range
function collectExtremeCoordinates(abRange) {
  var doc = app.activeDocument,
      idx = 0,
      minLeft = CNVS_SIZE,
      maxTop = CNVS_SIZE,
      maxRight = 0,
      minBottom = 0;
  
  // Trick with temp pathItem to get the absolute coordinate of the artboard. Thanks to @moodyallen
  var fakePath = doc.pathItems.add();
  var cnvsDelta = 1 + ((fakePath.position[0] * 2 - 16384) - (fakePath.position[1] * 2 + 16384)) / 2;
  var cnvsTempPath = doc.pathItems.rectangle(fakePath.position[0] - cnvsDelta, fakePath.position[1] + cnvsDelta, 300, 300);
  cnvsTempPath.filled = false;
  cnvsTempPath.stroked  = false;

  fakePath.remove();
  
  // Get coordinates for each artboard in the range
  for (var i = 0; i < abRange.length; i++) {
    idx = abRange[i];
    var thisAbRect = doc.artboards[idx].artboardRect;
    
    // Create a rectangle with the same size as the artboard
    var top = thisAbRect[1],
        left = thisAbRect[0],
        width = thisAbRect[2] - thisAbRect[0],
        height = thisAbRect[1] - thisAbRect[3];
    var abTempPath = doc.pathItems.rectangle(top, left, width, height);
    abTempPath.stroked  = false;
    abTempPath.filled =  false;
    
    // Use the X, Y coordinates of cnvsTempPath and abTempPath to get the absolute coordinate
    var absLeft = Math.floor(abTempPath.position[0] - cnvsTempPath.position[0]),
        absTop = Math.floor(cnvsTempPath.position[1] - abTempPath.position[1]),
        absBottom = absTop + height,
        absRight = absLeft + width;

    if (absLeft < minLeft) minLeft = absLeft;
    if (absTop < maxTop) maxTop = absTop;
    if (absRight > maxRight) maxRight = absRight;
    if (absBottom > minBottom) minBottom = absBottom;
    
    abTempPath.remove();
  }
  cnvsTempPath.remove();

  return [minLeft, maxTop, maxRight, minBottom];
}

// Check coordinates limit before moving
function isOverCnvsBounds(coord, shiftX, shiftY) {
  var isOverCnvs = false;
  var msg = LANG_ERR_OVER_CNVS_1;
  if (coord[0] + shiftX < 0) {
    isOverCnvs = true;
    msg += LANG_ERR_OVER_L;
  }
  if (coord[1] - shiftY < 0 ) {
    isOverCnvs = true;
    msg += LANG_ERR_OVER_T;
  }
  if (coord[2] + shiftX > CNVS_SIZE) {
    isOverCnvs = true;
    msg += LANG_ERR_OVER_R;
  }
  if (coord[3] - shiftY > CNVS_SIZE) {
    isOverCnvs = true;
    msg += LANG_ERR_OVER_B;
  }
  
  msg += LANG_ERR_OVER_CNVS_2;
  var idx = msg.lastIndexOf(',');
  msg = msg.substring(0, idx) + msg.substring(idx + 1);
  msg += LANG_ERR_OVER_TIP;
  
  return { val: isOverCnvs, msg: msg };
}

function moveArtboard(board, items, shiftX, shiftY) {
  var doc = app.activeDocument,
      docCoordSystem = CoordinateSystem.DOCUMENTCOORDINATESYSTEM,
      abCoordSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM,
      isDocCoords = app.coordinateSystem == docCoordSystem,
      thisAbRect = board.artboardRect;
  
  // Move current artboard
  board.artboardRect = [
    thisAbRect[0] + shiftX,
    thisAbRect[1] + shiftY,
    thisAbRect[2] + shiftX,
    thisAbRect[3] + shiftY
  ];
  
  // Move objects from array
  for (var i = 0; i < items.length; i++) {
    var pos = isDocCoords ? items[i].position : doc.convertCoordinate(items[i].position, docCoordSystem, abCoordSystem);
    items[i].position = [pos[0] + shiftX, pos[1] + shiftY];
  }
}

function convertInputToNum(str, def) {
  str = str.replace(',', '.');
  if (isNaN(str * 1) || str.replace(/\s/g, '').length == 0) { 
    return def; 
  } else { 
    return str * 1; 
  }
}

// Save information about locked & hidden pageItems
function saveItemsState() {
  for (var i = 0; i < activeDocument.pageItems.length; i++) {
    var currItem = activeDocument.pageItems[i];
    if (currItem.locked) {
      if (currItem.note == '') { currItem.note = L_KEYWORD; }
      else { currItem.note += L_KEYWORD; }
      currItem.locked = false;
    }
    if (currItem.hidden) {
      if (currItem.note == '') { currItem.note = H_KEYWORD; }
      else { currItem.note += H_KEYWORD; }
      currItem.hidden = false;
    }
  }
  app.redraw();
}

// Restoring locked & hidden pageItems
function restoreItemsState() {
  for (var i = 0; i < activeDocument.pageItems.length; i++) {
    var currItem = activeDocument.pageItems[i];
    if (currItem.note.match(L_KEYWORD) != null) {
      currItem.locked = true;
      currItem.note = currItem.note.replace(L_KEYWORD, '');
    }
    if (currItem.note.match(H_KEYWORD) != null) {
      currItem.hidden = true;
      currItem.note = currItem.note.replace(H_KEYWORD, '');
    }
  }
}

function getArtboardsRange(rawArr) { 
  var parsedStr = [];

  forEach(rawArr, function(e) {
    if (e.match(ALL_BOARDS_PH) != null) {
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
  // if (isNaN(parsedStr));
  return intersect(app.activeDocument.artboards, parsedStr);
}


function forEach(collection, fn) {
	for (var i = 0; i < collection.length; i++) {
		fn(collection[i]);
	}
}

// Search for common elements in arrays
function intersect(arr1, arr2) {
  var tmp = [];
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(i + 1) !== -1) tmp.push(i);
  }
  return tmp;
};

// Polyfill indexOf() for Array
Array.prototype.indexOf = function (item) {
  for (var i = 0 ; i < this.length; i++ ) {
    if ( this[i] === item ) return i;
  }
  return -1;
};

// Units conversion. Thanks for help Alexander Ladygin (https://github.com/alexander-ladygin)
function getDocUnit() {
  var unit = activeDocument.rulerUnits.toString().replace('RulerUnits.', '');
  if (unit === 'Centimeters') unit = 'cm';
  else if (unit === 'Millimeters') unit = 'mm';
  else if (unit === 'Inches') unit = 'in';
  else if (unit === 'Pixels') unit = 'px';
  else if (unit === 'Points') unit = 'pt';
  return unit;
}

function getUnits(value, def) {
  try {
    return 'px,pt,mm,cm,in,pc'.indexOf(value.slice(-2)) > -1 ? value.slice(-2) : def;
  } catch (e) {}
};

function convertUnits(value, newUnit) {
  if (value === undefined) return value;
  if (newUnit === undefined) newUnit = 'px';
  if (typeof value === 'number') value = value + 'px';
  if (typeof value === 'string') {
    var unit = getUnits(value),
        val = parseFloat(value);
    if (unit && !isNaN(val)) {
      value = val;
    } else if (!isNaN(val)) {
      value = val;
      unit = 'px';
    }
  }

  if (((unit === 'px') || (unit === 'pt')) && (newUnit === 'mm')) {
      value = parseFloat(value) / 2.83464566929134;
  } else if (((unit === 'px') || (unit === 'pt')) && (newUnit === 'cm')) {
      value = parseFloat(value) / (2.83464566929134 * 10);
  } else if (((unit === 'px') || (unit === 'pt')) && (newUnit === 'in')) {
      value = parseFloat(value) / 72;
  } else if ((unit === 'mm') && ((newUnit === 'px') || (newUnit === 'pt'))) {
      value = parseFloat(value) * 2.83464566929134;
  } else if ((unit === 'mm') && (newUnit === 'cm')) {
      value = parseFloat(value) * 10;
  } else if ((unit === 'mm') && (newUnit === 'in')) {
      value = parseFloat(value) / 25.4;
  } else if ((unit === 'cm') && ((newUnit === 'px') || (bnewUnit === 'pt'))) {
      value = parseFloat(value) * 2.83464566929134 * 10;
  } else if ((unit === 'cm') && (newUnit === 'mm')) {
      value = parseFloat(value) / 10;
  } else if ((unit === 'cm') && (newUnit === 'in')) {
      value = parseFloat(value) * 2.54;
  } else if ((unit === 'in') && ((newUnit === 'px') || (newUnit === 'pt'))) {
      value = parseFloat(value) * 72;
  } else if ((unit === 'in') && (newUnit === 'mm')) {
      value = parseFloat(value) * 25.4;
  } else if ((unit === 'in') && (newUnit === 'cm')) {
      value = parseFloat(value) * 25.4;
  }
  return parseFloat(value);
}

try {
  main();
} catch (e) {}