var fs = require('fs'),
	walk = require('walkdir'),
	mkdirp = require('mkdirp'),
	path = require('path')
	program = require('commander'),
	os = require('os'),
	dust = require('dustjs-linkedin');

var componentFolder = path.join(__dirname, '../../', 'lib', 'templates', 'components'),
	confFolder = path.join(__dirname, '../../', 'conf');
	products = [];


//Determine how many products there are
function getProducts(){
	var filepath = path.join(confFolder, 'products.json');

	fs.readFile(filepath, 'utf8', function (err, data) {

		if (err) {
			console.log('Error: ' + err);
			return;
		}

		data = JSON.parse(data);

		var keys = Object.keys( data.hosts );
		for (var i=0, length=keys.length; i<length; i++) {
			products.push(keys[ i ]);

		}
		//Now start compiling files
		initComponents();
	});
}

function initComponents(){

	products.map(function(product){
		var currentProduct = path.join(componentFolder, product),
			generalFolder = path.join(componentFolder, 'general'),
			componentFile = "";

		//Walkthrough product specific components and compile them
		walk.sync(currentProduct, function(filepath, stat){
			if (filepath.indexOf(".svn") === -1 && filepath.indexOf("dust") > -1) {
				componentFile = compileComponents(filepath, componentFile, product)
			}
		})
		walk.sync(generalFolder, function(filepath, stat){
			if (filepath.indexOf(".svn") === -1 && filepath.indexOf("dust") > -1) {
				componentFile = compileComponents(filepath, componentFile, product)
			}
		})

		//When all components are added create file
		var fileToCreate = path.join(process.cwd(), '../../', 'public', product, 'static', 'js', "components.js");
		fs.writeFileSync(fileToCreate, componentFile);


		var timestamp = new Date().toLocaleString() // add time stamp to console
		console.log(timestamp + ': Dust view compiled: ' + fileToCreate);
	})
}

function compileComponents(filepath, componentFile, product) {
	//Get data and compile it
	var data = fs.readFileSync(filepath, 'ascii')
		templateName = path.basename(filepath, '.dust'),
		compiled = dust.compile(data, templateName);

	//Add this compiled template to the product specific component file
	componentFile += compiled;

	return componentFile;
}

getProducts();