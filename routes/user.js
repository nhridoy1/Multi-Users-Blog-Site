const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'tmp/' })

const {
    signup
} = require('../controllers/userController')


// const uploa = multer({
//     limits: {
//     fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//     if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//     return cb( new Error('Please upload a valid image file'))
//     }
//     cb(undefined, true)
//     }
// })

// app.post('/image', upload.single('upload'), async (req, res) => {
//     try {
//         await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
//         res.status(201).send('Image uploaded succesfully')
//     } catch (error) {
//         console.log(error)
//         res.status(400).send(error)
//     }
// })

router.route('/signup').post(upload.single('photo'), signup)

module.exports = router