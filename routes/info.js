var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  const user = global.authTokens[req.cookies["AuthToken"]];
  res.render('info', {user})
});

module.exports = router;