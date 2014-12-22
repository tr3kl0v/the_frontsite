define([
	'frontside'
], function (Frontside) {
	Message = Frontside.models.Module.extend({
		defaults: {
			'message':[]
		},

		listenToNewMessages: function(model) {
			model.on('change:message', function(model){
				messageView.renderMessage();
			});
		},

		removeMessageObject: function(text){
			var messages = this.get('message');
			var newList = _.filter(messages, function(message){
				if(message.text != text) {
					return message;
				} else if (message.model !== undefined) {
					delete window[message.model].attributes.message;
				}
			});
			this.set('message', newList);
		}
	});

	MessageView = Frontside.views.ModuleView.extend({
		events: {
			"click .closeButton" : "deleteMessageClick"
		},

		deleteMessageClick: function(e){
			e.preventDefault();
			var text = $(e.currentTarget).prevAll('div').children('.text').html();
			this.model.removeMessageObject(text);
		}
	});

	Frontside.message = new Message();
	Frontside.messageView = new MessageView({model: Frontside.message});
});(function(){dust.register("message",body_0);function body_0(chk,ctx){return chk.section(ctx._get(false, ["message"]),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.write("<section class=\"message").section(ctx._get(false, ["class"]),ctx,{"block":body_2},null).write("\">\t\t<div>").partial("infoIcon",ctx,null).write("<div>").section(ctx._get(false, ["header"]),ctx,{"block":body_3},null).write("<span class=\"text\">").reference(ctx._get(false, ["text"]),ctx,"h").write("</span></div>").exists(ctx._get(false, ["pushButton"]),ctx,{"block":body_4},null).exists(ctx._get(false, ["closeButton"]),ctx,{"block":body_5},null).write("</div></section>");}function body_2(chk,ctx){return chk.write(" ").reference(ctx._get(false, ["class"]),ctx,"h");}function body_3(chk,ctx){return chk.write("<h4>").reference(ctx._get(false, ["header"]),ctx,"h").write("</h4><br />");}function body_4(chk,ctx){return chk.partial("pushButton",ctx,null);}function body_5(chk,ctx){return chk.partial("closeButton",ctx,null);}return body_0;})();