var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt  = require('jsonwebtoken');
/* GET users listing. */



var userSchema = new mongoose.Schema({
  email : {
    type : String,
    unique : true,
    required : true
  },
  first_name: {
    type : String,
    required : true
  },
  last_name: {
    type : String,
    required : true
  },
  hash : String,
  salt : String

});

userSchema.methods.setPassword = function(passoword){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(passoword,this.salt,1000,64).toString('hex');

};

userSchema.methods.validPassword = function (password) {
   return this.hash == crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate()+7);
  return jwt.sign({
    _id : this._id,
    email : this.email,
    name : this.first_name + ' ' + this.last_name,
    exp : parseInt(expiry.getTime()/1000)
  },'MY_SECRET')
};

mongoose.model('User',userSchema);



