import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

async function deleteComment(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.pilot.content.remove({_id: req.params.id})
    profile.save()
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json(err)
  })
}

export { index, deleteComment as delete }
