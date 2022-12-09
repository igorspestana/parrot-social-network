//INDEX////////////////////////////////////

//PACOTES/////////////////////////////
const http = require('http')
const socketio = require('socket.io')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

//CONECTADOS////////////////////////////////////
const pubsub = require('./middlewares/pubsub')
const app = require('./app')

//SOCKET.IO////////////////////////////////////
const server = http.Server(app)
//const server = require("http").createServer(app)
const io = socketio(server, {
    // Specifying CORS
    cors: {
        origin: '*'
    }
})

const liveData = io.of('/v1')

//MIDDLEWARE DE AUTENTICAÇÃO DO LIVE DATA////////////////////////////////////
liveData.use((socket, next) => {
    //console.log('on use socket')
    if (socket.handshake.auth && socket.handshake.auth.token) {
        //console.log('if')
        jwt.verify(socket.handshake.auth.token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
            // console.log('jwt verify')
            if (err) return next(new Error('Authentication error'))
            // console.log(user)
            User.findById(user._id).populate('profile')
                .then(u => {
                    //console.log('sio middleware')
                    if (u) {
                        socket.profile = u.profile
                        next()
                    } else {
                        //console.log('Authentication error 404')
                        next(new Error('Authentication error'))
                    }
                })
        })
    } else {
        // console.error('Authentication error')
        next(new Error('Authentication error'))
    }
})

//SOCKET EVENT - COMUNICAÇÃO DE PROTOCOLO SOCKET.IO////////////////////////////////////
liveData.on('connection', function (socket) {
    console.warn(`a user connected live ${socket.profile.name}`)

    socket.on('disconnect', () => {
        console.log(socket.connected) //false
    })
    socket.on('error', (err) => {
        console.error(err)
    })
    socket.emit('connect_profile', socket.profile)
})

//RABBIT - CONSUMIR A MENSAGEM////////////////////////////////////
pubsub.sub().then((sub) => {
    //Consome o rabbit, pega a mensagem e da ok
    sub.on('message', function (message, content, ackOrNack) {
        console.log(JSON.parse(message.content.toString()))
        ackOrNack()
        Object.entries(Object.fromEntries(liveData.sockets))
            .filter(([, v]) => content.keys.includes(v.profile._id.toString()))
            .map(([k, v]) => {
                return v.emit(content.type, content.payload)
            })
    })
}).catch(console.error)

//PORTA///////////////////////////
/* app.listen(`${process.env.PORT}`, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT}`)
    console.log(`MONGODB: ${process.env.MONGO_URL}`)
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`PORT: ${process.env.PORT}`)
}) */
server.listen(`${process.env.PORT}`, () => {
    console.warn(`Server listen on http://localhost:${process.env.PORT}`)
    console.warn(`MONGODB: ${process.env.MONGO_URL}`)
    console.warn(`NODE_ENV: ${process.env.NODE_ENV}`)
    console.warn(`PORT: ${process.env.PORT}`)
})