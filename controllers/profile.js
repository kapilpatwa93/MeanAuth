var mongoose = require('mongoose');
var User = mongoose.model('User');



module.exports.profileRead = function (req,res) {
    console.log(req);

    if(!req.payload._id){
        res.status(401).json({
            "message" : "unauthorized"
        });
        return;
    }else{
        User.findById(req.payload._id).exec(function (err,user) {
            res.status(200).json(user);
            return;
        });
    }
};