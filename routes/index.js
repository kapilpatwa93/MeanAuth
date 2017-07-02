var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret : 'MY_SECRET',
  userProperty : 'payload'
});


var ProfileController = require('../controllers/profile');
var AuthController = require('../controllers/authentication');
router.get('/profile',auth,ProfileController.profileRead);
router.post('/profile/edit',auth,ProfileController.editProfile);


router.post('/login',AuthController.login);
router.post('/register',AuthController.register);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
