//Internal Node Modules
var path = require('path')
	, http =  require('http')
	, fs = require('fs')
	, domain = require('domain')

//NPM installed node plugins
	, express = require('../../../node_modules/express')
	, dust = require('../../../node_modules/dustjs-linkedin')
	, cons = require('../../../node_modules/consolidate')
	, mongoStore = require('../../../node_modules/connect-mongo')(express)
	, mongoose = require('../../../node_modules/mongoose')

//General custom Elsevier modules
	, page = require('../../../lib/routes/page')
	, schemas = require('../../../lib/routes/schemas')
	, users = require('../../../lib/routes/users')
	, header = require('../../../lib/routes/header')
	, profile = require('../../../lib/routes/profile')
	, autoComplete = require('../../../lib/routes/autocomplete')
	, logger = require('../../../lib/routes/logger')

//Product specific Elsevier modules
	, emtree = require('./routes/emtree')
	, filters = require('./routes/filters')
	, savedClipboard = require('./routes/savedClipboard')
	, savedSearches = require('./routes/savedSearches')
	, sessionSearch = require('./routes/sessionSearch')
	, sessionClipboard = require('./routes/sessionClipboard')
	

//Config File
	, config = require('./config')
	, product ='website1';

//Connect to database
var userDB = mongoose.createConnection("mongodb://localhost/users", { server: { poolSize: 1 }});

//Create server
var app = express();

// Initialize server
var serverDomain = domain.create();
serverDomain.run(function () {
	var server = http.createServer(app).listen(config.port, function(){
		var timestamp = new Date().toUTCString();
		console.log('[ ' + timestamp + ' ] - Product:' + product, 'port:' + config.port, 'mode:' + app.settings.env);
	});

	//Template engine setting
	app.engine('dust', cons.dust);

	// Configuration for server
	app.configure(function(){
		app.set('domain', 'localhost');
		app.set('port', config.port);
		app.set('views', path.join(__dirname, '../', 'static', 'views'));
		app.set('json', path.join(__dirname, '../', 'static', 'data', 'json'))
		app.set('view engine', 'dust');
		app.set('User', userDB.model('User', schemas.user));
		app.set('forbiddenPages', config.forbidden);
		app.set('themes', config.themes);
		app.use(express.favicon());
		app.use(express.urlencoded());
		app.use(express.json());
		app.use(express.compress());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({
			secret: "backside-rodeo",
			cookie: { maxAge: 2 * 60 * 60 * 1000 },
			store: new mongoStore({ db: 'sessions' })
		}));
		app.use(express.logger('dev')); // 'default'
		app.use(app.router);
		app.use('/library', express.static(path.join(__dirname, '../../', 'library'), { maxAge: 1 * 1000 * 60 *60 }));
		app.use(express.static(path.join(__dirname, '../'), { maxAge: 1 * 1000 * 60 * 60 }));
			
		//Error Handler
		app.use(function errorHandler(err, req, res, next) {
			console.log("Error from module: " + req.url);
			console.log("Error description: " + err);
			var killtimer = setTimeout(function(res) {
				res.end(500);
			}, 3000);
			
		});
	});

	// Error Handler for development
	app.configure('development', function(){
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

});

serverDomain.on('error', function(er) {
	console.error('Caught error!', er);
});


if(app.settings.env === 'production') {

}

else {
	/*** Page Requests ***/
	app.get('/:title', function (req, res) {res.redirect(302, '/')});

	//header Actions
	app.get('/module/:language/header', header.json); //Header File
	app.put('/notifications', header.updateNotifications)

	app.get('/module/:language/profileForm', profile.json); //Profile File
	app.get('/module/:language/savedSearchesNav', savedSearches.json); //Saved Searches

	//Emtree
	app.get('/module/:language/emtreeDialog', emtree.json);
	app.get('/module/:language/emtreeModule', emtree.json);
	app.post('/emtreeSearch', emtree.termSearch);
	app.post('/emtreeBranch', emtree.branchSearch);

	//Session Searches
	app.get('/module/:language/sessionSearch', sessionSearch.json);
	app.post('/sessionSearch', sessionSearch.add);
	app.delete('/sessionSearch', sessionSearch.remove);

	//Session Clipboard
	app.get('/module/:language/sessionClipboard', sessionClipboard.json);
	app.post('/sessionClipboard', sessionClipboard.add);
	app.delete('/sessionClipboard', sessionClipboard.remove);

	//Autocomplete
	app.get('/autoComplete/:limit/:id', autoComplete.json);

	//Filters
	app.get('/module/:language/filters', filters.json);
	app.get('/filter/:id', filters.search);

	//Login and logout
	app.get('/users/logout', users.logout);
	app.post('/users/login', users.login);

	/*Register, update etc*/
	app.post('/users/register', users.register)
	app.post('/users/update', users.update);
	app.post('/users/password', users.changePassword);
	app.post('/users/addKey', users.addKey);

	//Fallback for generic modules
	app.get('/module/:language/:id', function (req, res) {
		if(req.session[req.params['id']]){
			var json = req.session[req.params['id']];
		} else {
			var json = require(path.join(req.app.get('json'), req.params['language'], req.params['id'] + '.json'));
		}
		res.json(json)
	})

	//Saving modules to Session
	app.put('/module/:id', function(req,res){
		req.session[req.params['id']] = req.body;
		res.end();
	})

	app.get('/:id', function (req, res, next) {
		var json = utils.getJson(req.params['id']);
		
		/*
		 *  Inititate anonymous function to make 
		 * json unique to local scope
		*/
		(function(json) {
			res.set("Connection", "close");
			res.render(req.params['id'], json, function(err, html){
				if(!err) {
					res.end(html);
				} else{
					throw err;	
				}
			});
		})(json);
	});
}