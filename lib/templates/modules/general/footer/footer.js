define([
	'frontside'
], function (Frontside) {
	Footer = Frontside.models.Module.extend({

	});
	FooterView = Frontside.views.ModuleView.extend({
		init:function(){
			this.changeEvents();
		},

		changeEvents: function(){
			var self = this;
			this.model.on('change:fullScreen', function(model){
				self.rerender();
			});
		}
	});

	Frontside.footer = new Footer();
	Frontside.footerView = new FooterView({model: Frontside.footer});
});