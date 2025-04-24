const { validationResult } = require('express-validator');
const prestamoService = require('../services/prestamoService');

// Obtener todos los préstamos
exports.getAllPrestamos = async (req, res) => {
  try {
    const prestamos = await prestamoService.getAllPrestamos();
    res.json({ prestamos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los préstamos' });
  }
};

// Obtener un préstamo por ID
exports.getPrestamoById = async (req, res) => {
  try {
    const prestamo = await prestamoService.getPrestamoById(req.params.id);
    res.json({ prestamo });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Préstamo no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error al obtener el préstamo' });
  }
};

// Registrar un nuevo préstamo
exports.createPrestamo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { lector, libro_id, fecha } = req.body;

  try {
    const prestamo = await prestamoService.createPrestamo(lector, libro_id, fecha);
    
    res.status(201).json({
      message: 'Préstamo registrado con éxito',
      prestamo
    });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Libro no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error al registrar el préstamo' });
  }
};

// Obtener préstamos por libro
exports.getPrestamosByLibro = async (req, res) => {
  try {
    const prestamos = await prestamoService.getPrestamosByLibro(req.params.libro_id);
    res.json({ prestamos });
  } catch (error) {
    console.error(error);
    
    if (error.message === 'Libro no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Error al obtener los préstamos del libro' });
  }
};

// Obtener préstamos por lector
exports.getPrestamosByLector = async (req, res) => {
  try {
    const prestamos = await prestamoService.getPrestamosByLector(req.params.lector);
    res.json({ prestamos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los préstamos del lector' });
  }
};

// Obtener estadísticas de préstamos
exports.getEstadisticas = async (req, res) => {
  try {
    const estadisticas = await prestamoService.getEstadisticas();
    res.json({ estadisticas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener estadísticas de préstamos' });
  }
};