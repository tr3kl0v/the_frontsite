var path = require('path');
var winston = require('../../../node_modules/winston/lib/winston')


// setup logger
var l1 = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({ json: false, timestamp: true }),
		new (winston.transports.File)({ filename: path.join(__dirname, '../../', 'logs', 'access.log'), json: false  })
	],
	exceptionHandlers: [
    	new (winston.transports.Console)({ json: false, timestamp: true }),
    	new (winston.transports.File)({ filename: path.join(__dirname, '../../', 'logs', 'exceptions.log'), json: false  })
	],
  	exitOnError: false
});


module.exports = l1;
