var mongoose = require('mongoose');
var User = mongoose.model('User');
var CustomerHelper = require('../common/custom_helpers');
var ProfileController = {};
var http_status = require('http-status');
var jwt = require('jsonwebtoken');
ProfileController.profileRead = function (req,res) {


    if(!req.payload._id){
        res.status(401).json({
            "message" : "unauthorized"
        });
        return;
    }else{
        User.findById(req.payload._id,{_id: 0,__v: 0,hash: 0,salt : 0}).exec(function (err,user) {
            res.status(200).json(user);
            return;
        });
    }
};

ProfileController.editProfile = function (req,res) {
    console.log(req.payload._id);
    
    var user_id = req.payload._id;
    var updateFields = {
        first_name : req.body.first_name,
        last_name : req.body.last_name
    };


    User.updateOne({_id : user_id},updateFields).exec(function (err,response) {
        if(err){
            CustomerHelper.sendJsonResponse(res,http_status.INTERNAL_SERVER_ERROR,err);
            return;
        }
        if(response.ok == 1){
            CustomerHelper.sendJsonResponse(res,http_status.OK,{"message" : "User updated successfully"});
            return;

        }   else {
            CustomerHelper.sendJsonResponse(res, http_status.INTERNAL_SERVER_ERROR, err);
            return;
        }


    });
};


module.exports = ProfileController;