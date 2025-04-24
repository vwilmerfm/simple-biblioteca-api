const db = require('../config/database');

class Prestamo {
  constructor(id, fecha, lector, libro_id) {
    this.id = id;
    this.fecha = fecha || new Date();
    this.lector = lector;
    this.libro_id = libro_id;
  }

  static async findAll() {
    try {
      const result = await db.query(`
        SELECT p.*, l.nombre as libro_nombre 
        FROM prestamos p
        JOIN libros l ON p.libro_id = l.id
        ORDER BY p.fecha DESC
      `);
      
      return result.rows;
    } catch (error) {
      throw new Error(`Error al buscar préstamos: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await db.query(`
        SELECT p.*, l.nombre as libro_nombre 
        FROM prestamos p
        JOIN libros l ON p.libro_id = l.id
        WHERE p.id = $1
      `, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al buscar préstamo: ${error.message}`);
    }
  }

  async save() {
    try {
      const result = await db.query(
        'INSERT INTO prestamos (fecha, lector, libro_id) VALUES ($1, $2, $3) RETURNING *',
        [this.fecha, this.lector, this.libro_id]
      );
      
      this.id = result.rows[0].id;
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al registrar préstamo: ${error.message}`);
    }
  }

  static async findByLibroId(libro_id) {
    try {
      const result = await db.query(
        'SELECT * FROM prestamos WHERE libro_id = $1',
        [libro_id]
      );
      
      return result.rows;
    } catch (error) {
      throw new Error(`Error al buscar préstamos por libro: ${error.message}`);
    }
  }
}

module.exports = Prestamo;