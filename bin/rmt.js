#!/usr/bin/env node

/*
 * rmt
 * https://github.com/chrisenytc/rmt
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

/**
 * Module dependencies
 */

var program = require('commander'),
    updateNotifier = require('update-notifier'),
    Insight = require('insight'),
    pj = require('prettyjson').render,
    banner = require('../lib/banner.js'),
    RmT = require('..'),
    rmt,
    logged = false,
    path = require('path'),
    h = require('../lib/helpers.js'),
    debug = require('../lib/debugger.js'),
    pkg = require('../package.json'),
    configPath = path.join(__dirname, '..', 'lib', 'rmtConfig.json');

require('colors');

/*
 * RmT Insight
 */

var insight = new Insight({
    trackingCode: 'UA-26025686-5',
    packageName: pkg.name,
    packageVersion: pkg.version
});

// ask for permission the first time
if (insight.optOut === undefined) {
    return insight.askPermission();
}

insight.track('rmt', 'cli');

/*
 * RmT API
 */

if (h.exists(configPath)) {
    var config = require(configPath);
    rmt = new RmT(config.consumerKey, config.consumerSecret);
    if (config.accessTokenKey && config.accessTokenKey !== '' && config.accessTokenSecret && config.accessTokenSecret !== '') {
        logged = true;
        rmt.createClient(config.accessTokenKey, config.accessTokenSecret);
    } else {
        debug('  You need to login.\n  Login now:\n \n  $ rmt login', 'warning');
    }
} else {
    rmt = new RmT('consumerKey', 'consumerSecret');
    debug('  To start using RmT you need add your credentials: \n  $ rmt setup \n', 'info');
}

/*
 * RmT Response
 */

function response(err, res, pureJson) {
    if (err) {
        console.log('\n[ ' + 'Error'.red.bold + ' ] ==> ');
        debug(err.message || '');
    }
    if (res) {
        if (!pureJson) {
            console.log('\n[ ' + 'Response'.green.bold + ' ] ==> ');
            console.log();
            console.log(pj(res));
        } else {
            console.log(JSON.stringify(res, null, 4));
        }
    }
}

/*
 * RmT Bootstrap
 */

program
    .version(pkg.version, '-v, --version')
    .usage('command [option]'.white);

/*
 * RmT Options
 */

program
    .option('-j, --json', 'output as pure JSON');

program
    .option('-a, --all', 'remove all your tweets');

/*
 * RmT Setup
 */

program
    .command('setup')
    .description('Initial setup'.white)
    .action(function() {
        var prompts = [{
            type: 'input',
            name: 'consumerKey',
            message: 'Enter your twitter consumerKey: '
        }, {
            type: 'input',
            name: 'consumerSecret',
            message: 'Enter your twitter consumerKey: '
        }];
        //Ask
        rmt.prompt(prompts, function(answers) {
            rmt.setConfig(answers.consumerKey, answers.consumerSecret)
                .then(function(message) {
                    response(null, message);
                }).catch(function(err) {
                    response(err);
                });
        });
    });

/*
 * RmT Login
 */

program
    .command('login')
    .description('Authorize RmT to access your account'.white)
    .action(function() {
        rmt.login()
            .then(function(message) {
                response(null, message, program.json);
            })
            .catch(function(err) {
                response(err);
            });
    });

if (logged) {
    /*
     * RmT Logout
     */
    program
        .command('logout')
        .description('Remove your twitter credentials'.white)
        .action(function() {
            var prompts = [{
                type: 'confirm',
                name: 'logout',
                message: 'Are you sure you want to remove your twitter credentials?'
            }];
            //Ask
            rmt.prompt(prompts, function(answers) {
                if (answers.logout) {
                    rmt.logout()
                        .then(function(message) {
                            response(null, message, program.json);
                        })
                        .catch(function(err) {
                            response(err);
                        });
                }
            });
        });

    /*
     * RmT Profile
     */
    program
        .command('profile')
        .description('Show profile data'.white)
        .action(function() {
            rmt.profile()
                .then(function(data) {
                    response(null, data, program.json);
                })
                .catch(function(err) {
                    response(err);
                });
        });

    /*
     * RmT Show
     */
    program
        .command('show [limit]')
        .description('Show your tweets'.white)
        .action(function(limit) {
            rmt.show(limit)
                .then(function(data) {
                    response(null, data, program.json);
                })
                .catch(function(err) {
                    response(err);
                });
        });

    /*
     * RmT Remove
     */
    program
        .command('remove')
        .description('Remove your tweets'.white)
        .action(function() {
            rmt.remove(program.all)
                .then(function(message) {
                    response(null, message, program.json);
                })
                .catch(function(err) {
                    response(err);
                });
        });
}

/*
 * RmT on help ption show examples
 */

program.on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ rmt setup');
    console.log('    $ rmt login');
    console.log('');
});

/*
 * RmT Banner
 */

if (process.argv.length === 3 && process.argv[2] === '--help') {
    banner();
}

if (process.argv.length === 4 && process.argv[3] !== '--json') {
    banner();
} else {
    if (process.argv.length === 3 && process.argv[2] !== '--help') {
        banner();
    }
}

/*
 * RmT Process Parser
 */

program.parse(process.argv);

/*
 * RmT Default Action
 */

var notifier = updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
});

if (notifier.update) {
    notifier.notify(true);
}

if (process.argv.length === 2) {
    banner();
    program.help();
}
