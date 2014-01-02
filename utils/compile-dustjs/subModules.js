var fs = require('fs'),
	walk = require('walkdir'),
	path = require('path'),
	uglify = require('uglify-js'),
	dust = require('dustjs-linkedin');
	
function initModules() {
	var submoduleFolder = path.join(__dirname, '../../../', 'templates', 'submodules');
	walk.sync(submoduleFolder, function(filepath, stat) {
		if (path.extname(filepath) === ".dust") {
			compileJs(filepath);
		}
	});
}

function compileJs(filepath) {
	var moduleFolder = path.join(filepath, '../../'),
		baseFolder = path.join(moduleFolder, '../../../../'),
		jsFolders = ['embase', 'frontside', 'pathwaystudio', 'pharmapendium', 'quosabrowser', 'quosaVL', 'reaxys', 'reaxysmedicinalchemistry', 'targetinsights'];

	//Compile Template to Javascript
	var uncompiled = fs.readFileSync(filepath, 'ascii'),
		templateName = path.basename(filepath, '.dust');
		compiledDust = dust.compile(uncompiled, templateName);

	//Get the backbone file and add the template
	var backboneFile = path.join(filepath, '../../', templateName + '.js'),
		jsData = fs.readFileSync(backboneFile, 'ascii'),
		compiledBackbone = jsData + compiledDust;

	for(var i = 0; i < jsFolders.length; i++){
		var folderToCopy = path.join(baseFolder, jsFolders[i], 'static', 'js', 'submodules', templateName + '.js')
		fs.writeFileSync(folderToCopy, compiledBackbone);
		var timestamp = new Date().toLocaleString() // add time stamp to console
		console.log(timestamp + ': Dust view compiled: ' + folderToCopy);
	}
};

initModules();