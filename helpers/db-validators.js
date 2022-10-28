const Role = require('../models/roles');
const Usuario = require('../models/usuarios')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if(!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }
};


const emailExiste = async( correo ) => {
    const existeEmail = await Usuario.findOne({ correo });

    if( existeEmail ) { 
        throw new Error('El correo ya esta registrado')
    }
}

const idExiste = async( id ) => {
    const existeId = await Usuario.findById(id);
    if( !existeId ) { 
        throw new Error('El id no se encuentra en la base de datos')
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste
}