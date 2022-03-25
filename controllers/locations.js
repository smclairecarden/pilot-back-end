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

}


export {
  index,
  create,
}