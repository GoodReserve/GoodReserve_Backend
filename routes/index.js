var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{restaurantName:"레스토랑 태윤 드 프리미엄"});
});

router.get('setting',function(req,res){
  res.render('setting',{restaurantName:"레스토랑 태윤 드 프리미엄"});
});

module.exports = router;
