const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    //verification 1 - token provided
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' })
    //verification 2 - correct token format
    const parts = authHeader.split(' ')
    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' })
    const [scheme, token] = parts
    //verification 3 - correct token format
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })
    //verification 4 - jwt verification
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ error: 'Token invalid' })
        User.findById(user._id).populate('profile')
            .then(u => {
                req.user = u
                next()
            })
    })
}