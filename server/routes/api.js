var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

var users = require('./api/user');
var areas = require('./api/area');
var gcm_reg = require('./api/gcm_reg');
var markers = require('./api/marker');


router.get('/auth/facebook', passport.authenticate('facebook-token'), function(req, res){ users.loginFacebook(req, res) });

router.use(function(req, res, next) {

    var token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

    if (token) {

        jwt.verify(token, req.app.get('security.salt'), { ignoreExpiration: true }, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

router.route('/users')
.get(function(req, res){ users.get(req, res) });

router.route('/areas')
.post(function(req, res){ areas.add(req, res) })
.get(function(req, res){ areas.get(req, res) });

router.route('/areas/ping')
.post(function(req, res){ areas.ping(req, res) });

router.route('/gcm_reg')
.post(function(req, res){ gcm_reg.add(req, res) })
.get(function(req, res){ gcm_reg.get(req, res) });

router.route('/markers')
.post(function(req, res){ markers.add(req, res) })
.get(function(req, res){ markers.get(req, res) });


module.exports = router;

//{"user":{"name":"João Ahmad","role":"admin"}}
//{"marker":{"lat":"-22.85652","lng":"-43.45271"}}
