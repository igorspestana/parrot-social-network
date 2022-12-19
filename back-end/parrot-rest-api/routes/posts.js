const router = require('express').Router()
const Post = require('../models/Post')
const upload = require('../middlewares/upload')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)
router.route('/')
    //This function gets all posts
    .get(async (req, res) => {
        try {
            const post = await Post.find().populate('profile').populate({ path: 'comments' })
            res.status(201).json(post)
        } catch (err) {
            res.status(500)
        }
    })
    //This function creates a post
    .post(upload.concat([(async (req, res) => {
        try {
            const newPost = new Post({ ...req.body, profile: req.user.profile._id })
            const savedPost = await newPost.save()
            //post owner notification
            const rabbitPost = await req.publish('post', req.user.profile.followers, savedPost)
            res.status(200).json(savedPost)
        } catch (err) {
            res.status(500).json(err)
        }
    })]))

router.route('/:id')
    //This function gets a post by id
    .get(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate('profile').populate({ path: 'comments' })
            res.status(201).json(post)
        } catch (err) {
            res.status(500)
        }
    })
    //This function updates a post by id
    .put(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            //profile validation
            if ([post.profile].toString() === [req.user.profile._id].toString()) {
                await post.updateOne({ $set: req.body });
                res.status(200).json('Post has been updated.')
            } else {
                res.status(403).json('You can only update your own posts!')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })
    //This function deletes a post by id
    .delete(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            //profile validation
            if ([post.profile].toString() === [req.user.profile._id].toString()) {
                await post.deleteOne()
                res.status(200).json('Post has been deleted.')
            } else {
                res.status(403).json('You can only delete your own posts!')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })

router.route('/:id/like')
    //This function likes or dislikes a post by id
    .post(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            //check if the post was not liked by the profile
            if (!post.likes.includes(req.user.profile._id)) {
                //like
                await post.updateOne({ $push: { likes: req.user.profile._id } })
                //post owner notification
                const rabbitPost = await req.publish('post-like', [post.profile], post)
                res.status(200).json('Post has been liked.')
            } else {
                //dislike
                await post.updateOne({ $pull: { likes: req.user.profile._id } })
                res.status(200).json('Post has been disliked.')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router