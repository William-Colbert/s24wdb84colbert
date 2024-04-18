var express = require('express');
const doctor_controlers=require('../controllers/doctor');
var router = express.Router();

const secured = (req, res, next)=> {
    if(req.user){
      return next();
    }
    res.redirect("/login");
  }

  const secured2 = (req, res, next)=> {
    if(req.user){
      res.locals.pass = true;
      return next();
    }
      res.locals.pass = false;
      return next();
  }

  const secured3 = (req, res, next)=> {
    if(req.user){
      res.locals.pass = true;
      return next();
    }
      res.locals.pass = false;
      return next();
  }

/* GET home page. */
router.get('/', doctor_controlers.doctor_view_all_Page);
module.exports = router;

/* GET detail doctor page */
router.get('/detail', doctor_controlers.doctor_view_one_Page);
module.exports = router;

/* GET create doctor page */
router.get('/create', secured3, doctor_controlers.doctor_create_Page);
module.exports = router;

/* GET create update page */
router.get('/update', secured, doctor_controlers.doctor_update_Page);
module.exports = router;

/* GET delete doctor page */
router.get('/delete', secured2, doctor_controlers.doctor_delete_Page);
module.exports = router;
