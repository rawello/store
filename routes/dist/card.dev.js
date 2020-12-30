"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('express'),
    Router = _require.Router;

var Course = require('../models/course');

var router = Router();

function mapCartItems(cart) {
  return cart.items.map(function (c) {
    return _objectSpread({}, c.courseId._doc, {
      count: c.count
    });
  });
}

function computePrice(courses) {
  return courses.reduce(function (total, course) {
    return total += course.price * course.count;
  }, 0);
}

router.post('/add', function _callee(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.body.id));

        case 2:
          course = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(req.user.addToCart(course));

        case 5:
          res.redirect('/card');

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
router["delete"]('/remove/:id', function _callee2(req, res) {
  var user, courses, card;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(req.user.removeFromCart(req.params.id));

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(req.user.populate('cart.items.courseId').execPopulate());

        case 4:
          user = _context2.sent;
          courses = mapCartItems(user.cart);
          card = {
            courses: courses,
            price: computePrice(courses)
          };
          res.status(200).json(card);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/', function _callee3(req, res) {
  var user, courses;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(req.user.populate('cart.items.courseId').execPopulate());

        case 2:
          user = _context3.sent;
          courses = mapCartItems(user.cart);
          res.render('card', {
            title: 'Корзина',
            isCard: true,
            courses: courses,
            price: computePrice(courses)
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;