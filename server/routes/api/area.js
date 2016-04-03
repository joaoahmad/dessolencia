var mongoose = require('mongoose');
var Area = require('../../models/area');

module.exports.add = function(req, res) {
    var area = new Area(req.body);
    area.save(function(err) {
        if (err) {
            res.send(err);
        }
    });
};

module.exports.get = function(req, res) {
    Area.find(function(err, areas) {
        if (err)
            res.send(err);

        res.json(areas);
    });
};
