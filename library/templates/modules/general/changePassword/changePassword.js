define([
    'frontside',
    'vendor/jquery.h5validate'
], function (Frontside) {
	ChangePassword = Frontside.models.Module.extend({
		defaults:{
			"changePath":"/users/password"
		}
	});

	ChangePasswordView = Frontside.views.ModuleView.extend({
		init: function(){
			if(!Modernizr.input.required){
				$(self.el).find('form').h5Validate();
			}
		},

		events: {
			"submit form":"formSubmit"
		},

		formSubmit: function(e){
			var self = this;
			e.preventDefault();
			$.ajax({
				url: self.model.get('changePath'),
				data: $(e.currentTarget).serialize(),
				type: 'POST',
				success: function(res){
					var message = {'class': 'info', 'text': res.text};
					self.model.set('message', message);
					if(res.valid){
						self.rerender();
					}
				}
			});
		}
	});

	Frontside.changePassword = new ChangePassword();
	Frontside.changePasswordView = new ChangePasswordView({model: Frontside.changePassword});
});