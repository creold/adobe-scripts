/*
  ResizeOnLargerSide.jsx for Adobe Illustrator
  Description: resize of the selected objects to the specified amount on the larger side
  Date: March, 2020
  Author: Sergey Osokin, email: hi@sergosokin.ru
  
  Installation: https://github.com/creold/illustrator-scripts#how-to-run-scripts
  
  NOTICE:
  Tested with Adobe Illustrator CC 2019 (Mac/Win).
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.
  
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  
  Check other author's scripts: https://github.com/creold
*/

//@target illustrator

var DEF_SIZE = 512;

function main () {
  if (selection.length > 0 && selection.typename != 'TextRange') {
    var newSize = prompt('Enter the size on the larger side (' + getDocUnit() + ')', DEF_SIZE);
    
    // Prepare value
    if (newSize === null) return false;
    newSize = convertInputToNum(newSize, DEF_SIZE);
    newSize = convertUnits(newSize + getDocUnit(), 'px');

    for (var i = 0; i < selection.length; i++) {
      var obj = selection[i],
          largeSide = obj.height >= obj.width ? obj.height : obj.width,
          ratio;

      // Calc ratio
      if (obj.typename === 'TextArtItem') {
        var txtClone = obj.duplicate(),
            txtOutline = txtClone.createOutline(),
            txtLargeSide = txtOutline.height > txtOutline.width ? txtOutline.height : txtOutline.width; 
        ratio = 100 / (txtLargeSide / goal.height);
        outline.remove();
      } else {
        ratio = 100 / (largeSide / newSize);
      }

      obj.resize(ratio, ratio, true, true, true, true, ratio);
    }
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
  if (app.documents.length > 0) {
    main();
  }
} catch (e) {}