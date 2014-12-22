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
});(function(){dust.register("loginBox",body_0);function body_0(chk,ctx){return chk.write("<article class=\"formWrapper\" id=\"loginBox\"><h2>").reference(ctx._get(false, ["title"]),ctx,"h").write("</h2><form class=\"form\" action=\"/users/login\" method=\"post\"><p class=\"description\">").reference(ctx._get(false, ["description"]),ctx,"h").write("</p>").section(ctx._get(false, ["fields"]),ctx,{"block":body_1},null).partial("textButton",ctx,null).write("<section class=\"field operators\">").partial("submitButton",ctx,null).write("</section>").partial("unorderedList",ctx,null).write("</form></article>");}function body_1(chk,ctx){return chk.partial("textField",ctx,null).partial("passwordField",ctx,null);}return body_0;})();