module.exports = init;


function init(app, Reservation, Menu, Restaurant) {
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    app.get('/', function (req, res, next) {
        if(req.session == null){
            res.redirect('/login')
        }
        else if(req.session != null){
            Restaurant.findOne({_id : req.session.restaurant_id}).exec(function (err, result) {
                if(err){
                    console.log('index.js router.get / db Error');
                    throw err;
                }
                res.render('index', {
                    restaurantName: result.name,
                    reserveList: Reservation.find({restaurant_id: req.session.restaurant_id}, function (err, resv_result) {
                        if (err) {
                            console.log("routing reservation find Error");
                            throw err;
                        }
                        return resv_result;
                    }),

                    /*
                     TODO :
                     reserveList : Object[]{
                     startTime
                     endTime
                     code
                     name
                     callNumber
                     menu : Object[]{
                     name
                     amount
                     }
                     totalPrice
                     }
                     */
                });
            })
        }
    });

    app.get('/setting', function (req, res) {
        if(req.session != null){
            Restaurant.findOne({_id: req.session.restaurant_id}, function (err, result) {
                if (err) {
                    console.log('router restaurant find db error');
                    throw err;
                }
                res.render('setting', {
                    restaurantName: result.name,
                    menus: Menu.find({restaurant: req.session.restaurant_id}, function (err, menu_result) {
                        if (err) {
                            console.log('router setting db error');
                            throw err;
                        }
                        return menu_result;
                    }),
                    reserveMin : 0,
                    reserveMax : result.reservation_max,
                    seatTypeOne : 0,
                    seatTypeTwo : 0,
                    seatTypeFour : 0,
                    mainDish : "",
                    target : "",
                    dates : [],
                    startTime : 0,
                    endTime : 0,
                    reservation_cancel : result.reservation_cancel,
                    comment : ""
                    /*
                     TODO :
                     menus : Object[]{
                     name
                     price
                     imageUrl
                     }
                     reserveMin //null
                     reserveMax
                     seatTypeOne //null
                     seatTypeTwo //null
                     seatTypeFour //null
                     mainDish //null
                     target //null
                     dates //예약 가능 날짜 배열 //null
                     startTime //null
                     endTime //null
                     reservation_cancel
                     purchaseType : 0 or 1
                     comment //null
                     */
                });
            });
        }
        else if(req.session == null){
            res.redirect('/login');
        }

    });

    app.get('/login', function (req, res) {
        res.render('login', {});
    });

    app.get('/signup', function (req, res) {
        res.render('signup', {});
    });
}