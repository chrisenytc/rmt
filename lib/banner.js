/*
 * rmt
 * https://github.com/chrisenytc/rmt
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/*
 * Module Dependencies
 */

var fs = require('fs'),
    banner = fs.readFileSync(__dirname + '/banner.txt', 'utf-8');

require('colors');

module.exports = function() {
    console.log();
    console.log(banner.white.bold);
    console.log();
    console.log('  RmT: A CLI tool to remove all your tweets at once');
    console.log();
    console.log('  Repo => '.bold.white + 'https://github.com/chrisenytc/rmt'.white);
    console.log('  Powered by => '.bold.white + 'Christopher EnyTC'.white);
    console.log();

};
