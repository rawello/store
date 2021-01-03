"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Главная страница',
    isHome: true
  });
});
module.exports = router;