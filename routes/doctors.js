var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('doctors', { title: 'Search Results Doctors' });
});

module.exports = router;
