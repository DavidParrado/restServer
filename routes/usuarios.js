const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')

const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, idExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuarioGet );

router.put('/:id',[
    check('id','No es un id valido de Mongo').isMongoId(),
    check('id').custom( idExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPut);

router.post('/',[
    // Validaciones
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id','No es un id valido de Mongo').isMongoId(),
    check('id').custom( idExiste ),
    validarCampos
], usuarioDelete);

router.patch('/', usuarioPatch);


module.exports = router