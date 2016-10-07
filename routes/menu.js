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

    app.post('/menu/add', upload.single('thumbnail'), function (req, res) {
        var menu = new Menu({
            _id : randomString.generate(13),
            price : req.param('price'),
            name : req.param('name'),
            restaurant : req.param('restaurant'),
            thumbnail : req.files
        });
        if(menu.name != null){
            menu.save(function (err, silent) {
                if(err){
                    console.log("/menu/add DB Error");
                    throw err;
                }
                console.log(menu + " Has Added");
                res.send(200, menu);
            });
        }
    });

    app.post('/menu/search', function (req, res) {
        Menu.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/menu/search DB Error');
                throw err;
            }
            console.log(result + " Has Founded");
            res.send(200, result);
        });
    });

    //function end
}
