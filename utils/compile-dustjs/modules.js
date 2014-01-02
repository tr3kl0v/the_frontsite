var fs = require('fs'),
	walk = require('walkdir'),
	path = require('path'),
	uglify = require('uglify-js'),
	dust = require('dustjs-linkedin');
	
var modulesFolder = path.join(__dirname, '../../', 'lib', 'templates', 'modules');


function initModules() {

	walk.sync(modulesFolder, function(filepath, stat) {
		if (path.extname(filepath) === ".dust") {
			compileJs(filepath);
		}
	});
}

//Save uncompiled Dust templates to views folder
function compileJs(filepath){

	console.log (filepath);

	var moduleFolder = path.join(filepath, '../../'),
		baseFolder = path.join(moduleFolder, '../../../../../'),
		product = path.basename(path.join(moduleFolder, '../')),
		jsFolders = [];
		
	var uncompiled = fs.readFileSync(filepath, 'ascii'),
		templateName = path.basename(filepath, '.dust'),
		compiledDust = dust.compile(uncompiled, templateName),
		backboneFile = path.join(moduleFolder, templateName + '.js'),
		jsData = fs.readFileSync(backboneFile, 'ascii'),
		compiledBackbone = jsData + compiledDust;

	if(product === 'general'){
		jsFolders.push('website1')
	} else {
		jsFolders.push(path.basename(path.join(baseFolder, product)))
	}
	for(var i = 0; i < jsFolders.length; i++){
		var folderToCopy = path.join(baseFolder, 'public', jsFolders[i], 'static', 'js', 'modules', templateName + '.js')
		fs.writeFileSync(folderToCopy, compiledBackbone);
		var timestamp = new Date().toLocaleString() // add time stamp to console
		console.log(timestamp + ': Dust view compiled: ' + folderToCopy);
	}
};

initModules();