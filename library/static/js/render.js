requirejs.config({
	baseUrl:"",
	paths:{
		vendor:'../library/static/js/vendor/',
		submodules: 'static/js/submodules/',
		jquery:"../library/static/js/vendor/jquery-1.10.2.min",
		dust:"../library/static/js/vendor/dust-core-2.0.3.min",
		underscore:"../library/static/js/vendor/lodash-2.2.1.compat.min",
		dustHelpers:"../library/static/js/vendor/dust-helpers-1.1.1.min",
		backbone:"../library/static/js/vendor/backbone-1.1.0.min",
		modernizr: "../library/static/js/vendor/modernizr-2.6.2.min",
		frontside:"../library/static/js/frontside"
	},
	shim:{
		jquery:{
			exports:"$"
		},
		underscore:{
			exports:"_"
		},
		dust:{
			exports:"dust"
		},
		modernizr: {
			exports: 'Modernizr'
		},
		backbone:{
			deps:["underscore","jquery"],
			exports:"Backbone"
		},
		dustHelpers: {
			deps:["dust"],
			exports:"dustHelpers"
		},
		frontside: {
			deps:["backbone","dust","dustHelpers","modernizr"],
			exports:"Frontside"
		}
	}
});

require(["frontside"], function(){
	Frontside.init();
});