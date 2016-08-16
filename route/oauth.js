/**
 * Created by bene on 2016. 8. 11..
 */
module.exports = init;

function init(app, User, randomString) {

    var passport = require('passport');

    var FacebookTokenStrategy = require('passport-facebook-token');

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });


    passport.use(new FacebookTokenStrategy({
        clientID : "client id",

        clientSecret : "client secret key",

        profileFields : ['id', 'displayName', 'photos', 'permissions']
    }, function (accessToken, refreshToken, profile, done) {
        console.log("User Logined : "+profile);

        User.findOne({
            '_id' : profile.id
        }, function (err, user) {
            if(err) {
                return done(err);
            }
            if(!user){
                user = new User({
                    _id : profile.id,
                });

                user.save(function (err) {
                    if(err) console.log('facebook new User Save Error');

                    else{
                        done(null, profile);
                    }
                });
            }

            else if(user){
                done(null, profile);
            }
        })
    }));

    app.get('/auth/facebook/token', passport.authenticate('facebook-token'),
    function (req, res) {
        console.log("user token : "+ req.param('access_token'));

        if(req.user){
            res.send(200, req.user);
        }

        else if (!req.user){
            res.send(401, req.user);
        }
    });

    app.get('/auth/facebook/callback', passport.authenticate('facebook-token', {
        successRedirect : '/',
        failureRedirect : '/'
    }));





    //function end
}