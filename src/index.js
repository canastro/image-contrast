var utils = require('./utils');

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

    canvas = utils.getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = utils.getPixels(canvas, context, options.data);

    factor = getFactor(options.contrast)
    result = transform(options.data, factor);

    if (options.asDataURL) {
        return utils.convertToDataURL(canvas, context, result);
    }

    return result;
}
