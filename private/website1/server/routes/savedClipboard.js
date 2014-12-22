var path = require('path'),
    _ = require('../../../../node_modules/underscore')

exports.json = json;
exports.add = add;
exports.remove = remove;

function json(req, res) {
    var json = require(path.join(req.app.get('json'), req.params['language'], 'savedClipboard.json'));

    if (req.session.savedClipboard) {
        json.tableList.rows = req.session.savedClipboard.tableList.rows;
    } else {
        json = setDisabled(json);
    }
    res.json(json)
}

function setDisabled(json) {
    var toolbar = json.toolbar,
        operators = toolbar.clipboardOperators.operators;
    toolbar.subbar.checkbox.status = 'disabled';
    for (var i = 0; i < operators.length; i++) {
        operators[i].status = 'disabled';
    }
    return json;
}

function add(req, res) {

}

function remove(req, res) {

}
