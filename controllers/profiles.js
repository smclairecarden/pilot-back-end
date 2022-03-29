import { Profile } from '../models/profile.js'
import axios from 'axios'
import {v2 as cloudinary} from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function createProfile(req, res) {
  

}

export { 
  index,
  createProfile as create,
 }
