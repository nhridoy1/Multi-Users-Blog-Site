const User = require('../models/user')
const storage = require('../config/firebase')
const { ref, uploadString } = require('firebase/storage')
const {BigPromise} = require('../utils/bigPromise')


exports.signup = BigPromise( async (req, res, next) => {
    const {name, email, password, phoneNumber} = req.body
    
    

    res.status(200).send('bye')
})