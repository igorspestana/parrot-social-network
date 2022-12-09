//ROTAS DO CRUD DO COMMENT////////////////////////////////////

//PACOTES/////////////////////////////
const router = require('express').Router(); // para usar o parâmetro express.Router

//MODELOS CONECTADOS/////////////////////////////
const Post = require('../models/Post');
const Comment = require('../models/Comment');

//MIDDLEWARES/////////////////////////////
const authMiddleware = require('../middlewares/auth')

//ROTAS/////////////////////////////
router.use(authMiddleware);
//This function gets post's comments
router.get('/:postId/comments', async (req, res) => {
    try {
        const comment = await Comment.find({ post: req.params.postId }).populate('post')

        res.status(201).json(comment)
    } catch (err) {
        res.status(500)
    }
})
//This function creates a comment into a post
router.post('/:postId/comments', async (req, res) => {
    try {
        const newComment = new Comment({ ...req.body, profile: req.user.profile._id, post: req.params.postId });
        const savedComment = await newComment.save();

        //adicionar no post o comment
        const post = await Post.findById(req.params.postId);
        await post.updateOne({ $push: { comments: savedComment.id } });

        //notificar o dono do post que recebeu um comment(rabbit)
        const rabbitComment = await req.publish('comment', [post.profile], post)

        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err)
    }
})

//This function gets a comment by id
router.get('/:postId/comments/:id/', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if ([comment.post].toString() === req.params.postId) {

            res.status(201).json(comment)
        } else {
            res.status(403).json('Comentário não encontrado');
        }
    } catch (err) {
        res.status(500)
    }
})
//This function updates a comment by id
router.put('/:postId/comments/:id/', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        //validar profile e post
        if ([comment.profile].toString() === [req.user.profile._id].toString() &&
            [comment.post].toString() === req.params.postId) {
            await comment.updateOne({ $set: req.body });
            res.status(200).json('O comentário foi atualizado')
        } else {
            res.status(403).json('Você só pode atualizar seus prórios comentários');
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//This function deletes a comment by id
router.delete('/:postId/comments/:id/', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        //verificar usuário
        if ([comment.profile].toString() === [req.user.profile._id].toString()) {
            await comment.deleteOne();
            res.status(200).json('O comentário foi deletado')
        } else {
            res.status(403).json('Você só pode deletar seus próprios comentários');
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//This function likes or dislikes a comment by id
router.post('/:postId/comments/:id/like', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        //verficar se o comment não tem o like do profile
        if (!comment.likes.includes(req.user.profile._id)) {
            //para dar o like
            await comment.updateOne({ $push: { likes: req.user.profile._id } });

            //notificar o dono do comment que recebeu um like (rabbit)
            const rabbitComment = await req.publish('comment-like', [comment.profile], comment)

            res.status(200).json('Você curtiu o comentário')
        } else {
            //para retirar o like
            await comment.updateOne({ $pull: { likes: req.user.profile._id } });
            res.status(200).json('Você descurtiu o comentário')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//EXPORTAÇÃO DA ROTA///////////////
module.exports = router
