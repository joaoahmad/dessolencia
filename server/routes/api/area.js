'use strict'

var mongoose = require('mongoose');
var MapboxClient = require('mapbox');
var mapbox = new MapboxClient('pk.eyJ1Ijoiam9hb2FobWFkIiwiYSI6ImZjZmMyMTcwMWU1NWZiZGRiNWY5NGU4NGEyYTFiYTNmIn0.U4_OOvESGl-pX5MpEcQqOQ');
var inside = require('point-in-polygon');

var Area = require('../../models/area');

var revertLatLng = (arr) => {
    if(!Array.isArray(arr) || !arr.length)
    return false;

    return arr.map(item => {
        if(Array.isArray(item[0])){
            return revertLatLng(item)
        }else{
            return [item[1], item[0]]
        }
    })
}

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
// -22.8565547, -43.4529701
module.exports.get = function(req, res) {
    Area.find(function(err, areas) {
        if (err)
        res.send(err);

        res.json(areas);
    });
};

module.exports.ping = function(req, res) {
    Area.find(function(err, areas) {
        if (err)
        res.send(err);


        /** status types:
         * none - default status
         * safe - user not is on dangerous area
         * approaching - user is approaching to danger area TODO
         * inside - user is insdie danger area
        */
        var response = {
            isDanger: false,
            areas: [],
            status: 'none'
        };

        areas.map(function(area){
            var coordinates = revertLatLng(area.coordinates);
            if(inside([req.body.lat, req.body.lng], coordinates[0])){
                response.isDanger = true;
                response.areas.push(area);
                response.status = 'inside';
            }
        });

        if(!response.isDanger && response.areas.length == 0){
            response.status = 'safe';
        }

        res.json(response);
    });
};
