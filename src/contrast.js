/**
 * @name transform
 * @param {object} data
 * @param {number} length
 * @param {number} factor
 * Iterate over the array applying the contrast transformation
 */
exports.transform = function (data, length, factor) {
    for (let i = 0; i < length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
};
