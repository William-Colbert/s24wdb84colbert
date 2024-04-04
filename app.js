var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
	console.log("Connection to DB succeeded")});
var Doctor = require("./models/doctor");

async function recreateDB(){
  await Doctor.deleteMany();

  let instance1 = new Doctor({years_of_experience:11, specialty:"Cardiologist", number_of_patients:38});
  let instance2 = new Doctor({years_of_experience:28, specialty:"Surgeon", number_of_patients:5});
  let instance3 = new Doctor({years_of_experience:2, specialty:"Radiologist", number_of_patients:14});

  instance1.save().then(doc=>{
    console.log("First object saved")}
    ).catch(err=>{
      console.error(err)
    });

    instance2.save().then(doc=>{
      console.log("Second object saved")}
      ).catch(err=>{
        console.error(err)
      });

      instance3.save().then(doc=>{
        console.log("Third object saved")}
        ).catch(err=>{
          console.error(err)
        });
}

let reseed = true;
if (reseed) {recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorsRouter = require('./routes/doctors');
var gridRouter = require('./routes/grid');
var randomitemRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
const { start } = require('repl');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', randomitemRouter);
app.use('/resource', resourceRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
