var path = require('path'),
    _ = require('../../../../node_modules/underscore')

exports.json = json;
exports.add = add;
exports.remove = remove;

function json(req, res) {
    var json = require(path.join(req.app.get('json'), req.params['language'], 'sessionClipboard.json'));

    if (req.session.sessionClipboard) {
        json.tableList.rows = req.session.sessionClipboard.tableList.rows;
    }
    res.json(json)
};

function add(req, res) {
    var added = 0;
    for (var i = 0; i < req.body.length; i++) {
        req.body[i].checked = false;
    }
    if (req.session.sessionClipboard) {
        var clip = req.session.sessionClipboard.tableList.rows;
        for (var i = 0; i < req.body.length; i++) {
            var alreadyExisting = _.find(clip, function (result) {
                if (result.title == req.body[i].title) {
                    return true;
                }
            })
            if (!alreadyExisting) {
                req.body[i].checked = false;
                clip.push(req.body[i])
                added++;
            }
        }
    } else {
        //create new clipboard
        req.session.sessionClipboard = {tableList: {}};
        req.session.sessionClipboard.tableList.rows = req.body;
        added = req.body.length;
    }

    if (added == 1) {
        var response = {'valid': true, "text": added + " record was added to clipboard"}
    } else {
        var response = {'valid': true, "text": added + " records where added to clipboard"}
    }
    res.json(response)
}

function remove(req, res) {
    var clip = req.session.sessionClipboard.tableList.rows,
        deleted = 0;

    for (var i = 0; i < req.body.length; i++) {
        for (var j = 0; j < clip.length; j++) {
            if (clip[j].title == req.body[i].title) {
                clip.splice(j, 1)
            }
        }
    }
    if (req.body.length == 1) {
        var response = {
            'valid': true,
            "text": req.body.length + " record was deleted from clipboard",
            "tableList": clip
        }
    } else {
        var response = {
            'valid': true,
            "text": req.body.length + " records where deleted from clipboard",
            "tableList": clip
        }
    }
    res.json(response)
}
