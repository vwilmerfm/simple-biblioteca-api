const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const prestamoController = require('../controllers/prestamoController');
const { isAuth } = require('../middleware/auth');

// Obtener todos los préstamos
router.get('/', isAuth, prestamoController.getAllPrestamos);

// Obtener un préstamo por ID
router.get('/:id', isAuth, prestamoController.getPrestamoById);

// Registrar un nuevo préstamo
router.post(
  '/',
  [
    isAuth,
    check('lector', 'El nombre del lector es obligatorio').not().isEmpty(),
    check('libro_id', 'El ID del libro es obligatorio').isNumeric()
  ],
  prestamoController.createPrestamo
);

// Obtener préstamos por libro
router.get('/libro/:libro_id', isAuth, prestamoController.getPrestamosByLibro);

// Obtener préstamos por lector
router.get('/lector/:lector', isAuth, prestamoController.getPrestamosByLector);

// Obtener estadísticas de préstamos
router.get('/estadisticas/general', isAuth, prestamoController.getEstadisticas);

router.delete('/:id', [isAuth], prestamoController.deletePrestamo);

module.exports = router;