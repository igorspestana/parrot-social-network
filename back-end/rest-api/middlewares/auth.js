//MIDDLEWARES/////////////////////////////////////

//PACOTES/////////////////////////////
const jwt = require('jsonwebtoken'); //módulo para validação do token

//MODELOS CONECTADOS/////////////////////////////
const User = require('../models/User');

// O next é chamado apenas se o usuário está pronto para ir para o próximo passo, o controller. É usado para interceptar o usuário para que ele não consiga prosseguir pela aplicação caso o tolken não seja validado.
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //verificar se o tolken foi informado
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    //verificar se o tolken está no formato certo (Bearer (hash))
    //primeiro passo é splitar em duas partes
    const parts = authHeader.split(' ');
    //verificar se tem duas partes
    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;
    //verificar se no scheme está escrito Bearer
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });

    //as verificações anteriores são feitas para economizar o consumo de processamento da máquina por serem mais leves. esse tipo de verificação é saudável para o back-end porque se tiver qualquer erro de formatação do tolken ele já vai retornar sem precisar passar por uma verificação mais pesada.

    //verificação final
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });
        User.findById(user._id).populate('profile')
            .then(u => {
                req.user = u
                next();
            })

    });

};