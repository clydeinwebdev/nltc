var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NLTC' , azurey: '<div style="opacity:0.8; background-color:#ccc; position:fixed; width:100%; height:100%; top:0px; left:0px; z-index:1000;"class="hide azurey valign-wrapper "> <div class="row "> <div class="col s12 "> <h1>Loading</h1> <div class="progress"> <div class="indeterminate"></div> </div> </div> </div> </div>'});
});

module.exports = router;
