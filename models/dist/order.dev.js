"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var orderSchema = new Schema({
  coursers: [{
    course: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = model('Order', orderSchema);