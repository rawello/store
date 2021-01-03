"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('express'),
    Router = _require.Router;

var Order = require('../models/order');

var router = Router();
router.get('/', function _callee(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Order.find({
            'user.userId': req.user._id
          }).populate('user.userId'));

        case 3:
          orders = _context.sent;
          res.render('orders', {
            isOrder: true,
            title: 'Заказы',
            orders: orders.map(function (o) {
              return _objectSpread({}, o._doc, {
                price: o.courses.reduce(function (total, c) {
                  return total += c.count * c.course.price;
                }, 0)
              });
            })
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/', function _callee2(req, res) {
  var user, courses, order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(req.user.populate('cart.items.courseId').execPopulate());

        case 3:
          user = _context2.sent;
          courses = user.cart.items.map(function (i) {
            return {
              count: i.count,
              course: _objectSpread({}, i.courseId._doc)
            };
          });
          order = new Order({
            user: {
              name: req.user.name,
              userId: req.user
            },
            courses: courses
          });
          _context2.next = 8;
          return regeneratorRuntime.awrap(order.save());

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(req.user.clearCart());

        case 10:
          res.redirect('/orders');
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = router;