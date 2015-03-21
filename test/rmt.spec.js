/*
 * rmt
 * https://github.com/chrisenytc/rmt
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies
 */

var chai = require('chai'),
    expect = chai.expect;

chai.should();

var Api = require('../lib/rmt.js');
var api = new Api('consumerKey', 'consumerSecret');

describe('rmt module', function() {
    describe('#constructor()', function() {
        it('should be a function', function() {
            expect(Api).to.be.a("function");
        });
    });
    describe('#instance()', function() {
        it('should be a object', function() {
            expect(api).to.be.a("object");
        });
    });
});

