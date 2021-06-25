const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  title: String,
  content: String
})

const Note = mongoose.model('note', noteSchema)

module.exports = Note