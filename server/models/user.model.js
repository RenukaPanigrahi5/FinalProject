const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        unique: true,
        dropDups: false
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        dropDups: false
      },
      height: {
        type: Number,
        required: true
      },
      weight: {
        type: Number,
        required: true
      },
      age: {
        type: Number,
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
      },
      saltSecret: String
    });

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}



mongoose.model('User', userSchema);