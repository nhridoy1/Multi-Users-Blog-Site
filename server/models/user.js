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
                return validator.isEmail(email)
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
        minLength: [8, 'Must have at least 8 characters']
    },
    photo: {
        type: String,
        required: [true, 'Please provide photo url']
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
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY })
}

// verifing jwt token is valid or not
userSchema.methods.verifyJwtToken =  function (token) {
    return jwt.verify(token, process.env.JWT_KEY)
}

// comparing password with current password
userSchema.methods.isPasswordValid = function (givenPassword) {
    return bcryptjs.compare(givenPassword, this.password)
}

// generate some string for forgot password ( as a token )
userSchema.methods.generateResetToken = function () {
    // generating a long token
    const forgotToken = crypto.randomBytes(10).toString('hex')

    this.forgotpasswordtoken = crypto.createHash('sha256').update(forgotToken).digest('hex')

    // expiry of token
    this.forgotpasswordexpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * process.env.FORTGOT_PASSWORD_EXPIRY) // 3day

    return forgotToken
}


module.exports = mongoose.model('User', userSchema)