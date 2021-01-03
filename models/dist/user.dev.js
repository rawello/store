"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('lodash'),
    add = _require.add;

var _require2 = require('mongoose'),
    Schema = _require2.Schema,
    model = _require2.model;

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      count: {
        type: Number,
        required: true,
        "default": 1
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
      }
    }]
  }
});

userSchema.methods.addToCart = function (course) {
  var items = _toConsumableArray(this.cart.items); //проверка на добавление в корзину 


  var idx = items.findIndex(function (c) {
    return c.courseId.toString() === course._id.toString();
  });

  if (idx >= 0) {
    items[idx].count = items[idx].count + 1;
  } else {
    items.push({
      courseId: course._id,
      count: 1
    });
  }

  this.cart = {
    items: items
  };
  return this.save();
};

userSchema.methods.removeFromCart = function (id) {
  var items = _toConsumableArray(this.cart.items);

  var idx = items.findIndex(function (c) {
    return c.courseId.toString() === id.toString();
  });

  if (items[idx].count === 1) {
    items = items.filter(function (c) {
      return c.courseId.toString() !== id.toString();
    });
  } else {
    items[idx].count--;
  }

  this.cart = {
    items: items
  };
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = {
    items: []
  };
  return this.save();
};

module.exports = model('User', userSchema);