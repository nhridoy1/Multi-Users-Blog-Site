const router = require('express').Router()
const upload = require('../config/multer')
const {
    apiLimiter,
    createAccountLimiter
} = require('../middleware/rate-limit')
const { 
    isLoggedIn
} = require('../middleware/auth')
const {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword
} = require('../controllers/userController')


router.route('/signup').post(createAccountLimiter, upload.single('photo'), signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/reset/password').post(apiLimiter, forgotPassword)
router.route('/reset/password/:token').post(resetPassword)
router.route('/update/password').post(isLoggedIn, changePassword)

module.exports = router