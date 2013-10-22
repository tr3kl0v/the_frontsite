define([
	'frontside'
], function (Frontside) {
	RemoteAccess = Frontside.models.Module.extend({

	});
	RemoteAccessView = Frontside.views.ModuleView.extend({

	});

	Frontside.remoteAccess = new RemoteAccess();
	Frontside.remoteAccessView = new RemoteAccessView({model:Frontside.remoteAccess});
});