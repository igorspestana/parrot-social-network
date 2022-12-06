//ROTAS DO CRUD DO POST////////////////////////////////////

//PACOTES/////////////////////////////
const router = require('express').Router(); // para usar o parâmetro express.Router

//MODELOS CONECTADOS/////////////////////////////
const Post = require('../models/Post');

//MIDDLEWARES/////////////////////////////
const authMiddleware = require('../middlewares/auth')

//ROTAS/////////////////////////////
router.use(authMiddleware);
//This function gets all posts
router.get('/', async (req, res) => {
    try {
        const post = await Post.find().populate('profile').populate({ path: 'comments' });
        res.status(201).json(post)
    } catch (err) {
        res.status(500)
    }
})
//This function creates a post
router.post('/', async (req, res) => {
    try {
        const newPost = new Post({ ...req.body, profile: req.user.profile._id });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
})
//This function gets a post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('profile').populate({ path: 'comments' });
        res.status(201).json(post)
    } catch (err) {
        res.status(500)
    }
})
//This function updates a post by id
router.put('/:id', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
        //validar profile
        if ([post.profile].toString() === [req.user.profile._id].toString()) {
            await post.updateOne({ $set: req.body });
            res.status(200).json('O post foi atualizado')
        } else {
            res.status(403).json('Você só pode atualizar seus posts');
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//This function deletes a post by id
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //verificar usuário
        if ([post.profile].toString() === [req.user.profile._id].toString()) {
            await post.deleteOne();
            res.status(200).json('O post foi deletado')
        } else {
            res.status(403).json('Você só pode deletar seus posts');
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//This function likes or dislikes a post by id
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //verficar se o post não tem o like do usuário
        if (!post.likes.includes(req.user.profile._id)) {
            //para dar o like
            await post.updateOne({ $push: { likes: req.user.profile._id } });
            res.status(200).json('Você curtiu o post')
        } else {
            //para retirar o like
            await post.updateOne({ $pull: { likes: req.user.profile._id } });
            res.status(200).json('Você descurtiu o post')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//EXPORTAÇÃO DA ROTA///////////////
module.exports = router