const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const generarJWT = require('../helpers/jwt');



const crearUsuario = async (req, res = response) => {
    const { body } = req;
    const { email, password } = body;
    try {
        let user = Usuario.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            })
        }
        let usuario = new Usuario(body)
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            token,
            id: usuario.id,
            name: usuario.name
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error
        })
    }

}

const login = async (req, res = response) => {
    const { email, password } = req.body
    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.json({
                ok: false,
                name: 'El Usuario no existe'
            })
        }
        if (!bcrypt.compareSync(password, usuario.password)) {
            return res.json({
                ok: false,
                name: 'Contraseña incorrecta'
            })
        }
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            name: usuario.name,
            id: usuario.id,
            token
        })
    } catch (error) {

    }

}
const renovarToken = async(req, res = response) => {
    const { name, uid } = req;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    crearUsuario,
    renovarToken,
    login
}