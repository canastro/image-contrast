import { expect } from 'chai';
import { transform } from '../src/contrast';

describe('contrast', () => {

    it('should apply transformation and return as imageData', () => {
        const data = [
            193,
            219,
            242,
            255,
            193,
            219,
            242,
            255
        ];

        const expectedData = [
            225.5,
            264.5,
            299,
            255,
            193,
            219,
            242,
            255
        ];

        transform(data, 4, 1.50);
        expect(data).to.deep.equal(expectedData);
    });
});
