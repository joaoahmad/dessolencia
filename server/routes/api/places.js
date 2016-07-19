'use strict'

var mongoose = require('mongoose');
var Area = require('../../models/area');

module.exports.add = function(req, res) {
    req.body.coordinates = req.body.coordinates
    .split(' ')
    .map(item => {
        var coord = item.replace(',0.0', '').split(',');
        return [coord[1], coord[0]]
    });

    var area = new Area(req.body);
    area.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json(req.body);
    });
};

module.exports.get = function(req, res) {
    Area.find(function(err, areas) {
        if (err)
            res.send(err);

        res.json(areas);
    });
};
