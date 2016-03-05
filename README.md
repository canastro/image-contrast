# image-contrast

Small library to apply a contrast transformation to a image.

## Install

```
npm install image-contrast --save
```

## Usage
It applies a contrast transformation to a base64 image. If you want a more complete library, please check image-filters that wraps this and other libraries to provide a more complete suite of image filters.

JS file:
```js
var imageContrast = require('image-contrast');

var result = imageContrast({
    data: IMAGE_DATA,
    contrast: 30
});
```

# Frequent questions:
### How can I get image data from a image tag?

```js
var element = document.getElementById('#dummy-image');
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
context.drawImage(element, 0, 0 );
var imageData = context.getImageData(0, 0, element.width, element.height);
```

### How can I get image data from url?

```js
var element = document.createElement('img');
element.setAttribute('src', options.url);
//...repeat process from the previous answer
```

### How can I use the output of this?

```js
var result = imageContrast({
    data: IMAGE_DATA,
    contrast: 30
});

var image = document.createElement('img');
image.setAttribute('src', result);

var target = document.getElementById('#dummy-target');
target.appendChild(image);
```
