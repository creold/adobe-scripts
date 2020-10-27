![header](img/header.png)
[![Behance](https://img.shields.io/badge/Behance-%40creold-0055FF.svg)](https://behance.net/creold) [![Dribbble](https://img.shields.io/badge/Dribbble-%40creold-DF3A7A.svg)](https://dribbble.com/creold) [![Instagram](https://img.shields.io/badge/Instagram-%40serg_osokin-8034B2.svg)](https://www.instagram.com/serg_osokin/)

This is a collection of some little scripts or drafts has not included in the [catalog].

[catalog]: https://github.com/creold/illustrator-scripts

### How to run scripts

#### Variant 1 — Install 

1. [Download archive] and unzip.
2. Place `<script_name>.jsx` in the Illustrator or Photoshop scripts folder:
	- OS X: `/Applications/Adobe Illustrator (or Photoshop)/Presets/Scripts`
	- Windows (32 bit): `C:\Program Files (x86)\Adobe\Adobe Illustrator (or Photoshop)\Presets\Scripts\`
	- Windows (64 bit): `C:\Program Files\Adobe\Adobe Illustrator  (or Photoshop) (64 Bit)\Presets\Scripts\`
3. Restart program

[Download archive]: https://github.com/creold/adobe-scripts/archive/master.zip 

#### Variant 2 — Drag & Drop
Drag and drop the script file (JS or JSX) into Illustrator Window, Photoshop icon on dock (Mac), taskbar (Win).

#### Variant 3 — Use extension
I recommend the [Scripshon Trees] panel. In it you can specify which folder your script files are stored in.

[Scripshon Trees]: https://exchange.adobe.com/creativecloud.details.15873.scripshon-trees.html

### Donate (optional)
If you find this script helpful, you can buy me a coffee ☕️ via [PayPal] or [Yandex Money] 🙂  

[PayPal]: https://paypal.me/osokin/2usd
[Yandex Money]: https://money.yandex.ru/to/410011149615582
<a href="https://paypal.me/osokin/3usd">
  <img width="160" height="49" src="img/paypal_badge.gif" >
</a>  

<a href="https://money.yandex.ru/to/410011149615582">
  <img width="160" height="49" src="img/yandex_badge.gif" >
</a>

## Adobe Illustrator Scripts

### GrayscaleToOpacity.jsx
Convert selection colors to Grayscale and set identical Opacity value.

![GrayscaleToOpacity](ai/GrayscaleToOpacity.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### NumeratesPoints.jsx
Numerates selected points and marks them with colored circles.

![NumeratesPoints](ai/NumeratesPoints.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### ObjectsCounter.jsx
Counts the number of selected objects.

![ObjectsCounter](ai/ObjectsCounter.gif)  

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### OpacityMaskClip.jsx
The script activates `Clip` checkbox in `Transparency > Opacity Mask`.

![OpacityMaskClip](ai/OpacityMaskClip.gif)  

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### RenameArtboardAsLayer.jsx
The script renames each Artboard by the custom name of Layer with the first visible unlocked item on it.

![RenameArtboardAsLayer](ai/RenameArtboardAsLayer.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### RenameArtboardAsSize.jsx
The script names the artboard by its size in pixels. If you don't want save Artboard name, but replace with his size, change `var SAVE_NAME = true;` in the script file to `false`   

![RenameArtboardAsSize](ai/RenameArtboardAsSize.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### RoundCoordinates.jsx
The script rounds the coordinates of the center of the object. Works with document units.

![RoundCoordinates](ai/RoundCoordinates.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### RenameArtboardAsTopObj.jsx
The script renames each Artboard by the custom name of the first visible unlocked item on it.

![RenameArtboardAsTopObj](ai/RenameArtboardAsTopObj.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### ReverseGradientColor.jsx
Reverse of gradient colors and their opacity. Does not reverse the location of color stops. If the gradient is copied with a Eyedropper Tool (I), the Illustrator thinks it is a single gradient. Use the Reverse Gradient button in the Gradient panel

![ReverseGradient](ai/ReverseGradientColor.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

### SaveAllDocs.jsx
Save all opened docs in one click.

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="img/download.png">
</a>

## Adobe Photoshop Scripts

### ClearLayer.jsx
Simple script to clear layers content.

![ClearLayer](ps/ClearLayer.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ps">
  <img width="160" height="49" src="img/download.png">
</a> 

### GeneratePreview.jsx
Generate JPG preview image from active document. Supports multiple saving with auto-numbering. If you want to change JPG size, edit number in script file `var jpegSizeMax = 1200;` .

![ClearLayer](ps/GeneratePreview.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ps">
  <img width="160" height="49" src="img/download.png">
</a> 

### SaveAll.jsx
Save all opened docs in one click.

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ps">
  <img width="160" height="49" src="img/download.png">
</a> 

#### Don't forget sharing link with a friend 🙂 


## Contribute

Found a bug? Please [submit a new issues](https://github.com/creold/adobe-scripts/issues) on GitHub.

### Contact
Email <hi@sergosokin.ru>  

### License

All scripts is licensed under the MIT licence.  
See the included LICENSE file for more details.