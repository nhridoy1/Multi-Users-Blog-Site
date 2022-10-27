const multer = require('multer')

const multerConfig = {
    limits: {
        // Here we have to give size in bytes 
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb) {
        // another way to do this is -> file.mimetype.startsWith('image') 
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            return cb(null, true)
        } else {
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
}

const upload = multer({ limits: multerConfig.limits, fileFilter: multerConfig.fileFilter})

module.exports = upload