var CustomHelper = {};
var jwt = require('jsonwebtoken');
CustomHelper.sendJsonResponse = function (res,status,content,success) {

    var response;
    if(success){
        response = {
            success : true,
            data : content
        }
    }else{
        response = {
            success : false,
            message : "Something went wrong"
        }

    }
    res.status(status);
    res.json(response);

};

CustomHelper.getJWTUserId = function (header) {
    return jwt.decode(header.split(' ')[1]);
}


module.exports = CustomHelper;