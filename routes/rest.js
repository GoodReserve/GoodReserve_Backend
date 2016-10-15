/**
 * Created by GrooshBene on 2016. 10. 4..
 */

module.exports = init;

function init(app, User, Restaurant, Menu, randomString) {
    var multer = require('multer');
    var upload = multer({
        dest : './photos/',
        rename : function (fieldname, filename) {
            return 'thumbnails_' + filename;
        }
    });
    app.post('/rest/add', upload.array('thumbnail',5), function (req, res, next) {
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

    app.post('/rest/search', function (req, res) {
        Restaurant.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/rest/search DB Error');
                throw err;
            }
            console.log(result + " Has Founded");
            res.send(200, result);
        });
    });

    app.post('/rest/list', function (err, result) {
        if(err){
            console.log('/rest/list db error');
            throw err;
        }
        console.log("Getting Rest List : "+ result);
        res.send(200, result);
    })

    //function end
}
