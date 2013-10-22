define([
    'frontside',
    'vendor/jquery.h5validate'
], function (Frontside) {
	ForgottenPassword = Frontside.models.FormDialog.extend({

	});

	ForgottenPasswordView = Frontside.views.FormDialogView.extend({
		init: function(){
			if(!Modernizr.input.required){
				$(self.el).find('form').h5Validate();
			}
		}
	});

	Frontside.forgottenPassword = new ForgottenPassword();
	Frontside.forgottenPasswordView = new ForgottenPasswordView({model: Frontside.forgottenPassword});
});