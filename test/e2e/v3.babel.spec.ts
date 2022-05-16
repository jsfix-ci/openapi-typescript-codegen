'use strict';

const { executeBrowserTestsWithStaticClient, executeBrowserTestsWithInstanceClient } = require('./tests');
const compileWithBabel = require('./scripts/compileWithBabel');

describe('v3/babel', () => {
    describe('static client', () => {
        executeBrowserTestsWithStaticClient('v3/babel', 'v3', 'fetch', false, true, false, compileWithBabel);
    });

    describe('instance client', () => {
        executeBrowserTestsWithInstanceClient('v3/babel_client', 'v3', 'fetch', false, true, true, compileWithBabel);
    });
});
