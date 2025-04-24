const { validationResult } = require('express-validator');
const libroService = require('../services/libroService');

// Obtener todos los libros
exports.getAllLibros = async (req, res) => {
  try {
    const libros = await libroService.getAllLibros();
    res.json({ libros });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
};

// Obtener un libro por ID
exports.getLibroById = async (req, res) => {
  try {
    const libro = await libroService.getLibroById(req.params.id);
    res.json({ libro });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Libro no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error al obtener el libro' });
  }
};

// Crear un nuevo libro
exports.createLibro = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, codigo, autor } = req.body;

  try {
    const libro = await libroService.createLibro(nombre, codigo, autor);
    
    res.status(201).json({
      message: 'Libro creado con éxito',
      libro
    });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Ya existe un libro con ese código') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error al crear el libro' });
  }
};

// Actualizar un libro
exports.updateLibro = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, codigo, autor } = req.body;

  try {
    const libro = await libroService.updateLibro(req.params.id, nombre, codigo, autor);
    
    res.json({
      message: 'Libro actualizado con éxito',
      libro
    });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Libro no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    
    if (error.message === 'Ya existe un libro con ese código') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
};

// Eliminar un libro
exports.deleteLibro = async (req, res) => {
  try {
    await libroService.deleteLibro(req.params.id);
    
    res.json({ message: 'Libro eliminado con éxito' });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Libro no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
};

// Buscar libros por autor
exports.findLibrosByAutor = async (req, res) => {
  try {
    const libros = await libroService.findLibrosByAutor(req.params.autor);
    res.json({ libros });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar libros por autor' });
  }
};

// Buscar libros por nombre
exports.findLibrosByNombre = async (req, res) => {
  try {
    const libros = await libroService.findLibrosByNombre(req.params.nombre);
    res.json({ libros });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar libros por nombre' });
  }
};