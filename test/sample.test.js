'use strict';
const {Alexa} = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    });
}
