define([
	'frontside'
], function (Frontside) {
	TwitterStream = Frontside.models.Module.extend({

	});

	TwitterStreamView = Frontside.views.ModuleView.extend({

	});

	Frontside.twitterStream = new TwitterStream();
	Frontside.twitterStreamView = new TwitterStreamView({model: Frontside.twitterStream});
});