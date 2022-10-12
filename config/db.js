const mongoose = require('mongoose')


const connectDB = () => {
   try {
        mongoose.connect(process.env.DB_CONNECT)
        console.log('DB is connected')
   } catch (err) {
        
   }
}

module.exports = connectDB