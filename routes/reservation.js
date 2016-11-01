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
                reservation_maker : req.param('reservation_maker'),
                restaurant_name : result.name,
                reservation_time : req.param('reservation_time'),
                reservation_people : req.param('reservation_people'),
                reservation_payment : req.param('reservation_payment'),
                reservation_menu : req.param('reservation_menu'),
                reservation_price : req.param('reservation_price'),
                reservation_code : randomString.generate(8),
                reservation_status : 0
            });
            resv.save(function (err, silence) {
                if(err){
                    console.log('/resv/add Saving DB Error');
                    throw err;
                }
                console.log("Reservation Created : " + resv);
                Reservation.findOne({_id : resv._id}).populate({
                    path: 'reservation_menu',
                    populate : {
                        path : 'menus',
                        model : 'menus'
                    }
                }).exec(function (err, result) {
                    if(err){
                        console.log('/resv/add population DB Error');
                        throw err;
                    }
                    res.send(200, result);
                });
            });
        });
    });

    app.post('/resv/search', function (req, res) {
        Reservation.findOne({_id : req.param('id')}).populate({
            path : 'reservation_menu',
            populate : {
                path : 'menus',
                model : 'menus'
            }
        }).exec(function (err, result) {
            if(err){
                console.log("/resv/search DB Error");
                throw err;
            }
            console.log("Reservation Founded : " + result);
            res.send(200, result);
        });
    });

    app.post('/resv/destroy', function (req, res) {
        Reservation.update({_id : req.param('id')}, {reservation_status : 1}, function (err, result) {
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

    app.post('/resv/cancel', function (req, res) {
    	Reservation.update({reservation_id : req.param('reservation_id')}, {reservation_status : 2, cancel_type : req.param('cancel_reason')}, function(err, result){
		if(err){
			console.log("/resv/cancel DB Error");
			throw err;
		}
		console.log("Reservation " + req.param('reservation_id') + " has canceled.");
		res.send(200, result);
		})
	});
    //function end
}
