const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: { type: String },
  about: { type: String, default: 'At a collage' },
  lastSeen: { type:String}
})


module.exports = mongoose.model("users", UserSchema)