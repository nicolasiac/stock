var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ items: [{ name: 'test' }] });
});

module.exports = router;
