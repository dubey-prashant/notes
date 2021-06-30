const router = require('express').Router()
const Note = require('../models/Note')

//  GET USER
router.get('/user', (req, res) => {
  const user = req.user
  const userData = {
    user_id: user._id,
    name: user.name,
    email: user.email,
    profileImg: user.profileImg
  }
  res.json(userData)
})

//  GET NOTES OF USER IN THE REQUEST
router.get('/notes/:userId', (req, res) => {
  Note.find({ user_id: req.params.userId }, (err, notes) => {
    if (err) console.log(err)
    if (notes) {
      res.json(notes)
    }
  })
})
//  CREATE A NOTE FOR USER IN THE REQUEST
router.post('/notes', (req, res) => {
  // Create new note 
  Note.create({
    user_id: req.body.user_id,
    title: req.body.title,
    content: req.body.content
  })
    .then(() => {
      // Find all notes of the user and send it in the response
      Note.find({ user_id: req.body.user_id }, (err, notes) => {
        if (err) console.log(err)
        if (notes) res.json(notes)
      })
    }).catch(err => {
      res.json({ error: err.message })
    })
})

//  DELETE A NOTE OF USER IN THE REQUEST
router.delete('/notes/:noteId', (req, res) => {

  Note.findByIdAndRemove(req.params.noteId)
    .then(() => {
      // Find all notes of the user and send it in the response
      Note.find({ user_id: req.query.userId }, (err, notes) => {
        if (err) console.log(err)
        if (notes) res.json(notes)
      })
    })
    .catch(err => {
      res.json({ error: err.message })
    })
})

module.exports = router