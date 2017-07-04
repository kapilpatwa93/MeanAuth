var passport = require('passport');
var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var CustomHelper = require('../common/custom_helpers');
var expressValidator = require('express-validator');
var customValidator = require('../common/validator');
var http_status = require('http-status');
var app = express();
app.use(expressValidator());

module.exports.register = function(request, response) {
    var rules = {'email' : customValidator.email, 'first_name' : customValidator.first_name};
    customValidator.validate(request, response, rules , function (req) {
            var user = new User();
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;

            user.setPassword(req.body.password);
            user.save(function(err) {
                if (err) {
                    CustomHelper.sendJsonResponse(response, http_status.BAD_REQUEST,false,;
                    return;
                }
                var token = user.generateJwt();
                response.status(http_status.OK)
                    .json({
                        'user': user,
                        'token': token,
                    });
            });

            return;
    });
};

module.exports.login = function(req, res) {
    // console.log("here");

    if (!req.body.email || !req.body.password) {
        res.status(http_status.BAD_REQUEST);
        res.json({
            'message': 'All fields required',
        });

    };

    passport.authenticate('local' ,function(err, user, info) {
        var token;
        if (err) {
            res.status(http_parser).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                'user': user,
                'token': token,
            });

        }else {
            res.status(401).json(info);
        }
    })(req,res);


};