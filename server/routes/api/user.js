var mongoose = require('mongoose');
var User = require('../../models/user');

module.exports.add = function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({user: user});
    });
};

module.exports.get = function(req, res) {
    User.findOne({ name: 'Joao'}).populate('registrations').exec(function(err, user){
        res.json(user);
    });
};
