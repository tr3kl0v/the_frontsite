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
});(function(){dust.register("header",body_0);function body_0(chk,ctx){return chk.write("<header class=\"pageHeader").section(ctx._get(false, ["fullScreen"]),ctx,{"block":body_1},null).write("\">").section(ctx._get(false, ["productLogo"]),ctx,{"block":body_2},null).section(ctx._get(false, ["mainNav"]),ctx,{"block":body_5},null).exists(ctx._get(false, ["fullScreenOption"]),ctx,{"block":body_13},null).write("</header>");}function body_1(chk,ctx){return chk.write(" fullScreen");}function body_2(chk,ctx){return chk.write("<h1 class=\"productLogo\">").section(ctx._get(false, ["links"]),ctx,{"block":body_3},null).write("</h1>");}function body_3(chk,ctx){return chk.write("<a href=\"").reference(ctx._get(false, ["href"]),ctx,"h").write("\" ").section(ctx._get(false, ["title"]),ctx,{"block":body_4},null).write(">").reference(ctx._get(false, ["link"]),ctx,"h",["s"]).write("</a>");}function body_4(chk,ctx){return chk.write("title=\"").reference(ctx._get(false, ["title"]),ctx,"h").write("\"");}function body_5(chk,ctx){return chk.write("<nav class=\"mainNav\" role=\"navigation\"><ul class=\"devices\">").section(ctx._get(false, ["devices"]),ctx,{"block":body_6},null).write("</ul><ul class=\"standard\">").section(ctx._get(false, ["standardLinks"]),ctx,{"block":body_7},null).write("</ul><ul class=\"login\">").section(ctx._get(false, ["conditionalLinks"]),ctx,{"block":body_8},null).write("</ul>").partial("notificationCenter",ctx,null).write("</nav>");}function body_6(chk,ctx){return chk.partial("navLink",ctx,null);}function body_7(chk,ctx){return chk.partial("navLink",ctx,null);}function body_8(chk,ctx){return chk.section(ctx._get(false, ["loggedIn"]),ctx,{"else":body_9,"block":body_11},null);}function body_9(chk,ctx){return chk.section(ctx._get(false, ["out"]),ctx,{"block":body_10},null);}function body_10(chk,ctx){return chk.partial("navLink",ctx,null);}function body_11(chk,ctx){return chk.section(ctx._get(false, ["in"]),ctx,{"block":body_12},null);}function body_12(chk,ctx){return chk.partial("navLink",ctx,null);}function body_13(chk,ctx){return chk.write("<div class=\"fullScreenMenu\">").exists(ctx._get(false, ["fullScreen"]),ctx,{"else":body_14,"block":body_15},null).write("</div>");}function body_14(chk,ctx){return chk.write("<ul><li><a href=\"#\" aria-hidden=\"true\" class=\"icon expand\">9</a></li></ul>");}function body_15(chk,ctx){return chk.write("<ul><li><a href=\"#\" aria-hidden=\"true\" class=\"icon avatar hasChildren\">0</a>").section(ctx._get(false, ["mainNav"]),ctx,{"block":body_16},null).write("</li></ul><ul><li><a href=\"#\" aria-hidden=\"true\" class=\"icon contract\">:</a></li></ul>");}function body_16(chk,ctx){return chk.write("<ul class=\"login\">").section(ctx._get(false, ["conditionalLinks"]),ctx,{"block":body_17},null).write("</ul>");}function body_17(chk,ctx){return chk.section(ctx._get(false, ["loggedIn"]),ctx,{"else":body_18,"block":body_20},null);}function body_18(chk,ctx){return chk.section(ctx._get(false, ["out"]),ctx,{"block":body_19},null);}function body_19(chk,ctx){return chk.partial("navLink",ctx,null);}function body_20(chk,ctx){return chk.section(ctx._get(false, ["in"]),ctx,{"block":body_21},null);}function body_21(chk,ctx){return chk.partial("navLink",ctx,null);}return body_0;})();