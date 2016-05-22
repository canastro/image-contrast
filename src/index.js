import { getCanvas } from './utils';
import work from 'webworkify';
import worker from './worker';

/**
 * @name getFactor
 * @param {number} contrast
 * @returns {number}
 * Get the contrast factor based on the provided contrast value
 */
function getFactor(contrast) {
    return (259 * (contrast + 255)) / (255 * (259 - contrast));
}

/**
 * @name apply
 * @param {number} nWorkers
 * @param {object} canvas
 * @param {object} context
 * @param {number} factor
 * @param {number} blockSize
 * @param {number} segmentLength
 * @returns {promise}
 */
function apply(nWorkers, canvas, context, factor, blockSize, segmentLength) {
    let w;
    let finished = 0;

    return new Promise((resolve) => {
        for (let index = 0; index < nWorkers; index++) {
            w = work(worker);

            w.addEventListener('message', (e) => {
                // Data is retrieved using a memory clone operation
                const resultCanvasData = e.data.result;
                const index = e.data.index;

                // Copying back canvas data to canvas
                // If the first webworker  (index 0) returns data, apply it at pixel (0, 0) onwards
                // If the second webworker  (index 1) returns data, apply it at pixel (0, canvas.height/4) onwards, and so on
                context.putImageData(resultCanvasData, 0, blockSize * index);

                finished++;

                if (finished === nWorkers) {
                    resolve(canvas.toDataURL());
                }
            });

            // Getting the picture
            const canvasData = context.getImageData(0, blockSize * index, canvas.width, blockSize);

            // Sending canvas data to the worker using a copy memory operation
            w.postMessage({
                data: canvasData,
                index,
                length: segmentLength,
                factor
            });
        }
    });
}

/**
 * @name contrastImage
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.contrast - contrast value to apply
 * @param {string} options.nWorkers - number of workers
 * @param {bool} options.asDataURL
 * @returns {promise}
 */
export default function contrastImage(options) {
    if (!options.data || !options.contrast) {
        throw new Error('image-contrast:: invalid options provided');
    }

    const nWorkers = options.nWorkers || 4;
    const factor = getFactor(options.contrast);
    const canvas = getCanvas(options.data.width, options.data.height);
    const context = canvas.getContext('2d');

    // Drawing the source image into the target canvas
    context.putImageData(options.data, 0, 0);

    const len = canvas.width * canvas.height * 4;
    const segmentLength = len / nWorkers; // This is the length of array sent to the worker
    const blockSize = canvas.height / nWorkers; // Height of the picture chunck for every worker

    return apply(
        nWorkers,
        canvas,
        context,
        factor,
        blockSize,
        segmentLength
    );

}
