const path = require('path')

const fileRename = (file) => {
    // getting the file extension
    const fileExt = path.extname(file)
    
    // anoter way to do -> file.originalname.replace(/\.[^/.]+$/, "").split(' ').join('-') + '-' + new Date().getTime()
    return finalName = path.parse(file).name.replace(' ', '-') + '-' + new Date().getTime() + fileExt
}

module.exports = fileRename