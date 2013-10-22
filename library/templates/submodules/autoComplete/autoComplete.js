define([
	'frontside'
], function (Frontside) {
	AutoComplete = Frontside.models.Module.extend({
		id: 'autoComplete',
		urlRoot: 'autoComplete',

		defaults: {
			limit: 10
		},

		updateUrl: function(){
			this.url = '/autocomplete/' + this.get('limit') + '/' + this.get('searchValue');
			this.fetch();
		}
	});

	AutoCompleteView = Frontside.views.ModuleView.extend({
		init: function(){
			this.changeEvents();
			this.outsideClick();
			this.setSelectors();
		},

		events: {
			"keyup": "typing",
			"click .resultsList a": "termSelect"
		},

		changeEvents: function(){
			var self= this;
			this.model.on("change:result", function(model, value) {
				self.rerender();
			});
		},

		outsideClick: function(){
			this.$el.bind( "clickoutside", function(e){
				$(this).children('.autoComplete').hide();
			});
		},

		render: function(){
			var self = this;
			var object = {'autoComplete': self.model.attributes.result};
			dust.render(self.model.id, object, function(err, out){
				self.$el.children('.autoComplete').replaceWith(out);
				if (self.model.get('result').list.word.length > 0){
					self.$el.children('.autoComplete').show();
				} else {
					self.$el.children('.autoComplete').hide();
				}
			});
		},

		setSelectors: function(){
			this.textInput = this.$el.children('.field').children('input');
		},

		termSelect: function(e){
			e.preventDefault();
			var clicked = $(e.target).closest('a');
			if(clicked.hasClass('multiTerm')){
				//Handle multiterm
			} else {
				var value = clicked.children('.term').html();
				this.model.set('searchValue', value);
				this.textInput.val(value);
				this.$el.children('.autoComplete').hide();
			}
		},

		typing: function(){
			var value = this.textInput.val();
			this.model.set('searchValue', value);
			if(value.length > 1){
				this.model.updateUrl();
			}
			if(value.length <= 1){
				this.$el.children('.autoComplete').html('');
				this.$el.children('.autoComplete').hide();
			}
		}
	});
});