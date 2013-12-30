define([
    'frontside',
    'vendor/jquery.outside.1.1.min'
], function (Frontside) {
    Header = Frontside.models.Module.extend({
        removeNotification: function(subHead){
            var self = this,
                notifications = this.get('mainNav').notificationCenter.notification,
                newList = _.filter(notifications, function(notification, pos){
                return notification.subHead != subHead;
            });
            this.get('mainNav').notificationCenter.notification = newList;

            $.ajax({
                url: '/notifications',
                data: {'notification': newList},
                method: 'put'
            });
        }
    });

    HeaderView = Frontside.views.ModuleView.extend({
        init:function(){
            this.changeEvents();
            this.outsideClick();
        },

        events: {
            "click .loginButton" :"loginCall",
            "click .notificationButton" : "notificationCall",
            "click .notification .closeButton": "removeNotificationClick",
            "click .expand": "fullScreen",
            "click .contract": "exitFullScreen"
        },

        changeEvents: function(){
            var self = this;
            this.model.on('change:fullScreen', function(model){
                self.rerender();
            });
        },

        exitFullScreen: function(e){
            e.preventDefault();
            var self = this;
            footer.set('fullScreen', false);
            $('body').animate({'padding-top': '45'}, 500);
            $('.pageHeader').animate({top: '-0'}, 500, function(){
                header.set('fullScreen', false);
            });
            $('#pageFooter, #wrapper').removeAttr('style');
        },

        fullScreen: function(e){
            e.preventDefault();
            var self = this;
            $('#pageFooter').css('overflow', 'hidden').animate({height: '0'}, 500);
            $('body').animate({'padding-top': '0'}, 500);
            $('.pageHeader').animate({top: '-41'}, 500);
            $('#wrapper').animate({'height': '100%'}, 500, function(){
                header.set('fullScreen', true);
                footer.set('fullScreen', true);
            });
        },

        outsideClick: function(){
            $(".notificationCenter").bind( "clickoutside", function(e){
                $(".flyout").fadeOut(200);
            });
        },
        
        loginCall: function(){
            Frontside.callDialog('loginDialog');
        },

        notificationCall: function(e){
            e.preventDefault();
            $(".flyout").fadeToggle(200);
        },

        removeNotificationClick: function(e){
            e.preventDefault();
            var self = this,
                subHead = $(e.currentTarget).nextAll('h4').html();

            $(e.currentTarget).parent().fadeOut(200, function(){
                self.model.removeNotification(subHead);
                dust.render('notificationCenter', self.model.get('mainNav'), function(err, out){
                    if(!err){
                        $(".notificationCenter").replaceWith(out);
                        $(".flyout").show();
                    }
                });
            });
        }

    });

    Frontside.header = new Header();
    Frontside.headerView = new HeaderView({model: Frontside.header});
});