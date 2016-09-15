var express = require('express');
var router = express.Router();

const SITE_NAME = 'Chat Room';

/* GET */
router.get('/', function(req, res, next) {
  	res.render('chat/entry', { title: SITE_NAME });
});

/* POST */
router.post('/', function(req, res, next){
	
	if(req.body.name === ''){
		res.render('chat/entry',{ title: SITE_NAME});
	}else{
		res.render('chat/room', { title: SITE_NAME , username: req.body.username });
	}
});

module.exports = router;
