import { expect } from 'chai';
import sinon from 'sinon';
import worker from '../src/worker';
import * as contrast from '../src/contrast';

describe('worker', () => {
    let self;

    beforeEach(() => {
        self = {
            postMessage: sinon.stub(),
            close: sinon.stub()
        };

        sinon.stub(contrast, 'transform');
    });

    context('message', () => {
        it('should make a postMessage and close itself', (done) => {

            self.addEventListener = (type, fn) => {
                const e = {
                    data: {
                        params: {
                            factor: 1.5
                        },
                        data: {
                            data: [
                                193,
                                219,
                                242,
                                255,
                                193,
                                219,
                                242,
                                255
                            ]
                        },
                        length: 8,
                        index: 0
                    }
                };

                fn(e);

                expect(self.postMessage.calledWith({
                    result: [
                        225.5,
                        264.5,
                        299,
                        255,
                        193,
                        219,
                        242,
                        255
                    ],
                    index: 0
                }));
                expect(self.postMessage.calledOnce).to.equal(true);
                expect(self.close.calledOnce).to.equal(true);

                done();
            };

            worker(self);


        });
    });
});
