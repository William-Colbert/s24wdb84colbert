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

exports.doctor_delete = async function(req, res){
    console.log("delete " + req.params.id)
    try{
        result = await Doctor.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err){
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
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

exports.doctor_view_one_Page = async function(req, res){
    console.log("single view for id " + req.query.id)
    try{
        result = await Doctor.findById(req.query.id)
        res.render('doctordetail', {title: 'Doctor Detail', toShow: result});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.doctor_create_Page = function(req, res){
    console.log("create view")
    try{
        res.render('doctorcreate', {title:'Doctor Create'});
    }
    catch(err){
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

exports.doctor_update_Page = async function(req, res){
    console.log("update view for item " + req.query.id)
    try{
        let result = await Doctor.findById(req.query.id)
        res.render('doctorupdate', {title:'Doctor Update', toShow:result});
    }
    catch(err){
        res.status(500)
        res.send(`{'error':'${err}'}`);
    }
};