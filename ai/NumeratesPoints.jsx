/*
  NumeratesPoints.jsx for Adobe Illustrator
  Description: Numerates selected points and marks them with colored circles.
  Date: August, 2020
  Author: Sergey Osokin, email: hi@sergosokin.ru
  ============================================================================
  Installation: https://github.com/creold/illustrator-scripts#how-to-run-scripts
  ============================================================================
  Donate (optional): If you find this script helpful, you can buy me a coffee
                    via PayPal http://www.paypal.me/osokin/usd
  ============================================================================
  NOTICE:
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.
  ============================================================================
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  ============================================================================
  Check other author's scripts: https://github.com/creold
*/

//@target illustrator
$.localize = true; // Enabling automatic localization

// Global variables
var SCRIPT_NAME = 'Numerates Points',
    SETTINGS_FILE = {
      name: SCRIPT_NAME.replace(/\s/g, '_') + '_data.ini',
      folder: Folder.myDocuments + '/Adobe Scripts/'
    };

// EN-RU localized messages
var LANG_ERR_DOC = { en: 'Error\nOpen a document and try again.', ru: 'Ошибка\nОткройте документ и запустите скрипт.'},
    LANG_ERR_SELECT = { en: 'Error\nPlease select atleast one object.', ru: 'Ошибка\nВыделите хотя бы 1 объект.'},
    LANG_NUM = { en: 'Start number', ru: 'Стартовый номер'},
    LANG_RAD = { en: 'Marker radius', ru: 'Радиус маркера'},
    LANG_FONT = { en: 'Font size, pt', ru: 'Размер шрифта, пт'},
    LANG_LEFT = { en: 'Left margin', ru: 'Отступ слева'},
    LANG_TOP = { en: 'Top margin', ru: 'Отступ сверху'},
    LANG_OK = { en: 'Ok', ru: 'Готово'},
    LANG_CANCEL = { en: 'Cancel', ru: 'Отмена'},
    LANG_PREVIEW = { en: 'Preview', ru: 'Предпросмотр'};

var DEF_СIRCLE_RAD = 4,
    DEF_FONT_SIZE = 6,
    DEF_MARGIN_X = 10, // By left, px
    DEF_MARGIN_Y = -10,  // By top, px
    DEF_START_NUM = 1, // Start numeration
    MIN_VALUE = 0,
    DEF_IS_PREVIEW = true,
    DEF_DLG_OPACITY = 0.9,  // UI window opacity. Range 0-1
    FIELD_SIZE = [0, 0, 50, 30],
    TITLE_SIZE = [0, 0, 120, 30],
    GROUPS_NAME = ['Point_Markers', 'Point_Numbers'],
    isUndo = false,
    tempPath; // For fix Preview bug

function main() {
  if (app.documents.length == 0) {
    alert(LANG_ERR_DOC);
    return;
  }

  if (selection.length == 0) {
    alert(LANG_ERR_SELECT);
    return;
  }

  var doc = app.activeDocument,
      selPaths = [],
      selPoints = [],
      newColor,
      count = radius = leftMargin = topMargin = fontSize = 0;
 
  getPaths(selection, selPaths);
  getPoints(selPaths, selPoints);

  // Set color for marker
  if (activeDocument.documentColorSpace === DocumentColorSpace.RGB) {
    newColor = new RGBColor();
    newColor.red = 0;
    newColor.green = 0;
    newColor.blue = 0;
  } else {
    newColor = new CMYKColor();
    newColor.cyan = 0;
    newColor.magenta = 0;
    newColor.yellow = 0;
    newColor.black = 100;
  }

  // Main Window
  var dialog = new Window('dialog', SCRIPT_NAME, undefined);
      dialog.orientation = 'column';
      dialog.alignChildren = ['fill','center'];
      dialog.opacity = DEF_DLG_OPACITY;

  // Value fields
  var fieldGroup = dialog.add('group');
      fieldGroup.orientation = 'row';
      fieldGroup.alignChildren = ['fill','center'];

  var grpTitle = fieldGroup.add('group');
      grpTitle.orientation = 'column';
  var numTitle = grpTitle.add('statictext', TITLE_SIZE, LANG_NUM);
  var radTitle = grpTitle.add('statictext', TITLE_SIZE, LANG_RAD + ', ' + getDocUnit());
  var leftTitle = grpTitle.add('statictext', TITLE_SIZE, LANG_LEFT + ', ' + getDocUnit());
  var topTitle = grpTitle.add('statictext', TITLE_SIZE, LANG_TOP + ', ' + getDocUnit());
  var fontTitle = grpTitle.add('statictext', TITLE_SIZE, LANG_FONT);
  
  var grpInput = fieldGroup.add('group');
      grpInput.orientation = 'column';
  var numVal = grpInput.add('edittext', FIELD_SIZE, DEF_START_NUM);
  var radVal = grpInput.add('edittext', FIELD_SIZE, DEF_СIRCLE_RAD);
  var leftVal = grpInput.add('edittext', FIELD_SIZE, DEF_MARGIN_X);
  var topVal = grpInput.add('edittext', FIELD_SIZE, DEF_MARGIN_Y);
  var fontVal = grpInput.add('edittext', FIELD_SIZE, DEF_FONT_SIZE);

  // Buttons
  var btns = dialog.add('group');
      btns.orientation = 'row';
      btns.alignChildren = ['fill','center'];
  var cancel = btns.add('button', undefined, LANG_CANCEL, { name: 'cancel' });
  var ok = btns.add('button', undefined, LANG_OK,  { name: 'ok' });

  var grpPreview = dialog.add('group');
      grpPreview.orientation = 'row';
      grpPreview.alignChildren = ['center','center'];
  var isPreview = grpPreview.add('checkbox', undefined, LANG_PREVIEW);
      isPreview.value = DEF_IS_PREVIEW;

  var copyright = dialog.add('statictext', undefined, '\u00A9 github.com/creold');
      copyright.justify = 'center';
      copyright.enabled = false;

  loadSettings();
  
  // Event listener for isPreview
  if (isPreview.value) { previewStart(); }
  numVal.onChanging = radVal.onChanging = fontVal.onChanging = isPreview.onClick = previewStart;
  leftVal.onChanging = topVal.onChanging = previewStart;

  // Use Up / Down arrow keys (+ Shift) for change value
  for (var i = 0; i < grpInput.children.length; i++) {
    grpInput.children[i].addEventListener('keydown', function (kd) {
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
      previewStart();
    });
  }
  
  ok.onClick = okClick;

  function okClick() {
    if (isPreview.value && isUndo) { app.undo(); }
    start();
    isUndo = false;
    saveSettings();
    dialog.close();
  }

  function previewStart() {
    try {
      if (isPreview.value) {
        if (isUndo) { app.undo(); }
        else { isUndo = true; }
        start();
        app.redraw();
      } else if (isUndo) {
          app.undo();
          app.redraw();
          isUndo = false;
        }
    } catch (e) {}
  }

  function start() {
    count = convertInputToNum(numVal.text, DEF_START_NUM);
    radius = convertInputToNum(radVal.text, DEF_СIRCLE_RAD);
    leftMargin = convertInputToNum(leftVal.text, DEF_MARGIN_X);
    topMargin = convertInputToNum(topVal.text, DEF_MARGIN_Y);
    fontSize  = convertInputToNum(fontVal.text, DEF_FONT_SIZE);

    if (fontSize <= 0) { fontSize = DEF_FONT_SIZE; }
    if (radius <= 0) { radius = DEF_СIRCLE_RAD; }

    // Convert value to document units
    radius = convertUnits(radius + getDocUnit(), 'px');
    leftMargin = convertUnits(leftMargin + getDocUnit(), 'px');
    topMargin = convertUnits(topMargin + getDocUnit(), 'px');

    tempPath = doc.activeLayer.pathItems.add();
    tempPath.name = 'Temp_Path';
        
    // Add new groups for numbers and markers
    var markerGroup, numGroup;
    try {
      markerGroup = doc.groupItems.getByName(GROUPS_NAME[0]);
      numGroup = doc.groupItems.getByName(GROUPS_NAME[1]);
    } catch (e) {
      markerGroup = doc.activeLayer.groupItems.add();
      numGroup = doc.activeLayer.groupItems.add();
      markerGroup.name = GROUPS_NAME[0];
      numGroup.name = GROUPS_NAME[1];
    }

    for (var j = 0; j < selPoints.length; j++) {
      var currPoint = selPoints[j];
      var marker = doc.pathItems.ellipse(
          currPoint.anchor[1] + radius, // Top
          currPoint.anchor[0] - radius, // Left
          2 * radius, // Width
          2 * radius, // Height
          false, // Reversed
          true); // Inscribed
      marker.stroked = false;
      marker.fillColor = newColor;
      marker.move(markerGroup, ElementPlacement.PLACEATBEGINNING);
      
      var text = doc.textFrames.add();
          text.textRange.characterAttributes.size = fontSize;
          text.contents = count++;
          text.top = currPoint.anchor[1] + topMargin;
          text.left = currPoint.anchor[0] + leftMargin;
          text.move(numGroup, ElementPlacement.PLACEATBEGINNING);          
    }
  }
  
  cancel.onClick = function() {
    dialog.close();
  }

  dialog.onClose = function () {
    try {
      if (isUndo) {
        app.undo();
        app.redraw();
        isUndo = false;
      }
    } catch (e) {}
    tempPath.remove();
    app.redraw();
    return true;
  }
  
  dialog.center();
  dialog.show();

  function saveSettings() {
    if(!Folder(SETTINGS_FILE.folder).exists) Folder(SETTINGS_FILE.folder).create();
    var $file = new File(SETTINGS_FILE.folder + SETTINGS_FILE.name),
        data = [
          count,
          radVal.text,
          leftVal.text,
          topVal.text,
          fontSize,
          isPreview.value
        ].toString();
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
            $main = data[0].split(',');
        numVal.text = $main[0];
        radVal.text = $main[1];
        leftVal.text = $main[2];
        topVal.text = $main[3];
        fontVal.text = $main[4];
        isPreview.value = ($main[5] === 'true');
      } catch (e) {}
      $file.close();
    }
  }
}

function getPaths(item, arr) {
  for (var i = 0; i < item.length; i++) {
    var currItem = item[i];
    try {
      switch (currItem.typename) {
        case 'GroupItem':
          getPaths(currItem.pageItems, arr);
          break;
        case 'PathItem':
          arr.push(currItem);
          break;
        case 'CompoundPathItem':
          getPaths(currItem.pathItems, arr);
          break;
        default:
          currItem.selected = false;
          break;
      }
    } catch (e) {}
  }
}

function getPoints(paths, arr) {
    for (var i = 0; i < paths.length; i++) {
    if (paths[i].pathPoints.length > 1) {
      var points = paths[i].pathPoints;
      for (var j = 0; j < points.length; j++) {
        if (points[j].selected == PathPointSelection.ANCHORPOINT) arr.push(points[j]);
      }
    }
  }
}

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

function convertInputToNum(str, def) {
  str = str.replace(',', '.');
  if (isNaN(1 * str) || str.replace(/\s/g, '').length == 0) { return def; }
  else { return 1 * str; }
}

try {
  main();
} catch (e) {}