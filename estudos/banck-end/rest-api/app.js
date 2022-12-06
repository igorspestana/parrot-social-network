//APP////////////////////////////////////

//EXPRESS////////////////////////////
const express = require('express');
const app = express();

//PACOTES/////////////////////////////
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json())

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