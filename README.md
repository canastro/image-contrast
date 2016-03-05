# image-contrast

Small library to apply a contrast transformation to a image.

## Install

```
npm install image-contrast --save
```

## Usage
At the moment there are two ways of usage, you either provide a image or you provide a canvas imageData.

### From image:

JS file:
```js
var imageContrast = require('image-contrast');

imageContrast({
    from: '#original',
    to: '#target-1',
    contrast: 30
});
```

HTML:
```html
<img id="original" src="http://lorempixel.com/400/200" />
<div id="target-1"></div>
```

### From canvas imageData:

```js
var imageContrast = require('image-contrast');

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var img = new Image;
img.onload = function(){
    context.drawImage(img,0,0);

    var imageData = context.getImageData(0, 0, img.width, img.height);

    var result3 = imageContrast({
        imageData: imageData,
        to: '#target-3',
        contrast: 30
    });

    var result4 = imageContrast({
        imageData: imageData,
        to: '#target-4',
        contrast: 70
    });
};
img.src = "http://lorempixel.com/400/200";
```

### From image url:
```js
var imageContrast = require('image-contrast');

imageContrast({
    url: "http://lorempixel.com/400/200",
    to: '#target-5',
    contrast: 30
});
```
