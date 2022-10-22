const User = require('../models/user')
const {BigPromise} = require('../utils/bigPromise')
const logger = require('../config/logger')
const fileUpload = require('../config/firebase')
const cookieToken = require('../utils/cookieTokne')


exports.signup = BigPromise( async (req, res, next) => {
    const {name, email, password, phoneNumber} = req.body

    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({ success: false, msg: 'User already exist'})
    }

    // to upload image on the firebase storage
    const getUrl = await fileUpload(req.file)

    const newUser = await User.create({
        name, 
        email,
        password,
        phoneNumber,
        photo: getUrl
    })
    
    cookieToken(res, newUser, 201)
})

exports.login = BigPromise(async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ success: false, msg: 'Provide Correct Login Info'})
    }

    const isValid = await user.isPasswordValid(password)

    if (!isValid) {
        return res.status(400).json({ success: false, msg: 'Provide Correct Login Info'})
    }


    cookieToken(res, user, 200)
})

exports.logout = BigPromise(async (req, res, next) => {
    res.status(200)
        .cookie('token', null,  { expires: new Date(Date.now()), httpOnly: true })
        .json({success: true, msg: 'Successfully logout'})
})

exports.resetPassword = BigPromise(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).json({ success: false, msg: 'Email not found'})
    }

    const token = user.generateResetToken()

    // construct the custom url
    const tokenURL = `${req.protocol}://${req.get('host')}/reset/password/${token}`

    res.status(200).json({ success: true,tokenURL, message: 'Email sent successfully.Check your email'})
})