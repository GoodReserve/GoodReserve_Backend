var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomString = require('randomstring');
var app = express();
var schema = mongoose.Schema;

var UserSchema = new schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    phone: String,
    auth_token: String,
    reservation: String,
    reservation_waiting: Array,
    user_type : Number,
    user_restaurant : String
});

var RestaurantSchema = new schema({
    _id: String,
    name: String,
    menu: Array,
    category: Array,
    address: String,
    reservation_max: Number,
    reservation_current: Number,
    phone: String,
    reservation_cancel: Number,
    reservation_check: Number,
    benefit: Object,
    thumbnail: String
});

var MenuSchema = new schema({
    _id: String,
    name: String,
    price: Number,
    restaurant : String,
    thumbnail : String
});

var ReservationSchema = new schema({
    _id: String,
    restaurant_id : String,
    reservation_maker : String,
    restaurant_name: String,
    reservation_time: Date,
    reservation_people: Number,
    reservation_payment: Number,
    reservation_menu: {
        type : String,
        ref : 'buckets'
    },
    reservation_price: Number,
    reservation_code: String,
    reservation_status : Number
});

var BucketSchema = new schema({
    _id : String,
    menus : [{
        type : String,
        ref : 'menus'
    }]
});



mongoose.connect("mongodb://localhost:27017/goodreserve", function (err) {
    if(err){
        console.log("MongoDB Error");
        throw err;
    }
});

var User = mongoose.model('users', UserSchema);
var Restaurant = mongoose.model('restaurants', RestaurantSchema);
var Menu = mongoose.model('menus', MenuSchema);
var Reservation = mongoose.model('reservations', ReservationSchema);
var Bucket = mongoose.model('buckets', BucketSchema);
var routes = require('./routes/index')(app, Reservation, Menu, Restaurant);
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.use('/users', users);

require('./routes/auth.js')(app, User, randomString);
require('./routes/reservation.js')(app, User, Restaurant, Reservation, Menu, randomString);
require('./routes/rest.js')(app, User, Restaurant, Menu, randomString);
require('./routes/menu.js')(app, User, Restaurant, Menu, randomString);
require('./routes/bucket.js')(app, Bucket, Menu, randomString);
require('./routes/user.js')(app, User, Reservation);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

//If This Source Has Issue, Plz Make Issue On this Repo!
