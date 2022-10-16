const router = require('express').Router()
const upload = require('../config/multer')

const {
    signup
} = require('../controllers/userController')


router.route('/signup').post(upload.single('photo'), signup)

module.exports = router