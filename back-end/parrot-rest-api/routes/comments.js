const router = require('express').Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)
router.route('/:postId/comments')
    //This function gets post's comments
    .get(async (req, res) => {
        try {
            const comment = await Comment.find({ post: req.params.postId }).populate('profile')
            res.status(201).json(comment)
        } catch (err) {
            res.status(500)
        }
    })
    //This function creates a comment into a post
    .post(async (req, res) => {
        try {
            const newComment = new Comment({ ...req.body, profile: req.user.profile._id, post: req.params.postId })
            const savedComment = await newComment.save()
            const post = await Post.findById(req.params.postId)
            await post.updateOne({ $push: { comments: savedComment.id } })
            //post owner notification
            const rabbitComment = await req.publish('comment', [post.profile], post)
            res.status(200).json(savedComment)
        } catch (err) {
            res.status(500).json(err)
        }
    })

router.route('/:postId/comments/:id/')
    //This function gets a comment by id
    .get(async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id).populate('profile')
            //post validation
            if ([comment.post].toString() === req.params.postId) {
                res.status(201).json(comment)
            } else {
                res.status(403).json('Comment not found!')
            }
        } catch (err) {
            res.status(500)
        }
    })
    //This function updates a comment by id
    .put(async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id)
            //profile and post validation
            if ([comment.profile].toString() === [req.user.profile._id].toString() &&
                [comment.post].toString() === req.params.postId) {
                await comment.updateOne({ $set: req.body })
                res.status(200).json('Comment has been updated.')
            } else {
                res.status(403).json('You can only update your own comments!')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })
    //This function deletes a comment by id
    .delete(async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id)
            //profile validation
            if ([comment.profile].toString() === [req.user.profile._id].toString()) {
                await comment.deleteOne()
                res.status(200).json('Comment has been deleted.')
            } else {
                res.status(403).json('You can only delete your own comments!');
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })

router.route('/:postId/comments/:id/like')
    //This function likes or dislikes a comment by id
    .post(async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id)
            //check if the comment was not liked by the profile
            if (!comment.likes.includes(req.user.profile._id)) {
                //like
                await comment.updateOne({ $push: { likes: req.user.profile._id } })
                //comment owner notification
                const rabbitComment = await req.publish('comment-like', [comment.profile], comment)
                res.status(200).json('Comment has been liked.')
            } else {
                //dislike
                await comment.updateOne({ $pull: { likes: req.user.profile._id } });
                res.status(200).json('Comment has been disliked.')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router