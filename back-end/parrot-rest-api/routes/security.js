const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Profile = require('../models/Profile')

router.route('/login')
    //This function login a user
    .post(async (req, res) => {
        try {
            //user validation
            const user = await User.findOne({ user: req.body.user })
            !user && res.status(404).json('Incorrect username or password')
            //password validation
            const validPassword = await bcryptjs.compare(req.body.password, user.password);
            !validPassword && res.status(400).json('Incorrect username or password')
            const { password, ...userJWT } = user._doc
            //token
            const accessToken = jwt.sign(JSON.stringify(userJWT), `${process.env.ACCESS_TOKEN_SECRET}`)
            res.status(200).json({ accessToken })
        } catch (err) {
            res.status(500)
        }
    })

router.route('/register')
    //This function creates a user
    .post(async (req, res) => {
        try {
            //password encrypted generate
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(req.body.password, salt)
            const newUser = new User({
                user: req.body.user,
                password: hashedPassword,
            })
            const newProfile = new Profile({
                user: newUser._id,
                name: req.body.name,
            })
            const user = await newUser.save();
            const profile = await newProfile.save();
            await User.findByIdAndUpdate(user._id, { profile })
            const { password, ...other } = user._doc
            res.status(200).json(other);
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router
