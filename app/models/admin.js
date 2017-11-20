var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')
var bcrypt = require('bcryptjs')
var beautifyUnique = require('mongoose-beautiful-unique-validation')
var sanitizerPlugin = require('mongoose-sanitizer')

module.exports = function () {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    token: {
      type: String
    },
    tokenExp: {
      type: Number
    },
    changeRequests: {
      email: {
        newEmail: {
          type: String
        },
        token: {
          type: String
        },
        tokenExp: {
          type: Number
        }
      }
    },
    profilePicture: {
      type: String
    },
    memberSince: {
      type: Date,
      default: Date.now
    }
  })

  schema.plugin(sanitizerPlugin)
  schema.plugin(findOrCreate)
  schema.plugin(beautifyUnique)

  schema.methods.generateHash = function (plainText) {
    return bcrypt.hashSync(plainText, 10)
  }

  schema.methods.compareHash = function (plainText, hash) {
    return bcrypt.compareSync(plainText, hash)
  }

  return mongoose.model('Admin', schema)
}
