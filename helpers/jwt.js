const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                reject('No se puedo crear el token')
            }
            resolve(token);
        });
    })

}

module.exports = generarJWT;