/**
 * Created by GrooshBene on 2016. 10. 10..
 */

module.exports = init;

function init(app, Bucket, Menu, randomString) {
    app.post('/bucket/add', function (req, res) {
        var bucket = new Bucket({
            _id : randomString.generate(13),
            menus : []
        });
        bucket.save(function (err, silence) {
            if(err){
                console.log('/bucket/add DB Error');
                throw err;
            }
            console.log("Bucket "+ bucket._id + " Has Created");
            res.send(200, bucket);
        });
    });

    app.post('/bucket/update', function (req, res) {
        console.log(typeof req.param('menus'));
        Bucket.update({_id : req.param('bucket_id')}, {menus : req.param('menus')}, function (err, result) {
            if(err){
                console.log('/bucket/update DB Error');
                throw err;
            }
            console.log("Bucket "+ req.param('bucket_id') + " Has Updated");
            res.send(200, result);
        });
    });

    app.post('/bucket/info', function (req, res) {
        Bucket.findOne({_id : req.param('bucket_id')}).populate('menus').exec(function (err, result) {
            if(err){
                console.log("/bucket/info db Error");
                throw err;
            }
            console.log("Bucket Founded : "+ result);
            res.send(200, result);
        })
    });

    app.post('/bucket/destroy', function (req, res) {
        Bucket.findOneAndRemove({_id : req.param('bucket_id')}, function (err, result) {
            if(err){
                console.log('/resv/destroy DB Error');
                throw err;
            }
            console.log("Bucket Destroyed : " + req.param('bucket_id'));
            res.send(200, result);
        });
    });

    //function end
}
