var path = require('path');

// All exported functions
exports.json = json;
exports.fill = fill;

function json(req,res){
	var User = req.app.get('User');
	var profileJson = require(path.join(req.app.get('json'), req.params['language'], 'profileForm.json'));
	
	User.findOne({ _id: req.session.user.id }, function (err, data) {
		if(err){
			throw err
			res.end()
		} else {
			var filledJson = fill(data, profileJson)
			res.json(filledJson)
		}
	})
};

function fill(data, json){
	var fields = json.fields;
	fields.map(function(field){
		
		if(field.dropdown){
			field.options.map(function(option){
				if(data[field.id.toLowerCase()] == option.value){
					option['selected'] = true;
				}
			})
		} 
		else if (field.textField){
			if(field.id.toLowerCase().indexOf('first') > -1){
				var correctValue = data['firstName']
			} else if(field.id.toLowerCase().indexOf('last') > -1){
				var correctValue = data['lastName']
			} else if(field.id.toLowerCase().indexOf('org') > -1){
				var correctValue = data['organization']
			} else if(field.id.toLowerCase().indexOf('mail') > -1){
				var correctValue = data['eMail']
			}
			field.value = correctValue;
		}
	});
	return json;
};