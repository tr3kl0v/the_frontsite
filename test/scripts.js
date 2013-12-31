require.config({
	baseUrl:"",
	paths:{
		vendor:'static/js/vendor/',
		submodules: 'static/js/submodules/',
		jquery:"static/js/vendor/jquery-1.10.2.min",
		dust:"static/js/vendor/dust-core-2.0.3.min",
		underscore:"static/js/vendor/lodash-1.3.1.min",
		dustHelpers:"static/js/vendor/dust-helpers-1.1.1.min",
		backbone:"static/js/vendor/backbone-1.0.0.min",
		modernizr: "static/js/vendor/modernizr-2.6.2.min",
		components:"static/js/components",
		frontside:"static/js/frontside",
		sinon: "specs/js/sinon"
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
	},
});