var request = require("../../node_modules/request");

exports.json = json;

function json(req, res) {
	var reqOptions = {
		uri: 'http://www.test.com/autocomplete?q=' + req.params['id'] + '&limit=' + req.params['limit'] + '&timestamp=' + new Date().getTime() + '&module=EmtreeTool&autocomplete=y',
		method: "GET"
	}
	//groupName=dna&groupType=WORD
	request(reqOptions, 
		function(error, response, body) {
			if(response.statusCode === 200){
				try {
					var json = JSON.parse(body);
				} catch (e) {
					console.log("Error with Autocomplete" + e)
					var json = {};
					json.description = "There is a problem with the accessing the data"
				}
			} else {
				var json = {};
				json.description = "Emtree Currently not available"
			}
			res.json(json)
		}
	);
}