// startup arguments
var args = process.argv.splice(2).toString();

// Dependencies
var walk = require('walkdir'),
	path = require('path'),

// Print Logo
logo = require('./routes/logo');
logo.print();


if (args == "all"){

	var configFolder = path.join(__dirname, '../')

	walk(configFolder, function(filepath, stat) {
		if (filepath.indexOf(".svn") === -1 && filepath.indexOf("library") === -1) {

			if(filepath.indexOf('app.js') > -1){
				require(filepath)
			}
		}
	})
}
else if (args == 'tests') {
	require('./tests/app');
}
else {
	var product = require('../' + args + '/server/app');
}