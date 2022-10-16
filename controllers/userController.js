const User = require('../models/user')
const {BigPromise} = require('../utils/bigPromise')
const logger = require('../config/logger')


exports.signup = BigPromise( async (req, res, next) => {
   
    
    res.status(200).send('bye')
})