const expect = require('chai').expect;
const transform = require('../src/transform');

describe('transform', function () {
    it('should apply transformation and return as imageData', function () {
        const data = [193, 219, 242, 255, 193, 219, 242, 255];
        const expectedData = [241.52578068264341, 286.9360929557008, 327.10675381263616, 255, 193, 219, 242, 255];

        transform(data, 4, { contrast: 70 });
        expect(data).to.deep.equal(expectedData);
    });
});
