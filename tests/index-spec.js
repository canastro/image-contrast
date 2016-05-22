import sinon from 'sinon';
import { expect } from 'chai';
import * as utils from '../src/utils';
import imageContrast from '../src/index';
import 'babel-polyfill';

describe('index', () => {
    var sandbox;
    var canvas;
    var context;

    beforeEach(() => {
        // Create a sandbox for the test
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        // Restore all the things made through the sandbox
        sandbox.restore();
    });

    beforeEach(() => {
        context = {
            getImageData: sandbox.stub(),
            putImageData: sandbox.stub()
        };

        canvas = {
            width: 100,
            height: 150,
            getContext: sandbox.stub().returns(context)
        };

        sandbox.stub(utils, 'getCanvas').returns(canvas);
    });

    it('should throw error by missing parameters', () => {
        const fn = () => {
            imageContrast({});
        };

        expect(fn).to.throw(/image-contrast:: invalid options provided/);
    });

    it.skip('should apply transformation and return as imageData', () => {
        var imageData = {
            data: [193, 219, 242, 255]
        };

        // const expectedData = {
        //     data: [224.34440379022422, 262.88216530631394, 296.9732620320856, 255]
        // };

        imageContrast({
            data: imageData,
            contrast: 50
        }).then((result) => {
            console.log(result);
        });
    });
});
