var path = require('path');

exports.json = json;
exports.termSearch = termSearch;
exports.branchSearch = branchSearch;

function json(req, res) {
    var request = require("../../../../node_modules/request");
    reqOptions = {
        uri: "http://cert-www.embase.com/emtreejsonapi?browse=",
        method: "GET"
    };
    request(reqOptions,
        function (error, response, body) {
            var moduleName = path.basename(req.url),
                json = require(path.join(req.app.get('json'), req.params['language'], moduleName + '.json'));

            if (response !== undefined) {
                if (response.statusCode === 200) {
                    try {
                        json.tree.treeStructure = JSON.parse(body)
                    } catch (e) {
                        var json = {};
                        json.description = "There is a problem with the accessing the data"
                    }
                } else {
                    var json = {};
                    json.description = "Emtree Currently not available"
                }
                res.json(json)
            }
            else {
                // TODO central error stuff
                console.log("todo: Data server unavailable // no response")
            }
        }
    );
};

function termSearch(req, res) {
    var request = require("../../../../node_modules/request");
    reqOptions = {
        uri: "http://cert-www.embase.com/emtreejsonapi?find=" + req.body.term,
        method: "GET"
    };
    request(reqOptions,
        function (error, response, body) {
            res.send(JSON.parse(body))
        }
    );
}

function branchSearch(req, res) {
    var searchTerm = req.body.term.replace(" ", "%20");
    var request = require("../../../../node_modules/request");
    reqOptions = {
        uri: "http://cert-www.embase.com/emtreejsonapi?browse=" + searchTerm,
        method: "GET"
    };
    request(reqOptions,
        function (error, response, body) {
            res.send(JSON.parse(body))
        }
    );
}
