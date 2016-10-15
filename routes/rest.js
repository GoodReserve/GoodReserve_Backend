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
        console.log(JSON.stringify(req.files));
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
            thumbnail : __dirname + req.files[0].path
        });
        Restaurant.find({address : req.param('address')}, function (err, result) {
            if(err){
                console.log("/rest/add DB Error");
                throw err;
            }
            if(result.length !=0){
                console.log("Restaurant With Same Address Has Already Exists!");
                res.send(409, "Restaurant With Same Address Has Already Exists!");
            }
            else if(result.length == 0 && rest.name != null){
                rest.save(function (err, silence) {
                    if(err){
                        console.log('/rest/add DB Error');
                        throw err;
                    }
                    console.log(rest + " Has Added!");
                    res.send(200, rest);
                });
            }
        })
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

    app.post('/rest/list', function (req, res) {
        Restaurant.find({}, function (err, result) {
            if(err){
                console.log('/rest/list db Error');
                throw err;
            }
            console.log("Getting Rest List : "+ result);
            res.send(200, result);
        });
    });
    
    app.post('/rest/search/tag', function (req, res) {
        Restaurant.find({tag : req.param('query')}).exec(function (err, result) {
            if(err){
                console.log('/rest/search/tag db error');
                throw err;
            }
            console.log("Restaurant Founded : "+ result);
            res.send(200, result);
        });
    });

    app.post('/rest/search/name', function (req, res) {
        Restaurant.find({name : req.param('query')}).exec(function (err, result) {
            if(err){
                console.log("/rest/search/name db Error");
                throw err;
            }
            console.log("Restaurant Founded : "+ result);
            res.send(200, result);
        })
    })

    //function end
}
