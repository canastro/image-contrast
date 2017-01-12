![build status](https://travis-ci.org/canastro/image-filter-contrast.svg?branch=master)
[![npm version](https://badge.fury.io/js/image-filter-contrast.svg)](https://badge.fury.io/js/image-filter-contrast)
[![codecov](https://codecov.io/gh/canastro/image-filter-contrast/branch/master/graph/badge.svg)](https://codecov.io/gh/canastro/image-filter-contrast)

# image-filter-contrast

Small library to apply a contrast transformation to a image relying on `image-filter-core` handle the transformation and distribute work with webworkers.

If you run `npm run build && npm run serve` and open `http://localhost:8080`, you'll find out the code for the following example:

### Original:
<img src="https://github.com/canastro/image-filter-contrast/blob/master/sandbox/dummy.jpg?raw=true" width="300">

### Expected Result (contrast: 70):
<img src="https://github.com/canastro/image-filter-contrast/blob/master/sandbox/expected.png?raw=true" width="300">

### Other related modules:
* [image-filter-core](https://www.npmjs.com/package/image-filter-core)
* [image-filter-contrast](https://www.npmjs.com/package/image-filter-contrast)
* [image-filter-grayscale](https://www.npmjs.com/package/image-filter-grayscale)
* [image-filter-threshold](https://www.npmjs.com/package/image-filter-threshold)
* [image-filter-sepia](https://www.npmjs.com/package/image-filter-sepia)
* [image-filter-invert](https://www.npmjs.com/package/image-filter-invert)
* [image-filter-gamma](https://www.npmjs.com/package/image-filter-gamma)
* [image-filter-colorize](https://www.npmjs.com/package/image-filter-colorize)
* [image-filters](https://www.npmjs.com/package/image-filters)

## Install

```
npm install image-filter-contrast --save
```

## Usage
It applies a contrast transformation to a base64 image. If you want a more complete library, please check image-filters that wraps this and other libraries to provide a more complete suite of image filters.

This library consumes ImageData and outputs ImageData in a Promise. You can use `image-filter-core` to convert from ImageData to dataURL.

JS file:
```js
var imageContrast = require('image-filters-contrast');
var nWorkers = 4;

imageContrast(IMAGE_DATA, { contrast: 30 }, nWorkers)
    .then(function (result) {
        // result === ImageData object
    });
```

## Frequent questions:
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
var imageFilterCore = require('image-filter-core');
var nWorkers = 4;

imageContrast(IMAGE_DATA, { contrast: 30 }, nWorkers)
    .then(function (result) {
        // result === ImageData object
        var image = document.createElement('img');
        image.setAttribute('src', imageFilterCore.convertImageDataToCanvasURL(imageData));
        target.appendChild(image);
    });
```
