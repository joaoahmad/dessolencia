var mongoose = require('mongoose');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');

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
    User.find().populate('registrations').exec(function(err, user){
        res.json(user);
    });
};

module.exports.loginFacebook = function(req, res) {

    if(!req.user){
        return res.json({ success: false, message: 'Failed to Authenticate' }, 401);
    }

    var user = req.user;

    var token = jwt.sign({id: user.id}, req.app.get('security.salt'));

    res.json({
        success: true,
        message: 'Welcome!',
        token: token,
        user: user
    });
};
