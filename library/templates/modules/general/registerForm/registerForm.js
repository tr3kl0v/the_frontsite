define([
	'frontside',
	'vendor/jquery.h5validate'
], function (Frontside) {
	RegisterForm = Frontside.models.Module.extend({
		defaults: {
			registerPath: 'users/register'
		}
	});
	RegisterFormView = Frontside.views.ModuleView.extend({
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
				url: self.model.get('registerPath'),
				data: $(e.currentTarget).serialize(),
				type: 'POST',
				success: function(res){
					if(res.valid){
						window.location = '/home';
					} else {
						var message = {'class': 'info', 'text': res.text, 'closeButton': false};
						self.model.set('message', message);
					}
				}
			});
		}
	});
	Frontside.registerForm = new RegisterForm();
	Frontside.registerFormView = new RegisterFormView({model:Frontside.registerForm});
});
