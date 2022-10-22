const router = require('express').Router()
const upload = require('../config/multer')
const {
    apiLimiter,
    createAccountLimiter
} = require('../middleware/rate-limit')
const {
    signup,
    login,
    logout,
    resetPassword
} = require('../controllers/userController')


router.route('/signup').post(createAccountLimiter, upload.single('photo'), signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/reset/password').post(apiLimiter, resetPassword)

module.exports = router