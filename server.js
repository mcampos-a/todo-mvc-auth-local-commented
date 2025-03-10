const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})// allows us to use .env files to store enviorment variables. Looks like also a path of where to pull from the file

// Passport config
require('./config/passport')(passport) //sets up passport route in the config folder

connectDB() //function call to connect to mongo DB

app.set('view engine', 'ejs') //sets up ejs as our templating language
app.use(express.static('public')) //tells express where to look for the client side js and css files
app.use(express.urlencoded({ extended: true })) // allows express to parse urls routes
app.use(express.json()) //allows express to parse incoming requests with JSON files
app.use(logger('dev')) //gives color to output response status for development use. Green for success codes, red for error codes, yellow for client error codes. cyan for redirection codes, and uncolred for information codes. Also tells you what request came in and what route was used. plus how long it took to respond

// Sessions - Session enables web applications to remember user data and preferences across multiple requests. 
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware - framwork for implementing authentication strategies with user names, passwords, social media logins and more. 
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) // allows to render a pop-up msg whenever a user is redirected to a particular webpage
  
app.use('/', mainRoutes) //main route
app.use('/todos', todoRoutes) //todos route
 
app.listen(process.env.PORT, ()=>{ //listen to the server and reach into the .env file for the port number
    console.log('Server is running, you better catch it!')
})    