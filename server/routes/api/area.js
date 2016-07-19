'use strict'

var mongoose = require('mongoose');
var MapboxClient = require('mapbox');
var mapbox = new MapboxClient('pk.eyJ1Ijoiam9hb2FobWFkIiwiYSI6ImZjZmMyMTcwMWU1NWZiZGRiNWY5NGU4NGEyYTFiYTNmIn0.U4_OOvESGl-pX5MpEcQqOQ');

var Area = require('../../models/area');

module.exports.add = function(req, res) {
    // req.body.coordinates = req.body.coordinates
    // .split(' ')
    // .map(item => {
    //     var coord = item.replace(',0.0', '').split(',');
    //     return [coord[1], coord[0]]
    // });


    // mapbox.geocodeReverse( { latitude: -22.829945, longitude: -43.365655 }, function(err, res) {
    //   console.log(res);
    // });
    // return;

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
