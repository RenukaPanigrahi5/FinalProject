const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  fullName: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  gender: {
    type: [{
      type: String,
      enum: ['Male', 'Female']
    }]
  },
  address: {
    type: String,
    required: true
  }
});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username }
  User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
  console.log("inside the addUser");
  bcrypt.genSalt(10, (err, salt) => {
    
    bcrypt.hash(newUser.password, salt, (err, hash) => {      
      if (err) {        
        throw err;
      }

      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getAllUsers = function (callback) {
  User.find({}, callback);
}

module.exports.removeUserDetails = function (username, callback) {
  User.findOneAndRemove({ username: username }, callback);
}

module.exports.getUserByEmail = function (email, callback) {
  const query = {email: email}
  User.findOne(query, callback);
}