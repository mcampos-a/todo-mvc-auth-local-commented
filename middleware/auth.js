module.exports = { //import function 
    ensureAuth: function (req, res, next) { // this is a method that checks if user is authenticated if so run the next function. else redirect to todos main route
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/') //If the use is not logged in send them back to the main page. 
      }
    }
  }
  