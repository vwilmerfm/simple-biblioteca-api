const Libro = require('../models/Libro');

class LibroService {
  /**
   * Obtiene todos los libros
   * @returns {Promise<Array>} Lista de libros
   */
  async getAllLibros() {
    return await Libro.findAll();
  }

  /**
   * Obtiene un libro por ID
   * @param {number} id ID del libro
   * @returns {Promise<Object>} Libro encontrado
   */
  async getLibroById(id) {
    const libro = await Libro.findById(id);
    if (!libro) {
      throw new Error('Libro no encontrado');
    }
    return libro;
  }

  /**
   * Crea un nuevo libro
   * @param {string} nombre Nombre del libro
   * @param {string} codigo Código único del libro
   * @param {string} autor Autor del libro
   * @returns {Promise<Object>} Libro creado
   */
  async createLibro(nombre, codigo, autor) {
    // Verificar si ya existe un libro con el mismo código
    const existingLibro = await Libro.findByCodigo(codigo);
    if (existingLibro) {
      throw new Error('Ya existe un libro con ese código');
    }

    // Crear nuevo libro
    const libro = new Libro(null, nombre, codigo, autor);
    return await libro.save();
  }

  /**
   * Actualiza un libro existente
   * @param {number} id ID del libro a actualizar
   * @param {string} nombre Nuevo nombre del libro
   * @param {string} codigo Nuevo código del libro
   * @param {string} autor Nuevo autor del libro
   * @returns {Promise<Object>} Libro actualizado
   */
  async updateLibro(id, nombre, codigo, autor) {
    // Verificar si el libro existe
    let libro = await Libro.findById(id);
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    // Verificar si el código ya está en uso por otro libro
    if (codigo !== libro.codigo) {
      const libroExistente = await Libro.findByCodigo(codigo);
      if (libroExistente && libroExistente.id !== libro.id) {
        throw new Error('Ya existe un libro con ese código');
      }
    }

    // Actualizar libro
    libro.nombre = nombre;
    libro.codigo = codigo;
    libro.autor = autor;

    return await libro.save();
  }

  /**
   * Elimina un libro
   * @param {number} id ID del libro a eliminar
   * @returns {Promise<boolean>} Resultado de la operación
   */
  async deleteLibro(id) {
    // Verificar si el libro existe
    const libro = await Libro.findById(id);
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    return await libro.delete();
  }

  /**
   * Busca libros por autor
   * @param {string} autor Nombre del autor
   * @returns {Promise<Array>} Lista de libros filtrados
   */
  async findLibrosByAutor(autor) {
    const libros = await Libro.findAll();
    return libros.filter(libro => 
      libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
  }

  /**
   * Busca libros por nombre
   * @param {string} nombre Texto a buscar en el nombre
   * @returns {Promise<Array>} Lista de libros filtrados
   */
  async findLibrosByNombre(nombre) {
    const libros = await Libro.findAll();
    return libros.filter(libro => 
      libro.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }
}

module.exports = new LibroService();