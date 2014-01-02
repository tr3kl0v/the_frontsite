var scriptToRun = process.argv[process.argv.length - 1],
	path = require('path');


if (scriptToRun === 'modules'){
	require(path.join(__dirname, 'modules.js'));
}
else if (scriptToRun === 'components') {
	require(path.join(__dirname, 'components.js'));
}
else if (scriptToRun === 'pages') {
	require(path.join(__dirname, 'pages.js'));
}
else if (scriptToRun === 'subs') {
	require(path.join(__dirname, 'subModules.js'));
}
else if (scriptToRun === 'all'){
	require(path.join(__dirname, 'compileModules.js'));
	require(path.join(__dirname, 'compileComponents.js'));
	require(path.join(__dirname, 'compilePages.js'));
	require(path.join(__dirname, 'compileSubModules.js'));
}
else {
	console.log("Error: Incorrect compile value. Either use 'node precompile pages' or 'node precompile modules'");
}