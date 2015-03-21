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
    _ = require('underscore');

/**
@class Helpers
 */

/*
 * Public Methods
 */

/**
 * Method responsible for check if path exists
 *
 * @example
 *
 *     helpers.exists('./rmt');
 *
 * @method exists
 * @public
 * @param {String} path File path of archive
 * @return {String} Returns true if file exists
 */

exports.exists = function exists(path) {
    return fs.existsSync(path);
};

/**
 * Method responsible for reading files and get content
 *
 * @example
 *
 *     helpers.read('./rmt');
 *
 * @method read
 * @public
 * @param {String} fillepath File path of archive
 * @return {String} Returns file content
 */

exports.read = function readFile(filepath) {
    //Read and return this file content
    return fs.readFileSync(filepath, 'utf-8');
};

/**
 * Method responsible for writing files
 *
 * @example
 *
 *     helpers.write('./rmt', 'string data');
 *
 * @method write
 * @public
 * @param {String} fillePath File path of archive
 * @param {String} data Data of file
 */

exports.write = function writeFile(filePath, data) {
    //Read and return this file content
    if (exports.exists(filePath)) {
        var objData = require(filePath);
        _.extend(objData, data);
        //Write
        fs.writeFileSync(filePath, JSON.stringify(objData, null, 4));
    } else {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    }
};

/**
 * Method responsible for demove files
 *
 * @example
 *
 *     helpers.remove('./rmt');
 *
 * @method remove
 * @public
 * @param {String} path File path of archive
 */

exports.remove = function remove(path) {
    fs.unlinkSync(path);
};

/**
 * Method responsible for demove directories
 *
 * @example
 *
 *     helpers.rm('./rmt');
 *
 * @method rm
 * @public
 * @param {String} path File path of directory
 */

exports.rm = function rm(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + '/' + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                exports.rm(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/**
 * Method responsible for check if path is a file
 *
 * @example
 *
 *     helpers.isFile('./rmt');
 *
 * @method isFile
 * @public
 * @param {String} path File path of archive
 * @return {String} Returns true if path is file
 */

exports.isFile = function isFile(path) {
    var f = fs.stat(path);
    return f.isFile();
};

/**
 * Method responsible for check if path is a directory
 *
 * @example
 *
 *     helpers.isDir('./rmt');
 *
 * @method isDir
 * @public
 * @param {String} path File path of archive
 * @return {String} Returns true if path is directory
 */

exports.isDir = function isDir(path) {
    var f = fs.stat(path);
    return f.isDirectory();
};
