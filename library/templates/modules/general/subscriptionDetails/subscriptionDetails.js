define([
	'frontside'
], function (Frontside) {
	SubscriptionDetails = Frontside.models.Module.extend({

	});
	SubscriptionDetailsView = Frontside.views.ModuleView.extend({

	});
	Frontside.subscriptionDetails = new SubscriptionDetails();
	Frontside.subscriptionDetailsView = new SubscriptionDetailsView({model:Frontside.subscriptionDetails});
});