const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  roles: {
    type: Array
  },
  azure: {
    id: { type: String },
    upn: { type: String },
    displayName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    groups: { type: Array }
  }
})

exports.UserMongoSchema = mongoose.model('User', UserSchema)
