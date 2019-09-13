const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')


const User = mongoose.model('users')

passport.use(
new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
},
async (accessToken, refreshToken, profile, done) => {
  // after we have exchanged the 'code' with the actual user info
  console.log('access token ', accessToken)
  console.log('refresh token ', accessToken)
  console.log('profile  ', profile)

  const existingUser = await User.findOne({
    googleId: profile.id
  })

  if (existingUser) {
    // we already have a record with the given profile id
    done(null,existingUser)
  } else {
    // new user
    const user = await new User({
      googleId: profile.id
    }).save()

    done(null,user)

  }
})


)
