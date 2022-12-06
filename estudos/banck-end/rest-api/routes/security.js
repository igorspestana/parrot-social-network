//ROTAS PARA REGISTRAR E LOGAR O USUÁRIO/////////////////////////////////////

//PACOTES/////////////////////////////
const router = require('express').Router(); // para usar o parâmetro express.Router
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')

//VARIÁVEIS DE AMBIENTE/////////////////////////////
dotenv.config();

//MODELOS CONECTADOS/////////////////////////////
const User = require('../models/User');
const Profile = require('../models/Profile');

//ROTAS/////////////////////////////
//This function login a user
router.post('/login', async (req, res) => {
    try {
        //validar user
        const user = await User.findOne({ user: req.body.user });
        !user && res.status(404).json('senha ou usuáro incorretos');

        //validar senha
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('senha ou usuáro incorretos')

        //para não mostrar no response
        /* const { password, profile, ...other } = user._doc */

        //gerar o tolken
        const accessToken = jwt.sign(req.body.user, `${process.env.ACCESS_TOKEN_SECRET}`)

        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(500);
    }
})
//This function creates a user
router.post('/register', async (req, res) => {

    try {
        //gerar password encriptado
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //criar novo usuário
        const newUser = new User({
            user: req.body.user,
            password: hashedPassword,
        });

        //criar novo profile
        const newProfile = new Profile({
            user: newUser._id,
            name: req.body.name,
        });

        //salvar usuário e profile
        const user = await newUser.save();
        const profile = await newProfile.save();

        //adicionar profile no user
        await User.findByIdAndUpdate(user._id, { profile })

        //para não mostrar no response
        const { password, ...other } = user._doc

        res.status(200).json(other);

    } catch (err) {
        res.status(500).json(err)
    }
});


//EXPORTAÇÃO DA ROTA///////////////
module.exports = router