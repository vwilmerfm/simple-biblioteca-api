const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const { check } = require('express-validator');
const { isAuth, isAdmin } = require('../middleware/auth');

// GET /autores - Lista todos los autores (acceso público)
router.get('/', autorController.getAllAutores);

// GET /autores/:id - Obtiene autor por ID (acceso público)
router.get('/:id', autorController.getAutorById);

// POST /autores - Crea 1 nuevo autor (solo admin)
router.post(
  '/',
  [
    isAuth,
    isAdmin,
    check('nombre', 'El nombre del autor es obligatorio')
      .not().isEmpty()
      .trim()
      .escape(),
    check('tipo', 'El tipo de autor no es válido')
      .optional()
      .isIn(['estandar', 'premium']),
    check('bio', 'La biografía no debe exceder los 500 caracteres')
      .optional()
      .isLength({ max: 500 })
  ],
  autorController.createAutor
);

// PUT /autores/:id - Actualizar autor (solo admin)
router.put(
  '/:id',
  [
    isAuth,
    isAdmin,
    check('nombre', 'El nombre del autor es obligatorio')
      .optional()
      .trim()
      .escape(),
    check('bio', 'La biografía no debe exceder los 500 caracteres')
      .optional()
      .isLength({ max: 500 })
  ],
  autorController.updateAutor
);

// DELETE /autores/:id - Eliminar autor (solo admin)
router.delete(
  '/:id',
  [isAuth, isAdmin],
  autorController.deleteAutor
);

module.exports = router;