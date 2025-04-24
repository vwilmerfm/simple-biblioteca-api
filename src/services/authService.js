const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class AuthService {
  /**
   * Registra un nuevo usuario
   * @param {string} nombre Nombre del usuario
   * @param {string} email Email del usuario
   * @param {string} password Contraseña sin encriptar
   * @returns {Promise<Object>} Usuario registrado y token JWT
   */
  async register(nombre, email, password, role) {
    // Verificar si el usuario ya existe
    let usuario = await Usuario.findByEmail(email);
    if (usuario) {
      throw new Error('El usuario ya existe');
    }

    // Crear nuevo usuario
    usuario = new Usuario(null, nombre, email, password, role);
    await usuario.save();

    // Generar JWT
    const token = this.generateToken(usuario);

    return {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role
      },
      token
    };
  }

  /**
   * Autentica un usuario
   * @param {string} email Email del usuario
   * @param {string} password Contraseña sin encriptar
   * @returns {Promise<Object>} Usuario autenticado y token JWT
   */
  async login(email, password) {
    // Buscar usuario por email
    const usuario = await Usuario.findByEmail(email);
    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    // Validar contraseña
    const isMatch = await usuario.validatePassword(password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    // Generar JWT
    const token = this.generateToken(usuario);

    return {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role
      },
      token
    };
  }

  /**
   * Obtiene un usuario por ID
   * @param {number} id ID del usuario
   * @returns {Promise<Object>} Datos del usuario
   */
  async getUserById(id) {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role
    };
  }

  /**
   * Genera un token JWT
   * @param {Usuario} usuario Instancia de Usuario
   * @returns {string} Token JWT
   */
  generateToken(usuario) {
    const payload = {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }
}

module.exports = new AuthService();