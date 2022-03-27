import { Location } from "../models/location.js";
import axios from 'axios'


async function index (req, res) {
  try {
    const locations = await Location.find({})
    .populate('owner')
    console.log(locations)
    return res.status(201).json(locations)
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

async function create(req, res) {
  try{
    req.body.owner = req.user.profile
    const location = new Location(req.body)
    await location.save()
    return res.status(201).json(location)
  } catch(err) {
    return res.status(500).json(err)
  }

  
  // Location.create(req.body)
  //   .populate('owner')
  //   .exec(newLocation => {
  //     return 
  //   })
  // .catch(err => {
  //   console.log(err)
    
  // })
}

function getLocation(req, res) {
  axios.get(`https://dev.virtualearth.net/REST/v1/Imagery/Map/AerialWithLabels/landmark=${req.params.name}?mapSize=500,400&key=${process.env.API_KEY}`)
  .then(apiResponse => {
    res.json(apiResponse.data)
  })
}

function update(req, res) {
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Location.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
      console.log(image)
      req.body.photo = image.url
      Location.findByIdAndUpdate(req.params.id, req.body, {new: true})
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

export {
  index,
  create,
  getLocation,
  update,
}