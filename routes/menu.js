/**
 * Created by GrooshBene on 2016. 10. 4..
 */

module.exports = init;

function init(app, User, Restaurant, Menu, randomString, upload) {

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

    //function end
}
