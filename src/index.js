var imageFilterCore = require('image-filter-core');
var transform = require('./transform');

/**
 * @name contrast
 * @param {ImageData} data - data of a image extracted from a canvas
 * @param {Object} options - options to pass to the transformation function
 * @param {Number} [options.contrast] - contrast value to apply in the transformation
 * @param {Number} nWorkers - number of workers
 * @returns {Promise}
 */
module.exports =  function contrast(data, options, nWorkers) {
    if (!data || !options || !options.contrast) {
        throw new Error('image-filter-contrast:: invalid options provided');
    }

    return imageFilterCore.apply(data, transform, options, nWorkers);
};
