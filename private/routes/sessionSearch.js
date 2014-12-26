var path = require('path')

exports.json = json;
exports.add = add;
exports.remove = remove;


function json(req, res) {
    if (req.session.sessionSearch) {
        var json = req.session.sessionSearch;
    } else {
        var json = require(path.join(req.app.get('json'), req.params['language'], 'sessionSearch.json'));
    }

    if (req.session.searches != undefined) {
        json.tableList.rows = req.session.searches;
    }
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.json(json)
}

function add(req, res) {
    try {
        var search = createQuery(req.body);
        var addQuery = {
            queryNumber: 1,
            query: search,
            hitCounts: Math.floor((Math.random() * 100) * (Math.random() * 100))
        };

        if (req.session.searches) {
            addQuery.queryNumber = req.session.searches[0].queryNumber + 1
        } else {
            req.session['searches'] = [];
        }
        req.session.searches.unshift(addQuery);
        req.session.save()
        res.json({valid: true, searches: req.session.searches})
    } catch (e) {
        console.log("error in adding session searches: " + e)
        var json = {
            valid: false,
            text: 'Something went wrong while submitting the search'
        };
        res.json(json)
    }
}

function remove(req, res) {
    var searches = req.session.searches;

    //Loop through all records to be deleted
    for (var i = 0; i < req.body.length; i++) {
        //Loop through all searches in session
        for (var j = 0; j < searches.length; j++) {
            if (searches[j].queryNumber == req.body[i].queryNumber) {
                searches.splice(j, 1);
            }
        }
    }

    var json = {tableList: {}}
    if (req.session.searches.length > 0) {
        json.tableList.rows = req.session.searches;
    } else {
        delete req.session.searches;
    }
    if (req.body.length == 1) {
        var response = {
            'valid': true,
            "text": req.body.length + " record was deleted from Search History",
            "tableList": json.tableList.rows
        }
    } else {
        var response = {
            'valid': true,
            "text": req.body.length + " records where deleted from Search History",
            "tableList": json.tableList.rows
        }
    }
    res.json(response)
}

function createQuery(params) {
    var query = params.term,
        extensive = params.extensive;
    if (extensive) {
        var search = "'" + query + "'" + "/exp OR " + query
    } else {
        var search = query;
    }

    if (params.date) {
        search += " AND " + params.date
    }
    return search;
}

function sortSearches(rows) {
    rows.sort(function (a, b) {
        var aNum = a.queryNumber;
        var bNum = b.queryNumber
        return bNum - aNum
    });
    return rows;
}
