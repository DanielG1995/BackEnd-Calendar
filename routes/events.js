const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, newEvent, editEvent, deleteEvent } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJwt');

const router = Router();

router.use(validarJWT);

router.get('/', getEvents);
router.post('/', [
    check('title', 'El título es obligatorio').notEmpty(),
    check('notes', 'Las notas son obligatorias').notEmpty(),
    check('start', 'La fecha inicio es obligatorio').not().isDate(),
    check('end', 'La fecha fin es obligatoria').not().isDate(),
    validarCampos
], newEvent);
router.put('/:id',[
    check('id','El id no es válido').isMongoId(),
    validarCampos
] ,editEvent);
router.delete('/:id', deleteEvent);

module.exports = router;






