const mongoose = require('mongoose') //import mongoose module, mongoose allows you to createa a template for the data and data types that will be stored in your DB
                                    //mongoose helps us create a 
const TodoSchema = new mongoose.Schema({ //this is the model that sets up the schema. 
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
