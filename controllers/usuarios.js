const { request ,response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { validationResult } = require('express-validator');


const usuarioGet = async(req = request, res = response ) => {
    // const { q, nombre = 'No Name', apikey } = req.query
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true } 

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( desde )
            .limit( limite )
    ])
    res.json({
        total,
        usuarios
    })
};

const usuarioPost = async(req = request, res = response ) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // guardar DB
    await usuario.save();

    res.json({
        usuario
    })
};

const usuarioPut = async(req, res = response ) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body
    
    // Encriptación de la contraseña
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);   
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, { new: true } )
    
    res.json(usuario)
};

const usuarioPatch = (req, res = response) => {

    res.json({
        msg: 'patch API usuarioPatch'
    })
};

const usuarioDelete = async(req, res = response ) => {
    
    const { id } = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json( usuario )
};




module.exports = { 
    usuarioGet,
    usuarioDelete,
    usuarioPatch,
    usuarioPut,
    usuarioPost
};






