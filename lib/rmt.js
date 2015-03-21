/*
 * rmt
 * https://github.com/chrisenytc/rmt
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module Dependencies
 */

var inquirer = require('inquirer'),
    Twitter = require('twitter'),
    TwitterPinAuth = require('twitter-pin-auth'),
    P = require('bluebird'),
    _ = require('underscore'),
    async = require('async'),
    open = require('open'),
    join = require('path').join,
    debug = require('./debugger.js'),
    h = require('./helpers.js');

require('colors');

/**
 * @class RmT
 *
 * @constructor
 *
 * Constructor responsible for provide twitter authorization
 *
 * @example
 *
 *     var api = new RmT('consumerKey', 'consumerSecret');
 *
 * @param {String} consumerKey The twitter consumer key
 * @param {String} consumerSecret The twitter consumer secret
 */

var RmT = module.exports = function RmT(consumerKey, consumerSecret) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.accessTokenKey = '';
    this.accessTokenSecret = '';
    this.tpa = new TwitterPinAuth(this.consumerKey, this.consumerSecret);
    this.client = null;
};

/*
 * Public Methods
 */

/**
 * Method responsible for asking questions
 *
 * @example
 *
 *     api.prompt(prompts, cb);
 *
 * @method prompt
 * @public
 * @param {Object} prompts Array of prompt options
 * @param {Function} cb A callback
 */

RmT.prototype.prompt = function prompt(prompts, cb) {
    inquirer.prompt(prompts, function(answers) {
        cb(answers);
    });
};

/**
 * Method responsible for create twitter client instance
 *
 * @example
 *
 *     api.createClient('accessTokenKey', 'accessTokenSecret');
 *
 * @method createClient
 * @public
 * @param {String} accessTokenKey The twitter access token key
 * @param {String} accessTokenSecret The twitter access token secret
 */

RmT.prototype.createClient = function createClient(accessTokenKey, accessTokenSecret) {
    this.client = new Twitter({
        consumer_key: this.consumerKey,
        consumer_secret: this.consumerSecret,
        access_token_key: accessTokenKey,
        access_token_secret: accessTokenSecret
    });
};

/**
 * Method responsible for save consumer credentials
 *
 * @example
 *
 *     api.setConfig('consumerKey', 'consumerSecret', function(err, data) {
 *          console.log(data);
 *     });
 *
 * @method setConfig
 * @public
 * @param {String} consumerKey The twitter consumer key
 * @param {String} consumerSecret The twitter consumer secret
 * @param {Function} cb A callback with error and api response
 */

RmT.prototype.setConfig = function setConfig(consumerKey, consumerSecret, cb) {
    return new P(function(resolve, reject) {
        //Write config
        if (consumerKey && consumerKey !== '' && consumerSecret && consumerSecret !== '') {
            h.write(join(__dirname, 'rmtConfig.json'), {
                consumerKey: consumerKey,
                consumerSecret: consumerSecret
            });
            resolve('Settings updated successfully!');
        } else {
            reject(new Error('Setup failed. Try again!'));
        }
    }).nodeify(cb);
};

/**
 * Method responsible for login
 *
 * @example
 *
 *     api.login(function(err, data) {
 *          console.log(data);
 *     });
 *
 * @method login
 * @public
 * @param {Function} cb A callback with error and api response
 */

RmT.prototype.login = function login(cb) {
    var that = this;
    return new P(function(resolve, reject) {
        //Get authUrl
        that.tpa.requestAuthUrl()
            .then(function(url) {
                debug('In your browser, on the opened window by RmT, log in to your twitter account, click on "Authorize" button and enter the PIN number below.', 'info');
                console.log();
                //Open authorize url
                open(url);
                //Ask
                that.prompt([{
                    type: 'input',
                    name: 'pin',
                    message: 'Enter the pin number: '
                }], function(answers) {
                    that.tpa.authorize(answers.pin)
                        .then(function(data) {
                            //Write config
                            if (data.accessTokenKey && data.accessTokenKey !== '' && data.accessTokenSecret && data.accessTokenSecret !== '') {
                                h.write(join(__dirname, 'rmtConfig.json'), {
                                    accessTokenKey: data.accessTokenKey,
                                    accessTokenSecret: data.accessTokenSecret
                                });
                                resolve('Logged successfully!');
                            } else {
                                reject(new Error('Login failed. Try again!'));
                            }
                        }).catch(function(err) {
                            reject(err);
                        });
                });
            }).catch(function(err) {
                reject(err);
            });
    }).nodeify(cb);
};

/**
 * Method responsible for remove twitter credentials
 *
 * @example
 *
 *     api.logout(function(err, message) {
 *          console.log(message);
 *     });
 *
 * @method logout
 * @public
 * @param {Function} cb A callback with error and api response
 */

RmT.prototype.logout = function logout(cb) {
    return new P(function(resolve) {
        //Write config
        h.write(join(__dirname, 'rmtConfig.json'), {
            accessTokenKey: '',
            accessTokenSecret: ''
        });
        resolve('Your twitter credentials has been removed successfully!');
    }).nodeify(cb);
};

/**
 * Method responsible for showing the user profile
 *
 * @example
 *
 *     api.profile();
 *
 * @method profile
 * @public
 * @param {Function} cb A callback with error and api response
 */

RmT.prototype.profile = function profile(cb) {
    var that = this;
    return new P(function(resolve, reject) {
        that.client.get('account/verify_credentials', function(err, data) {
            if (err) {
                reject(new Error(err[0].message));
            } else {
                resolve({
                    id: data.id_str,
                    name: data.name,
                    username: data.screen_name,
                    location: data.location,
                    followers: data.followers_count,
                    tweets: data.statuses_count,
                    createdAt: data.created_at
                });
            }
        });
    }).nodeify(cb);
};

/**
 * Method responsible for show your all tweets
 *
 * @example
 *
 *     api.show();
 *
 * @method show
 * @public
 * @param {Number} limit A number to limit the number of tweets returned
 * @param {Function} cb A callback with error and api response
 */

RmT.prototype.show = function show(limit, cb) {
    var that = this;
    return new P(function(resolve, reject) {
        that.client.get('statuses/user_timeline', {
            count: limit
        }, function(err, tweets) {
            if (err) {
                reject(new Error(err[0].message));
            } else {
                if (limit) {
                    var tweetsList = _.map(tweets, function(tweet) {
                        return tweet.text;
                    });
                    resolve(tweetsList);
                } else {
                    resolve(tweets[0].text);
                }
            }
        });
    }).nodeify(cb);
};

/**
 * Method responsible for delete all tweets
 *
 * @example
 *
 *     api.remove();
 *
 * @method remove
 * @public
 * @param {Boolean} removeAll A boolean to enable to remove all tweets
 * @param {Function} cb A callback with error and api response
 */

RmT.prototype.remove = function remove(removeAll, cb) {
    var that = this;
    return new P(function(resolve, reject) {
        that.client.get('statuses/user_timeline', {
            include_rts: true
        }, function(err, tweets) {
            if (err) {
                reject(new Error(err[0].message));
            } else {
                var msg;
                if (removeAll) {
                    msg = 'You really want to remove all your tweets?';
                } else {
                    msg = 'You really want to remove your last tweet?';
                }
                that.prompt([{
                    type: 'confirm',
                    name: 'remove',
                    message: msg
                }], function(answers) {
                    if (answers.remove) {
                        if (removeAll) {
                            async.eachSeries(tweets, function(tweet, callback) {
                                debug('Removing ' + ' "'.red + tweet.text.white + '"'.red, 'error');
                                that.client.post('statuses/destroy/' + tweet.id_str, function(err) {
                                    if (err) {
                                        callback(new Error(err[0].message));
                                    } else {
                                        callback();
                                    }
                                });
                            }, function(err) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve('All your tweets are deleted successfully!');
                                }
                            });
                        } else {
                            debug('Removing ' + ' "'.red + tweets[0].text.white + '"'.red, 'error');
                            that.client.post('statuses/destroy/' + tweets[0].id_str, function(err) {
                                if (err) {
                                    reject(new Error(err[0].message));
                                } else {
                                    resolve('Tweet removed successfully!');
                                }
                            });
                        }
                    } else {
                        process.exit(1);
                    }
                });
            }
        });
    }).nodeify(cb);
};
