const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const pubsub = require('./middlewares/pubsub')
const userRoute = require('./routes/users')
const securityRoute = require('./routes/security')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const profileRoute = require('./routes/profiles')
const feedRoute = require('./routes/feed')

//middlwares configuration
const urlencodedMiddleware = bodyParser.urlencoded({ extended: true })
app.use((req, res, next) => (/^multipart\//i.test(req.get('Content-Type'))) ? next() : urlencodedMiddleware(req, res, next))
app.use(bodyParser.json({ defer: true }))

//set logger
app.use(morgan("tiny"))

app.use('/favicon.ico', (req, res) => { res.end() })
app.use(express.static(path.join(__dirname, 'public')))
app.use(pubsub.pub)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

//database
mongoose
    .connect(`${process.env.MONGO_URL}_${process.env.NODE_ENV}`)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => console.log(err))

//routes
app.use('/v1/users', userRoute)
app.use('/v1/security', securityRoute)
app.use('/v1/posts', commentRoute)
app.use('/v1/posts', postRoute)
app.use('/v1/profiles', profileRoute)
app.use('/v1/feed', feedRoute)

module.exports = app