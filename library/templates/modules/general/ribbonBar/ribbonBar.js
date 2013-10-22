define([
	'frontside'
], function (Frontside) {
	RibbonBar = Frontside.models.Module.extend({

	});

	RibbonBarView = Frontside.views.ModuleView.extend({
		events: {
			"click .loginButton" :"testCall"
		},

		testCall: function(){
			e.preventDefault();
		}
	});

	Frontside.ribbonBar = new RibbonBar();
	Frontside.ribbonBarView = new RibbonBarView({model:Frontside.ribbonBar});
});