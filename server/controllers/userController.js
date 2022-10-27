const User = require('../models/user')
const {BigPromise} = require('../utils/bigPromise')
const fileUpload = require('../config/firebase')
const cookieToken = require('../utils/cookieTokne')
const crypto = require('crypto')
const {
    sendPasswordResetEmail,
    sendAccountCreatedEmail,
    sendPasswordResetSuccessfulEmail
} = require('../email/mail-service')



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
    
    sendAccountCreatedEmail(name, email)

    cookieToken(res, newUser, 201)
})

exports.login = BigPromise(async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ success: false, msg: 'Your email or password is invalid.'})
    }

    const isValid = await user.isPasswordValid(password)

    if (!isValid) {
        return res.status(400).json({ success: false, msg: 'Your email or password is invalid.'})
    }


    cookieToken(res, user, 200)
})

exports.logout = BigPromise(async (req, res, next) => {
    res.status(200)
        .cookie('token', null,  { expires: new Date(Date.now()), httpOnly: true })
        .json({success: true, msg: 'Successfully logout'})
})

exports.forgotPassword = BigPromise(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).json({ success: false, msg: 'Email not found'})
    }

    const token = user.generateResetToken()

    user.save({ validateBeforeSave: false })

    // construct the custom url
    const tokenURL = `${req.protocol}://${req.get('host')}/reset/password/${token}`

    // sending email to user
    sendPasswordResetEmail(tokenURL, process.env.SENDER_MAIL, process.env.SENDER_MAIL)

    res.status(200).json({ success: true, message: 'Email has sent successfully.Please, check your email'})
})

exports.resetPassword = BigPromise(async (req, res, next) => {
    const {password, confirmPassword} = req.body

    const token = req.params.token

    const encryptedToken = await crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({ forgotpasswordtoken: encryptedToken, forgotpasswordexpiry: {$gt: Date.now()}})

    if (!user) {
        return res.status(400).json({success: false, msg: 'token is not valid'})
    }

    if (!(password === confirmPassword)) {
        return res.status(400).json({success: false, msg: 'password and confirmpassword are not same.'})
    } 

    user.forgotpasswordexpiry = undefined
    user.forgotpasswordtoken = undefined

    user.save({ validateBeforeSave: false })

    sendPasswordResetSuccessfulEmail(process.env.SENDER_MAIL, user.email)

    res.status(200).json({success: true, msg: 'new password is set'})
    
})

exports.changePassword = BigPromise(async (req, res, next) => {
    const {} = req.body


    res.status(200).json({ success: true, msg: "password updated successfully"})
})