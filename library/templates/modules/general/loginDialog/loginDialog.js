define([
    'frontside',
    'vendor/jquery.h5validate'
], function (Frontside) {
    LoginDialog = Frontside.models.FormDialog.extend({
        defaults: {
            loginPath: '/users/login'
        }

    });

    LoginDialogView = Frontside.views.FormDialogView.extend({
        init: function(){
            if(!Modernizr.input.required){
                $(self.el).find('form').h5Validate();
            }
        },

        events: {
            "click .forgotPassword": "forgotPassword",
            "click .closeButton": "closeWindow",
            "submit form":"formSubmit"
        },

        forgotPassword: function(e){
            e.preventDefault();
            Frontside.callDialog('forgottenPassword');
            $("#" + this.model.id).hide();
        },
        
        formSubmit: function(e){
            var self = this;
            e.preventDefault();
            $.ajax({
                url: self.model.get('loginPath'),
                data: $(e.currentTarget).serialize(),
                type: 'POST',
                success: function(res){
                    if(res.valid){
                        window.location = '/profile';
                    } else {
                        var message = {'class': 'info', 'text': res.text, 'closeButton': false};
                        self.model.set('message', message);
                    }
                }
            });
        }
    });

    Frontside.loginDialog = new LoginDialog();
    Frontside.loginDialogView = new LoginDialogView({model: Frontside.loginDialog});
});