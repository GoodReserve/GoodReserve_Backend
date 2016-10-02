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
                    reservation_wating : []
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

    //function end
}