const User = require('../models/user')
const {BigPromise} = require('../utils/bigPromise')
const jwt = require('jsonwebtoken')


const isLoggedIn = BigPromise( async (req, res, next) => {
    const token = req.cookies.token ||
        req.body.token ||
        req.header('Authorization').replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ success: false, msg: 'You are not Logged In'})
    }

    const decode = jwt.verify(token, process.env.JWT_KEY)

    const user = await User.findOne({ _id: decode.id})
    
    if (!user) {
        return res.status(401).json({ success: false, msg: "No user is found"})
    }

    req.user = user
    next()
})

module.exports = { isLoggedIn }