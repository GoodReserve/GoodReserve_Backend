/**
 * Created by GrooshBene on 2016. 10. 2..
 */

module.exports = init;

function init(app, User, Restaurant, Reservation, Menu, randomString) {
    app.post('/resv/add', function (req, res) {
        Restaurant.findOne({_id : req.param('restaurant_id')}, function (err, result) {
            if(err){
                console.log("/resv/add Restaurant Finding DB Error");
                throw err;
            }
            var resv = new Reservation({
                _id : randomString.generate(13),
                restaurant_id : req.param('restaurant_id'),
                restaurant_name : result.name,
                reservation_time : req.param('reservation_name'),
                reservation_people : req.param('reservation_people'),
                reservation_payment : req.param('reservation_payment'),
                reservation_menu : req.param('reservation_menu'),
                reservation_price : req.param('reservation_price'),
                reservation_code : randomString.generate(8)
            });
            resv.save(function (err, silence) {
                if(err){
                    console.log('/resv/add Saving DB Error');
                    throw err;
                }
                console.log("Reservation Created : " + resv);
                res.send(200, resv);
            });
        });
    });

    app.post('/resv/search', function (req, res) {
        Reservation.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log("/resv/search DB Error");
                throw err;
            }
            console.log("Reservation Founded : " + result);
            res.send(200, result);
        });
    });

    app.post('/resv/destroy', function (req, res) {
        Reservation.findOneAndRemove({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/resv/destroy DB Error');
                throw err;
            }
            console.log("Reservation "+ req.param('id') + " Has Removed : " + result);
            res.send(200, result);
        });
    });

    app.post('/resv/restaurant/search', function (req, res) {
        Reservation.find({restaurant_id : req.param('restaurant_id')}, function (err, result) {
            if(err){
                console.log("/resv/restaurant/search DB Error");
                throw err;
            }
            console.log("Restaurant "+ req.param('id') + " 's reservations : "+ result);
            res.send(200, result);
        })
    })


    //function end
}