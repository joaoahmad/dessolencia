var mongoose = require('mongoose');
var GCM_Reg = require('../../models/gcm_reg');
var User = require('../../models/user');

module.exports.add = function(req, res) {
    var gcm_reg = new GCM_Reg(req.body);
    gcm_reg.save(function(err) {
        if (err)
        res.send(err);

        User.findById(req.body._user, function(err, user){
            user.registrations.push(gcm_reg);
            user.save();
        });

        res.json(gcm_reg);
    });
};

module.exports.get = function(req, res) {
    GCM_Reg.find(function(err, gcm_regs) {
        if (err)
        res.send(err);

        res.json(gcm_regs);
    });
};
