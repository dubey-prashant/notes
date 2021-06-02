if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const Note = require('./notesModel')

const app = express()
app.use(express.json())

// connecting to mongoDB using mongoose
mongoose.connect(process.env.MONGO_DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => app.listen(process.env.PORT, () => console.log('working BOSS!')))
  .catch(err => console.log(err))
// connection end

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')))

//Routes
app.get('/api/notes', clientAuth, (req, res) => {
  console.log("get api/notes")
  Note.find({}, (err, notes) => {
    if (err) console.log(err.message)
    if (notes) {
      res.json(notes)
    }
    if (!notes) {
      res.json({ message: 'No record' })
    }
  })
})

app.post('/api/notes', clientAuth, (req, res) => {
  Note.create({
    title: req.body.title,
    content: req.body.content
  }).then(() => {
    res.json({ message: "Added Note Successfully" })
  }).catch(err => {
    console.log(err.message)
    res.json({ message: "Error in adding note" })
  })
})
app.delete('/api/notes/:id', clientAuth, (req, res) => {
  Note.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({ message: "Deleted successfully" })
    })
    .catch(err => {
      console.log(err.message)
      res.status(400).json({ message: "Error deleting" })
    })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
})

//Authenticate the request
function clientAuth(req, res, next) {
  const id = req.headers.reactauthclientid
  const pass = req.headers.reactauthclientpass
  if (id === process.env.CLIENT_ID) {
    if (pass === process.env.CLIENT_PASS) next()
  } else {
    res.status(404).json({ message: "You are not authorised" })
  }
}