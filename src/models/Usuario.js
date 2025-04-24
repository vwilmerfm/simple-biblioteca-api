const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  constructor(id, nombre, email, password, role) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static async findByEmail(email) {
    try {
      const result = await db.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const user = result.rows[0];
      return new Usuario(user.id, user.nombre, user.email, user.password, user.role);
    } catch (error) {
      throw new Error(`Error al buscar usuario por email: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await db.query(
        'SELECT * FROM usuarios WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const user = result.rows[0];
      return new Usuario(user.id, user.nombre, user.email, user.password, user.role);
    } catch (error) {
      throw new Error(`Error al buscar usuario por ID: ${error.message}`);
    }
  }

  async save() {
    try {
      // Hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      
      const result = await db.query(
        'INSERT INTO usuarios (nombre, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [this.nombre, this.email, hashedPassword, this.role]
      );
      
      this.id = result.rows[0].id;
      this.password = hashedPassword;
      return this;
    } catch (error) {
      throw new Error(`Error al guardar usuario: ${error.message}`);
    }
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = Usuario;