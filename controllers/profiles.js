import { Profile } from '../models/profile.js'
// import axios from 'axios'
import {v2 as cloudinary} from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

// function createProfile(req, res) {
//   req.body.owner = req.user.profile
//   if (req.body.photo === 'undefined' || !req.files['photo']) {
//     delete req.body['photo']
//     Profile.create(req.body)
//     .then(profile => {
//       profile.populate('owner')
//       .then(populatedProfile => {
//         res.status(201).json(populatedProfile)
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json(err)
//     })
//   } else {
//     const imageFile = req.files.photo.path
//     cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
//     .then(photo => {
//       req.body.photo = photo.url
//       Profile.create(req.body)
//       .then(profile => {
//         profile.populate('owner')
//         .then(populatedProfile => {
//           res.status(201).json(populatedProfile)
//         })
//       })
//       .catch(err => {
//         console.log(err)
//         res.status(500).json(err)
//       })
//     })
//   }
// }

export { 
  index,
  //createProfile as create,
}
