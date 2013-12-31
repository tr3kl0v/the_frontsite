var scriptToRun = process.argv[process.argv.length - 1],
	path = require('path');


if (scriptToRun === 'modules'){
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compileModules.js'));
}
else if (scriptToRun === 'components') {
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compileComponents.js'));
}
else if (scriptToRun === 'pages') {
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compilePages.js'));
}
else if (scriptToRun === 'subs') {
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compileSubModules.js'));
}
else if (scriptToRun === 'all'){
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compileModules.js'));
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compileComponents.js'));
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compilePages.js'));
	require(path.join(__dirname, '../', 'node_modules', 'compile-dust', 'bin', 'compileSubModules.js'));
}
else {
	console.log("Error: Incorrect compile value. Either use 'node precompile pages' or 'node precompile modules'");
}