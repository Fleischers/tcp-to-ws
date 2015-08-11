#!/usr/bin/env node

var info = require('./../package');
var args = require('minimist')(process.argv.slice(2), {
    string: [
        'remote-host'
    ],
    default: {

    },
    alias: {
        v: 'version',
        p: 'local-port',
        h: 'help'

    },
    unknown: function (cmd) {
        process.exit('\'%s\' is not a tcp-to-ws option. See \'tcp-to-ws --help\'.', cmd);
    }
});
if (args.version) {
    console.log('v' + info.version);
} else if (args.help) {
    console.warn('no help for you!');
} else {
    var proxy = require('./../server');
    var options = {};
    proxy.start(options);
}
