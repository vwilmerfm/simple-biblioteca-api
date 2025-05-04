const db = require('../config/database');

class Libro {
  constructor(id, nombre, codigo, autor) {
    this.id = id;
    this.nombre = nombre;
    this.codigo = codigo;
    this.autor_id = autor;
  }

  static async findAll() {
    try {
      const result = await db.query('SELECT * FROM libros ORDER BY id');
      return result.rows.map(libro => new Libro(
        libro.id,
        libro.nombre,
        libro.codigo,
        libro.autor_id
      ));
    } catch (error) {
      throw new Error(`Error al buscar libros: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await db.query('SELECT * FROM libros WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const libro = result.rows[0];
      return new Libro(libro.id, libro.nombre, libro.codigo, libro.autor_id);
    } catch (error) {
      throw new Error(`Error al buscar libro: ${error.message}`);
    }
  }

  static async findByCodigo(codigo) {
    try {
      const result = await db.query('SELECT * FROM libros WHERE codigo = $1', [codigo]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const libro = result.rows[0];
      return new Libro(libro.id, libro.nombre, libro.codigo, libro.autor_id);
    } catch (error) {
      throw new Error(`Error al buscar libro por código: ${error.message}`);
    }
  }

  async save() {
    try {
      // Si el libro tiene ID, actualizamos; si no, creamos nuevo
      if (this.id) {
        const result = await db.query(
          'UPDATE libros SET nombre = $1, codigo = $2, autor_id = $3 WHERE id = $4 RETURNING *',
          [this.nombre, this.codigo, this.autor_id, this.id]
        );
        return result.rows[0];
      } else {
        const result = await db.query(
          'INSERT INTO libros (nombre, codigo, autor_id) VALUES ($1, $2, $3) RETURNING *',
          [this.nombre, this.codigo, this.autor_id]
        );
        this.id = result.rows[0].id;
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`Error al guardar libro: ${error.message}`);
    }
  }

  async delete() {
    try {
      await db.query('DELETE FROM libros WHERE id = $1', [this.id]);
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar libro: ${error.message}`);
    }
  }
}

module.exports = Libro;