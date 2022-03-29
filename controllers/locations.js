import { Location } from "../models/location.js";
import axios from 'axios'
import {v2 as cloudinary} from 'cloudinary'


async function index (req, res) {
  try {
    Location.find({})
    .populate('owner')
    .populate({path: 'comments', populate: {path:'owner'}})
    .then(locations => res.json(locations))
  } catch(err) {
    return res.status(500).json(err)
  }
  // Location.find({})
  // .populate('owner')
  // .then(locations => {
  //   return res.json(locations)
  // })
  // .catch(err => {
  //   res.json(err)
  // })
}

// async function create(req, res) {
//   console.log(req.body)
//   try{
//     req.body.owner = req.user.profile
//     const location = new Location(req.body)
//     await location.save()
//     return res.status(201).json(location)
//   } catch(err) {
//     return res.status(500).json(err)
//   }
// }

function create(req, res) {
  req.body.owner = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Location.create(req.body)
    .then(location => {
      location.populate('owner')
      .then(populatedLocation => {
        res.status(201).json(populatedLocation)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.photo = image.url
      Location.create(req.body)
      .then(location => {
        location.populate('owner')
        .then(populatedLocation => {
          res.status(201).json(populatedLocation)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

  async function createComment(req, res) {
    try {
      req.body.owner = req.user.profile
      const location = await Location.findById(req.params.id)
      await location.comments.push(req.body)
      await location.save()
      return res.status(201).json(location)
    } catch(err) {
      return res.status(500).json(err)
    }
  }

  
  // Location.create(req.body)
  //   .populate('owner')
  //   .exec(newLocation => {
  //     return 
  //   })
  // .catch(err => {
  //   console.log(err)
    
  // })

function getLocation(req, res) {
  axios.get(`https://dev.virtualearth.net/REST/v1/Imagery/Map/AerialWithLabels/landmark=${req.params.name}?mapSize=500,400&key=${process.env.API_KEY}`)
  .then(apiResponse => {
    console.log('Loooooooookkkkkkkk', apiResponse)
    res.json(apiResponse.data)
  })
}

function update(req, res) {
  Location.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(location => res.json(location))
  .catch(err => res.json(err))
}

function show(req, res) {
  Location.findById(req.params.id)
  .populate('owner')
  .populate({path: 'comments', populate: {path:'owner'}})
  .then(location => res.json(location))
  .catch(err => res.json(err))
}

function deleteComment(req, res) {
  Location.findByIdAndDelete(req.params.id)
  console.log('HEYYYYYYYYY', req.params.id)
  .then(locations => res.json(locations))
  .catch(err => res.json(err))
}

export {
  index,
  create,
  getLocation,
  createComment,
  update,
  show,
  deleteComment as delete
}