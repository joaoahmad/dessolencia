var mongoose = require('mongoose');  
var User = require('../../models/user');

module.exports.add = function(req, res) {
    var user = new User(req.body.user);
    user.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({user: user});
    });
};

module.exports.get = function(req, res) { 
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    }); 
};