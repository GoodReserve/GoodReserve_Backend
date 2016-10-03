/**
 * Created by GrooshBene on 2016. 10. 4..
 */

module.exports = init;

function init(app, User, Restaurant, Menu, randomString, upload) {
    app.post('/rest/add', upload.single('thumbnail'), function (req, res) {
        var rest = new Restaurant({
            _id : randomString.generate(13),
            name : req.param('name'),
            menu : req.param('menu'),
            category : req.param('category'),
            address : req.param('address'),
            reservation_max : req.param('reservation_max'),
            phone : req.param('phone'),
            reservation_cancel : req.param('reservation_cancel'),
            benefit : {
                main_benefit : req.param('main_benefit'),
                sub_benefit : req.param('sub_benefit')
            },
            thumbnail : req.files
        });
        if(rest.name != null){
            rest.save(function (err, silence) {
                if(err){
                    console.log('/rest/add DB Error');
                    throw err;
                }
                console.log(rest + " Has Added!");
                res.send(200, rest);
            });
        }
    });

    //function end
}
