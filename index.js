/**
 * @name getCanvas
 * @param {number} w - width
 * @param {number} h - height
 * Create a canvas with the currect size
 */
function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

/**
 * @name getPixels
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 * Get a deep copy of the image data so we don't change the original imageData
 */
function getPixels(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * @name getFactor
 * @param {number} contrast
 * Get the contrast factor based on the provided contrast value
 */
function getFactor(contrast) {
    return (259 * (contrast + 255)) / (255 * (259 - contrast));
}

/**
 * @name transform
 * @param {object} imageData
 * @param {number} factor
 * Iterate over the array applying the contrast transformation
 */
function transform(imageData, factor) {
    var data = imageData.data;
    for (var i = 0; i < data.length; i+= 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i+1] = factor * (data[i+1] - 128) + 128;
        data[i+2] = factor * (data[i+2] - 128) + 128;
    }

    return imageData;
}

/**
 * @name convertToDataURL
 * @param {object} canvas
 * @param {object} context
 */
function convertToDataURL(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

/**
 * @name contrastImage
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.contrast - contrast value to apply
 * @param {bool} options.asDataURL
 */
module.exports = function contrastImage(options) {
    var factor;
    var result;
    var canvas;
    var context;

    if (!options.data || !options.contrast) {
        throw new Error('image-contrast:: invalid options provided');
    }

    canvas = getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = getPixels(canvas, context, options.data);

    factor = getFactor(options.contrast)
    result = transform(options.data, factor);

    if (options.asDataURL) {
        return convertToDataURL(canvas, context, result);
    }

    return result;
}
