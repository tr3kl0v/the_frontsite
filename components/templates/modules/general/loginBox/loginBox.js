define([
    'frontside',
    'vendor/jquery.h5validate'
], function (Frontside) {
    LoginBox = Frontside.models.Module.extend({
        defaults: {
            loginPath: '/users/login'
        }

    });

    LoginBoxView = Frontside.views.ModuleView.extend({
        init: function(){
            if(!Modernizr.input.required){
                $(self.el).find('form').h5Validate();
            }
        },
        
        events: {
            "click .forgotPassword": "forgotPassword",
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

    Frontside.loginBox = new LoginBox();
    Frontside.loginBoxView = new LoginBoxView({model: Frontside.loginBox});
});