var fs = require('fs'),
	walk = require('walkdir'),
	mkdirp = require('mkdirp'),
	path = require('path')
	program = require('commander'),
	os = require('os'),
	dust = require('dustjs-linkedin');
	
var baseFolder =  path.join(__dirname, '../../../'),
	componentFolder = path.join(__dirname, '../../../', 'lib', 'templates', 'components'),
	products = [];


//Determine how many products there are
function getProducts(){
	//Get all top-level folders in the Ui-platform
	var files = fs.readdirSync(baseFolder)

	//run through all files
	files.map(function(file){
		//Do not include hidden files
		if(file.indexOf('.') <= -1){
			//don't include the library
			if(file != 'library'){
				//Put all other files in the products array
				products.push(file)
			}
		}
	});

	//Now start compiling files
	initComponents();
}

function initComponents(){
	products.map(function(product){
		var currentProduct = path.join(componentFolder, product),
			generalFolder = path.join(componentFolder, 'general'),
			componentFile = "";

		console.log(currentProduct);

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
		var fileToCreate = path.join(baseFolder, product, 'static', 'js', "components.js");
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