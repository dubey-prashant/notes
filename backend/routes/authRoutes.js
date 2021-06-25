const passport = require('passport')
const router = require('express').Router()

//  HANDLE LOCAL AUTHENTICATION
const afterLocalAuth = (strategy, req, res, next) => {
  passport.authenticate(strategy, (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(401).json(info)
    req.logIn(user, err => {
      if (err) return next(err)
      return res.json(user)
    })
  })(req, res, next)
}
//  REDIRECT AFTER Oauth AUTHENTICATION 
const afterOAuth = {
  successRedirect: "/auth/success",
  failureRedirect: "/auth/failure"
}
//  LOCAL AUTH BY PASSPORT
router.post("/register", (req, res, next) => afterLocalAuth("register", req, res, next))
router.post("/login", (req, res, next) => afterLocalAuth("login", req, res, next))

//  GOOGLE AUTH BY PASSPORT
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get("/google/redirect", passport.authenticate('google', afterOAuth))

//  SUCCESS REDIRECT
router.get("/success", (req, res) => {
  res.json(req.user)
})
//  FAILURE REDIRECT
router.get("/failure", (req, res) => res.status(404).json({ error: "Authentication falied" }))

module.exports = router