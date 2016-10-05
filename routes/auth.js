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
        clientId : "218194355262831",
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
            res.send(200, req.user);
        }
        else if(!req.user){
            res.send(401, req.user);
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
            auth_token : randomString.generate(15)
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
                        reservation_waiting : user.reservation_waiting
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
                reservation_waiting : result.reservation_waiting
            };
            res.send(200, response);
        });
    });

    app.post('/auth/local/login', function (req, res) {
        console.log("User Login : " + req.param('email'));
        user.findOne({email : req.param('email')}, function (err, result) {
            if(err){
                console.log("/auth/local/login failed");
                throw err;
            }
            console.log("DB Founded : "+ result);
            if(result.password == req.param('password')){
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