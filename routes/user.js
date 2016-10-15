/**
 * Created by GrooshBene on 2016. 10. 15..
 */

module.exports = init;

function init(app, User, Reservation) {

    app.post('/me/resv', function (req, res) {
        Reservation.find({reservation_maker : req.param('id')}).exec(function (err, result) {
            if(err){
                console.log("/me/resv db Error");
                throw err;
            }
            console.log("User "+ req.param('id') + "'s Reservation List :" + result);
            res.send(200, result);
        })
    })
    //function end
}
