module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	// Config variables
	var configVars = {
		"build": "build",
		"dist_www": "./public",
		"bower_soure": "./bower_components",
		"dist_bower": "./public/static/js/vendor"
	};


	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		cvars: configVars,
		
		bower: {
			setup: {
				options: {
					install: true,
					copy: false
				}
			}
		},

	   copy: {
			 "dist-bower" : {
				files: [
					{
						src: '<%= cvars.bower_soure %>/jquery/jquery.min.map',
						dest: "<%= cvars.dist_bower %>/jquery.min.map"
					},
					{
						src: '<%= cvars.bower_soure %>/jquery/jquery.min.js',
						dest: "<%= cvars.dist_bower %>/jquery.min.js"
					},
					{
						src: '<%= cvars.bower_soure %>/lodash/dist/lodash.min.js',
						dest: "<%= cvars.dist_bower %>/lodash.min.js"
					},
					{
						src: '<%= cvars.bower_soure %>/backbone/backbone-min.map',
						dest: "<%= cvars.dist_bower %>/backbone.min.map"
					},
					{
						src: '<%= cvars.bower_soure %>/backbone/backbone-min.js',
						dest: "<%= cvars.dist_bower %>/backbone.min.js"
					},
					{
						src: '<%= cvars.bower_soure %>/requirejs/require.js',
						dest: "<%= cvars.dist_bower %>/require.js"
					},
					{
						src: '<%= cvars.bower_soure %>/modernizr/modernizr.js',
						dest: "<%= cvars.dist_bower %>/modernizr.js"
					},
					{
						src: '<%= cvars.bower_soure %>/dustjs-linkedin/dist/dust-core-2.2.3.min.js',
						dest: "<%= cvars.dist_bower %>/dust.core.min.js"
					},
					{
						src: '<%= cvars.bower_soure %>/dustjs-linkedin-helpers/dist/dust-helpers-1.1.1.js',
						dest: "<%= cvars.dist_bower %>/dust.helpers.js"
					}
				]
			}
		},
		
		watch: {
			scss: {
				files: ['lib/templates/modules/**/*.scss', 'lib/templates/submodules/**/*.scss'],
				tasks: 'compass'
			},
			website1scss: {
				files: ['../website1/static/**/*.scss'],
				tasks: 'compass:website1'
			},
			modules: {
				files: ['lib/templates/modules/**/*.dust', 'lib/templates/modules/**/*.js'],
				tasks: ['exec:modules','jshint:modules']
			},
			submodules: {
				files: ['lib/templates/submodules/**/*.dust', 'lib/templates/submodules/**/*.js'],
				tasks: ['exec:submodules', 'jshint:submodules']
			},
			components: {
				files: ['lib/templates/components/**/*.dust', 'lib/templates/components/**/*.js'],
				tasks: ['exec:components']
			},
			pages: {
				files: ['lib/templates/pages/**/*.dust'],
				tasks: ['exec:pages']
			},
			utilities: {
				files: ['static/js/*.js'],
				tasks: ['jshint:utils']
			}
		},


//		jasmine : {
//			website1: {
//				src : ['/static/js/frontside.js', '/templates/modules/website1/**/*.js'],
//				options: {
//					specs: ['specs/general/*.spec.js', 'specs/website1/*.spec.js'],
//					host: 'http://127.0.0.1:8000/',
//					template: require('grunt-template-jasmine-requirejs'),
//					templateOptions: {
//						requireConfigFile:'specs/scripts.js'
//					}
//				}
//			}
//		},
		jshint: {
			all: ['lib/templates/modules/**/*.js', 'lib/templates/submodules/**/*.js', 'static/js/extend.js', 'static/js/render.js'],
			modules: ['lib/templates/modules/**/*.js'],
			submodules: ['lib/templates/submodules/**/*.js'],
			utils: ['static/js/*.js']
		},
		exec: {
			modules: {
				command: 'node precompile modules',
				stdout: true
			},
			submodules: {
				command: 'node precompile subs',
				stdout: true
			},
			components: {
				command: 'node precompile components',
				stdout: true
			},
			pages: {
				command: 'node precompile pages',
				stdout: true
			}
		},
		compass: {
			website1: {
				options: {   
					basePath: '../website1/static/',
					sassDir: 'sass',
					cssDir: 'css',
					fontsDir: '../website1/static/fonts',
					environment: 'development'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-dust');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//grunt.registerTask('test', ['jasmine']);
	
	
	// Default task(s).
	grunt.registerTask('default', ['watch', 'compass', 'jshint', 'dust', 'exec', 'concat']);

	/* BASIC TASKS */
	grunt.registerTask('setup', ['bower:setup']);

	/* Update bower repository -- must run build manually before this */
	grunt.registerTask('dist-bower', ['copy:dist-bower']);

};

