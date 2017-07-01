var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function (res,status,content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req,res) {
    console.log(req.body);
    
    // if(!req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name){
    //     sendJsonResponse(res,400,{
    //         "message" : "All fileds requiredss"
    //     });
    //     return;
    // }

    var user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;

    user.setPassword(req.body.password);
    user.save(function (err) {
        if(err){
            sendJsonResponse(res,401,{
                "message" : err
            });
            return;
        }
        var token = user.generateJwt();
        res.status(200)
        .json({
            "user" : user,
            "token" : token
        });
    });
};


module.exports.login = function (req,res) {
    //console.log("here");
    
    if(!req.body.email || !req.body.password){
        res.status(400);
        res.json({
            "message" : "All fields required"
        });

    };

    passport.authenticate('local',function (err,user,info) {
        var token;
        if(err){
            res.status(404).json(err);
            return;
        }

        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "user" : user,
                "token" : token
            });

        }else {
            res.status(401).json(info);
        }
    })(req,res);


};