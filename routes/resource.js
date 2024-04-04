var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var doctor_controller = require('../controllers/doctor');

router.get('/', api_controller.api);

router.post('/doctors', doctor_controller.doctor_create_post);

router.delete('/doctors/:id', doctor_controller.doctor_delete);

router.put('/doctors/:id', doctor_controller.doctor_update_put);

router.get('/doctors/:id', doctor_controller.doctor_detail);

router.get('/doctors', doctor_controller.doctor_list);

module.exports = router;