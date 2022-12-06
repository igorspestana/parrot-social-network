//ROTAS DO CRUD DO USUÁRIO/////////////////////////////////////

//PACOTES/////////////////////////////
const router = require('express').Router(); // para usar o parâmetro express.Router
/* const bcrypt = require('bcrypt'); */

//MODELOS CONECTADOS/////////////////////////////
const Profile = require('../models/Profile');

//MIDDLEWARES/////////////////////////////
const authMiddleware = require('../middlewares/auth');

//ROTAS/////////////////////////////
router.use(authMiddleware);
//This function gets all profiles
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.find();

        res.status(201).json(profile)
    } catch (err) {
        res.status(500)
    }
})
//This function searchs a profile by name
router.get('/search', async (req, res) => {
    try {
        const profile = Profile.find(
            { $text: { $search: `${req.query.q}` } },
            { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } })
        res.status(200).json(profile)
    } catch (err) {
        res.status(500).json(err)
    }
})
//This function gets a profile by id
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        //para não mostrar no response
        const { user, ...other } = profile._doc

        res.status(200).json(other)
    } catch (err) {
        res.status(500).json('Usuário não encontrado!')
    }
})
//This function follow or unfollow a profile 
router.post('/:id/follow', async (req, res) => {
    if ([req.user.profile._id].toString() !== req.params.id) {
        try {
            const profile = await Profile.findById(req.params.id);
            const currentProfile = await Profile.findById(req.user.profile._id);

            if (!profile.followers.includes(req.user.profile._id)) {
                await profile.updateOne({ $push: { followers: req.user.profile._id } });
                await currentProfile.updateOne({ $push: { following: req.params.id } });

                res.status(200).json('Você está seguindo o usuário.')
            } else if (profile.followers.includes(req.user.profile._id)) {
                await profile.updateOne({ $pull: { followers: req.user.profile._id } });
                await currentProfile.updateOne({ $pull: { following: req.params.id } });

                res.status(200).json('Você deixou de seguir o usuário.')
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('Você não pode seguir você mesmo!')
    }
})

//EXPORTAÇÃO DA ROTA///////////////
module.exports = router