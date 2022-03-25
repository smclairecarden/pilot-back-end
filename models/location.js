import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  rating: {
    type: Number, 
    min: 1, 
    max: 5, 
    required: true
  },
  content: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const locationSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  comments: [commentSchema]
}, {
  timestamps: true
})

const Location = mongoose.model('Location', locationSchema)

export {Location}