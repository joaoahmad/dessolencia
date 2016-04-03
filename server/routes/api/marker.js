var mongoose = require('mongoose');  
var Marker = require('../../models/marker');

module.exports.add = function(req, res) {
    var marker = new Marker(req.body.marker);
    marker.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({marker: marker});
    });
};

module.exports.get = function(req, res) { 
    Marker.find(function(err, markers) {
        if (err)
            res.send(err);

        res.json(markers);
    }); 
};