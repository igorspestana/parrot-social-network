//APP////////////////////////////////////

//EXPRESS////////////////////////////
const express = require('express');
const app = express();

//PACOTES/////////////////////////////
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
/* const createError = require('http-errors') */

//CONECTADOS////////////////////////////////////
const pubsub = require('./middlewares/pubsub')

//MIDDLEWARES CONFIGURATION/////////////////////////////
//atua em todas as rotas excerto para a rota que trabalha com upload.
const urlencodedMiddleware = bodyParser.urlencoded({
    extended: true
})
//middleware que verifica se o content type da requisição é referente ao formulário multipart form. Se sim passa adiante. Se não implementa o middleware de urlencodedMiddleware.
app.use((req, res, next) => (/^multipart\//i.test(req.get('Content-Type'))) ? next() : urlencodedMiddleware(req, res, next))
app.use(bodyParser.json({
    defer: true
}))

//SET LOGGER/////////////////////////////
app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, 'public')))
app.use(pubsub.pub)
app.use(express.json());
//app.use(helmet()); comentado para mostra a notificaçcao funcionando
app.use(cors());
app.use(bodyParser.json())

/* //????????????????????/////////////////////////////
app.use('/favicon.ico', (req, res) => {
    res.end()
}) */



/* //SEED/////////////////////////////
app.get('/v1/seed', (req, res, next) => require('./seed')
    .then(() => res.status(200).end())
    .catch(next)
) */

//VARIÁVEIS DE AMBIENTE/////////////////////////////
dotenv.config();

//ROTAS CONECTADAS/////////////////////////////
const userRoute = require('./routes/users');
const securityRoute = require('./routes/security');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const profileRoute = require('./routes/profiles');
const feedRoute = require('./routes/feed');

//DATABASE/////////////////////////////
mongoose
    .connect(`${process.env.MONGO_URL}_${process.env.NODE_ENV}`)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => console.log(err));

//ROTAS COM PREFIXO DA VERSÃO////////////////////////////
app.use('/v1/api/users', userRoute);
app.use('/v1/api/security', securityRoute);
app.use('/v1/api/posts', commentRoute);
app.use('/v1/api/posts', postRoute);
app.use('/v1/api/profiles', profileRoute);
app.use('/v1/api/feed', feedRoute);

module.exports = app