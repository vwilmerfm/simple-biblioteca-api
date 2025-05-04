const Autor = require('../models/Autor');
const AutorFactory = require('../factories/AutorFactory');
const { validationResult } = require('express-validator');

/**
 * Obtener todos los autores
 */
exports.getAllAutores = async (req, res) => {
  try {
    const autores = await Autor.findAll();
    res.json({
      success: true,
      data: autores
    });
  } catch (error) {
    console.error('Error al obtener autores:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los autores',
      error: error.message
    });
  }
};

/**
 * Crear un nuevo autor usando Factory Method
 */
exports.createAutor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  try {
    // Usamos la factory para crear el autor
    const autor = await AutorFactory.create(
      req.body.nombre, 
      req.body.tipo || 'estandar' // Valor por defecto
    );
    
    res.status(201).json({
      success: true,
      message: 'Autor creado exitosamente',
      data: autor
    });
  } catch (error) {
    console.error('Error al crear autor:', error);
    res.status(400).json({
      success: false,
      message: 'Error al crear el autor',
      error: error.message
    });
  }
};

/**
 * Obtener un autor por ID
 */
exports.getAutorById = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    
    if (!autor) {
      return res.status(404).json({
        success: false,
        message: 'Autor no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: autor
    });
  } catch (error) {
    console.error('Error al obtener autor:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el autor',
      error: error.message
    });
  }
};

/**
 * Actualizar un autor existente
 */
exports.updateAutor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  try {
    const autor = await Autor.findById(req.params.id);
    
    if (!autor) {
      return res.status(404).json({
        success: false,
        message: 'Autor no encontrado'
      });
    }

    // Actualizar propiedades
    autor.nombre = req.body.nombre || autor.nombre;
    autor.bio = req.body.bio || autor.bio;

    const autorActualizado = await autor.update();
    
    res.json({
      success: true,
      message: 'Autor actualizado exitosamente',
      data: autorActualizado
    });
  } catch (error) {
    console.error('Error al actualizar autor:', error);
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el autor',
      error: error.message
    });
  }
};

/**
 * Eliminar un autor
 */
exports.deleteAutor = async (req, res) => {
  try {
    await Autor.delete(req.params.id);
    
    res.json({
      success: true,
      message: 'Autor eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar autor:', error);
    
    const statusCode = error.message.includes('asociados') ? 400 : 500;
    
    res.status(statusCode).json({
      success: false,
      message: 'Error al eliminar el autor',
      error: error.message
    });
  }
};