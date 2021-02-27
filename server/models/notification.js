const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true
  }
  , description: {
    type: String,
    required: true
  }
  , buttons: [{
    type: String,
    required: true
  }]
  , times_shown: {
    type: Number,
    default: 0
  },

});

// schema.pre('validate', function(next) {
//   if (this.buttons.length > 2) throw("todoList exceeds maximum array size (10)!");
//   next();
// });

module.exports = mongoose.model('Notification', notificationSchema);
