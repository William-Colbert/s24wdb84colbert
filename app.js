var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//New Lines of Code Start
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user){
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err){
        return done(err)
      })
    })
  )
//End of New Lines
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
//New Lines of Code
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//End of New Lines
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', randomitemRouter);
app.use('/resource', resourceRouter);

//New Lines of Code
// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//End of New Lines


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
