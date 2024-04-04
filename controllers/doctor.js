var Doctor = require('../models/doctor');

exports.doctor_list = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor list');
};

exports.doctor_detail = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor detail: ' + req.params.id);
};

exports.doctor_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor create POST');
};

exports.doctor_delete = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor delete DELETE ' + req.params.id);
};

exports.doctor_update_put = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor update PUT' + req.params.id);
};