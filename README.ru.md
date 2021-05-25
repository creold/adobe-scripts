![header](https://i.ibb.co/zmcJrwq/header.png)
[![Behance](https://img.shields.io/badge/Behance-%40creold-0055FF.svg)](https://behance.net/creold) [![Instagram](https://img.shields.io/badge/Instagram-%40serg_osokin-8034B2.svg)](https://www.instagram.com/serg_osokin/) [![Dribbble](https://img.shields.io/badge/-YouTube%20Channel-FF0000.svg)](https://www.youtube.com/c/SergOsokinArt/videos)

*Инструкция на других языках: [English](README.md), [Русский](README.ru.md)*  

Это коллекция небольших скриптов и черновиков не вошедшая в основной [репозиторий](https://github.com/creold/illustrator-scripts).

### ▶️ Как запускать скрипты

#### Вариант 1 — Установка 

1. [Скачайте архив] и распакуйте. Все скрипты находятся в папке `jsx`
2. Поместите `<имя_скрипта>.jsx` в папку скриптов Adobe Illustrator:
	- OS X: `/Applications/Adobe Illustrator [vers.]/Presets.localized/en_GB/Scripts`
	- Windows (32 bit): `C:\Program Files (x86)\Adobe\Adobe Illustrator [vers.]\Presets\en_GB\Scripts\`
	- Windows (64 bit): `C:\Program Files\Adobe\Adobe Illustrator [vers.] (64 Bit)\Presets\en_GB\Scripts\`
	- Русскоязычная версия: `C:\Program Files\Adobe\Adobe Illustrator [версия]\Стили\ru_RU\Сценарии\`
3. Перезапустите программу

[Скачайте архив]: https://github.com/creold/adobe-scripts/archive/master.zip

#### Вариант 2 — Drag & Drop
Перетащите файл скрипта из папки напрямую в окно Adobe Illustrator.  

#### Variant 3 — Расширения (Extension)
Если часто приходится запускать скрипты, то чтобы не открывать постоянно меню, можно установить бесплатные панели [Scripshon Trees] или [LAScripts].  

[Scripshon Trees]: https://exchange.adobe.com/creativecloud.details.15873.scripshon-trees.html
[LAScripts]: https://ladygin.pro/products/lascripts/

### 💸 Поддержка (по желанию)
Вы можете поддержать мою работу над новыми скриптами и их распространение любой суммой через [PayPal], [ЮMoney] или [Donatty] 🙂  

[PayPal]: https://paypal.me/osokin/2usd
[ЮMoney]: https://yoomoney.ru/to/410011149615582
[Donatty]: https://donatty.com/sergosokin

<a href="https://paypal.me/osokin/3usd">
  <img width="160" height="49" src="https://i.ibb.co/LkgNvzG/paypal-badge.gif" >
</a>

<a href="https://yoomoney.ru/to/410011149615582">
  <img width="160" height="49" src="https://i.ibb.co/6s5DFCd/yoomoney-badge.gif" >
</a>

<a href="https://donatty.com/sergosokin">
  <img width="160" height="49" src="https://i.ibb.co/tcwzLkB/donatty-badge.gif" >
</a>

## 🖋 Скрипты для Adobe Illustrator

### CenterClipsToArtboards
Выравнивает все обтравочные маски (clipping masks) и их содержимое по центру артбордов, на которых они лежат. Также можно выравнивать только выделенные маски по одному артборду. 

![CenterClipsToArtboards](https://i.ibb.co/ykHy3rM/Center-Clips-To-Artboards.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### ExportToDXF
Экспортирует выбранные артборды с видимыми незаблокированными объектами или выделенные объекты в отдельные файлы DXF для CAD-систем. 

![ExportToDXF](https://i.ibb.co/xqhxjp0/Export-To-DXF.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### GrayscaleToOpacity
Преобразует цвет выбранных объектов в оттенки серого (Grayscale) и устанавливает прозрачность (Opacity) численно равную каналу серого цвета.

![GrayscaleToOpacity](https://i.ibb.co/DVfGtkz/Grayscale-To-Opacity.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### MoveArtboards
Перемещает все артборды из диапазона по номерам с содержимым по осям X и Y на точное расстояние.

![MoveArtboards](https://i.ibb.co/wrHTpTG/Move-Artboards.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### MoveToGroup
Если выделенные объекты содержат группу, то перемещает все объекты в нее. Порядок сохраняется: объекты выше группы помещаются внутри наверх, нижние — вниз группы. Если групп несколько, то выбирается в диалоге куда переместить: в верхнюю или нижюю.

![MoveToGroup](https://i.ibb.co/jkD5Zx4/Move-To-Group.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### NumeratesPoints
Нумерует выделенные точки и помечает их круглыми маркерами. Пригодится, например, для создания рисунков в стиле «Соедини по точкам (цифрам)».

![NumeratesPoints](https://i.ibb.co/bdJ8tvV/Numerates-Points.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### ObjectsCounter
Подсчитывает количество выделенных объектов. Группы не учитываются, как отдельный объект, только вложенные в них элементы.

![ObjectsCounter](https://i.ibb.co/bFd5k6p/Objects-Counter.gif)  

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### OpacityMaskClip
Активирует чекбокс `Clip` в панели `Transparency > Opacity Mask` для выделенных объектов с масками прозрачности.

![OpacityMaskClip](https://i.ibb.co/k0CBJKq/Opacity-Mask-Clip.gif)  

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### RenameArtboardAsLayer
Переименовывает каждый артборд по имени слоя, в котором есть элемент, лежащий на соответствующем артборде.

![RenameArtboardAsLayer](https://i.ibb.co/9nk8Lqn/Rename-Artboard-As-Layer.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### RenameArtboardAsSize
Скрипт ставит в имя артборда его размер в пикселях. Если не хотите сохранять старое имя, а только менять на размер, то откройте файл скрипта текстовым редактором и поменяйте значение в строке `var SAVE_NAME = true;` на `false`.     

![RenameArtboardAsSize](https://i.ibb.co/54H4Jcm/Rename-Artboard-As-Size.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### RoundCoordinates
Округляет координаты центра объекта. Учитывает единицы измерения документа.

![RoundCoordinates](https://i.ibb.co/jMy4YzT/Round-Coordinates.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### RenameArtboardAsTopObj
Переименовывает каждый артборд по имени верхнего по иерархии объекта, лежащий на соответствующем артборде.

![RenameArtboardAsTopObj](https://i.ibb.co/4RGWddG/Rename-Artboard-As-Top-Obj.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### ResizeOnLargerSide
Трансформирует выбранные объекты пропорционально до заданной величины бОльшей стороны. Её скрипт определяет автоматически. Учитывает единицы измерения документа.   

![ResizeOnLargerSide](https://i.ibb.co/1bSj1kC/Resize-On-Larger-Side.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### ReverseGradientColor
Зеркально переворачивает цвета градиента: каждую точку (Color stop) вместе с прозрачностью. Само расположение точек сохраняется. Если градиент скопирован с другого объекта пипеткой (Eyedropper Tool), то Illustrator хранит связь между ним. В таком случае запуск скрипта приведет к разворачиванию всех скопированных градиентов. В таком случае, возможно, лучше использовать кнопку `Reverse Gradient` в стандартной панели Gradient.   

![ReverseGradient](https://i.ibb.co/Fg8nnHZ/Reverse-Gradient-Color.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### SaveAllDocs
Сохраняет все открытые документы.

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

### SyncGlobalColorsNames
Синхронизирует имена совпадающих глобальных цветов между всеми открытыми документами. После синронизации сохраняет изменения.

![SyncGlobalColorsNames](https://i.ibb.co/G9NRF7J/Sync-Global-Colors-Names.gif)

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ai">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a>

## 🖌 Скрипты для Adobe Photoshop

### ClearLayer
Скрипт удаляет видимое содержимое выбранного слоя. Заменяет ручные команды: выделить всё и очистить.

![ClearLayer](https://i.ibb.co/hV7NFxB/Clear-Layer.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ps">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a> 

### GeneratePreview
Сохраняет JPG активного документа. При повторном запуске на документе может сохранять под новым номером, например, чтобы сохранять в множестве JPG разное состояние документа. Если хотите изменить размер JPG, откройте файл скрипта текстовым редактором и замените число в пикселях `var jpegSizeMax = 1200;`. Это размер бОльшей стороны, которую скрипт автоматически определит и сохранит пропорционально.

![ClearLayer](https://i.ibb.co/HrcPNvs/Generate-Preview.gif) 

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ps">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a> 

### SaveAll
Сохраняет все открытые документы.

<a href="https://downgit.github.io/#/home?url=https://github.com/creold/adobe-scripts/tree/master/ps">
  <img width="160" height="49" src="https://i.ibb.co/ZW07Fw4/download-ru.png">
</a> 

#### Не забывайте поделиться ссылкой со знакомыми дизайнерами 🙂 

## 🤝 Вклад

Нашли ошибку? [Создайте запрос](https://github.com/creold/adobe-scripts/issues) на Гитхабе или напишите мне на почту.

### Контакты
Эл. почта <hi@sergosokin.ru>  
Телеграм [@sergosokin](https://t.me/sergosokin)

### 📝 Лицензия

Скрипты распространяются по лицензии MIT   
Больше деталей во вложенном файле LICENSE