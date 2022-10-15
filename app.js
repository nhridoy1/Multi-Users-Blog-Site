require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morganMiddleware = require('./middleware/morgan')
const fileUpload = require('express-fileupload')
const app = express()


// all the middlewares
app.use(morganMiddleware)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.set('view engine', 'ejs')

// import all the routes here
const user = require('./routes/user')

// route middleware
app.use('/api/v1', user)

app.use('/signup', (req, res, next) => {
    res.render('signup')
})

app.use('/', (req, res, next) => {
    res.status(200).send('Hello From Blog Site')
})


module.exports = app