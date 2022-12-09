//ROTAS DO CRUD DO USUÁRIO/////////////////////////////////////

//PACOTES/////////////////////////////
const router = require('express').Router(); // para usar o parâmetro express.Router
const bcrypt = require('bcrypt');

//MODELOS CONECTADOS/////////////////////////////
const User = require('../models/User');
const Profile = require('../models/Profile');

//MIDDLEWARES/////////////////////////////
const authMiddleware = require('../middlewares/auth');

//ROTAS/////////////////////////////
router.use(authMiddleware);
//This function gets my user
router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        //para não mostrar no response
        const { password, ...other } = user._doc

        res.status(200).json(other)
    } catch (err) {
        res.status(500).json('Usuário não encontrado!')
    }
})
//This function updates my user
router.put("/me", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.findByIdAndUpdate(req.user.id,
            {
                user: req.body.user,
                password: hashedPassword,
            });

        res.status(200).json('Conta atualizada')
    } catch (err) {
        return res.status(500).json(err);
    }
});
//This function deletes my user
router.delete("/me", async (req, res) => {

    try {
        await User.findByIdAndDelete(req.user.id);
        await Profile.findByIdAndDelete(req.user.profile.id)
        res.status(200).json('Conta deletada.')
    } catch (err) {
        return res.status(500).json(err);
    }

})

//EXPORTAÇÃO DA ROTA///////////////
module.exports = router