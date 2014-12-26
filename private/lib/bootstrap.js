'use strict';

var views = require('./views');
var endgame = require('endgame');
var events = require('./events');
var settings = require('./settings');
var middleware = require('./middleware');
var debug = require('debuglog')('FrontSide/bootstrap');


module.exports = function (app, options) {

    endgame(options.uncaughtException);

    return settings(app, options)
        .then(views)
        .then(middleware)
        .then(events)
        .then(function complete() {
            debug('init complete');
        });
};
