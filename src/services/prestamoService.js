const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro');

class PrestamoService {
  /**
   * Obtiene todos los préstamos
   * @returns {Promise<Array>} Lista de préstamos
   */
  async getAllPrestamos() {
    return await Prestamo.findAll();
  }

  /**
   * Obtiene un préstamo por ID
   * @param {number} id ID del préstamo
   * @returns {Promise<Object>} Préstamo encontrado
   */
  async getPrestamoById(id) {
    const prestamo = await Prestamo.findById(id);
    if (!prestamo) {
      throw new Error('Préstamo no encontrado');
    }
    return prestamo;
  }

  /**
   * Registra un nuevo préstamo
   * @param {string} lector Nombre del lector
   * @param {number} libro_id ID del libro prestado
   * @param {Date} fecha Fecha del préstamo (opcional)
   * @returns {Promise<Object>} Préstamo registrado
   */
  async createPrestamo(lector, libro_id, fecha = new Date()) {
    // Verificar si el libro existe
    const libro = await Libro.findById(libro_id);
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    // Crear nuevo préstamo
    const prestamo = new Prestamo(null, fecha, lector, libro_id);
    return await prestamo.save();
  }

  /**
   * Obtiene préstamos por libro
   * @param {number} libro_id ID del libro
   * @returns {Promise<Array>} Lista de préstamos del libro
   */
  async getPrestamosByLibro(libro_id) {
    // Verificar si el libro existe
    const libro = await Libro.findById(libro_id);
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    return await Prestamo.findByLibroId(libro_id);
  }

  /**
   * Obtiene préstamos por lector
   * @param {string} lector Nombre del lector
   * @returns {Promise<Array>} Lista de préstamos del lector
   */
  async getPrestamosByLector(lector) {
    const prestamos = await Prestamo.findAll();
    return prestamos.filter(prestamo => 
      prestamo.lector.toLowerCase().includes(lector.toLowerCase())
    );
  }

  /**
   * Obtiene estadísticas de préstamos
   * @returns {Promise<Object>} Estadísticas de préstamos
   */
  async getEstadisticas() {
    const prestamos = await Prestamo.findAll();
    
    // Libros más prestados
    const librosPrestados = {};
    prestamos.forEach(prestamo => {
      if (librosPrestados[prestamo.libro_id]) {
        librosPrestados[prestamo.libro_id]++;
      } else {
        librosPrestados[prestamo.libro_id] = 1;
      }
    });

    // Lectores más frecuentes
    const lectores = {};
    prestamos.forEach(prestamo => {
      if (lectores[prestamo.lector]) {
        lectores[prestamo.lector]++;
      } else {
        lectores[prestamo.lector] = 1;
      }
    });

    return {
      totalPrestamos: prestamos.length,
      librosPrestados,
      lectores
    };
  }
}

module.exports = new PrestamoService();