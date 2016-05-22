/**
 * @name getCanvas
 * @param {number} w - width
 * @param {number} h - height
 * @returns {object}
 */
export function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}
