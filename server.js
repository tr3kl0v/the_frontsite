/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2013 Paapster                                                │
│                                                                             │
│   Licensed under the Apache License, Version 2.0 (the "License");           │
│   you may not use this file except in compliance with the License.          │
│   You may obtain a copy of the License at                                   │
│                                                                             │
│   http://www.apache.org/licenses/LICENSE-2.0                                │
│                                                                             │
│   Unless required by applicable law or agreed to in writing, software       │
│   distributed under the License is distributed on an "AS IS" BASIS,         │
│   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
│   See the License for the specific language governing permissions and       │
│   limitations under the License.                                            │
\*───────────────────────────────────────────────────────────────────────────*/


// startup arguments
var args = process.argv.splice(2).toString();

// Dependencies
var walk = require('walkdir'),
	path = require('path'),

// Print Logo
logo = require('./routes/logo');
logo.print();


if (args == "all"){

	var configFolder = path.join(__dirname, '../')

	walk(configFolder, function(filepath, stat) {
		if (filepath.indexOf(".svn") === -1 && filepath.indexOf("library") === -1) {

			if(filepath.indexOf('app.js') > -1){
				require(filepath)
			}
		}
	})
}
else if (args == 'tests') {
	require('./tests/app');
}
else {
	var product = require('../' + args + '/server/app');
}