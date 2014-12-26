'use strict';

var Bluebird = require('bluebird');
var path = require('path');
var confit = require('confit');
var handlers = require('shortstop-handlers');
var ssresolve = require('shortstop-resolve');


function createHandlers(options) {
    var result;

    result = {
        file:    handlers.file(options.basedir),
        path:    handlers.path(options.basedir),
        base64:  handlers.base64(),
        env:     handlers.env(),
        require: handlers.require(options.basedir),
        exec:    handlers.exec(options.basedir),
        glob:    handlers.glob(options.basedir)
    };

    Object.keys(options.protocols).forEach(function (protocol) {
        result[protocol] = options.protocols[protocol];
    });

    return result;
}

function configPath(prefix) {
  return path.join(prefix, 'config');
}


exports.create = function create(options) {
    var deferred, appProtocols, baseProtocols, baseFactory, appFactory;

    deferred = Bluebird.pending();
    appProtocols = createHandlers(options);
    baseProtocols = createHandlers(options);

    appProtocols.resolve = ssresolve(configPath(options.basedir));
    baseProtocols.resolve = ssresolve(configPath(path.dirname(__dirname)));

    baseFactory = confit({ basedir: configPath(path.dirname(__dirname)), protocols: baseProtocols });
    baseFactory.create(function(err, baseConf) {
        if (err) {
            deferred.reject(err);
            return;
        }

        appFactory = confit({
          basedir: configPath(options.basedir),
          protocols: appProtocols
        });
        appFactory.create(function(err, appConf) {
            if (err) {
                deferred.reject(err);
                return;
            }

            baseConf.merge(appConf);
            deferred.resolve(baseConf);
        });
    });

    return deferred.promise;
};
