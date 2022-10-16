const multer = require('multer')
const path = require('path')

const multerConfig = {
    limits: {
        // Here we have to give size in bytes 
        fileSize: 1000000
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/tmp/')
        },
        
        filename: function(req, file, cb) {
            const fileExt = path.extname(file.originalname)
            
            // anoter way to do -> file.originalname.replace(/\.[^/.]+$/, "").split(' ').join('-') + '-' + new Date().getTime()
            const filename = path.parse(file.originalname).name.replace(' ', '-') + '-' + new Date().getTime()

            cb(null, filename + fileExt)
        }
    }),
    fileFilter: function(req, file, cb) {
        // another way to do this is -> file.mimetype.startsWith('image') 
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            return cb(null, true)
        } else {
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
}

const upload = multer({ storage: multerConfig.storage, limits: multerConfig.limits, fileFilter: multerConfig.fileFilter})

module.exports = upload