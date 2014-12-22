var path = require('path');

exports.json = json;

function json(req, res) {
    var json = require(path.join(req.app.get('json'), req.params['language'], path.basename(req.url) + '.json'));

    var filledJson = {}
    filledJson = fill(req, json)
    res.json(filledJson)
}

function fill(req, json) {
    json.searches['username'] = req.session.user.username
    return json;
}
