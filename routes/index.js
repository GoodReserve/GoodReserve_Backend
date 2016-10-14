module.exports = init;


function init(app, Reservation, Menu, Restaurant) {
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {
            restaurantName: "레스토랑 태윤 드 프리미엄",
            reserveList: Reservation.find({restaurant_id: req.param('restaurant_id')}, function (err, resv_result) {
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
    });

    router.get('/setting', function (req, res) {
        Restaurant.findOne({_id: req.param('restaurant_id')}, function (err, result) {
            if (err) {
                console.log('router restaurant find db error');
                throw err;
            }
            res.render('setting', {
                restaurantName: "레스토랑 태윤 드 프리미엄",
                menus: Menu.find({restaurant: req.param('restaurant_id')}, function (err, menu_result) {
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

    });

    router.get('/login', function (req, res) {
        res.render('login', {});
    });

    router.get('/signup', function (req, res) {
        res.render('signup', {});
    });
}