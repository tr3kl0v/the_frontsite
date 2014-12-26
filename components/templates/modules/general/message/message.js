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
});