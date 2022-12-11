const router = require('express').Router()
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)
router.route('/')
    //This function get posts by profile
    .get(async (req, res) => {
        try {
            const currentProfile = await Profile.findById(req.user.profile._id);
            const profilePosts = await Post.find({ profile: currentProfile._id }).populate('profile').populate({ path: 'comments' })
            const friendPosts = await Promise.all(
                currentProfile.following.map((friendId) => {
                    return Post.find({ profile: friendId }).populate('profile').populate({ path: 'comments' })
                }))
            console.log(friendPosts)
            res.json(profilePosts.concat(...friendPosts))
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router