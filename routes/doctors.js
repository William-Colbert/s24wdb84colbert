var express = require('express');
const doctor_controlers=require('../controllers/doctor');
var router = express.Router();

const secured = (req, res, next)=> {
    if(req.user){
      return next();
    }
    //console.log("User not logged in");
    res.redirect("/login");
    //console.log("User not logged in. Redirected to login page.");
  }

/* GET home page. */
router.get('/', doctor_controlers.doctor_view_all_Page);
module.exports = router;

/* GET detail doctor page */
router.get('/detail', doctor_controlers.doctor_view_one_Page);
module.exports = router;

/* GET create doctor page */
router.get('/create', doctor_controlers.doctor_create_Page);
module.exports = router;

/* GET create update page */
router.get('/update', secured, doctor_controlers.doctor_update_Page);
module.exports = router;

/* GET delete doctor page */
router.get('/delete', doctor_controlers.doctor_delete_Page);
module.exports = router;
