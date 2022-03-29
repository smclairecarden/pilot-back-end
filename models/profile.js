import mongoose from 'mongoose'

const Schema = mongoose.Schema

//embedded pilot Schema
const pilotSchema = new Schema ({
  rating: {
    type: Number, 
    min: 1, 
    max: 10, 
    required: true
  },
  content: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  location: String, 
  skillLevel: Number, 
  pilot: [pilotSchema], 
  photo: {type: String},
  favLocations: {type: mongoose.Schema.Types.ObjectId, ref: "Location"}, 
  // messages: {type: mongoose.Schema.Types.ObjectId, ref: "Message"}, TODO
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
