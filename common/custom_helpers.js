var CustomHelper = {};
var jwt = require('jsonwebtoken');
CustomHelper.sendJsonResponse = function (res,status,content) {
    res.status(status);
    res.json(content);

};

CustomHelper.getJWTUserId = function (header) {
    return jwt.decode(header.split(' ')[1]);
}


module.exports = CustomHelper;