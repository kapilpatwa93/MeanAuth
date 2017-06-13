var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret : 'MY_SECRET',
  userProperty : 'payload'
});

var ProfileController = require('../controllers/profile');

router.get('/profile',auth,ProfileController.profileRead);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
