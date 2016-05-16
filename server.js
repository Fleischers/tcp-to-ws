// jshint node: true

'use strict';

/**
 * TCP to Websockets proxy server
 * @module tcp-to-ws
 */

var io = require('socket.io-client');
var net = require('net');

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
    var wsPort = options.wsPort || 8080;

    var server = net.createServer(function (tcp) {

    });

    var server = net.createServer((tcp) => {
      tcp.on('end', () => {
        console.log('client disconnected');
      });

      var ws = io('ws://' + wsHost + wsPort);
      ws.on('connect', function () {
        ws.on('message', function (msg) {
          tcp.write(msg);
        });

        tcp.on('data', function (data) {
          ws.send('message', data);
        });
      });
    });
    server.on('error', (err) => {
      throw err;
    });
    server.listen(tcpPort, () => {
      console.log('server bound');
    });

    server.listen(tcpPort);


    console.log('Listening for TCP connections to %d and redirecting them to ws://%s:%d', tcpPort, wsHost, wsPort);
    if (typeof callback === 'function') {
        callback(null, options);
    }
};


module.exports = new TWServer();
