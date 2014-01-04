var _ = require('underscore');

exports.register = function (req, res) {
	var User = req.app.get('User');
	User.findOne({ username: req.body.username }, function (err, data) {
		if (err) {
		  	console.log(err);
		  	res.send({valid:false, "error": "Something went wrong please try again"});
		} else if (data != null){
		  	res.send({valid:false, "error": "Username already exists"});
		} else {
		  	var newUser = new User({ 
				title: req.body.title, 
				firstName: req.body.firstName, 
				lastName: req.body.lastName,
				organization: req.body.organization,
				country: req.body.country,
				language: req.body.language,
				eMail: req.body.email,
				username: req.body.username,
				password: req.body.password,
				subscriptionKey: req.body.subscriptionKey
			});
			newUser.save(function (err, newUser) {
				if (err) {
				  	console.log(err);
				  	res.send({valid:false, "error": "Oops something went wrong during saving"});
			  	} else {
			  		res.send({valid:true});
			  	}
			});
		}
	})
}

exports.logout = function (req, res){
	delete req.session.user.id;
	delete req.session.user.username;
	req.session.user.loggedIn = false;
	req.session.user.organization = '';
	res.redirect(302, '/home')
}

exports.login = function (req, res){
	var User = req.app.get('User');
	User.findOne({ username: req.body.username }, function (err, data) {
		if (err) {
		  	console.log(err);
		  	res.send({valid:false, text: "Something went wrong please try again"});
		} else if (data == null){
		  	res.send({valid:false, text: "Username not found"});
		} else {
			if(data.password != req.body.password){
				res.send({valid:false, text: "Username and password do not match"});
			} else {
				req.session.user.id = data.id,
				req.session.user.username = data.username,
				req.session.user.loggedIn = true,
				req.session.user.organization = data.organization
				if(req.session.pageRequest !== undefined){
					var redirectPage = req.session.pageRequest
					delete req.session.pageRequest;
					res.redirect(302, '/' + redirectPage);
				} else {
					res.send({
						valid:true
					});
				}
			}
		}
	})
}

exports.update = function (req, res){
	var User = req.app.get('User');
	//console.log('ja');
	User.findOne({ _id: req.session.user.id }, function (err, data) {
		if (err) {
		  	console.log(err);
		  	res.send({valid:false, text: "Something went wrong"});
		} else {

			try{
				data.title = req.body.title,
			    data.firstName = req.body.firstName,
			    data.lastName = req.body.lastName,
			    data.organization = req.body.organization,
			    data.country = req.body.country,
			    data.language = req.body.language,
			    data.eMail = req.body.eMail
				data.save(function (err, data) {
					if (err) {
					  	console.log(err);
					  	res.send({valid:false, text: "Oops something went wrong during saving"});
					} else {
						req.session.user.organization = data.organization,
						req.session.user.language = data.language
					  	res.send({
							valid:true,
							text: "Your Profile has been updated"
						});
					}
				});
			} catch(e){
				res.send({valid:false, text: "Oops something went wrong during saving"});
			}			
		}
	})
}

exports.changePassword = function (req, res){
	var User = req.app.get('User');
	User.findById(req.session.user.id, function (err, data) {
		if (err) {
		  	console.log(err);
		  	res.send({valid:false, text: "Something went wrong"});
		} else if (data == null) {
		  	res.send({valid:false, text: "Username not found"});
		} else {
			if(data.password !== req.body.oldPassword){
				res.send({valid:false, text: "Incorrect Password"});
			} else {
				data.password = req.body.newPassword;
				data.save(function (err, data) {
					if (err) {
					  	console.log(err);
					  	res.send({valid:false, text: "Oops something went wrong during saving"});
					} else {
					  	res.send({
							valid:true,
							text: "Your Password has been updated"
						});
					}
				});
			}
		}
	})
}

exports.addKey = function (req, res){
	var User = req.app.get('User');
	User.findOne({ username: req.body.username }, function (err, data) {
		if (err) {
		  	console.log(err);
		  	res.send({valid:false, text: "Username not found"});
		} else if (data == null) {
		  	res.send({valid:false, text: "Username not found"});
		} else {
			if(data.password !== req.body.password){
				res.send({valid:false, text: "Incorrect Password"});
			} else {
				data.subscriptionKey = req.body.key;
				data.save(function (err, data) {
					if (err) {
					  	console.log(err);
					  	res.send({valid:false, text: "Oops something went wrong during saving"});
					} else {
					  	res.send({
							valid:true,
							text: "Subscription Key has been added"
						});
					}
				});
			}
		}
	})
}