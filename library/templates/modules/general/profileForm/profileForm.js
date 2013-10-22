define([
	'frontside',
	'vendor/jquery.h5validate'
], function (Frontside) {
	ProfileForm = Frontside.models.Module.extend({
		defaults: {
			updatePath: 'users/update'
		}
	});
	ProfileFormView = Frontside.views.ModuleView.extend({
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
				url: self.model.get('updatePath'),
				data: $(e.currentTarget).serialize(),
				type: 'POST',
				success: function(res){
					var message = {'class': 'info', 'text': res.text, 'closeButton': false};
					self.model.set('message', message);
				}
			});
		}
	});

	Frontside.profileForm = new ProfileForm();
	Frontside.profileFormView = new ProfileFormView({model:Frontside.profileForm});
});