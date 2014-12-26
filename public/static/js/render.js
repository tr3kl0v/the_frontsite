requirejs.config({
    baseUrl: "",
    paths: {
        vendor: '/static/js/vendor/',
        submodules: '/static/js/submodules/',
        jquery: '/static/js/vendor/jquery-2.1.3.min',
        dust: '/static/js/vendor/dust-core.min',
        underscore: '/static/js/vendor/lodash.min',
        dustHelpers: '/static/js/vendor/dust-helpers.min',
        backbone: '/static/js/vendor/backbone-min',
        modernizr: '/static/js/vendor/modernizr',
        frontside: '/static/js/frontside'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        dust: {
            exports: 'dust'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        dustHelpers: {
            deps: ['dust'],
            exports: 'dustHelpers'
        },
        frontside: {
            deps: ['backbone', 'dust', 'dustHelpers', 'modernizr'],
            exports: 'Frontside'
        }
    }
});

require(['frontside'], function () {
    Frontside.init();
});
