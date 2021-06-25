const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  pass: String,
  name: String,
  googleID: String,
  profileImg: String
})
const User = mongoose.model('user', userSchema)

module.exports = User