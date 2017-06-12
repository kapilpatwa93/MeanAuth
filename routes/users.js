var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
/* GET users listing. */



var userSchema = new mongoose.Schema({
  email : {
    type : String,
    unique : true,
    required : true
  },
  first_name: {
    type : String,
    unique : true
  },
  last_name: {
    type : String,
    unique : true
  },
  hash : String,
  salt : String

});

userSchema.methods.setPassword = function(passoword){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(passoword,this.salt,1000,64).toString('hex');

};

userSchema.methods.validPassword = function (password) {
   return this.hash == password.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
}

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
