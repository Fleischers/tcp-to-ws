// jshint node: true

'use strict';

/**
 * TCP to Websockets proxy server
 * @module tcp-to-ws
 */


/**
 * @constructor
 */
function TWServer() {}

TWServer.prototype.start = function (options, callback) {
    if (typeof options === 'function' && callback === undefined) {
        callback = options;
        options = {};
    }

    var tcpPort = options.tcpPort || 4001;
    var wsHost = options.wsHost || 'localhost';
    var wsPort = options.wsPort || 80;

    console.log('Listening for TCP connections to %d and redirecting them to ws://%s:%d', tcpPort, wsHost, wsPort);
    if (typeof callback === 'function') {
        callback(null, options);
    }
};


module.exports = new TWServer();
