module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	// Config variables
	var configVars = {
		"build": "build",
		"dist_www": "./public",
		"bower_soure": "./bower_components",
		"dist_bower": "./public/website1/static/js/vendor",
		"lib_dir": "./lib/",
		"utils_folder": "./utils/compile-dustjs",
		"log_folder": "./logs"
	};


	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json', 'bower.json'),
		cvars: configVars,
		
		// Bower setup
		bower: {
			setup: {
				options: {
					install: true,
					copy: false
				}
			}
		},

		// Copy of files
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
		
		// Watch to precompile
		watch: {
			scss: {
				files: ['<%= cvars.lib_dir %>templates/modules/**/*.scss', '<%= cvars.lib_dir %>templates/submodules/**/*.scss'],
				tasks: 'compass'
			},
			website1scss: {
				files: ['<%= cvars.lib_dir %>/styles/website1/**/*.scss'],
				tasks: 'compass:website1'
			},
			modules: {
				files: ['<%= cvars.lib_dir %>templates/modules/**/*.dust', '<%= cvars.lib_dir %>templates/modules/**/*.js'],
				tasks: ['exec:modules','jshint:modules']
			},
			submodules: {
				files: ['<%= cvars.lib_dir %>templates/submodules/**/*.dust', '<%= cvars.lib_dir %>templates/submodules/**/*.js'],
				tasks: ['exec:submodules', 'jshint:submodules']
			},
			components: {
				files: ['<%= cvars.lib_dir %>templates/components/**/*.dust', '<%= cvars.lib_dir %>templates/components/**/*.js'],
				tasks: ['exec:components']
			},
			pages: {
				files: ['<%= cvars.lib_dir %>templates/pages/**/*.dust'],
				tasks: ['exec:pages']
			},
			utilities: {
				files: ['public/static/js/*.js'],
				tasks: ['jshint:utils']
			}
		},


		// Testing
		jasmine : {
			website1: {
				src : ['/public/static/js/frontside.js', '/lib/templates/modules/website1/**/*.js'],
				options: {
					specs: ['/test/general/*.spec.js', '/test/website1/*.spec.js'],
					host: 'http://127.0.0.1:8000/',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile:'test/scripts.js'
					}
				}
			}
		},


		// JS Lint validation
		jshint: {
			all: ['<%= cvars.lib_dir %>/modules/**/*.js', '<%= cvars.lib_dir %>/submodules/**/*.js', 'public/static/js/extend.js', 'public/static/js/render.js'],
			modules: ['<%= cvars.lib_dir %>/modules/**/*.js'],
			submodules: ['<%= cvars.lib_dir %>/submodules/**/*.js'],
			utils: ['public/static/js/*.js']
		},

		// Execute commands
		exec: {
			modules: {
				cwd: "<%= cvars.utils_folder %>",
				command: 'node compile modules',
				stdout: true,
			},
			submodules: {
				cwd: "<%= cvars.utils_folder %>",
				command: 'node compile subs',
				stdout: true
			},
			components: {
				cwd: "<%= cvars.utils_folder %>",
				command: 'node compile components',
				stdout: true
			},
			pages: {
				cwd: "<%= cvars.utils_folder %>",
				command: 'node compile pages',
				stdout: true
			},
			remove_logs: {
				cwd: "<%= cvars.logs_folder %>",
				command: 'rm -rf *.log',
			}
		},

		// Compass watch
		compass: {
			website1: {
				options: {
					httpPath: '/',
					basePath: '<%= cvars.lib_dir %>/styles/website1',
					sassDir: 'sass',
					cssDir: '../../../../public/website1/static/css',
					fontsDir: '/lib/styles/website1/fonts',
					httpFontsDir: '/static/fonts',
					httpFontsPath: '/static/fonts',
					imagesDir: '../../../../public/website1/static/images',
					javascriptsDir: '../../../../public/website1/static/js',
					environment: 'development',
					outputStyle: 'compressed',
					raw: 'preferred_syntax = :sass\n'
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-dust');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	
	// Default task(s).
	grunt.registerTask('default', ['exec:remove_logs', 'watch', 'compass', 'jshint', 'dust', 'exec', 'concat']);

	// Grunt testing
	grunt.registerTask('test', ['jasmine']);

	// BASIC TASKS
	grunt.registerTask('setup', ['bower:setup', 'exec:remove_logs']);

	// Update bower repository -- must run build manually before this
	grunt.registerTask('dist-bower', ['copy:dist-bower']);

};

