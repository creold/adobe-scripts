/*
  ReverseGradientColor.jsx for Adobe Illustrator
  Description: Reverse of colors and their gradient transparency. Does not reverse the location of color stops.
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

function main() {
  if (app.documents.length == 0) {
    alert('Error\nOpen a document and try again.');
    return;
  } else { 
    var selPaths = [],
        doc = app.activeDocument;
  }

  if (doc.selection.length == 0) {
    alert('Error\nPlease select atleast one object.');
    return;
  }

  getPaths(doc.selection, selPaths);

  for (var i = 0; i < selPaths.length; i++) {
    reverseGradientColor(selPaths[i]);
  }
}

// Get only Paths from selection
function getPaths(item, arr) {
  for (var i = 0; i < item.length; i++) {
    var currItem = item[i];
    try {
      switch (currItem.typename) {
        case 'GroupItem':
          getPaths(currItem.pageItems, arr);
          break;
        case 'PathItem':
          if (currItem.filled && isGradientFill(currItem)) { arr.push(currItem); }
          else { badFillCount++; }
          break;
        case 'CompoundPathItem':
          if (currItem.pathItems[0].filled && isGradientFill(currItem.pathItems[0])) { arr.push(currItem.pathItems[0]); }
          else { badFillCount++; }
          break;
        default:
          break;
      }
    } catch (e) {}
  }
}

function isGradientFill(item) {
  if (item.fillColor.typename == 'GradientColor') { return true; }
  return false;
}

function reverseGradientColor(item) {
  var gItem = item.fillColor.gradient,
      tempStop = gItem.gradientStops,
      tempColor, tempOpacity;

  for (var i = 0, j = tempStop.length - 1; i < j; i++, j--) {
    var rStop = gItem.gradientStops[j],
        lStop = gItem.gradientStops[i];

    tempColor = rStop.color;
    tempRamp = rStop.rampPoint;
    tempMid = rStop.midPoint;
    tempOpacity = rStop.opacity;

    rStop.color = lStop.color;
    rStop.opacity = lStop.opacity;

    lStop.color = tempColor;
    lStop.opacity = tempOpacity;
  }
}

// Run script
try {
  main();
} catch (e) {}