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

var Bluebird = require('bluebird');
var path = require('path');
var express = require('express');
var bootstrap = require('./lib/bootstrap');
var debug = require('debuglog')('FrontSide');


// startup arguments
var args = process.argv.splice(2).toString();


// Print Logo
console.log(" ");
console.log(" _____ _             __                 _   __ _     _      ");
console.log("/__   \\ |__   ___   / _|_ __ ___  _ __ | |_/ _(_) __| | ___ ");
console.log("  / /\\/ '_ \\ / _ \\ | |_| '__/ _ \\| '_ \\| __\\ \\| |/ _` |/ _ \\");
console.log(" / /  | | | |  __/ |  _| | | (_) | | | | |__\\ \\ | (_| |  __/");
console.log(" \\/   |_| |_|\\___| |_| |_|  \\___/|_| |_|\\__\\__/_|\\__,_|\\___|");
console.log(" ");

function noop(obj, cb) {
    cb(null, obj);
}


