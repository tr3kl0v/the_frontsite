var path = require('path'),
	fs = require('fs'),
	http = require('http'),
	_ = require('underscore');

exports.init = init;

function init (req, res){
	//No session yet, let's fix that
	if(req.session.user === undefined){
	  	createSession(req)
	}
	// Check if requested page is only for logged In customers
	var noAccess = _.find(req.app.get('forbiddenPages'), function(page){ return page === path.basename(req.url, '.html'); });

	if(req.session.user.loggedIn === true){
		//Render!
		var theme = _.find(req.app.get('themes'), function(theme){ return theme == req.session.user.organization.toLowerCase()});
		render(req, res, theme)
	} else {
		//Trying to access a prohibited page
		if(noAccess){
			req.session['pageRequest'] = path.basename(req.url, '.html');
			res.redirect(302, '/login')
		} else {
			render(req, res)
		}
	}
}

function createSession(req){
	req.session['user'] = {"loggedIn" : false}
	
	//Set notifications
	req.session.notification = require(path.join(req.app.get('json'), 'notification.json')).notification
	console.log(req.session)
	//Check if user is mobile
  	if( /Android|webOS|iPhone|iPad|iPod|IEMobile|BlackBerry/i.test(req.headers['user-agent'])) {
		//User is mobile
		req.session.user['mobile'] = true;
		req.session.user['render'] = 'server';
	} else {
		//User is not mobile
		req.session.user['render'] = 'browser'
	}
}

function render(req, res, theme){
	var page = path.basename(req.url, '.html');

	if(theme){
		var jsonObject = {'theme': "-" + theme};
	} else {
		var jsonObject = {'theme': ''};
	}
	res.render(page, jsonObject, function(err, html){
		if(err) {
			console.log(err)
			res.redirect(302, '/404')
		} else{
			res.send(html)
		}
	});
}

	/*var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log(ip)
	var options = {
	  hostname: 'ci.elsevier.com',
	  port: 8081,
	  path: '/authenticationjsonapi',
	  method: 'GET',
	  headers: {
	  	clientip: ip,
	  	action: 'login'
	  }
	};

	var request = http.request(options, function(response) {
	  console.log('STATUS: ' + response.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(response.headers));
	  response.setEncoding('utf8');
	  response.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	  });
	});

	request.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	  console.log( e.stack );
	});
	request.end();*/