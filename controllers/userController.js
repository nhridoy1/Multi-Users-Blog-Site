const User = require('../models/user')
const storage = require('../config/firebase')
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const {BigPromise} = require('../utils/bigPromise')
const logger = require('../config/logger')


exports.signup = BigPromise( async (req, res, next) => {
    const {name, email, password, phoneNumber} = req.body

    console.log(req.file)

    res.status(200).send('bye')
})