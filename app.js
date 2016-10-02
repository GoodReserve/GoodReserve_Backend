var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomString = require('randomstring')
var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');

var schema = mongoose.Schema;

var UserSchema = new schema({
  _id : String,
  name : String,
  email : String,
  password : String,
  phone : String,
  auth_token : String,
  reservation : String,
  reservation_wating : String
});

var RestaurantSchema = new schema({
  _id : String,
  name : String,
  menu : Array,
  category : Array,
  address : String,
  reservation_max : Number,
  reservation_current : Number,
  phone : String,
  reservation_cancel : Number,
  reservation_check: Number,
  benefit : Object
});

var MenuSchema = new schema({
  _id : String,
  name : String,
  price : Number
});

var ReservationSchema = new schema({
  _id : String,
  restaurant_name : String,
  reservation_time : Date,
  reservation_people : Number,
  reservation_payment : Number,
  reservation_menu : Array,
  reservation_price : Number,
  reservation_code : String
});


var User = mongoose.model('users', UserSchema);
var Restaurant = mongoose.model('restaurants', RestaurantSchema);
var Menu = mongoose.model('menus', MenuSchema);
var Reservation = mongoose.model('reservations', ReservationSchema);


require('./routes/oauth.js')(app, User, randomString);
require('./routes/reservation')(app, User, Restaurant, Reservation, Menu);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
