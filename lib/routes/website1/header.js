var path = require('path');

exports.json = json;
exports.updateNotifications = updateNotifications;

function updateNotifications(req,res){
	if(req.body.notification) {
		req.session.notification = req.body.notification;
		res.json({valid:true})
	} else {
		delete req.session.notification;
		res.json({valid:true})
	}
};

function json(req,res){
	if(req.session.user === undefined){
	  	createSession(req)
	}
	var json = require(path.join(req.app.get('json'), req.params['language'], 'header.json'));

	if(req.session.notification){
		json.notificationCenter.notification = req.session.notification;
	} else {
		delete json.notificationCenter.notification;
	}

	try {
		if (req.session.user.loggedIn){
			json.loggedIn = true;	
			json.mainNav.conditionalLinks.in.link = req.session.user.username
		} else {
			json.loggedIn = false;
		}
	} catch (e){
		json.loggedIn = false;
	} finally {
		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
		res.header("Pragma", "no-cache");
		res.header("Expires", 0);
		res.json(json);
	}
};

function createSession(req){
	req.session['user'] = {"loggedIn" : false}
	
	//Set notifications
	req.session.notification = require(path.join(req.app.get('json'), 'notification.json')).notification

	//Check if user is mobile
  	if( /Android|webOS|iPhone|iPad|iPod|IEMobile|BlackBerry/i.test(req.headers['user-agent'])) {
		//User is mobile
		req.session.user['mobile'] = true;
		req.session.user['render'] = 'server';
	} else {
		//User is not mobile
		req.session.user['render'] = 'browser'
	}
};