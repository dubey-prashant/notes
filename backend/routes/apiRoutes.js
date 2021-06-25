const router = require('express').Router()
const Note = require('../models/Note')

//  GET USER
router.get('/user', (req, res) => {
  const user = req.user
  const userData = {
    name: user.name,
    email: user.email,
    profileImg: user.profileImg
  }
  res.json(userData)
})

//  GET NOTES OF USER IN THE REQUEST
router.get('/notes/:userId', (req, res) => {
  console.log(req.params.userId)
  Note.find({ user_id: req.params.userId }, (err, notes) => {
    if (err) console.log(err)
    if (notes) {
      res.json(notes)
    }
  })
})
//  CREATE A NOTE FOR USER IN THE REQUEST
router.post('/notes', (req, res) => {
  Note.create({
    user_id: req.body.user_id,
    title: req.body.title,
    content: req.body.content
  }).then(() => {
    res.json(req.user)
  }).catch(err => {
    res.status(400).json({ error: err.message })
  })
})
//  DELETE A NOTE OF USER IN THE REQUEST
router.delete('/notes/:noteId', (req, res) => {
  console.log(req.params.noteId)
  Note.findByIdAndRemove(req.params.noteId).then(() => {
    res.json(req.user)
  }).catch(err => {
    res.status(400).json({ error: err.message })
  })
})

module.exports = router