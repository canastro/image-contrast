function getFactor(contrast) {
    return (259 * (contrast + 255)) / (255 * (259 - contrast));
}

function transform(canvas, context, imageData, factor) {
    var data = imageData.data;
    data.forEach(function (item, i) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i+1] = factor * (data[i+1] - 128) + 128;
        data[i+2] = factor * (data[i+2] - 128) + 128;
    });

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

/**
 * @name contrastImage
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.adjustment - contrast value to apply
 */
module.exports = function contrastImage(options) {
    var factor;
    var result;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    if (!options.data || !options.adjustment) {
        throw new Error('image-brightness:: invalid options provided');
    }

    factor = getFactor(options.adjustment)
    result = transform(canvas, context, options.data, factor);

    return result;
}
