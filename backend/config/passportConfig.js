const passport = require("passport")
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/User")


//  LOCAL STRATEGY
//  REGISTER
passport.use('register', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
  },
  (req, email, pass, done) => {
    User.findOne({ email: email }, (err, exUser) => {
      if (err) return done(err)

      if (exUser) return done(null, false, { message: "User already exists with that email." })

      if (!exUser) {

        bcrypt.hash(pass, 10, (error, hashPass) => {
          if (error) return done(error)
          if (hashPass) {
            User.create({
              name: req.body.name,
              email: email,
              pass: hashPass,
              profileImg: 'https://drive.google.com/thumbnail?id=1uaoCzXz3avyyBB2klbl1oSAKbZwmaHvh'
            }).then(newuser => {
              return done(null, newuser)
            }).catch(error => {
              return done(error)
            })
          }
        })
      }
    })
  }
))

//  LOGIN
passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pass'
  },
  (email, pass, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err)
      if (!user) { return done(null, false, { message: "No user registered with this email." }) }

      if (user) {
        bcrypt.compare(pass, user.pass, (error, result) => {
          if (error) console.log(error.message)

          if (!result) return done(null, false, { message: "Incorrect password !" })
          if (result) return done(null, user)
        })
      }
    })
  }
))
//  LOCAL STRATEGY END



//  GOOGLE STRATEGY
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile._json.email }, (err, exUser) => {
      if (err) done(err)
      if (exUser) {
        exUser.googleId = profile.id
        exUser.profileImg = profile._json.picture
        exUser.save((error, savedUser) => {
          if (error) done(error)
          if (savedUser) done(null, savedUser)
        })
      }
      if (!exUser) {
        User.create({
          googleID: profile.id,
          name: profile.displayName,
          email: profile._json.email,
          profileImg: profile._json.picture
        }).then(newUser => {
          return done(null, newUser)
        }).catch(crErr => {
          console.log("error creating user")
          return done(crErr)
        })
      }
    })
  }
))
//  GOOGLE STRATEGY END


//  SERIALIZE USER
passport.serializeUser((user, done) => {
  return done(null, user.id)
})

//  DESERIALIZE USER
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err)
    if (user) return done(null, user)
  })
})
