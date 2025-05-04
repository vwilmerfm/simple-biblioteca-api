const db = require('../config/database');

class Autor {
  constructor(id, nombre, bio = null, created_at = null) {
    this.id = id;
    this.nombre = nombre;
    this.bio = bio;
    this.created_at = created_at;
  }

  // Crear un nuevo autor
  async save() {
    const result = await db.query(
      'INSERT INTO autores (nombre, bio) VALUES ($1, $2) RETURNING *',
      [this.nombre, this.bio]
    );
    return new Autor(
      result.rows[0].id,
      result.rows[0].nombre,
      result.rows[0].bio,
      result.rows[0].created_at
    );
  }

  // Obtener todos los autores
  static async findAll() {
    const result = await db.query('SELECT * FROM autores ORDER BY nombre');
    return result.rows.map(row => new Autor(
      row.id,
      row.nombre,
      row.bio,
      row.created_at
    ));
  }

  // Obtener autor por ID
  static async findById(id) {
    const result = await db.query('SELECT * FROM autores WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return new Autor(
      row.id,
      row.nombre,
      row.bio,
      row.created_at
    );
  }

  // Actualizar autor
  async update() {
    const result = await db.query(
      'UPDATE autores SET nombre = $1, bio = $2 WHERE id = $3 RETURNING *',
      [this.nombre, this.bio, this.id]
    );
    return new Autor(
      result.rows[0].id,
      result.rows[0].nombre,
      result.rows[0].bio,
      result.rows[0].created_at
    );
  }

  // Eliminar autor (con validación de libros asociados)
  static async delete(id) {
    // Verificar si hay libros asociados
    const librosResult = await db.query(
      'SELECT COUNT(*) FROM libros WHERE autor_id = $1', 
      [id]
    );
    
    if (parseInt(librosResult.rows[0].count) > 0) {
      throw new Error('No se puede eliminar: autor tiene libros asociados');
    }

    await db.query('DELETE FROM autores WHERE id = $1', [id]);
    return true;
  }
}

module.exports = Autor;