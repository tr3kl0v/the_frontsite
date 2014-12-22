var path = require('path'),
    _ = require('../../../../node_modules/underscore');

exports.json = json;
exports.search = search;

function json(req, res) {
    var json = require(path.join(req.app.get('json'), req.params['language'], 'filters.json')),
        activeFilters = require(path.join(req.app.get('json'), 'activeFilters.json'));
    json.activeFilters = activeFilters;
    res.json(json)
}

function search(req, res) {
    var json = require(path.join(req.app.get('json'), 'filters.json'))[req.params.id];
    res.json(json)
}
