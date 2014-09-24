var startStopDaemon = require('start-stop-daemon');
var applauncher = require('./server');
var config = require('./config');

// connection configuration to pass on to couchbase.connect(). Note that
// while connecting with the server we are also opening the late rooms website
// bucket.

var daemonConfig = {
    outFile: './log/appOutFile.log',
    errFile: './log/appErrFile.log',
    max: 1 //the script will run 1 times at most
};

// Check if this file has been loaded directly from node. We don't want people require-ing this file.
if (require.main == module) {
    startStopDaemon(daemonConfig, function() {
        console.log('Starting application');
        applauncher.start(config);
    });
}