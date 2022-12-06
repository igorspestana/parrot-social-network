//ROTAS DO CRUD DO FEED////////////////////////////////////

//PACOTES/////////////////////////////
const router = require('express').Router(); // para usar o parâmetro express.Router

//MODELOS CONECTADOS/////////////////////////////
const Post = require('../models/Post');
const Profile = require('../models/Profile');

//MIDDLEWARES/////////////////////////////
const authMiddleware = require('../middlewares/auth')

//ROTAS/////////////////////////////
router.use(authMiddleware);
//This function get posts by profile
router.get('/', async (req, res) => {
    try {
        //definir o usuário da requisição
        const currentProfile = await Profile.findById(req.user.profile._id);
        //procurar todos os posts do usuário
        const profilePosts = await Post.find({ profile: currentProfile._id }).populate('profile').populate({ path: 'comments' });
        //procurar todos os posts dos amigos
        const friendPosts = await Promise.all(
            currentProfile.following.map((friendId) => {
                return Post.find({ profile: friendId }).populate('profile').populate({ path: 'comments' });
            })
        );
        console.log(friendPosts);
        res.json(profilePosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
})

//EXPORTAÇÃO DA ROTA///////////////
module.exports = router