'use strict';

var meddleware = require('meddleware');
var debug = require('debuglog')('FrontSide/middleware');


module.exports = function middleware(app) {
    var config;

    debug('initializing middleware');
    config = app.frontside.get('middleware') || {};
    app.use(app.settings.mountpath, meddleware(config));

    return app;
};
