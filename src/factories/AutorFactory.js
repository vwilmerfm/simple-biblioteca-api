const db = require('../config/database');

class AutorFactory {
  static async create(nombre, tipo = 'estandar') {
    if (!nombre) throw new Error('El nombre es obligatorio');

    let autor;
    switch (tipo) {
      case 'estandar':
        autor = { nombre, bio: null }; 
        break;
      case 'premium': 
        autor = { nombre, bio: 'Autor premium', descuento: 10 };
        break;
      default:
        throw new Error('Tipo de autor no válido');
    }

    const result = await db.query(
      'INSERT INTO autores (nombre, bio) VALUES ($1, $2) RETURNING *',
      [autor.nombre, autor.bio]
    );
    return result.rows[0];
  }
}

module.exports = AutorFactory;