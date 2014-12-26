function noop(obj, cb) {
    cb(null, obj);
}


var Frontside = {
    version: '0.6.3',
    models: {},
    views: {},


callDialog: function (dialog) {
        if (Frontside[dialog] === undefined) {
            require(["static/js/modules/" + dialog], function () {
                var model = Frontside[dialog],
                    view = Frontside[dialog + 'View'];

                model.id = dialog;
                model.show = true;
                view.setElement("#pop-ups");
                model.serverCheck();
            });
        } else {
            Frontside[dialog + 'View'].called();
        }
    },

    getModule: function (module, position) {
        require(["static/js/modules/" + module], function () {
            var model = Frontside[module],
                view = Frontside[module + 'View'];

            model.id = module;
            view.setElement(position);
            model.serverCheck();
        });
    },

    init: function () {
        var self = this,
            url = window.location.pathname.slice(window.location.pathname.indexOf('/'));

        require(['/conf/products.json'], function() {
            console.log(modules);
        });


        require(["static/js/components", "static/data/config" + url], function () {
            for (var i = 0; modules.length > i; i++) {
                var module = modules[i];
                self.getModule(module.moduleName, module.position);
            }
        });
    }
};

Frontside.models.Module = Backbone.Model.extend({
    jsonFetch: function () {
        var self = this;
        if (window.sessionStorage) {
            if (sessionStorage.getItem('language')) {
                this.urlRoot = '/module/' + sessionStorage.getItem('language');
            } else {
                this.urlRoot = '/module/en';
            }
        } else {
            this.urlRoot = '/module/en';
        }

        self.fetch({
            success: function (model, res) {
                Frontside[self.id + 'View'].render();
            }
        });
    },

    listenToNewMessages: function () {
        //First get current Messages
        var view = Frontside[this.id + 'View'];
        if (view.$el.find('.messageWrapper').length) {
            view.messageEl = $(view.el).find('.messageWrapper');
        }
        if (this.get('message') !== undefined) {
            if (view.messageEl) {
                //Already rendered in the correct place
            } else {
                var modelMessage = this.get('message');
                modelMessage.model = this.id;
                var filteredList = _.filter(message.get('message'), function (messageItem) {
                    return messageItem.model != this.id;
                });
                filteredList.push(modelMessage);
                message.set('message', filteredList);
            }
        }

        //Then listen for new ones
        this.on('change:message', function (model) {
            if (view.messageEl) {
                view.renderMessage();
            } else {
                var modelMessage = model.get('message');
                modelMessage.model = model.id;
                var filteredList = _.filter(message.get('message'), function (messageItem) {
                    return messageItem.model != model.id;
                });
                filteredList.push(modelMessage);
                message.set('message', filteredList);
            }
        });
    },

    serverCheck: function () {
        var self = this;
        if ($('html').hasClass('server')) {
            Frontside.views[self.id + 'View'].load();
        } else {
            self.jsonFetch();
        }
    }
});

Frontside.views.ModuleView = Backbone.View.extend({
    load: function () {
        this.model.listenToNewMessages(this.model);
        try {
            this.init();
        } catch (err) {
            //No Init Function guess no javascript functions here
        }
        try {
            this.model.init();
        } catch (err) {
            //No Init Function guess no javascript functions here
        }
    },

    render: function () {
        var self = this;
        dust.render(self.model.id, self.model.attributes, function (err, out) {
            self.$el.append(out);
            self.load();
        });
    },

    renderMessage: function () {
        var self = this;
        dust.render('message', this.model.attributes, function (err, out) {
            if (self.messageEl) {
                self.messageEl.html(out);
            } else {
                $('#messageWrapper').html(out);
            }
        });
    },

    rerender: function () {
        var self = this;
        dust.render(self.model.id, self.model.attributes, function (err, out) {
            if (!err) {
                self.$el.html(out);
            }
            else {
                console.log(err);
            }
        });
    },

    replaceRender: function (t, data, e) {
        var self = this;
        dust.render(t, data, function (err, out) {
            if (!err) {
                $(e).replaceWith(out);
            } else {
                console.log(err);
            }
        });
    }
});
