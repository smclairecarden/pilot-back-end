import { Location } from "../models/location.js";

function index (req, res) {
  Location.find({})
  .populate('owner')
  .then(locations => {
    res.json(locations)
  })
  .catch(err => {
    res.json(err)
  })
}

function create(req, res) {
  req.body.owner = req.user.profile
  Location.create(req.body)
  .then(location => {
    location.populate('owner')
    .then(populateLocation)
  })
  .catch(err => res.json(err))
}


export {
  index,
  create,
}