const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, renovarToken, login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();

router.post('/new', [
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Password es requerido al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);
router.post('/', [
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Password es requerido al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], login);
router.get('/renew', renovarToken);

module.exports = router;
