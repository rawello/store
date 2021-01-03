"use strict";

var express = require('express');

var path = require('path');

var mongoose = require('mongoose');

var exphbs = require('express-handlebars');

var homeRoutes = require('./routes/home');

var cardRoutes = require('./routes/card');

var addRoutes = require('./routes/add');

var ordersRoutes = require('./routes/orders');

var coursesRoutes = require('./routes/courses');

var User = require('./models/user');

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById('5fec3e957083da3d1404cfbc'));

        case 3:
          user = _context.sent;
          req.user = user;
          next();
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.use(express["static"](path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
var PORT = process.env.PORT || 3000;

function start() {
  var url, candidate, user;
  return regeneratorRuntime.async(function start$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          url = "mongodb+srv://rawello:admin@cluster0.d7mwa.mongodb.net/<dbname>?retryWrites=true&w=majority";
          _context2.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne());

        case 6:
          candidate = _context2.sent;

          if (candidate) {
            _context2.next = 11;
            break;
          }

          user = new User({
            email: 'vladilen@mail.ru',
            name: 'Vladilen',
            cart: {
              items: []
            }
          });
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          app.listen(PORT, function () {
            console.log("Server is running on port ".concat(PORT));
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

start();