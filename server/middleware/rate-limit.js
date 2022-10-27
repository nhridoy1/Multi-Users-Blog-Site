const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
    windowMS:  15 * 60 * 1000,   // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false
})

const createAccountLimiter  = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
	max: 20, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message: 'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, 
	legacyHeaders: false
})

module.exports = {apiLimiter, createAccountLimiter }