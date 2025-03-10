const mongoose = require('mongoose') //import mongoose module, mongoose allows you to createa a template for the data and data types that will be stored in your DB

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true, //this key/value pair sets a user required field.
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
