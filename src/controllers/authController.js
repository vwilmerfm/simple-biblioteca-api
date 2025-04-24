const { validationResult } = require('express-validator');
const authService = require('../services/authService');

// Registro de usuario
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, email, password, role } = req.body;

  try {
    const result = await authService.register(nombre, email, password, role);
    
    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token: result.token
    });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'El usuario ya existe') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);
    
    res.json({
      message: 'Login exitoso',
      token: result.token,
      usuario: result.usuario
    });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Credenciales inválidas') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener usuario autenticado
exports.getMe = async (req, res) => {
  try {
    const usuario = await authService.getUserById(req.usuario.id);
    
    res.json(usuario);
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error en el servidor' });
  }
};