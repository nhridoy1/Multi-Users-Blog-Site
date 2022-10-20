const User = require('../models/user')
const {BigPromise} = require('../utils/bigPromise')
const logger = require('../config/logger')
const fileUpload = require('../config/firebase')


exports.signup = BigPromise( async (req, res, next) => {
    const {name, email, password, phoneNumber} = req.body

    const getUrl = await fileUpload(req.file)

    const user = await User.create({
        name, 
        email,
        password,
        phoneNumber,
        photo: getUrl
    })
    
    res.status(200).json({ success: true, user})
})