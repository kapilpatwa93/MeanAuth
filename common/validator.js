var expressValidator = require('express-validator');
var customHelper = require('../common/custom_helpers');
var http_status = require('http-status');
var CustomValidator = {};
CustomValidator.email = {
    notEmpty: true,
    isEmail: {
        errorMessage: 'Invalid Email',
    },
    isLength: {

    }
};
CustomValidator.first_name = {
    notEmpty: true,
    isLength: {
        options : [{min: 1,
                    max : 255}],
        errorMessage : "first name should be between 0 and 255 characters",
    },
};
CustomValidator.validate = function(req, res, rules,callback) {

    req.checkBody(rules);

    req.getValidationResult().then(function(result){
        if (!result.isEmpty()){
            customHelper.sendJsonResponse(res,http_status.OK,result.array());
            return;
        } else {
            callback(req);

        }

    });
    
};

module.exports = CustomValidator;
