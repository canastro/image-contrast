import { transform } from './contrast';

module.exports = function (self) {
    self.addEventListener('message', (e) => {
        const factor = e.data.factor;

        const canvasData = e.data.data;
        const binaryData = canvasData.data;

        const length = e.data.length;
        const index = e.data.index;

        transform(binaryData, length, factor);

        self.postMessage({
            result: canvasData,
            index
        });
    });
};
