const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Profile = require('../models/Profile')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware);
router.route('/me')
    //This function gets my user
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const { password, ...other } = user._doc
            res.status(200).json(other)
        } catch (err) {
            res.status(500).json('User not found!')
        }
    })
    //This function updates my user
    .put(async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            await User.findByIdAndUpdate(req.user.id,
                {
                    user: req.body.user,
                    password: hashedPassword,
                })
            res.status(200).json('User has been updated.')
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    //This function deletes my user
    .delete(async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id)
            await Profile.findByIdAndDelete(req.user.profile.id)
            res.status(200).json('User has been deleted.')
        } catch (err) {
            return res.status(500).json(err)
        }
    })

module.exports = router