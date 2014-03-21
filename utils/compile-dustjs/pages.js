var fs = require('fs'),
	walk = require('walkdir'),
	mkdirp = require('mkdirp'),
	path = require('path')
	program = require('commander'),
	os = require('os'),
	dust = require('dustjs-linkedin');

var pagesFolder = path.join(__dirname, '../../', 'lib', 'templates', 'pages');
var modules = [];

function initPages() {
	walk.sync(pagesFolder, function(filepath, stat) {
		if (filepath.indexOf(".svn") === -1 && filepath.indexOf("dust") > -1) {
			var product = path.dirname(filepath.slice(filepath.lastIndexOf('pages')+6));
			copyPages(filepath, product)
		}
	});
}

function copyPages(filepath, product){
	fs.readFile(filepath, 'ascii', function (err, data) {
		createHtml(filepath, product, data);
	})
}

function createHtml(filepath, product, data){
	var templateName = path.basename(filepath, '.dust');
	modules = [];
	checkData(data, templateName, product);
}

function checkData(data, templateName, product){
	if(data.indexOf('{>') > -1){
		var module = getModuleName(data)
			position = getPosition(data, module),
			newData = data.replace("{>" + module + " /}", ""),
			moduleObject = new Object();

		moduleObject['moduleName'] = module;
		moduleObject['position'] = position;
		modules.push(moduleObject);
		checkData(newData, templateName, product);
	}
	else {
		checkFolderExists(data, templateName, product);
	}
}

function getModuleName(data){
	var startSearch = data.indexOf('{>')+2,
		moduleName = data.slice(startSearch, data.indexOf(' /}', startSearch))
	return moduleName;
}

function getPosition(data, module){
	if (module == 'head'){
		var	position = "head";
	}
	else {
		var trimmedData = data.slice(0, data.indexOf("{>" + module + " /}")),
			trimmedId = trimmedData.slice(trimmedData.lastIndexOf('id=')),
			position = "#" + trimmedId.slice(trimmedId.indexOf('"')+1, trimmedId.indexOf('"', trimmedId.indexOf('"')+1))
	}
	return position;
}

function checkFolderExists(data, templateName, product) {
	var folder = path.join(process.cwd(), '../../', 'public', product, 'static', 'views');

	fs.exists(folder, function (exists) {
		if (!exists) {
			//console.log(baseFolder)
			mkdirp(folder, function (err) {
				if (err) console.error(err)
			});
		}
		else {
			createFiles(data, templateName, product)
		}
	});
}


function createFiles(data, templateName, product){
	var folder = path.join(process.cwd(), '../../', 'public', product, 'static', 'views'),
		fileToCopy = path.join(folder, templateName + '.dust');

	fs.writeFile(fileToCopy, data, function (err) {
		var timestamp = new Date().toLocaleString() // add time stamp to console
		if (err) {
			console.log(timestamp + ': Failed to Copy: ' + fileToCopy + err)

		}
		else {
			console.log(timestamp + ': View copied to: ' + fileToCopy);
		}
	});

	var config = 'var modules=' +  JSON.stringify(modules);
	var configPath = path.join(process.cwd(), '../../', 'public', product, 'static', 'data', 'config', templateName + '.js');

	fs.writeFile(configPath, config, function (err) {
		var timestamp = new Date().toLocaleString() // add time stamp to console
		if (err) console.error(err);
		console.log(timestamp + ': Config file created: ' + configPath);
	});
}


initPages();