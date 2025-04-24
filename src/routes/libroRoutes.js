const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const libroController = require('../controllers/libroController');
const { isAuth, isAdmin } = require('../middleware/auth');

// Obtener todos los libros
router.get('/', isAuth, libroController.getAllLibros);

// Obtener un libro por ID
router.get('/:id', isAuth, libroController.getLibroById);

// Crear un nuevo libro
router.post(
  '/',
  [
    isAuth,
    isAdmin,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('autor', 'El autor es obligatorio').not().isEmpty()
  ],
  libroController.createLibro
);

// Actualizar un libro
router.put(
  '/:id',
  [
    isAuth,
    isAdmin,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('autor', 'El autor es obligatorio').not().isEmpty()
  ],
  libroController.updateLibro
);

// Eliminar un libro
router.delete('/:id', [isAuth, isAdmin], libroController.deleteLibro);

// Buscar libros por autor
router.get('/autor/:autor', isAuth, libroController.findLibrosByAutor);

// Buscar libros por nombre
router.get('/nombre/:nombre', isAuth, libroController.findLibrosByNombre);

module.exports = router;