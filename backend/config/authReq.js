//  Authenticate the request
exports.clientAuth = (req, res, next) => {
  const id = req.headers.reactauthclientid
  const pass = req.headers.reactauthclientpass
  if (id === process.env.CLIENT_ID) {
    if (pass === process.env.CLIENT_PASS) next()
  } else {
    res.status(404).json({ error: "You are not authorised" })
  }
}
//  Check if user is logged in 
exports.isVerified = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.redirect("/auth/failure")
}