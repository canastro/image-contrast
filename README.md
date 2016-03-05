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
var imageBrightness = require('image-contrast');

var result = imageContrast({
    data: IMAGE_DATA,
    adjustment: 30
});
```
