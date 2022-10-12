const mongoose = require('mongoose')
const { Schema } = mongoose
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const validator = require('validator')
const bcryptjs = require('bcryptjs')


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minLength: [3, 'Provide at least 3 character'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        trim: true,
        validate: {
            validator: function (email) {
                return validator.isEmail()
            },
            message: () => 'Please provide a valid email'
        }
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: [true, 'Please provide your number'],
        validate: {
            validator: function(number) {
                return validator.isMobilePhone(number, 'bn-BD')
            }
        },
        message: 'Please provide correct phone number'
    },
    password: {
        type: String,
        required: [true, 'Password must be provided'],
        min: [8, 'Provide at least 8 character']
    },
    photo: {
        id: String,
        secure_url: String
    },
    role: {
        type: String,
        default: 'user'
    },
    forgotpasswordtoken: String,
    forgotpasswordexpiry: Date,
}, 
{
    timestamps: true
})

// encrypt password before save
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcryptjs.hash(this.password, 10)
    next()
})

// create jwt token
userSchema.methods.getJwtToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.JWT_KEY, { algorithm: 'RS256', expiresIn: process.env.JWT_EXPIRY })
}

// verifing jwt token is valid or not
userSchema.methods.verifyJwtToken =  function (token) {
    return jwt.verify(token, process.env.JWT_KEY)
}

// comparing password with current password
userSchema.methods.isPasswordValid = async function (givenPassword) {
    return await bcryptjs.compare(givenPassword, this.password)
}

// generate some string for forgot password ( as a token )
userSchema.methods.generateResetToken = function () {
    this.forgotpasswordtoken 
}


module.exports = mongoose.model('User', userSchema)