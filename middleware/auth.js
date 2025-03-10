module.exports = {
    ensureAuth: function (req, res, next) { //checks if user is authenticated if so run the next function. else redirect to todos main route
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  