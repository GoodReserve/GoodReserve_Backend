var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
  restaurantName:"레스토랑 태윤 드 프리미엄"
  /*
  TODO :
  reserveList : Object[]{
	startTime
	endTime
	code
	name
	callNumber
	menu : Object[]{
		name
		amount
	}
	totalPrice
  }
  */
  });
});

router.get('/setting',function(req,res){
  res.render('setting',{
  restaurantName:"레스토랑 태윤 드 프리미엄"
  /*
  TODO :
  menus : Object[]{
	name
	price
	imageUrl
  }
  reserveMin
  reserveMax
  seatTypeOne
  seatTypeTwo
  seatTypeFour
  mainDish
  target
  dates //예약 가능 날짜 배열
  startTime
  endTime
  cancleDate
  cancleHour
  cancleMinute
  purchaseType : boolean
  comment
  */
  });
});

router.get('/login',function(req,res){
  res.render('login',{});
});

router.get('/signup',function(req,res){
  res.render('signup',{});
});

module.exports = router;
