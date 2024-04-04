var Doctor = require('../models/doctor');

exports.doctor_list = async function(req, res){
    try{
        theDoctors = await Doctor.find();
        res.send(theDoctors);
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

exports.doctor_view_all_Page = async function(req, res){
    try{
        theDoctors = await Doctor.find();
        res.render('doctors', {title:'Doctor Search Results', results:theDoctors});
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

exports.doctor_detail = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor detail: ' + req.params.id);
};

exports.doctor_create_post = async function(req, res){
    console.log(req.body)
    let document = new Doctor();
    document.years_of_experience = req.body.years_of_experience;
    document.specialty = req.body.specialty;
    document.number_of_patients = req.body.number_of_patients;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

exports.doctor_delete = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor delete DELETE ' + req.params.id);
};

exports.doctor_update_put = function(req, res){
    res.send('NOT IMPLEMENTED: Doctor update PUT' + req.params.id);
};