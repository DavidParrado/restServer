const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios')
const { generarJWT } = require('../helpers/generar-jwt')


const login = async(req, res = response) => {


    try {
        
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo })
        // Verificar si correo existe
        if( !usuario ) {
            return res.json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // SI estado es true
        if( !usuario.estado ) { 
            return res.json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Si la contraseña es correcta
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if( !validPassword ) {
            return res.json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // generar JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



};


module.exports = {
    login
}