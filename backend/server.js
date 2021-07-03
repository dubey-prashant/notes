if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const { clientAuth, isVerified } = require("./config/authReq")
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: 'http://localhost:3000',
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
  }))
}

// connecting to mongoDB using mongoose
mongoose.connect(process.env.MONGO_DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  app.listen(process.env.PORT, () => console.log('working BOSS!'))
}).catch(e => console.log(e))
// connection end

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')

app.use("/auth", require("./routes/authRoutes"))
app.use("/api", clientAuth, isVerified, require("./routes/apiRoutes"))

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')))
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
})
