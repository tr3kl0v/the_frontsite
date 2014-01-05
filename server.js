/*───────────────────────────────────────────────────────────────────────────*\
│                                                                             │
│    _____ _             __                 _   __ _     _                    │
│   /__   \ |__   ___   / _|_ __ ___  _ __ | |_/ _(_) __| | ___               │
│     / /\/ '_ \ / _ \ | |_| '__/ _ \| '_ \| __\ \| |/ _` |/ _ \              │
│    / /  | | | |  __/ |  _| | | (_) | | | | |__\ \ | (_| |  __/              │
│    \/   |_| |_|\___| |_| |_|  \___/|_| |_|\__\__/_|\__,_|\___|              │
│                                                                             │
│   Copyright (C) 2012-2014 Paapster                                          │
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
'use strict';


// startup arguments
var args = process.argv.splice(2).toString();

// Dependencies
var walk = require('walkdir'),
	path = require('path');

require('colors');

// Print Logo
console.log("");
console.log(" _____ _             __                 _   __ _     _      ".yellow.bold);
console.log("/__   \\ |__   ___   / _|_ __ ___  _ __ | |_/ _(_) __| | ___ ".yellow.bold);
console.log("  / /\\/ '_ \\ / _ \\ | |_| '__/ _ \\| '_ \\| __\\ \\| |/ _` |/ _ \\".green.bold);
console.log(" / /  | | | |  __/ |  _| | | (_) | | | | |__\\ \\ | (_| |  __/".blue.bold);
console.log(" \\/   |_| |_|\\___| |_| |_|  \\___/|_| |_|\\__\\__/_|\\__,_|\\___|".magenta.bold);
console.log("");


// Start all websites
if (args === "all"){

	var configFolder = path.join(__dirname, '../')

	walk(configFolder, function(filepath, stat) {
		if (filepath.indexOf(".svn") === -1 && filepath.indexOf("library") === -1) {

			if(filepath.indexOf('app.js') > -1){
				require(filepath)
			}
		}
	})
}

// Start argumented site
else {
	var product = require('./private/' + args + '/server/app');
}

