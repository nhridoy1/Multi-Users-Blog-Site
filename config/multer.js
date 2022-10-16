const multer = require('multer')
const path = require('path')

const multerConfig = {
    limit: multer({
        limits: 1000000
    }),
    
    storage: multer.diskStorage({
        
        destination: function (req, file, cb) {
            cb(null, '/tmp/')
        },
        
        filename: function(req, file, cb) {
            const fileExt = path.extname(file.originalname)
            
            // const filename = file.originalname.replace(/\.[^/.]+$/, "").split(' ').join('-') + '-' + new Date().getTime()
            const filename = path.parse(file.originalname).name.replace(' ', '-') + '-' + new Date().getTime()

            cb(null, filename + fileExt)
        }
    })
}

const upload = multer({ storage: multerConfig.storage, limits: multerConfig.limit})

module.exports = upload