let utils = require('./utils');
let work = require('webworkify');

const nWorkers = 4;

/**
 * @name getFactor
 * @param {number} contrast
 * Get the contrast factor based on the provided contrast value
 */
function getFactor(contrast) {
    return (259 * (contrast + 255)) / (255 * (259 - contrast));
}

function apply(canvas, context, factor, blockSize, segmentLength) {
    let w;
    let finished = 0;

    return new Promise((resolve) => {
        for (let index = 0; index < nWorkers; index++) {
            w = work(require('./worker.js'));

            w.addEventListener('message', function (e) {
                // Data is retrieved using a memory clone operation
                const resultCanvasData = e.data.result;
                let index = e.data.index;

                // Copying back canvas data to canvas
                // If the first webworker  (index 0) returns data, apply it at pixel (0, 0) onwards
                // If the second webworker  (index 1) returns data, apply it at pixel (0, canvas.height/4) onwards, and so on
                context.putImageData(resultCanvasData, 0, blockSize * index);

                finished++;

                if (finished == nWorkers) {
                    console.log('finished!!');
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
 * @param {bool} options.asDataURL
 */
export default function contrastImage(options) {
    let factor;
    let canvas;
    let context;

    let len;
    let segmentLength;

    if (!options.data || !options.contrast) {
        throw new Error('image-contrast:: invalid options provided');
    }

    factor = getFactor(options.contrast);
    canvas = utils.getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    // Drawing the source image into the target canvas
    context.putImageData(options.data, 0, 0);

    len = canvas.width * canvas.height * 4;
    segmentLength = len / nWorkers; // This is the length of array sent to the worker
    const blockSize = canvas.height / nWorkers; // Height of the picture chunck for every worker

    return apply(
        canvas,
        context,
        factor,
        blockSize,
        segmentLength
    );

}
