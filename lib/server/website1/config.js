// TO Set your node environment use command:
// set NODE_ENV=production
// on OSX
// export NODE_ENV=ci

// Manually overrule environment settings
// process.env.NODE_ENV = 'production';

var env = process.env.NODE_ENV;

if(env === 'cert'){
	exports.port = 2000;
	exports.themes = [];
} else if (env === 'production'){
	exports.port = 8089;
	exports.themes = [];
} else if (env === 'beta'){
	exports.port = 8089;
	exports.themes = [];
} else if (env === 'ci'){
	exports.port = 8101;
	exports.themes = [];
} else {
	exports.port = 8089;
	exports.themes = ['takeda', 'uva'];
}

exports.forbidden = ['key', 'profile', 'password', 'savedclipboards', 'alerts', 'saved'];
