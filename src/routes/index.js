const express = require('express');
const router = express.Router();

// Importar rutas de cada módulo
const disponibilidadRoutes = require('./disponibilidad');

/**
 * Health check del gateway
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'API Gateway',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * Información de la API
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sistema de Gestión de Alquileres - API Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      propiedades: '/api/propiedades',
      filtros: '/api/filtros/propiedades'
    }
  });
});

/**
 * ===================================
 * MONTAR RUTAS DE MÓDULOS
 * ===================================
 */

// Módulo 4: Disponibilidad y Búsqueda (puerto 8004)
router.use('/', disponibilidadRoutes);

module.exports = router;