import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const locationSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  entryPoints: {type: String},
  rating: {
    type: Number, 
    min: 1, 
    max: 5, 
    required: true
  },

  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  comments: [commentSchema],
  pictures: {type: String},
}, {
  timestamps: true
})

const Location = mongoose.model('Location', locationSchema)


export {
  Location,
}