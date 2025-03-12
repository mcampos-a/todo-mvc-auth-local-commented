const express = require('express') //allows to build our API, 
const app = express() //we wrapp the express fucntion in app
const mongoose = require('mongoose') //helps do our models
const passport = require('passport') //package that helps us interact our authentication, it comes with strategies - we are using a local strategy - you can add or change the strategy depending on the project
const session = require('express-session')  //keeps a logged in session. AKA a cookie that gets added to the user website. 
const MongoStore = require('connect-mongo')(session) //the database checks that the cookies is there to make sure the user should be logged in and keep the session.
const flash = require('express-flash') //inserts messeages that pop up when you need them
const logger = require('morgan') //logger debugger - shows the messeages of the http requests and gives them colors
const connectDB = require('./config/database') //setting up conenction to our db
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})// allows us to use .env files to store and use enviorment variables. It also tells node where the path to pull the environment vars

// Passport config
require('./config/passport')(passport) //sets up passport route in the config folder

connectDB() //function call to connect to mongo DB

app.set('view engine', 'ejs') //sets up ejs as our templating language
app.use(express.static('public')) //tells express where to look for the client side js and css files
app.use(express.urlencoded({ extended: true })) // allows express to parse urls routes. Lets us look at different parts of the request. 
app.use(express.json()) //allows express to parse incoming requests with JSON files
app.use(logger('dev')) //gives color to output response status for development use. Green for success codes, red for error codes, yellow for client error codes. cyan for redirection codes, and uncolred for information codes. Also tells you what request came in and what route was used. plus how long it took to respond

// Sessions - Session enables web applications to remember user data and preferences across multiple requests. 
app.use(
    session({
      secret: 'keyboard cat', //this keeps a secret that makes cookies in our app more random protecting anyone trying to breach our security
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }), //this stores the session/cookie in our DB - This allows us to leave the app and comeback and it will keep us logged in
    })
  )
  
// Passport middleware - framwork for implementing authentication strategies with user names, passwords, social media logins and more. 
app.use(passport.initialize())
app.use(passport.session()) //lets passport know we will using sessions with it. 

app.use(flash()) // allows to render a pop-up msg whenever a user is redirected to a particular webpage
  
app.use('/', mainRoutes) //main route
app.use('/todos', todoRoutes) //todos route
 
app.listen(process.env.PORT, ()=>{ //listen to the server and reach into the .env file for the port number
    console.log('Server is running, you better catch it!')
})    