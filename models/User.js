const bcrypt = require('bcrypt') //the package that changes and stores text passowrds to a funky hash
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ //this allows you to create a new user and store it in a document/object - it is a schema or a construction funciton 
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
})


// Password hash middleware.
 
 UserSchema.pre('save', function save(next) { //this takes the plain text and encrypts the password
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => { //this is the package that turns passwords into a "hashed" version of the password
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('User', UserSchema)
