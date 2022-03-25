import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  content: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const locationSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  entryPoints: {type: String, required: true},
  rating: {
    type: Number, 
    min: 1, 
    max: 5, 
    required: true
  },
  
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  comments: [commentSchema],
  pictures: {type: String}
}, {
  timestamps: true
})

const Location = mongoose.model('Location', locationSchema)
const Comment = mongoose.model('Comment', commentSchema)

export {
  Location,
  Comment
}