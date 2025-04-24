const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { isAuth } = require('../middleware/auth');

// Ruta para registro de usuario
router.post(
  '/register',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('role', 'El rol es obligatorio').not().isEmpty()
    .isIn(['admin', 'user']).withMessage('Rol no válido, debe ser "admin" o "user"')
  ],
  authController.register
);

// Ruta para login
router.post(
  '/login',
  [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').exists()
  ],
  authController.login
);

// Ruta para obtener usuario autenticado
router.get('/me', isAuth, authController.getMe);

module.exports = router;