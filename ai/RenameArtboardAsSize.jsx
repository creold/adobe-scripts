/*
  RenameArtboardAsSize.jsx for Adobe Illustrator
  Description: The script fills in the name of artboard its size
  Date: September, 2018
  Author: Sergey Osokin, email: hi@sergosokin.ru
  ==========================================================================================
  Installation:
  1. Place script in:
     Win (32 bit): C:\Program Files (x86)\Adobe\Adobe Illustrator [vers.]\Presets\en_GB\Scripts\
     Win (64 bit): C:\Program Files\Adobe\Adobe Illustrator [vers.] (64 Bit)\Presets\en_GB\Scripts\
     Mac OS: <hard drive>/Applications/Adobe Illustrator [vers.]/Presets.localized/en_GB/Scripts
  2. Restart Illustrator
  3. Choose File > Scripts > RenameArtboardAsSize
  ============================================================================
  Donate (optional): If you find this script helpful and want to support me 
  by shouting me a cup of coffee, you can by via PayPal http://www.paypal.me/osokin/usd
  ==========================================================================================
  NOTICE:
  Tested with Adobe Illustrator CC 2017-2019 (Mac).
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.
  ==========================================================================================
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  ==========================================================================================
  Check other author's scripts: https://github.com/creold
*/

//@target illustrator

// Global variables
var SAVE_NAME = true, // Set false to overwrite the full name
    ROUND_SIZE = false, // Set true to get a round number
    SPLIT = '_';

function main() {
  if (app.documents.length == 0) {
    alert('Error: \nOpen a document and try again.');
    return;
  }

  var doc = app.activeDocument;
  var width, height, size;

  for (var i = 0; i < doc.artboards.length; i++) {
    var currArtboard = doc.artboards[i];
    
    width = convertUnits(currArtboard.artboardRect[2] - currArtboard.artboardRect[0], getDocUnit());
    height = convertUnits(currArtboard.artboardRect[1] - currArtboard.artboardRect[3], getDocUnit());

    if (ROUND_SIZE) {
      width = Math.round(width);
      height = Math.round(height);
    } else {
      width = width.toFixed(2);
      height = height.toFixed(2);
    }

    size = width + 'x' + height + getDocUnit();

    if (SAVE_NAME) {
      currArtboard.name += SPLIT + size;
    } else {
      currArtboard.name = size;
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

function showError(err) {
  alert(err + ': on line ' + err.line, 'Script Error', true);
}

try {
  main();
} catch (e) {
  // showError(e);
}