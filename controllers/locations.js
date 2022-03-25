import { Location } from "../models/location.js";

function index (req, res) {
  Location.find({})
  .populate('owner')
  .then(locations => {
    return res.json(locations)
  })
  .catch(err => {
    res.json(err)
  })
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


export {
  index,
  create,
}