const express = require('express')
const mongoose  = require('mongoose')
const keys = require('./config/keys')
// below order matters as we first need to define the model and its schema then further use it in passport.js
require('./models/User')
require('./services/passport.js')


mongoose.connect('keys.mongoURI',{ useNewUrlParser: true },() => {
  console.log('connected to db')
})

const app = express()


// authRoutes file returns a function to which we are passing app object
require('./routes/authRoutes')(app);



const PORT = process.env.PORT || 5000
app.listen(PORT)
