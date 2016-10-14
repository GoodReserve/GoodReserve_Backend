/**
 * Created by GrooshBene on 2016. 10. 2..
 */

module.exports = init;

function init(app, User, randomString) {
    var passport = require('passport');
    var FacebookTokenStrategy = require('passport-facebook-token');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookTokenStrategy({
        clientID : "218194355262831",
        clientSecret : "84e950c8158a2c91ac5828ad85f32605"
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({
            _id : profile.id
        }, function (err, user) {
            if(err){
                return done(err);
            }
            if(!user){
                user = new User({
                    _id : profile.id,
                    name : profile.displayName,
                    email : profile.email,
                    phone : profile.phone,
                    reservation : "",
                    reservation_waiting : []
                });
                user.save(function (err) {
                    if(err) console.log(err);
                    else{
                        done(null, profile);
                    }
                })
            }
            else if(user){
                done(null, profile);
            }
        })
    }));

    app.get('/auth/facebook/token', passport.authenticate('facebook-token'), function (req, res) {
        console.log("user token : " + req.param('access_token'));
        if(req.user){
            var response = {
                _id : req.user.id,
                name : req.user.displayName,
                email : req.user.email,
                phone : req.user.phone,
                reservation : "",
                reservation_waiting : [],
                auth_token : req.param('access_token')
            };
            res.send(200, response);
        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });

    app.get('/auth/facebook/callback', passport.authenticate('facebook-token', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

    app.post('/auth/local/register', function (req, res) {
        user= new User({
            _id : randomString.generate(13),
            name : req.param('name'),
            phone : req.param('phone'),
            password : req.param('password'),
            email : req.param('email'),
            reservation : "",
            reservation_waiting : [],
            auth_token : randomString.generate(15),
            user_type : req.param('user_type'),
            user_restaurant : req.param('user_restaurant')
        });
        if(req.param('password') == req.param('password_chk')){
            user.save(function (err) {
                if (err){
                    console.log("/auth/register Failed");
                    throw err;
                }

                else {
                    console.log("user register : " + user);
                    var response = {
                        _id : user._id,
                        email : user.email,
                        name : user.name,
                        phone : user.phone,
                        auth_token : user.auth_token,
                        reservation : user.reservation,
                        reservation_waiting : user.reservation_waiting,
                        user_type : user.user_type,
                        user_restaurant : user.user_restaurant
                    };
                    res.send(200, response);
                }
            });
        }
    });

    app.post('/auth/local/authenticate', function (req, res) {
        console.log('Auth Key' + req.param('token'));
        User.findOne({auth_token : req.param('token')}, function (err, result) {
            if(err){
                console.log("/auth/authenticate failed");
                throw err;
            }
            console.log("User "+ result+ "Logged In");
            var response = {
                _id : result._id,
                email : result.email,
                name : result.name,
                phone : result.phone,
                auth_token : result.auth_token,
                reservation : result.reservation,
                reservation_waiting : result.reservation_waiting,
                user_type : result.user_type
            };
            res.send(200, response);
        });
    });

    app.post('/auth/local/login', function (req, res) {
        console.log("User Login : " + req.param('email'));
        User.findOne({email : req.param('email')}, function (err, result) {
            console.log("DB Founded : "+ result);
            if(err){
                console.log("/auth/local/login failed");
                throw err;
            }
            if(req.param('email') == undefined){
                console.log("Unvalid User Infomation");
                res.send(402, "Unvalid User Infomation");
            }
            else if(result.password == req.param('password')){
                console.log("User "+ result.name + "Logged In");
                var response = {
                    _id : result._id,
                    email : result.email,
                    name : result.name,
                    phone : result.phone,
                    auth_token : result.auth_token,
                    reservation : result.reservation,
                    reservation_waiting : result.reservation_waiting
                };
                res.send(200, response);
            }
            else if(result.password != res.param('password')){
                console.log("Password Error!");
                res.send(401, "Access Denied");
            }
        })
    });
    //function end
}