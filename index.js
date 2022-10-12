require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/db')



// database connection
connectDB()

// spin up a server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})