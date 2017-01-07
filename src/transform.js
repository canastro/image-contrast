/**
 * Iterate over the array applying the contrast transformation
 * @name transform
 * @param {Object} data
 * @param {Number} length
 * @param {Object} options
 * @param {Number} [options.contrast]
 */
module.exports = function transform(data, length, options) {
    var factor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast));

    for (var i = 0; i < length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
};
