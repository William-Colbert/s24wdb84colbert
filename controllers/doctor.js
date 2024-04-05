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

exports.doctor_detail = async function(req, res){
    console.log("detail" + req.params.id);
    try{
        result = await Doctor.findById(req.params.id);
        res.send(result);
    } catch (error){
        res.status(500);
        res.send(`{"error":document for id ${req.params.id} not found`);
    }
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

exports.doctor_update_put = async function(req, res){
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try{
        let toUpdate = await Doctor.findById(req.params.id);
        if(req.body.years_of_experience){
            toUpdate.years_of_experience = req.body.years_of_experience;
        }
        if(req.body.specialty){
            toUpdate.specialty = req.body.specialty;
        }
        if(req.body.number_of_patients){
            toUpdate.number_of_patients = req.body.number_of_patients;
        }
        let result = await toUpdate.save();
        console.log("Sucess " + result);
        res.send(result);
    } catch (err){
        res.status(500);
        res.send(`{"error":${err}:Update for id ${req.params.id} failed`);
    }
};