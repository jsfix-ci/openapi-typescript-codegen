'use strict';

const {
    executeBrowserTestsWithStaticClient,
    executeBrowserTestsWithInstanceClient,
    executeBrowserTestsWithStaticClientOptionsTrue,
} = require('./tests');
const compileWithTypescript = require('./scripts/compileWithTypescript');

describe('v2/fetch', () => {
    describe('static client', () => {
        executeBrowserTestsWithStaticClient('v2/fetch', 'v2', 'fetch', false, false, false, compileWithTypescript);
    });

    describe('static client with options', () => {
        executeBrowserTestsWithStaticClientOptionsTrue('v2/fetch_options', 'v2', 'fetch', compileWithTypescript);
    });

    describe('instance client', () => {
        executeBrowserTestsWithInstanceClient(
            'v2/fetch_client',
            'v2',
            'fetch',
            false,
            false,
            true,
            compileWithTypescript
        );
    });
});
